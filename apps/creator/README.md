# AI Game Studio Creator Foundation

The Creator Foundation is a Windows 10/11 x64 Tauri desktop editor for
schema-backed, local AI Game Studio projects. It stores projects in ordinary
user-owned folders and uses the standard Microsoft Edge WebView2 platform
runtime available on supported Windows installations. This slice does not
bundle a fixed WebView2 runtime, installer, or updater.

## Local development

From `apps/creator`:

```text
npm ci
npm run verify
npm run tauri -- dev
cargo test --manifest-path src-tauri/Cargo.toml
npm run tauri -- build --no-bundle
```

`npm run verify` checks that the generated schema catalog and precompiled
validators are current, exercises the authored native-ESM CommonJS interop
adapter against direct, wrapped, cyclic, depth-bounded, and malformed module
shapes, runs differential parity for all 45 generated validators against fresh
Ajv, then runs frontend tests, TypeScript validation, and the production web
build.

## Supported Creator Foundation flow

1. Create a blank local project folder.
2. Open an existing local project.
3. Add and edit Characters, keeping stable definition IDs separate from
   display names.
4. Add and edit logical Locations, including their schema-backed fields and
   references.
5. Repair supported validation errors in an opened project and save only after
   canonical schema and cross-reference validation succeeds.
6. Close and reopen the project to continue editing the saved local data.

The project name and premise are supplied during blank-project creation; this
slice does not provide a general project-metadata editor after creation.
Replacing a dirty project or closing its window requires an explicit Save,
Discard, or Cancel choice.

Local saves use the native Creator boundary and keep recovery copies. The
Creator does not grant the webview arbitrary filesystem access.

## Deliberately absent from this slice

- Godot runtime, runtime bridge, and playtest.
- Copilot, ChangeSets, provider connections, and cloud/accounts.
- AI image generation, Asset Studio, and manual asset workflows.
- Inworld TTS, voice playback, and voice authoring.
- Standalone game export or a combined Creator + Godot release.
- VN presentation, systemic simulation, NPC autonomy, runtime saves, themes,
  and other later-slice runtime features.

The Windows ZIP produced by CI is a Creator smoke-build artifact only. The
local no-bundle release has been launched through Home and its production
Open/render/Save validation paths were exercised with a disposable local
project. The native New Project folder picker and real clean/dirty title-bar
close interaction remain controller GUI evidence; hosted CI and downloadable
artifact extraction/launch also remain final review-gate evidence rather than
a promise made by this repository change.
