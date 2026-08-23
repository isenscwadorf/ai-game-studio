# Creator MVP Slice 2 — Playable Runtime + Live AI Dialogue

Date: 2026-08-23
Status: Approved design, pending implementation planning
Parent design: `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

## 1. Purpose

Slice 2 turns the Creator Foundation into a genuinely playable VN-style authoring loop on Windows.

The user must be able to author Characters, Locations, imported visual assets, authored dialogue and choices, press Play, and receive a separate Godot game window that displays the current project. During normal NPC conversations, free-text AI dialogue is available by default through OpenRouter, while authored scenes may temporarily restrict input to explicit choices.

This slice deliberately adds live AI speech without pulling forward the full systemic NPC brain. AI output is dialogue text only. It cannot move characters, modify inventory, trigger events, alter relationships, create memories, or mutate canonical project definitions.

## 2. Locked product decisions

- Windows 10/11 x64 first.
- Creator remains Tauri + React + TypeScript.
- Godot 4.7.2 stable remains the pinned runtime baseline per ADR-0012.
- Playtest launches Godot as a separate local process and separate game window.
- Creator must remain open to provide the runtime bridge and live AI gateway.
- Runtime presentation is VN/location-screen based, not top-down.
- Navigation uses logical Location choices/menu; no walking/pathfinding visuals.
- Manual image import is included in Slice 2.
- Imported images are copied into the project so the project remains self-contained.
- Character visuals are sprites only. There is no portrait mode.
- Supported sprite framing modes are `full_body` and `two_thirds`.
- `two_thirds` means approximately head-to-knees composition.
- Transparent-background PNG/WebP sprites are preferred for Characters.
- Location visuals are background images.
- Authored dialogue uses a simple ordered scene/entry editor, not a node graph.
- Authored dialogue supports lines, narration, choices, and named/immutable jump targets.
- Free-text AI conversation is available by default during normal NPC conversations.
- An authored scene may explicitly set input mode to `choices_only` to disable free text temporarily.
- Live AI dialogue is speech-only in this slice.
- OpenRouter is the first live runtime dialogue provider behind the existing provider abstraction.
- No TTS in Slice 2.
- No AI image generation in Slice 2.
- No standalone game export in v0.1.

## 3. Process architecture

### 3.1 High-level process model

```text
AI Game Studio Creator
        |
        | launches
        v
Godot Playtest Runtime
        |
        | localhost, versioned WebSocket
        v
Creator Runtime Gateway
        |
        +-- runtime lifecycle / logs / session state
        +-- live dialogue requests
                  |
                  v
           OpenRouter Adapter
