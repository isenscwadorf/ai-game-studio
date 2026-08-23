from __future__ import annotations

import json
from pathlib import Path
from typing import Iterable

from jsonschema import Draft202012Validator, FormatChecker
from referencing import Registry, Resource


class LocalSchemaRegistry:
    def __init__(self, root: Path):
        self.root = Path(root)
        registry_doc = json.loads((self.root / "schemas" / "registry.json").read_text(encoding="utf-8"))
        self.entries = registry_doc["schemas"]
        self._schemas = {}
        resources = []
        for entry in self.entries:
            schema = json.loads((self.root / entry["path"]).read_text(encoding="utf-8"))
            if schema.get("$id") != entry["urn"]:
                raise ValueError(f"Registry URN mismatch for {entry['urn']}")
            self._schemas[entry["urn"]] = schema
            resources.append((entry["urn"], Resource.from_contents(schema)))
        self._registry = Registry().with_resources(resources)
        self._format_checker = FormatChecker()
        self._schema_id_to_urn = {entry["schema_id"]: entry["urn"] for entry in self.entries}

    def schema_by_urn(self, urn: str) -> dict:
        return self._schemas[urn]

    def urn_for_schema_id(self, schema_id: str) -> str:
        return self._schema_id_to_urn[schema_id]

    def validator(self, urn: str) -> Draft202012Validator:
        return Draft202012Validator(
            self.schema_by_urn(urn),
            registry=self._registry,
            format_checker=self._format_checker,
        )

    def iter_errors(self, urn: str, instance: object) -> Iterable:
        return self.validator(urn).iter_errors(instance)

    def validate_document(self, document: dict) -> list:
        schema_id = document.get("schema_id")
        if not schema_id:
            raise KeyError("Document does not contain schema_id")
        urn = self.urn_for_schema_id(schema_id)
        return sorted(self.iter_errors(urn, document), key=lambda e: list(e.absolute_path))
