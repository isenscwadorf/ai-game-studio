# Current Project State

Last updated: 2026-08-23

## Authoritative current handoff

Creator Foundation (Slice 1) has completed local implementation review and
hardening. It is the Windows 10/11 x64 Tauri + React editor for schema-backed
local project definitions; it is not yet the playable runtime.

Branch: `isenscwadorf/creator-mvp-slice-1-implementation`

Reviewed Round 4 implementation commit (code, tests, and generated validators):
`bf0dfd6b621d4d810d2b510f96a0e78fd3053105`

Active design spec:
`docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

Active implementation plan:
`docs/superpowers/plans/2026-08-23-creator-foundation-implementation-plan.md`

Implemented locally: blank project create/open/save/reopen, canonical schema
and cross-reference validation, recovery-backed persistence, and manual
Character and logical Location editing. Final-review hardening lets
envelope-safe but canonically invalid projects open for supported repairs while
Save remains validation-gated; Character name drafts no longer invalidate the
stored document while typing; and dirty Open/window-close transitions share an
accessible Save/Discard/Cancel guard. Duplicate display names expose immutable
IDs, and the narrow Creator layout collapses into explicit one-column rows.
Round 2 grants only the explicit Tauri window-destroy permission used after an
approved close, projects canonically invalid manifest metadata into safe text
fallbacks without mutating raw project data, and precompiles canonical Ajv
validators so the strict production CSP does not require `unsafe-eval`.
Round 3 makes the generated standalone validators interoperable with native
Node ESM and the production Vite CommonJS namespace shapes. Differential tests
now execute every one of the 45 generated validators against fresh Ajv across
the 59 repository fixtures plus six representative valid/invalid cases. Round
4 moves the CommonJS default-export adapter into an authored module, follows
only own `default` properties, terminates identity cycles and depth-bounded
fresh wrappers, and rejects malformed helper or formats terminals with
deterministic initialization errors.

Known limits: project name and premise are creation-time inputs rather than a
general metadata editor; only individually valid Character and Location
documents expose mutation controls; and Slice 1 has no Godot runtime, Play
command, runtime bridge, VN presentation, authored dialogue UI, or runtime
logs. Copilot/ChangeSets, provider connections, accounts/cloud sync, AI image
generation/Asset Studio, Inworld TTS, game export, systemic simulation, NPC
autonomy, and runtime saves also remain deferred to later slices.

The production close capability and injected adapter behavior are automated.
The final controller attempted the real clean/dirty title-bar GUI pass, but the
Windows Computer Use helper remained unavailable after its required reset and
retry (`native pipe` missing). A loopback WebView substitute could not faithfully
send an OS title-bar event: the optional Tauri `close` command is intentionally
denied by least-privilege capabilities and WebView2 ignores `window.close()`.
No extra permission was added just for the harness. Real title-bar interaction
therefore remains a manual live-test limitation rather than a claimed result.
The packaged New Project dialog was checked through valid field entry and its
enabled Create action, but its native folder picker was not automated and the
complete picker-driven New flow is not claimed.

Windows packaging assumes the standard WebView2 platform runtime. No
fixed-runtime, installer, or updater is bundled in this slice.

Fresh GREEN final-controller evidence for the reviewed Round 4 implementation
commit:
`npm run verify` passed 14 native-ESM adapter edge checks, 47 native-ESM
validator checks, 102 Vitest tests, TypeScript checking, and the production
Vite build. The validator checks compare validity and normalized errors for all
45 generated validators against fresh Ajv over 65 cases. Python unit discovery
passed 23 tests and fixture validation passed all 59 cases with zero mismatches.
Rust formatting, all-target/all-feature Clippy with warnings denied, and 14
native tests passed. The command `npm run tauri -- build --no-bundle` completed
with exit code 0 under the strict production CSP and produced the executable at
`apps/creator/src-tauri/target/release/ai-game-studio-creator.exe` (9,087,488
bytes; SHA-256
`3CE5D94F40679C21220353A595C9F701BE77C703C79BC96C2C95FA55B8F3EBE7`).
`git diff --check` passed, and regeneration/build introduced no tracked changes
beyond the intended committed files. The single production chunk is 787.71 kB
uncompressed and 114.21 kB gzip; Vite reports its advisory 500 kB chunk warning.

The prior Round 3 release executable was launched locally; its live
`http://tauri.localhost/` WebView
reached `readyState=complete`. A disposable canonical project was provisioned
through real native `create_project` IPC, then opened by clicking its
recent-project entry. The packaged Dashboard rendered `Validation: Valid` and
`Saved` with no alert, and clicking Save completed native persistence and
created a 401-byte recovery copy. CDP recorded zero runtime exceptions, console
errors, or log errors. This proves the previously exercised
production-bundled Open/render/Save validation paths, not the native folder
picker or title-bar close; the Round 4 executable was built but not separately
GUI-driven.

Hosted GitHub Actions and downloadable artifact inspection/launch remain
pending the final PR gate. Real title-bar close-flow evidence remains the manual
live-test limitation described above. This handoff does not claim those results.

Next three unfinished Slice 2 tasks:

1. Specify and version the local-only Creator-to-runtime playtest bridge,
   including a headless fake for launch, ready, load-error, log, and exit events.
2. Scaffold the pinned Godot 4.7.2 runtime so it validates and loads the
   canonical project and renders the first VN/location screen with character,
   background, navigation, and authored dialogue/choice presentation.
3. Add the Creator Play flow and structured runtime lifecycle/log UI, then prove
   that Play launches a separate runtime process that displays the current
   project.

## Superseded planning snapshot (historical)