```

The Creator owns the playtest session. Godot does not receive Creator service credentials.

### 3.2 Native ownership boundary

The Tauri Rust backend owns:

- the localhost WebSocket listener;
- playtest session creation and per-session secret generation;
- runtime process launch/termination;
- bridge authentication and message validation;
- secure OpenRouter credential access;
- outbound OpenRouter requests;
- credential redaction in logs/errors;
- structured lifecycle state delivered to the React UI.

React may request these operations and display their state, but raw provider secrets must not be returned to the WebView after being stored.

Godot owns gameplay presentation and runtime-local conversation/session state only. It does not own provider credentials, Creator mutation APIs, or canonical project writes.

### 3.3 Local bridge security

The bridge must:

- bind only to loopback (`127.0.0.1` / equivalent local-only binding);
- allocate an ephemeral port per Creator session;
- use a cryptographically random per-playtest session secret;
- include a playtest session ID in all session-scoped messages;
- require runtime authentication before accepting normal traffic;
- reject unknown protocol versions and malformed message envelopes;
- cap message sizes and reject unexpected message kinds;
- never accept arbitrary filesystem paths or shell commands from Godot messages.

The session secret may be passed to the child runtime through process launch arguments or environment variables, but it must never be persisted into the project.

## 4. Runtime bridge contract

### 4.1 Versioning

Slice 2 introduces a dedicated versioned bridge contract. The exact transport is WebSocket over localhost, but the message contract is transport-independent JSON.

Every message envelope contains:

```text
protocol: "aigs.runtime-bridge"
protocol_version: 1
session_id: <opaque playtest session ID>
message_id: <opaque unique message ID>
type: <registered message type>
payload: <typed payload>
```

### 4.2 Minimum message set

Creator -> Runtime:

- `session.accepted`
- `project.load`
- `dialogue.response`
- `dialogue.error`
- `runtime.stop`

Runtime -> Creator:

- `session.hello`
- `runtime.ready`
- `project.loaded`
- `project.load_error`
- `runtime.log`
- `runtime.state`
- `dialogue.request`
- `runtime.exiting`

The first implementation may add narrowly necessary typed messages, but must not introduce generic remote execution or arbitrary command payloads.

### 4.3 Headless fake runtime

A fake/headless runtime harness is required so Creator bridge tests can verify launch/session behavior without opening a Godot window.

The harness must be able to simulate:

- successful authentication;
- ready;
- project loaded;
- project load error;
- structured log events;
- dialogue request/response;
- malformed/unauthorized connection;
- clean exit;
- crash/unexpected exit.

## 5. Project asset model

### 5.1 Existing asset contracts remain authoritative

Slice 2 reuses the existing Asset Identity and Asset Variant architecture. Character and Location definitions continue to point at `visual_identity_ref`; no second visual reference mechanism is added.

Manual import creates or updates the subject's Asset Identity and active imported variant while storing the copied file inside the project.

### 5.2 Imported file layout

Imported visual files live under project-relative paths such as:

```text
assets/imported/characters/<asset-id>/<variant-or-file>
assets/imported/locations/<asset-id>/<variant-or-file>
assets/metadata/
```

Absolute source-machine paths are never canonical project data.

### 5.3 Character sprite framing

Character visuals are sprites, not portraits.

Supported framing enum:

```text
full_body
two_thirds
```

Rules:

- `full_body` preserves the full character from head to feet where supplied.
- `two_thirds` targets approximately head-to-knees composition.
- Runtime must not automatically crop a full-body sprite into a bust/portrait.
- Runtime scales sprites to fit available stage space while preserving aspect ratio.
- Multiple visible characters may scale down modestly to fit the scene.
- The current speaker may receive subtle visual emphasis, but framing mode remains intact.

Framing is metadata associated with the active character visual variant or its presentation binding, not inferred from filename.

### 5.4 Missing asset behavior

A missing optional visual file must not crash playtest.

Runtime fallback:

- Character: clean named sprite placeholder.
- Location: clean named background placeholder.

Broken canonical references remain validation errors; a referenced file becoming unavailable after validation becomes a runtime warning plus placeholder.

## 6. Character authoring changes

Slice 2 expands the Character editor to expose enough of the existing canonical persona for useful runtime AI conversation.

Minimum editable fields:

- display name;
- description;
- persona summary;
- background;
- personality list;
- speech register;
- speech notes;
- values;
- fears;
- desires;
- secrets;
- initial location where supported by current schema;
- visual identity / active sprite;
- sprite framing: Full Body or Two Thirds.

The Character editor adds:

- Import Sprite;
- Replace Sprite;
- Remove Sprite;
- sprite preview;
- framing selector.

No separate SillyTavern-style character card is persisted. Runtime AI uses the canonical Character definition.

## 7. Location authoring changes

The Location editor adds:

- background import/replace/remove;
- background preview;
- logical destination selection from other Locations;
- optional starter/runtime entry location selection at the appropriate project/dialogue level.

Locations remain logical VN screens. No authored coordinates, navigation mesh, walking animation, or tilemap is introduced.

## 8. Dialogue schema family

### 8.1 New canonical schema family

Slice 2 adds a first-class `schemas/v1/dialogue/` family rather than storing story text in free-form extensions.

Minimum contracts:

- dialogue scene definition;
- dialogue entry definition or discriminated entry union;
- dialogue choice option;
- dialogue scene/reference types as required by validation.

All contracts follow existing Draft 2020-12, strict-core, stable-ID rules.

### 8.2 Dialogue scene model

A scene contains:

```text
schema identity/version
immutable scene ID
display name
optional starting Location ref
input mode: free | choices_only
entry point
entries[]
```

Supported entry kinds in Slice 2:

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
   - each option has display label and target

Targets reference immutable entry IDs or immutable scene IDs as explicitly defined by the schema. Array positions are never branch identity.

### 8.3 Validation

Project-wide semantic validation must detect at least:

- missing speaker refs;
- missing starting Location refs;
- missing scene/entry targets;
- duplicate IDs;
- invalid entry-point target;
- impossible/invalid choice target shape;
- malformed `input_mode`;
- unsupported dialogue entry kind.

Cycles are allowed because repeatable conversation structures may be intentional; validation must not reject a cycle merely for being cyclic.

## 9. Dialogue Creator workspace

The previously disabled Dialogue navigation item becomes active.

The Slice 2 UI is a form/list editor, not a visual graph.

Recommended information architecture:

```text
Scene list
  -> selected Scene
       -> scene metadata / input mode
       -> ordered entry list
            -> Line / Narration / Choice editor
