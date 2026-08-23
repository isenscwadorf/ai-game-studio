# ADR-0006 — Canonical persisted data uses strict JSON and JSON Schema 2020-12

Status: Accepted
Date: 2026-08-23

## Context

AI Game Studio requires a project format that humans, conventional tooling, Godot, and AI systems can all read and validate reliably. Ambiguous or executable formats increase the chance that AI-generated content silently introduces malformed state.

## Decision

Canonical persisted project data uses strict UTF-8 JSON. Machine-readable validation contracts use JSON Schema Draft 2020-12 with locally vendored schemas and stable `urn:aigs:` identifiers.

JSON5, YAML, comments inside canonical JSON, executable expressions, and provider-specific serialization are not canonical project formats.

Core schemas default to `additionalProperties: false`. Extensibility occurs through explicit registered `extensions` namespaces.

## Consequences

- Project data is deterministic to parse and straightforward to diff.
- AI output can be validated before entering the project.
- Schema validation can run offline.
- Human commentary belongs in Markdown or explicit description fields.
- Plugins must register explicit extension schemas rather than adding arbitrary fields.
