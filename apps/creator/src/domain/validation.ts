import type { ErrorObject, ValidateFunction } from 'ajv';
import { schemaCatalog } from '../generated/schemaCatalog';
import { schemaValidators } from '../generated/schemaValidators';

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
  schemaId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
}

interface RefHit {
  ref: string;
  path: Array<string | number>;
}

interface DialogueSceneInfo {
  definitionIndex: number;
  documentPath: string;
  document: Record<string, unknown>;
  entryIds: Set<string>;
}

const credentialKeyPattern = /^(?:api[_-]?key|secret(?:[_-]?key)?|token|access[_-]?token|auth[_-]?token|bearer|password|credentials?|client[_-]?secret|private[_-]?key)$/i;

const validators = new Map<string, ValidateFunction>(
  schemaCatalog.map((entry, index) => [entry.schemaId, schemaValidators[index] as ValidateFunction]),
);

function issueSortKey(issue: ValidationIssue): string {
  return [issue.path, issue.code, issue.message, issue.schemaId ?? ''].join('\u0000');
}

function sortIssues(issues: ValidationIssue[]): ValidationIssue[] {
  return issues.sort((left, right) => issueSortKey(left).localeCompare(issueSortKey(right)));
}

function normalizeAjvErrors(errors: ErrorObject[] | null | undefined, schemaId: string, pathPrefix = ''): ValidationIssue[] {
  return (errors ?? []).map((error) => ({
    code: error.keyword,
    path: `${pathPrefix}${error.instancePath}`,
    message: error.message ?? 'Schema validation failed.',
    schemaId,
  }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function pathFor(path: Array<string | number>): string {
  return path.length === 0 ? '' : `/${path.join('/')}`;
}

function collectRefs(value: unknown, path: Array<string | number> = []): RefHit[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectRefs(item, [...path, index]));
  }
  if (!isRecord(value)) {
    return [];
  }
  const keys = Object.keys(value);
  if (keys.length === 1 && keys[0] === 'ref' && typeof value.ref === 'string') {
    return [{ ref: value.ref, path }];
  }
  return Object.entries(value).flatMap(([key, child]) => collectRefs(child, [...path, key]));
}

function isNativeManagedAssetRef(hit: RefHit): boolean {
  const field = hit.path.at(-1);
  if (field === 'asset_catalog_ref') {
    return hit.path.length === 2 && hit.path[0] === 'manifest' && hit.ref.startsWith('asset_catalog.');
  }
  return field === 'visual_identity_ref' && hit.ref.startsWith('asset_identity.');
}

function collectCredentialKeyIssues(value: unknown, path: Array<string | number> = []): ValidationIssue[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectCredentialKeyIssues(item, [...path, index]));
  }
  if (!isRecord(value)) {
    return [];
  }
  return Object.entries(value).flatMap(([key, child]) => {
    const childPath = [...path, key];
    const issue = credentialKeyPattern.test(key)
      ? [{
        code: 'CREDENTIAL_KEY_FORBIDDEN',
        path: pathFor(childPath),
        message: 'Credential-like keys are not allowed in project data.',
      }]
      : [];
    return [...issue, ...collectCredentialKeyIssues(child, childPath)];
  });
}

function dialogueTarget(
  value: unknown,
  currentSceneId: string,
  targetPath: string,
  scenes: Map<string, DialogueSceneInfo>,
  errors: ValidationIssue[],
): void {
  if (value === null || !isRecord(value) || typeof value.entry_id !== 'string') return;
  let targetSceneId = currentSceneId;
  if (value.scene_ref !== null) {
    if (!isRecord(value.scene_ref) || typeof value.scene_ref.ref !== 'string') return;
    targetSceneId = value.scene_ref.ref;
  }
  const targetScene = scenes.get(targetSceneId);
  if (!targetScene) {
    errors.push({
      code: 'DIALOGUE_TARGET_SCENE_NOT_FOUND',
      path: `${targetPath}/scene_ref`,
      message: `Dialogue target scene not found: ${targetSceneId}.`,
      schemaId: 'aigs.dialogue.scene',
    });
    return;
  }
  if (!targetScene.entryIds.has(value.entry_id)) {
    errors.push({
      code: 'DIALOGUE_TARGET_ENTRY_NOT_FOUND',
      path: `${targetPath}/entry_id`,
      message: `Dialogue target entry not found: ${targetSceneId} / ${value.entry_id}.`,
      schemaId: 'aigs.dialogue.scene',
    });
  }
}

