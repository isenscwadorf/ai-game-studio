# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch / review

Branch: `isenscwadorf/the-6-schema-implementation`  
PR: `#3 feat: implement canonical schema registry and validation`

## Current objective

PR #3 has passed the THE-6 implementation, CI, and final requirements/diff audit. The remaining gate is explicit integration approval to merge PR #3. After merge, mark THE-6 Done and begin THE-7: the Snowed In vertical-slice specification.

## Completed

- PR #1 merged: durable repository memory and architecture baseline.
- PR #2 merged: canonical schema design, implementation plan, and ADR baseline.
- ADR-0001 through ADR-0012 accepted.
- Machine-readable JSON Schema Draft 2020-12 registry implemented.
- Required foundational contracts implemented, including generic `WorldEntityDefinition`.
- Definition/runtime separation represented by distinct schema families.
- Character/Controller, world, interaction, event, cognition, relationship, AI, ChangeSet, and asset contracts implemented.
- Asset variants use an explicit `asset-variant-ref` rather than pretending variants are ordinary definitions.
- Local/offline `$ref` registry implemented.
- Action/Activity parameter-schema URNs are required to resolve to registered schemas; initial `action.open` and `activity.cook_meal` parameter contracts are registered.
- Provider/generation configuration uses a recursive safe-config schema that rejects credential-like keys at any nesting depth while allowing legitimate settings such as `max_tokens`.
- Structural and semantic fixture suites implemented.
- Semantic validation checks duplicate IDs, missing definition refs, registered executors/effects/parameter schemas/extensions, relationship range/default correctness, relationship runtime values, ChangeSet duplicate operation IDs, missing dependencies, and dependency cycles.
- Semantic validation skips deeper semantic assumptions for structurally invalid documents instead of crashing.
- GitHub Actions schema-validation workflow added and independently green on the current PR head.

## Runtime status

No gameplay runtime implementation exists yet. This is intentional. THE-6 is contract/schema validation infrastructure only.

## Verification evidence

Fresh GitHub Actions verification on PR #3 head `87c3596c08ca0e40ad3c37a187fc3aa1ab28a5ef`:

```text
Schema Validation workflow #25 / run 32624893447
Conclusion: success
Python: 3.12.14
jsonschema: 4.26.0

python -m unittest discover -s tests -p 'test_*.py' -v
23 tests, 0 failures

python tools/schema_validation/validate_fixtures.py
59 fixture cases, 0 mismatches
```

Every workflow step completed successfully: checkout, Python setup, dependency installation, unit tests, and fixture validation.

Local final hardening also ran:

```text
python -m compileall -q tools tests
exit 0
```

## Final THE-6 audit

THE-6 Linear acceptance requires Character, Controller, WorldEntity/Location/Room/Object/Item, Affordance, Action, Activity, Event/Trigger/Condition/Effect, Perception, Knowledge/Belief, Memory, Relationship, AI Provider, Copilot ChangeSet, and Asset Identity/Provenance contracts, with examples, validation rules, stable IDs, versioning, cross-references, and CI-ready fixtures.

Final PR #3 changed-file audit confirms all required schema families are present, plus schema registry, positive/negative structural fixtures, semantic fixtures, validator tooling, tests, documentation, and CI. The temporary bundle experiment is absent from the final diff. There are no unresolved GitHub review threads.

## Review hardening completed

PR review found and fixed these additional issues before merge:

- semantic validation could crash when a structurally invalid relationship-dimension definition was later used;
- Action/Activity parameter schema URNs were not verified against the registry;
- relationship dimension `min/max/default` semantics were not checked;
- duplicate ChangeSet operation IDs were not rejected;
- secret-key filtering was only top-level and also incorrectly rejected legitimate names containing `token` such as `max_tokens`;
- direct CLI execution initially had an import-path packaging failure;
- asset variants required their own reference contract rather than ordinary DefinitionRefs;
- generic WorldEntityDefinition and registry-dispatch coverage were added after tests exposed gaps.

Each fix has regression coverage.

## Known blockers

No THE-6 design, code, test, CI, or review blocker remains. The only remaining gate is explicit merge approval.

## Accepted architecture decisions

- Player and NPC share one Character model.
- NPCs can initiate valid engine Actions autonomously.
- Actions are atomic; Activities are explicitly interruptible.
- World Truth is separate from per-character knowledge and belief.
- OpenRouter is the default LLM gateway behind a provider abstraction.
- Inworld is optional behind an adapter/service boundary.
- Godot is runtime infrastructure, not the creator-facing product UX.
- Canonical persisted definitions use strict UTF-8 JSON and JSON Schema Draft 2020-12.
- Project Definitions and Runtime State are separate schema families.
- Persistent definition IDs are immutable namespaced IDs; runtime instance IDs are opaque UUIDs.
- Core schemas are strict; plugin extension payloads are explicit and namespaced.
- Core Conditions/Effects are declarative and non-executable.
- Copilot project changes use atomic typed ChangeSets with engine-generated undo receipts.
- Generated assets use stable semantic identities and provenance.
- Godot 4.7.2 stable is pinned for the initial runtime implementation baseline.

## Next three concrete tasks

1. Merge PR #3 after explicit integration approval and mark Linear THE-6 Done.
2. Start Linear THE-7 on a fresh branch from updated `main`.
3. Write and review the Snowed In vertical-slice specification before broad Godot runtime implementation.

## Still unresolved before substantial runtime implementation

- Whether the creator editor shell is entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Exact Godot-side runtime testing/tooling beyond the schema CI harness.

## Handoff note

Read `docs/START_HERE.md`, this file, ADR-0001 through ADR-0012, `docs/specs/2026-08-23-canonical-engine-schemas-design.md`, and `docs/plans/2026-08-23-the-6-schema-implementation-plan.md`. Run the exact schema commands above before changing THE-6 contracts. Do not begin gameplay runtime behavior until THE-6 and the Snowed In spec are accepted.
