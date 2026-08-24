# Creator MVP Slice 2 — Playable Runtime + Live AI Dialogue

Date: 2026-08-23
Status: Approved in chat; pending user review of this written spec
Parent design: `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

## 1. Purpose

Slice 2 turns the Creator Foundation into a playable Windows VN authoring loop.

The user can author Characters, Locations, imported visual assets, and branching dialogue, then press Play to launch a separate Godot game window. During normal NPC conversation, free-text AI dialogue is available through OpenRouter. Authored scenes may temporarily restrict input to explicit choices.

This is an intentional sequencing change from the parent five-slice decomposition: only the minimum runtime OpenRouter dialogue path moves forward. Creator Copilot, autonomous NPC planning, systemic actions, cognition, AI image generation, and TTS remain later work.

AI output in Slice 2 is speech only. It cannot move characters, change inventory, fire events, alter relationships, create memories, or mutate canonical project definitions.

## 2. Locked product decisions

- Windows 10/11 x64 first.
- Creator remains Tauri + React + TypeScript.
- Godot 4.7.2 stable remains the runtime baseline per ADR-0012.
- Godot is packaged runtime infrastructure; the user does not need the Godot editor installed.
- Playtest opens as a separate local game window.
- Creator must remain open for the runtime bridge and live AI gateway.
- Runtime presentation is VN/location-screen based, never top-down.
- Navigation is logical Location selection; no walking/pathfinding visuals.
- Manual image import is included.
- Imported images are copied inside the project.
- Character visuals are sprites only; there is no portrait mode.
- Sprite framing is exactly `full_body` or `two_thirds`.
- `two_thirds` means approximately head to knees.
- Authored dialogue uses an ordered scene/entry editor, not a node graph.
- Dialogue supports lines, narration, choices, and immutable jump targets.
- Free-text AI conversation is available by default when an active NPC conversation exists.
- Authored scenes may use `choices_only` mode to temporarily disable free text.
- OpenRouter is the first live runtime text provider behind existing AI provider abstractions.
- No TTS, AI image generation, standalone export, hot reload requirement, or systemic NPC autonomy in Slice 2.

## 3. Process architecture

```text
AI Game Studio Creator
        |
        | launches packaged child process
        v
Godot Playtest Runtime
        |
        | localhost WebSocket, versioned JSON
        v
Tauri Rust Runtime Gateway
        |
        +-- lifecycle / logs / session state
        +-- live dialogue requests
                  |
                  v
           OpenRouter adapter
```

The Creator owns the playtest session. Godot receives no provider credential and no Creator mutation capability.

### 3.1 Native ownership boundary

The Tauri Rust backend owns:

- localhost WebSocket listener;
- playtest session ID and secret generation;
- child runtime launch/termination;
- bridge authentication and message validation;
- secure OpenRouter credential access;
- outbound provider calls;
- provider secret redaction;
- runtime lifecycle state exposed to React.

React can configure and request operations through narrow native commands but does not receive a stored raw API key after save.

Godot owns presentation and playtest-local state only. It does not write canonical project definitions.

### 3.2 Bridge security

Each playtest uses:

- loopback-only bind;
- ephemeral local port;
- opaque session ID;
- cryptographically random per-session secret;
- protocol version validation;
- authenticated runtime hello before normal traffic;
- typed message allowlist;
- bounded message sizes.

Bridge messages never expose generic shell execution, arbitrary filesystem operations, or arbitrary Creator commands.

The session secret may be passed to the child process at launch but is never persisted into the project.

## 4. Runtime bridge protocol

Every JSON message uses this envelope:

```text
protocol: "aigs.runtime-bridge"
protocol_version: 1
session_id: <opaque ID>
message_id: <opaque unique ID>
type: <registered message type>
payload: <typed payload>
```

Minimum Creator -> Runtime messages:

- `session.accepted`
- `project.load`
- `dialogue.response`
- `dialogue.error`
- `runtime.stop`

Minimum Runtime -> Creator messages:

- `session.hello`
- `runtime.ready`
- `project.loaded`
- `project.load_error`
- `runtime.log`
- `runtime.state`
- `dialogue.request`
- `runtime.exiting`

A fake/headless runtime must implement this same protocol for deterministic tests covering authentication, ready, load success/failure, logs, dialogue, malformed connections, clean exit, and crash/unexpected exit.

## 5. Canonical schema additions

Slice 2 extends the existing v1 contract additively where possible so existing valid Slice 1 projects remain valid.

### 5.1 Project manifest playtest settings

`project-manifest` gains an optional strict `playtest` object:

```text
playtest:
  start_location_ref: DefinitionRef | absent
  entry_scene_ref: DefinitionRef | absent
