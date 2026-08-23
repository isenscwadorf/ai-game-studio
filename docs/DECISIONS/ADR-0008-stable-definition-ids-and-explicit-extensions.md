# ADR-0008 — Stable definition IDs and explicit extension namespaces

Status: Accepted
Date: 2026-08-23

## Context

AI-generated projects need references that survive display-name changes, asset moves, and refactors. At the same time, future plugins need extensibility without weakening validation.

## Decision

Persistent definitions use immutable human-readable namespaced IDs such as `character.father`, `room.kitchen`, and `action.open`. Runtime instances use opaque UUIDs. Filesystem paths and display names are never identity.

Core schemas reject undeclared fields. Plugin/custom data is stored only under explicit namespaced `extensions` entries whose schemas are registered with the schema registry.

## Consequences

- Cross-references remain stable through normal editing.
- AI can reason about meaningful IDs without deriving semantics from filenames.
- Typos and hallucinated properties are rejected rather than silently stored.
- Plugins retain flexibility through a controlled extension mechanism.
