# AI Game Studio Creator MVP Design

Date: 2026-08-23
Status: Proposed for final user review
Scope owner: Creator MVP / THE-7 architectural continuation

## 1. Purpose

AI Game Studio v0.1 must become a real Windows creator application that a non-developer can download, open, use to create a small game, and playtest without installing Godot, Python, Node.js, Rust, or other developer tooling.

The first release is intentionally a thin end-to-end vertical slice rather than a complete engine. It must prove that the editor, project model, AI authoring, asset generation, systemic simulation, runtime AI, voice, debug tooling, and save/reopen workflow can operate together on the same canonical project data.

The product remains broader than a visual-novel engine long term, but v0.1 uses a visual-novel/location-screen presentation to avoid the animation, tileset, pathfinding-visual, and world-art burden of top-down gameplay.

The first reference game is **Snowed In**: a family trapped in a modern home during a severe snowstorm. Snowed In is a starter/sample project and architecture proof, not hard-coded engine behavior.

## 2. Locked v0.1 decisions

The following decisions are approved for v0.1:

- Windows 10/11 x64 only.
- Local project folders only; no accounts or cloud sync.
- Separate custom desktop Creator App and separate Godot Runtime App.
- Creator App uses Tauri + React + TypeScript.
- Godot remains hidden runtime infrastructure and is not exposed as the creator-facing editor.
- Playtest launches a separate runtime window; no embedded runtime viewport in v0.1.
- No standalone game export in v0.1.
- Visual-novel/location-screen presentation rather than top-down exploration.
- Navigation uses a location menu in v0.1.
- AI-assisted authoring: every important game definition remains manually editable, while Copilot can inspect the project and propose typed changes.
- Integrated AI image generation for character portraits/expression variants and location backgrounds, plus manual image import.
- Runtime NPC AI is included: NPCs can reason, speak dynamically, choose goals, plan, and request engine actions.
- Bring-your-own API keys.
- OpenRouter is the default LLM gateway behind the existing provider abstraction.
- Inworld Realtime TTS 1.5 Mini is the initial TTS target: model ID `inworld-tts-1.5-mini`.
- The runtime UI is architected around theme tokens, but v0.1 ships one polished default theme. Theme selection/customization is later work.

Existing ADRs remain authoritative where this document does not explicitly refine an unresolved decision.

## 3. Product success criterion

v0.1 is ready only when a user can perform this flow without touching source code:

1. Download and extract the Windows package.
2. Run `AI Game Studio.exe`.
3. Create a blank project or open the Snowed In starter.
4. Configure personal API credentials locally.
5. Create and edit characters, locations, objects/items, relationships, dialogue, events, and core system settings.
6. Use Copilot to propose project changes, inspect them, apply/reject them, and undo applied changes.
7. Generate or import character and location artwork and choose canonical active variants.
8. Assign Inworld voices to characters.
9. Click Play.
10. See a separate VN-style runtime window load the exact current project.
11. Navigate through a location menu, converse with NPCs, hear TTS, and observe NPCs act/react through engine systems.
12. Inspect runtime goals, actions, memories, perceptions, relationships, and events in the Creator App debug view.
13. Save, close, reopen, and continue editing the same project.

A build that compiles but cannot complete this flow is not v0.1-ready.

## 4. High-level architecture

v0.1 consists of two local executables plus shared project data.

```text
AI Game Studio Creator App
(Tauri + React + TypeScript)
        |
        | reads/writes canonical project definitions
        | launches playtest + receives telemetry
        v
Local Project Folder  <---->  Godot Runtime App
                               (simulation + presentation)
        ^
        |
        +---- AI service adapters
              - OpenRouter LLM
              - image generation provider(s)
              - Inworld TTS
```

### 4.1 Creator App responsibilities

The Creator App owns creator-facing workflows:

- Home/project browser.
- New/open/save/duplicate project.
- Project dashboard.
- Character editor.
- Location editor.
- Combined world/object/item editor.
- Dialogue editor.
- Event/rule editor.
- Asset Studio.
- Copilot panel.
- Settings and credential management.
- Playtest controls.
- Validation output.
- Runtime debug inspector and logs.

The Creator App edits the canonical structured project model. It does not manipulate Godot scenes as the project's source of truth.

### 4.2 Runtime App responsibilities

The Godot Runtime owns:

