export type SpriteFraming = 'full_body' | 'two_thirds';
export type VisualKind = 'character_sprite' | 'location_background';

export type ImportedVisualAsset = {
  subjectId: string;
  visualKind: VisualKind;
  projectPath: string;
  contentSha256: string;
  mimeType: 'image/png' | 'image/webp' | 'image/jpeg';
  extension: 'png' | 'webp' | 'jpg' | 'jpeg';
  assetIdentity: Record<string, unknown>;
  variant: Record<string, unknown>;
};

export function parseSpriteFraming(_value: unknown): SpriteFraming {
  throw new Error('not implemented');
}

export function isImportedProjectPath(_path: string, _visualKind: VisualKind): boolean {
  return false;
}
