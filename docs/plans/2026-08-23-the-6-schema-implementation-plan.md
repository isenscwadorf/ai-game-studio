# THE-6 — Canonical Engine Schema Implementation Plan

Date: 2026-08-23
Status: Approved design; implementation plan
Tracks: Linear THE-6

## Goal

Turn the accepted canonical schema design into a locally resolvable JSON Schema Draft 2020-12 registry with positive/negative fixtures and automated validation. No gameplay runtime is implemented in this task.

## Tooling decision

Use Python 3.12+ for the initial schema conformance harness with `jsonschema==4.26.0`. This is CI/development tooling only; it does not define the eventual Godot runtime language or require Python in exported games.

## Repository layout

```text
schemas/
  v1/
    common/
    definitions/
    runtime/
    cognition/
    ai/
    assets/
  registry.json
fixtures/
  schemas/
    valid/
    invalid/
tools/
  schema_validation/
    __init__.py
    registry.py
    validate_fixtures.py
tests/
  schema_validation/
    test_registry.py
    test_fixtures.py
requirements-dev.txt
.github/workflows/schema-validation.yml
```

## Implementation rules

- Follow RED -> GREEN -> REFACTOR for validator behavior.
- No schema is considered implemented until it has at least one valid fixture and one meaningful invalid fixture where applicable.
- `$ref` resolution is local/offline only.
- Every core object schema rejects unknown properties unless an explicit extension point exists.
- Format checking (especially UUID) is enabled in validation tests.
- Semantic cross-reference existence is explicitly out of scope for structural JSON Schema validation and will be a later semantic-validation layer; structural reference shapes are in scope now.

## Task 1 — Test harness RED

Create tests before validator implementation proving:

1. registry loads all declared schemas;
2. every registered schema is itself valid Draft 2020-12;
3. valid fixtures pass;
4. invalid fixtures fail;
5. unknown properties fail core schemas;
6. UUID formats are enforced;
7. local `$ref` resolution works without network access.

Run tests and confirm failure because registry/validator implementation does not yet exist.

## Task 2 — Minimal registry GREEN

Implement the smallest local schema registry/validator needed for Task 1.

Registry entry fields:

- `schema_id`
- `urn`
- `version`
- `path`
- `family`

Use `referencing.Registry` through the `jsonschema` ecosystem or an equivalent local resolver supported by the pinned dependency. Network resolution is forbidden.

Run the full schema-validation tests and keep them green.

## Task 3 — Common contracts

Implement and test:

- definition envelope
- definition reference
- runtime instance reference
- entity handle
- extension map
- common bounded confidence/progress values
- common source/provenance reference

Fixtures must prove stable-ID patterns and strict unknown-property rejection.

## Task 4 — Character / Controller / World definitions

Implement and test:

- CharacterDefinition
- CharacterState
- ControllerProfile
- ControllerBinding
- LocationDefinition
- RoomDefinition
- ObjectDefinition
- ItemDefinition

Use typed subobjects for persona, speech, stacking, and decision policy. Do not use unrestricted `initial_state`; in v1 represent generic initial state as registered component-state references plus a small explicit core state bag where necessary.

## Task 5 — Affordance / Action / Activity

Implement and test:

- AffordanceDefinition
- bound AffordanceOffer
- ActionDefinition
- ActionRequest
- ActionResult
- ActivityDefinition
- ActivityInstance

Action/Activity definitions reference executor keys and parameter-schema URNs; they contain no executable source.

Invalid fixtures must cover malformed intent source, illegal activity status, invalid progress, and unknown fields.

## Task 6 — Condition / Event / Effect

Implement and test the discriminated condition AST:

- boolean combinators: all / any / not
- comparisons: eq / neq / gt / gte / lt / lte
- exists
- has_tag
- operands: literal / actor_state / target_state / referenced_entity_state / event_payload / project_variable

Implement and test:

- WorldEvent
- TriggerDefinition union
- EventDefinition
- EffectOperation
- repeat policy

No arbitrary expression strings or eval fields.

## Task 7 — Cognition and information provenance

Implement and test:

- Fact
- PerceptionRecord
- BeliefRecord
- KnowledgeView (derived transport contract)
- MemoryRecord

Tests must prove confidence bounds, explicit provenance/source references, and separation of source perception from belief claims.

## Task 8 — Relationships

Implement and test:

- RelationshipDimensionDefinition
- RelationshipState

Relationship state is directed (`source_character_instance_id` -> `target_character_instance_id`) and dimension values are structurally numeric. Semantic range enforcement belongs to semantic validation after dimension lookup.

## Task 9 — AI provider/profile contracts

Implement and test:

- AIProviderCapabilities
- AIModelPolicy
- AIRoleDefinition
- AIRequestPolicy

Provider-specific opaque settings are permitted only inside namespaced/provider-owned configuration sections; gameplay contracts never contain provider SDK payloads.

## Task 10 — Creator Copilot ChangeSets

Implement and test:

- ChangeSet
- ChangeOperation discriminated union baseline
- ChangeSetValidationResult
- ChangeSetApplyReceipt / undo receipt reference

Initial operation types:

- create_definition
- update_definition
- delete_definition
- move_asset_variant
- generate_asset_request

Operations have explicit dependency IDs. ChangeSets declare atomic application semantics; rollback payloads are engine-produced receipts, not AI-authored operations.

## Task 11 — Asset identity/provenance

Implement and test:

- AssetIdentityDefinition
- AssetVariant
- GenerationProvenance
- GenerationInputReference
- AssetCatalogDefinition

Tests must distinguish semantic identity from storage path and reject provider secrets/credentials fields.

## Task 12 — Project manifest and registry completeness

Implement and test:

- ProjectManifest
- schema registry completeness
- fixture manifest mapping fixture -> expected schema/outcome

Every top-level schema required by THE-6 must be registered.

## Task 13 — CI

Add GitHub Actions workflow:

1. checkout;
2. setup Python 3.12;
3. `pip install -r requirements-dev.txt`;
4. `python -m unittest discover -s tests -p 'test_*.py' -v`;
5. `python tools/schema_validation/validate_fixtures.py`.

No Godot download is needed for this documentation/schema-only milestone.

## Task 14 — Documentation and handoff

Update:

- `docs/SCHEMAS/README.md` with registry/authoring rules;
- `docs/CURRENT_STATE.md` with exact commands and status;
- `docs/START_HERE.md` with schema test command;
- THE-6 Linear issue with implementation PR;
- changelog only if appropriate.

## Verification gate

Before requesting merge:

- fresh full unit-test run: zero failures;
- fresh fixture validation: all expected-valid fixtures pass and all expected-invalid fixtures fail;
- verify no schema requires network resolution;
- verify all required THE-6 contracts are in `schemas/registry.json`;
- inspect PR diff for accidental secrets/provider keys;
- update CURRENT_STATE with exact evidence.

## Definition of done

THE-6 is complete only when the design ADRs and implementation are merged, CI is green, all required schema families have positive/negative fixtures, the registry resolves entirely offline, and another AI can extend a schema by following repository documentation without referring to this chat.
