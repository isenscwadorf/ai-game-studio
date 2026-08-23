# AI Game Studio Roadmap

## M0 — Architecture Locked

Goal: make the architecture precise enough that a new AI/developer can implement it without relying on chat history.

Deliverables:

- project constitution
- glossary
- ADR framework and initial accepted ADRs
- Character schema
- Controller contract
- World Entity schema
- Affordance schema
- Action schema
- Activity schema
- Event/Trigger schema
- Perception/Knowledge/Belief/Memory model
- Relationship model
- AI Provider contract
- Copilot ChangeSet contract
- Asset Identity/Provenance contract
- Snowed In vertical-slice spec
- schema validation proof + tests

Exit criteria:

- core contracts have examples and versioning rules
- no foundational ambiguity remains only in chat
- another AI can explain and continue the architecture from repo docs alone

## M1 — Snowed In Prototype

Goal: prove the systemic runtime in a deliberately small environment.

Scope:

- custom project launcher/editor shell
- project create/open/save
- one house and connected rooms
- five or six Characters
- one HumanController and multiple AIControllers
- movement/navigation
- doors and locks
- containers/items/inventory
- hunger and energy
- time and snow/weather state
- relationships and basic emotions
- perception, beliefs, and memories
- core Actions: MoveTo, TalkTo, Take, Give, Open, Close, Lock, Unlock, Eat
- core Activities: CookMeal, Sleep
- autonomous goal/plan/action loop
- dynamic dialogue
- event/trigger runtime
- save/load
- debug inspector

Explicitly out of scope:

- combat
- farming
- multiplayer
- 3D
- marketplace
- arbitrary AI-generated code execution
- complex nested interruption/rollback

Exit criterion:

A playable evening in the Snowed In house can produce different coherent outcomes without manually scripting every story branch.

## M2 — AI Creator Alpha

Goal: prove that the engine can be co-developed through natural language without hiding the underlying project structure.

Scope:

- Copilot panel
- engine schema/tool catalog
- project inspection tools
- typed ChangeSets
- preview/validate/apply/reject/undo
- character creation/modification
- room/location creation/modification
- event/dialogue generation
- system configuration generation
- image generation adapters
- canonical visual identity editing and regeneration
- project-aware AI debugger

Exit criterion:

From an empty project, the creator can describe a small Snowed In-like premise and receive a playable, structured, manually editable project.

## M3 — RPG + Visual Novel Foundation

- quests
- variables/switches
- advanced dialogue graphs
- VN scene direction/timeline
- items/equipment
- skills/stats
- shops
- turn-based combat baseline
- map/tile workflow
- tileset generation
- dating/relationship framework

## M4 — Life Simulation

- deeper needs
- jobs and schedules
- traits
- homes
- economy
- social autonomy
- richer memory
- routine planner
- utility systems
- scalable background simulation

## M5 — Platform

- plugin SDK
- reusable gameplay modules
- project templates
- extension registry
- advanced export
- performance tooling
- optional collaboration/cloud after local architecture is stable
- optional marketplace only after plugin contracts are stable

## Scope rule

A feature is not pulled forward merely because it is attractive. Before adding it, ask:

1. Does the current vertical slice require it?
2. Does it validate a foundational contract?
3. Can it be a module later?
4. Does it multiply interacting-system complexity?

If the first two answers are no, defer it.
