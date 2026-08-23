# Creator Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Slice 1 of AI Game Studio: a Windows-only Tauri/React Creator App that can create, open, validate, edit, save, close, and reopen schema-backed local projects, including basic Character and Location editing, and produce a downloadable Windows smoke-build artifact.

**Architecture:** The Creator App lives under `apps/creator` and uses React/TypeScript for creator UI plus a constrained Tauri/Rust native boundary for dialogs and local project persistence. Canonical JSON schemas under repository `schemas/` remain the authority; a generated TypeScript catalog feeds Ajv Draft 2020-12 validation without duplicating schema ownership. No Godot runtime, Copilot, image generation, TTS, or standalone game export is implemented in this slice.

**Tech Stack:** Windows 10/11 x64; Tauri 2.11.x; Rust 1.97.1; React 19.2.7; TypeScript 6.0.x; Vite 8.1.x; Vitest 4.1.x; React Testing Library 16.3.2; Ajv 8.20.0; npm on Node.js 24 LTS; existing Python 3.12/jsonschema validation remains unchanged.

**Spec:** `docs/superpowers/specs/2026-08-23-creator-mvp-design.md`

## Global Constraints

- Target Windows 10/11 x64 only for v0.1; Slice 1 must produce a Windows x64 smoke package.
- Projects are ordinary local user-owned folders; no cloud, account, or remote project storage.
- Creator App is Tauri + React + TypeScript; Godot is a separate future runtime process per ADR-0013.
- Canonical project data remains strict UTF-8 JSON validated by JSON Schema Draft 2020-12 with stable `urn:aigs:` schema IDs.
- Project Definitions and Runtime State remain separate; Slice 1 edits definitions only.
- Persistent definition IDs are immutable human-readable namespaced IDs; display-name edits never rename IDs.
- Core project JSON cannot contain credentials.
- The webview receives no unrestricted filesystem capability. Native commands operate only on explicit project lifecycle operations and validate relative paths/definition IDs before touching disk.
- AI integrations, runtime simulation, Godot playtest, TTS, image generation, and game export are out of scope for this plan.
- Use test-driven development. Every task ends with a runnable test/verification cycle and a focused commit.
- Keep current Python schema tests green throughout: `python -m unittest discover -s tests -p 'test_*.py' -v` and `python tools/schema_validation/validate_fixtures.py`.
- Use one semantic CSS token layer from the first UI commit so later themes do not require rewriting components; Slice 1 ships one default theme only.
- Toolchain versions are pinned by committed lockfiles/toolchain files; do not use floating `latest` in CI.

---

## File Structure Map

The slice establishes this structure before feature work grows:

```text
apps/creator/
├── package.json                     # Creator frontend scripts/dependencies
├── package-lock.json                # Exact npm dependency lock
├── tsconfig.json                    # Strict TypeScript config
├── vite.config.ts                   # Vite/Vitest config
├── index.html
├── scripts/
│   └── generate-schema-catalog.mjs # Generates TS catalog from canonical registry
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── app.css
│   ├── generated/
│   │   └── schemaCatalog.ts         # Generated, committed, CI drift-checked
│   ├── domain/
│   │   ├── ids.ts                   # Stable project/definition ID helpers
│   │   ├── projectTypes.ts          # Creator-side typed subset + snapshot contracts
│   │   ├── blankProject.ts          # Pure blank-project factory
│   │   └── validation.ts            # Ajv catalog and normalized validation errors
│   ├── platform/
│   │   ├── ProjectGateway.ts        # UI-independent persistence interface
│   │   └── tauriProjectGateway.ts   # invoke/dialog adapter only
│   ├── state/
│   │   ├── projectReducer.ts        # Open-project/editor state
│   │   └── recentProjects.ts        # Small local recent-project list
│   ├── components/
│   │   ├── CreatorShell.tsx         # Sidebar/workspace/status layout
│   │   ├── ValidationBanner.tsx
│   │   └── EmptyWorkspace.tsx
│   └── features/
│       ├── home/
│       │   ├── HomeScreen.tsx
│       │   └── NewProjectDialog.tsx
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
│       └── project_fs.rs            # Safe project filesystem commands + atomic writes
└── tests/
    ├── setup.ts
    ├── validation.test.ts
    ├── blankProject.test.ts
    ├── projectReducer.test.ts
    ├── HomeScreen.test.tsx
    ├── CreatorShell.test.tsx
    ├── CharacterEditor.test.tsx
    └── LocationEditor.test.tsx

.github/workflows/
├── schema-validation.yml            # Existing; unchanged except verification
└── creator-validation.yml           # New JS/Rust/Windows build CI

docs/DECISIONS/
└── ADR-0013-creator-shell-and-runtime-process-boundary.md
```

The Rust boundary owns filesystem safety and atomic writes. The React layer owns editing/validation/UI state. `ProjectGateway` keeps UI tests independent of Tauri and makes later runtime/Copilot integration possible without coupling editor components to native APIs.