- Project loading and validation handoff.
- Runtime state instances.
- VN/location presentation.
- Location navigation.
- Dialogue UI and player free-text input.
- Inventory and interaction UI needed by the vertical slice.
- Simulation time.
- Needs.
- Relationships/emotions.
- Perception, beliefs, knowledge, and memory.
- NPC autonomy.
- Typed Action and Activity execution.
- Event/trigger processing.
- Runtime save/load.
- TTS playback.
- Runtime telemetry and structured error reporting.

The Runtime never silently edits canonical project definitions.

### 4.3 Process boundary

The Creator App launches the runtime as a child/local process for playtest. The boundary is explicit and versioned.

The initial bridge must support at least:

- launch request with project path and playtest session ID;
- runtime-ready notification;
- structured validation/load failure;
- structured runtime log events;
- character state snapshots or deltas;
- action/activity lifecycle events;
- world/event notifications;
- runtime exit/crash status.

The bridge transport is an implementation detail to choose during Slice 2 planning, but the contract must be local-only, versioned, machine-readable, and testable without a graphical runtime. Runtime state must never depend on React/Tauri implementation details.

## 5. Local project model

Projects are ordinary folders owned by the user. The folder is portable and does not contain creator-service credentials.

Illustrative layout:

```text
My First Game/
├── project.json
├── characters/
├── locations/
├── world/
├── dialogue/
├── events/
├── systems/
├── assets/
│   ├── generated/
│   ├── imported/
│   └── metadata/
├── saves/
└── logs/
```

The exact file splitting may evolve as long as the canonical schemas and immutable definition identities remain authoritative.

### 5.1 Persistence rules

- Definitions and Runtime State remain separate schema families.
- Definition identity follows existing immutable namespaced IDs.
- Runtime instance identity follows existing opaque UUID rules.
- Saves are atomic: write to a temporary target, validate, then replace the authoritative file.
- The Creator maintains a small rolling local recovery history for project-definition saves.
- Credentials are never written into project files, generated prompts, or exported debug bundles.
- Unknown or invalid schema data cannot be silently discarded.

## 6. Creator App information architecture

### 6.1 Home / Project Browser

Provides New Project, Open Project, recent projects, and duplicate project. New Project asks only for project name, short premise, and either Blank VN/Simulation Project or Snowed In Starter.

### 6.2 Project Dashboard

Shows project identity and small summary cards such as counts of characters, locations, items, events, assets, validation status, and AI availability. It is the central navigation point.

### 6.3 Characters

Each character editor covers:

- identity: name, age, role, description;
- performance: personality, speaking style, values, fears, preferences;
- simulation: controller type, starting location, needs/default goals/routine seeds;
- social: relationship links and dimensions;
- cognition: authored knowledge, secrets, initial beliefs/memories;
- appearance: canonical visual identity and active portrait/expression variants;
- voice: provider profile, voice ID, speaking rate, temperature, language, and model-compatible markup policy.

Human and AI-controlled characters use the same Character model; controller binding supplies control policy.

### 6.4 Locations

Locations are logical VN screens, not tilemaps. Each location has:

- name and description;
- background asset identity/variant;
- available destination locations;
- contained objects/items;
- environmental properties/tags;
- access/visibility rules where required.

No creator-authored coordinates, pathfinding graph, walking animation, or directional sprite set is required in v0.1.

### 6.5 World / Objects / Items

v0.1 combines these into one creator workspace. Objects expose engine-supported affordances instead of arbitrary executable scripts. Items can be possessed, transferred, consumed, or used only through registered engine capabilities.

### 6.6 Events & Rules

v0.1 uses a structured condition/effect editor over the existing declarative event schemas. A general node-based scripting system is explicitly deferred.

The UI should read like:

```text
WHEN <condition>
AND  <condition>
THEN <effect>
```

Copilot can generate the same typed event definitions from natural language.

### 6.7 Dialogue

Two dialogue modes coexist:

1. Authored dialogue/choices for reliable story beats.
2. Dynamic AI dialogue for unscripted conversation.

Dynamic dialogue is constrained by current knowledge, memories, relationship state, emotional state, location, goals, recent events, and conversation context. Dialogue is not authoritative world mutation.

### 6.8 Asset Studio

v0.1 supports three primary visual asset types:

- character portrait;
- character expression variant;
- location background.

For each asset the user can import, generate, regenerate, create a variant, preview, select as active, or discard. A newly generated candidate never silently replaces an active canonical variant.

### 6.9 Copilot

