# ADR-0002: NPCs Are Autonomous Actors

Status: Accepted  
Date: 2026-08-23

## Context

The product goal is a systemic world where characters can create emergent stories rather than waiting for authored events to command every important behavior.

## Decision

AI-controlled Characters may form their own goals, create/revise plans, and initiate any engine-supported Action or Activity that is valid in their current world context.

Authored Events observe and react to simulation changes; they are not the sole authority that causes NPC behavior.

The runtime, not the LLM, determines whether a requested Action succeeds. AI cannot narrate success into existence.

## Example

A father who believes the player intends to leave during a dangerous storm may autonomously form the goal “prevent them from leaving,” walk to the front door, and attempt `LockDoor`. The Action system validates access and execution. Other Characters may perceive the result and react.

## Alternatives considered

1. NPCs choose only from developer-authored goal templates.
2. Important actions require explicit Event permission.
3. AI controls dialogue only while behavior remains scripted.

## Consequences

### Positive

- Emergent stories can arise from system interactions.
- Replays can diverge without manually scripting every branch.
- Characters can respond to novel situations.

### Costs and controls

- The Action/Affordance system must be explicit and safe.
- Planning must be bounded by valid tools and contextual knowledge.
- AI calls must be budgeted/event-driven rather than frame-driven.
- Debugging needs action histories, reasoning context, failure reasons, and world-event inspection.

## Invariant

Do not add a hidden story-author gate that NPCs must pass before ordinary or consequential valid Actions. Consequences are controlled by world rules, affordances, validation, and reactive systems instead.
