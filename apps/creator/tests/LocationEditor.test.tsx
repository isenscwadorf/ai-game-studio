import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBlankProject } from '../src/domain/blankProject';
import { createLocationDefinition } from '../src/domain/locationFactory';
import type { ProjectSnapshot } from '../src/domain/projectTypes';
import { validateDocument } from '../src/domain/validation';
import type { ProjectGateway } from '../src/platform/ProjectGateway';

class InMemoryProjectGateway implements ProjectGateway {
  projectDirectory = 'C:\\Games\\Location Test';
  readonly projects = new Map<string, ProjectSnapshot>();
  savedSnapshot: ProjectSnapshot | null = null;
  saveAttempts = 0;

  async chooseParentDirectory(): Promise<string | null> { return 'C:\\Games'; }
  async chooseProjectDirectory(): Promise<string | null> { return this.projectDirectory; }
  async createProject(_parentDir: string, _folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot> { return snapshot; }
  async openProject(projectDir: string): Promise<ProjectSnapshot> {
    const project = this.projects.get(projectDir);
    if (!project) throw new Error('Project not found.');
    return project;
  }
  async saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    this.saveAttempts += 1;
    this.savedSnapshot = snapshot;
    return { ...snapshot, dirty: false };
  }
}

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((next) => { resolve = next; });
  return { promise, resolve };
}

class DeferredSaveGateway extends InMemoryProjectGateway {
  readonly saved = deferred<ProjectSnapshot>();

  override async saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot> {
    this.saveAttempts += 1;
    this.savedSnapshot = snapshot;
    return this.saved.promise;
  }
}

