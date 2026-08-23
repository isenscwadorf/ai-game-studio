import { makeUniqueDefinitionId } from './ids';
import type { StoredDefinition } from './projectTypes';
import { validateDocument } from './validation';

export function createLocationDefinition(displayName: string, existingIds: ReadonlySet<string>): StoredDefinition['document'] {
  const trimmedDisplayName = displayName.trim();
  if (trimmedDisplayName.length === 0) {
    throw new Error('Location name must not be empty.');
  }

  const document: StoredDefinition['document'] = {
    schema_id: 'aigs.location.definition',
    schema_version: 1,
    id: makeUniqueDefinitionId('location', trimmedDisplayName, existingIds),
    kind: 'location',
    display_name: trimmedDisplayName,
    description: '',
    tags: [],
    child_location_refs: [],
  };
  const validation = validateDocument('aigs.location.definition', document);
  if (!validation.valid) {
    throw new Error(`Location factory produced an invalid document: ${validation.errors.map((issue) => issue.message).join(' ')}`);
  }
  return document;
}