```

These fields are optional for backward compatibility. The Creator exposes them as Playtest Start Location and Entry Scene. A project may launch location-only without an entry scene, but the Slice 2 end-to-end acceptance project configures both.

### 5.2 Location destinations

`location-definition` gains optional `destination_refs: DefinitionRef[]` for logical VN navigation.

`child_location_refs` remains hierarchy and is not silently reinterpreted as navigation.

### 5.3 Asset variant presentation

`asset-variant-record` gains an optional strict `presentation` object. For Character visuals it may contain:

```text
sprite_framing: full_body | two_thirds
```

Existing variant records without `presentation` remain valid. For a Character's active visual variant, Creator writes one of the two framing values. Location background variants do not require sprite framing.

### 5.4 Dialogue schema family

Add `schemas/v1/dialogue/` with strict Draft 2020-12 contracts for:

- dialogue scene definition;
- discriminated dialogue entry union;
- choice option;
- any small reference type required for branch targets.

All new contracts are registered in `schemas/registry.json` and participate in Python/Creator validation parity.

## 6. Imported asset model

Existing Asset Identity and Asset Variant contracts remain authoritative. Character and Location definitions continue to point through `visual_identity_ref`; no parallel visual-reference field is introduced.

Imported files are copied under project-relative locations such as:

```text
assets/imported/characters/<asset-id>/...
assets/imported/locations/<asset-id>/...
```

Persisted asset storage uses project-relative paths and content hashes through the existing variant record. Absolute source-machine paths are never canonical data.

Supported Slice 2 image formats are PNG, WebP, and JPEG. Transparent PNG/WebP is preferred for Character sprites. SVG/GIF and arbitrary executable/container formats are not accepted in this slice.

Character visual actions:

- Import Sprite
- Replace Sprite
- Remove Sprite
- preview
- Full Body / Two Thirds framing selector

Location visual actions:

- Import Background
- Replace Background
- Remove Background
- preview

Missing optional image files at runtime produce a named placeholder plus warning, not a crash. Broken canonical references remain validation errors.

## 7. Character authoring and Slice 2 placement

The Character editor exposes enough of the existing canonical persona to support useful AI conversation:

- display name;
- description;
- persona summary;
- background;
- personality;
- speech register and notes;
- values;
- fears;
- desires;
- secrets;
- initial Location;
- active Character sprite;
- sprite framing.

No second AI character-card format is persisted.

At playtest start, each Character's playtest-local Location is initialized from `initial_location_ref`. Slice 2 contains no autonomous movement, so NPCs stay in that Location for the session unless a deterministic authored navigation capability is deliberately added in a later slice. When the player's current Location changes, the stage shows Characters whose playtest-local Location equals the current Location.

## 8. Location authoring

The Location editor adds:

- background import/replace/remove;
- background preview;
- logical Destination selection using `destination_refs`.

Project Dashboard/Playtest settings expose Start Location and Entry Scene.

Locations remain logical VN screens: no coordinates, pathfinding graph, tilemap, navigation mesh, or walking animation.

## 9. Dialogue scene model

A scene contains:

```text
schema identity/version
immutable scene ID
display name
input_mode: free | choices_only
entry_point
entries[]
```

Supported entries:

1. `line`
   - immutable entry ID
   - speaker Character ref
   - text
   - next target or end

2. `narration`
   - immutable entry ID
   - text
   - next target or end

3. `choice`
   - immutable entry ID
   - optional prompt
   - ordered options
   - each option has label + target

Targets use immutable IDs, never array positions or display names. Cross-scene targets are explicit typed references. Cycles are allowed because repeated conversation loops may be intentional.

Semantic validation detects missing speakers, missing scene/entry targets, duplicate IDs, invalid entry points, malformed input modes, and unsupported entry kinds.

## 10. Dialogue Creator workspace

The existing disabled Dialogue navigation item becomes active.

The UI is a form/list editor:

```text
Scene list
  -> selected Scene
       -> scene metadata / input mode
       -> ordered entries
            -> Line / Narration / Choice