function renderLocationsWith(locationIds: string[]) {
  const project = createBlankProject({ displayName: 'Locations', premise: '' });
  project.rootPath = 'C:\\Games\\Location Test';
  project.definitions = locationIds.map((id) => ({
    collection: 'locations' as const,
    document: {
      schema_id: 'aigs.location.definition', schema_version: 1, id, kind: 'location',
      display_name: id.slice('location.'.length), description: '', tags: [], child_location_refs: [],
    },
  }));
  const gateway = new InMemoryProjectGateway();
  gateway.projects.set(gateway.projectDirectory, project);
  render(<App gateway={gateway} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
  return gateway;
}

describe('Location editor', () => {
  afterEach(() => document.body.replaceChildren());

  it('creates a logical location and stores child locations as DefinitionRefs', async () => {
    const user = userEvent.setup();
    const gateway = renderLocationsWith(['location.hall']);
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'New Location' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '  Kitchen  ' } });
    await user.selectOptions(screen.getByLabelText('Child locations'), ['location.hall']);
    fireEvent.click(screen.getByRole('button', { name: 'Add Location' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    const currentLocation = gateway.savedSnapshot?.definitions.find((definition) => definition.document.id === 'location.kitchen')?.document;
    expect(currentLocation).toMatchObject({
      schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.kitchen', kind: 'location',
      display_name: 'Kitchen', description: '', tags: [], child_location_refs: [{ ref: 'location.hall' }],
    });
    expect(currentLocation).not.toHaveProperty('x');
    expect(validateDocument('aigs.location.definition', currentLocation).valid).toBe(true);
  });

  it('creates an exact canonical Location document with collision-safe immutable IDs', async () => {
    const occupiedIds = new Set(['location.salle_d_ete', 'location.salle_d_ete_2']);
    const before = [...occupiedIds];
    expect(createLocationDefinition('  Salle d’été!  ', occupiedIds)).toEqual({
      schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.salle_d_ete_3', kind: 'location',
      display_name: 'Salle d’été!', description: '', tags: [], child_location_refs: [],
    });
    expect([...occupiedIds]).toEqual(before);

    const gateway = renderLocationsWith(['location.hall']);
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'New Location' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Hall' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Location' }));
    const name = screen.getByLabelText('Name');
    fireEvent.change(name, { target: { value: 'Great Hall' } });
    fireEvent.blur(name);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions.find((definition) => definition.document.id === 'location.hall_2')?.document)
      .toMatchObject({ id: 'location.hall_2', display_name: 'Great Hall' });
  });

  it('normalizes tags on blur and prevents a Location from selecting itself as a child', async () => {
    const user = userEvent.setup();
    const gateway = renderLocationsWith(['location.hall']);
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'New Location' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Kitchen' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Location' }));

    const tags = screen.getByLabelText('Tags (one per line)');
    await user.type(tags, ' Courtyard {enter}COURTYARD{enter}open-door{enter}not valid');
    expect(tags).toHaveValue(' Courtyard \nCOURTYARD\nopen-door\nnot valid');
    await user.tab();
    const childLocations = screen.getByLabelText('Child locations');
    expect(screen.queryByRole('option', { name: 'location.kitchen' })).not.toBeInTheDocument();
    await user.selectOptions(childLocations, ['location.hall']);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions.find((definition) => definition.document.id === 'location.kitchen')?.document)
      .toMatchObject({ tags: ['courtyard', 'open-door'], child_location_refs: [{ ref: 'location.hall' }] });
  });

  it('rejects an empty name candidate while retaining its draft and allowing a valid child-ref update', async () => {
    const user = userEvent.setup();
    const gateway = renderLocationsWith(['location.hall', 'location.kitchen']);
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'hall, ID location.hall' }));

    const name = screen.getByLabelText('Name');
    fireEvent.change(name, { target: { value: '' } });
    fireEvent.blur(name);
    expect(name).toHaveValue('');
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.queryByText('Location data is malformed and cannot be edited safely.')).not.toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('Child locations'), ['location.kitchen']);
    expect(name).toHaveValue('');
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled());

    const afterChildUpdate = gateway.savedSnapshot?.definitions.find((definition) => definition.document.id === 'location.hall')?.document;
    expect(afterChildUpdate).toMatchObject({ display_name: 'hall', child_location_refs: [{ ref: 'location.kitchen' }] });
    expect(validateDocument('aigs.location.definition', afterChildUpdate).valid).toBe(true);
    fireEvent.change(name, { target: { value: 'Restored Hall' } });
    fireEvent.blur(name);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions.find((definition) => definition.document.id === 'location.hall')?.document)
      .toMatchObject({ id: 'location.hall', display_name: 'Restored Hall', child_location_refs: [{ ref: 'location.kitchen' }] });
  });

  it('resets drafts when switching between individually valid duplicate-ID Location rows', async () => {
    const project = createBlankProject({ displayName: 'Duplicate location IDs', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    const first = { ...createLocationDefinition('Hall', new Set()), description: 'First entry.' };
    const second = { ...createLocationDefinition('Hall', new Set()), description: 'Second entry.' };
    project.definitions = [
      { collection: 'locations', document: first },
      { collection: 'locations', document: second },
    ];
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));

    const entries = screen.getAllByRole('button', { name: 'Hall, ID location.hall' });
    fireEvent.click(entries[0]);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Draft from first row' } });
    fireEvent.click(entries[1]);

    expect(screen.getByLabelText('Name')).toHaveValue('Hall');
    expect(screen.getByLabelText('Description')).toHaveValue('Second entry.');
  });

  it('disambiguates duplicate display names with visible immutable IDs and accessible names', async () => {
    const project = createBlankProject({ displayName: 'Duplicate location names', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    project.definitions = [
      { collection: 'locations', document: createLocationDefinition('Hall', new Set()) },
      { collection: 'locations', document: createLocationDefinition('Hall', new Set(['location.hall'])) },
    ];
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));

    expect(screen.getByRole('button', { name: 'Hall, ID location.hall' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hall, ID location.hall_2' })).toBeInTheDocument();
    expect(screen.getByText('location.hall')).toBeVisible();
    expect(screen.getByText('location.hall_2')).toBeVisible();
  });

  it('excludes schema-invalid loaded Location IDs from child-location options', async () => {
    const project = createBlankProject({ displayName: 'Invalid location options', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    project.definitions = [
      { collection: 'locations', document: createLocationDefinition('Hall', new Set()) },
      {
        collection: 'locations',
        document: {
          schema_id: 'aigs.location.definition', schema_version: 1, id: 'BAD ID', kind: 'location', display_name: 'Broken',
        } as unknown as ProjectSnapshot['definitions'][number]['document'],
      },
    ];
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hall, ID location.hall' }));

    expect(screen.queryByRole('option', { name: 'BAD ID' })).not.toBeInTheDocument();
  });

  it('uses canonical validation to establish the tag boundary', () => {
    const location = createLocationDefinition('Hall', new Set());
    expect(validateDocument('aigs.location.definition', { ...location, tags: ['courtyard', 'open-door'] }).valid).toBe(true);
    expect(validateDocument('aigs.location.definition', { ...location, tags: ['not valid'] }).valid).toBe(false);
  });

  it('preserves schema-valid extension data while editing Location fields', async () => {
    const project = createBlankProject({ displayName: 'Location extensions', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    const extension = { version: 3, future_flag: true, nested: { exact: ['keep', 'this'] } };
    project.definitions = [{
      collection: 'locations',
      document: { ...createLocationDefinition('Hall', new Set()), extensions: { 'com.example.future_location': extension } },
    }];
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hall, ID location.hall' }));
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A wide entrance.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions[0].document.extensions).toEqual({ 'com.example.future_location': extension });
  });

  it('shows envelope-safe malformed Location data without exposing mutation controls', async () => {
    const project = createBlankProject({ displayName: 'Malformed locations', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    project.definitions = [{
      collection: 'locations',
      document: {
        schema_id: 'aigs.location.definition', schema_version: 1, kind: 'location', display_name: 'No ID', tags: 'not-an-array',
      } as unknown as ProjectSnapshot['definitions'][number]['document'],
    }];
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'No ID, ID unavailable' }));

    expect(screen.getByText('Location data is malformed and cannot be edited safely.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Description')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete Location' })).not.toBeInTheDocument();
  });

  it('marks deletion dirty and lets whole-project validation block saving a dangling child ref', async () => {
    const project = createBlankProject({ displayName: 'Location deletion', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    project.definitions = [
      { collection: 'locations', document: { ...createLocationDefinition('Hall', new Set()), child_location_refs: [{ ref: 'location.kitchen' }] } },
      { collection: 'locations', document: createLocationDefinition('Kitchen', new Set(['location.hall'])) },
    ];
    const gateway = new InMemoryProjectGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'Kitchen, ID location.kitchen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete Location' }));

    expect(screen.getByText('Unsaved')).toBeInTheDocument();
    expect(screen.getByText('Validation: Invalid')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(gateway.saveAttempts).toBe(0);
  });

  it('gates Location mutation controls during a pending whole-project save', async () => {
    const project = createBlankProject({ displayName: 'Deferred location save', premise: '' });
    project.rootPath = 'C:\\Games\\Location Test';
    project.definitions = [{ collection: 'locations', document: createLocationDefinition('Hall', new Set()) }];
    const gateway = new DeferredSaveGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Locations' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hall, ID location.hall' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('button', { name: 'New Location' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Delete Location' })).toBeDisabled();
    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByLabelText('Description')).toBeDisabled();
    expect(screen.getByLabelText('Tags (one per line)')).toBeDisabled();
    expect(screen.getByLabelText('Child locations')).toBeDisabled();

    gateway.saved.resolve({ ...project, dirty: false });
    await waitFor(() => expect(screen.getByRole('button', { name: 'New Location' })).toBeEnabled());
    expect(screen.getByRole('button', { name: 'Delete Location' })).toBeEnabled();
    expect(screen.getByLabelText('Name')).toBeEnabled();
    expect(screen.getByLabelText('Description')).toBeEnabled();
    expect(screen.getByLabelText('Tags (one per line)')).toBeEnabled();
    expect(screen.getByLabelText('Child locations')).toBeEnabled();
  });
});
