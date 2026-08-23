# Architecture Overview

This document describes the current intended system boundaries. Detailed contracts will be added during M0 and supersede informal examples here.

## Layering

```text
AI Game Studio Editor
│
├─ Creator Copilot
├─ Asset Studio
├─ World / Character / Event editors
├─ Playtest + Debug tools
│
Project Model + Versioned Schemas
│
├─ Characters / Controllers
├─ World Entities / Components
├─ Affordances
├─ Actions / Activities
├─ Events / Triggers
├─ Perception / Beliefs / Memory
├─ Relationships / Needs / Time / Weather
│
AI Service Layer
│
├─ Provider-neutral interfaces
├─ OpenRouter adapter (default general LLM gateway)
├─ Inworld adapter/service (optional)
└─ Future provider/local adapters
│
Deterministic Runtime
│
├─ Validation
├─ Simulation
├─ Navigation
├─ State changes
├─ Save/load
└─ World-event emission
│
Godot Runtime Infrastructure
```

## System ownership

### Project model

Owns persistent creator-authored/generated game definitions. Project identity must be stable and diff-friendly. Runtime state and project definitions should not be conflated.

### Character system

Owns simulated person state. It does not own input devices or provider APIs. Character state is controller-independent.

### Controller system

Owns intent selection. `HumanController` converts UI/input intent into typed requests. `AIController` converts perception/belief/goal/plan context into typed requests. Neither bypasses validation.

### Action system

Owns atomic world mutations. It validates requests, emits structured success/failure, applies deterministic effects, and emits world events.

### Activity system

Owns long-running interruptible behavior with explicit lifecycle and cancellation semantics.

### Affordance system

Owns discovery of valid interactions between actor and target/context. It is a key AI-facing abstraction.

### Event system

Owns reactive rules triggered by world occurrences. It complements autonomous behavior rather than replacing it.

### Perception / belief / memory systems

Own the separation between World Truth and what each Character can legitimately reason from.

### AI service layer

Owns model/provider communication, structured output, tool calling, streaming, cost/latency policies, fallbacks, and provider errors. Gameplay does not know which provider is used.

### Creator Copilot

Owns project inspection and proposed `ChangeSet`s. It never edits hidden state outside the project model/tool contracts. It previews and validates significant changes before application.

### Asset system

Owns semantic asset identity, generated variants, provenance, and regeneration relationships. Filenames are storage details, not identity.

### Godot boundary

Godot provides rendering, input plumbing, audio, navigation/physics, scene runtime, packaging/export, and other low-level engine services. Creator-facing concepts should use AI Game Studio terminology and contracts rather than requiring knowledge of Godot nodes/scenes/resources.

## Data-flow examples

### Autonomous NPC action

```text
World event/perception
-> Character belief update
-> AIController goal/plan evaluation
-> typed Action request
-> Action validation
-> deterministic execution or structured failure
-> world event
-> perception/memory updates
-> potential replanning/reactions
```

### Creator request

```text
Natural-language creator request
-> Copilot inspects project schemas/state
-> proposed plan
-> typed ChangeSet
-> dependency/schema validation
-> preview
-> approved apply
-> validation/tests
-> editable project data/assets/code
```

## Complexity controls

- LLM decision loops are event-driven, not per-frame.
- Routine behavior should use deterministic systems where possible.
- Only Activities are interruptible in v0.1.
- M1 is intentionally one small house and a small cast.
- No arbitrary AI-generated runtime code execution in M1.
- No separate player/NPC implementations.
- No provider-specific gameplay dependencies.

## Pending M0 design work

- canonical project serialization and migration/version strategy
- exact schema package/file layout
- Controller interface
- Action/Activity/Affordance exact schemas
- Event/Trigger/Condition/Effect exact schemas
- perception and information-provenance rules
- AI provider capability interface
- ChangeSet transaction/undo semantics
- asset identity/provenance schema
- exact editor/runtime process boundary
- test framework and CI contract