```

Capabilities:

- create/rename/delete scene;
- add/reorder/delete entries;
- select speaker from Characters;
- edit line/narration text;
- add/remove/reorder choice options;
- select branch targets from valid immutable targets;
- show validation errors at the affected field;
- preserve immutable IDs when names change.

No node graph, condition scripting, or event-effect authoring is added here.

## 11. Godot runtime UX

The packaged runtime renders:

- full-window Location background;
- layered Character sprites;
- translucent bottom dialogue/narration panel;
- speaker name and text;
- authored choice buttons;
- free-text input when allowed;
- compact Locations menu;
- History panel;
- unobtrusive runtime/AI status.

### 11.1 Sprite staging

Character art is always treated as a sprite, never a portrait.

- `full_body` preserves head-to-feet composition where supplied.
- `two_thirds` targets roughly head-to-knees composition.
- Runtime preserves aspect ratio.
- Runtime does not auto-crop full-body art to a bust.
- One Character may render larger.
- Multiple Characters scale down modestly to fit.
- Sprites anchor toward the lower stage so they feel grounded.
- Current speaker may receive subtle scale/opacity/z-order emphasis without changing framing.

### 11.2 Navigation

The Locations menu lists current Location `destination_refs`. Selecting one changes the player's current logical Location, background, and visible Character set, then emits structured runtime state telemetry. No walking animation occurs.

## 12. Authored dialogue runtime

Runtime can:

- start the configured Entry Scene;
- render lines and narration;
- follow next targets;
- present choices;
- jump to selected targets;
- end a scene cleanly;
- keep current-session authored and AI lines in History.

A `choices_only` scene hides/disables free text for that scene.

## 13. Active NPC and free-text conversation

Free-text input always targets one active NPC.

Selection rules:

1. The most recent authored Character speaker becomes the active NPC when eligible.
2. The player can click/select a visible Character sprite/name to make that Character active.
3. If no visible eligible NPC is active, free-text input is disabled with a clear prompt to select a Character.

The active NPC must be present in the current Location.

## 14. Live AI dialogue

### 14.1 Speech-only boundary

A Slice 2 AI result contains only:

```text
speaker_ref
text
```

Tool calls, action requests, world-state patches, ChangeSets, or other mutation instructions are unsupported. The adapter discards/rejects unsupported structure and never forwards it as an executable runtime command.

### 14.2 Bounded AI context

Each request may contain only:

- selected NPC canonical Character persona;
- project premise from existing Creator project metadata;
- current Location name/description;
- current authored scene context if applicable;
- bounded recent conversation turns;
- current player message;
- system instruction that output is dialogue speech only.

Slice 2 does not fabricate future memory, need, relationship, goal, plan, or world-truth systems merely for prompting.

Character secrets are private model context, not instructions to reveal them. The model is prompted to treat them as character knowledge that may or may not be disclosed naturally.

### 14.3 Temporary conversation continuity

Recent turns are kept in a bounded in-memory playtest buffer. This provides continuity only; it is not canonical Memory/Belief state and is discarded when playtest ends.

### 14.4 Request flow

```text
Player sends text in Godot
 -> Godot validates local input
 -> dialogue.request
 -> Rust gateway validates session and active Character
 -> Creator builds bounded provider context
 -> OpenRouter adapter calls provider
 -> response normalized to plain speech
 -> dialogue.response
 -> Godot renders response + appends History
```

The runtime prevents duplicate sends for the same in-flight request and recovers from timeout/cancellation without locking the input permanently.

## 15. Existing AI profiles and OpenRouter credentials

Slice 2 reuses the existing canonical AI configuration instead of inventing a second model-setting system.

Project data uses:

- `provider-profile` for provider adapter/capabilities/non-secret provider configuration;
- `ai-role-profile` for model candidates, context policy, cost/latency settings, and an empty tool allowlist for Slice 2 dialogue;
- `project-manifest.default_ai_profiles.npc_dialogue` to select the default dialogue role profile.

The initial Creator flow can create/configure a minimal OpenRouter provider profile and NPC Dialogue role profile.

The OpenRouter API key is different: it is a Creator-machine credential, never project data. The Rust backend stores/reads it through the platform credential boundary and never logs or sends it to Godot.

AI dialogue is unavailable until a valid NPC Dialogue role profile and machine-local OpenRouter credential are configured.

Immediately before production adapter implementation, the implementation session must verify the current official OpenRouter request/response contract rather than relying on stale chat assumptions.

## 16. Play flow

Pressing Play:

```text
Validate project
 -> Save current edits
 -> resolve Start Location / optional Entry Scene
 -> create playtest session
 -> start loopback bridge
 -> launch packaged Godot runtime
 -> runtime authenticates
 -> Creator accepts session
 -> send exact project/session load request
 -> Godot loads saved project snapshot
 -> project.loaded + runtime.ready
 -> Creator shows Runtime: Running
```

Play loads the saved snapshot. Edits made after launch do not hot-reload; restart Play to load them.

Malformed canonical references or dialogue branches block Play. Missing image files may degrade to placeholders at runtime.

## 17. Creator runtime status and logs

Creator shows at least:

```text
Runtime: Idle | Launching | Running | Failed | Exited
Session: abbreviated ID
Location: current Location when reported
AI: Not Configured | Ready | Requesting | Error

