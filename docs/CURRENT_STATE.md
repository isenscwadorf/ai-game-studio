# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch / review

Branch: `isenscwadorf/the-6-schema-implementation`
Implementation PR: not opened yet at the time of this state update.

## Current objective

Finish THE-6 by reviewing the published schema implementation, obtaining GitHub CI evidence, and merging only after the implementation branch is verified. Then begin THE-7: the Snowed In vertical-slice specification.

## Completed

- PR #1 merged: durable repository memory and architecture baseline.
- PR #2 merged: canonical schema design, implementation plan, and ADR baseline.
- ADR-0001 through ADR-0012 accepted.
- Machine-readable JSON Schema Draft 2020-12 registry implemented.
- Required foundational contracts implemented, including a generic `WorldEntityDefinition`.
- Definition/runtime separation represented by distinct schema families.
- Character/Controller, world, interaction, event, cognition, relationship, AI, ChangeSet, and asset contracts implemented.
- Asset variants use an explicit `asset-variant-ref` instead of pretending variants are ordinary definitions.
- Provider/generation configuration structurally rejects likely secret-key field names case-insensitively.
- Local/offline `$ref` registry implemented.
- Structural and semantic fixture suites implemented.
- Semantic validation checks duplicate IDs, missing definition refs, executor/effect registration, extension namespaces, relationship ranges, and ChangeSet dependency cycles.
- GitHub Actions schema-validation workflow added.

## Runtime status

No gameplay runtime implementation exists yet. This is intentional. THE-6 is contract/schema validation infrastructure only.

## Verification evidence

Fresh local verification of the final implementation snapshot:

```text
python -m unittest discover -s tests -p 'test_*.py' -v
17 tests, 0 failures

python tools/schema_validation/validate_fixtures.py
59 fixture cases, 0 mismatches

python -m compileall -q tools tests
exit 0
```

The tests include structural positive/negative cases, expected validation-keyword checks, local reference resolution, schema dispatch, semantic error-code fixtures, ChangeSet dependency-cycle detection, case-insensitive secret-key rejection, and direct CLI execution from repository root.

GitHub CI status is still required after the implementation PR is opened; do not call THE-6 complete solely from the local run above.

## Known blockers

None in the schema implementation. The general-purpose container cannot clone GitHub directly, so the implementation was developed and verified in an isolated local workspace, then published through the authorized GitHub connector.

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

1. Open and review the THE-6 implementation PR; require GitHub CI evidence.
2. Merge THE-6 and mark Linear THE-6 Done only after verification/review.
3. Start Linear THE-7 and write the Snowed In vertical-slice specification.

## Still unresolved before substantial runtime implementation

- Whether the creator editor shell is entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Exact Godot-side runtime testing/tooling beyond the schema CI harness.

## Handoff note

Read `docs/START_HERE.md`, this file, ADR-0001 through ADR-0012, `docs/specs/2026-08-23-canonical-engine-schemas-design.md`, and `docs/plans/2026-08-23-the-6-schema-implementation-plan.md`. Run the exact schema commands above before changing THE-6 contracts. Do not begin gameplay runtime behavior until THE-6 and the Snowed In spec are accepted.
