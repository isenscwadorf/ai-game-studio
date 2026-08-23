# AI Game Studio — Project Constitution

Version: 0.1  
Date: 2026-08-23  
Status: Architecture baseline

## Mission

Build an AI-native 2D game creation platform for RPGs, visual novels, dating sims, and life sims. A creator can describe a game in natural language; AI proposes and creates structured characters, worlds, assets, systems, events, triggers, dialogue, and gameplay logic. Every generated part remains inspectable, editable, correctable, regenerable, and replaceable.

The first proving game is **Snowed In**: a high-school student and family trapped in a house during a severe snowstorm, with autonomous family members, needs, relationships, memories, dynamic dialogue, routines, cooking, sleeping, weather, and emergent events.

## Non-negotiable principles

1. **Godot is infrastructure, not the user experience.** AI Game Studio provides its own editor and workflows. The Godot editor is not required for normal creators.
2. **Schema-first.** Characters, locations, items, actions, activities, affordances, events, triggers, memory, relationships, assets, and AI configuration use versioned machine-readable contracts.
3. **AI never directly mutates arbitrary world state.** AI requests typed engine actions; the deterministic runtime validates and executes them.
4. **Player and NPCs share one Character model.** The controller differs; the simulated person does not.
5. **NPCs are autonomous actors.** They may form goals, plans, and initiate any valid engine-supported action.
6. **World truth and character knowledge are separate.** Characters reason from what they perceive, remember, infer, or are told; they may be wrong.
7. **Actions and Activities are different.** Actions are short and atomic. Activities are long-running and explicitly interruptible. v0.1 avoids arbitrary nested interruption and rollback.
8. **AI-generated is never AI-hidden.** AI output becomes ordinary editable project data, code, events, assets, or schemas. Significant changes are previewable and undoable.
9. **Provider independent.** OpenRouter is the default LLM gateway. Inworld is an optional character/voice/runtime adapter. Gameplay systems never import provider APIs directly.
10. **The repository is project memory.** Chats are not authoritative. A different AI or developer must be able to continue from the repo alone.

## Core runtime model

### Character

Every human-like actor uses one Character contract containing identity, visual identity, physical state, traits, skills, needs, emotions, relationships, memories, beliefs/knowledge, inventory, location, goals, current plan, action history, and controller.

Controller types begin with:

- `HumanController`
- `AIController`

Future controllers may include remote, replay, or test controllers. There is no separate Player class; session state identifies the currently human-controlled Character.

### World entities

The world contains stable-ID, schema-versioned entities such as Character, Location, Room, Object, Item, Container, Door/Portal, time, weather, and system state. Entities expose components, tags, references, and affordances.

### Affordances

Objects expose what actors can attempt. Examples:

- Bed: Sit, Sleep, Nap, Relax
- Stove: Cook, HeatFood, TurnOn, TurnOff, Clean
- Door: Open, Close, Lock, Unlock, Knock
- Character: TalkTo, GiveItem, Ask, Hug, Insult, Follow

AI receives contextually relevant affordances instead of raw engine internals.

### Universal Action contract

Every Action defines:

- stable action ID
- actor type
- target type(s)
- parameters
- preconditions
- validation rules
- cost/duration
- execution effects
- emitted world events
- perception consequences
- structured failure reasons
- AI-facing description

Flow:

`Controller intent -> Action request -> Validate -> Execute or Fail -> World event -> Perception -> Belief/Memory update -> Reactions`

### Activities

Activities are explicitly long-running and support `start`, `progress`, `finish`, and `cancel`. Initial examples: CookMeal, Sleep, Shower, Study, WatchTV, Work. Only Activities are interruptible in v0.1.

## Event and Trigger system

Events are the reactive nervous system of the world, not merely scripts that puppet NPCs. Trigger families include action started/completed/failed, location enter/leave, interaction, dialogue, time, weather, need thresholds, relationship changes, memory creation, perception, variable changes, quest state, and object state.

An Event contains stable ID, trigger, conditions, effects/reactions, cooldown/repeat rules, priority, scope, and debug metadata.

## Autonomous character loop

`Perceive -> update beliefs/memories -> evaluate needs/emotions/goals -> form/revise goal -> plan/replan -> select next valid Action -> runtime validates/executes -> observe result -> repeat when needed`

Rules:

- LLMs do not receive omniscient world state by default.
- Pathfinding, animation, collision, and simple routine behavior are deterministic.
- LLM calls are event-driven and reserved for planning, social reasoning, dialogue, ambiguity, and novel situations.
- Failed Actions return structured reasons so agents can replan rather than narrating success.

## AI architecture

All providers sit behind an internal provider interface. Gameplay code depends only on that interface.

Initial AI roles:

- Creator Copilot
- Character Planner
- Character Dialogue
- World/Quest Designer
- Asset Director
- Code/System Copilot
- Debugger
- Summarizer/Memory Compressor

Each role has its own provider/model policy, context policy, tool allowlist, cost budget, latency budget, and fallback policy.

OpenRouter is the default general LLM gateway. Inworld may provide optional real-time character, voice, memory/knowledge, or orchestration capabilities. Other direct providers or local models can be added later without changing gameplay contracts.

SillyTavern concepts may inspire character/persona profiles, lorebooks/world info, context management, group conversation, extensions, connection profiles, image generation, and TTS. Do not copy SillyTavern source code without an explicit licensing decision.

