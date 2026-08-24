import type { RuntimeEvent, RuntimeLogEntry, RuntimeStatus } from '../platform/RuntimeGateway';

export type RuntimeUiState = {
  status: RuntimeStatus;
  sessionId: string | null;
  projectLoaded: boolean;
  currentLocationRef: string | null;
  activeSceneRef: string | null;
  activeNpcRef: string | null;
  aiStatus: string | null;
  logs: RuntimeLogEntry[];
  lastError: string | null;
};

export const initialRuntimeState: RuntimeUiState = {
  status: 'Idle',
  sessionId: null,
  projectLoaded: false,
  currentLocationRef: null,
  activeSceneRef: null,
  activeNpcRef: null,
  aiStatus: null,
  logs: [],
  lastError: null,
};

const MAX_RUNTIME_LOGS = 200;

function isCurrentSession(state: RuntimeUiState, event: RuntimeEvent): boolean {
  return 'sessionId' in event && event.sessionId !== null && event.sessionId === state.sessionId;
}

export function runtimeReducer(state: RuntimeUiState, event: RuntimeEvent): RuntimeUiState {
  if (event.type === 'launching') {
    return {
      ...initialRuntimeState,
      status: 'Launching',
      sessionId: event.sessionId,
    };
  }

  if (event.type === 'failed' && event.sessionId === null) {
    return {
      ...state,
      status: 'Failed',
      lastError: event.message,
    };
  }

  if (!isCurrentSession(state, event)) {
    return state;
  }

  switch (event.type) {
    case 'ready':
      return { ...state, status: 'Running', lastError: null };
    case 'project_loaded':
      return { ...state, projectLoaded: true };
    case 'load_error':
      return { ...state, status: 'Failed', lastError: event.message };
    case 'failed':
      return { ...state, status: 'Failed', lastError: event.message };
    case 'log': {
      const logs = [...state.logs, event.entry];
      return { ...state, logs: logs.slice(Math.max(0, logs.length - MAX_RUNTIME_LOGS)) };
    }
    case 'state':
      return {
        ...state,
        currentLocationRef: event.state.currentLocationRef,
        activeSceneRef: event.state.activeSceneRef,
        activeNpcRef: event.state.activeNpcRef,
        aiStatus: event.state.aiStatus,
      };
    case 'dialogue_request':
      return state;
    case 'exited':
      return { ...state, status: 'Exited' };
    case 'launching':
      return state;
  }
}
