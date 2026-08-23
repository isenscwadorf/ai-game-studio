# AI Game Studio

AI-native systemic 2D game creation platform for RPGs, visual novels, dating sims, and life sims.

The project is designed around a deterministic game-system core that AI can understand and operate through explicit schemas, Actions, Activities, Affordances, Events, perception, memory, and project ChangeSets.

The first proving game is **Snowed In**, a small autonomous family-house simulation during a severe snowstorm.

## Development status

Current milestone: **Creator Foundation implementation (Slice 1)**.

The repository now contains the locally reviewed Windows Creator Foundation:
a Tauri/React editor for schema-backed local projects with basic Character and
logical Location editing, validation-gated persistence, and guarded dirty
project transitions. The local packaged release has reached its Home screen;
its production project Open and Save validation paths have also been exercised
with a disposable local project. Final hosted Windows packaging, artifact
extraction/launch, native folder-picker interaction, and real GUI close flows
remain review-gate work. This is not yet a playable Godot runtime or a
standalone exported game.

For Creator development and its supported flow, see
[`apps/creator/README.md`](apps/creator/README.md). The canonical Creator MVP
design and implementation plan live in
[`docs/superpowers/specs/`](docs/superpowers/specs/) and
[`docs/superpowers/plans/`](docs/superpowers/plans/).

## Start here

Every new development session should begin with:

1. [`docs/START_HERE.md`](docs/START_HERE.md)
2. [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md)
3. [`docs/PROJECT_CONSTITUTION.md`](docs/PROJECT_CONSTITUTION.md)
4. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
5. relevant ADRs in [`docs/DECISIONS/`](docs/DECISIONS/)

AI coding agents must also follow [`AGENTS.md`](AGENTS.md).

## Core principles

- Player and NPCs share one Character model.
- NPCs are autonomous actors and may initiate valid engine-supported actions.
- AI chooses intent; deterministic systems validate and execute world changes.
- World truth is separate from per-character knowledge/beliefs.
- Actions are atomic; Activities are explicitly long-running/interruptible.
- OpenRouter is the default general LLM gateway behind a provider abstraction; Inworld is optional.
- AI-generated content remains inspectable and editable.
- GitHub is the durable source of truth; chats are not project memory.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for milestones.