M0 architecture contracts are implemented and merged. Work has moved into the Creator MVP architecture that bridges M1 Snowed In Prototype and the minimum M2 AI Creator capability needed for a genuinely usable downloadable application.

## Current branch / review

Branch: `isenscwadorf/the-7-specify-snowed-in-vertical-slice`

Active design spec: `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

The design spec is written and committed. The current gate is final user review of that written specification before implementation planning begins.

## Completed

- PR #1 merged: durable repository memory and architecture baseline.
- PR #2 merged: canonical schema design, implementation plan, and ADR baseline.
- PR #3 merged: canonical schema registry and validation implementation.
- THE-6 is Done.
- THE-7 is In Progress.
- ADR-0001 through ADR-0012 are accepted.
- Machine-readable JSON Schema Draft 2020-12 registry is implemented.
- Structural and semantic schema validation is implemented and CI-proven.
- Character/Controller, world, interaction, event, cognition, relationship, AI, ChangeSet, and asset contracts exist.
- Creator MVP architecture has been collaboratively designed in chat and written to the repository for final review.

## Runtime / Creator status

No gameplay runtime or Creator desktop implementation exists yet. This remains intentional: implementation is gated on the written Creator MVP spec review and implementation planning.

## Creator MVP decisions currently in the written spec

- Windows 10/11 x64 first.
- Local project folders only; no accounts/cloud sync in v0.1.
- Separate custom Creator App and separate Godot Runtime App.
- Creator App: Tauri + React + TypeScript.
- Godot remains hidden runtime infrastructure.
- Playtest launches a separate runtime window.
- No standalone game export in v0.1.
- VN/location-screen presentation rather than top-down exploration.
- Location-menu navigation in v0.1.
- AI-assisted authoring with manual editing as an authoritative path.
- Integrated AI image generation plus manual import.
- Runtime NPC AI with goals, planning, dialogue, perception, memory, relationships, and typed engine actions.
- Bring-your-own API keys.
- OpenRouter remains the default LLM gateway behind an abstraction.
- Inworld `inworld-tts-1.5-mini` is the initial TTS target.
- TTS 1.5 Mini uses a strict model-specific allowlist for its limited documented experimental emotion/style/non-verbal markup; TTS-2 natural-language steering is not sent to 1.5 Mini.
- Runtime UI uses semantic theme tokens; v0.1 ships one polished default theme and theme selection/editing comes later.
- Snowed In is a starter/sample and integration proof, not hard-coded engine logic.

## Existing architecture invariants

- Player and NPC share one Character model.
- NPCs can initiate valid engine Actions autonomously.
- Actions are atomic; Activities are explicitly interruptible.
- World Truth is separate from per-character knowledge and belief.
- OpenRouter is behind a provider abstraction.
- Inworld is behind an adapter/service boundary.
- Godot is runtime infrastructure, not the creator-facing product UX.
- Canonical persisted definitions use strict UTF-8 JSON and JSON Schema Draft 2020-12.
- Project Definitions and Runtime State are separate schema families.
- Persistent definition IDs are immutable namespaced IDs; runtime instance IDs are opaque UUIDs.
- Core schemas are strict; extension payloads are explicit and namespaced.
- Core Conditions/Effects are declarative and non-executable.
- Copilot project changes use atomic typed ChangeSets with engine-generated undo receipts.
- Generated assets use stable semantic identities and provenance.
- Godot 4.7.2 stable is the currently accepted initial runtime baseline per ADR-0012.

## Creator MVP delivery decomposition

The parent design deliberately decomposes implementation into five working slices:

1. Creator Foundation — Tauri/React shell, local projects, schema-backed editing, validation and recovery.
2. Playable Runtime — Godot VN presentation, logical locations, authored dialogue, playtest bridge and logs.
3. Systemic Simulation — Actions/Activities, events, needs, relationships/emotions, cognition, autonomy, dynamic dialogue, debug, runtime saves.
4. AI Creation and Assets — OpenRouter Copilot, typed ChangeSets/undo, image generation, Asset Studio, credentials.
5. Voice and Release Hardening — Inworld 1.5 Mini, strict markup handling, streaming/fallback, Snowed In end-to-end proof, Windows portable ZIP.

Each slice must preserve a working repository and receives focused implementation planning rather than being built as one giant branch.

## Verification baseline inherited from THE-6

PR #3 was merged after green CI. The schema baseline at merge had:

```text
python -m unittest discover -s tests -p 'test_*.py' -v
23 tests, 0 failures

python tools/schema_validation/validate_fixtures.py
59 fixture cases, 0 mismatches
```

Future implementation must keep these schema checks green and add slice-specific tests rather than replacing them.

## Current blockers / gate

There is no known architecture blocker in the approved in-chat design. The written spec is awaiting final user review. Do not start implementation before that review gate passes.

The parent spec intentionally delegates lower-level implementation selections such as the exact local Creator/Runtime IPC transport and the concrete first image-generation adapter to the appropriate slice-specific implementation planning, while locking their required interfaces, safety properties, and end-user behavior.

## Next concrete steps

1. User reviews `docs/superpowers/specs/2026-08-23-creator-mvp-design.md` and requests changes or approves it.
2. After approval, invoke the Superpowers writing-plans workflow.
3. Plan and execute Slice 1 — Creator Foundation first, using TDD and verification gates.
4. Update this file at each handoff and never rely on chat as canonical project memory.

## Handoff read order

1. `docs/START_HERE.md`
2. `docs/CURRENT_STATE.md`
3. ADR-0001 through ADR-0012
4. `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`
5. `docs/specs/2026-08-23-canonical-engine-schemas-design.md`
6. `docs/plans/2026-08-23-the-6-schema-implementation-plan.md`
7. Run the schema verification commands above before changing canonical contracts.
