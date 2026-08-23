import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBlankProject } from '../src/domain/blankProject';
import type { ProjectSnapshot } from '../src/domain/projectTypes';
import type { ProjectGateway } from '../src/platform/ProjectGateway';

class TransitionProjectGateway implements ProjectGateway {
  projectDirectory: string | null = null;
  readonly projects = new Map<string, ProjectSnapshot>();
  chooseProjectDirectoryCalls = 0;
  openProjectCalls = 0;
  saveAttempts = 0;
  saveError: Error | null = null;

  async chooseParentDirectory(): Promise<string | null> { return 'C:\\Games'; }

  async chooseProjectDirectory(): Promise<string | null> {
    this.chooseProjectDirectoryCalls += 1;
    return this.projectDirectory;
  }

  async createProject(_parentDir: string, _folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    return snapshot;
  }

  async openProject(projectDir: string): Promise<ProjectSnapshot> {
    this.openProjectCalls += 1;
    const project = this.projects.get(projectDir);
    if (!project) throw new Error('Project not found.');
    return project;
  }

  async saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    this.saveAttempts += 1;
    if (this.saveError) throw this.saveError;
    const saved = { ...snapshot, dirty: false };
    this.projects.set(snapshot.rootPath!, saved);
    return saved;
  }
}

class FakeWindowGateway {
  closeHandler: (() => void) | null = null;
  forceCloseCalls = 0;

  async onCloseRequested(handler: () => void): Promise<() => void> {
    this.closeHandler = handler;
    return () => {
      if (this.closeHandler === handler) this.closeHandler = null;
    };
  }

  async forceClose(): Promise<void> {
    this.forceCloseCalls += 1;
  }

  requestClose(): void {
    if (!this.closeHandler) throw new Error('Close listener is not registered.');
    this.closeHandler();
  }
}

const currentPath = 'C:\\Games\\Current';
const replacementPath = 'C:\\Games\\Replacement';

function project(displayName: string, rootPath: string, dirty: boolean): ProjectSnapshot {
  return { ...createBlankProject({ displayName, premise: '' }), rootPath, dirty };
}

