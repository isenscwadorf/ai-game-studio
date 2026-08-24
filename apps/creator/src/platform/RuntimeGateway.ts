export type RuntimeStatus = 'Idle' | 'Launching' | 'Running' | 'Failed' | 'Exited';

export type RuntimeLogEntry = {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
};

export type RuntimeStateSnapshot = {
  currentLocationRef: string | null;
  activeSceneRef: string | null;
  activeNpcRef: string | null;
  aiStatus: string | null;
};

export type RuntimeEvent =
  | { type: 'launching'; sessionId: string }
  | { type: 'ready'; sessionId: string }
  | { type: 'project_loaded'; sessionId: string }
  | { type: 'load_error'; sessionId: string; message: string }
  | { type: 'log'; sessionId: string; entry: RuntimeLogEntry }
  | { type: 'state'; sessionId: string; state: RuntimeStateSnapshot }
  | { type: 'dialogue_request'; sessionId: string; requestId: string; npcRef: string; text: string }
  | { type: 'exited'; sessionId: string; code: number | null }
  | { type: 'failed'; sessionId: string | null; message: string };

export type PlaytestSessionSummary = {
  sessionId: string;
  status: 'launching';
};

export interface RuntimeGateway {
  startPlaytest(projectRoot: string, startLocationRef: string, entrySceneRef?: string): Promise<PlaytestSessionSummary>;
  stopPlaytest(sessionId: string): Promise<void>;
  onRuntimeEvent(handler: (event: RuntimeEvent) => void): Promise<() => void>;
}
