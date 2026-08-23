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
  | { type: 'operationFailed'; error: string }
  | { type: 'projectClosed' };

export const initialProjectEditorState: ProjectEditorState = {
  project: null,
  status: 'home',
  error: null,
};

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
      return state.project
        ? {
          project: {
            ...state.project,
            definitions: [...state.project.definitions, { collection: 'characters', document: action.document }],
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
    case 'characterUpdated':
      return state.project
        ? {
          project: {
            ...state.project,
            definitions: state.project.definitions.map((definition) => (
              definition.collection === 'characters' && definition.document.id === action.id
                ? { ...definition, document: { ...action.document, id: definition.document.id } }
                : definition
            )),
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
    case 'characterDeleted':
      return state.project
        ? {
          project: {
            ...state.project,
            definitions: state.project.definitions.filter((definition) => (
              definition.collection !== 'characters' || definition.document.id !== action.id
            )),
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
    case 'locationCreated':
      return state.project
        ? {
          project: {
            ...state.project,
            definitions: [...state.project.definitions, { collection: 'locations', document: action.document }],
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
    case 'locationUpdated':
      return state.project
        ? {
          project: {
            ...state.project,
            definitions: state.project.definitions.map((definition) => (
              definition.collection === 'locations' && definition.document.id === action.id
                ? { ...definition, document: { ...action.document, id: definition.document.id } }
                : definition
            )),
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
    case 'locationDeleted':
      return state.project
        ? {
          project: {
            ...state.project,
            definitions: state.project.definitions.filter((definition) => (
              definition.collection !== 'locations' || definition.document.id !== action.id
            )),
            dirty: true,
          },
          status: 'open',
          error: null,
        }
        : state;
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
