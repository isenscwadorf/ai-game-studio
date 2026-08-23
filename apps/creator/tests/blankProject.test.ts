import { describe, expect, it } from 'vitest';
import { createBlankProject } from '../src/domain/blankProject';
import { makeUniqueDefinitionId } from '../src/domain/ids';
import { validateProject } from '../src/domain/validation';

describe('Creator project identity and blank factory', () => {
  it('stores premise only in the explicit creator extension', () => {
    const project = createBlankProject({ displayName: 'My First Game', premise: 'Family drama' });

    expect(project.manifest.project_id).toBe('project.my_first_game');
    expect(project.manifest.extensions?.['aigs.creator']).toEqual({
      premise: 'Family drama',
      template_id: 'blank',
    });
    expect(project.manifest).not.toHaveProperty('premise');
    expect(project.definitions).toEqual([]);
    expect(project.rootPath).toBeNull();
    expect(project.dirty).toBe(false);
    expect(validateProject(project).valid).toBe(true);
  });

  it('creates collision-safe IDs without renaming existing IDs', () => {
    expect(makeUniqueDefinitionId('character', 'Sarah', new Set(['character.sarah']))).toBe('character.sarah_2');
  });
});
