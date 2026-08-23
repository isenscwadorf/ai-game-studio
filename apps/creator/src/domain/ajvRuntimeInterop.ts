export type AjvRuntimeFunction = (...args: unknown[]) => unknown;

export interface AjvFormatsRuntime {
  fullFormats: Record<string, unknown>;
}

const MAX_DEFAULT_EXPORT_DEPTH = 8;
const hasOwn = Object.prototype.hasOwnProperty;

function isObjectOrFunction(value: unknown): value is object {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function unwrapCommonJsModule(name: string, moduleValue: unknown): unknown {
  let current = moduleValue;
  const visited = new Set<object>();
  for (let depth = 0; ; depth += 1) {
    if (!isObjectOrFunction(current) || !hasOwn.call(current, 'default')) {
      return current;
    }
    if (visited.has(current)) {
      throw new Error(`Ajv standalone initialization failed: ${name} contains a circular own default export.`);
    }
    if (depth === MAX_DEFAULT_EXPORT_DEPTH) {
      throw new Error(`Ajv standalone initialization failed: ${name} exceeded ${MAX_DEFAULT_EXPORT_DEPTH} own default export levels.`);
    }
    visited.add(current);
    current = (current as { default: unknown }).default;
  }
}

export function resolveAjvRuntimeFunction(name: string, moduleValue: unknown): AjvRuntimeFunction {
  const helper = unwrapCommonJsModule(name, moduleValue);
  if (typeof helper !== 'function') {
    throw new Error(`Ajv standalone initialization failed: ${name} must resolve to a function.`);
  }
  return helper as AjvRuntimeFunction;
}

export function resolveAjvFormatsRuntime(moduleValue: unknown): AjvFormatsRuntime {
  const formats = unwrapCommonJsModule('formats', moduleValue);
  if (!isRecord(formats) || !isRecord(formats.fullFormats)) {
    throw new Error('Ajv standalone initialization failed: formats must resolve to an object with a fullFormats object.');
  }
  return formats as unknown as AjvFormatsRuntime;
}
