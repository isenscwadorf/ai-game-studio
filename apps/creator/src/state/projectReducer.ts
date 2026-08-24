import type { ProjectSnapshot, StoredDefinition } from '../domain/projectTypes';

export type ProjectEditorStatus = 'home' | 'loading' | 'open' | 'error';

export type ProjectEditorState = {
  project: ProjectSnapshot | null;
  status: ProjectEditorStatus;
  error: string | null;
};

export type ProjectEditorAction =
  | { type: 'projectLoading' }
  | { type: 'projectOpened'; project: ProjectSnapshot }
  | { type: 'projectSaved'; project?: ProjectSnapshot }
  | { type: 'manifestRenamed'; displayName: string }
  | { type: 'characterCreated'; document: StoredDefinition['document'] }
  | { type: 'characterUpdated'; id: string; document: StoredDefinition['document'] }
  | { type: 'characterDeleted'; id: string }
  | { type: 'locationCreated'; document: StoredDefinition['document'] }
  | { type: 'locationUpdated'; id: string; document: StoredDefinition['document'] }
  | { type: 'locationDeleted'; id: string }
  | { type: 'dialogueCreated'; document: StoredDefinition['document'] }
  | { type: 'dialogueUpdated'; id: string; document: StoredDefinition['document'] }
  | { type: 'dialogueDeleted'; id: string }
  | { type: 'operationFailed'; error: string }
  | { type: 'projectClosed' };

export const initialProjectEditorState: ProjectEditorState = {
  project: null,
  status: 'home',
  error: null,
};

function createdDefinition(
  state: ProjectEditorState,
  collection: StoredDefinition['collection'],
  document: StoredDefinition['document'],
): ProjectEditorState {
  return state.project
    ? {
      project: {
        ...state.project,
        definitions: [...state.project.definitions, { collection, document }],
        dirty: true,
      },
      status: 'open',
      error: null,
    }
    : state;
}

function updatedDefinition(
  state: ProjectEditorState,
  collection: StoredDefinition['collection'],
  id: string,
  document: StoredDefinition['document'],
): ProjectEditorState {
  return state.project
    ? {
      project: {
        ...state.project,
        definitions: state.project.definitions.map((definition) => (
          definition.collection === collection && definition.document.id === id
            ? { ...definition, document: { ...document, id: definition.document.id } }
            : definition
        )),
        dirty: true,
      },
      status: 'open',
      error: null,
    }
    : state;
}

function deletedDefinition(
  state: ProjectEditorState,
  collection: StoredDefinition['collection'],
  id: string,
): ProjectEditorState {
  return state.project
    ? {
      project: {
        ...state.project,
        definitions: state.project.definitions.filter((definition) => (
          definition.collection !== collection || definition.document.id !== id
        )),
        dirty: true,
      },
      status: 'open',
      error: null,
    }
    : state;
}

export function reducer(state: ProjectEditorState, action: ProjectEditorAction): ProjectEditorState {
  switch (action.type) {
    case 'projectLoading':
      return { ...state, status: 'loading', error: null };
    case 'projectOpened':
      return { project: action.project, status: 'open', error: null };
    case 'projectSaved': {
      const project = action.project ?? state.project;
      return {
        project: project ? { ...project, dirty: false } : null,
        status: project ? 'open' : state.status,
        error: null,
      };
    }
    case 'manifestRenamed':
      return state.project
        ? {
          project: {
            ...state.project,
            manifest: { ...state.project.manifest, display_name: action.displayName },
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
    case 'characterCreated':
      return createdDefinition(state, 'characters', action.document);
    case 'characterUpdated':
      return updatedDefinition(state, 'characters', action.id, action.document);
    case 'characterDeleted':
      return deletedDefinition(state, 'characters', action.id);
    case 'locationCreated':
      return createdDefinition(state, 'locations', action.document);
    case 'locationUpdated':
      return updatedDefinition(state, 'locations', action.id, action.document);
    case 'locationDeleted':
      return deletedDefinition(state, 'locations', action.id);
    case 'dialogueCreated':
      return createdDefinition(state, 'dialogue', action.document);
    case 'dialogueUpdated':
      return updatedDefinition(state, 'dialogue', action.id, action.document);
    case 'dialogueDeleted':
      return deletedDefinition(state, 'dialogue', action.id);
    case 'operationFailed':
      return {
        ...state,
        status: state.project ? 'open' : 'error',
        error: action.error,
      };
    case 'projectClosed':
      return initialProjectEditorState;
  }
}
