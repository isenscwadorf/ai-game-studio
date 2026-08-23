# ADR-0012 — Pin Godot 4.7.2 stable for the initial implementation baseline

Status: Accepted
Date: 2026-08-23

## Context

Runtime implementation needs a reproducible Godot baseline. Building against development snapshots would increase churn while the platform architecture is still being established.

## Decision

The initial implementation baseline is pinned to **Godot 4.7.2 stable**. Upgrades require a deliberate dependency update with compatibility verification rather than silently following latest.

This pin applies when Godot runtime/editor implementation begins; THE-6 schema validation itself does not require Godot.

## Consequences

- Runtime behavior and CI can target a reproducible engine version.
- Godot 4.8 development snapshots are not used for foundational implementation.
- Future upgrades are explicit, reviewed changes.
