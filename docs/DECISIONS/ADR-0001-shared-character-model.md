# ADR-0001: Player and NPCs Share One Character Model

Status: Accepted  
Date: 2026-08-23

## Context

The platform must support human-controlled protagonists, autonomous NPCs, control switching, life-sim systems, relationships, needs, inventory, memories, and AI planning without duplicating game logic.

## Decision

There is one canonical `Character` model for all simulated people. The currently human-controlled person is not a separate Player entity type.

Decision ownership is delegated to a Controller. Initial controller types are `HumanController` and `AIController`.

Both controllers request the same typed Actions and Activities. Gameplay systems must not create separate player-only and NPC-only versions of inventory, movement, interaction, relationships, memory, or needs unless a future requirement proves a real semantic difference.

## Alternatives considered

1. Separate Player and NPC classes.
2. Shared base class with heavily divergent player/NPC subsystems.

## Consequences

### Positive

- One systemic language for humans, NPCs, AI, Copilot, tests, and mods.
- Control switching becomes a Controller change rather than entity conversion.
- Less duplicated gameplay logic and fewer bridge systems.
- AI tool schemas remain substantially simpler.

### Costs

- Input, camera, menus, and other human-only concerns must remain in `HumanController`/presentation layers rather than leaking into Character.
- Early systems require cleaner generic APIs instead of player-specific shortcuts.

## Invariant

A feature affecting simulated people should be implemented against Character/system contracts, not against a special Player class.
