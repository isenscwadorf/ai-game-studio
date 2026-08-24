import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import {
  isImportedProjectPath,
  parseSpriteFraming,
  type ImportedVisualAsset,
  type SpriteFraming,
  type VisualKind,
} from '../domain/assetImport';
import type { VisualAssetBytes, VisualAssetGateway } from './VisualAssetGateway';

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function decodeImportedVisualAsset(
  value: unknown,
  expectedSubjectId: string,
  expectedVisualKind: VisualKind,
): ImportedVisualAsset {
  if (!isPlainRecord(value)) throw new Error('Native visual asset response must be an object.');
  const {
    subjectId, visualKind, projectPath, contentSha256, mimeType, extension, assetIdentity, variant,
  } = value;
  if (subjectId !== expectedSubjectId || visualKind !== expectedVisualKind) {
    throw new Error('Native visual asset response subject does not match the request.');
  }
  if (typeof projectPath !== 'string' || !isImportedProjectPath(projectPath, expectedVisualKind)) {
    throw new Error('Native visual asset response contains an unsafe project path.');
  }
  if (typeof contentSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(contentSha256)) {
    throw new Error('Native visual asset response contains an invalid SHA-256.');
  }
  if (mimeType !== 'image/png' && mimeType !== 'image/webp' && mimeType !== 'image/jpeg') {
    throw new Error('Native visual asset response contains an unsupported MIME type.');
  }
  if (extension !== 'png' && extension !== 'webp' && extension !== 'jpg' && extension !== 'jpeg') {
    throw new Error('Native visual asset response contains an unsupported extension.');
  }
  if (!isPlainRecord(assetIdentity) || !isPlainRecord(variant)) {
    throw new Error('Native visual asset response is missing canonical metadata.');
  }
  const presentation = variant.presentation;
  if (expectedVisualKind === 'character_sprite') {
    if (!isPlainRecord(presentation)) throw new Error('Character visual variant is missing presentation metadata.');
    parseSpriteFraming(presentation.sprite_framing);
  } else if (presentation !== undefined) {
    throw new Error('Location visual variant must not contain character sprite framing.');
  }
  return value as unknown as ImportedVisualAsset;
}

function decodeVisualBytes(value: unknown): VisualAssetBytes {
  if (!isPlainRecord(value) || !Array.isArray(value.bytes)) {
    throw new Error('Native visual bytes response is malformed.');
  }
  if (value.mimeType !== 'image/png' && value.mimeType !== 'image/webp' && value.mimeType !== 'image/jpeg') {
    throw new Error('Native visual bytes response contains an unsupported MIME type.');
  }
  if (!value.bytes.every((byte) => Number.isInteger(byte) && byte >= 0 && byte <= 255)) {
    throw new Error('Native visual bytes response contains invalid byte values.');
  }
  return { bytes: Uint8Array.from(value.bytes), mimeType: value.mimeType };
}

export const tauriVisualAssetGateway: VisualAssetGateway = {
  async chooseImageFile() {
    const selected = await open({
      directory: false,
      multiple: false,
      title: 'Import visual asset',
      filters: [{ name: 'Images', extensions: ['png', 'webp', 'jpg', 'jpeg'] }],
    });
    return typeof selected === 'string' ? selected : null;
  },

  async importVisualAsset(projectRoot, sourcePath, subjectId, visualKind, spriteFraming) {
    if (!projectRoot.trim()) throw new Error('An open project is required before importing a visual asset.');
    const framing = visualKind === 'character_sprite'
      ? parseSpriteFraming(spriteFraming)
      : undefined;
    if (visualKind === 'location_background' && spriteFraming !== undefined) {
      throw new Error('Location background import must not include sprite framing.');
    }
    const result = await invoke<unknown>('import_visual_asset', {
      projectRoot,
      sourcePath,
      subjectId,
      visualKind,
      spriteFraming: framing,
    });
    return decodeImportedVisualAsset(result, subjectId, visualKind);
  },

  async resolveVisualAsset(projectRoot, subjectId, visualKind) {
    const result = await invoke<unknown>('resolve_visual_asset', { projectRoot, subjectId, visualKind });
    return result === null ? null : decodeImportedVisualAsset(result, subjectId, visualKind);
  },

  async readVisualAsset(projectRoot, projectPath) {
    return decodeVisualBytes(await invoke<unknown>('read_visual_asset', { projectRoot, projectPath }));
  },

  async removeVisualAsset(projectRoot, subjectId, visualKind) {
    await invoke('remove_visual_asset', { projectRoot, subjectId, visualKind });
  },
};
