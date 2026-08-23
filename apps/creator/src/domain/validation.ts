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

  for (const hit of refHits) {
    if (!definitionIds.has(hit.ref)) {
      errors.push({
        code: 'REFERENCE_NOT_FOUND',
        path: pathFor(hit.path),
        message: `Definition reference not found: ${hit.ref}.`,
      });
    }
  }

  return { valid: errors.length === 0, errors: sortIssues(errors) };
}
