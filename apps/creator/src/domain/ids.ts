/**
 * Converts a user-facing name into the ID-safe segment used by editor IDs.
 *
 * IDs are persistent once assigned. Callers should use this only while
 * creating a new definition; renaming an existing definition must not call it
 * to replace that definition's ID.
 */
export function slugifyIdPart(value: string): string {
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return slug || 'unnamed';
}

/**
 * Returns the first unused stable ID for a newly-created definition.
 */
export function makeUniqueDefinitionId(
  prefix: string,
  displayName: string,
  existingIds: ReadonlySet<string>,
): string {
  const baseId = `${slugifyIdPart(prefix)}.${slugifyIdPart(displayName)}`;
  if (!existingIds.has(baseId)) {
    return baseId;
  }

  let suffix = 2;
  while (existingIds.has(`${baseId}_${suffix}`)) {
    suffix += 1;
  }
  return `${baseId}_${suffix}`;
}
