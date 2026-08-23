# Creator Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Slice 1 of AI Game Studio: a Windows-only Tauri/React Creator App that can create, open, validate, manually edit, save, close, and reopen schema-backed local projects with basic Character and Location editing, then produce a downloadable Windows smoke-build artifact.

**Architecture:** `apps/creator` contains a React/TypeScript editor and a narrow Tauri/Rust native boundary. The React domain owns project editing and structural/semantic validation; Rust owns dialogs, safe path handling, atomic local JSON persistence, and recovery copies. Canonical schemas under repository `schemas/` remain authoritative and are generated into an Ajv catalog for the Creator; no parallel project schema is invented.

**Tech Stack:** Windows 10/11 x64; Tauri 2.11.x; Rust 1.97.1; React 19.2.7; TypeScript 6.0.x; Vite 8.1.x; Vitest 4.1.x; React Testing Library 16.3.2; Ajv 8.20.0; npm with Node.js 24 LTS; existing Python 3.12/jsonschema schema harness remains authoritative CI coverage.

**Spec:** `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

## Global Constraints

- v0.1 is Windows 10/11 x64 only; this slice produces a Windows x64 Creator smoke build.
- Projects are ordinary local user-owned folders; no accounts, cloud sync, database, or remote storage.
- Creator App is Tauri + React + TypeScript; Godot is a separate future runtime process per ADR-0013.
- Canonical persisted project data is strict UTF-8 JSON and JSON Schema Draft 2020-12 with stable `urn:aigs:` IDs.
- Definitions and Runtime State remain separate; Slice 1 edits definitions only.
- Definition IDs are immutable after creation; renaming `display_name` never changes `id`.
- Credentials never enter project JSON, recent-project metadata, logs, or recovery copies.
- The webview receives no unrestricted filesystem capability. Native commands expose only create/open/save project operations.
- Save is allowed only when the entire in-memory Slice 1 project passes structural and cross-reference validation.
- Native writes are atomic per canonical JSON file and maintain a rolling last-known recovery copy; multi-document ChangeSet transactions remain a later Copilot concern.
- Godot playtest, runtime simulation, Copilot, image generation, Inworld TTS, and standalone game export are out of scope.
- Use TDD. Each task ends with tests and a focused commit.
- Keep existing schema verification green: `python -m unittest discover -s tests -p 'test_*.py' -v` and `python tools/schema_validation/validate_fixtures.py`.
- UI colors/typography use semantic CSS tokens from the first commit; Slice 1 ships one default creator theme only.
- Pin build dependencies through `package-lock.json`, `Cargo.lock`, and `rust-toolchain.toml`; CI must not depend on floating toolchain versions.

---

## File Structure Map

```text
apps/creator/
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── scripts/
│   └── generate-schema-catalog.mjs
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── app.css
│   ├── generated/schemaCatalog.ts
│   ├── domain/
│   │   ├── ids.ts
│   │   ├── projectTypes.ts
│   │   ├── blankProject.ts
│   │   ├── validation.ts
│   │   ├── characterFactory.ts
│   │   └── locationFactory.ts
│   ├── platform/
│   │   ├── ProjectGateway.ts
│   │   └── tauriProjectGateway.ts
│   ├── state/
│   │   ├── projectReducer.ts
│   │   └── recentProjects.ts
│   ├── components/
│   │   ├── CreatorShell.tsx
│   │   └── ValidationBanner.tsx
│   └── features/
│       ├── home/HomeScreen.tsx
│       ├── home/NewProjectDialog.tsx
│       ├── dashboard/ProjectDashboard.tsx
│       ├── characters/CharacterEditor.tsx
│       └── locations/LocationEditor.tsx
├── src-tauri/
│   ├── Cargo.toml
│   ├── Cargo.lock
│   ├── rust-toolchain.toml
│   ├── build.rs
│   ├── tauri.conf.json
│   ├── capabilities/default.json
│   └── src/
│       ├── main.rs
│       ├── lib.rs
│       └── project_fs.rs
└── tests/
    ├── setup.ts
    ├── validation.test.ts
    ├── blankProject.test.ts
    ├── projectReducer.test.ts
    ├── recentProjects.test.ts
    ├── HomeScreen.test.tsx
    ├── CreatorShell.test.tsx
    ├── CharacterEditor.test.tsx
    └── LocationEditor.test.tsx

