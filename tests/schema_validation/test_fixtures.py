import json
import unittest
from pathlib import Path

from tools.schema_validation.registry import LocalSchemaRegistry

ROOT = Path(__file__).resolve().parents[2]


class FixtureValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.registry = LocalSchemaRegistry(ROOT)
        manifest = json.loads((ROOT / "fixtures" / "schemas" / "manifest.json").read_text(encoding="utf-8"))
        cls.cases = manifest["cases"]

    def test_fixture_manifest_has_positive_and_negative_cases(self):
        outcomes = {case["valid"] for case in self.cases}
        self.assertEqual(outcomes, {True, False})
        self.assertGreaterEqual(len(self.cases), 30)

    def test_all_fixtures_match_expected_outcome(self):
        failures = []
        for case in self.cases:
            instance = case["instance"]
            errors = list(self.registry.iter_errors(case["schema_urn"], instance))
            actual = not errors
            if actual != case["valid"]:
                failures.append({
                    "name": case["name"],
                    "expected": case["valid"],
                    "errors": [e.message for e in errors[:5]],
                })
        self.assertEqual(failures, [])

    def test_unknown_core_property_is_rejected(self):
        instance = {
            "schema_id": "aigs.character.definition",
            "schema_version": 1,
            "id": "character.father",
            "kind": "character",
            "display_name": "Father",
            "tags": [],
            "extensions": {},
            "unexpected_ai_hallucination": True,
        }
        errors = list(self.registry.iter_errors("urn:aigs:schema:v1:character-definition", instance))
        self.assertTrue(errors)

    def test_invalid_uuid_is_rejected(self):
        instance = {
            "schema_id": "aigs.character.state",
            "schema_version": 1,
            "instance_id": "not-a-uuid",
            "definition_ref": {"ref": "character.father"},
            "location_instance_id": None,
            "active_activity_id": None,
            "controller_binding_id": None,
        }
        errors = list(self.registry.iter_errors("urn:aigs:schema:v1:character-state", instance))
        self.assertTrue(errors)

    def test_refs_resolve_from_local_registry(self):
        instance = {
            "schema_id": "aigs.character.state",
            "schema_version": 1,
            "instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559",
            "definition_ref": {"ref": "character.father"},
            "location_instance_id": None,
            "active_activity_id": None,
            "controller_binding_id": None,
        }
        errors = list(self.registry.iter_errors("urn:aigs:schema:v1:character-state", instance))
        self.assertEqual(errors, [])

    def test_invalid_fixtures_declare_and_hit_expected_validation_keyword(self):
        failures = []
        for case in self.cases:
            if case["valid"]:
                continue
            expected = case.get("expected_error_keyword")
            if not expected:
                failures.append({"name": case["name"], "reason": "missing expected_error_keyword"})
                continue
            errors = list(self.registry.iter_errors(case["schema_urn"], case["instance"]))
            validators = {error.validator for error in errors}
            if expected not in validators:
                failures.append({"name": case["name"], "expected": expected, "actual": sorted(validators)})
        self.assertEqual(failures, [])

    def test_provider_config_rejects_secret_keys_case_insensitively(self):
        case = next(case for case in self.cases if case["name"] == "valid_provider-profile")
        instance = json.loads(json.dumps(case["instance"]))
        instance["provider_config"] = {"API_KEY": "must-not-be-persisted"}
        errors = list(self.registry.iter_errors(case["schema_urn"], instance))
        self.assertTrue(errors)

    def test_validate_fixtures_cli_runs_from_repo_root(self):
        import subprocess
        import sys
        result = subprocess.run(
            [sys.executable, "tools/schema_validation/validate_fixtures.py"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr or result.stdout)

    def test_validate_fixtures_summary_reports_zero_mismatches(self):
        from tools.schema_validation.validate_fixtures import validate_all
        summary = validate_all(ROOT)
        self.assertEqual(summary["mismatches"], 0)
        self.assertEqual(summary["total"], len(self.cases))