---

### Task 1: Scaffold the Creator App and deterministic toolchain

**Files:**
- Create: `apps/creator/package.json`
- Create: `apps/creator/package-lock.json`
- Create: `apps/creator/tsconfig.json`
- Create: `apps/creator/vite.config.ts`
- Create: `apps/creator/index.html`
- Create: `apps/creator/src/main.tsx`
- Create: `apps/creator/src/App.tsx`
- Create: `apps/creator/src/app.css`
- Create: `apps/creator/tests/setup.ts`
- Create: `apps/creator/src-tauri/Cargo.toml`
- Create: `apps/creator/src-tauri/Cargo.lock`
- Create: `apps/creator/src-tauri/rust-toolchain.toml`
- Create: `apps/creator/src-tauri/build.rs`
- Create: `apps/creator/src-tauri/src/main.rs`
- Create: `apps/creator/src-tauri/src/lib.rs`
- Create: `apps/creator/src-tauri/tauri.conf.json`
- Create: `apps/creator/src-tauri/capabilities/default.json`
- Test: `apps/creator/src/App.test.tsx`

**Interfaces:**
- Consumes: no new application interfaces.
- Produces: `App` React root, Tauri desktop binary named `ai-game-studio-creator`, npm scripts `dev`, `test`, `typecheck`, `build`, `tauri`, and a pinned Rust toolchain.

- [ ] **Step 1: Add the failing shell test**

```tsx
// apps/creator/src/App.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the creator product identity', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'AI Game Studio' })).toBeInTheDocument();
    expect(screen.getByText('Create or open a local project')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Create the pinned frontend test/build scaffold and prove the test fails before `App` exists**

Use Node.js 24 LTS and install exact current-compatible packages rather than a floating generator:

```bash
cd apps/creator
npm install --save-exact react@19.2.7 react-dom@19.2.7 @tauri-apps/api@2.11.1 @tauri-apps/plugin-dialog@2.7.2 ajv@8.20.0 ajv-formats@3.0.1
npm install --save-dev --save-exact @tauri-apps/cli@2.11.4 @vitejs/plugin-react@6.0.5 vite@8.1.0 typescript@6.0.3 vitest@4.1.0 jsdom@26.1.0 @testing-library/react@16.3.2 @testing-library/dom@10.4.1 @testing-library/jest-dom@6.8.0 @types/react@19.2.12 @types/react-dom@19.2.3
npm test -- --run src/App.test.tsx
```

Expected before implementation: FAIL because `./App` or the expected UI does not exist.

`package.json` scripts must be explicit:

```json
{
  "scripts": {
    "dev": "vite",
    "test": "vitest",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit",
    "build": "tsc --noEmit && vite build",
    "tauri": "tauri"
  }
}
```

- [ ] **Step 3: Implement the minimum React/Vite/Tauri shell**

`App.tsx` starts deliberately small:

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

Create semantic CSS tokens immediately rather than component-specific colors:

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

Pin Rust in `rust-toolchain.toml`:

```toml
[toolchain]
channel = "1.97.1"
profile = "minimal"
components = ["rustfmt", "clippy"]
```

Register only the dialog plugin initially; do not grant broad filesystem plugin access:

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running AI Game Studio Creator");
}
```

- [ ] **Step 4: Run frontend and native baseline verification**

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

Expected: all commands PASS.

- [ ] **Step 5: Commit the scaffold**

```bash
git add apps/creator
git commit -m "feat(creator): scaffold Tauri React desktop shell"
```

---

### Task 2: Generate and validate against the canonical schema registry

**Files:**
- Create: `apps/creator/scripts/generate-schema-catalog.mjs`
- Create: `apps/creator/src/generated/schemaCatalog.ts`
- Create: `apps/creator/src/domain/validation.ts`
- Test: `apps/creator/tests/validation.test.ts`
- Modify: `apps/creator/package.json`
- Modify: `apps/creator/vite.config.ts`

**Interfaces:**
- Consumes: repository `schemas/registry.json` and every path listed by it.
- Produces: `validateDocument(schemaId: string, value: unknown): ValidationResult` and generated `schemaCatalog` keyed by canonical `schema_id`/URN.

- [ ] **Step 1: Write failing validation tests**

```ts
// apps/creator/tests/validation.test.ts
import { describe, expect, it } from 'vitest';
import { validateDocument } from '../src/domain/validation';

describe('validateDocument', () => {
  it('accepts a valid project manifest', () => {
    const result = validateDocument('aigs.project.manifest', {
      schema_id: 'aigs.project.manifest',
      schema_version: 1,
      project_id: 'project.snowed_in',
      display_name: 'Snowed In',
      project_format_version: 1,
      definition_roots: ['characters', 'locations']
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('rejects unknown manifest properties because core schemas are strict', () => {
    const result = validateDocument('aigs.project.manifest', {
      schema_id: 'aigs.project.manifest',
      schema_version: 1,
      project_id: 'project.test',
      display_name: 'Test',
      project_format_version: 1,
      definition_roots: ['characters'],
      api_key: 'must-not-be-here'
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.keyword === 'additionalProperties')).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
cd apps/creator
npm run test:run -- tests/validation.test.ts
```

