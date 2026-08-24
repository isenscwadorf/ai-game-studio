import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import type { PlaytestSessionSummary, RuntimeEvent, RuntimeGateway, RuntimeLogEntry, RuntimeStateSnapshot } from './RuntimeGateway';

const RUNTIME_EVENT_NAME = 'aigs://runtime-event';
const logLevels = new Set<RuntimeLogEntry['level']>(['debug', 'info', 'warn', 'error']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, keys: string[]): boolean {
  const allowed = new Set(keys);
  return Object.keys(value).every((key) => allowed.has(key)) && keys.every((key) => key in value);
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Runtime event ${field} must be a non-empty string.`);
  }
  return value;
}

function nullableString(value: unknown, field: string): string | null {
  if (value === null) return null;
  return requiredString(value, field);
}

function runtimeState(value: unknown): RuntimeStateSnapshot {
  if (!isRecord(value) || !hasOnlyKeys(value, ['currentLocationRef', 'activeSceneRef', 'activeNpcRef', 'aiStatus'])) {
    throw new Error('Runtime state event has an invalid state payload.');
  }
  return {
    currentLocationRef: nullableString(value.currentLocationRef, 'currentLocationRef'),
    activeSceneRef: nullableString(value.activeSceneRef, 'activeSceneRef'),
    activeNpcRef: nullableString(value.activeNpcRef, 'activeNpcRef'),
    aiStatus: nullableString(value.aiStatus, 'aiStatus'),
  };
}

export function decodeRuntimeEvent(value: unknown): RuntimeEvent {
  if (!isRecord(value) || typeof value.type !== 'string') {
    throw new Error('Runtime event must be an object with a type.');
  }

  switch (value.type) {
    case 'launching':
    case 'ready':
    case 'project_loaded': {
      if (!hasOnlyKeys(value, ['type', 'sessionId'])) throw new Error(`Malformed ${value.type} runtime event.`);
      return { type: value.type, sessionId: requiredString(value.sessionId, 'sessionId') };
    }
    case 'load_error': {
      if (!hasOnlyKeys(value, ['type', 'sessionId', 'message'])) throw new Error('Malformed load_error runtime event.');
      return {
        type: 'load_error',
        sessionId: requiredString(value.sessionId, 'sessionId'),
        message: requiredString(value.message, 'message'),
      };
    }
    case 'failed': {
      if (!hasOnlyKeys(value, ['type', 'sessionId', 'message'])) throw new Error('Malformed failed runtime event.');
      if (value.sessionId !== null && typeof value.sessionId !== 'string') throw new Error('Runtime failure sessionId must be a string or null.');
      return {
        type: 'failed',
        sessionId: value.sessionId === null ? null : requiredString(value.sessionId, 'sessionId'),
        message: requiredString(value.message, 'message'),
      };
    }
    case 'log': {
      if (!hasOnlyKeys(value, ['type', 'sessionId', 'entry']) || !isRecord(value.entry)
        || !hasOnlyKeys(value.entry, ['level', 'message']) || !logLevels.has(value.entry.level as RuntimeLogEntry['level'])) {
        throw new Error('Malformed runtime log event.');
      }
      return {
        type: 'log',
        sessionId: requiredString(value.sessionId, 'sessionId'),
        entry: {
          level: value.entry.level as RuntimeLogEntry['level'],
          message: requiredString(value.entry.message, 'entry.message'),
        },
      };
    }
    case 'state': {
      if (!hasOnlyKeys(value, ['type', 'sessionId', 'state'])) throw new Error('Malformed runtime state event.');
      return {
        type: 'state',
        sessionId: requiredString(value.sessionId, 'sessionId'),
        state: runtimeState(value.state),
      };
    }
    case 'dialogue_request': {
      if (!hasOnlyKeys(value, ['type', 'sessionId', 'requestId', 'npcRef', 'text'])) throw new Error('Malformed dialogue_request runtime event.');
      return {
        type: 'dialogue_request',
        sessionId: requiredString(value.sessionId, 'sessionId'),
        requestId: requiredString(value.requestId, 'requestId'),
        npcRef: requiredString(value.npcRef, 'npcRef'),
        text: requiredString(value.text, 'text'),
      };
    }
    case 'exited': {
      if (!hasOnlyKeys(value, ['type', 'sessionId', 'code'])
        || (value.code !== null && (!Number.isInteger(value.code) || typeof value.code !== 'number'))) {
        throw new Error('Malformed exited runtime event.');
      }
      return {
        type: 'exited',
        sessionId: requiredString(value.sessionId, 'sessionId'),
        code: value.code as number | null,
      };
    }
    default:
      throw new Error(`Unknown runtime event type: ${value.type}`);
  }
}

function decodeSessionSummary(value: unknown): PlaytestSessionSummary {
  if (!isRecord(value) || !hasOnlyKeys(value, ['sessionId', 'status']) || value.status !== 'launching') {
    throw new Error('Native playtest response is malformed.');
  }
  return { sessionId: requiredString(value.sessionId, 'sessionId'), status: 'launching' };
}

export const tauriRuntimeGateway: RuntimeGateway = {
  async startPlaytest(projectRoot, startLocationRef, entrySceneRef) {
    const value = await invoke<unknown>('start_playtest', {
      projectRoot,
      startLocationRef,
      entrySceneRef: entrySceneRef ?? null,
    });
    return decodeSessionSummary(value);
  },

  async stopPlaytest(sessionId) {
    await invoke('stop_playtest', { sessionId });
  },

  async onRuntimeEvent(handler) {
    return listen<unknown>(RUNTIME_EVENT_NAME, (event) => handler(decodeRuntimeEvent(event.payload)));
  },
};
