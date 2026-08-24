import { describe, expect, it } from 'vitest';
import { validateDocument, validateProject } from '../src/domain/validation';

const validManifest = {
  schema_id: 'aigs.project.manifest',
  schema_version: 1,
  project_id: 'project.creator_validation',
  display_name: 'Creator Validation',
  project_format_version: 1,
  definition_roots: ['definitions'],
};

function character(id: string) {
  return {
    schema_id: 'aigs.character.definition',
    schema_version: 1,
    id,
    kind: 'character',
    display_name: 'Alex',
    persona: { summary: 'A careful test character.' },
  };
}

function location(id: string) {
  return {
    schema_id: 'aigs.location.definition',
    schema_version: 1,
    id,
    kind: 'location',
    display_name: 'Hall',
  };
}

function snapshotWith(definitions: unknown[]) {
  return { manifest: validManifest, definitions };
}

describe('Creator project validation', () => {
  it('accepts a canonical manifest', () => {
    expect(validateDocument('aigs.project.manifest', validManifest).valid).toBe(true);
  });

  it('rejects unknown strict-core properties', () => {
    const result = validateDocument('aigs.project.manifest', { ...validManifest, api_key: 'no' });

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual([
      expect.objectContaining({ code: 'additionalProperties', path: '', schemaId: 'aigs.project.manifest' }),
    ]);
  });

  it('rejects duplicate definition IDs and missing refs', () => {
    const result = validateProject(snapshotWith([
      character('character.alex'),
      character('character.alex'),
      { ...location('location.hall'), child_location_refs: [{ ref: 'location.missing' }] },
    ]));

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain('DUPLICATE_DEFINITION_ID');
    expect(result.errors.map((error) => error.code)).toContain('REFERENCE_NOT_FOUND');
  });

  it('validates stored definition documents inside a project snapshot', () => {
    const result = validateProject({
      manifest: validManifest,
      definitions: [{ collection: 'characters', document: character('character.alex') }],
    });

    expect(result).toEqual({ valid: true, errors: [] });
  });

  it('reports a missing stored-document reference at its document path', () => {
    const result = validateProject({
      manifest: validManifest,
      definitions: [{
        collection: 'locations',
        document: { ...location('location.hall'), child_location_refs: [{ ref: 'location.missing' }] },
      }],
    });

    expect(result.errors).toContainEqual(expect.objectContaining({
      code: 'REFERENCE_NOT_FOUND',
      path: '/definitions/0/document/child_location_refs/0',
    }));
  });

  it('accepts native-managed visual identity and asset catalog refs at their canonical fields only', () => {
    const result = validateProject({
      manifest: { ...validManifest, asset_catalog_ref: { ref: 'asset_catalog.project' } },
      definitions: [{
        collection: 'characters',
        document: { ...character('character.alex'), visual_identity_ref: { ref: 'asset_identity.character_alex' } },
      }],
    });

    expect(result).toEqual({ valid: true, errors: [] });

    const misplaced = validateProject(snapshotWith([{ ...location('location.hall'), child_location_refs: [{ ref: 'asset_identity.fake' }] }]));
    expect(misplaced.errors).toContainEqual(expect.objectContaining({
      code: 'REFERENCE_NOT_FOUND',
      path: '/definitions/0/child_location_refs/0',
    }));
  });

  it('normalizes malformed user data into sorted errors instead of throwing', () => {
    expect(() => validateProject({ manifest: null, definitions: [{ schema_id: 42 }, null] })).not.toThrow();

    const result = validateProject({ manifest: null, definitions: [{ schema_id: 42 }, null] });

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual([...result.errors].sort((left, right) =>
      [left.path, left.code, left.message, left.schemaId ?? ''].join('\u0000').localeCompare(
        [right.path, right.code, right.message, right.schemaId ?? ''].join('\u0000'),
      ),
    ));
    expect(result.errors.map((error) => error.code)).toContain('type');
    expect(result.errors.map((error) => error.code)).toContain('DEFINITION_SCHEMA_ID_INVALID');
  });

  it('does not treat objects with extra properties as DefinitionRefs', () => {
    const result = validateProject(snapshotWith([
      { ...location('location.hall'), extensions: { 'com.example.metadata': { ref: 'location.missing', note: 'not a ref' } } },
    ]));

    expect(result.errors.map((error) => error.code)).not.toContain('REFERENCE_NOT_FOUND');
  });

  it('rejects recursively nested credential-like keys in manifest and definitions', () => {
    const result = validateProject({
      manifest: {
        ...validManifest,
        extensions: { 'aigs.creator': { settings: { Access_Token: 'value' } } },
      },
      definitions: [{
        ...character('character.alex'),
        extensions: { 'com.example.plugin': { settings: { API_KEY: 'value' } } },
      }],
    });

    expect(result).toEqual({
      valid: false,
      errors: [
        {
          code: 'CREDENTIAL_KEY_FORBIDDEN',
          path: '/definitions/0/extensions/com.example.plugin/settings/API_KEY',
          message: 'Credential-like keys are not allowed in project data.',
        },
        {
          code: 'CREDENTIAL_KEY_FORBIDDEN',
          path: '/manifest/extensions/aigs.creator/settings/Access_Token',
          message: 'Credential-like keys are not allowed in project data.',
        },
      ],
    });
  });
});