import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createBlankProject } from '../src/domain/blankProject';

const { invokeMock, dialogOpenMock } = vi.hoisted(() => ({
  invokeMock: vi.fn(),
  dialogOpenMock: vi.fn(),
}));

vi.mock('@tauri-apps/api/core', () => ({ invoke: invokeMock }));
vi.mock('@tauri-apps/plugin-dialog', () => ({ open: dialogOpenMock }));

import {
  ProjectValidationError,
  tauriProjectGateway,
} from '../src/platform/tauriProjectGateway';

describe('tauri project gateway', () => {
  beforeEach(() => {
    invokeMock.mockReset();
    dialogOpenMock.mockReset();
  });

  it.each([
    ['parent', () => tauriProjectGateway.chooseParentDirectory(), 'Choose a parent directory'],
    ['project', () => tauriProjectGateway.chooseProjectDirectory(), 'Open a project directory'],
  ])('maps a cancelled %s directory dialog to null without invoking native persistence', async (_kind, choose, title) => {
    dialogOpenMock.mockResolvedValueOnce(null);

    await expect(choose()).resolves.toBeNull();
    expect(dialogOpenMock).toHaveBeenCalledWith({ directory: true, multiple: false, title });
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it('maps ordinary create and open payloads to canonical project snapshots', async () => {
    const createdInput = createBlankProject({ displayName: 'Gateway', premise: 'Create mapping.' });
    invokeMock.mockResolvedValueOnce({
      manifest: createdInput.manifest,
      characters: [],
      locations: [],
    });

    const created = await tauriProjectGateway.createProject('C:\\Games', 'Gateway', createdInput);

    expect(created).toMatchObject({ rootPath: 'C:\\Games\\Gateway', dirty: false, definitions: [] });
    expect(invokeMock).toHaveBeenLastCalledWith('create_project', {
      parentDir: 'C:\\Games',
      folderName: 'Gateway',
      payload: { manifest: createdInput.manifest, characters: [], locations: [] },
    });

    const character = {
      schema_id: 'aigs.character.definition',
      schema_version: 1,
      id: 'character.alex',
      kind: 'character',
      display_name: 'Alex',
      persona: {
        summary: '', background: '', personality: [], speech: { register: '', notes: '' },
        values: [], fears: [], desires: [], secrets: [],
      },
    };
    invokeMock.mockResolvedValueOnce({ manifest: createdInput.manifest, characters: [character], locations: [] });

    const opened = await tauriProjectGateway.openProject('C:\\Games\\Gateway');

    expect(opened).toMatchObject({
      rootPath: 'C:\\Games\\Gateway',
      dirty: false,
      definitions: [{ collection: 'characters', document: character }],
    });
    expect(invokeMock).toHaveBeenLastCalledWith('open_project', { projectDir: 'C:\\Games\\Gateway' });
  });

  it('rejects save without a project root before invoking native persistence', async () => {
    const project = createBlankProject({ displayName: 'Unsaved', premise: '' });

    await expect(tauriProjectGateway.saveProject(project)).rejects.toMatchObject({
      name: 'ProjectValidationError',
      issues: [{
        code: 'PROJECT_ROOT_PATH_REQUIRED',
        path: '/rootPath',
        message: 'An open project directory is required before saving.',
      }],
    });
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it.each(['create', 'save'] as const)('keeps canonical validation on native %s responses', async (operation) => {
    const project = {
      ...createBlankProject({ displayName: 'Gateway', premise: '' }),
      rootPath: 'C:\\Games\\Gateway',
    };
    invokeMock.mockResolvedValueOnce({
      manifest: project.manifest,
      characters: [],
      locations: [{
        schema_id: 'aigs.location.definition',
        schema_version: 1,
        id: 'location.hall',
        kind: 'location',
        display_name: 'Hall',
        child_location_refs: [{ ref: 'location.missing' }],
      }],
    });

    const request = operation === 'create'
      ? tauriProjectGateway.createProject('C:\\Games', 'Gateway', project)
      : tauriProjectGateway.saveProject(project);

    await expect(request).rejects.toBeInstanceOf(ProjectValidationError);
  });

  it.each([
    {
      name: 'has a missing definition reference',
      definitions: [{
        collection: 'locations' as const,
        document: {
          schema_id: 'aigs.location.definition',
          schema_version: 1,
          id: 'location.hall',
          kind: 'location',
          display_name: 'Hall',
          child_location_refs: [{ ref: 'location.missing' }],
        },
      }],
    },
    {
      name: 'contains a credential-like key',
      definitions: [],
      extensions: { 'aigs.creator': { api_key: 'must-not-save' } },
    },
  ])('rejects an invalid snapshot that $name before native save is invoked', async ({ definitions, extensions }) => {
    const blankProject = createBlankProject({ displayName: 'Broken', premise: '' });
    const invalidProject = {
      ...blankProject,
      manifest: { ...blankProject.manifest, extensions },
      definitions,
      rootPath: 'C:\\Games\\Broken',
      dirty: true,
    };

    await expect(tauriProjectGateway.saveProject(invalidProject)).rejects.toBeInstanceOf(ProjectValidationError);
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it('saves only persistence data and restores editor fields from the native response', async () => {
    const project = {
      ...createBlankProject({ displayName: 'Gateway', premise: '' }),
      rootPath: 'C:\\Games\\Gateway',
      dirty: true,
      definitions: [{
        collection: 'characters' as const,
        document: {
          schema_id: 'aigs.character.definition',
          schema_version: 1,
          id: 'character.alex',
          kind: 'character',
          display_name: 'Alex',
          persona: { summary: 'A careful test character.' },
        },
      }],
    };
    invokeMock.mockResolvedValueOnce({
      manifest: project.manifest,
      characters: [project.definitions[0].document],
      locations: [],
    });

    const saved = await tauriProjectGateway.saveProject(project);

    expect(saved).toMatchObject({
      rootPath: 'C:\\Games\\Gateway',
      dirty: false,
      definitions: project.definitions,
    });
    expect(invokeMock).toHaveBeenCalledWith('save_project', {
      projectDir: 'C:\\Games\\Gateway',
      payload: {
        manifest: project.manifest,
        characters: [project.definitions[0].document],
        locations: [],
      },
    });
  });

  it.each([
    {
      operation: 'create',
      response: null,
      issues: [{
        code: 'PROJECT_PAYLOAD_ENVELOPE_INVALID',
        path: '',
        message: 'Native project response must be an object.',
      }],
    },
    {
      operation: 'open',
      response: {},
      issues: [
        {
          code: 'PROJECT_PAYLOAD_COLLECTION_MISSING',
          path: '/characters',
          message: 'Native project response is missing characters.',
        },
        {
          code: 'PROJECT_PAYLOAD_COLLECTION_MISSING',
          path: '/locations',
          message: 'Native project response is missing locations.',
        },
        {
          code: 'PROJECT_PAYLOAD_MANIFEST_MISSING',
          path: '/manifest',
          message: 'Native project response is missing manifest.',
        },
      ],
    },
    {
      operation: 'save',
      response: { manifest: {}, characters: null, locations: [] },
      issues: [{
        code: 'PROJECT_PAYLOAD_COLLECTION_INVALID',
        path: '/characters',
        message: 'Native project response characters must be an array.',
      }],
    },
  ])('converts malformed native $operation responses into redacted validation issues', async ({ operation, response, issues }) => {
    const project = {
      ...createBlankProject({ displayName: 'Gateway', premise: '' }),
      rootPath: 'C:\\Games\\Gateway',
    };
    invokeMock.mockResolvedValueOnce(response);

    const request = operation === 'create'
      ? tauriProjectGateway.createProject('C:\\Games', 'Gateway', project)
      : operation === 'open'
        ? tauriProjectGateway.openProject('C:\\Games\\Gateway')
        : tauriProjectGateway.saveProject(project);

    await expect(request).rejects.toMatchObject({
      name: 'ProjectValidationError',
      issues,
    });
    await request.catch((error: ProjectValidationError) => {
      expect(JSON.stringify(error.issues)).not.toContain('raw-secret-value');
    });
  });

  it('rejects unexpected native envelope fields without exposing their values', async () => {
    invokeMock.mockResolvedValueOnce({
      manifest: createBlankProject({ displayName: 'Gateway', premise: '' }).manifest,
      characters: [],
      locations: [],
      api_key__gateway_secret_name: 'raw-secret-value',
    });

    const request = tauriProjectGateway.openProject('C:\\Games\\Gateway');

    await expect(request).rejects.toMatchObject({
      name: 'ProjectValidationError',
      issues: [{
        code: 'PROJECT_PAYLOAD_UNEXPECTED_PROPERTY',
        path: '',
        message: 'Native project response contains unexpected properties.',
      }],
    });
    await request.catch((error: ProjectValidationError) => {
      expect(JSON.stringify(error.issues)).not.toContain('raw-secret-value');
      expect(JSON.stringify(error.issues)).not.toContain('api_key__gateway_secret_name');
    });
  });

  it.each([
    {
      operation: 'create',
      response: { manifest: null, characters: [], locations: [] },
      issue: {
        code: 'PROJECT_PAYLOAD_MANIFEST_INVALID',
        path: '/manifest',
        message: 'Native project response manifest must be an object.',
      },
    },
    {
      operation: 'open',
      response: { manifest: [], characters: [], locations: [] },
      issue: {
        code: 'PROJECT_PAYLOAD_MANIFEST_INVALID',
        path: '/manifest',
        message: 'Native project response manifest must be an object.',
      },
    },
    {
      operation: 'save',
      response: { manifest: 42, characters: [], locations: [] },
      issue: {
        code: 'PROJECT_PAYLOAD_MANIFEST_INVALID',
        path: '/manifest',
        message: 'Native project response manifest must be an object.',
      },
    },
    {
      operation: 'create',
      response: { manifest: createBlankProject({ displayName: 'Gateway', premise: '' }).manifest, characters: [null], locations: [] },
      issue: {
        code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
        path: '/characters/0',
        message: 'Native project response document must be an object.',
      },
    },
    {
      operation: 'open',
      response: { manifest: createBlankProject({ displayName: 'Gateway', premise: '' }).manifest, characters: [[]], locations: [] },
      issue: {
        code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
        path: '/characters/0',
        message: 'Native project response document must be an object.',
      },
    },
    {
      operation: 'save',
      response: { manifest: createBlankProject({ displayName: 'Gateway', premise: '' }).manifest, characters: [], locations: [42] },
      issue: {
        code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
        path: '/locations/0',
        message: 'Native project response document must be an object.',
      },
    },
  ])('rejects a native $operation response with a non-record manifest or document', async ({ operation, response, issue }) => {
    const project = {
      ...createBlankProject({ displayName: 'Gateway', premise: '' }),
      rootPath: 'C:\\Games\\Gateway',
    };
    invokeMock.mockResolvedValueOnce(response);

    const request = operation === 'create'
      ? tauriProjectGateway.createProject('C:\\Games', 'Gateway', project)
      : operation === 'open'
        ? tauriProjectGateway.openProject('C:\\Games\\Gateway')
        : tauriProjectGateway.saveProject(project);

    await expect(request).rejects.toMatchObject({
      name: 'ProjectValidationError',
      issues: [issue],
    });
  });

  it.each([
    {
      operation: 'create',
      collection: 'characters',
      length: 1,
      issues: [{
        code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
        path: '/characters/0',
        message: 'Native project response document must be an object.',
      }],
    },
    {
      operation: 'open',
      collection: 'locations',
      length: 1,
      issues: [{
        code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
        path: '/locations/0',
        message: 'Native project response document must be an object.',
      }],
    },
    {
      operation: 'save',
      collection: 'characters',
      length: 2,
      issues: [
        {
          code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
          path: '/characters/0',
          message: 'Native project response document must be an object.',
        },
        {
          code: 'PROJECT_PAYLOAD_DOCUMENT_INVALID',
          path: '/characters/1',
          message: 'Native project response document must be an object.',
        },
      ],
    },
  ])('rejects every sparse native $operation $collection index', async ({ operation, collection, length, issues }) => {
    const sparseCollection = new Array(length);
    const project = {
      ...createBlankProject({ displayName: 'Gateway', premise: '' }),
      rootPath: 'C:\\Games\\Gateway',
    };
    invokeMock.mockResolvedValueOnce({
      manifest: project.manifest,
      characters: collection === 'characters' ? sparseCollection : [],
      locations: collection === 'locations' ? sparseCollection : [],
    });

    const request = operation === 'create'
      ? tauriProjectGateway.createProject('C:\\Games', 'Gateway', project)
      : operation === 'open'
        ? tauriProjectGateway.openProject('C:\\Games\\Gateway')
        : tauriProjectGateway.saveProject(project);

    await expect(request).rejects.toMatchObject({
      name: 'ProjectValidationError',
      issues,
    });
  });
});
