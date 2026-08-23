import { describe, expect, it } from 'vitest';
import capability from '../src-tauri/capabilities/default.json';

describe('production Tauri capability', () => {
  it('authorizes only the native window destroy command used after an approved close', () => {
    expect([...capability.permissions].sort()).toEqual([
      'core:default',
      'core:window:allow-destroy',
      'dialog:allow-open',
    ]);
  });
});
