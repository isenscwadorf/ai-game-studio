export type ProjectDisplay = {
  displayName: string;
  premise: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function displayText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

export function projectDisplay(manifest: unknown): ProjectDisplay {
  const manifestRecord = isRecord(manifest) ? manifest : {};
  const extensions = isRecord(manifestRecord.extensions) ? manifestRecord.extensions : {};
  const creatorExtension = isRecord(extensions['aigs.creator']) ? extensions['aigs.creator'] : {};
  return {
    displayName: displayText(manifestRecord.display_name, 'Untitled project'),
    premise: displayText(creatorExtension.premise, 'No premise provided.'),
  };
}
