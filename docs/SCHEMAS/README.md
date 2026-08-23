# Schema Registry

Canonical versioned machine-readable contracts live under `/schemas`.

## Format

- strict UTF-8 JSON
- JSON Schema Draft 2020-12
- stable `urn:aigs:schema:v1:*` schema IDs
- one reviewable schema file per contract under `schemas/v1/<family>/`
- `schemas/registry.json` is the authoritative lookup table
- all `$ref` resolution is local/offline

Core object schemas reject undeclared fields with `additionalProperties: false` unless a deliberate extension point exists. Plugin/custom payloads belong only under explicit namespaced `extensions` entries. Conditions, Effects, Actions, and Activities never contain arbitrary eval/source strings.

## Families implemented in THE-6

- common references/errors
- project manifest
- Character and Controller definitions/runtime bindings
- WorldEntity, Location, Room, Object, Item
- Affordance, Action, Activity
- Event, Trigger, Condition, Effect, WorldEvent
- Fact, Perception, Belief, KnowledgeView, Memory
- Relationship dimensions/state
- AI provider/role profiles
- atomic Copilot ChangeSets and receipts
- Asset Identity, Variant, Generation provenance, catalog

## Development validation

Install the pinned development dependency:

```bash
pip install -r requirements-dev.txt
```

Run all schema tests:

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
```

Run the standalone structural fixture validator:

```bash
python tools/schema_validation/validate_fixtures.py
```

The fixture suites are split into `fixtures/schemas/cases-*.json` and `fixtures/semantic/cases-*.json` to keep reviews and AI context manageable.

## Authoring rule

Do not add or change a public schema without updating `schemas/registry.json`, positive/negative fixtures, tests, and migration/versioning documentation when compatibility changes. Do not store API keys, secrets, tokens, passwords, or credentials in provider or generation configuration.
