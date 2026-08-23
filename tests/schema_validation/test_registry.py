import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[2]

class RegistryContractTests(unittest.TestCase):
    def test_registry_exists_and_declares_schemas(self):
        registry_path = ROOT / "schemas" / "registry.json"
        self.assertTrue(registry_path.exists(), "schemas/registry.json must exist")
        data = json.loads(registry_path.read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(data["schemas"]), 20)

    def test_every_registered_schema_is_valid_draft_2020_12(self):
        from tools.schema_validation.registry import LocalSchemaRegistry
        registry = LocalSchemaRegistry(ROOT)
        self.assertGreaterEqual(len(registry.entries), 20)
        for entry in registry.entries:
            schema = registry.schema_by_urn(entry["urn"])
            Draft202012Validator.check_schema(schema)

    def test_required_foundational_schema_urns_are_registered(self):
        from tools.schema_validation.registry import LocalSchemaRegistry
        registry = LocalSchemaRegistry(ROOT)
        required = {
            "urn:aigs:schema:v1:character-definition",
            "urn:aigs:schema:v1:controller-profile",
            "urn:aigs:schema:v1:world-entity-definition",
            "urn:aigs:schema:v1:location-definition",
            "urn:aigs:schema:v1:room-definition",
            "urn:aigs:schema:v1:object-definition",
            "urn:aigs:schema:v1:item-definition",
            "urn:aigs:schema:v1:affordance-definition",
            "urn:aigs:schema:v1:action-definition",
            "urn:aigs:schema:v1:activity-definition",
            "urn:aigs:schema:v1:event-definition",
            "urn:aigs:schema:v1:perception-record",
            "urn:aigs:schema:v1:belief-record",
            "urn:aigs:schema:v1:memory-record",
            "urn:aigs:schema:v1:relationship-state",
            "urn:aigs:schema:v1:provider-profile",
            "urn:aigs:schema:v1:changeset",
            "urn:aigs:schema:v1:asset-identity-definition",
        }
        registered = {entry["urn"] for entry in registry.entries}
        self.assertEqual(required - registered, set())

    def test_all_registered_paths_exist(self):
        from tools.schema_validation.registry import LocalSchemaRegistry
        registry = LocalSchemaRegistry(ROOT)
        for entry in registry.entries:
            self.assertTrue((ROOT / entry["path"]).exists(), entry["path"])
