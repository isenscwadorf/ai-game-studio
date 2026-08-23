import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Worker } from 'node:worker_threads';

import {
  resolveAjvFormatsRuntime,
  resolveAjvRuntimeFunction,
} from '../src/domain/ajvRuntimeInterop.ts';

function runWorkerScenario(scenario) {
  const workerUrl = new URL('./helpers/ajvRuntimeInterop.worker.mjs', import.meta.url);
  const moduleUrl = new URL('../src/domain/ajvRuntimeInterop.ts', import.meta.url).href;
  return new Promise((resolveScenario, rejectScenario) => {
    const worker = new Worker(workerUrl, { workerData: { moduleUrl, scenario } });
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      void worker.terminate().then(() => resolveScenario({ kind: 'timeout' }), rejectScenario);
    }, 300);

    worker.once('message', (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      void worker.terminate().then(() => resolveScenario(result), rejectScenario);
    });
    worker.once('error', (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      rejectScenario(error);
    });
    worker.once('exit', (code) => {
      if (settled || code === 0) return;
      settled = true;
      clearTimeout(timer);
      rejectScenario(new Error(`Interop worker exited with code ${code}.`));
    });
  });
}

function assertInitializationError(operation, message) {
  assert.throws(operation, (error) => error instanceof Error && error.message === message);
}

describe('Ajv runtime CommonJS interop', () => {
  it('keeps a direct callable helper unchanged', () => {
    const helper = () => true;

    assert.equal(resolveAjvRuntimeFunction('equal', helper), helper);
  });

  it('unwraps a single own default wrapper', () => {
    const helper = () => true;

    assert.equal(resolveAjvRuntimeFunction('equal', { default: helper }), helper);
  });

  it('unwraps nested own default wrappers', () => {
    const helper = () => true;

    assert.equal(resolveAjvRuntimeFunction('equal', { default: { default: helper } }), helper);
  });

  it('does not follow an inherited default property', () => {
    const inheritedWrapper = Object.create({ default: () => true });

    assertInitializationError(
      () => resolveAjvRuntimeFunction('equal', inheritedWrapper),
      'Ajv standalone initialization failed: equal must resolve to a function.',
    );
  });

  it('rejects object and function self-cycles', async () => {
    const expected = {
      kind: 'error',
      message: 'Ajv standalone initialization failed: equal contains a circular own default export.',
      freshWrapperReads: 0,
    };
    assert.deepEqual(await runWorkerScenario('self-object'), expected);
    assert.deepEqual(await runWorkerScenario('self-function'), expected);
  });

  it('rejects mutual default cycles without hanging', async () => {
    assert.deepEqual(await runWorkerScenario('mutual'), {
      kind: 'error',
      message: 'Ajv standalone initialization failed: equal contains a circular own default export.',
      freshWrapperReads: 0,
    });
  });

  it('bounds pathological fresh-wrapper getters', async () => {
    assert.deepEqual(await runWorkerScenario('fresh'), {
      kind: 'error',
      message: 'Ajv standalone initialization failed: equal exceeded 8 own default export levels.',
      freshWrapperReads: 8,
    });
  });

  for (const [label, moduleValue] of [
    ['null', null],
    ['number', 42],
    ['string', 'equal'],
    ['object', {}],
    ['wrapped number', { default: 42 }],
  ]) {
    it(`rejects a non-callable equal helper: ${label}`, () => {
      assertInitializationError(
        () => resolveAjvRuntimeFunction('equal', moduleValue),
        'Ajv standalone initialization failed: equal must resolve to a function.',
      );
    });
  }

  it('rejects a non-callable ucs2length helper', () => {
    assertInitializationError(
      () => resolveAjvRuntimeFunction('ucs2length', { default: {} }),
      'Ajv standalone initialization failed: ucs2length must resolve to a function.',
    );
  });

  it('requires formats to expose a fullFormats object', () => {
    const formats = { fullFormats: { uuid: /uuid/u } };
    assert.equal(resolveAjvFormatsRuntime({ default: formats }), formats);

    for (const moduleValue of [null, {}, { fullFormats: null }, { fullFormats: [] }]) {
      assertInitializationError(
        () => resolveAjvFormatsRuntime(moduleValue),
        'Ajv standalone initialization failed: formats must resolve to an object with a fullFormats object.',
      );
    }
  });
});