Copilot is a persistent side panel available across creator workspaces. It can inspect project definitions and propose typed ChangeSets. It cannot apply unvalidated arbitrary file edits.

### 6.10 Playtest and Debug

Play validates and saves the current project, then launches the runtime. The debug workspace can display selected character state, current goal/plan, needs, emotion, perceptions, beliefs, memories, recent actions, recent events, and structured runtime errors.

## 7. Runtime presentation

The target game presentation is a modern VN/life-sim interface:

- full-window location/background artwork;
- one or more layered character portraits/sprites;
- translucent bottom dialogue/narration panel;
- speaker name, dialogue text, and narration;
- authored response choices where applicable;
- free-text input for dynamic conversation;
- compact HUD access to locations, inventory, history, audio, and settings;
- no required on-screen walking between locations.

### 7.1 Theme architecture

Runtime UI values must consume semantic theme tokens rather than hard-coded component colors. Initial token categories include:

```text
dialogue.background
dialogue.text
dialogue.speaker
dialogue.highlight
input.background
accent.primary
hud.background
button.hover
font.dialogue
font.ui
panel.opacity
```

v0.1 ships one polished default theme. Alternate color/theme presets and end-user theme editing are deferred, but future themes must not require rewriting runtime UI logic.

## 8. Runtime intelligence architecture

### 8.1 Core rule

**AI chooses intent and language; the deterministic runtime decides what is valid and what actually changes.**

An AI may request `Lock(front_door)`. The engine validates possession/access/preconditions and either executes the action or returns a structured failure. AI output cannot directly set `front_door.locked = true`.

### 8.2 Event-driven NPC loop

NPC reasoning is event-driven, not per-frame.

A character re-evaluates when meaningful triggers occur, including:

- a plan completes;
- an action fails;
- an important world event is perceived;
- a player or NPC starts conversation;
- a need crosses an important threshold;
- a relationship/emotional event occurs;
- a bounded simulation-time interval requires reconsideration.

The loop is:

```text
Perceive
  -> update beliefs / memories
  -> evaluate needs + relationships + events
  -> choose goal
  -> create/revise plan
  -> request engine Action/Activity
  -> validate/execute/fail
  -> emit world event
  -> affected characters perceive consequences
```

### 8.3 Perception and knowledge

NPCs receive a Knowledge View rather than omniscient world state. Knowledge may come from current perception, communication, authored facts, remembered events, or inference. Characters do not automatically learn remote events merely because the runtime knows them.

### 8.4 Beliefs

Beliefs can disagree with world truth. A character may search the wrong location for an item, receive corrective information, and update confidence. This distinction is gameplay state, not just prompt flavor.

### 8.5 Memory

v0.1 distinguishes:

- working/recent memory;
- important longer-lived memory;
- relationship/social memory.

Memories include subject, participants, simulation timestamp, emotional significance, importance, confidence, and source where applicable. Context retrieval sends only relevant memories to the LLM rather than unbounded history.

### 8.6 Relationships

Relationships use project-defined dimensions such as affection, trust, respect, fear, attraction, or resentment. Runtime interactions modify structured values through validated effects; the LLM interprets state but does not directly rewrite arbitrary values.

### 8.7 Emotion

v0.1 uses a lightweight structured model: one primary emotion with intensity plus optional secondary modifiers. Emotion affects goal choice, dialogue tone, willingness, expression selection, and TTS markup selection where the configured TTS model explicitly supports it.

### 8.8 Dialogue-to-action separation

Generated speech and requested state change are distinct outputs. A line such as “Fine, take the key” may be paired with `Give(Dad, Alex, garage_key)`. The engine validates `Give`; dialogue cannot manufacture possession or success.

## 9. Inworld TTS 1.5 Mini design

The initial voice target is Inworld `inworld-tts-1.5-mini`, chosen for realtime latency/cost priorities.

### 9.1 Documentation-first implementation rule

Before writing the production adapter, implementation must re-read the current Inworld official TTS documentation and tests must reflect the currently documented request/response contract. API fields must not be guessed from another Inworld model.

As verified during this design on 2026-08-23, Inworld documents TTS 1.5 Mini as a 15-language, low-latency model and distinguishes its limited experimental audio markup from TTS-2 natural-language steering.

Official references checked during design:

- https://docs.inworld.ai/tts/tts-models
- https://docs.inworld.ai/tts/tts
- https://inworld.ai/resources/tts-natural-language-steering
- https://inworld.ai/resources/voice-ai-for-ai-companions

