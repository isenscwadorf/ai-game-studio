# ADR-0007 — Separate project Definitions from mutable Runtime State

Status: Accepted
Date: 2026-08-23

## Context

The editor/Copilot modifies game design while runtime actors modify instantiated world state. Mixing those concerns would make saves fragile, project edits unsafe, and AI permissions unclear.

## Decision

Persistent creator-authored/generated Definitions are separate contracts from mutable Runtime State. Examples include `CharacterDefinition` vs `CharacterState` and `ObjectDefinition` vs `ObjectState`.

Copilot project ChangeSets target definitions. Runtime Actions and Activities target instances through opaque runtime IDs.

## Consequences

- Editing project definitions does not silently rewrite a save.
- Saves and runtime snapshots can evolve independently from authoring data.
- AI permissions have a clear boundary between creator operations and character actions.
- Migrations distinguish project-format migrations from runtime/save migrations.