function validateDialogueSemantics(definitions: unknown[], errors: ValidationIssue[]): void {
  const scenes = new Map<string, DialogueSceneInfo>();

  definitions.forEach((storedDefinition, index) => {
    const wrapped = isRecord(storedDefinition) && 'document' in storedDefinition;
    const document = wrapped && isRecord(storedDefinition.document)
      ? storedDefinition.document
      : storedDefinition;
    if (!isRecord(document) || document.schema_id !== 'aigs.dialogue.scene' || typeof document.id !== 'string') return;
    const documentPath = wrapped ? `/definitions/${index}/document` : `/definitions/${index}`;
    const entryIds = new Set<string>();
    if (Array.isArray(document.entries)) {
      document.entries.forEach((entry, entryIndex) => {
        if (!isRecord(entry) || typeof entry.entry_id !== 'string') return;
        if (entryIds.has(entry.entry_id)) {
          errors.push({
            code: 'DIALOGUE_ENTRY_ID_DUPLICATE',
            path: `${documentPath}/entries/${entryIndex}/entry_id`,
            message: `Duplicate dialogue entry id: ${entry.entry_id}.`,
            schemaId: 'aigs.dialogue.scene',
          });
        }
        entryIds.add(entry.entry_id);
      });
    }
    scenes.set(document.id, { definitionIndex: index, documentPath, document, entryIds });
  });

  for (const [sceneId, scene] of scenes) {
    if (typeof scene.document.entry_point === 'string' && !scene.entryIds.has(scene.document.entry_point)) {
      errors.push({
        code: 'DIALOGUE_ENTRY_POINT_NOT_FOUND',
        path: `${scene.documentPath}/entry_point`,
        message: `Dialogue entry point not found: ${scene.document.entry_point}.`,
        schemaId: 'aigs.dialogue.scene',
      });
    }
    if (!Array.isArray(scene.document.entries)) continue;
    scene.document.entries.forEach((entry, entryIndex) => {
      if (!isRecord(entry)) return;
      const entryPath = `${scene.documentPath}/entries/${entryIndex}`;
      if ((entry.kind === 'line' || entry.kind === 'narration') && 'next' in entry) {
        dialogueTarget(entry.next, sceneId, `${entryPath}/next`, scenes, errors);
      }
      if (entry.kind === 'choice' && Array.isArray(entry.options)) {
        entry.options.forEach((option, optionIndex) => {
          if (isRecord(option)) {
            dialogueTarget(option.target, sceneId, `${entryPath}/options/${optionIndex}/target`, scenes, errors);
          }
        });
      }
    });
  }
}

export function validateDocument(schemaId: string, value: unknown): ValidationResult {
  const validator = validators.get(schemaId);
  if (!validator) {
    return {
      valid: false,
      errors: [{ code: 'DOCUMENT_SCHEMA_ID_UNKNOWN', path: '', message: `Unknown schema_id: ${schemaId}.`, schemaId }],
    };
  }

  const valid = validator(value);
  return { valid, errors: sortIssues(normalizeAjvErrors(validator.errors, schemaId)) };
}

export function validateProject(snapshot: unknown): ValidationResult {
  if (!isRecord(snapshot)) {
    return {
      valid: false,
      errors: [{ code: 'PROJECT_SNAPSHOT_INVALID', path: '', message: 'Project snapshot must be an object.' }],
    };
  }

  const errors: ValidationIssue[] = [];
  errors.push(...collectCredentialKeyIssues(snapshot.manifest, ['manifest']));
  const manifestResult = validateDocument('aigs.project.manifest', snapshot.manifest);
  errors.push(...manifestResult.errors.map((issue) => ({ ...issue, path: `/manifest${issue.path}` })));

  if (!Array.isArray(snapshot.definitions)) {
    errors.push({ code: 'PROJECT_DEFINITIONS_INVALID', path: '/definitions', message: 'Project definitions must be an array.' });
    return { valid: false, errors: sortIssues(errors) };
  }

  const definitionIds = new Set<string>();
  const refHits: RefHit[] = collectRefs(snapshot.manifest, ['manifest']);

  snapshot.definitions.forEach((storedDefinition, index) => {
    const storedDefinitionPath = `/definitions/${index}`;
    const isStoredDefinition = isRecord(storedDefinition) && 'document' in storedDefinition;
    const definition = isStoredDefinition
      ? storedDefinition.document
      : storedDefinition;
    const definitionPath = isStoredDefinition
      ? `${storedDefinitionPath}/document`
      : storedDefinitionPath;
    errors.push(...collectCredentialKeyIssues(definition, isStoredDefinition
      ? ['definitions', index, 'document']
      : ['definitions', index]));
    if (!isRecord(definition) || typeof definition.schema_id !== 'string') {
      errors.push({
        code: 'DEFINITION_SCHEMA_ID_INVALID',
        path: definitionPath,
        message: 'Definition schema_id must be a string.',
      });
      return;
    }

    const result = validateDocument(definition.schema_id, definition);
    errors.push(...result.errors.map((issue) => ({ ...issue, path: `${definitionPath}${issue.path}` })));

    if (typeof definition.id === 'string') {
      if (definitionIds.has(definition.id)) {
        errors.push({
          code: 'DUPLICATE_DEFINITION_ID',
          path: `${definitionPath}/id`,
          message: `Duplicate definition id: ${definition.id}.`,
          schemaId: definition.schema_id,
        });
      } else {
        definitionIds.add(definition.id);
      }
    }

    refHits.push(...collectRefs(definition, isStoredDefinition
      ? ['definitions', index, 'document']
      : ['definitions', index]));
  });

  validateDialogueSemantics(snapshot.definitions, errors);

  for (const hit of refHits) {
    if (!definitionIds.has(hit.ref) && !isNativeManagedAssetRef(hit)) {
      errors.push({
        code: 'REFERENCE_NOT_FOUND',
        path: pathFor(hit.path),
        message: `Definition reference not found: ${hit.ref}.`,
      });
    }
  }

  return { valid: errors.length === 0, errors: sortIssues(errors) };
}
