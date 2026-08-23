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

    def test_structurally_invalid_relationship_dimension_does_not_crash_semantic_validation(self):
        project = {
            "definitions": [
                {
                    "schema_id": "aigs.relationship_dimension.definition",
                    "schema_version": 1,
                    "id": "relationship_dimension.trust",
                    "kind": "relationship_dimension",
                    "display_name": "Trust",
                    "tags": [],
                    "extensions": {},
                }
            ],
            "runtime_documents": [
                {
                    "schema_id": "aigs.relationship.state",
                    "schema_version": 1,
                    "relationship_id": "relationship.a.b",
                    "source_character_instance_id": "11111111-1111-4111-8111-111111111111",
                    "target_character_instance_id": "22222222-2222-4222-8222-222222222222",
                    "dimension_values": {"relationship_dimension.trust": 10},
                }
            ],
        }
        errors = self.validator.validate_project(project)
        self.assertIn("STRUCTURAL_VALIDATION_FAILED", {e["code"] for e in errors})

    def test_unregistered_parameter_schema_is_rejected_semantically(self):
        project = {
            "definitions": [
                {
                    "schema_id": "aigs.action.definition",
                    "schema_version": 1,
                    "id": "action.test",
                    "kind": "action",
                    "display_name": "Test",
                    "tags": [],
                    "extensions": {},
                    "executor_key": "core.action.open",
                    "parameters_schema_ref": "urn:aigs:schema:v1:missing-parameters",
                    "failure_codes": ["FAILED"],
                }
            ]
        }
        errors = self.validator.validate_project(project)
        self.assertIn("PARAMETER_SCHEMA_NOT_REGISTERED", {e["code"] for e in errors})

    def test_relationship_dimension_range_and_default_are_validated(self):
        bad_range = {
            "definitions": [
                {
                    "schema_id": "aigs.relationship_dimension.definition",
                    "schema_version": 1,
                    "id": "relationship_dimension.trust",
                    "kind": "relationship_dimension",
                    "display_name": "Trust",
                    "tags": [],
                    "extensions": {},
                    "range": {"min": 100, "max": -100, "default": 0},
                }
            ]
        }
        errors = self.validator.validate_project(bad_range)
        self.assertIn("RELATIONSHIP_RANGE_INVALID", {e["code"] for e in errors})

        bad_default = {
            "definitions": [
                {
                    "schema_id": "aigs.relationship_dimension.definition",
                    "schema_version": 1,
                    "id": "relationship_dimension.trust",
                    "kind": "relationship_dimension",
                    "display_name": "Trust",
                    "tags": [],
                    "extensions": {},
                    "range": {"min": -100, "max": 100, "default": 101},
                }
            ]
        }
        errors = self.validator.validate_project(bad_default)
        self.assertIn("RELATIONSHIP_DEFAULT_OUT_OF_RANGE", {e["code"] for e in errors})

    def test_duplicate_changeset_operation_ids_are_rejected(self):
        changeset = {
            "schema_id": "aigs.changeset",
            "schema_version": 1,
            "changeset_id": "changeset.duplicate_ops",
            "request_summary": "test duplicates",
            "mode": "atomic",
            "operations": [
                {"operation_id": "op-1", "operation_type": "delete_definition", "target_ref": {"ref": "character.a"}, "depends_on": [], "destructive": True},
                {"operation_id": "op-1", "operation_type": "delete_definition", "target_ref": {"ref": "character.b"}, "depends_on": [], "destructive": True},
            ],
            "provenance": {"actor": "creator_copilot", "ai_role_ref": {"ref": "ai_role.creator"}},
        }
        errors = self.validator.validate_changeset(changeset)
        self.assertIn("CHANGESET_DUPLICATE_OPERATION_ID", {e["code"] for e in errors})
