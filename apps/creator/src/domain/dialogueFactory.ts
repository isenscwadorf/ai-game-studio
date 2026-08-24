import { makeUniqueDefinitionId } from './ids';
import type { StoredDefinition } from './projectTypes';
import { validateDocument } from './validation';

export function createDialogueSceneDefinition(
  displayName: string,
  existingIds: ReadonlySet<string>,
): StoredDefinition['document'] {
  const trimmedDisplayName = displayName.trim();
  if (trimmedDisplayName.length === 0) {
    throw new Error('Dialogue scene name must not be empty.');
  }

  const document: StoredDefinition['document'] = {
    schema_id: 'aigs.dialogue.scene',
    schema_version: 1,
    id: makeUniqueDefinitionId('dialogue', trimmedDisplayName, existingIds),
    kind: 'dialogue_scene',
    display_name: trimmedDisplayName,
    input_mode: 'free',
    entry_point: 'entry.start',
    entries: [{
      entry_id: 'entry.start',
      kind: 'narration',
      text: 'Scene begins.',
      next: null,
    }],
  };

  const validation = validateDocument('aigs.dialogue.scene', document);
  if (!validation.valid) {
    throw new Error(`Dialogue factory produced an invalid document: ${validation.errors.map((issue) => issue.message).join(' ')}`);
  }
  return document;
}
