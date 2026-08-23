import { getCurrentWindow } from '@tauri-apps/api/window';
import type { CreatorWindowGateway } from './CreatorWindowGateway';

export const tauriWindowGateway: CreatorWindowGateway = {
  async onCloseRequested(handler) {
    return getCurrentWindow().onCloseRequested((event) => {
      event.preventDefault();
      handler();
    });
  },

  async forceClose() {
    await getCurrentWindow().destroy();
  },
};
