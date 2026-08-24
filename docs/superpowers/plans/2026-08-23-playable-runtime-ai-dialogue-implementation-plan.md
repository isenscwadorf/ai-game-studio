# Creator MVP Slice 2 — Playable Runtime + Live AI Dialogue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Windows Creator Foundation into a playable VN authoring loop with imported sprites/backgrounds, authored branching dialogue, a separate packaged Godot runtime, a local authenticated bridge, and speech-only live OpenRouter dialogue.

**Architecture:** Keep canonical JSON schemas/project files as the source of truth. Tauri/Rust owns filesystem mutation, playtest process lifecycle, localhost WebSocket authentication, credentials, and provider calls; React owns authoring/status UI; Godot owns presentation and playtest-local dialogue/navigation state. Deterministic authored play must work without network access, and provider failure must never break authored play.

**Tech Stack:** Windows 10/11 x64; Tauri 2.11.x; Rust 1.97.1; React 19.2.7; TypeScript 6.0.x; Vite 8.1.x; Vitest 4.1.x; Ajv 8.20.0; Python 3.12/jsonschema; Godot 4.7.2 stable; localhost WebSocket; OpenRouter HTTPS API; GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-23-playable-runtime-ai-dialogue-design.md`

## Global Constraints

- Windows 10/11 x64 first.
- Godot 4.7.2 stable is the pinned runtime baseline.
- Character visuals are sprites only: `full_body` or `two_thirds`; no portrait mode.
- `two_thirds` means approximately head-to-knees composition.
- Imported images are copied under project-relative `assets/imported/...`; absolute source paths are never canonical data.
- Supported imported image formats: PNG, WebP, JPEG.
- Authored dialogue is an ordered scene/entry editor, not a node graph.
- Free-text AI dialogue is speech-only; no tools, actions, state patches, ChangeSets, or project/runtime mutation.
- Creator must remain open for live AI because Tauri/Rust owns credentials and provider calls.
- Bridge binds loopback only, uses ephemeral port, protocol version 1, opaque session ID, cryptographically random per-session secret, typed message allowlist, and bounded payload sizes.
- Existing valid Slice 1 projects must remain valid.
- No TTS, AI image generation, autonomous NPC systems, hot reload, or standalone exported-game workflow in Slice 2.
- Every task follows TDD: failing test, implementation, passing test, focused review, commit.

---

## File Structure

### Canonical contracts
- Modify `schemas/v1/project/project-manifest.schema.json` — optional `playtest` settings.
- Modify `schemas/v1/world/location-definition.schema.json` — optional `destination_refs`.
- Modify `schemas/v1/asset/asset-variant-record.schema.json` — optional Character `presentation.sprite_framing`.
- Create `schemas/v1/dialogue/dialogue-target.schema.json` — immutable same/cross-scene target.
- Create `schemas/v1/dialogue/dialogue-choice-option.schema.json` — choice label + target.
- Create `schemas/v1/dialogue/dialogue-entry.schema.json` — strict discriminated line/narration/choice union.
- Create `schemas/v1/dialogue/dialogue-scene-definition.schema.json` — scene definition.
- Modify `schemas/registry.json` and fixtures.
- Modify `tools/schema_validation/semantic.py` and `tests/schema_validation/*` — semantic cross-reference checks.

### Creator domain/platform
- Add `apps/creator/src/domain/dialogueTypes.ts`, `dialogueFactory.ts`, `dialogueValidation.ts`.
- Add `apps/creator/src/domain/assetImport.ts` for naming/hash metadata helpers.
- Extend `apps/creator/src/domain/projectTypes.ts`, `validation.ts`, `blankProject.ts`.
- Extend `apps/creator/src/platform/ProjectGateway.ts` and `tauriProjectGateway.ts`.
- Add Rust modules under `apps/creator/src-tauri/src/`: `asset_import.rs`, `runtime_bridge.rs`, `runtime_process.rs`, `credentials.rs`, `openrouter.rs`.
- Keep `project_fs.rs` focused on project persistence; do not fold bridge/provider concerns into it.

### Creator UI
- Add `apps/creator/src/features/dialogue/DialogueEditor.tsx`.
- Add `apps/creator/src/features/playtest/PlaytestPanel.tsx` and `RuntimeLogPanel.tsx`.
- Extend Character/Location editors with persona/location/visual fields.
- Enable Dialogue nav in `CreatorShell.tsx` and Play controls in `App.tsx`.

### Runtime
- Create `apps/runtime-godot/project.godot`.
- Create focused GDScript modules: `bridge_client.gd`, `project_loader.gd`, `dialogue_runtime.gd`, `vn_stage.gd`, `runtime_state.gd`, `main.gd`.
- Create scenes/resources only where they provide structure; canonical project JSON remains source of truth.
- Add headless runtime tests under `apps/runtime-godot/tests/`.

### CI/package
- Add scripts under `tools/runtime/` for Godot acquisition/export verification without committing engine binaries.
- Extend `.github/workflows/creator-validation.yml` to validate/export/package Creator + Godot runtime.

---

### Task 1: Additive Slice 2 schemas and semantic validation

**Files:**
- Modify: `schemas/v1/project/project-manifest.schema.json`
- Modify: `schemas/v1/world/location-definition.schema.json`
- Modify: `schemas/v1/asset/asset-variant-record.schema.json`
- Create: `schemas/v1/dialogue/dialogue-target.schema.json`
- Create: `schemas/v1/dialogue/dialogue-choice-option.schema.json`
- Create: `schemas/v1/dialogue/dialogue-entry.schema.json`
- Create: `schemas/v1/dialogue/dialogue-scene-definition.schema.json`
- Modify: `schemas/registry.json`
- Modify: `tools/schema_validation/semantic.py`
- Modify/Create fixtures under `fixtures/`
- Modify: `tests/schema_validation/test_semantic.py`
- Modify: `apps/creator/src/generated/schemaCatalog.ts`
- Modify: `apps/creator/src/generated/schemaValidators.ts`

**Interfaces:**
- Produces canonical schema IDs `aigs.dialogue.scene`, `aigs.schema.dialogue_entry`, `aigs.schema.dialogue_choice_option`, `aigs.schema.dialogue_target`.
- Produces optional manifest `playtest.start_location_ref` and `playtest.entry_scene_ref`.
- Produces optional Location `destination_refs`.
- Produces optional Asset Variant `presentation.sprite_framing` enum `full_body|two_thirds`.

- [ ] **Step 1: Write failing schema/semantic tests**

Add cases proving: old Slice 1 documents remain valid; a valid dialogue scene validates; duplicate entry IDs, missing entry point, missing speaker, missing branch target, invalid cross-scene target, invalid input mode, and unsupported entry kind fail; cycles are allowed.

Representative fixture:

```json
{
  "schema_id": "aigs.dialogue.scene",
  "schema_version": 1,
  "id": "dialogue.morning",
  "kind": "dialogue_scene",
  "display_name": "Morning",
  "input_mode": "free",
  "entry_point": "line.start",
  "entries": [
    {
      "entry_id": "line.start",
      "kind": "line",
      "speaker_ref": {"ref": "character.maria"},
      "text": "The snow is getting worse.",
      "next": {"scene_ref": null, "entry_id": "choice.reply"}
    },
    {
      "entry_id": "choice.reply",
      "kind": "choice",
      "prompt": "What do you say?",
      "options": [
        {"label": "Check the generator", "target": {"scene_ref": null, "entry_id": "line.generator"}}
      ]
    },
    {
      "entry_id": "line.generator",
      "kind": "narration",
      "text": "You decide to check the generator.",
      "next": null
    }
  ]
}
```

- [ ] **Step 2: Run schema tests and confirm failure**

Run:
```bash
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
```
Expected: new dialogue/additive cases fail because contracts and semantics do not exist yet.

- [ ] **Step 3: Implement strict schemas**

`dialogue-target` must be strict and allow either same-scene (`scene_ref: null`) or explicit cross-scene `DefinitionRef`, with immutable `entry_id`. `dialogue-entry` must use `oneOf` branches with `kind` constants. `dialogue-scene-definition` requires `schema_id`, `schema_version`, immutable `id`, `kind`, `display_name`, `input_mode`, `entry_point`, and `entries`.

- [ ] **Step 4: Extend semantic validation**

Index project definitions by immutable ID. For each scene: verify unique `entry_id`, entry point exists, speakers resolve to Character definitions, same-scene targets exist locally, cross-scene refs resolve to dialogue scenes and target entries, and cycles are accepted. Validate manifest playtest refs and Location destinations by expected definition kind.

- [ ] **Step 5: Regenerate Creator validators and verify parity**

Run:
```bash
cd apps/creator
npm ci
npm run generate:schemas
npm run verify
cd ../..
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
```
Expected: all existing and new tests pass, generated validators are clean.

- [ ] **Step 6: Commit**

```bash
git add schemas fixtures tools/schema_validation tests/schema_validation apps/creator/src/generated
git commit -m "feat(schema): add Slice 2 dialogue and playtest contracts"
```

---

### Task 2: Project-contained asset import and Creator visual authoring

**Files:**
- Create: `apps/creator/src-tauri/src/asset_import.rs`
- Modify: `apps/creator/src-tauri/src/lib.rs`
- Modify: `apps/creator/src-tauri/src/project_fs.rs`
- Create: `apps/creator/src/domain/assetImport.ts`
- Modify: `apps/creator/src/domain/projectTypes.ts`
- Modify: `apps/creator/src/platform/ProjectGateway.ts`
- Modify: `apps/creator/src/platform/tauriProjectGateway.ts`
- Modify: `apps/creator/src/features/characters/CharacterEditor.tsx`
- Modify: `apps/creator/src/features/locations/LocationEditor.tsx`
- Test: `apps/creator/src-tauri/src/asset_import.rs` unit tests
- Test: `apps/creator/tests/assetImport.test.ts`
- Test: `apps/creator/tests/CharacterEditor.test.tsx`
- Test: `apps/creator/tests/LocationEditor.test.tsx`

**Interfaces:**
- Rust command `import_visual_asset(project_root, source_path, subject_id, visual_kind, sprite_framing?) -> ImportedVisualAsset`.
- Rust command `remove_visual_asset(project_root, variant_id) -> ProjectSnapshot` or equivalent narrow operation that leaves canonical files valid.
- `ImportedVisualAsset` returns project-relative path, SHA-256, MIME/extension, asset identity definition, active variant record.

- [ ] **Step 1: Write failing Rust tests for copy/hash/path safety**

Cover PNG/WebP/JPEG acceptance, unsupported extension rejection, source outside project allowed only as import source, destination always under `assets/imported/characters|locations`, collision-safe filenames, SHA-256, replacement without deleting unrelated active data, and no persisted absolute source path.

- [ ] **Step 2: Run focused Rust tests and confirm failure**

```bash
cargo test --manifest-path apps/creator/src-tauri/Cargo.toml asset_import
```

- [ ] **Step 3: Implement `asset_import.rs`**

Use canonical subject ID to choose subfolder; sanitize only filesystem filename, never mutate canonical ID. Copy bytes, compute hash, create/update Asset Identity + Asset Variant records, set `presentation.sprite_framing` only for Character visuals, and persist through existing atomic project write/recovery path.

- [ ] **Step 4: Add typed frontend gateway tests and implementation**

Expose `importCharacterSprite`, `importLocationBackground`, `removeVisualAsset`. Ensure Tauri invocation receives only validated enum values and project root from current opened project.

- [ ] **Step 5: Extend Character/Location editors**

Character: Import/Replace/Remove Sprite, preview, `Full Body|Two Thirds` selector, expanded persona fields, Initial Location selector. Location: Import/Replace/Remove Background, preview, Destination multi-select.

- [ ] **Step 6: Run frontend + Rust verification**

```bash
cd apps/creator && npm run verify && cd ../..
cargo fmt --check --manifest-path apps/creator/src-tauri/Cargo.toml
cargo clippy --manifest-path apps/creator/src-tauri/Cargo.toml --all-targets --all-features -- -D warnings
cargo test --manifest-path apps/creator/src-tauri/Cargo.toml
```

- [ ] **Step 7: Commit**

```bash
git add apps/creator
git commit -m "feat(creator): import project-contained visual assets"
```

---

### Task 3: Versioned localhost bridge, fake runtime, and lifecycle gateway

**Files:**
- Create: `apps/creator/src-tauri/src/runtime_bridge.rs`
- Create: `apps/creator/src-tauri/src/runtime_process.rs`
- Create: `apps/creator/src/platform/RuntimeGateway.ts`
- Create: `apps/creator/src/platform/tauriRuntimeGateway.ts`
- Create: `apps/creator/src/state/runtimeReducer.ts`
- Create: `tools/runtime/fake_runtime.py`
- Test: Rust module tests
- Test: `apps/creator/tests/tauriRuntimeGateway.test.ts`
- Test: `apps/creator/tests/runtimeReducer.test.ts`

**Interfaces:**
- `start_playtest(project_root, start_location_ref, entry_scene_ref?) -> PlaytestSessionSummary`.
- `stop_playtest(session_id)`.
- Runtime event stream normalized to `RuntimeEvent` values: `launching|ready|project_loaded|load_error|log|state|dialogue_request|exited|failed`.
- Envelope fields exactly: `protocol`, `protocol_version`, `session_id`, `message_id`, `type`, `payload`.

- [ ] **Step 1: Write failing Rust protocol/auth tests**

Verify loopback bind, ephemeral port, random secret, bad secret rejection, wrong version rejection, unknown type rejection, malformed JSON rejection, > configured max bytes rejection, clean exit, unexpected child exit.

- [ ] **Step 2: Implement protocol structs and authenticated session state**

Use serde tagged payload structs; do not accept untyped arbitrary JSON for registered messages. Secret comparison must occur before normal traffic. Do not expose generic command execution.

- [ ] **Step 3: Implement fake runtime**

`tools/runtime/fake_runtime.py` accepts launch args/env, connects to provided loopback endpoint, sends authenticated `session.hello`, can emit ready/load/log/state and deterministic failure modes. It exists only for tests/CI.

- [ ] **Step 4: Implement child-process lifecycle**

Start fake/runtime executable with project path/session endpoint/secret. Track exactly one active playtest for Slice 2; second Play request stops/rejects existing session predictably. Emit lifecycle events to React.

- [ ] **Step 5: Add TypeScript runtime gateway/reducer**

UI-facing state must be `Idle|Launching|Running|Failed|Exited`, with session ID, current Location, active scene/entry/NPC, AI status, logs, last error.

- [ ] **Step 6: Verify fake-runtime end to end**

Run Rust tests plus a native test that starts the fake runtime, authenticates, loads, logs, and exits.

- [ ] **Step 7: Commit**

```bash
git add apps/creator tools/runtime/fake_runtime.py
git commit -m "feat(runtime): add authenticated local playtest bridge"
```

---

### Task 4: Godot 4.7.2 runtime scaffold and canonical project loader

**Files:**
- Create: `apps/runtime-godot/project.godot`
- Create: `apps/runtime-godot/main.tscn`
- Create: `apps/runtime-godot/src/main.gd`
- Create: `apps/runtime-godot/src/bridge_client.gd`
- Create: `apps/runtime-godot/src/project_loader.gd`
- Create: `apps/runtime-godot/src/runtime_state.gd`
- Create: `apps/runtime-godot/tests/test_project_loader.gd`
- Create: `apps/runtime-godot/tests/test_bridge_protocol.gd`
- Create: `tools/runtime/verify_godot_version.py`

**Interfaces:**
- Command-line launch args include project root, bridge URL/port, session ID, secret, protocol version.
- `ProjectLoader.load_project(root_path) -> {ok, project, errors}` resolves only project-contained relative files.
- Bridge client sends same protocol v1 envelope as fake runtime.

- [ ] **Step 1: Add a version gate**

`verify_godot_version.py` executes the configured Godot binary with `--version` and rejects anything not beginning with `4.7.2`.

- [ ] **Step 2: Write failing headless loader tests**

Cover valid project, missing manifest, invalid JSON, unsafe `../` asset path, missing optional image path reported as warning, and exact start Location/Entry Scene resolution.

- [ ] **Step 3: Implement project loader**

Godot reads saved canonical JSON only. No Creator internals. Reject path traversal; collect Character/Location/Dialogue/Asset definitions by registered roots.

- [ ] **Step 4: Implement bridge client and startup handshake**

Connect to loopback, send `session.hello`, wait for `session.accepted` and `project.load`, load exact saved project, then emit `project.loaded` and `runtime.ready`; on failure emit `project.load_error`.

- [ ] **Step 5: Run Godot headless tests**

```bash
<godot-4.7.2> --headless --path apps/runtime-godot --script res://tests/test_project_loader.gd
<godot-4.7.2> --headless --path apps/runtime-godot --script res://tests/test_bridge_protocol.gd
```
Expected: PASS with zero parser/runtime errors.

- [ ] **Step 6: Commit**

```bash
git add apps/runtime-godot tools/runtime/verify_godot_version.py
git commit -m "feat(runtime): scaffold Godot playtest loader"
```

---

### Task 5: VN stage, logical navigation, and authored dialogue runtime

**Files:**
- Create: `apps/runtime-godot/src/dialogue_runtime.gd`
- Create: `apps/runtime-godot/src/vn_stage.gd`
- Modify: `apps/runtime-godot/src/main.gd`
- Modify: `apps/runtime-godot/main.tscn`
- Test: `apps/runtime-godot/tests/test_dialogue_runtime.gd`
- Test: `apps/runtime-godot/tests/test_stage_state.gd`

**Interfaces:**
- `DialogueRuntime.start_scene(scene_id)`, `advance()`, `choose(option_index)`, `current_view_model()`.
- `VNStage.set_location(location_id)`, `set_active_npc(character_id)`, `render_state(project, runtime_state)`.
- Runtime state contains current Location, visible Character IDs, active scene/entry, active NPC, history, free-input eligibility.

- [ ] **Step 1: Write failing headless dialogue tests**

Cover line -> narration -> choice -> branch, cross-scene target, allowed cycle with bounded test steps, scene end, `choices_only` gating, active speaker becoming active NPC, explicit visible sprite selection, destination navigation, and history append.

- [ ] **Step 2: Implement deterministic dialogue engine**

No eval/scripting. Traverse immutable IDs only. Never use array position as branch identity. When a line speaker is visible/eligible, set active NPC to speaker.

- [ ] **Step 3: Implement VN stage layout**

Background fills viewport. Character sprites preserve aspect ratio and bottom anchoring. `full_body` retains full image; `two_thirds` scales to target head-to-knees asset composition without bust auto-crop. Multiple sprites scale modestly to fit. Missing file renders named placeholder and emits warning.

- [ ] **Step 4: Implement logical Locations menu + History**

Only current `destination_refs` are offered. Changing Location updates background, visible Character set, active NPC eligibility, and `runtime.state` telemetry.

- [ ] **Step 5: Verify headless + interactive smoke**

Headless tests must pass. Interactive smoke should load a fixture project with background, two sprites, authored scene, choice, and location switch with no Godot errors.

- [ ] **Step 6: Commit**

```bash
git add apps/runtime-godot
git commit -m "feat(runtime): render VN stage and authored dialogue"
```

---

### Task 6: Dialogue workspace, Play flow, status, and logs in Creator

**Files:**
- Create: `apps/creator/src/domain/dialogueTypes.ts`
- Create: `apps/creator/src/domain/dialogueFactory.ts`
- Create: `apps/creator/src/features/dialogue/DialogueEditor.tsx`
- Create: `apps/creator/src/features/playtest/PlaytestPanel.tsx`
- Create: `apps/creator/src/features/playtest/RuntimeLogPanel.tsx`
- Modify: `apps/creator/src/components/CreatorShell.tsx`
- Modify: `apps/creator/src/App.tsx`
- Modify: `apps/creator/src/state/projectReducer.ts`
- Test: `apps/creator/tests/DialogueEditor.test.tsx`
- Test: `apps/creator/tests/PlaytestPanel.test.tsx`
- Test: `apps/creator/tests/PlayFlow.test.tsx`

**Interfaces:**
- Dialogue editor mutates only in-memory canonical definitions through project reducer until Save/Play.
- Play flow: validate -> save -> resolve playtest refs -> `RuntimeGateway.startPlaytest`.

- [ ] **Step 1: Write failing Dialogue editor tests**

Create/rename/delete scene; add/reorder/delete line/narration/choice; preserve immutable IDs; speaker dropdown; target dropdown; choice option ordering; validation errors at affected controls.

- [ ] **Step 2: Implement domain factories and editor**

Factories generate collision-safe immutable IDs. Deleting an entry referenced by a branch must surface validation error; do not silently retarget.

- [ ] **Step 3: Write failing Play flow tests**

Invalid project blocks Play; dirty valid project saves first; start Location required for visual play; optional Entry Scene accepted; launch state transitions; Stop; logs retained after exit.

- [ ] **Step 4: Implement Play/status/log UI**

Enable Dialogue nav. Add Play button and runtime panel showing Runtime, Session, Location, AI, Stop Playtest, Open Logs. No full simulation debugger.

- [ ] **Step 5: Run Creator verification**

```bash
cd apps/creator && npm run verify
```
Expected: all tests/typecheck/schema drift/build pass.

- [ ] **Step 6: Commit**

```bash
git add apps/creator
git commit -m "feat(creator): author dialogue and launch playtests"
```

---

### Task 7: Secure OpenRouter configuration and speech-only live dialogue

**Files:**
- Create: `apps/creator/src-tauri/src/credentials.rs`
- Create: `apps/creator/src-tauri/src/openrouter.rs`
- Modify: `apps/creator/src-tauri/src/runtime_bridge.rs`
- Modify: `apps/creator/src-tauri/src/lib.rs`
- Create: `apps/creator/src/features/playtest/AiDialogueSettings.tsx`
- Modify: `apps/creator/src/domain/projectTypes.ts`
- Modify: `apps/creator/src/App.tsx`
- Modify: `apps/runtime-godot/src/main.gd`
- Modify: `apps/runtime-godot/src/vn_stage.gd`
- Test: Rust provider/credential tests with deterministic HTTP mock
- Test: Creator AI settings tests
- Test: Godot request/in-flight/error tests

**Interfaces:**
- Project selects `default_ai_profiles.npc_dialogue` -> AI Role Profile -> Provider Profile.
- Machine-local credential key name is derived from provider adapter identity, never stored in project.
- `dialogue.request` payload contains request ID, active Character ref, current Location ref, current scene context, bounded recent turns, player text.
- `dialogue.response` contains request ID, `speaker_ref`, plain `text` only.

- [ ] **Step 1: Re-read current official OpenRouter docs before coding adapter**

Verify current official chat/text endpoint, authorization header, model field, messages format, response extraction, timeout/error behavior, and whether tool disabling requires omission or explicit empty configuration. Record only the fields actually used in code comments/tests; do not copy stale chat assumptions.

- [ ] **Step 2: Write failing credential tests**

Store/read/delete API key through Windows credential facility abstraction; raw secret never returned after save; logs/errors redact exact secret and common bearer forms.

- [ ] **Step 3: Write failing provider tests**

Resolve canonical NPC dialogue role/provider; reject non-text provider; require empty tool allowlist; build context from Character persona + premise + current Location + authored scene + bounded recent turns + player text; normalize provider response to plain speech; reject tool/action/structured mutation response; handle timeout, 401, 429, 5xx, cancellation.

- [ ] **Step 4: Implement credential store and OpenRouter adapter**

Keep provider HTTP client behind `OpenRouterClient`/provider boundary so tests inject deterministic transport. Never log authorization headers or raw response bodies when they may contain sensitive request echo.

- [ ] **Step 5: Wire bridge request flow**

Validate active Character is present in reported current Location. One in-flight request per runtime request ID. On provider failure send `dialogue.error`; never unlock mutation paths.

- [ ] **Step 6: Implement runtime free-text UI behavior**

Free input enabled only when scene input mode permits and visible active NPC exists. Disable send for duplicate in-flight request; recover on response/error/timeout. Append player + NPC text to session History; keep bounded recent turns in memory only.

- [ ] **Step 7: Verify all layers**

Run Creator/Rust/Godot tests with mock provider only; no CI secret required.

- [ ] **Step 8: Commit**

```bash
git add apps/creator apps/runtime-godot
git commit -m "feat(ai): add speech-only OpenRouter playtest dialogue"
```

---

### Task 8: Windows packaging, CI, docs, and end-to-end hardening

**Files:**
- Modify: `.github/workflows/creator-validation.yml`
- Create: `tools/runtime/export_runtime.ps1`
- Modify: `apps/creator/src-tauri/tauri.conf.json` for packaged runtime resource/sidecar as chosen by Tauri-supported mechanism
- Modify: `apps/creator/README.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `docs/CURRENT_STATE.md`
- Add representative sample fixture/project under `fixtures/projects/slice2-playable/` or equivalent test-only location

**Interfaces:**
- Downloadable artifact contains `AI Game Studio.exe`, packaged Godot runtime executable/data required to launch, and README.
- Runtime executable path is resolved from packaged app resources, never from developer-machine Godot install.

- [ ] **Step 1: Add CI version/export test**

Install/download Godot 4.7.2 stable from official source in CI, verify exact version, run headless runtime tests, export Windows runtime, then build Tauri Creator with exported runtime bundled.

- [ ] **Step 2: Add deterministic packaged smoke**

Use fake provider or AI-disabled mode. Create/load representative saved project, launch packaged runtime, authenticate, receive project.loaded/runtime.ready, verify clean exit. CI must not require OpenRouter credentials.

- [ ] **Step 3: Run full verification**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
cd apps/creator && npm ci && npm run verify && cd ../..
cargo fmt --check --manifest-path apps/creator/src-tauri/Cargo.toml
cargo clippy --manifest-path apps/creator/src-tauri/Cargo.toml --all-targets --all-features -- -D warnings
cargo test --manifest-path apps/creator/src-tauri/Cargo.toml
<godot-4.7.2> --headless --path apps/runtime-godot --script res://tests/run_all.gd
cd apps/creator && npm run tauri -- build --no-bundle
```
Expected: zero failures/warnings promoted by Clippy, zero schema mismatches, exported runtime present.

- [ ] **Step 4: Manual Windows acceptance pass**

Verify the exact definition-of-done flow from the spec: import sprite/background, choose full-body/two-thirds, author branching scene, configure start Location/Entry Scene, Play, authored branching, location switching, active NPC selection, free text with a real user-supplied OpenRouter key, provider failure fallback, Stop/close, logs.

- [ ] **Step 5: Update durable handoff**

`docs/CURRENT_STATE.md` must state exact branch/SHA, tests, artifact name, known limits, next unfinished slice. `CHANGELOG.md` records user-visible playable runtime, imported assets, dialogue editor, and live AI speech.

- [ ] **Step 6: Commit and open PR**

```bash
git add .github tools apps README.md CHANGELOG.md docs fixtures
git commit -m "feat: package playable Slice 2 runtime"
git push -u origin <slice-2-implementation-branch>
```
Open a PR to `main`, include exact verification evidence and artifact details, and do not merge without user approval.

---

## Plan self-review checklist

- Schema additions preserve Slice 1 compatibility and cover dialogue, playtest refs, destinations, and sprite framing.
- Asset imports remain project-contained and use existing Asset Identity/Variant contracts.
- Bridge/provider concerns are isolated from project persistence.
- Godot never receives credentials or Creator mutation APIs.
- Authored play is deterministic and network-independent.
- Speech-only AI boundary is tested at Rust and runtime edges.
- Full-body/two-thirds sprite rule is explicit in schema, Creator UI, runtime staging, and acceptance tests.
- OpenRouter contract is re-verified from official docs immediately before adapter implementation.
- CI packages both Creator and Godot runtime and requires no real provider key.
- No task pulls TTS, image generation, systemic AI, hot reload, or standalone export into Slice 2.
