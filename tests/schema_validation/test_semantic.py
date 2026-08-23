import json
import unittest
from pathlib import Path

from tools.schema_validation.registry import LocalSchemaRegistry
from tools.schema_validation.semantic import SemanticValidator

ROOT = Path(__file__).resolve().parents[2]

class SemanticValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.registry = LocalSchemaRegistry(ROOT)
        cls.validator = SemanticValidator(cls.registry)
        cls.cases = []
        for path in sorted((ROOT / "fixtures" / "semantic").glob("cases-*.json")):
            cls.cases.extend(json.loads(path.read_text(encoding="utf-8"))["cases"])

    def test_semantic_fixtures_match_expected_codes(self):
        failures = []
        for case in self.cases:
            project = case["project"]
            errors = self.validator.validate_project(project)
            codes = sorted({error["code"] for error in errors})
            expected = sorted(case["expected_error_codes"])
            if codes != expected:
                failures.append({"name": case["name"], "expected": expected, "actual": codes})
        self.assertEqual(failures, [])

    def test_changeset_dependency_cycle_is_detected(self):
        changeset = {
            "schema_id": "aigs.changeset",
            "schema_version": 1,
            "changeset_id": "changeset.test",
            "request_summary": "test",
            "mode": "atomic",
            "operations": [
                {"operation_id": "op-1", "operation_type": "delete_definition", "target_ref": {"ref": "character.father"}, "depends_on": ["op-2"], "destructive": True},
                {"operation_id": "op-2", "operation_type": "delete_definition", "target_ref": {"ref": "character.sarah"}, "depends_on": ["op-1"], "destructive": True}
            ],
            "provenance": {"actor": "creator_copilot", "ai_role_ref": {"ref": "ai_role.creator"}}
        }
        errors = self.validator.validate_changeset(changeset)
        self.assertIn("CHANGESET_DEPENDENCY_CYCLE", {e["code"] for e in errors})
