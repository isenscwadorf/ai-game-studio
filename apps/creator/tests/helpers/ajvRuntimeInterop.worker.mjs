import { parentPort, workerData } from 'node:worker_threads';

const { resolveAjvRuntimeFunction } = await import(workerData.moduleUrl);

let freshWrapperReads = 0;

function scenarioValue(scenario) {
  if (scenario === 'self-object') {
    const wrapper = {};
    wrapper.default = wrapper;
    return wrapper;
  }
  if (scenario === 'self-function') {
    const wrapper = () => undefined;
    wrapper.default = wrapper;
    return wrapper;
  }
  if (scenario === 'mutual') {
    const left = {};
    const right = {};
    left.default = right;
    right.default = left;
    return left;
  }
  if (scenario === 'fresh') {
    const freshWrapper = () => Object.defineProperty({}, 'default', {
      configurable: true,
      enumerable: true,
      get() {
        freshWrapperReads += 1;
        return freshWrapper();
      },
    });
    return freshWrapper();
  }
  throw new Error(`Unknown worker scenario: ${scenario}`);
}

try {
  const value = resolveAjvRuntimeFunction('equal', scenarioValue(workerData.scenario));
  parentPort.postMessage({ kind: 'return', valueType: typeof value, freshWrapperReads });
} catch (error) {
  parentPort.postMessage({
    kind: 'error',
    message: error instanceof Error ? error.message : String(error),
    freshWrapperReads,
  });
}
