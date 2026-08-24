import { beforeEach, describe, expect, it, vi } from 'vitest';

const { invokeMock, dialogOpenMock } = vi.hoisted(() => ({
  invokeMock: vi.fn(),
  dialogOpenMock: vi.fn(),
}));

vi.mock('@tauri-apps/api/core', () => ({ invoke: invokeMock }));
vi.mock('@tauri-apps/plugin-dialog', () => ({ open: dialogOpenMock }));

import { tauriVisualAssetGateway } from '../src/platform/tauriVisualAssetGateway';

const hash = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function characterAsset() {
  return {
    subjectId: 'character.maria',
    visualKind: 'character_sprite',
    projectPath: 'assets/imported/characters/character_maria-0123456789ab.png',
    contentSha256: hash,
    mimeType: 'image/png',
    extension: 'png',
    assetIdentity: { schema_id: 'aigs.asset_identity.definition', id: 'asset_identity.character_maria' },
    variant: {
      schema_id: 'aigs.asset_variant.record',
      variant_id: 'asset_variant.character_maria.0123456789ab',
      presentation: { sprite_framing: 'full_body' },
    },
  };
}

describe('tauri visual asset gateway', () => {
  beforeEach(() => {
    invokeMock.mockReset();
    dialogOpenMock.mockReset();
  });

  it('maps the image picker and cancellation without native mutation', async () => {
    dialogOpenMock.mockResolvedValueOnce('C:\\Art\\maria.png');
    await expect(tauriVisualAssetGateway.chooseImageFile()).resolves.toBe('C:\\Art\\maria.png');
    expect(dialogOpenMock).toHaveBeenCalledWith({
      directory: false,
      multiple: false,
      title: 'Import visual asset',
      filters: [{ name: 'Images', extensions: ['png', 'webp', 'jpg', 'jpeg'] }],
    });

    dialogOpenMock.mockResolvedValueOnce(null);
    await expect(tauriVisualAssetGateway.chooseImageFile()).resolves.toBeNull();
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it('invokes character import with only validated enum values', async () => {
    invokeMock.mockResolvedValueOnce(characterAsset());

    const result = await tauriVisualAssetGateway.importVisualAsset(
      'C:\\Games\\Us', 'C:\\Art\\maria.png', 'character.maria', 'character_sprite', 'full_body',
    );

    expect(result.projectPath).toBe('assets/imported/characters/character_maria-0123456789ab.png');
    expect(invokeMock).toHaveBeenCalledWith('import_visual_asset', {
      projectRoot: 'C:\\Games\\Us',
      sourcePath: 'C:\\Art\\maria.png',
      subjectId: 'character.maria',
      visualKind: 'character_sprite',
      spriteFraming: 'full_body',
    });
  });

  it('rejects invalid framing before native invocation', async () => {
    await expect(tauriVisualAssetGateway.importVisualAsset(
      'C:\\Games\\Us', 'C:\\Art\\maria.png', 'character.maria', 'character_sprite', 'portrait' as never,
    )).rejects.toThrow(/sprite framing/i);
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it('rejects unsafe native import responses', async () => {
    invokeMock.mockResolvedValueOnce({ ...characterAsset(), projectPath: '../outside.png' });
    await expect(tauriVisualAssetGateway.importVisualAsset(
      'C:\\Games\\Us', 'C:\\Art\\maria.png', 'character.maria', 'character_sprite', 'full_body',
    )).rejects.toThrow(/unsafe project path/i);
  });

  it('resolves, reads, and removes through narrow native commands', async () => {
    invokeMock.mockResolvedValueOnce(characterAsset());
    await expect(tauriVisualAssetGateway.resolveVisualAsset(
      'C:\\Games\\Us', 'character.maria', 'character_sprite',
    )).resolves.toMatchObject({ subjectId: 'character.maria' });

    invokeMock.mockResolvedValueOnce({ bytes: [137, 80, 78, 71], mimeType: 'image/png' });
    const binary = await tauriVisualAssetGateway.readVisualAsset(
      'C:\\Games\\Us', 'assets/imported/characters/character_maria-0123456789ab.png',
    );
    expect([...binary.bytes]).toEqual([137, 80, 78, 71]);

    invokeMock.mockResolvedValueOnce(null);
    await tauriVisualAssetGateway.removeVisualAsset('C:\\Games\\Us', 'character.maria', 'character_sprite');
    expect(invokeMock).toHaveBeenLastCalledWith('remove_visual_asset', {
      projectRoot: 'C:\\Games\\Us', subjectId: 'character.maria', visualKind: 'character_sprite',
    });
  });
});
