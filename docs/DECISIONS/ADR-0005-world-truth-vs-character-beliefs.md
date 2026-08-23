# ADR-0005: Separate World Truth from Character Knowledge and Beliefs

Status: Accepted  
Date: 2026-08-23

## Context

Autonomous roleplay becomes incoherent if every NPC receives omniscient world state. Characters should react to what they actually saw, heard, learned, inferred, or remembered.

## Decision

The runtime maintains authoritative **World Truth** separately from each Character's **Knowledge/Belief State**.

A Character's belief state is updated only through defined channels such as perception, conversation/information transfer, memory recall, inference, or explicit system knowledge rules. Beliefs may be stale, incomplete, or wrong.

LLM context for a Character is built from that Character's allowed knowledge and perception context, not automatically from the full world database.

## Example

If the player moved from the bedroom to the garage while Sarah did not observe it, World Truth may say `player.location = garage` while Sarah still believes the player is upstairs based on last observation.

## Consequences

### Positive

- Prevents accidental NPC omniscience.
- Enables secrets, misunderstanding, deception, investigation, discovery, and plausible mistakes.
- Makes perception and memory meaningful gameplay systems.

### Costs

- Information provenance and belief updates require explicit design.
- Debug tooling must show both World Truth and per-character belief state.
- Save/load must preserve relevant belief/memory state.

## Invariant

Do not automatically mirror hidden World Truth into AI Character context. Information must reach a Character through an explicit knowledge path.
