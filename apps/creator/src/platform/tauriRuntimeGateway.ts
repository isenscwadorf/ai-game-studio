import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import type { PlaytestSessionSummary, RuntimeEvent, RuntimeGateway } from './RuntimeGateway';

const RUNTIME_EVENT_NAME = 'aigs://runtime-event';

export function decodeRuntimeEvent(_value: unknown): RuntimeEvent {
  throw new Error('not implemented');
}

export const tauriRuntimeGateway: RuntimeGateway = {
  async startPlaytest(projectRoot, startLocationRef, entrySceneRef) {
    return invoke<PlaytestSessionSummary>('start_playtest', {
      projectRoot,
      startLocationRef,
      entrySceneRef: entrySceneRef ?? null,
    });
  },

  async stopPlaytest(sessionId) {
    await invoke('stop_playtest', { sessionId });
  },

  async onRuntimeEvent(handler) {
    return listen<unknown>(RUNTIME_EVENT_NAME, (event) => handler(decodeRuntimeEvent(event.payload)));
  },
};
