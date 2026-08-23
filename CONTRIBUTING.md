# Contributing

AI Game Studio is architecture-first and AI-assisted. Changes must remain understandable to a developer or AI agent who has no access to the conversation that produced them.

## Before working

Read `docs/START_HERE.md`, `docs/CURRENT_STATE.md`, `docs/PROJECT_CONSTITUTION.md`, relevant ADRs, and the active spec/plan. AI agents must also read `AGENTS.md`.

## Branching

Do not implement features directly on `main`. Use small focused branches and pull requests.

## Feature workflow

1. Define/confirm the requirement.
2. Write or update a spec when behavior is non-trivial.
3. Add an ADR if architecture changes.
4. Write an implementation plan for multi-step work.
5. Write a failing test.
6. Implement the smallest correct change.
7. Run verification.
8. Update docs and `docs/CURRENT_STATE.md`.
9. Open a focused PR.

## Architecture changes

Accepted ADRs are binding. If a change conflicts with one, do not silently work around it; propose a new/superseding ADR with explicit rationale.

## Testing

- Every bug fix gets a regression test.
- Deterministic gameplay must be testable without live AI providers.
- AI behavior uses contract/evaluation tests with invariant-based expectations where outputs can legitimately vary.
- Do not claim tests pass unless they were actually run.

## Documentation

Documentation is part of the implementation. Public contracts, schemas, system behavior, setup commands, and architectural decisions must be changed in the same PR as the code they affect.

## Pull requests

PRs should state:

- what changed
- why it changed
- architecture impact
- tests/verification run
- documentation updated
- known limitations/risks
- relevant Linear issue

## Scope discipline

Use the current milestone and vertical slice to decide whether a feature belongs now. Avoid speculative systems that do not validate a current foundational contract.
