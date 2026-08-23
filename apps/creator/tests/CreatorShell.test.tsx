import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBlankProject } from '../src/domain/blankProject';
import type { ProjectSnapshot } from '../src/domain/projectTypes';
import type { ProjectGateway } from '../src/platform/ProjectGateway';

class InMemoryProjectGateway implements ProjectGateway {
  projectDirectory = 'C:\\Games\\Creator Test';
  readonly projects = new Map<string, ProjectSnapshot>();
  saveAttempts = 0;
  saveError: Error | null = null;
  saveResult: ProjectSnapshot | null = null;

  async chooseParentDirectory(): Promise<string | null> { return 'C:\\Games'; }
  async chooseProjectDirectory(): Promise<string | null> { return this.projectDirectory; }
  async createProject(parentDir: string, folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    const project = { ...snapshot, rootPath: `${parentDir}\\${folderName}`, dirty: false };
    this.projects.set(project.rootPath!, project);
    return project;
  }
  async openProject(projectDir: string): Promise<ProjectSnapshot> {
    const project = this.projects.get(projectDir);
    if (!project) throw new Error('Project not found.');
    return project;
  }
  async saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    this.saveAttempts += 1;
    if (this.saveError) throw this.saveError;
    if (this.saveResult) return this.saveResult;
    const saved = { ...snapshot, dirty: false };
    this.projects.set(snapshot.rootPath!, saved);
    return saved;
  }
}

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((next) => { resolve = next; });
  return { promise, resolve };
}

class DeferredSaveGateway extends InMemoryProjectGateway {
  readonly saved = deferred<ProjectSnapshot>();
  saveProjectCalls = 0;
  openProjectCalls = 0;

  override async openProject(projectDir: string): Promise<ProjectSnapshot> {
    this.openProjectCalls += 1;
    return super.openProject(projectDir);
  }

  override async saveProject(): Promise<ProjectSnapshot> {
    this.saveProjectCalls += 1;
    return this.saved.promise;
  }
}

function renderOpenCreator(project: ProjectSnapshot) {
  const gateway = new InMemoryProjectGateway();
  gateway.projects.set(gateway.projectDirectory, project);
  render(<App gateway={gateway} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
  return gateway;
}

describe('Creator shell', () => {
  afterEach(cleanup);

  it('does not expose a nonfunctional Play action and keeps future workspaces disabled', async () => {
    await renderOpenCreator({
      ...createBlankProject({ displayName: 'Shell Test', premise: '' }),
      rootPath: 'C:\\Games\\Creator Test',
    });

    expect(await screen.findByRole('heading', { name: 'Shell Test' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Play' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Characters' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Locations' })).toBeEnabled();
    for (const name of ['Dialogue', 'Events', 'Assets', 'Copilot', 'Debug']) {
      expect(screen.getByRole('button', { name })).toBeDisabled();
    }
    expect(screen.getByText('Runtime: Not included in Creator Foundation')).toBeInTheDocument();
    expect(screen.getByText('Playtest arrives in Slice 2')).toBeInTheDocument();
  });

  it('saves a dirty valid project and clears its unsaved status', async () => {
    const gateway = renderOpenCreator({
      ...createBlankProject({ displayName: 'Save Me', premise: '' }),
      rootPath: 'C:\\Games\\Creator Test',
      dirty: true,
    });

    expect(await screen.findByText('Unsaved')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('Saved')).toBeInTheDocument();
    expect(gateway.saveAttempts).toBe(1);
  });

  it('blocks invalid saves, displays issues, and leaves the dashboard available', async () => {
    const invalid = createBlankProject({ displayName: 'Broken Save', premise: '' });
    const gateway = renderOpenCreator({
      ...invalid,
      rootPath: 'C:\\Games\\Creator Test',
      dirty: true,
      definitions: [{
        collection: 'locations',
        document: {
          schema_id: 'aigs.location.definition',
          schema_version: 1,
          id: 'location.hall',
          kind: 'location',
          display_name: 'Hall',
          child_location_refs: [{ ref: 'location.missing' }],
        },
      }],
    });

    expect(await screen.findByText('Validation: Invalid')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('alert')).toHaveTextContent('/definitions/0/document/child_location_refs/0');
    expect(screen.getByRole('alert')).toHaveTextContent('REFERENCE_NOT_FOUND');
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeEnabled();
    expect(gateway.saveAttempts).toBe(0);
  });

  it('shows a save operation error and keeps the project open', async () => {
    const gateway = renderOpenCreator({
      ...createBlankProject({ displayName: 'Disk Problem', premise: '' }),
      rootPath: 'C:\\Games\\Creator Test',
      dirty: true,
    });
    expect(await screen.findByRole('heading', { name: 'Disk Problem' })).toBeInTheDocument();
    gateway.saveError = new Error('Disk is unavailable.');

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Disk is unavailable.');
    expect(screen.getByRole('heading', { name: 'Disk Problem' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled());
  });

  it('rejects malformed save envelopes without crashing or discarding the open project', async () => {
    const gateway = renderOpenCreator({
      ...createBlankProject({ displayName: 'Guarded Save', premise: '' }),
      rootPath: 'C:\\Games\\Creator Test',
      dirty: true,
    });
    expect(await screen.findByRole('heading', { name: 'Guarded Save' })).toBeInTheDocument();
    gateway.saveResult = {
      ...createBlankProject({ displayName: 'Ignored Result', premise: '' }),
      rootPath: 'C:\\Games\\Creator Test',
      definitions: [{ collection: 'characters', document: null as unknown as Record<string, unknown> & { schema_id: string; id: string; display_name: string } }],
    };

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Project snapshot contains an invalid stored definition.');
    expect(screen.getByRole('heading', { name: 'Guarded Save' })).toBeInTheDocument();
  });

  it('suppresses shell Open while a deferred Save is pending and restores both actions after completion', async () => {
    const gateway = new DeferredSaveGateway();
    const project = {
      ...createBlankProject({ displayName: 'Deferred Save', premise: '' }),
      rootPath: 'C:\\Games\\Creator Test',
      dirty: true,
    };
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    expect(await screen.findByRole('heading', { name: 'Deferred Save' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
    const open = screen.getByRole('button', { name: 'Open Project' });
    expect(open).toBeDisabled();
    fireEvent.click(open);
    expect(gateway.openProjectCalls).toBe(1);

    gateway.saved.resolve({ ...project, dirty: false });
    expect(await screen.findByText('Saved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open Project' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
  });
});