```

Capabilities:

- create/rename/delete scene;
- add/reorder/delete entries;
- choose Character speaker from existing Character definitions;
- edit line/narration text;
- add/remove/reorder choice options;
- select jump target from known scene/entry targets;
- show validation error close to the affected field;
- preserve immutable IDs when display names change.

No node graph, condition scripting, or event effects are included in Slice 2 dialogue authoring.

## 10. Godot runtime presentation

### 10.1 Stage composition

The runtime uses a modern VN/life-sim screen:

- full-window Location background;
- layered Character sprites;
- bottom translucent dialogue/narration panel;
- speaker name;
- dialogue/narration text;
- authored choice buttons when present;
- free-text input when current conversation/scene allows it;
- compact Location menu;
- History panel;
- unobtrusive runtime/AI connection status.

One polished default theme is used through semantic theme tokens from the parent design.

### 10.2 Character sprite staging

Default visual behavior:

- one Character: larger stage presence;
- multiple Characters: scale down enough to fit without portrait-style cropping;
- preserve Full Body or Two Thirds framing;
- preserve image aspect ratio;
- favor lower-stage anchoring so sprites appear grounded;
- current speaker may be emphasized through subtle scale/opacity/z-order treatment.

### 10.3 Location navigation

A compact Location menu presents valid logical destinations supplied by project definitions.

Changing Location:

- updates current Location;
- changes background;
- updates staged Characters according to current Slice 2 placement rules;
- emits structured runtime state/log telemetry.

Slice 2 does not animate walking between screens.

## 11. Authored dialogue runtime

The runtime can:

- start a configured/default authored scene;
- render line and narration entries;
- follow `next` targets;
- present choice options;
- jump to selected targets;
- end a scene cleanly;
- retain presented authored lines in local playtest History.

If a scene uses `choices_only`, free-text input is hidden/disabled until authored flow returns to a free-input context.

## 12. Live AI dialogue

### 12.1 Scope rule

AI generates speech only.

A valid AI result in Slice 2 is equivalent to:

```text
speaker_ref
text
```

It contains no engine effects and cannot request runtime mutation.

If a provider response contains tool calls, JSON actions, state mutations, or other unsupported structure, the adapter ignores/rejects those parts and returns only validated plain speech when safe to do so; otherwise the request fails non-destructively.

### 12.2 Context supplied to AI

The bounded context for a reply contains only information available to Slice 2:

- selected NPC canonical Character persona;
- project premise;
- current Location name/description;
- current authored scene context when applicable;
- bounded recent conversation turns;
- current player message;
- explicit runtime instruction that output is dialogue speech only.

No invented memories, needs, relationship deltas, hidden world truth, goals, plans, or autonomous cognition are fabricated as if those systems already existed.

### 12.3 Conversation history

Slice 2 keeps an in-memory bounded recent-turn buffer per playtest conversation. It exists to provide conversational continuity only.

It is not promoted to canonical Memory or persistent runtime cognition state.

Stopping playtest discards this temporary AI conversation buffer unless a later slice explicitly defines runtime saves/history persistence.

### 12.4 Free-text behavior

Free-text input is available by default during normal NPC conversation.

Sending a message:

```text
Godot validates local input
 -> dialogue.request over bridge
 -> Creator validates session/request
 -> Creator builds bounded provider prompt
 -> native OpenRouter adapter calls provider
 -> response normalized to speech text
 -> dialogue.response over bridge
 -> Godot renders line + adds to History
