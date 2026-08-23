# AI Agent Development Rules

This repository is designed to survive chat resets, agent changes, and long pauses. Any AI coding agent must treat repository artifacts as authoritative.

## Required reading order

Before changing code or architecture, read:

1. `docs/START_HERE.md`
2. `docs/CURRENT_STATE.md`
3. `docs/PROJECT_CONSTITUTION.md`
4. relevant files in `docs/DECISIONS/`
5. active spec in `docs/superpowers/specs/` (or `docs/specs/` for an older active stream)
6. active implementation plan in `docs/superpowers/plans/` (or `docs/plans/` for an older active stream)

Then inspect the current branch and run the documented fast verification commands.

## Architectural invariants

Do not violate these without a new ADR and explicit approval:

- Player and NPCs use the same Character model.
- Human and AI controllers issue the same typed Actions.
- AI does not directly mutate arbitrary world state.
- World truth is separate from Character knowledge/beliefs.
- Actions are atomic; Activities are long-running and interruptible.
- NPCs may autonomously form goals and initiate valid engine-supported actions.
- Gameplay systems do not depend directly on OpenRouter, Inworld, or another provider API.
- All important AI/editor contracts are schema-first and versioned.
- AI-generated project changes must be inspectable and, where practical, undoable.
- Godot is underlying runtime infrastructure; the product UX is AI Game Studio.

## Working rules

- Never make architecture decisions only in chat.
- Never silently reverse an accepted ADR.
- Do not work directly on `main` unless the human explicitly requests it.
- Prefer small focused branches and PRs.
- Prefer small focused files with clear responsibility.
- Do not duplicate concepts into separate player/NPC implementations.
- Do not introduce a provider-specific dependency into gameplay code.
- Do not add scope merely because a feature is interesting; use Snowed In and current milestone exit criteria to judge necessity.

## Testing rules

- Use test-driven development for features and bug fixes.
- Every bug fix receives a regression test.
- Deterministic simulation logic must be testable without an LLM call.
- AI integrations require contract/evaluation fixtures; do not assert a single exact prose answer when multiple valid outcomes exist.
- A feature is not complete until verification has actually been run.

## Documentation rules

Update documentation in the same change when public contracts or architecture change.

At the end of every meaningful session update `docs/CURRENT_STATE.md` with:

- current milestone
- branch/commit or PR
- work completed
- work in progress
- failing tests or known bugs
- unresolved decisions
- next three concrete tasks

If architecture changes, create/update an ADR in `docs/DECISIONS/`.

## Commit/PR expectations

Use descriptive conventional-style messages where practical, for example:

- `docs: add shared character ADR`
- `feat(actions): add TakeItem validation`
- `fix(memory): prevent omniscient location updates`
- `test(actions): cover locked door failure`

PR descriptions should state what changed, why, architecture impact, tests run, documentation updated, and remaining risks.

## Definition of done

Work is complete only when:

1. implementation is present,
2. required tests have passed,
3. schemas/contracts validate,
4. documentation is current,
5. architecture invariants remain satisfied,
6. `docs/CURRENT_STATE.md` is current,
7. the change is reviewable from the repository alone.

Do not claim completion without verification evidence.
