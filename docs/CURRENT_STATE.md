# Current Project State

Last updated: 2026-08-23

## Milestone

**M0 — Architecture Locked**

## Current branch / review

Branch: `bootstrap/project-memory`  
PR: `#1 docs: establish durable project memory and architecture baseline`

## Current objective

Review and merge the durable repository-memory baseline, then move directly into canonical schema design and the Snowed In vertical-slice specification.

## Completed in this branch

- Project constitution and product vision.
- Mandatory AI-agent development/handoff rules.
- `START_HERE.md` canonical entry point.
- Architecture overview, roadmap, and glossary.
- Contribution, security, and changelog baselines.
- Durable documentation homes for schemas, systems, AI, testing, and handoff.
- ADR-0001: shared Character model.
- ADR-0002: autonomous Character agency.
- ADR-0003: Actions vs Activities.
- ADR-0004: provider-neutral AI adapters.
- ADR-0005: World Truth vs Character beliefs.
- GitHub/Linear linkage for repository-memory work.

## Runtime status

No game/runtime implementation exists yet. This is intentional. M0 is documentation and contract design first.

## Tests

No test harness exists yet. This PR is documentation-only. The first implementation plan will introduce schema validation and automated test structure before substantive runtime code.

## Known blockers

None currently.

## Accepted architecture decisions

- Player and NPC share one Character model.
- NPCs can initiate valid engine Actions autonomously.
- Actions are atomic; Activities are explicitly interruptible.
- World Truth is separate from per-character knowledge and belief.
- OpenRouter is the default LLM gateway behind a provider abstraction.
- Inworld is optional behind an adapter/service boundary.
- Godot is runtime infrastructure, not the creator-facing product UX.

## Next three concrete tasks

1. Review/merge PR #1.
2. Write the M0 canonical engine-schema specification (Linear THE-6).
3. Write the Snowed In vertical-slice specification (Linear THE-7).

## Unresolved foundational decisions

The following must be resolved in M0 before substantial implementation:

- Exact Godot stable version pin at implementation start.
- Exact canonical project-data serialization format and migration approach.
- Whether the editor shell is implemented entirely inside Godot or uses a separate desktop UI layer around the Godot runtime.
- Initial test framework/tooling for Godot and schema contracts.

## Handoff note

Do not infer missing architecture from chat history. If information required for implementation is not in the repository, stop and document/resolve it before coding.