Expected: FAIL because `validation.ts`/catalog do not exist.

- [ ] **Step 3: Implement deterministic schema catalog generation and Ajv 2020 validation**

The generator reads only canonical registry paths, serializes schemas into a committed TypeScript module, and sorts entries by schema ID so output is stable:

```js
// scripts/generate-schema-catalog.mjs (core shape)
const registry = JSON.parse(await readFile(registryPath, 'utf8'));
const entries = await Promise.all(registry.schemas.map(async (entry) => ({
  schemaId: entry.schema_id,
  urn: entry.urn,
  schema: JSON.parse(await readFile(resolve(repoRoot, entry.path), 'utf8'))
})));
entries.sort((a, b) => a.schemaId.localeCompare(b.schemaId));
await writeFile(outputPath, `export const schemaCatalog = ${JSON.stringify(entries, null, 2)} as const;\n`);
```

`validation.ts` must register every schema before compilation so local URN refs resolve offline:

```ts
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { schemaCatalog } from '../generated/schemaCatalog';

export type ValidationIssue = {
  instancePath: string;
  keyword: string;
  message: string;
};

export type ValidationResult =
  | { valid: true; errors: [] }
  | { valid: false; errors: ValidationIssue[] };

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
for (const entry of schemaCatalog) ajv.addSchema(entry.schema, entry.urn);

const urnBySchemaId = new Map(schemaCatalog.map((entry) => [entry.schemaId, entry.urn]));

export function validateDocument(schemaId: string, value: unknown): ValidationResult {
  const urn = urnBySchemaId.get(schemaId);
  if (!urn) return { valid: false, errors: [{ instancePath: '', keyword: 'schema_id', message: `Unknown schema: ${schemaId}` }] };
  const validator = ajv.getSchema(urn);
  if (!validator) throw new Error(`Schema catalog registration failed: ${urn}`);
  if (validator(value)) return { valid: true, errors: [] };
  return {
    valid: false,
    errors: (validator.errors ?? []).map((error) => ({
      instancePath: error.instancePath,
      keyword: error.keyword,
      message: error.message ?? 'Validation failed'
    }))
  };
}
```

Add scripts:

```json
{
  "scripts": {
    "schemas:generate": "node scripts/generate-schema-catalog.mjs",
    "schemas:check": "node scripts/generate-schema-catalog.mjs && git diff --exit-code -- src/generated/schemaCatalog.ts",
    "predev": "npm run schemas:generate",
    "pretest:run": "npm run schemas:generate",
    "prebuild": "npm run schemas:generate"
  }
}
```

- [ ] **Step 4: Verify generated-schema parity and existing Python validation**

```bash
cd apps/creator
npm run schemas:generate
npm run test:run -- tests/validation.test.ts
npm run typecheck
cd ../..
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/schema_validation/validate_fixtures.py
```

Expected: all PASS; generated catalog contains `aigs.project.manifest`, `aigs.character.definition`, and `aigs.location.definition` and resolves their `urn:aigs:` refs offline.

- [ ] **Step 5: Commit schema integration**

```bash
git add apps/creator/scripts apps/creator/src/generated apps/creator/src/domain/validation.ts apps/creator/tests/validation.test.ts apps/creator/package.json apps/creator/package-lock.json apps/creator/vite.config.ts
git commit -m "feat(creator): validate canonical project schemas"
```

---

### Task 3: Define the Creator project snapshot and blank-project factory

**Files:**
- Create: `apps/creator/src/domain/ids.ts`
- Create: `apps/creator/src/domain/projectTypes.ts`
- Create: `apps/creator/src/domain/blankProject.ts`
- Test: `apps/creator/tests/blankProject.test.ts`

**Interfaces:**
- Consumes: `validateDocument` from Task 2.
- Produces: `createBlankProject(input: NewProjectInput): ProjectSnapshot`, `slugifyIdPart(value: string): string`, immutable manifest/definition IDs, and creator metadata stored only under `extensions['aigs.creator']`.

- [ ] **Step 1: Write failing factory/identity tests**

