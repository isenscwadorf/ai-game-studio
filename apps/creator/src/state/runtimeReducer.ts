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

export function runtimeReducer(_state: RuntimeUiState, _event: RuntimeEvent): RuntimeUiState {
  throw new Error('not implemented');
}