```

The UI must prevent accidental duplicate sends while the same request is in flight, while still allowing cancellation/timeout recovery.

## 13. OpenRouter configuration and credentials

### 13.1 Machine-local settings

Slice 2 adds Creator settings for:

- OpenRouter API key;
- OpenRouter model identifier;
- optional conservative response parameters supported by the adapter.

These are Creator-machine settings, not project definitions.

The API key is never written to project files, runtime logs, bridge payloads, generated prompts, or exported debug data.

The model identifier may be stored as a non-secret machine-local preference. AI conversation remains disabled until both a usable credential and model identifier are configured.

### 13.2 Documentation-first adapter rule

Immediately before implementation of the production OpenRouter adapter, the implementation session must verify the current official OpenRouter API contract rather than relying on stale chat assumptions.

Provider-specific request/response details remain inside the adapter boundary.

### 13.3 Failure behavior

OpenRouter failure is non-fatal.

On timeout, authentication error, rate limit, provider/model failure, malformed response, or network loss:

- authored dialogue continues;
- Location navigation continues;
- free-text AI input shows an actionable error/retry state;
- no canonical project data changes;
- runtime remains open;
- logs redact secrets.

## 14. Play flow

Pressing Play performs:

```text
Validate project
 -> Save current Creator edits
 -> create playtest session
 -> start localhost bridge
 -> launch packaged Godot runtime
 -> runtime authenticates
 -> Creator accepts session
 -> Creator sends exact project/session load instruction
 -> Godot loads project
 -> Godot sends project.loaded + runtime.ready
 -> Creator marks Runtime: Running
```

Play is blocked when project data required by the runtime is structurally or semantically invalid.

Missing optional visual files may degrade to placeholders, but malformed canonical references or dialogue branch targets block Play.

## 15. Creator runtime status UI

The Creator gains a compact runtime status surface showing at least:

```text
Runtime: Idle | Launching | Running | Failed | Exited
Session ID (abbreviated)
Current Location when reported
AI: Not Configured | Ready | Requesting | Error

