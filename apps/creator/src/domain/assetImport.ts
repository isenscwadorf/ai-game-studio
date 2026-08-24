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

const IMPORT_ROOTS: Record<VisualKind, string> = {
  character_sprite: 'assets/imported/characters/',
  location_background: 'assets/imported/locations/',
};

const IMPORTED_IMAGE_NAME = /^[a-z0-9][a-z0-9_-]*-[a-f0-9]{12}\.(?:png|webp|jpe?g)$/;

export function parseSpriteFraming(value: unknown): SpriteFraming {
  if (value === 'full_body' || value === 'two_thirds') {
    return value;
  }
  throw new Error('Sprite framing must be full_body or two_thirds.');
}

export function isImportedProjectPath(path: string, visualKind: VisualKind): boolean {
  if (!path || path.includes('\\') || path.startsWith('/') || /^[a-zA-Z]:\//.test(path)) {
    return false;
  }
  const segments = path.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    return false;
  }
  const root = IMPORT_ROOTS[visualKind];
  if (!path.startsWith(root)) {
    return false;
  }
  const filename = path.slice(root.length);
  return !filename.includes('/') && IMPORTED_IMAGE_NAME.test(filename);
}