.github/workflows/creator-validation.yml
```

`ProjectGateway` is the only UI-facing persistence interface. Editor components never import Tauri APIs. `validation.ts` is the only Creator-side structural/semantic validation service. Rust never invents gameplay/project semantics; it only protects filesystem integrity.

---

### Task 1: Scaffold the pinned Tauri/React Creator shell

**Files:**
- Create: `apps/creator/package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
- Create: `apps/creator/src/main.tsx`, `App.tsx`, `app.css`, `App.test.tsx`
- Create: `apps/creator/tests/setup.ts`
- Create: `apps/creator/src-tauri/Cargo.toml`, `Cargo.lock`, `rust-toolchain.toml`, `build.rs`, `tauri.conf.json`, `capabilities/default.json`
- Create: `apps/creator/src-tauri/src/main.rs`, `lib.rs`

**Interfaces:**
- Produces: React root `App`, Tauri binary `ai-game-studio-creator`, npm scripts `dev`, `test:run`, `typecheck`, `build`, `tauri`.

- [ ] **Step 1: Write the failing shell test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the creator identity', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'AI Game Studio' })).toBeInTheDocument();
    expect(screen.getByText('Create or open a local project')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Install pinned dependencies and verify the test initially fails**

```bash
cd apps/creator
npm install --save-exact react@19.2.7 react-dom@19.2.7 @tauri-apps/api@2.11.1 @tauri-apps/plugin-dialog@2.7.2 ajv@8.20.0 ajv-formats@3.0.1
npm install --save-dev --save-exact @tauri-apps/cli@2.11.4 @vitejs/plugin-react@6.0.5 vite@8.1.0 typescript@6.0.3 vitest@4.1.0 jsdom@26.1.0 @testing-library/react@16.3.2 @testing-library/dom@10.4.1 @testing-library/jest-dom@6.8.0 @types/react@19.2.12 @types/react-dom@19.2.3
npm run test:run -- src/App.test.tsx
```

Expected before `App` implementation: FAIL because the module/UI is absent.

Required scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit",
    "build": "tsc --noEmit && vite build",
    "tauri": "tauri"
  }
}
```

- [ ] **Step 3: Implement the minimal shell and semantic theme tokens**

```tsx
export function App() {
  return (
    <main className="boot-screen">
      <h1>AI Game Studio</h1>
      <p>Create or open a local project</p>
    </main>
  );
}
```

```css
:root {
  --aigs-bg-canvas: #171920;
  --aigs-bg-panel: #20232d;
  --aigs-bg-elevated: #292d39;
  --aigs-text-primary: #f4f5f7;
  --aigs-text-muted: #a9afbd;
  --aigs-accent-primary: #8c7cf0;
  --aigs-border-default: #383d4a;
  --aigs-danger: #e36d78;
  --aigs-success: #70c490;
  --aigs-radius: 8px;
}
```

Pin Rust:

```toml
[toolchain]
channel = "1.97.1"
profile = "minimal"
components = ["rustfmt", "clippy"]
```

Register only native dialog support initially:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running AI Game Studio Creator");
}
```

- [ ] **Step 4: Verify frontend and native scaffold**

```bash
cd apps/creator
npm run test:run
npm run typecheck
npm run build
cd src-tauri
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/creator
git commit -m "feat(creator): scaffold Tauri React desktop shell"
```

---

### Task 2: Generate the schema catalog and implement whole-project validation

**Files:**
- Create: `apps/creator/scripts/generate-schema-catalog.mjs`
- Create: `apps/creator/src/generated/schemaCatalog.ts`
- Create: `apps/creator/src/domain/validation.ts`
- Test: `apps/creator/tests/validation.test.ts`
- Modify: `apps/creator/package.json`

**Interfaces:**
- Consumes: `schemas/registry.json` and every canonical schema path it lists.
- Produces: `validateDocument(schemaId, value)`, `validateProject(snapshot)`, normalized `ValidationIssue[]`.

- [ ] **Step 1: Write failing structural and semantic tests**