### 9.2 Allowed model controls

The adapter exposes only fields supported by the selected Inworld 1.5 Mini endpoint. The creator voice profile may include supported settings such as:

- `voiceId`;
- model ID pinned to `inworld-tts-1.5-mini` by default;
- language;
- speaking rate;
- temperature;
- supported audio encoding/sample rate;
- optional timestamp/alignment settings only when explicitly requested.

The adapter must validate ranges/enums locally before network requests.

### 9.3 Strict markup allowlist

TTS 1.5 Mini must **not** receive TTS-2 natural-language steering instructions or `deliveryMode` behavior. Unsupported bracketed instructions may be spoken literally.

The v0.1 adapter therefore uses a strict model-specific allowlist, based only on current Inworld documentation. At design time the documented limited TTS 1.5 emotion/style set includes:

```text
[happy]
[sad]
[angry]
[surprised]
[fearful]
[disgusted]
[laughing]
[whispering]
```

Documented non-verbal TTS 1.5 cues include a limited set such as `[sigh]`, `[laugh]`, `[breathe]`, and `[cough]`. These remain distinct from the project's richer internal emotion vocabulary.

Rules:

1. Internal emotions such as worried, jealous, embarrassed, bored, affectionate, or suspicious never become invented TTS tags.
2. The runtime may map internal state to one documented 1.5 tag only when the mapping is explicit and semantically justified.
3. If no valid mapping exists, synthesize the plain line without an emotion tag.
4. Unknown user-authored bracket tags are escaped/removed from the TTS markup channel rather than sent blindly.
5. Experimental tags are used sparingly; ordinary dialogue should not be over-marked.
6. The allowlist is covered by contract tests so future model changes cannot silently broaden the accepted set.

### 9.4 Streaming and fallback

Dialogue text is displayed immediately. TTS occurs asynchronously through Inworld's streaming interface where supported. Audio failure never blocks gameplay.

The TTS layer supports:

- auto-speak on/off;
- replay current/recent line;
- stop current speech;
- mute;
- volume;
- local audio cache keyed by text + normalized voice settings + provider/model identity.

If synthesis fails, the line remains playable as text and a structured non-fatal error is logged.

## 10. Creator Copilot

### 10.1 Project awareness

Copilot can inspect canonical project definitions and relevant validation state. It can answer questions and propose changes across characters, locations, relationships, memories/knowledge seeds, dialogue, events/rules, objects/items, and supported system settings.

### 10.2 ChangeSets are mandatory for mutation

Every project mutation proposed by Copilot is expressed as the existing typed atomic ChangeSet contract.

Before apply:

- structural schema validation;
- semantic reference validation;
- dependency validation;
- executor/effect allowlist checks;
- user-visible preview.

The user can Apply, Edit/Review, or Reject.

After apply, the engine records an authoritative change receipt sufficient to undo the exact applied operations. The LLM does not invent undo operations from memory.

### 10.3 Permissions

Creator Copilot may modify project Definitions through ChangeSets.

Runtime NPC AI may:

- speak;
- choose goals;
- form/update memories and beliefs through runtime rules;
- request registered Actions/Activities.

Runtime NPC AI may not:

- edit canonical project files;
- create engine executors;
- rewrite its Definition;
- execute arbitrary code;
- bypass Action/Activity validation;
- call Creator-only mutation tools.

## 11. AI asset pipeline

### 11.1 Asset identity

Generated visual content uses the existing stable Asset Identity/Provenance architecture. A character or location has a canonical semantic identity separate from any single generation prompt or file.

Example character variants:

```text
character.maria
├── neutral
├── happy
├── angry
├── worried
├── tired
└── surprised
```

Example location variants:

```text
location.player_bedroom
├── day
├── night
├── power_outage
└── morning_snow
```

v0.1 does not need automated scene-transition generation, but variants are first-class.

### 11.2 Provider boundary

Image generation sits behind a provider-neutral service contract. Gameplay and canonical project data do not depend on a vendor-specific API.

The initial implementation must support:

- at least one configured remote generation adapter;
- manual image import;
- generate from canonical identity + requested variant intent;
- regenerate;
- candidate preview;
- activate candidate;
- discard candidate;
- provenance metadata.

The concrete first remote image provider is an implementation-selection concern and is not encoded into canonical gameplay schemas. Provider/profile data remains adapter configuration/provenance.

### 11.3 Review-before-activation

A generated image is a candidate until the creator explicitly selects it. Regeneration never destroys the active canonical image automatically.

