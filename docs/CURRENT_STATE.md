# Current Project State

Last updated: 2026-08-23

## Milestone / phase

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
