# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch / review

Branch: `isenscwadorf/the-6-define-canonical-engine-schemas`

## Current objective

Review and approve the canonical engine-schema design before implementing any machine-readable schemas or runtime code.

## Completed

- PR #1 merged: durable repository memory and architecture baseline.
- Project constitution and product vision established.
- Mandatory AI-agent development/handoff rules established.
- `START_HERE.md` is the canonical entry point.
- Architecture overview, roadmap, glossary, security/contribution guidance, and durable docs structure established.
- ADR-0001: shared Character model.
- ADR-0002: autonomous Character agency.
- ADR-0003: Actions vs Activities.
- ADR-0004: provider-neutral AI adapters.
- ADR-0005: World Truth vs Character beliefs.
- Drafted `docs/specs/2026-08-23-canonical-engine-schemas-design.md` for Linear THE-6.

## Runtime status

No game/runtime implementation exists yet. This remains intentional. M0 locks contracts before implementation.

## Tests

No test harness exists yet. THE-6 implementation will introduce schema validation fixtures and a CI-ready validator only after the schema design is approved and an implementation plan is written.

## Known blockers

None. Current gate is human review of the canonical schema design.

## Accepted architecture decisions

- Player and NPC share one Character model.
- NPCs can initiate valid engine Actions autonomously.
- Actions are atomic; Activities are explicitly interruptible.
- World Truth is separate from per-character knowledge and belief.
- OpenRouter is the default LLM gateway behind a provider abstraction.
- Inworld is optional behind an adapter/service boundary.
- Godot is runtime infrastructure, not the creator-facing product UX.

## Proposed decisions awaiting schema-design approval

The THE-6 design proposes:

- strict UTF-8 JSON as canonical persisted project data;
- JSON Schema Draft 2020-12 for structural contracts;
- separate Definition and Runtime-State schema families;
- immutable human-readable namespaced IDs for definitions;
- opaque UUID runtime instance IDs;
- strict core schemas with namespaced extension points;
- registered Action/Activity executors rather than embedded executable code;
- non-executable Condition AST and registered typed Effects;
- Knowledge as a derived query/view over beliefs, memories, and exposed system information;
- atomic v1 Creator Copilot ChangeSets with engine-generated undo receipts.

These are not accepted ADRs until the design is approved.

## Next three concrete tasks

1. Review/approve the canonical engine-schema design (Linear THE-6).
2. After approval, write the THE-6 implementation plan and implement/test the machine-readable schemas.
3. Write/approve the Snowed In vertical-slice specification (Linear THE-7).

## Still unresolved before substantial runtime implementation

- Exact Godot stable version pin at implementation start.
- Whether the editor shell is entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Exact Godot-side runtime validation/testing tooling.

## Handoff note

Do not infer missing architecture from chat history. Read `docs/START_HERE.md`, this file, the accepted ADRs, and the active spec before continuing. Do not implement THE-6 until the schema design is approved and a written implementation plan exists.