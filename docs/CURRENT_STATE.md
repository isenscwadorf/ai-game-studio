# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch / review

Branch: `isenscwadorf/the-6-schema-implementation`  
PR: `#3 feat: implement canonical schema registry and validation`

## Current objective

Finish THE-6 by obtaining green GitHub CI on PR #3 and completing the final requirements/diff review. Merge only after both gates are clean. Then begin THE-7: the Snowed In vertical-slice specification.

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
- GitHub Actions schema-validation workflow added.

## Runtime status

No gameplay runtime implementation exists yet. This is intentional. THE-6 is contract/schema validation infrastructure only.

## Verification evidence

Fresh local verification after the final review-hardening changes:

```text
python -m unittest discover -s tests -p 'test_*.py' -v
23 tests, 0 failures

python tools/schema_validation/validate_fixtures.py
59 fixture cases, 0 mismatches

python -m compileall -q tools tests
exit 0
```

The first GitHub Actions run on PR #3 failed before tests because `actions/setup-python` cache auto-detection looked for `requirements.txt`/`pyproject.toml` instead of this repo's `requirements-dev.txt`. The workflow was corrected with `cache-dependency-path: requirements-dev.txt`. A new GitHub CI run on the current PR head is required before THE-6 can be called complete.

## Review hardening completed

PR review found and fixed these additional issues before merge:

- semantic validation could crash when a structurally invalid relationship-dimension definition was later used;
- Action/Activity parameter schema URNs were not verified against the registry;
- relationship dimension `min/max/default` semantics were not checked;
- duplicate ChangeSet operation IDs were not rejected;
- secret-key filtering was only top-level and also incorrectly rejected legitimate names containing `token` such as `max_tokens`.

Each fix has regression coverage.

## Known blockers

No design/code blocker is known. The only remaining gate is green GitHub CI plus final PR review evidence.

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

1. Require green GitHub CI on current PR #3 head and finish the PR requirements/diff audit.
2. Merge THE-6 only after approval of the integration step; then mark Linear THE-6 Done.
3. Start Linear THE-7 and write the Snowed In vertical-slice specification.

## Still unresolved before substantial runtime implementation

- Whether the creator editor shell is entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Exact Godot-side runtime testing/tooling beyond the schema CI harness.

## Handoff note

Read `docs/START_HERE.md`, this file, ADR-0001 through ADR-0012, `docs/specs/2026-08-23-canonical-engine-schemas-design.md`, and `docs/plans/2026-08-23-the-6-schema-implementation-plan.md`. Run the exact schema commands above before changing THE-6 contracts. Do not begin gameplay runtime behavior until THE-6 and the Snowed In spec are accepted.
