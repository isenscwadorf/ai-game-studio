# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch

`bootstrap/project-memory`

## Current objective

Establish durable repository memory and lock the foundational architecture before implementing runtime systems.

## Completed in this branch

- Added project constitution.
- Added mandatory AI-agent development/handoff rules.
- Added `START_HERE.md` as the canonical entry point.
- Established GitHub as permanent project memory and Linear as execution tracker.

## In progress

- Bootstrap remaining roadmap/glossary/ADR documents.
- Define canonical schema contracts.
- Specify Snowed In vertical slice.

## Runtime status

No game/runtime implementation exists yet. This is intentional. M0 is documentation and contract design first.

## Tests

No test harness exists yet. The first implementation plan will include schema-validation proof and the initial automated test structure.

## Known blockers

None currently.

## Accepted architecture decisions

- Player and NPC share one Character model.
- NPCs can initiate valid engine Actions autonomously.
- Actions are atomic; Activities are explicitly interruptible.
- World truth is separate from per-character knowledge and belief.
- OpenRouter is the default LLM gateway behind a provider abstraction.
- Inworld is optional behind an adapter/service boundary.
- Godot is runtime infrastructure, not the creator-facing product UX.

## Next three concrete tasks

1. Finish initial ADR set for accepted decisions.
2. Write the M0 canonical schema specification.
3. Write the Snowed In vertical-slice specification.

## Unresolved foundational decisions

The following must be resolved in M0 before substantial implementation:

- Exact Godot version pin at implementation start.
- Exact canonical project-data serialization format and migration approach.
- Whether the editor shell is implemented entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Initial test framework/tooling for Godot and schema contracts.

## Handoff note

Do not infer missing architecture from chat history. If information required for implementation is not in the repository, stop and document/resolve it before coding.
