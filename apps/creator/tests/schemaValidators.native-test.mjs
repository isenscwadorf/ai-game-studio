import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

import { schemaCatalog } from '../src/generated/schemaCatalog.ts';
import { schemaValidators } from '../src/generated/schemaValidators.ts';

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(testDirectory, '..', '..', '..');

const additionalCases = [
  {
    name: 'valid_action-open-parameters',
    schema_urn: 'urn:aigs:schema:v1:action-open-parameters',
    valid: true,
    instance: { target_instance_id: '11111111-1111-4111-8111-111111111111' },
  },
  {
    name: 'invalid_action-open-parameters_uuid',
    schema_urn: 'urn:aigs:schema:v1:action-open-parameters',
    valid: false,
    instance: { target_instance_id: 'not-a-uuid' },
  },
  {
    name: 'valid_activity-cook-meal-parameters',
    schema_urn: 'urn:aigs:schema:v1:activity-cook-meal-parameters',
    valid: true,
    instance: { recipe_ref: 'item.apple_pie' },
  },
  {
    name: 'invalid_activity-cook-meal-parameters_ref',
    schema_urn: 'urn:aigs:schema:v1:activity-cook-meal-parameters',
    valid: false,
    instance: { recipe_ref: 'Apple Pie' },
  },
  {
    name: 'valid_safe-config-value',
    schema_urn: 'urn:aigs:schema:v1:safe-config-value',
    valid: true,
    instance: { theme: 'dark', options: [true, 3, null] },
  },
  {
    name: 'invalid_safe-config-value_credential_key',
    schema_urn: 'urn:aigs:schema:v1:safe-config-value',
    valid: false,
    instance: { api_key: 'not-allowed' },
  },
];

function normalizeErrors(errors) {
  return (errors ?? []).map((error) => ({
    keyword: error.keyword,
    instancePath: error.instancePath,
    schemaPath: error.schemaPath,
    params: error.params,
    message: error.message,
  }));
}

async function loadParityCases() {
  const fixtureDirectory = resolve(repoRoot, 'fixtures', 'schemas');
  const fixtureFiles = (await readdir(fixtureDirectory))
    .filter((name) => name.startsWith('cases-') && name.endsWith('.json'))
    .sort();
  const fixtureCases = (await Promise.all(fixtureFiles.map(async (name) => {
    const fixture = JSON.parse(await readFile(resolve(fixtureDirectory, name), 'utf8'));
    return fixture.cases;
  }))).flat();
  return [...fixtureCases, ...additionalCases];
}

function freshAjvValidators() {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    allowUnionTypes: true,
  });
  addFormats(ajv);
  for (const entry of schemaCatalog) {
    ajv.addSchema(entry.schema, entry.urn);
  }
  return new Map(schemaCatalog.map((entry) => [entry.urn, ajv.getSchema(entry.urn)]));
}

test('native ESM generated validation accepts an ordinary valid manifest without throwing', () => {
  const manifestIndex = schemaCatalog.findIndex((entry) => entry.schemaId === 'aigs.project.manifest');
  const manifest = {
    schema_id: 'aigs.project.manifest',
    schema_version: 1,
    project_id: 'project.native_esm',
    display_name: 'Native ESM',
    project_format_version: 1,
    definition_roots: ['definitions'],
  };

  assert.notEqual(manifestIndex, -1);
  assert.doesNotThrow(() => schemaValidators[manifestIndex](manifest));
  assert.equal(schemaValidators[manifestIndex].errors, null);
});

test('all generated validators match fresh Ajv for fixture and representative cases', async (context) => {
  assert.equal(schemaValidators.length, 45);
  assert.equal(schemaValidators.length, schemaCatalog.length);

  const cases = await loadParityCases();
  assert.equal(cases.length, 65);
  const casesByUrn = Map.groupBy(cases, (entry) => entry.schema_urn);
  const freshValidators = freshAjvValidators();
  assert.equal(casesByUrn.size, schemaCatalog.length);

  let invokedValidators = 0;
  for (const [index, entry] of schemaCatalog.entries()) {
    await context.test(entry.schemaId, () => {
      const generatedValidator = schemaValidators[index];
      const freshValidator = freshValidators.get(entry.urn);
      const schemaCases = casesByUrn.get(entry.urn);
      assert.equal(typeof generatedValidator, 'function');
      assert.equal(typeof freshValidator, 'function');
      assert.ok(schemaCases?.length, `Missing parity case for ${entry.schemaId}`);
      invokedValidators += 1;

      for (const parityCase of schemaCases) {
        let generatedValid;
        assert.doesNotThrow(() => {
          generatedValid = generatedValidator(parityCase.instance);
        }, `${entry.schemaId}: ${parityCase.name} threw`);
        const generatedErrors = normalizeErrors(generatedValidator.errors);
        const freshValid = freshValidator(parityCase.instance);
        const freshErrors = normalizeErrors(freshValidator.errors);

        assert.equal(freshValid, parityCase.valid, `${entry.schemaId}: ${parityCase.name} fixture expectation`);
        assert.equal(generatedValid, freshValid, `${entry.schemaId}: ${parityCase.name} validity parity`);
        assert.deepEqual(generatedErrors, freshErrors, `${entry.schemaId}: ${parityCase.name} error parity`);
      }
    });
  }

  assert.equal(invokedValidators, 45);
  context.diagnostic('Compared 45 generated validators across 59 fixtures and 6 representative cases.');
});