Stop Playtest
Open Logs
```

The Creator remains usable while the runtime is open, subject to safeguards against edits that would make the currently running project snapshot ambiguous. Slice 2 may define Play as loading a saved snapshot and require another Play/reload to pick up later edits rather than hot-reloading definitions.

Hot reload is not required.

## 16. Runtime logs and telemetry

Structured runtime logs are visible in the Creator.

Minimum fields:

- timestamp;
- severity;
- session ID;
- subsystem;
- message;
- optional structured non-secret context.

Runtime state telemetry in Slice 2 is intentionally small:

- current Location;
- active authored scene/entry when applicable;
- active conversation Character when applicable;
- bridge state;
- last runtime error.

Full debug state for needs, goals, memories, actions, and events remains Slice 3+ work.

## 17. Failure handling

### 17.1 Invalid project

- Creator remains editable.
- Play is blocked.
- Validation identifies the failing definition/reference/branch.

### 17.2 Runtime launch failure

- Creator remains open.
- Session transitions to Failed.
- User receives structured error/log details.

### 17.3 Runtime crash or unexpected exit

- Creator remains open.
- Session transitions to Exited/Failed.
- last logs remain available.
- project definitions remain untouched.

### 17.4 Bridge disconnect

Runtime continues displaying already-loaded authored content where possible.

Live AI conversation becomes unavailable and displays a non-fatal connection state. No automatic insecure fallback to direct provider access is allowed.

### 17.5 Missing imported file

- runtime substitutes the correct named placeholder;
- runtime emits a warning;
- Creator can repair the asset on the next authoring pass.

### 17.6 AI provider failure

- authored content continues;
- AI request can be retried;
- no state mutation occurs.

## 18. Testing strategy

### 18.1 Existing verification remains mandatory

All existing schema, Creator frontend, Rust, and build checks must remain green.

### 18.2 Dialogue schema tests

Add valid/invalid fixtures for:

- minimal valid scene;
- line/narration/choice entries;
- missing Character ref;
- missing Location ref;
- missing entry target;
- missing scene target;
- duplicate IDs;
- invalid entry point;
- allowed cycle;
- invalid input mode;
- unsupported entry kind.

### 18.3 Asset import tests

Cover:

- source file copied into project;
- project-relative persisted path only;
- Character sprite Asset Identity/variant linkage;
- Location background linkage;
- replace/remove behavior;
- duplicate filename collision handling;
- allowed file-type validation;
- framing enum preservation;
- missing-file placeholder behavior.

### 18.4 Bridge/native tests

Cover:

- loopback-only bind;
- random session secret/session ID;
- unauthorized hello rejected;
- wrong protocol version rejected;
- malformed envelope rejected;
- ready/load-error/log/exit lifecycle;
- child process exit handling;
- message size/type restrictions;
- fake runtime integration.

### 18.5 OpenRouter adapter tests

Use deterministic mocks/fakes; CI must not require a real key.

Cover:

- credential never appears in bridge payloads/logs;
- bounded context construction;
- speech-only normalization;
- unsupported tool/action response rejected/ignored safely;
- timeout/auth/rate/provider errors;
- cancellation/in-flight request handling;
- malformed provider response.

### 18.6 Godot headless/runtime tests

Where practical, headless tests cover:

- project load;
- asset path resolution;
- scene entry traversal;
- choice branching;
- scene end;
- `choices_only` input gating;
- free-input request creation;
- placeholder fallback;
- runtime bridge message parsing.

### 18.7 Windows hosted verification

CI must build/package:

- Creator executable;
- Godot playtest runtime required by the Creator package;
- a downloadable Windows artifact containing everything required to run Slice 2 on a supported Windows machine, apart from standard platform prerequisites such as WebView2.

Hosted smoke verification should prove the Creator can launch the packaged runtime through the actual process boundary, even if full GUI automation remains limited.

## 19. Definition of done

Slice 2 is complete only when a fresh Windows package allows the following end-to-end flow:

1. Open or create a project in Creator.
2. Create at least one Character.
3. Fill useful persona/speech fields.
4. Import a Character sprite and choose Full Body or Two Thirds framing.
5. Create at least one Location.
6. Import a Location background.
7. Author a dialogue scene with lines and at least one branching choice.
8. Configure machine-local OpenRouter key and model identifier.
9. Press Play.
10. Creator validates and saves.
11. A separate packaged Godot runtime launches.
12. Runtime authenticates to the Creator bridge and loads the exact project.
13. Location background and Character sprite display in VN staging.
14. Authored dialogue advances and choices branch correctly.
15. Free-text input is available in a free-input context.
16. Player sends natural-language text to the NPC.
17. NPC responds in character through the Creator-owned OpenRouter gateway.
18. AI response is rendered as speech only and does not mutate game/project state.
19. Location menu changes logical Location/background without top-down movement.
20. History shows authored and AI dialogue from the current playtest.
21. OpenRouter failure leaves authored playtest functional.
22. Closing/stopping runtime returns Creator to an idle/exited state with logs available.

## 20. Explicitly out of scope

Slice 2 does not include:

- portrait-mode Character art;
- AI image generation;
- TTS or voice playback;
- autonomous NPC goals/plans;
- needs simulation;
- relationship mutation;
- persistent Memory/Belief updates;
- inventory/systemic item actions;
- runtime AI tool/action requests;
- event execution beyond what is strictly required for authored dialogue traversal;
- persistent runtime saves;
- multiplayer/network gameplay;
- top-down movement;
- pathfinding;
- animation authoring;
- node-graph dialogue editor;
- hot reload requirement;
- standalone exported game `.exe` workflow.

## 21. Implementation sequencing guidance

The implementation plan should keep the repository working at each checkpoint and should prefer these dependency boundaries:

1. canonical dialogue contracts + semantic validation;
2. native self-contained asset import + Creator visual editing;
3. bridge protocol + fake runtime + Tauri lifecycle gateway;
4. Godot runtime scaffold/project loader;
5. VN stage + authored dialogue traversal + Location navigation;
6. Creator Dialogue workspace + Play/runtime status/log UI;
7. native OpenRouter configuration/adapter + speech-only runtime requests;
8. Windows packaging and end-to-end hardening.

The implementation plan may split tasks more finely, but must not reorder work in a way that requires unvalidated provider/network behavior before the bridge and deterministic authored runtime are proven.
