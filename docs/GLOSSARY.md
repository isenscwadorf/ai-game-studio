# Glossary

This glossary defines canonical terms. Use these names consistently in code, schemas, docs, prompts, and UI unless an ADR changes them.

## Character

A simulated person/actor. Player-controlled and AI-controlled people use the same Character contract.

## Controller

The decision source attached to a Character. Initial implementations are `HumanController` and `AIController`. Controllers issue intent through Actions; they do not directly rewrite world state.

## World Truth

The authoritative current simulation state.

## Knowledge / Belief State

What a Character currently knows or believes about the world. It may be incomplete or incorrect and must not automatically mirror World Truth.

## Perception

A mechanism by which a Character can observe world events/state through supported senses or information channels.

## Memory

A stored Character-specific representation of a past perceived/learned event or fact. Memory is not the same as current World Truth.

## Goal

A desired high-level state formed by a Character/agent, such as “get something to eat” or “prevent the player from leaving.” Goals may be generated dynamically.

## Plan

An ordered or conditional set of intended steps used to pursue a Goal. Plans are proposals; the runtime still validates every Action.

## Action

A short, atomic, typed request to change the world, such as `TakeItem`, `OpenDoor`, or `GiveItem`. Actions validate preconditions and return success or structured failure.

## Activity

A long-running interaction with explicit lifecycle (`start`, `progress`, `finish`, `cancel`), such as `CookMeal` or `Sleep`. Activities are the only interruptible gameplay operations in v0.1.

## Affordance

A capability an entity exposes to an actor, such as a Bed exposing Sleep or a Door exposing Open/Lock. Affordances help humans and AI discover valid interactions.

## Event

A reactive rule that observes triggers/conditions and produces effects or reactions. Events do not need to puppet all NPC behavior.

## Trigger

A typed occurrence that can activate Event evaluation, such as `OnActionCompleted`, `OnEnterLocation`, or `OnRelationshipChanged`.

## Effect

A deterministic consequence executed by a system/event after validation.

## ChangeSet

A structured set of creator-facing project modifications proposed by Copilot, such as creating a Character, adding a Room, editing an Event, or regenerating an asset. ChangeSets are inspectable and validated before application.

## Creator Copilot

The AI assistant that co-develops the game by understanding engine schemas, project state, tool contracts, and dependencies.

## Character Planner

The AI role that turns a Character’s current context into goals/plans/next high-level actions when deterministic logic alone is insufficient.

## Character Dialogue

The AI role responsible for context-aware speech constrained by Character identity, knowledge, relationship, situation, and game rules.

## AI Provider Adapter

A provider-independent integration boundary for model services. OpenRouter and Inworld are adapters/services behind this boundary, not gameplay dependencies.

## Asset Identity

The canonical semantic identity of a generated visual/audio asset family, such as `character.father` or `location.family_house`. It persists across regenerations.

## Asset Provenance

Metadata describing how an asset was created or modified, including provider/model, prompt recipe, references, generation history, and other reproducibility information where available.

## Snowed In

The first vertical-slice game used to validate the architecture: a high-school student trapped in a family house during a severe snowstorm with autonomous family members and emergent interactions.

## Schema

A versioned machine-readable contract defining project/runtime structures and allowed fields. Schemas are shared across editor tooling, AI tools, validation, and runtime serialization where practical.

## ADR

Architecture Decision Record. A durable document describing architectural context, the accepted decision, alternatives, and consequences. Accepted ADRs cannot be silently reversed.