async function renderCurrentProject(current: ProjectSnapshot) {
  const gateway = new TransitionProjectGateway();
  const windowGateway = new FakeWindowGateway();
  gateway.projects.set(currentPath, current);
  gateway.projects.set(replacementPath, project('Replacement', replacementPath, false));
  gateway.projectDirectory = currentPath;
  render(<App gateway={gateway} windowGateway={windowGateway} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
  expect(await screen.findByRole('heading', { name: current.manifest.display_name })).toBeInTheDocument();
  gateway.projectDirectory = replacementPath;
  await waitFor(() => expect(windowGateway.closeHandler).not.toBeNull());
  await waitFor(() => expect(screen.getByRole('button', { name: 'Open Project' })).toBeEnabled());
  return { gateway, windowGateway };
}

function transitionDialog() {
  return screen.getByRole('dialog', { name: 'Unsaved changes' });
}

function requestWindowClose(windowGateway: FakeWindowGateway) {
  act(() => windowGateway.requestClose());
}

describe('dirty project transitions', () => {
  afterEach(cleanup);

  it('cancels Open without showing the picker or replacing the dirty project', async () => {
    const { gateway } = await renderCurrentProject(project('Current', currentPath, true));

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    const dialog = transitionDialog();
    expect(gateway.chooseProjectDirectoryCalls).toBe(1);
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog', { name: 'Unsaved changes' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Current' })).toBeInTheDocument();
    expect(screen.getByText('Unsaved')).toBeInTheDocument();
    expect(gateway.openProjectCalls).toBe(1);
  });

  it('discards the dirty snapshot and continues Open exactly once', async () => {
    const { gateway } = await renderCurrentProject(project('Current', currentPath, true));

    const open = screen.getByRole('button', { name: 'Open Project' });
    fireEvent.click(open);
    fireEvent.click(open);
    expect(screen.getAllByRole('dialog', { name: 'Unsaved changes' })).toHaveLength(1);
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Discard' }));

    expect(await screen.findByRole('heading', { name: 'Replacement' })).toBeInTheDocument();
    expect(gateway.chooseProjectDirectoryCalls).toBe(2);
    expect(gateway.openProjectCalls).toBe(2);
    expect(gateway.saveAttempts).toBe(0);
  });

  it('saves successfully before continuing Open', async () => {
    const { gateway } = await renderCurrentProject(project('Current', currentPath, true));

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Save' }));

    expect(await screen.findByRole('heading', { name: 'Replacement' })).toBeInTheDocument();
    expect(gateway.saveAttempts).toBe(1);
    expect(gateway.openProjectCalls).toBe(2);
  });

  it('keeps the dirty project and Open dialog when Save fails', async () => {
    const { gateway } = await renderCurrentProject(project('Current', currentPath, true));
    gateway.saveError = new Error('Disk is unavailable.');

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Save' }));

    expect(await within(transitionDialog()).findByRole('alert')).toHaveTextContent('Disk is unavailable.');
    expect(screen.getByRole('heading', { name: 'Current' })).toBeInTheDocument();
    expect(gateway.saveAttempts).toBe(1);
    expect(gateway.openProjectCalls).toBe(1);
  });

  it('keeps the invalid dirty project and Open dialog when validation blocks Save', async () => {
    const invalid = project('Invalid Current', currentPath, true);
    invalid.definitions = [{
      collection: 'locations',
      document: {
        schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.hall', kind: 'location', display_name: 'Hall',
        child_location_refs: [{ ref: 'location.missing' }],
      },
    }];
    const { gateway } = await renderCurrentProject(invalid);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Save' }));

    expect(transitionDialog()).toBeInTheDocument();
    expect(within(transitionDialog()).getByRole('alert')).toHaveTextContent('validation issues');
    expect(screen.getByRole('heading', { name: 'Invalid Current' })).toBeInTheDocument();
    expect(gateway.saveAttempts).toBe(0);
    expect(gateway.openProjectCalls).toBe(1);
  });

  it('force-closes a clean project without opening the guard', async () => {
    const { windowGateway } = await renderCurrentProject(project('Clean Current', currentPath, false));

    requestWindowClose(windowGateway);

    await waitFor(() => expect(windowGateway.forceCloseCalls).toBe(1));
    expect(screen.queryByRole('dialog', { name: 'Unsaved changes' })).not.toBeInTheDocument();
  });

  it('supports Cancel then Discard for a dirty window close request', async () => {
    const { windowGateway } = await renderCurrentProject(project('Current', currentPath, true));

    requestWindowClose(windowGateway);
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Cancel' }));
    expect(windowGateway.forceCloseCalls).toBe(0);
    expect(screen.getByRole('heading', { name: 'Current' })).toBeInTheDocument();

    requestWindowClose(windowGateway);
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Discard' }));
    await waitFor(() => expect(windowGateway.forceCloseCalls).toBe(1));
  });

  it('saves successfully before force-closing a dirty window', async () => {
    const { gateway, windowGateway } = await renderCurrentProject(project('Current', currentPath, true));

    requestWindowClose(windowGateway);
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(windowGateway.forceCloseCalls).toBe(1));
    expect(gateway.saveAttempts).toBe(1);
  });

  it('keeps the window and close dialog when Save fails', async () => {
    const { gateway, windowGateway } = await renderCurrentProject(project('Current', currentPath, true));
    gateway.saveError = new Error('Cannot write project files.');

    requestWindowClose(windowGateway);
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Save' }));

    expect(await within(transitionDialog()).findByRole('alert')).toHaveTextContent('Cannot write project files.');
    expect(windowGateway.forceCloseCalls).toBe(0);
    expect(screen.getByRole('heading', { name: 'Current' })).toBeInTheDocument();
  });

  it('keeps the window and close dialog when validation blocks Save', async () => {
    const invalid = project('Invalid Current', currentPath, true);
    invalid.definitions = [{
      collection: 'locations',
      document: {
        schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.hall', kind: 'location', display_name: 'Hall',
        child_location_refs: [{ ref: 'location.missing' }],
      },
    }];
    const { gateway, windowGateway } = await renderCurrentProject(invalid);

    requestWindowClose(windowGateway);
    fireEvent.click(within(transitionDialog()).getByRole('button', { name: 'Save' }));

    expect(transitionDialog()).toBeInTheDocument();
    expect(within(transitionDialog()).getByRole('alert')).toHaveTextContent('validation issues');
    expect(windowGateway.forceCloseCalls).toBe(0);
    expect(gateway.saveAttempts).toBe(0);
  });
});