Stop Playtest
Open Logs
```

Structured runtime logs include timestamp, severity, session ID, subsystem, message, and optional non-secret context.

Slice 2 telemetry is limited to current Location, active scene/entry, active conversation Character, bridge state, and last runtime error. Full simulation debug remains later work.

## 18. Failure handling

Invalid project:
- Creator stays editable.
- Play is blocked with precise reference/branch errors.

Runtime launch/load failure:
- Creator stays open.
- session becomes Failed.
- structured error/log context remains available.

Runtime crash/exit:
- Creator stays open.
- project definitions remain untouched.
- logs remain available.

Bridge disconnect:
- already-loaded authored content can continue where possible.
- live AI becomes unavailable.
- runtime never falls back to direct provider access.

OpenRouter failure:
- authored dialogue and navigation continue.
- AI request shows retryable non-destructive error.
- secrets remain redacted.

Missing image file:
- named placeholder renders.
- warning is logged.

## 19. Testing strategy

All existing schema, frontend, Rust, fixture-parity, and build checks remain mandatory.

Add tests for:

Dialogue contracts:
- minimal valid scene;
- line/narration/choice;
- missing Character/target;
- duplicate IDs;
- invalid entry point/input mode/kind;
- allowed cycle.

Asset import:
- source copied into project;
- persisted path is project-relative;
- content hash stored;
- Character/Location identity and active variant linkage;
- replace/remove;
- filename collision handling;
- PNG/WebP/JPEG validation;
- framing persistence;
- missing-file placeholder.

Manifest/Location additive compatibility:
- old Slice 1 documents stay valid;
- playtest settings validate;
- destination refs validate semantically.

Bridge/native:
- loopback bind;
- random session credentials;
- unauthorized hello rejected;
- wrong protocol rejected;
- malformed/oversized/unknown messages rejected;
- ready/load-error/log/exit lifecycle;
- child process exit;
- fake runtime end-to-end.

OpenRouter adapter with deterministic mocks only:
- credential redaction;
- canonical role/profile resolution;
- bounded context;
- empty tool allowlist;
- speech-only normalization;
- malformed/tool/action response handling;
- timeout/auth/rate/provider failure;
- cancellation and in-flight state.

Godot/headless where practical:
- project load;
- project-relative asset resolution;
- scene traversal;
- branching choice;
- scene end;
- `choices_only` gating;
- active NPC selection state;
- free-text request creation;
- placeholder fallback;
- bridge parser.

Windows hosted CI must build/package both the Creator and exported Godot playtest runtime into one downloadable artifact. CI must not require a real OpenRouter key.

## 20. Definition of done

A fresh Windows package must support this end-to-end flow:

1. Create/open a project.
2. Create a Character and fill useful persona/speech fields.
3. Import a Character sprite.
4. Choose Full Body or Two Thirds framing.
5. Create a Location and import a background.
6. Configure logical destinations and Playtest Start Location.
7. Author a scene with lines and at least one branching choice.
8. Set it as Entry Scene.
9. Configure an OpenRouter provider/AI role profile and machine-local API key.
10. Press Play.
11. Creator validates/saves and launches the packaged Godot runtime.
12. Runtime authenticates and loads the exact saved project.
13. Background and sprite render with correct VN staging/framing.
14. Authored dialogue advances and choices branch correctly.
15. Location navigation changes the logical screen without top-down movement.
16. A visible NPC can be selected as active conversation target.
17. Free-text input sends natural language to that NPC.
18. NPC replies in character through Creator-owned OpenRouter gateway.
19. AI reply is speech only and cannot mutate project/runtime systems.
20. History includes authored and AI dialogue for the current session.
21. OpenRouter failure leaves authored playtest functional.
22. Stop/close runtime returns Creator to idle/exited state with logs.

## 21. Explicitly out of scope

- portrait-mode Character art;
- AI image generation;
- TTS/voice;
- autonomous NPC goals/plans;
- needs simulation;
- relationship mutation;
- persistent Memory/Belief updates;
- inventory or systemic item actions;
- runtime AI tools/actions;
- full event execution system;
- persistent runtime saves;
- multiplayer/network gameplay;
- top-down movement/pathfinding;
- animation authoring;
- node-graph dialogue editor;
- hot reload;
- standalone exported game workflow.

## 22. Implementation sequencing guidance

The implementation plan should preserve a working repository at each checkpoint and follow these dependency boundaries:

1. additive schema changes + dialogue contracts + semantic validation;
2. self-contained asset import + Character/Location visual editing;
3. bridge protocol + fake runtime + Rust lifecycle gateway;
4. packaged Godot runtime scaffold/project loader;
5. VN stage + Location navigation + authored dialogue traversal;
6. Dialogue workspace + Play/runtime status/log UI;
7. existing AI profile wiring + secure OpenRouter adapter + speech-only requests;
8. Windows packaging + end-to-end hardening.

Provider/network behavior must not become a prerequisite for proving the deterministic bridge and authored runtime.
