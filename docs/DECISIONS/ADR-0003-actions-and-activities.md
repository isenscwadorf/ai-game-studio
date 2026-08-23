# ADR-0003: Separate Atomic Actions from Interruptible Activities

Status: Accepted  
Date: 2026-08-23

## Context

A living simulation benefits from interruption, but making every operation resumable/interrupted/rollback-capable would create excessive complexity early in development.

## Decision

The runtime distinguishes:

- **Action** — short, atomic, validated, and completed as one operation after validation.
- **Activity** — explicitly long-running with lifecycle `start`, `progress`, `finish`, and `cancel`.

Only Activities are interruptible in v0.1.

Initial atomic examples: OpenDoor, CloseDoor, TakeItem, GiveItem, LockDoor, SitDown.  
Initial Activity examples: CookMeal, Sleep, Shower, Study, WatchTV, Work.

v0.1 will not implement arbitrary nested interruptions, general rollback, resumable action stacks, or partial-state recovery for every Action.

## Alternatives considered

1. Every operation is instantaneous.
2. Every operation is a fully interruptible state machine.
3. One generalized task abstraction for everything.

## Consequences

### Positive

- Supports believable long-running behavior without making every tiny interaction complex.
- Clearer debugging and serialization.
- Advanced interruption can be added inside the Activity abstraction later.

### Costs

- Designers/system authors must choose whether a behavior is an Action or Activity.
- Some behaviors may be promoted from Action to Activity later, requiring migration/versioning.

## Invariant

Do not add partial interruption semantics to ordinary Actions. If a behavior genuinely needs duration/interruption, model it as an Activity.