```ts
it('accepts a canonical manifest', () => {
  expect(validateDocument('aigs.project.manifest', validManifest).valid).toBe(true);
});

it('rejects unknown strict-core properties', () => {
  const result = validateDocument('aigs.project.manifest', { ...validManifest, api_key: 'no' });
  expect(result.valid).toBe(false);
});

it('rejects duplicate definition IDs and missing refs', () => {
  const result = validateProject(snapshotWith([
    character('character.alex'),
    character('character.alex'),
    { ...location('location.hall'), child_location_refs: [{ ref: 'location.missing' }] }
  ]));
  expect(result.errors.map((e) => e.code)).toContain('DUPLICATE_DEFINITION_ID');
  expect(result.errors.map((e) => e.code)).toContain('REFERENCE_NOT_FOUND');
});
```

- [ ] **Step 2: Run tests and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/validation.test.ts
```

Expected: FAIL because catalog/validator do not exist.

- [ ] **Step 3: Implement deterministic generation plus Ajv 2020 validation**

Generator core:

```js
const registry = JSON.parse(await readFile(registryPath, 'utf8'));
const entries = await Promise.all(registry.schemas.map(async (entry) => ({
  schemaId: entry.schema_id,
  urn: entry.urn,
  schema: JSON.parse(await readFile(resolve(repoRoot, entry.path), 'utf8'))
})));
entries.sort((a, b) => a.schemaId.localeCompare(b.schemaId));
await writeFile(outputPath, `export const schemaCatalog = ${JSON.stringify(entries, null, 2)} as const;\n`);
```

Ajv setup:

```ts
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
for (const entry of schemaCatalog) ajv.addSchema(entry.schema, entry.urn);
```

`validateProject` must:

1. structurally validate the manifest as `aigs.project.manifest`;
2. structurally validate every definition using its own `schema_id`;
3. collect IDs and report duplicates;
4. recursively recognize a DefinitionRef only when the value is exactly `{ ref: string }`;
5. report any ref not present in the project definition ID set;
6. return sorted normalized errors without throwing for user data.

Reference traversal shape:

```ts
function collectRefs(value: unknown, path: Array<string | number> = []): RefHit[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => collectRefs(item, [...path, index]));
  if (!value || typeof value !== 'object') return [];
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length === 1 && keys[0] === 'ref' && typeof record.ref === 'string') {
    return [{ ref: record.ref, path }];
  }
  return Object.entries(record).flatMap(([key, child]) => collectRefs(child, [...path, key]));
}
```

Add scripts:

```json
{
  "scripts": {
    "schemas:generate": "node scripts/generate-schema-catalog.mjs",
    "schemas:check": "node scripts/generate-schema-catalog.mjs && git diff --exit-code -- src/generated/schemaCatalog.ts",
    "pretest:run": "npm run schemas:generate",
    "prebuild": "npm run schemas:generate"
  }
}
```

- [ ] **Step 4: Verify JS and existing Python schema behavior together**

```bash
cd apps/creator
npm run schemas:generate
npm run test:run -- tests/validation.test.ts
npm run typecheck
cd ../..
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
```

Expected: PASS with local/offline `$ref` resolution.

- [ ] **Step 5: Commit**

```bash
git add apps/creator/scripts apps/creator/src/generated apps/creator/src/domain/validation.ts apps/creator/tests/validation.test.ts apps/creator/package.json apps/creator/package-lock.json
git commit -m "feat(creator): add canonical project validation"
```

---

### Task 3: Define stable IDs, project snapshot, and blank-project factory

**Files:**
- Create: `apps/creator/src/domain/ids.ts`
- Create: `apps/creator/src/domain/projectTypes.ts`
- Create: `apps/creator/src/domain/blankProject.ts`
- Test: `apps/creator/tests/blankProject.test.ts`

**Interfaces:**
- Produces: `ProjectSnapshot`, `StoredDefinition`, `createBlankProject`, `makeUniqueDefinitionId`, `slugifyIdPart`.

- [ ] **Step 1: Write failing identity/factory tests**

```ts
it('stores premise only in the explicit creator extension', () => {
  const project = createBlankProject({ displayName: 'My First Game', premise: 'Family drama' });
  expect(project.manifest.project_id).toBe('project.my_first_game');
  expect(project.manifest.extensions?.['aigs.creator']).toEqual({ premise: 'Family drama', template_id: 'blank' });
  expect(validateProject(project).valid).toBe(true);
});