```ts
import { describe, expect, it } from 'vitest';
import { createBlankProject } from '../src/domain/blankProject';
import { validateDocument } from '../src/domain/validation';

describe('createBlankProject', () => {
  it('creates a canonical manifest without placing premise in a strict core field', () => {
    const project = createBlankProject({ displayName: 'My First Game', premise: 'A tense family drama.' });
    expect(project.manifest.project_id).toBe('project.my_first_game');
    expect(project.manifest.extensions?.['aigs.creator']).toEqual({
      premise: 'A tense family drama.',
      template_id: 'blank'
    });
    expect(validateDocument('aigs.project.manifest', project.manifest).valid).toBe(true);
  });

  it('does not change an existing definition ID when its display name changes', () => {
    const project = createBlankProject({ displayName: 'Original', premise: '' });
    const originalId = project.manifest.project_id;
    project.manifest.display_name = 'Renamed';
    expect(project.manifest.project_id).toBe(originalId);
  });
});
```

- [ ] **Step 2: Run the tests to verify failure**

```bash
cd apps/creator
npm run test:run -- tests/blankProject.test.ts
```

Expected: FAIL because factory/types do not exist.

- [ ] **Step 3: Implement the pure domain factory**

Use a small typed subset; canonical JSON validation remains the authority:

```ts
export type ProjectManifest = {
  schema_id: 'aigs.project.manifest';
  schema_version: 1;
  project_id: string;
  display_name: string;
  project_format_version: 1;
  definition_roots: string[];
  extensions?: Record<string, Record<string, unknown>>;
};

export type StoredDefinition = {
  collection: 'characters' | 'locations';
  document: Record<string, unknown> & { schema_id: string; id: string; display_name: string };
};

export type ProjectSnapshot = {
  rootPath: string | null;
  manifest: ProjectManifest;
  definitions: StoredDefinition[];
  dirty: boolean;
};
```

Factory output:

```ts
return {
  rootPath: null,
  manifest: {
    schema_id: 'aigs.project.manifest',
    schema_version: 1,
    project_id: `project.${slugifyIdPart(input.displayName)}`,
    display_name: input.displayName.trim(),
    project_format_version: 1,
    definition_roots: ['characters', 'locations'],
    extensions: {
      'aigs.creator': { premise: input.premise.trim(), template_id: 'blank' }
    }
  },
  definitions: [],
  dirty: true
};
```

`slugifyIdPart` must normalize to lowercase ASCII `[a-z0-9_-]`, collapse separators, trim them, and fall back to `untitled`.

- [ ] **Step 4: Run unit/type/schema tests**

```bash
cd apps/creator
npm run test:run -- tests/blankProject.test.ts tests/validation.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit the project domain**

```bash
git add apps/creator/src/domain apps/creator/tests/blankProject.test.ts
git commit -m "feat(creator): add blank project domain model"
```

---

### Task 4: Implement constrained native project persistence with atomic writes

**Files:**
- Create: `apps/creator/src-tauri/src/project_fs.rs`
- Modify: `apps/creator/src-tauri/src/lib.rs`
- Modify: `apps/creator/src-tauri/Cargo.toml`
- Test: Rust unit tests colocated in `project_fs.rs`

**Interfaces:**
- Consumes: JSON values already schema-validated by the Creator layer.
- Produces Tauri commands:
  - `create_project(parent_dir: String, folder_name: String, manifest: serde_json::Value) -> Result<ProjectPayload, String>`
  - `open_project(project_dir: String) -> Result<ProjectPayload, String>`
  - `save_manifest(project_dir: String, manifest: serde_json::Value) -> Result<(), String>`
  - `save_definition(project_dir: String, collection: DefinitionCollection, document: serde_json::Value) -> Result<(), String>`
  - `delete_definition(project_dir: String, collection: DefinitionCollection, definition_id: String) -> Result<(), String>`

- [ ] **Step 1: Write failing Rust tests for path safety and atomic persistence**

```rust
#[test]
fn definition_filename_rejects_path_traversal() {
    assert!(definition_filename("../../escape").is_err());
    assert!(definition_filename("character.alex").is_ok());
}

#[test]
fn atomic_write_replaces_json_and_keeps_recovery_copy() {
    let temp = tempfile::tempdir().unwrap();
    let target = temp.path().join("project.json");
    atomic_write_json(&target, &json!({"version": 1}), true).unwrap();
    atomic_write_json(&target, &json!({"version": 2}), true).unwrap();
    let current: Value = serde_json::from_slice(&fs::read(&target).unwrap()).unwrap();
    assert_eq!(current["version"], 2);
    assert!(temp.path().join(".aigs-recovery/project.json.bak").exists());
}
```

Add `tempfile` as a dev dependency only.

- [ ] **Step 2: Run Rust tests and confirm they fail**

```bash
cd apps/creator/src-tauri
cargo test project_fs
```

Expected: FAIL because helpers are not implemented.

- [ ] **Step 3: Implement safe project commands**

Rules enforced natively:

```rust
#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")]
enum DefinitionCollection {
    Characters,
    Locations,
}

impl DefinitionCollection {
    fn directory(&self) -> &'static str {
        match self {
            Self::Characters => "characters",
            Self::Locations => "locations",
        }
    }
}

