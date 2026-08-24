import { describe, expect, it } from 'vitest';
import { initialRuntimeState, runtimeReducer } from '../src/state/runtimeReducer';

describe('runtimeReducer', () => {
  it('tracks a successful launch and runtime state without crossing sessions', () => {
    const launching = runtimeReducer(initialRuntimeState, { type: 'launching', sessionId: 'session.one' });
    expect(launching).toMatchObject({ status: 'Launching', sessionId: 'session.one', lastError: null });

    const loaded = runtimeReducer(launching, { type: 'project_loaded', sessionId: 'session.one' });
    expect(loaded.projectLoaded).toBe(true);

    const ready = runtimeReducer(loaded, { type: 'ready', sessionId: 'session.one' });
    expect(ready.status).toBe('Running');

    const state = runtimeReducer(ready, {
      type: 'state',
      sessionId: 'session.one',
      state: {
        currentLocationRef: 'location.kitchen',
        activeSceneRef: 'dialogue.scene_intro',
        activeNpcRef: 'character.maria',
        aiStatus: 'idle',
      },
    });
    expect(state).toMatchObject({
      currentLocationRef: 'location.kitchen',
      activeSceneRef: 'dialogue.scene_intro',
      activeNpcRef: 'character.maria',
      aiStatus: 'idle',
    });

    expect(runtimeReducer(state, { type: 'ready', sessionId: 'session.other' })).toEqual(state);
  });

  it('caps logs and records terminal failures and exits', () => {
    let state = runtimeReducer(initialRuntimeState, { type: 'launching', sessionId: 'session.one' });
    for (let index = 0; index < 205; index += 1) {
      state = runtimeReducer(state, {
        type: 'log', sessionId: 'session.one', entry: { level: 'info', message: `line ${index}` },
      });
    }
    expect(state.logs).toHaveLength(200);
    expect(state.logs[0]?.message).toBe('line 5');

    const failed = runtimeReducer(state, { type: 'load_error', sessionId: 'session.one', message: 'bad project' });
    expect(failed).toMatchObject({ status: 'Failed', lastError: 'bad project' });

    const exited = runtimeReducer(state, { type: 'exited', sessionId: 'session.one', code: 0 });
    expect(exited.status).toBe('Exited');
  });

  it('accepts a pre-session failure and clears old state on a new launch', () => {
    const failed = runtimeReducer(initialRuntimeState, { type: 'failed', sessionId: null, message: 'runtime unavailable' });
    expect(failed).toMatchObject({ status: 'Failed', sessionId: null, lastError: 'runtime unavailable' });

    const launching = runtimeReducer({
      ...failed,
      currentLocationRef: 'location.old',
      logs: [{ level: 'error', message: 'old' }],
    }, { type: 'launching', sessionId: 'session.new' });
    expect(launching).toEqual({
      ...initialRuntimeState,
      status: 'Launching',
      sessionId: 'session.new',
    });
  });
});
