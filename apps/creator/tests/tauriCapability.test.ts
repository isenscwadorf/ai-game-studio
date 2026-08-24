import { describe, expect, it } from 'vitest';
import capability from '../src-tauri/capabilities/default.json';

describe('production Tauri capability', () => {
  it('authorizes only the native APIs used by the Creator shell and runtime event stream', () => {
    expect([...capability.permissions].sort()).toEqual([
      'core:default',
      'core:event:allow-listen',
      'core:window:allow-destroy',
      'dialog:allow-open',
    ]);
  });
});
