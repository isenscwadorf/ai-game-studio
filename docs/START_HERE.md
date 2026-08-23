# Start Here

This is the required entry point for every new human or AI development session.

## What this project is

AI Game Studio is an AI-native systemic 2D game creation platform. It aims to let creators build RPGs, visual novels, dating sims, and life sims through natural language, visual editing, and code/schema editing over one shared project model.

The first vertical slice is **Snowed In**, a small family-house simulation used to prove autonomous characters, deterministic world rules, dynamic dialogue, perception, memories, needs, events, and AI-assisted creation.

## Current milestone

**M0 — Architecture Locked**

Do not begin broad runtime implementation until the core schema contracts and Snowed In vertical-slice specification are reviewed and accepted.

## Required reading order

1. `docs/CURRENT_STATE.md`
2. `docs/PROJECT_CONSTITUTION.md`
3. `docs/ROADMAP.md`
4. `docs/GLOSSARY.md`
5. relevant ADRs under `docs/DECISIONS/`
6. active spec under `docs/specs/`
7. active implementation plan under `docs/plans/`
8. `AGENTS.md` if you are an AI coding agent

## Canonical architecture rules

- One Character model for player and NPCs.
- Controller decides intent; Action system decides what is possible.
- NPCs are autonomous actors, not event puppets.
- World truth is separate from what each Character knows or believes.
- Actions are short/atomic; Activities are long-running/interruptible.
- AI never directly writes arbitrary runtime state.
- Provider APIs live behind adapters.
- Schemas are versioned and AI-readable.
- Repository state/documentation is authoritative; chat history is not.

## Project tracking

- GitHub: code, schemas, ADRs, specs, plans, CI, permanent history.
- Linear: milestones/issues/execution tracking.
- Figma: editor UX when visual design work begins.

## Current development sequence

1. Bootstrap durable repo memory. ✓
2. Design/approve core engine schemas. ✓
3. Implement/verify core schema registry and validation tooling. **Current**
4. Write/approve Snowed In vertical-slice spec.
5. Write Snowed In implementation plan.
6. Begin Snowed In prototype incrementally.

## Development setup for M0 schema work

Python 3.12+ is used only for development/schema validation. It is not an exported-game dependency.

```bash
pip install -r requirements-dev.txt
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
```

The schema registry resolves references locally. Tests must not require network access.

## Before ending a session

Update `docs/CURRENT_STATE.md`. If you changed architecture, add/update an ADR. Do not leave critical decisions only in a conversation.
