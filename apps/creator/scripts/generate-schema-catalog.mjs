import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import standaloneCode from 'ajv/dist/standalone/index.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const creatorRoot = resolve(scriptDirectory, '..');
const repoRoot = resolve(creatorRoot, '..', '..');
const registryPath = resolve(repoRoot, 'schemas', 'registry.json');
const outputPath = resolve(creatorRoot, 'src', 'generated', 'schemaCatalog.ts');
const validatorsOutputPath = resolve(creatorRoot, 'src', 'generated', 'schemaValidators.ts');

const registry = JSON.parse(await readFile(registryPath, 'utf8'));
const entries = await Promise.all(registry.schemas.map(async (entry) => ({
  schemaId: entry.schema_id,
  urn: entry.urn,
  schema: JSON.parse(await readFile(resolve(repoRoot, entry.path), 'utf8')),
})));

entries.sort((left, right) => left.schemaId.localeCompare(right.schemaId));
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `export const schemaCatalog = ${JSON.stringify(entries, null, 2)} as const;\n`);

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
  code: { source: true, esm: true, lines: true },
});
addFormats(ajv);
for (const entry of entries) {
  ajv.addSchema(entry.schema, entry.urn);
}
const validatorNames = entries.map((_, index) => `aigsValidator${index}`);
const validatorExports = Object.fromEntries(entries.map((entry, index) => [validatorNames[index], entry.urn]));
const compiledValidators = standaloneCode(ajv, validatorExports)
  .replaceAll('require("ajv/dist/runtime/equal").default', 'aigsRuntimeEqual')
  .replaceAll('require("ajv/dist/runtime/ucs2length").default', 'aigsRuntimeUcs2Length')
  .replaceAll('require("ajv-formats/dist/formats")', 'aigsRuntimeFormats');
const runtimeImports = [
  'import { resolveAjvFormatsRuntime, resolveAjvRuntimeFunction } from \'../domain/ajvRuntimeInterop.ts\';',
  'import aigsRuntimeEqualModule from \'ajv/dist/runtime/equal.js\';',
  'import aigsRuntimeUcs2LengthModule from \'ajv/dist/runtime/ucs2length.js\';',
  'import aigsRuntimeFormatsModule from \'ajv-formats/dist/formats.js\';',
  'const aigsRuntimeEqual = resolveAjvRuntimeFunction(\'equal\', aigsRuntimeEqualModule);',
  'const aigsRuntimeUcs2Length = resolveAjvRuntimeFunction(\'ucs2length\', aigsRuntimeUcs2LengthModule);',
  'const aigsRuntimeFormats = resolveAjvFormatsRuntime(aigsRuntimeFormatsModule);',
].join('\n');
await writeFile(
  validatorsOutputPath,
  `// @ts-nocheck -- generated Ajv validator source\n${runtimeImports}\n${compiledValidators}\nexport const schemaValidators = [${validatorNames.join(', ')}] as const;\n`,
);
