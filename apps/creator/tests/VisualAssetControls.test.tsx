import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VisualAssetControls } from '../src/components/VisualAssetControls';
import type { ImportedVisualAsset } from '../src/domain/assetImport';
import type { VisualAssetGateway } from '../src/platform/VisualAssetGateway';

const hash = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const asset: ImportedVisualAsset = {
  subjectId: 'character.maria',
  visualKind: 'character_sprite',
  projectPath: 'assets/imported/characters/character_maria-0123456789ab.png',
  contentSha256: hash,
  mimeType: 'image/png',
  extension: 'png',
  assetIdentity: { id: 'asset_identity.character_maria' },
  variant: { presentation: { sprite_framing: 'two_thirds' } },
};

function gateway(overrides: Partial<VisualAssetGateway> = {}): VisualAssetGateway {
  return {
    chooseImageFile: vi.fn().mockResolvedValue('C:\\Art\\maria.png'),
    importVisualAsset: vi.fn().mockResolvedValue(asset),
    resolveVisualAsset: vi.fn().mockResolvedValue(null),
    readVisualAsset: vi.fn().mockResolvedValue({ bytes: Uint8Array.from([137, 80, 78, 71]), mimeType: 'image/png' }),
    removeVisualAsset: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('VisualAssetControls', () => {
  it('saves before import, sends selected framing, reloads, and shows preview metadata', async () => {
    const user = userEvent.setup();
    const visualGateway = gateway({
      resolveVisualAsset: vi.fn().mockResolvedValueOnce(null).mockResolvedValue(asset),
    });
    const onEnsureSaved = vi.fn().mockResolvedValue(true);
    const onProjectReload = vi.fn().mockResolvedValue(undefined);

    render(<VisualAssetControls
      busy={false}
      gateway={visualGateway}
      onEnsureSaved={onEnsureSaved}
      onProjectReload={onProjectReload}
      projectRoot="C:\\Games\\Us"
      subjectId="character.maria"
      visualKind="character_sprite"
    />);

    await user.selectOptions(screen.getByLabelText('Sprite framing'), 'two_thirds');
    await user.click(screen.getByRole('button', { name: 'Import Visual' }));

    await waitFor(() => expect(visualGateway.importVisualAsset).toHaveBeenCalledWith(
      'C:\\Games\\Us', 'C:\\Art\\maria.png', 'character.maria', 'character_sprite', 'two_thirds',
    ));
    expect(onEnsureSaved).toHaveBeenCalledBefore(visualGateway.importVisualAsset as ReturnType<typeof vi.fn>);
    expect(onProjectReload).toHaveBeenCalled();
    expect(await screen.findByText(asset.projectPath)).toBeInTheDocument();
    expect(screen.getByAltText('character.maria imported visual preview')).toHaveAttribute('src', expect.stringMatching(/^data:image\/png;base64,/));
  });

  it('does not mutate when save preparation fails', async () => {
    const user = userEvent.setup();
    const visualGateway = gateway();
    render(<VisualAssetControls
      busy={false}
      gateway={visualGateway}
      onEnsureSaved={vi.fn().mockResolvedValue(false)}
      onProjectReload={vi.fn()}
      projectRoot="C:\\Games\\Us"
      subjectId="character.maria"
      visualKind="character_sprite"
    />);

    await user.click(screen.getByRole('button', { name: 'Import Visual' }));
    await waitFor(() => expect(visualGateway.chooseImageFile).toHaveBeenCalled());
    expect(visualGateway.importVisualAsset).not.toHaveBeenCalled();
  });

  it('removes an existing visual only after ensuring the project is saved', async () => {
    const user = userEvent.setup();
    const visualGateway = gateway({ resolveVisualAsset: vi.fn().mockResolvedValue(asset) });
    const onEnsureSaved = vi.fn().mockResolvedValue(true);
    const onProjectReload = vi.fn().mockResolvedValue(undefined);

    render(<VisualAssetControls
      busy={false}
      gateway={visualGateway}
      onEnsureSaved={onEnsureSaved}
      onProjectReload={onProjectReload}
      projectRoot="C:\\Games\\Us"
      subjectId="character.maria"
      visualKind="character_sprite"
    />);

    await user.click(await screen.findByRole('button', { name: 'Remove Visual' }));
    await waitFor(() => expect(visualGateway.removeVisualAsset).toHaveBeenCalledWith(
      'C:\\Games\\Us', 'character.maria', 'character_sprite',
    ));
    expect(onProjectReload).toHaveBeenCalled();
  });
});
