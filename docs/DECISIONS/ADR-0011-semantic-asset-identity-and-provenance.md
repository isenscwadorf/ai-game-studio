# ADR-0011 — Generated assets use semantic identity and provenance

Status: Accepted
Date: 2026-08-23

## Context

AI-generated visual content must remain attached to the same character/location/object across regenerations and creator corrections. Treating filenames or individual generations as identity would make requests such as “make Dad heavier” unreliable.

## Decision

Assets are organized around stable semantic `AssetIdentity` definitions. Generated files are variants/artifacts associated with that identity. Generation provenance records provider/model, input references, prompt recipe, generation settings where available, parent generation, and creator-approved selection state.

Filesystem paths are storage details and never canonical asset identity.

## Consequences

- Character/location continuity survives regeneration and file movement.
- The creator can revise structured visual identity and regenerate affected variants.
- AI can distinguish “modify this identity” from “create a new entity.”
- Generated content is traceable and reproducible to the extent supported by the provider.
