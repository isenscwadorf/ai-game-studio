import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import type { ProjectSnapshot, StoredDefinition } from '../domain/projectTypes';
import { validateProject, type ValidationIssue } from '../domain/validation';
import type { ProjectGateway } from './ProjectGateway';

type ProjectPayload = {
  manifest: ProjectSnapshot['manifest'];
  characters: StoredDefinition['document'][];
  locations: StoredDefinition['document'][];
};

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function sortIssues(issues: ValidationIssue[]): ValidationIssue[] {
  return [...issues].sort((left, right) =>
    [left.path, left.code, left.message].join('\u0000').localeCompare(
      [right.path, right.code, right.message].join('\u0000'),
    ));
}

export class ProjectValidationError extends Error {
  readonly issues: ValidationIssue[];

  constructor(issues: ValidationIssue[]) {
    super('Project validation failed.');
    this.name = 'ProjectValidationError';
    this.issues = issues;
  }
}

function validateSnapshot(snapshot: ProjectSnapshot): void {
  const result = validateProject(snapshot);
  if (!result.valid) {
    throw new ProjectValidationError(result.errors);
  }
}

function decodeProjectPayload(payload: unknown): ProjectPayload {
  if (!isPlainRecord(payload)) {
    throw new ProjectValidationError([{
      code: 'PROJECT_PAYLOAD_ENVELOPE_INVALID',
      path: '',
      message: 'Native project response must be an object.',
    }]);
  }

  const issues: ValidationIssue[] = [];
  if (Object.keys(payload).some((key) => key !== 'manifest' && key !== 'characters' && key !== 'locations')) {
    issues.push({
      code: 'PROJECT_PAYLOAD_UNEXPECTED_PROPERTY',
      path: '',
      message: 'Native project response contains unexpected properties.',
    });
  }
  if (!Object.prototype.hasOwnProperty.call(payload, 'manifest')) {
    issues.push({
      code: 'PROJECT_PAYLOAD_MANIFEST_MISSING',
      path: '/manifest',
      message: 'Native project response is missing manifest.',
    });
  } else if (!isPlainRecord(payload.manifest)) {
    issues.push({
      code: 'PROJECT_PAYLOAD_MANIFEST_INVALID',
      path: '/manifest',
      message: 'Native project response manifest must be an object.',
    });
  }
  for (const collection of ['characters', 'locations'] as const) {
    if (!Object.prototype.hasOwnProperty.call(payload, collection)) {
      issues.push({
        code: 'PROJECT_PAYLOAD_COLLECTION_MISSING',
        path: `/${collection}`,
        message: `Native project response is missing ${collection}.`,
      });
    } else if (!Array.isArray(payload[collection])) {
      issues.push({
        code: 'PROJECT_PAYLOAD_COLLECTION_INVALID',
        path: `/${collection}`,
        message: `Native project response ${collection} must be an array.`,
      });
    } else {
      for (let index = 0; index < payload[collection].length; index += 1) {
        const document = payload[collection][index];
        if (!isPlainRecord(document)) {
          issues.push({
            code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
            path: `/${collection}/${index}`,
            message: 'Native project response document must be an object.',
          });
        }
      }
    }
  }
  if (issues.length > 0) {
    throw new ProjectValidationError(sortIssues(issues));
  }

  return {
    manifest: payload.manifest as ProjectSnapshot['manifest'],
    characters: payload.characters as StoredDefinition['document'][],
    locations: payload.locations as StoredDefinition['document'][],
  };
}

function payloadFromSnapshot(snapshot: ProjectSnapshot): ProjectPayload {
  return {
    manifest: snapshot.manifest,
    characters: snapshot.definitions
      .filter((definition) => definition.collection === 'characters')
      .map((definition) => definition.document),
    locations: snapshot.definitions
      .filter((definition) => definition.collection === 'locations')
      .map((definition) => definition.document),
  };
}

function snapshotFromPayload(nativePayload: unknown, rootPath: string, requireCanonicalProject: boolean): ProjectSnapshot {
  const payload = decodeProjectPayload(nativePayload);
  const snapshot: ProjectSnapshot = {
    rootPath,
    manifest: payload.manifest,
    definitions: [
      ...payload.characters.map((document) => ({ collection: 'characters' as const, document })),
      ...payload.locations.map((document) => ({ collection: 'locations' as const, document })),
    ],
    dirty: false,
  };
  if (requireCanonicalProject) {
    validateSnapshot(snapshot);
  }
  return snapshot;
}

function projectDirectory(parentDir: string, folderName: string): string {
  const trimmedParent = parentDir.replace(/[\\/]+$/, '');
  const separator = parentDir.includes('\\') ? '\\' : '/';
  return `${trimmedParent}${separator}${folderName}`;
}

function requireRootPath(snapshot: ProjectSnapshot): string {
  if (snapshot.rootPath) {
    return snapshot.rootPath;
  }
  throw new ProjectValidationError([{
    code: 'PROJECT_ROOT_PATH_REQUIRED',
    path: '/rootPath',
    message: 'An open project directory is required before saving.',
  }]);
}

async function chooseDirectory(title: string): Promise<string | null> {
  const selected = await open({ directory: true, multiple: false, title });
  return typeof selected === 'string' ? selected : null;
}

export const tauriProjectGateway: ProjectGateway = {
  chooseParentDirectory: () => chooseDirectory('Choose a parent directory'),

  chooseProjectDirectory: () => chooseDirectory('Open a project directory'),

  async createProject(parentDir, folderName, snapshot) {
    validateSnapshot(snapshot);
    const payload = payloadFromSnapshot(snapshot);
    const nativePayload = await invoke<unknown>('create_project', { parentDir, folderName, payload });
    return snapshotFromPayload(nativePayload, projectDirectory(parentDir, folderName), true);
  },

  async openProject(projectDir) {
    const nativePayload = await invoke<unknown>('open_project', { projectDir });
    return snapshotFromPayload(nativePayload, projectDir, false);
  },

  async saveProject(snapshot) {
    validateSnapshot(snapshot);
    const projectDir = requireRootPath(snapshot);
    const payload = payloadFromSnapshot(snapshot);
    const nativePayload = await invoke<unknown>('save_project', { projectDir, payload });
    return snapshotFromPayload(nativePayload, projectDir, true);
  },
};
