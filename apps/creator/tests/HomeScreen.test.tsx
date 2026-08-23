import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBlankProject } from '../src/domain/blankProject';
import type { ProjectSnapshot } from '../src/domain/projectTypes';
import type { ProjectGateway } from '../src/platform/ProjectGateway';
import { RECENT_PROJECTS_STORAGE_KEY } from '../src/state/recentProjects';

class InMemoryProjectGateway implements ProjectGateway {
  parentDirectory: string | null = 'C:\\Games';
  projectDirectory: string | null = 'C:\\Games\\Existing Game';
  readonly projects = new Map<string, ProjectSnapshot>();
  createError: unknown = null;
  openError: unknown = null;
  saveError: unknown = null;
  readonly createdFolderNames: string[] = [];
  saveAttempts = 0;

  async chooseParentDirectory(): Promise<string | null> {
    return this.parentDirectory;
  }

  async chooseProjectDirectory(): Promise<string | null> {
    return this.projectDirectory;
  }

  async createProject(parentDir: string, folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    if (this.createError) {
      throw this.createError;
    }
    this.createdFolderNames.push(folderName);
    const rootPath = `${parentDir}\\${folderName}`;
    const persisted = { ...snapshot, rootPath, dirty: false };
    this.projects.set(rootPath, persisted);
    return persisted;
  }

  async openProject(projectDir: string): Promise<ProjectSnapshot> {
    if (this.openError) {
      throw this.openError;
    }
    if (!this.projects.has(projectDir)) {
      throw new Error('Project not found.');
    }
    return this.projects.get(projectDir) as ProjectSnapshot;
  }

  async saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    this.saveAttempts += 1;
    if (this.saveError) {
      throw this.saveError;
    }
    if (!snapshot.rootPath) {
      throw new Error('Project root is required.');
    }
    const persisted = { ...snapshot, dirty: false };
    this.projects.set(snapshot.rootPath, persisted);
    return persisted;
  }
}

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  let reject: (reason?: unknown) => void = () => undefined;
  const promise = new Promise<T>((next, fail) => {
    resolve = next;
    reject = fail;
  });
  return { promise, reject, resolve };
}

class DeferredDirectoryGateway extends InMemoryProjectGateway {
  readonly directory = deferred<string | null>();
  chooseProjectDirectoryCalls = 0;

  override async chooseProjectDirectory(): Promise<string | null> {
    this.chooseProjectDirectoryCalls += 1;
    return this.directory.promise;
  }
}

class DeferredCreateGateway extends InMemoryProjectGateway {
  readonly creation = deferred<ProjectSnapshot>();
  createProjectCalls = 0;

  override async createProject(parentDir: string, folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    this.createProjectCalls += 1;
    this.createdFolderNames.push(folderName);
    return this.creation.promise;
  }
}

function renderApp(gateway = new InMemoryProjectGateway()) {
  render(<App gateway={gateway} />);
  return gateway;
}

