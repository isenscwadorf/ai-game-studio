import { slugifyIdPart } from './ids';
import type { ProjectSnapshot } from './projectTypes';

export type BlankProjectOptions = {
  displayName: string;
  premise: string;
};

export function createBlankProject({ displayName, premise }: BlankProjectOptions): ProjectSnapshot {
  const trimmedDisplayName = displayName.trim();
  if (trimmedDisplayName.length === 0) {
    throw new Error('Project display name must not be empty.');
  }

  return {
    rootPath: null,
    manifest: {
      schema_id: 'aigs.project.manifest',
      schema_version: 1,
      project_id: `project.${slugifyIdPart(trimmedDisplayName)}`,
      display_name: trimmedDisplayName,
      project_format_version: 1,
      definition_roots: ['characters', 'locations', 'dialogue'],
      extensions: {
        'aigs.creator': {
          premise: premise.trim(),
          template_id: 'blank',
        },
      },
    },
    definitions: [],
    dirty: false,
  };
}
