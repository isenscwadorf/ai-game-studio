# ADR-0009 — Core gameplay contracts are declarative and cannot contain arbitrary eval

Status: Accepted
Date: 2026-08-23

## Context

AI must be able to construct Conditions, Events, Actions, Activities, and Effects safely. Embedding arbitrary source/eval strings in project data would make validation, debugging, security, and deterministic behavior unreliable.

## Decision

Core project schemas use typed declarative contracts:

- Conditions use a registered typed AST.
- Actions and Activities reference registered executor keys.
- Effects reference registered typed effect operations.
- Parameters are validated by registered schemas.

Core data contains no JavaScript, GDScript, Python, template expression, or generic `eval` field.

## Consequences

- AI can generate gameplay data without receiving arbitrary code execution authority.
- Runtime executors remain authoritative for final validation and mutation.
- Conditions/effects can be inspected, visualized, validated, and translated by the editor.
- Advanced scripted extensions, if introduced later, require an explicit separate trust model and ADR.
