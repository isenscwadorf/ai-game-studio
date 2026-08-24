import type { ImportedVisualAsset, SpriteFraming, VisualKind } from '../domain/assetImport';

export type VisualAssetBytes = {
  bytes: Uint8Array;
  mimeType: 'image/png' | 'image/webp' | 'image/jpeg';
};

export interface VisualAssetGateway {
  chooseImageFile(): Promise<string | null>;
  importVisualAsset(
    projectRoot: string,
    sourcePath: string,
    subjectId: string,
    visualKind: VisualKind,
    spriteFraming?: SpriteFraming,
  ): Promise<ImportedVisualAsset>;
  resolveVisualAsset(
    projectRoot: string,
    subjectId: string,
    visualKind: VisualKind,
  ): Promise<ImportedVisualAsset | null>;
  readVisualAsset(projectRoot: string, projectPath: string): Promise<VisualAssetBytes>;
  removeVisualAsset(projectRoot: string, subjectId: string, visualKind: VisualKind): Promise<void>;
}
