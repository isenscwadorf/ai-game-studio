import { describe, expect, it } from 'vitest';
import { createDialogueSceneDefinition } from '../src/domain/dialogueFactory';
import { validateDocument } from '../src/domain/validation';

describe('createDialogueSceneDefinition', () => {
  it('creates a schema-valid scene with a stable starting entry', () => {
    const scene = createDialogueSceneDefinition('Snowed In Intro', new Set());
    expect(scene.id).toBe('dialogue.snowed_in_intro');
    expect(scene.schema_id).toBe('aigs.dialogue.scene');
    expect(scene.entry_point).toBe('entry.start');
    expect(scene.entries).toEqual([{
      entry_id: 'entry.start',
      kind: 'narration',
      text: 'Scene begins.',
      next: null,
    }]);
    expect(validateDocument('aigs.dialogue.scene', scene).valid).toBe(true);
  });

  it('deduplicates scene IDs using the shared definition ID policy', () => {
    const scene = createDialogueSceneDefinition('Intro', new Set(['dialogue.intro']));
    expect(scene.id).toBe('dialogue.intro_2');
  });

  it('rejects empty names', () => {
    expect(() => createDialogueSceneDefinition('   ', new Set())).toThrow(/name/i);
  });
});