fn definition_filename(id: &str) -> Result<String, String> {
    let valid = !id.is_empty()
        && id.contains('.')
        && id.chars().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || matches!(c, '.' | '_' | '-'));
    if !valid { return Err("Invalid definition id".into()); }
    Ok(format!("{id}.json"))
}
```

`atomic_write_json` must:

1. create the parent directory;
2. serialize pretty UTF-8 JSON with trailing newline;
3. write `<name>.tmp` in the same directory;
4. flush/sync the temp file;
5. if replacing an existing canonical file and recovery is requested, copy previous content to `.aigs-recovery/<name>.bak`;
6. rename temp to target, using a Windows-safe replace strategy rather than writing in-place;
7. remove temp on failure.

`open_project` reads only `project.json`, `characters/*.json`, and `locations/*.json` in Slice 1. It rejects a selected folder without `project.json`; it never recursively executes or imports files from the project.

Register only these commands:

```rust
.invoke_handler(tauri::generate_handler![
    project_fs::create_project,
    project_fs::open_project,
    project_fs::save_manifest,
    project_fs::save_definition,
    project_fs::delete_definition,
])
```

- [ ] **Step 4: Verify Rust behavior and lint**

```bash
cd apps/creator/src-tauri
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

Expected: PASS, including traversal and recovery tests.

- [ ] **Step 5: Commit native persistence**

```bash
git add apps/creator/src-tauri
git commit -m "feat(creator): add safe local project persistence"
```

---

### Task 5: Add the ProjectGateway boundary, project reducer, and recent-project history

**Files:**
- Create: `apps/creator/src/platform/ProjectGateway.ts`
- Create: `apps/creator/src/platform/tauriProjectGateway.ts`
- Create: `apps/creator/src/state/projectReducer.ts`
- Create: `apps/creator/src/state/recentProjects.ts`
- Test: `apps/creator/tests/projectReducer.test.ts`
- Test: `apps/creator/tests/recentProjects.test.ts`

**Interfaces:**
- Consumes: Task 3 `ProjectSnapshot`; Task 4 native command names.
- Produces:

```ts
export interface ProjectGateway {
  chooseParentDirectory(): Promise<string | null>;
  chooseProjectDirectory(): Promise<string | null>;
  createProject(parentDir: string, folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot>;
  openProject(projectDir: string): Promise<ProjectSnapshot>;
  saveManifest(snapshot: ProjectSnapshot): Promise<void>;
  saveDefinition(rootPath: string, definition: StoredDefinition): Promise<void>;
  deleteDefinition(rootPath: string, definition: StoredDefinition): Promise<void>;
}
```

- [ ] **Step 1: Write failing state tests**

```ts
it('marks edits dirty and successful save clean', () => {
  const opened = reducer(initialState, { type: 'projectOpened', project });
  const edited = reducer(opened, { type: 'manifestChanged', displayName: 'Renamed' });
  expect(edited.project?.dirty).toBe(true);
  const saved = reducer(edited, { type: 'projectSaved' });
  expect(saved.project?.dirty).toBe(false);
});

it('keeps at most ten unique recent project paths', () => {
  const result = addRecentProject(existing, { path: 'C:\\Games\\A', displayName: 'A' });
  expect(new Set(result.map((item) => item.path)).size).toBe(result.length);
  expect(result.length).toBeLessThanOrEqual(10);
});
```

- [ ] **Step 2: Run tests and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/projectReducer.test.ts tests/recentProjects.test.ts
```

Expected: FAIL because state modules do not exist.

- [ ] **Step 3: Implement state and adapter**

`tauriProjectGateway.ts` is the only frontend file allowed to import Tauri `invoke` and `dialog` APIs for project lifecycle:

```ts
const payload = await invoke<NativeProjectPayload>('open_project', { projectDir });
return fromNativePayload(payload);
```

The reducer must represent `home | loading | open | error` lifecycle explicitly and never drop an existing open project because an unrelated operation failed.

Recent-project history uses `localStorage` only for `{ path, displayName, lastOpenedAt }`; it stores no project content or credentials.

- [ ] **Step 4: Run frontend tests/typecheck**

```bash
cd apps/creator
npm run test:run -- tests/projectReducer.test.ts tests/recentProjects.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit the application boundary**

```bash
git add apps/creator/src/platform apps/creator/src/state apps/creator/tests/projectReducer.test.ts apps/creator/tests/recentProjects.test.ts
git commit -m "feat(creator): add project gateway and editor state"
```

---

### Task 6: Build Home, New/Open Project, persistent Creator shell, dashboard, and validation status

**Files:**
- Create: `apps/creator/src/features/home/HomeScreen.tsx`
- Create: `apps/creator/src/features/home/NewProjectDialog.tsx`
- Create: `apps/creator/src/features/dashboard/ProjectDashboard.tsx`
- Create: `apps/creator/src/components/CreatorShell.tsx`
- Create: `apps/creator/src/components/ValidationBanner.tsx`
- Create: `apps/creator/src/components/EmptyWorkspace.tsx`
- Modify: `apps/creator/src/App.tsx`
- Modify: `apps/creator/src/app.css`
- Test: `apps/creator/tests/HomeScreen.test.tsx`
- Test: `apps/creator/tests/CreatorShell.test.tsx`

**Interfaces:**
- Consumes: `ProjectGateway`, project reducer, recent-project helpers, `createBlankProject`, `validateDocument`.
- Produces: end-to-end creator flow Home -> New/Open -> Dashboard with persistent sidebar and status bar.

- [ ] **Step 1: Write failing Home/Shell behavior tests using an in-memory gateway**

```tsx
it('creates a blank project and opens its dashboard', async () => {
  const gateway = createFakeGateway();
  render(<App gateway={gateway} />);
  await user.click(screen.getByRole('button', { name: 'New Project' }));
  await user.type(screen.getByLabelText('Project name'), 'First Game');
  await user.type(screen.getByLabelText('Premise'), 'A small family drama');
  await user.click(screen.getByRole('button', { name: 'Create Project' }));
  expect(await screen.findByRole('heading', { name: 'First Game' })).toBeInTheDocument();
  expect(screen.getByText('Validation: Valid')).toBeInTheDocument();
});

it('shows future workspaces without pretending they are implemented', () => {
  render(<CreatorShell project={project} workspace="dashboard" onWorkspaceChange={() => {}} />);
  expect(screen.getByRole('button', { name: 'Characters' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Locations' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Dialogue' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Copilot' })).toBeDisabled();
});
```

- [ ] **Step 2: Run tests to verify failure**

```bash
cd apps/creator
npm run test:run -- tests/HomeScreen.test.tsx tests/CreatorShell.test.tsx
```

Expected: FAIL because screens/shell are absent.

- [ ] **Step 3: Implement the Creator lifecycle UI**

Home provides:

- New Project;
- Open Project;
- recent projects;
- clear non-destructive error message when opening fails.

New Project fields are exactly `Project name` and `Premise` in Slice 1. Template is fixed to `blank`; do not create fake Snowed In content yet.

Creator shell layout:

```text
Top bar: AI Game Studio | project name | Save
Sidebar: Dashboard / Characters / Locations / disabled future workspaces
Main: selected workspace
Status: Validation | Saved/Unsaved | Runtime: Not included in Slice 1
```

Before persistence, `Save` runs manifest plus all currently loaded definition validation. Invalid state keeps editing enabled but refuses native writes and shows normalized schema errors.

`ProjectDashboard` shows project name, premise, character count, location count, validation state, and `Runtime: Not available in Creator Foundation` instead of a non-working Play button.

- [ ] **Step 4: Run interaction tests and production frontend build**

```bash
cd apps/creator
npm run test:run -- tests/HomeScreen.test.tsx tests/CreatorShell.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit creator lifecycle UI**

```bash
git add apps/creator/src apps/creator/tests/HomeScreen.test.tsx apps/creator/tests/CreatorShell.test.tsx
git commit -m "feat(creator): add local project lifecycle UI"
```

---

### Task 7: Implement schema-backed Character CRUD editor

**Files:**
- Create: `apps/creator/src/features/characters/CharacterEditor.tsx`
- Create: `apps/creator/src/domain/characterFactory.ts`
- Test: `apps/creator/tests/CharacterEditor.test.tsx`
- Modify: `apps/creator/src/App.tsx`
- Modify: `apps/creator/src/state/projectReducer.ts`

**Interfaces:**
- Consumes: `validateDocument('aigs.character.definition', ...)`, `ProjectGateway.saveDefinition/deleteDefinition`, project definition list.
- Produces: create/select/edit/delete Character definitions with immutable IDs and editable core persona fields.

- [ ] **Step 1: Write failing editor tests**

```tsx
it('creates a valid character and preserves its ID after rename', async () => {
  renderCharacterWorkspace();
  await user.click(screen.getByRole('button', { name: 'New Character' }));
  await user.type(screen.getByLabelText('Name'), 'Sarah');
  await user.type(screen.getByLabelText('Personality summary'), 'Protective, witty, impatient.');
  await user.click(screen.getByRole('button', { name: 'Save Character' }));

  expect(savedDefinition.id).toBe('character.sarah');
  expect(validateDocument('aigs.character.definition', savedDefinition).valid).toBe(true);

  await user.clear(screen.getByLabelText('Name'));
  await user.type(screen.getByLabelText('Name'), 'Sarah Morgan');
  await user.click(screen.getByRole('button', { name: 'Save Character' }));
  expect(savedDefinition.id).toBe('character.sarah');
});
```

Also test that an empty display name or schema-invalid edit surfaces an error and does not call `gateway.saveDefinition`.

- [ ] **Step 2: Run the Character tests and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/CharacterEditor.test.tsx
```

Expected: FAIL because editor/factory do not exist.

- [ ] **Step 3: Implement the minimum Character editor**

New definition factory:

```ts
export function createCharacter(displayName: string) {
  return {
    schema_id: 'aigs.character.definition',
    schema_version: 1,
    id: `character.${slugifyIdPart(displayName)}`,
    kind: 'character',
    display_name: displayName.trim(),
    persona: {
      summary: '',
      background: '',
      personality: [],
      speech: { register: '', notes: '' },
      values: [],
      fears: [],
      desires: [],
      secrets: []
    }
  };
}
```

Slice 1 form fields:

- display name;
- description;
- persona summary;
- background;
- personality list (one item per line);
- speech register;
- speech notes;
- values/fears/desires (one item per line).

Do not add age, voice, appearance, goals, relationships, or AI-provider fields unless/until canonical schemas for them are intentionally extended in later slices. The UI must not create fields that strict schemas reject.

Deletion requires a confirmation interaction and only removes the selected Character definition; no cascade behavior is invented in Slice 1.

- [ ] **Step 4: Run Character/editor regression tests**

```bash
cd apps/creator
npm run test:run -- tests/CharacterEditor.test.tsx tests/validation.test.ts tests/projectReducer.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit Character editing**

```bash
git add apps/creator/src/features/characters apps/creator/src/domain/characterFactory.ts apps/creator/src/App.tsx apps/creator/src/state/projectReducer.ts apps/creator/tests/CharacterEditor.test.tsx
git commit -m "feat(creator): add schema-backed character editor"
```

---

### Task 8: Implement schema-backed Location CRUD editor

**Files:**
- Create: `apps/creator/src/features/locations/LocationEditor.tsx`
- Create: `apps/creator/src/domain/locationFactory.ts`
- Test: `apps/creator/tests/LocationEditor.test.tsx`
- Modify: `apps/creator/src/App.tsx`
- Modify: `apps/creator/src/state/projectReducer.ts`

**Interfaces:**
- Consumes: `validateDocument('aigs.location.definition', ...)`, `ProjectGateway.saveDefinition/deleteDefinition`.
- Produces: create/select/edit/delete logical VN Location definitions with immutable IDs.

- [ ] **Step 1: Write failing Location editor tests**

```tsx
it('creates a logical location with no map coordinates', async () => {
  renderLocationWorkspace();
  await user.click(screen.getByRole('button', { name: 'New Location' }));
  await user.type(screen.getByLabelText('Name'), 'Kitchen');
  await user.type(screen.getByLabelText('Description'), 'Warm family kitchen.');
  await user.click(screen.getByRole('button', { name: 'Save Location' }));

  expect(savedDefinition).toMatchObject({
    schema_id: 'aigs.location.definition',
    id: 'location.kitchen',
    kind: 'location',
    display_name: 'Kitchen'
  });
  expect(savedDefinition).not.toHaveProperty('x');
  expect(savedDefinition).not.toHaveProperty('y');
  expect(validateDocument('aigs.location.definition', savedDefinition).valid).toBe(true);
});
```

- [ ] **Step 2: Run Location tests and verify failure**

```bash
cd apps/creator
npm run test:run -- tests/LocationEditor.test.tsx
```

Expected: FAIL because editor/factory do not exist.

- [ ] **Step 3: Implement minimum logical Location editor**

Factory:

```ts
export function createLocation(displayName: string) {
  return {
    schema_id: 'aigs.location.definition',
    schema_version: 1,
    id: `location.${slugifyIdPart(displayName)}`,
    kind: 'location',
    display_name: displayName.trim(),
    description: '',
    tags: [],
    child_location_refs: []
  };
}
```

Slice 1 form fields:

- display name;
- description;
- tags, one per line;
- child-location references selected only from existing Location IDs.

The editor does not expose tilemaps, coordinates, pathfinding, character placement, background generation, environment components, or runtime navigation logic yet.

- [ ] **Step 4: Run Location and full frontend tests**

```bash
cd apps/creator
npm run test:run
npm run typecheck
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit Location editing**

```bash
git add apps/creator/src/features/locations apps/creator/src/domain/locationFactory.ts apps/creator/src/App.tsx apps/creator/src/state/projectReducer.ts apps/creator/tests/LocationEditor.test.tsx
git commit -m "feat(creator): add schema-backed location editor"
```

---

### Task 9: Add Windows CI, portable smoke artifact, documentation, and full Slice 1 verification

**Files:**
- Create: `.github/workflows/creator-validation.yml`
- Create: `apps/creator/README.md`
- Modify: `README.md`
- Modify: `docs/CURRENT_STATE.md`
- Modify: `CHANGELOG.md`
- Modify: `AGENTS.md` (active spec/plan paths must include `docs/superpowers/specs` and `docs/superpowers/plans`)

**Interfaces:**
- Consumes: all prior tasks.
- Produces: green CI for schema/frontend/Rust checks and a GitHub Actions artifact `AI-Game-Studio-Creator-Foundation-windows-x64.zip` containing a runnable Creator executable.

- [ ] **Step 1: Add a CI expectation that initially fails because the workflow/package script is absent**

Add `verify` to `package.json` only after first confirming this command is currently missing:

```bash
cd apps/creator
npm run verify
```

Expected before implementation: npm reports missing script `verify`.

The final script is:

```json
{
  "scripts": {
    "verify": "npm run schemas:check && npm run test:run && npm run typecheck && npm run build"
  }
}
```

- [ ] **Step 2: Implement two-job CI with a Windows build artifact**

Workflow behavior:

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
      - run: npm run build
        working-directory: apps/creator
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

Do not configure an installer or updater in Slice 1. The smoke package targets standard Windows 10/11 systems with the supported WebView2 platform runtime. Tauri's official Windows documentation states WebView2 is distributed with Windows 10 April 2018 release or later and Windows 11; final v0.1 packaging can revisit fixed/offline WebView2 only if real target-machine testing proves it necessary.

- [ ] **Step 3: Document exact developer/user workflow and current limitations**

`apps/creator/README.md` must include:

```text
Developer verification:
  npm ci
  npm run verify
  cargo test --manifest-path src-tauri/Cargo.toml

Development:
  npm run tauri -- dev

Windows smoke build:
  npm run tauri -- build --no-bundle

Creator Foundation supports:
  - local blank project create/open/save/reopen
  - schema validation
  - Character editing
  - Location editing

Not yet included:
  - Godot playtest runtime
  - Copilot
  - AI image generation
  - Inworld TTS
  - game export
```

Update `docs/CURRENT_STATE.md` with the exact branch/commit, verification results, known limitations, and next three tasks. Update `CHANGELOG.md` under Unreleased with Creator Foundation user-visible capabilities. Update root README quick-start without claiming v0.1 is complete.

- [ ] **Step 4: Run the complete local/CI-equivalent verification before any completion claim**

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

Then confirm the GitHub Actions `Creator Validation` workflow is green on the exact final commit and that the Windows artifact exists and is non-empty. On a Windows machine/runner, smoke-run the built executable far enough to show the Home screen; do not substitute build success for launch success.

- [ ] **Step 5: Commit documentation/CI and open a focused PR**

```bash
git add .github/workflows/creator-validation.yml apps/creator/README.md apps/creator/package.json README.md docs/CURRENT_STATE.md CHANGELOG.md AGENTS.md
git commit -m "ci(creator): package Windows Creator Foundation"
```

PR description must include:

```text
What changed: Creator Foundation Slice 1
Why: first downloadable/editable Windows creator vertical slice
Architecture: ADR-0013; no runtime process implemented yet
Verification: exact Python/npm/cargo commands + GitHub Actions run IDs
Artifact: Windows x64 Creator Foundation ZIP
Known limitations: no Play/Copilot/assets/TTS/export
Next slice: Playable Runtime
```

Do not merge without explicit user integration approval.

---

## Plan Self-Review

### Spec coverage for Slice 1

- Windows desktop Creator shell: Task 1.
- Tauri + React + TypeScript architecture: Task 1 + ADR-0013.
- Local project folders only: Tasks 3-6.
- Canonical JSON/schema validation: Task 2.
- Secure constrained native filesystem boundary: Task 4.
- New/Open/Save/Recent project workflow: Tasks 5-6.
- Basic manually editable project content: Tasks 7-8.
- One semantic-token default UI theme foundation: Tasks 1 and 6.
- Validation blocks unsafe save but not editing: Task 6.
- Recovery/atomic persistence: Task 4.
- Downloadable Windows smoke package: Task 9.
- Durable docs/handoff and unchanged existing schema CI: Task 9.

### Explicitly deferred to later slice plans

- Godot Runtime executable and local runtime bridge.
- VN playtest presentation and location navigation at runtime.
- Systemic simulation, NPC autonomy, actions/activities/events at runtime.
- Creator Copilot and typed ChangeSet UI.
- AI image generation / Asset Studio.
- Inworld `inworld-tts-1.5-mini` adapter and model-specific emotional markup allowlist.
- Standalone game export.

These are not gaps in Slice 1; they are intentionally excluded by the approved five-slice delivery strategy.

### Type/interface consistency

- `ProjectSnapshot` is the shared creator-domain unit from Task 3 onward.
- `StoredDefinition.collection` is limited to `characters | locations` in Slice 1 and maps exactly to Rust `DefinitionCollection`.
- `ProjectGateway` is the only UI-facing persistence contract.
- Canonical IDs are created once and never derived again after initial creation.
- Validation always dispatches by canonical `schema_id`; the creator never invents parallel validation rules for canonical JSON structure.