it('creates collision-safe IDs without renaming existing IDs', () => {
  expect(makeUniqueDefinitionId('character', 'Sarah', new Set(['character.sarah']))).toBe('character.sarah_2');
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/blankProject.test.ts
```

- [ ] **Step 3: Implement the pure project domain**

```ts
export type StoredDefinition = {
  collection: 'characters' | 'locations';
  document: Record<string, unknown> & {
    schema_id: string;
    id: string;
    display_name: string;
  };
};

export type ProjectSnapshot = {
  rootPath: string | null;
  manifest: ProjectManifest;
  definitions: StoredDefinition[];
  dirty: boolean;
};
```

Blank manifest:

```ts
{
  schema_id: 'aigs.project.manifest',
  schema_version: 1,
  project_id: `project.${slugifyIdPart(displayName)}`,
  display_name: displayName.trim(),
  project_format_version: 1,
  definition_roots: ['characters', 'locations'],
  extensions: { 'aigs.creator': { premise: premise.trim(), template_id: 'blank' } }
}
```

`makeUniqueDefinitionId(prefix, displayName, existingIds)` tries `<prefix>.<slug>`, then `_2`, `_3`, etc. IDs are assigned only when a new definition is committed into editor state; later name edits leave `id` untouched.

- [ ] **Step 4: Verify**

```bash
cd apps/creator
npm run test:run -- tests/blankProject.test.ts tests/validation.test.ts
npm run typecheck
```

- [ ] **Step 5: Commit**

```bash
git add apps/creator/src/domain apps/creator/tests/blankProject.test.ts
git commit -m "feat(creator): add project snapshot and stable IDs"
```

---

### Task 4: Implement constrained native create/open/save with atomic JSON replacement

**Files:**
- Create: `apps/creator/src-tauri/src/project_fs.rs`
- Modify: `apps/creator/src-tauri/src/lib.rs`, `Cargo.toml`, `Cargo.lock`
- Test: Rust unit tests inside `project_fs.rs`

**Interfaces:**
- Produces Tauri commands:
  - `create_project(parent_dir: String, folder_name: String, payload: ProjectPayload) -> Result<ProjectPayload, String>`
  - `open_project(project_dir: String) -> Result<ProjectPayload, String>`
  - `save_project(project_dir: String, payload: ProjectPayload) -> Result<ProjectPayload, String>`
- `ProjectPayload` contains manifest plus Slice 1 `characters`/`locations` definitions only.

- [ ] **Step 1: Write failing native safety tests**

```rust
#[test]
fn rejects_unsafe_folder_and_definition_ids() {
    assert!(safe_folder_name("../escape").is_err());
    assert!(definition_filename("../../escape").is_err());
    assert_eq!(definition_filename("character.alex").unwrap(), "character.alex.json");
}

#[test]
fn save_replaces_json_and_keeps_last_recovery_copy() {
    let temp = tempfile::tempdir().unwrap();
    let target = temp.path().join("project.json");
    atomic_write_json(&target, &json!({"version": 1})).unwrap();
    atomic_write_json(&target, &json!({"version": 2})).unwrap();
    let current: Value = serde_json::from_slice(&fs::read(&target).unwrap()).unwrap();
    assert_eq!(current["version"], 2);
    assert!(temp.path().join(".aigs-recovery/project.json.bak").exists());
}
```

Also test `create_project` refuses to merge into an existing non-empty target folder.

- [ ] **Step 2: Run and verify failure**

```bash
cd apps/creator/src-tauri
cargo test project_fs
```

- [ ] **Step 3: Implement safe persistence**

Only two collection names are accepted:

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum DefinitionCollection { Characters, Locations }
```

Definition filenames are derived from validated IDs, never supplied as arbitrary relative paths.

Write JSON to a sibling `.tmp`, flush with `sync_all`, then atomically replace. On Windows use `ReplaceFileW` when the target exists so replacement and the last backup are handled by the OS:

```rust
#[cfg(windows)]
fn replace_existing(target: &Path, temp: &Path, backup: &Path) -> io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    use windows_sys::Win32::Storage::FileSystem::ReplaceFileW;

    if backup.exists() { fs::remove_file(backup)?; }
    let wide = |p: &Path| p.as_os_str().encode_wide().chain(Some(0)).collect::<Vec<u16>>();
    let target_w = wide(target);
    let temp_w = wide(temp);
    let backup_w = wide(backup);
    let ok = unsafe {
        ReplaceFileW(target_w.as_ptr(), temp_w.as_ptr(), backup_w.as_ptr(), 0, std::ptr::null_mut(), std::ptr::null_mut())
    };
    if ok == 0 { Err(io::Error::last_os_error()) } else { Ok(()) }
}
```

For a new file use `fs::rename(temp, target)`. For non-Windows developer tests, copy the current target to backup then use same-filesystem rename. Put backups under `<project>/.aigs-recovery/<relative-file>.bak`.

`save_project` writes manifest and every in-memory Character/Location definition, then moves deleted canonical files into recovery rather than silently leaving stale definitions. It never scans outside `project.json`, `characters/*.json`, and `locations/*.json`.

Register only the three project commands with `generate_handler!`. Do not add Tauri filesystem plugin permissions.

- [ ] **Step 4: Verify native code**

```bash
cd apps/creator/src-tauri
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/creator/src-tauri
git commit -m "feat(creator): add safe local project persistence"
```

---

### Task 5: Add ProjectGateway, reducer, recent projects, and Save gating

**Files:**
- Create: `apps/creator/src/platform/ProjectGateway.ts`, `tauriProjectGateway.ts`
- Create: `apps/creator/src/state/projectReducer.ts`, `recentProjects.ts`
- Test: `apps/creator/tests/projectReducer.test.ts`, `recentProjects.test.ts`

**Interfaces:**

```ts
export interface ProjectGateway {
  chooseParentDirectory(): Promise<string | null>;
  chooseProjectDirectory(): Promise<string | null>;
  createProject(parentDir: string, folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot>;
  openProject(projectDir: string): Promise<ProjectSnapshot>;
  saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot>;
}
```

- [ ] **Step 1: Write failing state/history tests**

```ts
it('marks edits dirty and successful save clean', () => {
  const edited = reducer({ project, status: 'open' }, { type: 'manifestRenamed', displayName: 'Renamed' });
  expect(edited.project?.dirty).toBe(true);
  expect(reducer(edited, { type: 'projectSaved' }).project?.dirty).toBe(false);
});

it('keeps ten unique recent paths ordered newest first', () => {
  const result = addRecentProject(existing, { path: 'C:\\Games\\A', displayName: 'A', lastOpenedAt: 10 });
  expect(result[0].path).toBe('C:\\Games\\A');
  expect(new Set(result.map((x) => x.path)).size).toBe(result.length);
  expect(result.length).toBeLessThanOrEqual(10);
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/projectReducer.test.ts tests/recentProjects.test.ts
```

- [ ] **Step 3: Implement boundary/state**

`tauriProjectGateway.ts` is the only frontend module importing Tauri `invoke`/dialog APIs. `saveProject` first calls `validateProject(snapshot)`; invalid snapshots return a typed `ProjectValidationError` and never invoke native save.

Recent history stores only `{ path, displayName, lastOpenedAt }` in `localStorage`.

Reducer states are explicit: `home | loading | open | error`; operation errors do not discard an already-open project.

- [ ] **Step 4: Verify**

```bash
cd apps/creator
npm run test:run -- tests/projectReducer.test.ts tests/recentProjects.test.ts
npm run typecheck
```

- [ ] **Step 5: Commit**

```bash
git add apps/creator/src/platform apps/creator/src/state apps/creator/tests/projectReducer.test.ts apps/creator/tests/recentProjects.test.ts
git commit -m "feat(creator): add project gateway and editor state"
```

---

### Task 6: Build Home, New/Open flow, Creator shell, dashboard, and validation banner

**Files:**
- Create: `src/features/home/HomeScreen.tsx`, `NewProjectDialog.tsx`
- Create: `src/features/dashboard/ProjectDashboard.tsx`
- Create: `src/components/CreatorShell.tsx`, `ValidationBanner.tsx`
- Modify: `src/App.tsx`, `src/app.css`
- Test: `tests/HomeScreen.test.tsx`, `tests/CreatorShell.test.tsx`

**Interfaces:**
- Consumes: Task 3 project factory, Task 5 gateway/state, Task 2 validation.
- Produces: Home -> New/Open -> Dashboard; persistent sidebar; explicit Save; visible validation/saved status.

- [ ] **Step 1: Write failing UI flow tests with an in-memory ProjectGateway**

```tsx
it('creates a blank local project and opens dashboard', async () => {
  render(<App gateway={fakeGateway} />);
  await user.click(screen.getByRole('button', { name: 'New Project' }));
  await user.type(screen.getByLabelText('Project name'), 'First Game');
  await user.type(screen.getByLabelText('Premise'), 'A family drama');
  await user.click(screen.getByRole('button', { name: 'Create Project' }));
  expect(await screen.findByRole('heading', { name: 'First Game' })).toBeInTheDocument();
  expect(screen.getByText('Validation: Valid')).toBeInTheDocument();
});

it('does not expose nonfunctional Play or Copilot actions', () => {
  renderOpenCreator();
  expect(screen.queryByRole('button', { name: 'Play' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Copilot' })).toBeDisabled();
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/HomeScreen.test.tsx tests/CreatorShell.test.tsx
```

- [ ] **Step 3: Implement Creator lifecycle UI**

New Project has exactly `Project name` and `Premise`; template ID is `blank` internally. Do not create fake Snowed In data in this slice.

Shell:

```text
Top: AI Game Studio | project name | Save
Sidebar: Dashboard / Characters / Locations / disabled Dialogue / Events / Assets / Copilot / Debug
Main: active workspace
Status: Validation | Saved/Unsaved | Runtime: Not included in Creator Foundation
```

Dashboard shows name, premise, Character count, Location count, validation state, and a clear `Playtest arrives in Slice 2` note.

Save is disabled while a save request is running; validation failure leaves editing enabled and lists path/code/message without writing to disk.

- [ ] **Step 4: Verify**

```bash
cd apps/creator
npm run test:run -- tests/HomeScreen.test.tsx tests/CreatorShell.test.tsx
npm run typecheck
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add apps/creator/src apps/creator/tests/HomeScreen.test.tsx apps/creator/tests/CreatorShell.test.tsx
git commit -m "feat(creator): add local project lifecycle UI"
```

---

### Task 7: Implement schema-backed Character editor

**Files:**
- Create: `apps/creator/src/domain/characterFactory.ts`
- Create: `apps/creator/src/features/characters/CharacterEditor.tsx`
- Test: `apps/creator/tests/CharacterEditor.test.tsx`
- Modify: `apps/creator/src/App.tsx`, `state/projectReducer.ts`

**Interfaces:**
- Produces in-memory Character CRUD; persistence occurs only through whole-project Save.

- [ ] **Step 1: Write failing Character tests**

```tsx
it('creates a valid collision-safe character and preserves ID after rename', async () => {
  renderCharactersWithExisting(['character.sarah']);
  await user.click(screen.getByRole('button', { name: 'New Character' }));
  await user.type(screen.getByLabelText('Name'), 'Sarah');
  await user.click(screen.getByRole('button', { name: 'Add Character' }));
  expect(currentCharacter.id).toBe('character.sarah_2');

  await user.clear(screen.getByLabelText('Name'));
  await user.type(screen.getByLabelText('Name'), 'Sarah Morgan');
  expect(currentCharacter.id).toBe('character.sarah_2');
  expect(validateDocument('aigs.character.definition', currentCharacter).valid).toBe(true);
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/CharacterEditor.test.tsx
```

- [ ] **Step 3: Implement only fields the current canonical schema supports**

Factory:

```ts
{
  schema_id: 'aigs.character.definition',
  schema_version: 1,
  id: makeUniqueDefinitionId('character', displayName, existingIds),
  kind: 'character',
  display_name: displayName.trim(),
  persona: {
    summary: '', background: '', personality: [],
    speech: { register: '', notes: '' },
    values: [], fears: [], desires: [], secrets: []
  }
}
```

Expose display name, description, persona summary/background, personality, speech register/notes, values, fears, desires, secrets. Multiline list inputs trim, drop empty lines, and de-duplicate entries before storing.

Do not add age, voice, appearance, relationships, goals, or provider settings before their canonical contracts are deliberately designed.

Delete removes the Character from in-memory state only. `validateProject` blocks Save when another definition still references its ID.

- [ ] **Step 4: Verify**

```bash
cd apps/creator
npm run test:run -- tests/CharacterEditor.test.tsx tests/validation.test.ts tests/projectReducer.test.ts
npm run typecheck
```

- [ ] **Step 5: Commit**

```bash
git add apps/creator/src/domain/characterFactory.ts apps/creator/src/features/characters apps/creator/src/App.tsx apps/creator/src/state/projectReducer.ts apps/creator/tests/CharacterEditor.test.tsx
git commit -m "feat(creator): add schema-backed character editor"
```

---

### Task 8: Implement schema-backed logical Location editor

**Files:**
- Create: `apps/creator/src/domain/locationFactory.ts`
- Create: `apps/creator/src/features/locations/LocationEditor.tsx`
- Test: `apps/creator/tests/LocationEditor.test.tsx`
- Modify: `apps/creator/src/App.tsx`, `state/projectReducer.ts`

**Interfaces:**
- Produces in-memory Location CRUD and DefinitionRef objects `{ ref: locationId }`.

- [ ] **Step 1: Write failing Location tests**

```tsx
it('creates a logical location and stores child locations as DefinitionRefs', async () => {
  renderLocationsWith(['location.hall']);
  await user.click(screen.getByRole('button', { name: 'New Location' }));
  await user.type(screen.getByLabelText('Name'), 'Kitchen');
  await user.selectOptions(screen.getByLabelText('Child locations'), ['location.hall']);
  await user.click(screen.getByRole('button', { name: 'Add Location' }));

  expect(currentLocation.child_location_refs).toEqual([{ ref: 'location.hall' }]);
  expect(currentLocation).not.toHaveProperty('x');
  expect(validateDocument('aigs.location.definition', currentLocation).valid).toBe(true);
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/LocationEditor.test.tsx
```

- [ ] **Step 3: Implement the minimum VN logical-location model**

```ts
{
  schema_id: 'aigs.location.definition',
  schema_version: 1,
  id: makeUniqueDefinitionId('location', displayName, existingIds),
  kind: 'location',
  display_name: displayName.trim(),
  description: '',
  tags: [],
  child_location_refs: []
}
```

Expose name, description, schema-valid lowercase tags, and child-location multi-select. Selection maps IDs to `{ ref: id }`. Prevent direct self-child selection in UI; semantic validation remains the authority for existence.

Do not expose tilemaps, coordinates, pathfinding, walking animation, background generation, environment simulation, or runtime navigation.

Deletion is in-memory; Save is blocked if refs become invalid.

- [ ] **Step 4: Verify full frontend suite**

```bash
cd apps/creator
npm run test:run
npm run typecheck
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add apps/creator/src/domain/locationFactory.ts apps/creator/src/features/locations apps/creator/src/App.tsx apps/creator/src/state/projectReducer.ts apps/creator/tests/LocationEditor.test.tsx
git commit -m "feat(creator): add schema-backed location editor"
```

---

### Task 9: Add CI, Windows smoke ZIP, docs, and final Slice 1 verification

**Files:**
- Create: `.github/workflows/creator-validation.yml`
- Create: `apps/creator/README.md`
- Modify: `apps/creator/package.json`, root `README.md`, `CHANGELOG.md`, `docs/CURRENT_STATE.md`, `AGENTS.md`

**Interfaces:**
- Produces: green frontend/Rust/schema CI and artifact `AI-Game-Studio-Creator-Foundation-windows-x64.zip`.

- [ ] **Step 1: Establish the failing aggregate verification command**

```bash
cd apps/creator
npm run verify
```

Expected before script addition: npm reports missing script `verify`.

Final script:

```json
{
  "scripts": {
    "verify": "npm run schemas:check && npm run test:run && npm run typecheck && npm run build"
  }
}
```

- [ ] **Step 2: Add two-job CI and Windows artifact packaging**

```yaml
name: Creator Validation
on:
  pull_request:
  push:
    branches: [main]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24.19.0
          cache: npm
          cache-dependency-path: apps/creator/package-lock.json
      - run: npm ci
        working-directory: apps/creator
      - run: npm run verify
        working-directory: apps/creator

  windows-native:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24.19.0
          cache: npm
          cache-dependency-path: apps/creator/package-lock.json
      - uses: dtolnay/rust-toolchain@stable
        with:
          toolchain: 1.97.1
      - run: npm ci
        working-directory: apps/creator
      - run: cargo test --manifest-path apps/creator/src-tauri/Cargo.toml
      - run: cargo clippy --manifest-path apps/creator/src-tauri/Cargo.toml --all-targets --all-features -- -D warnings
      - run: npm run tauri -- build --no-bundle
        working-directory: apps/creator
      - shell: pwsh
        run: |
          New-Item -ItemType Directory -Force dist/creator-foundation | Out-Null
          Copy-Item apps/creator/src-tauri/target/release/ai-game-studio-creator.exe "dist/creator-foundation/AI Game Studio.exe"
          Copy-Item apps/creator/README.md dist/creator-foundation/README.md
          Compress-Archive -Path dist/creator-foundation/* -DestinationPath dist/AI-Game-Studio-Creator-Foundation-windows-x64.zip
      - uses: actions/upload-artifact@v4
        with:
          name: AI-Game-Studio-Creator-Foundation-windows-x64
          path: dist/AI-Game-Studio-Creator-Foundation-windows-x64.zip
          if-no-files-found: error
```

This slice uses the standard WebView2 platform runtime on supported Windows 10/11. Do not add installer/updater/fixed-runtime distribution until target-machine smoke testing demonstrates a need; final v0.1 packaging revisits the combined Creator + Godot payload.

- [ ] **Step 3: Update durable documentation without overstating completeness**

`apps/creator/README.md` includes exact commands:

```text
npm ci
npm run verify
npm run tauri -- dev
cargo test --manifest-path src-tauri/Cargo.toml
npm run tauri -- build --no-bundle
```

Document current supported flow: local blank project create/open/save/reopen, schema validation, Character edit, Location edit. Explicitly list absent features: Godot runtime/playtest, Copilot, AI image generation, Inworld TTS, game export.

Update `AGENTS.md` to recognize `docs/superpowers/specs/` and `docs/superpowers/plans/` as active spec/plan locations. Update `docs/CURRENT_STATE.md` with exact branch/commit, test evidence, known limitations, and next three tasks. Update root README and Unreleased changelog.

- [ ] **Step 4: Run full verification and require real Windows launch evidence**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
cd apps/creator
npm ci
npm run verify
cd src-tauri
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

Then require GitHub Actions green on the exact final commit, download the produced ZIP, confirm it is non-empty, extract on a Windows runner/machine, and launch `AI Game Studio.exe` far enough to display the Home screen. Build success alone is not launch verification.

- [ ] **Step 5: Commit and open a focused PR**

```bash
git add .github/workflows/creator-validation.yml apps/creator README.md CHANGELOG.md docs/CURRENT_STATE.md AGENTS.md
git commit -m "ci(creator): package Windows Creator Foundation"
```

PR body records architecture impact (ADR-0013), exact verification commands/run IDs, Windows artifact, known limitations, and next slice. Do not merge without explicit user integration approval.

---

## Plan Self-Review

### Slice 1 spec coverage

- Windows Creator shell: Task 1.
- Tauri/React + constrained native boundary: Tasks 1 and 4, ADR-0013.
- Canonical schemas + cross-reference validation: Task 2.
- Local blank project and stable IDs: Task 3.
- Atomic/recoverable local persistence: Task 4.
- New/Open/Save/Recent workflow and validation gating: Tasks 5-6.
- Semantic-token UI foundation: Tasks 1 and 6.
- Basic Character editing: Task 7.
- Basic logical Location editing: Task 8.
- Downloadable Windows smoke artifact and durable handoff: Task 9.

### Deliberately deferred

Godot runtime/playtest, runtime bridge transport, VN presentation, systemic simulation, NPC autonomy, Copilot/ChangeSets UI, Asset Studio/image generation, Inworld `inworld-tts-1.5-mini`, alternate themes, and game export each belong to later slice plans.

### Consistency checks

- `ProjectSnapshot` is the single in-memory project unit after Task 3.
- Editors mutate in-memory definitions; only `ProjectGateway.saveProject` persists, after `validateProject` succeeds.
- DefinitionRefs are objects `{ ref: id }`, matching the canonical schema.
- New definition IDs are collision-safe and immutable after assignment.
- Rust accepts only manifest plus `characters`/`locations` collections; it never accepts arbitrary project-relative paths from the webview.
- Per-file native replacement is atomic and recovery-backed; the plan does not falsely claim an all-files transaction.
- No Task 1 deliverable pretends to include runtime, AI, assets, voice, or export.
