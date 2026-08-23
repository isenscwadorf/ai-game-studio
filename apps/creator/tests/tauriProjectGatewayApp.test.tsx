import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';
import { createBlankProject } from '../src/domain/blankProject';

const { invokeMock, dialogOpenMock } = vi.hoisted(() => ({
  invokeMock: vi.fn(),
  dialogOpenMock: vi.fn(),
}));

vi.mock('@tauri-apps/api/core', () => ({ invoke: invokeMock }));
vi.mock('@tauri-apps/plugin-dialog', () => ({ open: dialogOpenMock }));

import { tauriProjectGateway } from '../src/platform/tauriProjectGateway';

describe('Tauri project gateway and App integration', () => {
  afterEach(cleanup);

  beforeEach(() => {
    invokeMock.mockReset();
    dialogOpenMock.mockReset();
    localStorage.clear();
  });

  it('opens an envelope-safe project with a dangling reference so the user can repair and save it', async () => {
    const manifest = createBlankProject({ displayName: 'Repairable Native Project', premise: '' }).manifest;
    const invalidLocation = {
      schema_id: 'aigs.location.definition',
      schema_version: 1,
      id: 'location.hall',
      kind: 'location',
      display_name: 'Hall',
      description: '',
      tags: [],
      child_location_refs: [{ ref: 'location.missing' }],
    };
    dialogOpenMock.mockResolvedValueOnce('C:\\Games\\Repairable');
    invokeMock.mockImplementation(async (command: string, args: { payload?: unknown }) => {
      if (command === 'open_project') {
        return { manifest, characters: [], locations: [invalidLocation] };
      }
      if (command === 'save_project') {
        return args.payload;
      }
      throw new Error(`Unexpected native command: ${command}`);
    });

    render(<App gateway={tauriProjectGateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    expect(await screen.findByRole('heading', { name: 'Repairable Native Project' })).toBeInTheDocument();
    expect(screen.getByText('Validation: Invalid')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('REFERENCE_NOT_FOUND');

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(invokeMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: /Hall/ }));
    fireEvent.change(screen.getByLabelText('Child locations'));
    expect(screen.getByText('Validation: Valid')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(invokeMock).toHaveBeenCalledTimes(2));
    expect(invokeMock).toHaveBeenLastCalledWith('save_project', {
      projectDir: 'C:\\Games\\Repairable',
      payload: {
        manifest,
        characters: [],
        locations: [{ ...invalidLocation, child_location_refs: [] }],
      },
    });
  });

  it('renders primitive fallbacks for invalid native manifest metadata without leaking raw values', async () => {
    const baseManifest = createBlankProject({ displayName: 'Unsafe native project', premise: '' }).manifest;
    const invalidManifest = {
      ...baseManifest,
      display_name: { untrusted_name_key: 'untrusted-name-value' },
      extensions: {
        'aigs.creator': { premise: ['untrusted-premise-value'] },
      },
    };
    dialogOpenMock.mockResolvedValueOnce('C:\\Games\\Unsafe');
    invokeMock.mockResolvedValueOnce({ manifest: invalidManifest, characters: [], locations: [] });

    render(<App gateway={tauriProjectGateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    expect(await screen.findByRole('heading', { name: 'Untitled project' })).toBeInTheDocument();
    expect(screen.getByText('No premise provided.')).toBeInTheDocument();
    expect(screen.getByText('Validation: Invalid')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('/manifest/display_name');
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(invokeMock).toHaveBeenCalledTimes(1);

    const renderedText = document.body.textContent ?? '';
    expect(renderedText).not.toContain('untrusted_name_key');
    expect(renderedText).not.toContain('untrusted-name-value');
    expect(renderedText).not.toContain('untrusted-premise-value');
  });
});
