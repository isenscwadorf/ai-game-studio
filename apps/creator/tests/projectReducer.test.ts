import { describe, expect, it } from 'vitest';
import { createBlankProject } from '../src/domain/blankProject';
import { createCharacterDefinition } from '../src/domain/characterFactory';
import { reducer } from '../src/state/projectReducer';

describe('project editor reducer', () => {
  it('marks a manifest rename dirty and a successful save clean', () => {
    const project = createBlankProject({ displayName: 'Original', premise: '' });

    const edited = reducer({ project, status: 'open', error: null }, {
      type: 'manifestRenamed',
      displayName: 'Renamed',
    });

    expect(edited.project?.manifest.display_name).toBe('Renamed');
    expect(edited.project?.dirty).toBe(true);
    expect(reducer(edited, { type: 'projectSaved' }).project?.dirty).toBe(false);
  });

  it('keeps an open project available when an operation fails', () => {
    const project = createBlankProject({ displayName: 'Keep Me', premise: '' });

    const result = reducer({ project, status: 'open', error: null }, {
      type: 'operationFailed',
      error: 'Disk is unavailable',
    });

    expect(result).toMatchObject({
      project,
      status: 'open',
      error: 'Disk is unavailable',
    });
  });

  it('updates a character immutably without allowing a display-name edit to replace its persistent ID', () => {
    const project = createBlankProject({ displayName: 'Character State', premise: '' });
    const original = createCharacterDefinition('Sarah', new Set());
    project.definitions = [{ collection: 'characters', document: original }];

    const result = reducer({ project, status: 'open', error: null }, {
      type: 'characterUpdated',
      id: original.id,
      document: { ...original, id: 'character.changed', display_name: 'Sarah Morgan' },
    });

    expect(result.project?.definitions[0].document).toMatchObject({ id: 'character.sarah', display_name: 'Sarah Morgan' });
    expect(result.project?.definitions).not.toBe(project.definitions);
    expect(project.definitions[0].document).toEqual(original);
    expect(result.project?.dirty).toBe(true);
  });

  it('shows an error state when an operation fails before a project is open', () => {
    const result = reducer({ project: null, status: 'loading', error: null }, {
      type: 'operationFailed',
      error: 'Project does not exist',
    });

    expect(result).toEqual({
      project: null,
      status: 'error',
      error: 'Project does not exist',
    });
  });
});