## 12. AI/provider credential handling

v0.1 is bring-your-own-key.

Requirements:

- credentials are Creator-machine settings, never project data;
- use Windows secure credential storage/keyring facilities where feasible;
- never log secret values;
- provider requests receive credentials only at the adapter boundary;
- exported logs/debug bundles redact secret-like fields;
- runtime NPC AI cannot access Creator credential-management interfaces.

## 13. Error handling and degradation

The application must remain usable when external AI services fail.

### 13.1 OpenRouter/Copilot failure

- Manual editing continues.
- Invalid or malformed Copilot proposals do not mutate the project.
- Network/rate/provider errors are displayed as actionable, non-destructive errors.

### 13.2 Image generation failure

- Existing assets remain active.
- Failed candidates are not activated.
- User can retry, change provider/profile, or import manually.

### 13.3 TTS failure

- Text is already visible.
- Gameplay continues silently.
- Audio can be retried/replayed later.

### 13.4 Runtime failure

- Creator App remains open.
- Playtest process exit/crash is surfaced with structured log context.
- Project definitions remain intact.

### 13.5 Invalid project

- Editing remains possible.
- Play is blocked if the runtime contract would be invalid.
- Validation identifies the failing definition/reference/rule and gives a creator-readable reason.

## 14. Testing strategy

v0.1 requires layered verification rather than relying on manual playtest alone.

### 14.1 Schema and semantic tests

Continue the existing Python schema-validation suite for definitions, runtime contracts, ChangeSets, assets, provider profiles, references, extension rules, and semantic validation.

### 14.2 Creator App tests

Test at least:

- create/open/duplicate project;
- field editing and persistence;
- validation error display;
- recovery after failed save;
- Copilot proposal preview;
- ChangeSet apply/reject/undo;
- asset candidate activation/discard;
- credential redaction boundaries.

### 14.3 Runtime unit/headless tests

Where Godot permits headless deterministic tests, cover:

- Action preconditions/effects;
- Activity lifecycle/interruption;
- needs progression;
- relationship updates;
- event/trigger processing;
- perception visibility;
- belief update;
- memory retrieval/scoring;
- save/load round trip.

Every engine bug fixed after discovery requires a regression test.

### 14.4 Runtime bridge tests

Provide a headless/fake runtime harness capable of proving:

- Creator launches a known runtime command;
- runtime loads exact project/session identity;
- structured messages are versioned/parseable;
- telemetry is received;
- runtime failure/exit is represented correctly.

### 14.5 AI adapter tests

CI uses deterministic fakes/mocks and does not require paid API calls.

The Inworld 1.5 Mini adapter must specifically test:

- expected model ID;
- valid documented parameter mapping;
- invalid local parameter rejection;
- strict markup allowlist;
- unsupported tag suppression/escaping;
- no TTS-2 steering fields for 1.5 Mini;
- streaming parser behavior;
- TTS failure falling back to text-only gameplay.

### 14.6 End-to-end smoke test

Snowed In acts as the first integrated smoke project. Automated or scripted verification must cover project load, one location transition, one player/NPC conversation, at least one successful and one failed engine action, one event reaction, save/reload, and debug telemetry.

## 15. Windows packaging

v0.1 distributes as a portable Windows x64 ZIP rather than an installer.

Illustrative package:

```text
AI-Game-Studio-v0.1-windows-x64.zip
└── AI Game Studio/
    ├── AI Game Studio.exe
    ├── runtime/
    │   ├── AI Game Runtime.exe
    │   └── runtime resources
    └── application resources
```

A user must not need separate installations of Godot, Python, Node.js, Rust, or the Godot editor.

The repository build pipeline must eventually produce the Windows package as a reproducible artifact from pinned/locked dependencies. Installer, code signing workflow, auto-update, and standalone game export are later milestones unless packaging/security requirements force an earlier narrow addition.

## 16. Snowed In starter requirements

The starter project proves the engine architecture without defining the engine around one story.

Initial cast:

- human-controlled high-school student;
- father;
- mother;
- two siblings;
- optional visitor/neighbor only if needed by a test scenario.

Initial logical locations include living room, kitchen, hallway/stairs, parents' bedroom, player bedroom, sibling room(s), bathroom, garage, and front porch/yard where useful.

Systems exercised:

