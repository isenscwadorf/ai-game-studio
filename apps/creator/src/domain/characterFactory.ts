import { makeUniqueDefinitionId } from './ids';
import type { StoredDefinition } from './projectTypes';
import { validateDocument } from './validation';

export function createCharacterDefinition(displayName: string, existingIds: ReadonlySet<string>): StoredDefinition['document'] {
  const trimmedDisplayName = displayName.trim();
  if (trimmedDisplayName.length === 0) {
    throw new Error('Character name must not be empty.');
  }

  const document: StoredDefinition['document'] = {
    schema_id: 'aigs.character.definition',
    schema_version: 1,
    id: makeUniqueDefinitionId('character', trimmedDisplayName, existingIds),
    kind: 'character',
    display_name: trimmedDisplayName,
    persona: {
      summary: '',
      background: '',
      personality: [],
      speech: { register: '', notes: '' },
      values: [],
      fears: [],
      desires: [],
      secrets: [],
    },
  };
  const validation = validateDocument('aigs.character.definition', document);
  if (!validation.valid) {
    throw new Error(`Character factory produced an invalid document: ${validation.errors.map((issue) => issue.message).join(' ')}`);
  }
  return document;
}