describe('Home screen project flow', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a blank local project and opens the dashboard', async () => {
    const gateway = renderApp();

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'First Game' } });
    fireEvent.change(screen.getByLabelText('Premise'), { target: { value: 'A family drama' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Project' }));

    expect(await screen.findByRole('heading', { name: 'First Game' })).toBeInTheDocument();
    expect(screen.getByText('A family drama')).toBeInTheDocument();
    expect(screen.getByText('Validation: Valid')).toBeInTheDocument();
    expect(gateway.projects.get('C:\\Games\\first_game')?.manifest.extensions?.['aigs.creator']).toEqual({
      premise: 'A family drama',
      template_id: 'blank',
    });
    expect(screen.queryByLabelText(/template/i)).not.toBeInTheDocument();
  });

  it('uses an ID-safe folder name while preserving the project display name', async () => {
    const gateway = renderApp();

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Episode 1/Finale. ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Project' }));

    expect(await screen.findByRole('heading', { name: 'Episode 1/Finale.' })).toBeInTheDocument();
    expect(gateway.createdFolderNames).toEqual(['episode_1_finale']);
    expect(gateway.projects.get('C:\\Games\\episode_1_finale')?.manifest.display_name).toBe('Episode 1/Finale.');
  });

  it('bounds a long project folder basename without truncating the display name', async () => {
    const gateway = renderApp();
    const displayName = `Episode ${'a'.repeat(300)}`;

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: displayName } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Project' }));

    expect(await screen.findByRole('heading', { name: displayName })).toBeInTheDocument();
    expect(gateway.createdFolderNames).toEqual([`episode_${'a'.repeat(232)}`]);
    expect(gateway.createdFolderNames[0]).toHaveLength(240);
    expect(gateway.projects.get(`C:\\Games\\${gateway.createdFolderNames[0]}`)?.manifest.display_name).toBe(displayName);
  });

  it('opens an existing project selected through the gateway and records it as recent', async () => {
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set('C:\\Games\\Existing Game', {
      ...createBlankProject({ displayName: 'Existing Game', premise: 'Already written.' }),
      rootPath: 'C:\\Games\\Existing Game',
    });
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    expect(await screen.findByRole('heading', { name: 'Existing Game' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(RECENT_PROJECTS_STORAGE_KEY) ?? '[]')).toEqual([{
      path: 'C:\\Games\\Existing Game',
      displayName: 'Existing Game',
      lastOpenedAt: expect.any(Number),
    }]);
  });

  it('does nothing when a project directory dialog is cancelled', async () => {
    const gateway = new InMemoryProjectGateway();
    gateway.projectDirectory = null;
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    await waitFor(() => expect(screen.getByRole('heading', { name: 'AI Game Studio' })).toBeInTheDocument());
    expect(screen.queryByText('Project not found.')).not.toBeInTheDocument();
  });

  it('keeps useful native string errors but redacts unknown error shapes', async () => {
    const gateway = new InMemoryProjectGateway();
    gateway.openError = new Error('The project manifest is unavailable.');
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('The project manifest is unavailable.');

    cleanup();
    gateway.openError = 'The selected project is locked.';
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('The selected project is locked.');

    cleanup();
    gateway.openError = { api_key: 'do-not-display-this-secret' };
    renderApp(gateway);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Project operation failed.');
    expect(error).not.toHaveTextContent('do-not-display-this-secret');
  });

  it('makes picker and project actions unavailable for a pending open and suppresses duplicates', async () => {
    const gateway = new DeferredDirectoryGateway();
    gateway.projects.set('C:\\Games\\Slow Project', {
      ...createBlankProject({ displayName: 'Slow Project', premise: '' }),
      rootPath: 'C:\\Games\\Slow Project',
    });
    renderApp(gateway);

    const open = screen.getByRole('button', { name: 'Open Project' });
    fireEvent.click(open);
    fireEvent.click(open);

    expect(gateway.chooseProjectDirectoryCalls).toBe(1);
    expect(open).toBeDisabled();
    expect(screen.getByRole('button', { name: 'New Project' })).toBeDisabled();

    gateway.directory.resolve('C:\\Games\\Slow Project');
    expect(await screen.findByRole('heading', { name: 'Slow Project' })).toBeInTheDocument();
  });

  it('opens New Project as a modal dialog and restores trigger focus after cancellation', async () => {
    renderApp();
    const trigger = screen.getByRole('button', { name: 'New Project' });
    trigger.focus();

    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'New Project' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog', { name: 'New Project' })).not.toBeInTheDocument();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it('keeps a pending creation dialog open through Escape and restores controls after its error', async () => {
    const gateway = new DeferredCreateGateway();
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Pending Error' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Project' }));

    const dialog = screen.getByRole('dialog', { name: 'New Project' });
    expect(await screen.findByRole('button', { name: 'Creating…' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Open Project' })).toBeDisabled();
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(screen.getByRole('dialog', { name: 'New Project' })).toBeInTheDocument();

    gateway.creation.reject(new Error('Project folder is unavailable.'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Project folder is unavailable.');
    expect(screen.getByRole('dialog', { name: 'New Project' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Create Project' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Open Project' })).toBeEnabled();
  });

  it('renders a malformed open error without crashing or discarding an existing project', async () => {
    const gateway = new InMemoryProjectGateway();
    const opened = {
      ...createBlankProject({ displayName: 'Keep Editing', premise: '' }),
      rootPath: 'C:\\Games\\Keep Editing',
    };
    gateway.projects.set('C:\\Games\\Keep Editing', opened);
    gateway.projectDirectory = 'C:\\Games\\Keep Editing';
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    expect(await screen.findByRole('heading', { name: 'Keep Editing' })).toBeInTheDocument();

    gateway.projectDirectory = 'C:\\Games\\Malformed';
    gateway.projects.set('C:\\Games\\Malformed', null as unknown as ProjectSnapshot);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Project snapshot must be an object.');
    expect(screen.getByRole('heading', { name: 'Keep Editing' })).toBeInTheDocument();
  });

  it('rejects malformed stored-definition envelopes without crashing or discarding an existing project', async () => {
    const gateway = new InMemoryProjectGateway();
    const opened = {
      ...createBlankProject({ displayName: 'Envelope Guard', premise: '' }),
      rootPath: 'C:\\Games\\Envelope Guard',
    };
    gateway.projects.set('C:\\Games\\Envelope Guard', opened);
    gateway.projectDirectory = 'C:\\Games\\Envelope Guard';
    renderApp(gateway);

    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    expect(await screen.findByRole('heading', { name: 'Envelope Guard' })).toBeInTheDocument();

    gateway.projectDirectory = 'C:\\Games\\Malformed Envelope';
    gateway.projects.set('C:\\Games\\Malformed Envelope', {
      ...opened,
      definitions: [null as unknown as ProjectSnapshot['definitions'][number]],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Project snapshot contains an invalid stored definition.');
    expect(screen.getByRole('heading', { name: 'Envelope Guard' })).toBeInTheDocument();
  });
});