## Creator Copilot contract

The Copilot understands the engine through generated schemas and a tool catalog, not by guessing source code. Its workflow is:

1. Inspect project.
2. Produce a proposed game/system plan.
3. Resolve dependencies.
4. Produce a typed ChangeSet.
5. Validate it.
6. Preview it for the creator.
7. Apply approved operations.
8. Run validators/tests.
9. Report exactly what changed.

Representative ChangeSet operations include CreateCharacter, UpdateCharacter, CreateLocation, CreateRoom, CreateObject, AddAffordance, CreateAction, CreateActivity, CreateEvent, CreateDialogue, AddRelationship, CreateItem, GenerateAsset, UpdateAssetProfile, CreateSystem, and UpdateSystemConfig.

## AI asset identity

Generated assets use semantic identity and provenance, not filenames as identity. Character and location profiles preserve canonical identity, style, references, prompts, provider/model metadata, and generation history. A request such as “make Dad fatter and meaner looking” updates `character.father.visual_identity` and regenerates affected outputs instead of silently creating a new character.

## Editor principle

Natural-language creation, visual editing, and advanced schema/code editing must manipulate the same underlying model. There is no disconnected “AI mode” versus “manual mode.”

Primary workspaces are expected to include Project, World/Maps, Characters, Objects/Items, Actions & Activities, Events & Triggers, Dialogue, Relationships, AI & Memory, Asset Studio, Systems, Playtest, Debugger, and Build/Export.

## Durable project memory

Required durable documentation:

- `README.md`
- `AGENTS.md`
- `docs/START_HERE.md`
- `docs/CURRENT_STATE.md`
- `docs/PROJECT_CONSTITUTION.md`
- `docs/ARCHITECTURE.md`
- `docs/GLOSSARY.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS/`
- `docs/SCHEMAS/`
- `docs/SYSTEMS/`
- `docs/AI/`
- `docs/TESTING/`
- `docs/HANDOFF/`
- `docs/specs/`
- `docs/plans/`

Architecture decisions use ADRs. No agent may silently reverse an accepted ADR.

## Cross-chat / cross-AI handoff

At the start of a new development session:

1. Read `docs/START_HERE.md`.
2. Read `docs/CURRENT_STATE.md`.
3. Read relevant ADRs.
4. Read the active spec and implementation plan.
5. Run the fast test suite.
6. Inspect branch and git status.
7. Continue only when repository state matches documentation.

At the end of a meaningful session:

1. Run required tests.
2. Update docs for changed behavior.
3. Update `docs/CURRENT_STATE.md`.
4. Add/update an ADR for architectural changes.
5. Update changelog for user-visible changes when present.
6. Commit descriptively.
7. Link work to the relevant tracker issue.
8. Leave no critical project knowledge only in chat.

## Development workflow

`Idea -> Spec -> ADR if architectural -> Implementation plan -> failing test -> minimal implementation -> passing test -> integration test -> documentation -> review -> merge`

Rules:

- `main` stays runnable.
- Prefer small branches and PRs.
- Every bug gets a regression test.
- Schema changes require migration/versioning consideration.
- AI-generated code gets the same tests and review as human code.
- No code is accepted because an AI merely claims it works.

## Initial milestones

### M0 — Architecture Locked

Deliver project constitution, glossary, repository conventions, ADR framework, Character/World/Action/Activity/Affordance/Event schemas, perception/knowledge/memory model, Controller contract, AI provider contract, ChangeSet contract, asset identity/provenance contract, Snowed In specification, and schema-validation proof.

### M1 — Snowed In Prototype

One house, five or six Characters, HumanController for the protagonist, AIControllers for NPCs, movement, doors, containers/items, inventory, hunger, energy, time/weather, relationships, basic emotions, perception, memories, core Actions, CookMeal/Sleep Activities, autonomous planning, dynamic dialogue, event runtime, save/load, and debugging.

### M2 — AI Creator Alpha

Copilot panel, engine schema/tool catalog, typed ChangeSets, preview/validation/apply/reject/undo, structured character/location/event/dialogue/system generation, image-generation adapters, canonical visual identity correction, and AI-assisted project debugging.

### M3 — RPG / VN Foundation

Quests, variables/switches, richer dialogue graphs, VN scene direction, items/equipment, skills/stats, shops, turn-based combat baseline, map/tile workflow, tileset generation, and dating/relationship framework.

### M4 — Life Simulation

Deeper needs, jobs, schedules, traits, homes, economy, social autonomy, richer memory, routine planning, and scalable background simulation.

### M5 — Platform

Plugin SDK, reusable gameplay modules, templates, extension registry, advanced export, performance tooling, and only then optional collaboration/cloud/marketplace features if justified.

## Scope control

Before adding a feature, ask:

1. Does Snowed In require it now?
2. Does it validate a foundational engine contract?
3. Can it be a module later?
4. Will it increase interacting-system complexity disproportionately?

If 1 and 2 are both no, defer it.

## Definition of done

A task is done only when implementation exists, tests pass, schemas validate, relevant behavior is documented, architecture invariants hold, `CURRENT_STATE` is updated, tracker state is updated, changes are committed/reviewed, and another AI can understand the work from repository artifacts without the original chat.
