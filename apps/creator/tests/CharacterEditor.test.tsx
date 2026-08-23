import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBlankProject } from '../src/domain/blankProject';
import { createCharacterDefinition } from '../src/domain/characterFactory';
import type { ProjectSnapshot } from '../src/domain/projectTypes';
import { validateDocument, validateProject } from '../src/domain/validation';
import type { ProjectGateway } from '../src/platform/ProjectGateway';

class InMemoryProjectGateway implements ProjectGateway {
  projectDirectory = 'C:\\Games\\Character Test';
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

function renderOpenCreator(project: ProjectSnapshot) {
  const gateway = new InMemoryProjectGateway();
  gateway.projects.set(gateway.projectDirectory, project);
  render(<App gateway={gateway} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
  return gateway;
}

describe('Character editor', () => {
  afterEach(() => document.body.replaceChildren());

  it('creates a collision-safe character and preserves its ID after a display-name rename', async () => {
    const project = createBlankProject({ displayName: 'Characters', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [{ collection: 'characters', document: createCharacterDefinition('Sarah', new Set()) }];
    const gateway = renderOpenCreator(project);

    const characters = await screen.findByRole('button', { name: 'Characters' });
    expect(characters).toBeEnabled();
    fireEvent.click(characters);
    fireEvent.click(screen.getByRole('button', { name: 'New Character' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sarah' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Character' }));

    const name = screen.getByLabelText('Name');
    fireEvent.change(name, { target: { value: 'Sarah Morgan' } });
    fireEvent.blur(name);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    const created = gateway.savedSnapshot?.definitions.find((definition) => definition.document.id === 'character.sarah_2');
    expect(created?.document).toMatchObject({
      id: 'character.sarah_2',
      display_name: 'Sarah Morgan',
      schema_id: 'aigs.character.definition',
      schema_version: 1,
      kind: 'character',
    });
    expect(validateDocument('aigs.character.definition', created?.document).valid).toBe(true);
  });

  it('keeps an empty name as a raw draft and allows the Character to be repaired', async () => {
    const project = createBlankProject({ displayName: 'Repairable Character', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [{ collection: 'characters', document: createCharacterDefinition('Alex', new Set()) }];
    const gateway = renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'Alex, ID character.alex' }));

    const name = screen.getByLabelText('Name');
    fireEvent.change(name, { target: { value: '' } });
    fireEvent.blur(name);

    expect(name).toHaveValue('');
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete Character' })).toBeInTheDocument();
    expect(screen.getByText('Validation: Valid')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Edited while repairing the name.' } });
    expect(name).toHaveValue('');

    fireEvent.change(name, { target: { value: 'Alex Morgan' } });
    fireEvent.blur(name);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(gateway.savedSnapshot).not.toBeNull());
    const repaired = gateway.savedSnapshot?.definitions[0].document;
    expect(repaired).toMatchObject({
      id: 'character.alex',
      display_name: 'Alex Morgan',
      description: 'Edited while repairing the name.',
    });
    expect(validateDocument('aigs.character.definition', repaired).valid).toBe(true);
  });

  it('synchronizes the raw name draft to the immutable selected Character identity', async () => {
    const project = createBlankProject({ displayName: 'Character selection', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [
      { collection: 'characters', document: createCharacterDefinition('Alex', new Set()) },
      { collection: 'characters', document: createCharacterDefinition('Morgan', new Set(['character.alex'])) },
    ];
    renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'Alex, ID character.alex' }));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Uncommitted draft' } });
    fireEvent.click(screen.getByRole('button', { name: 'Morgan, ID character.morgan' }));
    expect(screen.getByLabelText('Name')).toHaveValue('Morgan');

    fireEvent.click(screen.getByRole('button', { name: 'Alex, ID character.alex' }));
    expect(screen.getByLabelText('Name')).toHaveValue('Alex');
    expect(screen.getByText('Validation: Valid')).toBeInTheDocument();
  });

  it('creates a canonical character factory document with every required persona default', () => {
    const character = createCharacterDefinition('  Morgan  ', new Set(['character.morgan']));

    expect(character).toEqual({
      schema_id: 'aigs.character.definition',
      schema_version: 1,
      id: 'character.morgan_2',
      kind: 'character',
      display_name: 'Morgan',
      persona: {
        summary: '', background: '', personality: [], speech: { register: '', notes: '' },
        values: [], fears: [], desires: [], secrets: [],
      },
    });
    expect(validateDocument('aigs.character.definition', character).valid).toBe(true);
  });

  it('updates every approved field and stores normalized multiline persona lists', async () => {
    const project = createBlankProject({ displayName: 'Editable', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    const gateway = renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'New Character' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Morgan' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Character' }));

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A watchful ranger.' } });
    fireEvent.change(screen.getByLabelText('Persona summary'), { target: { value: 'Quiet and precise.' } });
    fireEvent.change(screen.getByLabelText('Background'), { target: { value: 'Raised in the north.' } });
    fireEvent.change(screen.getByLabelText('Personality (one per line)'), { target: { value: ' calm \n\ncareful\ncalm ' } });
    fireEvent.blur(screen.getByLabelText('Personality (one per line)'));
    fireEvent.change(screen.getByLabelText('Speech register'), { target: { value: 'Formal' } });
    fireEvent.change(screen.getByLabelText('Speech notes'), { target: { value: 'Uses short sentences.' } });
    fireEvent.change(screen.getByLabelText('Values (one per line)'), { target: { value: 'honor\n honor \nmercy' } });
    fireEvent.blur(screen.getByLabelText('Values (one per line)'));
    fireEvent.change(screen.getByLabelText('Fears (one per line)'), { target: { value: 'failure' } });
    fireEvent.blur(screen.getByLabelText('Fears (one per line)'));
    fireEvent.change(screen.getByLabelText('Desires (one per line)'), { target: { value: 'peace' } });
    fireEvent.blur(screen.getByLabelText('Desires (one per line)'));
    fireEvent.change(screen.getByLabelText('Secrets (one per line)'), { target: { value: 'a hidden past\na hidden past' } });
    fireEvent.blur(screen.getByLabelText('Secrets (one per line)'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions[0].document).toMatchObject({
      display_name: 'Morgan',
      description: 'A watchful ranger.',
      persona: {
        summary: 'Quiet and precise.', background: 'Raised in the north.', personality: ['calm', 'careful'],
        speech: { register: 'Formal', notes: 'Uses short sentences.' }, values: ['honor', 'mercy'],
        fears: ['failure'], desires: ['peace'], secrets: ['a hidden past'],
      },
    });
  });

  it('preserves schema-valid non-editor extension data through top-level and persona edits', async () => {
    const project = createBlankProject({ displayName: 'Extension preservation', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    const extension = {
      version: 3,
      future_flag: true,
      nested: { exact: ['keep', 'this'] },
    };
    project.definitions = [{
      collection: 'characters',
      document: {
        ...createCharacterDefinition('Morgan', new Set()),
        extensions: { 'com.example.future_character': extension },
      },
    }];
    const gateway = renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'Morgan, ID character.morgan' }));

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated description.' } });
    fireEvent.change(screen.getByLabelText('Persona summary'), { target: { value: 'Updated summary.' } });
    fireEvent.change(screen.getByLabelText('Speech register'), { target: { value: 'Ceremonial' } });
    fireEvent.change(screen.getByLabelText('Values (one per line)'), { target: { value: 'honor\nmercy' } });
    fireEvent.blur(screen.getByLabelText('Values (one per line)'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions[0].document.extensions).toEqual({
      'com.example.future_character': extension,
    });
  });

  it('selects and deletes a character in memory, marks the project dirty, and blocks a now-invalid save', async () => {
    const project = createBlankProject({ displayName: 'Deletion', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [
      {
        collection: 'characters',
        document: createCharacterDefinition('Alex', new Set()),
      },
      {
        collection: 'locations',
        document: {
          schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.hall', kind: 'location', display_name: 'Hall',
          child_location_refs: [{ ref: 'character.alex' }],
        },
      },
    ];
    expect(validateProject(project).valid).toBe(true);
    const gateway = renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'Alex, ID character.alex' }));
    expect(screen.getByLabelText('Name')).toHaveValue('Alex');
    fireEvent.click(screen.getByRole('button', { name: 'Delete Character' }));

    expect(screen.queryByRole('button', { name: 'Alex, ID character.alex' })).not.toBeInTheDocument();
    expect(screen.getByText('Unsaved')).toBeInTheDocument();
    expect(screen.getByText('Validation: Invalid')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(gateway.saveAttempts).toBe(0);
  });

  it('disambiguates duplicate display names with visible immutable IDs and accessible names', async () => {
    const project = createBlankProject({ displayName: 'Duplicate character names', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [
      { collection: 'characters', document: createCharacterDefinition('Morgan', new Set()) },
      { collection: 'characters', document: createCharacterDefinition('Morgan', new Set(['character.morgan'])) },
    ];
    renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));

    expect(screen.getByRole('button', { name: 'Morgan, ID character.morgan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Morgan, ID character.morgan_2' })).toBeInTheDocument();
    expect(screen.getByText('character.morgan')).toBeVisible();
    expect(screen.getByText('character.morgan_2')).toBeVisible();
  });

  it('keeps Locations available and renders malformed loaded character data without crashing', async () => {
    const project = createBlankProject({ displayName: 'Malformed', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [{
      collection: 'characters',
      document: {
        schema_id: 'aigs.character.definition', schema_version: 1, id: 'character.broken', kind: 'character', persona: null,
      } as unknown as ProjectSnapshot['definitions'][number]['document'],
    }];
    renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));

    expect(screen.getByRole('button', { name: 'Locations' })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Unnamed character, ID character.broken' }));
    expect(screen.getByText('Character data is malformed and cannot be edited safely.')).toBeInTheDocument();
  });

  it('shows schema errors and prevents editing wrong-version or malformed-description Characters', async () => {
    const project = createBlankProject({ displayName: 'Invalid characters', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    const validCharacter = createCharacterDefinition('Versioned', new Set());
    const malformedDescription = createCharacterDefinition('Broken description', new Set([validCharacter.id]));
    project.definitions = [
      {
        collection: 'characters',
        document: { ...validCharacter, schema_version: 2 } as unknown as ProjectSnapshot['definitions'][number]['document'],
      },
      {
        collection: 'characters',
        document: { ...malformedDescription, description: 42 } as unknown as ProjectSnapshot['definitions'][number]['document'],
      },
    ];
    renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));

    expect(screen.getByText('Validation: Invalid')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Versioned, ID character.versioned' }));
    expect(screen.getByText('Character data is malformed and cannot be edited safely.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Broken description, ID character.broken_description' }));
    expect(screen.getByText('Character data is malformed and cannot be edited safely.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Description')).not.toBeInTheDocument();
  });

  it('selects an envelope-safe malformed Character that has no ID', async () => {
    const project = createBlankProject({ displayName: 'ID-less malformed character', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [{
      collection: 'characters',
      document: {
        schema_id: 'aigs.character.definition', schema_version: 1, kind: 'character', display_name: 'No ID', persona: {},
      } as unknown as ProjectSnapshot['definitions'][number]['document'],
    }];
    renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'No ID, ID unavailable' }));

    expect(screen.getByText('Character data is malformed and cannot be edited safely.')).toBeInTheDocument();
  });

  it('keeps multiline drafts usable while typing and normalizes them when the field loses focus', async () => {
    const user = userEvent.setup();
    const project = createBlankProject({ displayName: 'Multiline drafts', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    const gateway = renderOpenCreator(project);
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'New Character' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Morgan' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Character' }));

    const personality = screen.getByLabelText('Personality (one per line)');
    await user.type(personality, ' calm{enter}careful{enter}calm ');
    expect(personality).toHaveValue(' calm\ncareful\ncalm ');
    await user.tab();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(gateway.savedSnapshot?.definitions[0].document).toMatchObject({
      persona: { personality: ['calm', 'careful'] },
    });
  });

  it('prevents Character mutations while a whole-project save is pending and restores controls afterward', async () => {
    const user = userEvent.setup();
    const project = createBlankProject({ displayName: 'Deferred Character save', premise: '' });
    project.rootPath = 'C:\\Games\\Character Test';
    project.definitions = [{ collection: 'characters', document: createCharacterDefinition('Alex', new Set()) }];
    const gateway = new DeferredSaveGateway();
    gateway.projects.set(gateway.projectDirectory, project);
    render(<App gateway={gateway} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Characters' }));
    fireEvent.click(screen.getByRole('button', { name: 'Alex, ID character.alex' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    const newCharacter = screen.getByRole('button', { name: 'New Character' });
    expect(newCharacter).toBeDisabled();
    fireEvent.click(newCharacter);
    expect(screen.queryByRole('form', { name: 'Add character' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete Character' })).toBeDisabled();
    const name = screen.getByLabelText('Name');
    expect(name).toBeDisabled();
    await user.type(name, ' changed');
    fireEvent.click(screen.getByRole('button', { name: 'Delete Character' }));
    expect(screen.getByRole('button', { name: 'Alex, ID character.alex' })).toBeInTheDocument();
    expect(name).toHaveValue('Alex');

    gateway.saved.resolve({ ...project, dirty: false });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled());
    expect(screen.getByRole('button', { name: 'New Character' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Delete Character' })).toBeEnabled();
    expect(screen.getByLabelText('Name')).toBeEnabled();
  });
});
