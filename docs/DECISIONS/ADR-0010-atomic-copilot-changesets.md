# ADR-0010 — Creator Copilot modifies projects through atomic ChangeSets

Status: Accepted
Date: 2026-08-23

## Context

The Creator Copilot must be able to make large coordinated changes while keeping them inspectable, reversible, and safe. Direct ad-hoc file edits would make partial failure and undo behavior difficult to reason about.

## Decision

Copilot proposes a typed `ChangeSet` composed of validated operations. The engine validates dependencies and permissions before application, previews significant changes, and applies the ChangeSet atomically: all operations commit or none do.

Undo data is generated from the authoritative pre-change project state by the engine. The AI does not invent rollback instructions.

## Consequences

- Partial AI edits cannot leave the project in an indeterminate state.
- Creator review can operate on one coherent change proposal.
- Undo/redo is based on real prior state.
- ChangeSet operations become a stable API shared by the editor and AI tooling.
