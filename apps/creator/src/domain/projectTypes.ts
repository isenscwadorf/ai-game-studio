export type DefinitionRef = { ref: string };

export type ProjectManifest = {
  schema_id: 'aigs.project.manifest';
  schema_version: 1;
  project_id: string;
  display_name: string;
  project_format_version: 1;
  definition_roots: string[];
  asset_catalog_ref?: DefinitionRef;
  default_ai_profiles?: {
    creator_copilot?: DefinitionRef;
    npc_planner?: DefinitionRef;
    npc_dialogue?: DefinitionRef;
  };
  extensions?: Record<string, Record<string, unknown>>;
};

export type DefinitionCollection = 'characters' | 'locations' | 'dialogue';

export type StoredDefinition = {
  collection: DefinitionCollection;
  document: Record<string, unknown> & {
    schema_id: string;
    id: string;
    display_name: string;
  };
};

export type ProjectSnapshot = {
  rootPath: string | null;
  manifest: ProjectManifest;
  definitions: StoredDefinition[];
  dirty: boolean;
};
