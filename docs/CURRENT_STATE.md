# Current Project State

Last updated: 2026-08-23

## Authoritative current handoff

Creator MVP Slice 1 is merged into `main` through PR #4.

Main integration commit:
`0f4b88af8e331f0a13cf20f63a494f853bde7e11`

Slice 1 delivers the Windows Tauri + React Creator Foundation with local project create/open/save/reopen, canonical schema validation, recovery-backed persistence, Character editing, and logical Location editing. The user manually verified the packaged Windows app can create/edit/save/close/reopen a project successfully.

The active work is now **Creator MVP Slice 2 — Playable Runtime + Live AI Dialogue**.

Active branch:
`isenscwadorf/creator-mvp-slice-2-design`

Active Slice 2 spec:
`docs/superpowers/specs/2026-08-23-playable-runtime-ai-dialogue-design.md`

Parent Creator MVP spec:
`docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

New architecture decision:
`docs/DECISIONS/ADR-0014-local-websocket-runtime-bridge-and-creator-owned-ai-gateway.md`

Current gate: the Slice 2 design is approved in chat, written, committed, and self-reviewed. The user must review/approve the written spec before implementation planning begins. After that approval, invoke the Superpowers `writing-plans` workflow. Do not start implementation before that gate.

## Slice 2 locked scope

Slice 2 adds the first playable runtime loop:

- packaged Godot 4.7.2 playtest runtime launched as a separate process/window;
- localhost-only versioned WebSocket bridge owned by the Tauri Rust backend;
- runtime lifecycle, logs, session state, and a fake/headless bridge harness;
- self-contained manual image import into project `assets/`;
- Character sprites only, with `full_body` or `two_thirds` framing;
- no portrait mode;
- `two_thirds` means roughly head to knees;
- Location backgrounds;
- logical Location destination navigation, not top-down walking;
- first-class canonical Dialogue schema family;
- form/list Dialogue editor with lines, narration, choices, and immutable jump targets;
- free-text AI conversation by default when an active NPC is selected;
- authored `choices_only` scenes can temporarily disable free text;
- OpenRouter live dialogue through the Creator-owned native gateway;
- AI reply is speech-only and cannot mutate runtime or project state;
- Creator remains open while runtime AI is in use;
- authored gameplay remains usable if OpenRouter fails.

## Slice 2 schema decisions

The written spec locks these additive canonical changes:

- `project-manifest.playtest` optional object with Start Location and Entry Scene refs;
- `location-definition.destination_refs` for logical VN navigation; existing `child_location_refs` remains hierarchy;
- `asset-variant-record.presentation.sprite_framing` optional enum `full_body | two_thirds`;
- new strict Draft 2020-12 `schemas/v1/dialogue/` family;
- existing Asset Identity/Variant linkage remains authoritative;
- existing AI Provider Profile + AI Role Profile contracts remain authoritative;
- `project-manifest.default_ai_profiles.npc_dialogue` selects the runtime dialogue role profile;
- OpenRouter API key stays machine-local and never becomes project data.

Existing Slice 1 documents must remain valid after additive schema changes.

## Slice 2 runtime presentation

Target runtime is a modern VN/life-sim layout:

- full-window Location background;
- one or more layered Character sprites;
- bottom translucent dialogue/narration panel;
- speaker name and text;
- authored choice buttons;
- free-text input when allowed;
- compact Locations menu;
- current-session History panel;
- unobtrusive runtime/AI connection state.

Character sprites preserve their chosen framing and aspect ratio. Full-body sprites are never automatically cropped into bust/portrait framing. Multiple Characters may scale down modestly to fit the stage.

## Live AI dialogue boundary

Slice 2 intentionally moves only runtime live dialogue forward from the later AI slice.

Allowed AI result:

```text
speaker_ref
text
```

Not allowed in Slice 2:

- tool calls that execute game actions;
- world-state patches;
- inventory changes;
- relationship changes;
- goals/plans;
- autonomous NPC actions;
- persistent memories/beliefs;
- Creator ChangeSets;
- canonical definition mutation.

AI context is bounded to canonical Character persona, project premise, current Location, current authored scene context, recent temporary conversation turns, and the player's current message.

## Existing architecture invariants

- Player and NPC share one Character model.
- Runtime AI cannot directly mutate arbitrary game state.
- Actions/Activities remain typed deterministic engine operations for later systemic work.
- World Truth and per-character Beliefs remain separate.
- Provider-specific APIs stay behind adapters.
- Creator credentials remain outside project data.
- Godot remains hidden runtime infrastructure, not the authoring UX.
- Canonical project data uses strict UTF-8 JSON + JSON Schema Draft 2020-12.
- Definition IDs are immutable namespaced IDs; runtime instance IDs are opaque UUIDs.
- Core schemas are strict; extension payloads are explicit and namespaced.
- Copilot project mutation later uses typed ChangeSets with engine-generated undo.
- Asset identity remains separate from individual generated/imported artifacts.
- Godot 4.7.2 stable is the accepted initial runtime baseline.

## Out of Slice 2

Do not pull these into the implementation plan unless the user explicitly changes scope:

- portrait Character art;
- AI image generation;
- TTS/Inworld voice;
- autonomous NPC planning;
- needs simulation;
- relationship mutation;
- persistent Memory/Belief updates;
- inventory/systemic item actions;
- general runtime AI tools/actions;
- full event system;
- runtime saves;
- multiplayer;
- top-down movement/pathfinding;
- animation authoring;
- visual node-graph dialogue editor;
- hot reload requirement;
- standalone game export.

## Verification baseline inherited from Slice 1

The merged Slice 1 implementation was verified before integration with:

- Creator aggregate verification including 102 Vitest tests, TypeScript checking, generated validator checks, schema drift check, and production Vite build;
- Python schema unit suite: 23 tests passed;
- fixture parity: 59 cases, 0 mismatches;
- Rust formatting, Clippy with warnings denied, and 14 tests;
- Tauri Windows release build;
- hosted Schema Validation and Creator Validation workflows green on the implementation head;
- packaged Windows executable launch smoke;
- user manual create/edit/save/close/reopen test.

Future work must keep existing checks green and add Slice 2-specific tests rather than replacing them.

## Next concrete steps

1. User reviews `docs/superpowers/specs/2026-08-23-playable-runtime-ai-dialogue-design.md`.
2. If changes are requested, update the spec and re-run its self-review.
3. Once the written spec is approved, invoke `writing-plans`.
4. Produce the detailed Slice 2 implementation plan with TDD and verification checkpoints.
5. Only then begin implementation.

## Handoff read order

1. `docs/START_HERE.md`
2. `docs/CURRENT_STATE.md`
3. ADR-0001 through ADR-0014 as relevant
4. `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`
5. `docs/superpowers/specs/2026-08-23-playable-runtime-ai-dialogue-design.md`
6. existing Slice 1 implementation plan for established Creator patterns
7. current tests and CI workflows
8. branch/git status
