import { describe, expect, it, vi } from 'vitest';
import { createBlankProject } from '../src/domain/blankProject';

describe('production CSP validation compatibility', () => {
  it('initializes and validates without dynamic JavaScript evaluation', async () => {
    const originalFunction = globalThis.Function;
    globalThis.Function = (() => {
      throw new EvalError('Dynamic JavaScript evaluation is blocked by the production CSP.');
    }) as unknown as FunctionConstructor;

    try {
      vi.resetModules();
      const { validateProject } = await import('../src/domain/validation');
      expect(validateProject(createBlankProject({ displayName: 'CSP-safe', premise: '' })).valid).toBe(true);
    } finally {
      globalThis.Function = originalFunction;
    }
  });
});
