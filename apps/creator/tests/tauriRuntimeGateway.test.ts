import { beforeEach, describe, expect, it, vi } from 'vitest';

const { invokeMock, listenMock } = vi.hoisted(() => ({
  invokeMock: vi.fn(),
  listenMock: vi.fn(),
}));

vi.mock('@tauri-apps/api/core', () => ({ invoke: invokeMock }));
vi.mock('@tauri-apps/api/event', () => ({ listen: listenMock }));

import { decodeRuntimeEvent, tauriRuntimeGateway } from '../src/platform/tauriRuntimeGateway';

describe('tauriRuntimeGateway', () => {
  beforeEach(() => {
    invokeMock.mockReset();
    listenMock.mockReset();
  });

  it('starts and stops only the narrow playtest commands', async () => {
    invokeMock.mockResolvedValueOnce({ sessionId: 'session.one', status: 'launching' });
    await expect(tauriRuntimeGateway.startPlaytest('C:\\Games\\Us', 'location.kitchen', 'dialogue.scene_intro')).resolves.toEqual({
      sessionId: 'session.one', status: 'launching',
    });
    expect(invokeMock).toHaveBeenLastCalledWith('start_playtest', {
      projectRoot: 'C:\\Games\\Us',
      startLocationRef: 'location.kitchen',
      entrySceneRef: 'dialogue.scene_intro',
    });

    invokeMock.mockResolvedValueOnce(undefined);
    await tauriRuntimeGateway.stopPlaytest('session.one');
    expect(invokeMock).toHaveBeenLastCalledWith('stop_playtest', { sessionId: 'session.one' });
  });

  it('decodes registered native events and rejects malformed or unknown events', () => {
    expect(decodeRuntimeEvent({ type: 'launching', sessionId: 'session.one' })).toEqual({
      type: 'launching', sessionId: 'session.one',
    });
    expect(decodeRuntimeEvent({
      type: 'state', sessionId: 'session.one', state: {
        currentLocationRef: 'location.kitchen', activeSceneRef: null, activeNpcRef: 'character.maria', aiStatus: 'idle',
      },
    })).toEqual({
      type: 'state', sessionId: 'session.one', state: {
        currentLocationRef: 'location.kitchen', activeSceneRef: null, activeNpcRef: 'character.maria', aiStatus: 'idle',
      },
    });
    expect(() => decodeRuntimeEvent({ type: 'runtime.exec', command: 'calc' })).toThrow();
    expect(() => decodeRuntimeEvent({ type: 'log', sessionId: 'session.one', entry: { level: 'wat', message: 'x' } })).toThrow();
    expect(() => decodeRuntimeEvent(null)).toThrow();
  });

  it('normalizes a single Tauri event stream and returns its unlisten callback', async () => {
    const unlisten = vi.fn();
    let nativeHandler: ((event: { payload: unknown }) => void) | undefined;
    listenMock.mockImplementation(async (_name: string, handler: (event: { payload: unknown }) => void) => {
      nativeHandler = handler;
      return unlisten;
    });
    const handler = vi.fn();

    await expect(tauriRuntimeGateway.onRuntimeEvent(handler)).resolves.toBe(unlisten);
    expect(listenMock).toHaveBeenCalledWith('aigs://runtime-event', expect.any(Function));

    nativeHandler?.({ payload: { type: 'ready', sessionId: 'session.one' } });
    expect(handler).toHaveBeenCalledWith({ type: 'ready', sessionId: 'session.one' });
  });
});