- time;
- weather/severe snowstorm;
- power/heating;
- hunger;
- energy;
- inventory;
- cooking;
- sleeping;
- relationships/emotions;
- perception;
- beliefs/knowledge;
- memory;
- dynamic dialogue;
- autonomous goals/plans/actions;
- events/triggers;
- runtime save/load;
- TTS;
- debug telemetry.

Core initial Actions include MoveTo logical location, TalkTo, Take, Give, Open, Close, Lock, Unlock, and Eat. Initial Activities include CookMeal and Sleep.

The project must demonstrate at least one emergent chain such as cooking -> food burns -> alarm -> affected characters perceive/react, without hard-coding a full dialogue branch for every reaction.

## 17. Explicit v0.1 exclusions

To control scope, v0.1 excludes:

- standalone exported game executable;
- cloud sync/accounts;
- multiplayer;
- 3D;
- top-down tilemaps;
- creator-authored pathfinding maps;
- walking/directional animation pipeline;
- animation editor;
- lip sync;
- voice cloning workflow UI;
- arbitrary AI-generated executable code;
- node-based general scripting editor;
- marketplace;
- plugin marketplace/UI;
- advanced cinematic timeline;
- broad theme editor/preset library;
- embedded runtime viewport;
- arbitrary provider-specific gameplay dependencies.

## 18. Delivery decomposition

The approved architecture must be implemented as narrow working vertical slices rather than one giant integration branch.

### Slice 1 — Creator Foundation

- Tauri + React + TypeScript Windows shell.
- project create/open/save/duplicate;
- schema integration;
- project dashboard;
- minimal character/location/world editors;
- local validation/recovery foundation.

Exit: the packaged Creator App can create, edit, save, close, and reopen a valid local project without developer tools.

### Slice 2 — Playable Runtime

- Godot VN/location presentation;
- character/background rendering;
- location-menu navigation;
- authored dialogue/choices;
- Creator-to-runtime launch bridge;
- structured runtime logs.

Exit: Creator Play launches a separate runtime that loads and displays the current project.

### Slice 3 — Systemic Simulation

- runtime Actions/Activities;
- events/triggers;
- needs;
- relationships/emotions;
- perception/beliefs/memory;
- autonomous NPC loop;
- dynamic dialogue;
- debug inspector;
- runtime save/load.

Exit: Snowed In can produce coherent divergent reactions without authoring every branch.

### Slice 4 — AI Creation and Assets

- OpenRouter Creator Copilot;
- project inspection;
- typed ChangeSet preview/apply/reject/undo;
- image generation adapter;
- Asset Studio and identity-aware variants;
- manual import;
- credential/security hardening.

Exit: a creator can use natural language to create/modify structured project content and generate/select art without losing manual control.

### Slice 5 — Voice and Release Hardening

- Inworld `inworld-tts-1.5-mini` adapter;
- strict 1.5 markup allowlist;
- streaming playback/cache/fallback controls;
- end-to-end Snowed In smoke coverage;
- Windows portable ZIP build artifact;
- final recovery/error-path hardening.

Exit: the complete success criterion in Section 3 is satisfied on a clean Windows machine.

Each slice gets a focused implementation plan and may be delivered through multiple small PRs. `main` must remain runnable.

## 19. Architectural invariants

The following are non-negotiable unless superseded by a new ADR:

1. AI does not directly mutate arbitrary runtime state.
2. Runtime AI requests typed engine Actions/Activities and receives structured success/failure.
3. Player and NPC share the same Character/system model; controller binding differs.
4. World truth is separate from per-character belief/knowledge.
5. Creator AI and runtime AI have separate permissions.
6. Project Definitions and Runtime State remain separate.
7. Copilot changes use typed ChangeSets and authoritative undo receipts.
8. Generated asset identity is stable across provider runs and variants.
9. Provider APIs stay behind adapters; gameplay does not import vendor SDKs directly.
10. Credentials never enter canonical project files.
11. TTS model-specific features are allowlisted from current provider documentation; unsupported steering is never guessed.
12. v0.1 remains usable manually when AI/image/TTS services are offline.

## 20. Documentation and handoff requirements

Because development may continue across different AI sessions, the repository remains canonical memory.

For each slice:

- update relevant ADRs when architecture changes;
- update `docs/CURRENT_STATE.md` before handoff;
- record exact verification commands/results;
- keep specs and plans in the repository;
- link implementation PRs/issues;
- do not leave critical decisions only in chat history.

The next step after this design is approved is implementation planning, beginning with Slice 1 rather than attempting all five slices at once.
