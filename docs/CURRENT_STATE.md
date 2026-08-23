# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch / review

Branch: `isenscwadorf/the-6-define-canonical-engine-schemas`
PR: `#2 docs: define canonical engine schema design`

## Current objective

Merge the approved THE-6 design/ADR/implementation-plan baseline, then implement the machine-readable schema registry and validation fixtures on a dedicated implementation branch using test-first development.

## Completed

- PR #1 merged: durable repository memory and architecture baseline.
- Canonical schema design reviewed and approved by the project owner.
- THE-6 implementation plan written.
- ADR-0001 through ADR-0012 recorded, including:
  - shared Character model;
  - autonomous Character agency;
  - Actions vs Activities;
  - provider-neutral AI adapters;
  - World Truth vs Character beliefs;
  - strict JSON + JSON Schema 2020-12;
  - Definition vs Runtime-State separation;
  - stable IDs and explicit extensions;
  - declarative/no-eval gameplay contracts;
  - atomic Copilot ChangeSets;
  - semantic asset identity/provenance;
  - Godot 4.7.2 stable implementation pin.

## Runtime status

No gameplay runtime implementation exists yet. This is intentional. THE-6 implements data contracts and validation tooling only.

## Tests

No committed test harness exists yet. The approved THE-6 implementation plan requires tests/fixtures first, then the minimum validator/schema implementation to make them pass.

## Known blockers

The general-purpose container cannot resolve external GitHub hosts, so GitHub checkout cannot be used there. Schema validation will be developed in an isolated local Python workspace using the same `jsonschema==4.26.0` dependency and then published to the implementation branch only after fresh RED/GREEN verification.

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

1. Merge PR #2.
2. Create the THE-6 schema implementation branch and execute the test-first implementation plan.
3. Open implementation PR with validation evidence; then begin THE-7 Snowed In specification.

## Still unresolved before substantial runtime implementation

- Whether the editor shell is entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Exact Godot-side runtime validation/testing tooling beyond the schema CI harness.

## Handoff note

Read `docs/START_HERE.md`, this file, ADR-0001 through ADR-0012, the active schema design spec, and `docs/plans/2026-08-23-the-6-schema-implementation-plan.md` before continuing. Do not add gameplay runtime behavior to THE-6.