import { useEffect, useState } from 'react';
import type { ImportedVisualAsset, SpriteFraming, VisualKind } from '../domain/assetImport';
import type { VisualAssetGateway } from '../platform/VisualAssetGateway';

function bytesToDataUrl(bytes: Uint8Array, mimeType: string): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)));
  }
  return `data:${mimeType};base64,${btoa(binary)}`;
}

export type VisualAssetControlsProps = {
  busy: boolean;
  gateway: VisualAssetGateway;
  projectRoot: string | null;
  subjectId: string;
  visualKind: VisualKind;
  onEnsureSaved: () => Promise<boolean>;
  onProjectReload: () => Promise<void>;
};

export function VisualAssetControls({
  busy,
  gateway,
  projectRoot,
  subjectId,
  visualKind,
  onEnsureSaved,
  onProjectReload,
}: VisualAssetControlsProps) {
  const [asset, setAsset] = useState<ImportedVisualAsset | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [framing, setFraming] = useState<SpriteFraming>('full_body');
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const disabled = busy || working || !projectRoot;

  async function loadCurrentAsset(root: string, id: string) {
    const current = await gateway.resolveVisualAsset(root, id, visualKind);
    setAsset(current);
    setPreviewUrl(null);
    if (!current) return;
    if (visualKind === 'character_sprite') {
      const presentation = current.variant.presentation;
      if (presentation && typeof presentation === 'object' && !Array.isArray(presentation)) {
        const value = (presentation as Record<string, unknown>).sprite_framing;
        if (value === 'full_body' || value === 'two_thirds') setFraming(value);
      }
    }
    const binary = await gateway.readVisualAsset(root, current.projectPath);
    setPreviewUrl(bytesToDataUrl(binary.bytes, binary.mimeType));
  }

  useEffect(() => {
    let cancelled = false;
    if (!projectRoot || !subjectId) {
      setAsset(null);
      setPreviewUrl(null);
      return () => { cancelled = true; };
    }
    void (async () => {
      try {
        const current = await gateway.resolveVisualAsset(projectRoot, subjectId, visualKind);
        if (cancelled) return;
        setAsset(current);
        setPreviewUrl(null);
        if (!current) return;
        if (visualKind === 'character_sprite') {
          const presentation = current.variant.presentation;
          if (presentation && typeof presentation === 'object' && !Array.isArray(presentation)) {
            const value = (presentation as Record<string, unknown>).sprite_framing;
            if (value === 'full_body' || value === 'two_thirds') setFraming(value);
          }
        }
        const binary = await gateway.readVisualAsset(projectRoot, current.projectPath);
        if (!cancelled) setPreviewUrl(bytesToDataUrl(binary.bytes, binary.mimeType));
      } catch (loadError) {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : String(loadError));
      }
    })();
    return () => { cancelled = true; };
  }, [gateway, projectRoot, subjectId, visualKind]);

  async function importOrReplace() {
    if (disabled || !projectRoot) return;
    setError(null);
    const sourcePath = await gateway.chooseImageFile();
    if (!sourcePath) return;
    setWorking(true);
    try {
      if (!(await onEnsureSaved())) return;
      await gateway.importVisualAsset(
        projectRoot,
        sourcePath,
        subjectId,
        visualKind,
        visualKind === 'character_sprite' ? framing : undefined,
      );
      await onProjectReload();
      await loadCurrentAsset(projectRoot, subjectId);
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : String(mutationError));
    } finally {
      setWorking(false);
    }
  }

  async function remove() {
    if (disabled || !projectRoot || !asset) return;
    setWorking(true);
    setError(null);
    try {
      if (!(await onEnsureSaved())) return;
      await gateway.removeVisualAsset(projectRoot, subjectId, visualKind);
      setAsset(null);
      setPreviewUrl(null);
      await onProjectReload();
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : String(mutationError));
    } finally {
      setWorking(false);
    }
  }

  return (
    <fieldset className="visual-asset-controls" disabled={disabled}>
      <legend>{visualKind === 'character_sprite' ? 'Character sprite' : 'Location background'}</legend>
      {previewUrl ? <img alt={`${subjectId} imported visual preview`} className="visual-asset-controls__preview" src={previewUrl} /> : (
        <p className="muted">{asset ? 'Preview unavailable.' : 'No imported visual.'}</p>
      )}
      {asset ? <small className="definition-list__id">{asset.projectPath}</small> : null}
      {visualKind === 'character_sprite' ? (
        <label className="form-field">
          <span>Sprite framing</span>
          <select disabled={busy || working} onChange={(event) => setFraming(event.target.value as SpriteFraming)} value={framing}>
            <option value="full_body">Full Body</option>
            <option value="two_thirds">Two Thirds</option>
          </select>
          <small>Framing is stored when the sprite is imported or replaced.</small>
        </label>
      ) : null}
      <div className="visual-asset-controls__actions">
        <button disabled={disabled} onClick={() => void importOrReplace()} type="button">{asset ? 'Replace Visual' : 'Import Visual'}</button>
        {asset ? <button className="button--danger" disabled={disabled} onClick={() => void remove()} type="button">Remove Visual</button> : null}
      </div>
      {error ? <p role="alert">{error}</p> : null}
    </fieldset>
  );
}
