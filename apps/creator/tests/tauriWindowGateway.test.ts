import { beforeEach, describe, expect, it, vi } from 'vitest';

const { destroyMock, getCurrentWindowMock, onCloseRequestedMock } = vi.hoisted(() => ({
  destroyMock: vi.fn(),
  getCurrentWindowMock: vi.fn(),
  onCloseRequestedMock: vi.fn(),
}));

vi.mock('@tauri-apps/api/window', () => ({ getCurrentWindow: getCurrentWindowMock }));

import { tauriWindowGateway } from '../src/platform/tauriWindowGateway';

describe('tauri window gateway', () => {
  beforeEach(() => {
    destroyMock.mockReset();
    getCurrentWindowMock.mockReset();
    onCloseRequestedMock.mockReset();
    getCurrentWindowMock.mockReturnValue({ destroy: destroyMock, onCloseRequested: onCloseRequestedMock });
  });

  it('prevents the native close request before forwarding it to the app guard', async () => {
    const order: string[] = [];
    const unlisten = vi.fn();
    let nativeHandler: ((event: { preventDefault(): void }) => void) | undefined;
    onCloseRequestedMock.mockImplementation(async (handler) => {
      nativeHandler = handler;
      return unlisten;
    });

    const registeredUnlisten = await tauriWindowGateway.onCloseRequested(() => order.push('handler'));
    nativeHandler?.({ preventDefault: () => order.push('prevent') });

    expect(order).toEqual(['prevent', 'handler']);
    expect(registeredUnlisten).toBe(unlisten);
  });

  it('uses destroy for a force-close that cannot recursively trigger the close guard', async () => {
    destroyMock.mockResolvedValueOnce(undefined);

    await tauriWindowGateway.forceClose();

    expect(destroyMock).toHaveBeenCalledOnce();
  });
});
