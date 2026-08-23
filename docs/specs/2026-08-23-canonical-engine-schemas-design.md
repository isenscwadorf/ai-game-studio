# Canonical Engine Schemas — Design Specification

Date: 2026-08-23  
Status: Proposed for review  
Tracks: Linear THE-6  
Milestone: M0 — Architecture Locked

## 1. Purpose

This specification defines the machine-readable language shared by the AI Game Studio editor, Creator Copilot, autonomous Character agents, deterministic runtime, asset system, validation tooling, saves, and future plugins.

The design must satisfy two goals at the same time:

1. A human creator or conventional programmer can understand, inspect, diff, and edit the project without depending on an AI model.
2. An AI can discover what exists, understand what it may create or request, and modify the project through explicit typed contracts rather than guessing source-code conventions.

The schemas are not merely file formats. They are the public vocabulary of the platform.

## 2. Design constraints

The schema system MUST preserve all accepted project invariants:

- Player and NPCs use one Character model.
- Controller selection is separate from Character state.
- AI cannot directly mutate arbitrary World Truth.
- NPCs may autonomously initiate any valid engine-supported Action.
- Actions are short and atomic; Activities are explicitly long-running and interruptible.
- World Truth is separate from Character perception, memory, knowledge, and belief.
- Provider-specific AI APIs do not leak into gameplay contracts.
- Asset identity is semantic and persistent; filenames are storage details.
- AI-created changes remain inspectable, validated, previewable, and undoable.
- Chat history is not required to interpret project data.

## 3. Core serialization decision

### 3.1 Canonical persisted format

The initial canonical persisted project format is **strict UTF-8 JSON**.

Reasons:

- native, predictable support in Godot and nearly every external tool;
- easy generation and parsing by LLMs;
- deterministic validation through JSON Schema;
- fewer parsing ambiguities than YAML;
- straightforward version-control diffs when files are kept small and one-definition-per-file;
- safe interchange with OpenRouter tool schemas and other structured-output providers.

JSON5, comments inside JSON, YAML aliases, executable expressions, and provider-specific serialization are not part of the canonical format.

Human explanations live in adjacent Markdown documentation or explicit `description` fields rather than comments embedded in JSON.

### 3.2 JSON Schema dialect

Machine-readable schemas use **JSON Schema Draft 2020-12**.

Schema documents use stable URN identifiers instead of requiring an owned public web domain. Example:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:aigs:schema:v1:character-definition"
}
```

The project must not require network access to resolve these schemas. All referenced schemas are vendored in the repository and resolved from the local schema registry.

## 4. Definition data vs runtime state

A foundational rule is that creator-authored/generated **Definitions** are not mixed with mutable **Runtime State**.

Examples:

- `CharacterDefinition` describes who a Character is, initial configuration, persona, visual identity, component configuration, default controller policy, and available systems.
- `CharacterState` describes the current instantiated Character: room, needs, inventory, emotions, current activity, relationships, beliefs, and runtime identifiers.
- `ObjectDefinition` describes a stove and its capabilities.
- `ObjectState` describes whether this particular stove is currently on, dirty, broken, or occupied.

Benefits:

- editing a game definition does not silently rewrite a save;
- runtime state can be snapshotted and restored deterministically;
- AI Copilot modifications target project definitions while NPC Actions target runtime instances;
- migrations can distinguish project-format changes from save-format changes;
- multiplayer/replay/testing remain possible later without changing the authoring model.

The repository therefore defines schemas in four broad families:

1. **Definition schemas** — persistent game design.
2. **Runtime schemas** — instantiated mutable state and event records.
3. **AI contract schemas** — normalized requests, plans, and ChangeSets.
4. **Asset/provenance schemas** — semantic assets and generated artifacts.

## 5. Stable identity

### 5.1 Definition IDs

Every persistent project definition has a human-readable, immutable namespaced ID.

Examples:

```text
character.father
character.sarah
location.family_house
room.kitchen
object.front_door
item.car_keys
action.open
action.take
activity.cook_meal
event.power_failure
asset.character_father
ai_role.npc_planner
```

Recommended pattern:

```regex
^[a-z][a-z0-9_]*(\.[a-z0-9][a-z0-9_-]*)+$
```

Rules:

- IDs are immutable after creation.
- Renaming `display_name` never changes the ID.
- Filesystem paths are never identity.
- Cross-references use IDs, never filenames.
- A definition ID must be unique within a project.
- Schema-specific validators constrain allowed prefixes where appropriate.

If a creator duplicates `character.father`, the editor generates a new stable ID such as `character.father_copy` and allows the creator to rename the display name independently.

### 5.2 Runtime instance IDs

Each instantiated runtime entity has an opaque engine-generated `instance_id` independent of its definition ID.

The initial implementation uses UUID strings. Consumers MUST treat instance IDs as opaque and MUST NOT derive gameplay meaning from them.

Example:

```json
{
  "definition_ref": "character.father",
  "instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559"
}
```

### 5.3 References

References are explicit objects, not copied names:

```json
{
  "ref": "character.father"
}
```

The field containing the reference constrains the expected definition kind. Semantic validation verifies that the referenced ID exists and is compatible.

Runtime references use:

```json
{
  "instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559"
}
```

Where both are useful, an `EntityHandle` may contain both definition and instance identity.

## 6. Common definition envelope

Every top-level persisted definition extends one common envelope.

```json
{
  "schema_id": "aigs.character.definition",
  "schema_version": 1,
  "id": "character.father",
  "kind": "character",
  "display_name": "Father",
  "description": "The protagonist's father.",
  "tags": ["family", "adult"],
  "extensions": {}
}
```

Required common fields:

- `schema_id` — canonical contract family.
- `schema_version` — positive integer for persisted-shape migration.
- `id` — immutable stable definition ID.
- `kind` — concise discriminated-union type.
- `display_name` — creator-facing mutable name.
- `tags` — optional normalized string tags.
- `extensions` — optional namespaced extension payloads.

`additionalProperties` is **false by default** throughout core schemas.

This is intentional. Silent acceptance of misspelled fields is dangerous for AI-assisted development. Extensibility occurs through explicit registered extension points rather than unbounded arbitrary properties.

## 7. Extension model

Plugins and advanced systems will need new data without weakening core validation.

Extensions therefore use namespaced keys:

```json
{
  "extensions": {
    "com.example.farming": {
      "preferred_crop": "tomato"
    }
  }
}
```

Rules:

- core schemas treat `extensions` as a map of namespace -> object;
- installed plugins register an extension schema for their namespace;
- semantic validation fails unknown extension namespaces in strict mode;
- uninstalling a plugin never silently deletes its extension payload;
- the Creator Copilot sees extension schemas through the same schema registry as core types.

This preserves strict core data while allowing a future plugin ecosystem.

## 8. Project manifest

The root `project.json` is the discovery point.

Representative shape:

```json
{
  "schema_id": "aigs.project.manifest",
  "schema_version": 1,
  "project_id": "project.snowed_in",
  "display_name": "Snowed In",
  "project_format_version": 1,
  "definition_roots": ["definitions"],
  "asset_catalog_ref": "asset_catalog.main",
  "default_ai_profiles": {
    "creator_copilot": {"ref": "ai_role.creator"},
    "npc_planner": {"ref": "ai_role.npc_planner"},
    "npc_dialogue": {"ref": "ai_role.npc_dialogue"}
  }
}
```

The manifest never contains API secrets.

## 9. Character contracts

### 9.1 CharacterDefinition

A CharacterDefinition represents a person independent of who controls them.

Representative shape:

```json
{
  "schema_id": "aigs.character.definition",
  "schema_version": 1,
  "id": "character.father",
  "kind": "character",
  "display_name": "Father",
  "tags": ["family", "adult"],
  "persona": {
    "summary": "A protective but controlling father.",
    "background": "...",
    "personality": ["protective", "strict", "proud"],
    "speech": {
      "register": "direct",
      "notes": "Avoids admitting fear directly."
    },
    "values": ["family safety", "responsibility"],
    "fears": ["losing control during the storm"],
    "desires": ["keep the family safe"],
    "secrets": []
  },
  "visual_identity_ref": {"ref": "asset_identity.character_father"},
  "component_configs": [
    {"ref": "component_config.father_needs"},
    {"ref": "component_config.father_relationships"}
  ],
  "default_controller_ref": {"ref": "controller.family_ai"},
  "initial_location_ref": {"ref": "room.living_room"}
}
```

The persona exists to support narrative and AI behavior but does not bypass systemic traits/components. A future trait such as `temper` should exist as structured simulation data when gameplay depends on it rather than only as prose.

### 9.2 CharacterState

CharacterState contains mutable runtime data and references to separately owned systems.

Representative shape:

```json
{
  "schema_id": "aigs.character.state",
  "schema_version": 1,
  "instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559",
  "definition_ref": {"ref": "character.father"},
  "location_instance_id": "7ea001d3-a331-4f05-9ea9-e2103926ee96",
  "active_activity_id": null,
  "controller_binding_id": "controller_binding.father.current"
}
```

Needs, memories, beliefs, inventory, relationships, and emotions are intentionally separate subsystem state documents or components so CharacterState does not become an unbounded monolith.

## 10. Controller contracts

Controller defines **who/what chooses intent**, not what the Character is allowed to do.

### 10.1 ControllerProfile

```json
{
  "schema_id": "aigs.controller.profile",
  "schema_version": 1,
  "id": "controller.family_ai",
  "kind": "controller_profile",
  "display_name": "Family AI",
  "controller_type": "ai",
  "ai_role_ref": {"ref": "ai_role.npc_planner"},
  "decision_policy": {
    "decision_mode": "event_driven",
    "minimum_replan_interval_ms": 1500,
    "allow_routine_shortcuts": true
  }
}
```

Human, AI, replay, test, or future remote controllers use the same common Controller contract.

### 10.2 ControllerBinding

Runtime control assignment is separate from the Character definition:

```json
{
  "schema_id": "aigs.controller.binding",
  "schema_version": 1,
  "binding_id": "controller_binding.father.current",
  "character_instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559",
  "controller_profile_ref": {"ref": "controller.family_ai"}
}
```

Human control can replace this binding without converting the Character into a different entity type.

## 11. WorldEntity contracts

`WorldEntityDefinition` is the common base for physical or logical entities that can exist in the world.

Common fields include:

- stable definition identity;
- tags;
- component configuration references;
- asset references;
- available affordance-set references;
- initial state configuration.

Specialized definitions extend it.

### 11.1 LocationDefinition

A broad world area or map.

```json
{
  "schema_id": "aigs.location.definition",
  "schema_version": 1,
  "id": "location.family_house",
  "kind": "location",
  "display_name": "Family House",
  "child_location_refs": [
    {"ref": "room.living_room"},
    {"ref": "room.kitchen"}
  ],
  "visual_identity_ref": {"ref": "asset_identity.family_house"}
}
```

### 11.2 RoomDefinition

A navigable sub-location. It may belong to a Location and expose portals to other rooms.

```json
{
  "schema_id": "aigs.room.definition",
  "schema_version": 1,
  "id": "room.kitchen",
  "kind": "room",
  "display_name": "Kitchen",
  "parent_location_ref": {"ref": "location.family_house"},
  "object_refs": [
    {"ref": "object.kitchen_stove"}
  ]
}
```

### 11.3 ObjectDefinition

Objects are persistent interactable world entities.

```json
{
  "schema_id": "aigs.object.definition",
  "schema_version": 1,
  "id": "object.front_door",
  "kind": "object",
  "display_name": "Front Door",
  "affordance_refs": [
    {"ref": "affordance.door_open"},
    {"ref": "affordance.door_close"},
    {"ref": "affordance.door_lock"}
  ],
  "initial_state": {
    "open": false,
    "locked": false
  }
}
```

`initial_state` is validated against the registered component/state schemas for that object type. It is not an unrestricted arbitrary object.

### 11.4 ItemDefinition

Items are portable definitions used by inventory/container systems.

```json
{
  "schema_id": "aigs.item.definition",
  "schema_version": 1,
  "id": "item.car_keys",
  "kind": "item",
  "display_name": "Car Keys",
  "tags": ["key", "portable"],
  "stacking": {
    "stackable": false,
    "max_stack": 1
  }
}
```

An Item instance in a container or inventory receives an `instance_id` like other runtime entities.

## 12. Affordance contract

Affordances describe what an actor may reasonably attempt with a target in a context. They are discovery metadata and parameter binding; the Action executor remains authoritative.

```json
{
  "schema_id": "aigs.affordance.definition",
  "schema_version": 1,
  "id": "affordance.door_open",
  "kind": "affordance",
  "display_name": "Open",
  "interaction_ref": {"ref": "action.open"},
  "target_kinds": ["object"],
  "target_tags_all": ["door"],
  "availability_condition": {
    "op": "eq",
    "left": {
      "source": "target_state",
      "path": ["locked"]
    },
    "right": {"literal": false}
  },
  "bindings": {
    "target": {"source": "target_instance"}
  },
  "ai": {
    "summary": "Open an unlocked door.",
    "categories": ["movement", "door"]
  }
}
```

The Affordance system returns **bound offers** to a controller. An AI should normally receive available offers, not the entire global Action catalog.

## 13. Action contracts

### 13.1 ActionDefinition

An Action is atomic from simulation perspective. It may animate over time visually, but its authoritative state transition commits as one validated operation.

```json
{
  "schema_id": "aigs.action.definition",
  "schema_version": 1,
  "id": "action.open",
  "kind": "action",
  "display_name": "Open",
  "executor_key": "core.action.open",
  "parameters_schema_ref": "urn:aigs:schema:v1:action-open-parameters",
  "preconditions": [],
  "failure_codes": [
    "TARGET_MISSING",
    "NOT_REACHABLE",
    "LOCKED",
    "ALREADY_OPEN",
    "ACTOR_BUSY"
  ],
  "emits": ["world.action.open.completed"],
  "ai": {
    "summary": "Open a reachable unlocked target that supports opening."
  }
}
```

Important design rule: data declares the Action contract, but authoritative mutation occurs through a registered `executor_key`. No ActionDefinition contains executable source code or an `eval` field.

Declarative preconditions are available for introspection and fast rejection, but the executor performs final validation to avoid race conditions.

### 13.2 ActionRequest

```json
{
  "schema_id": "aigs.action.request",
  "schema_version": 1,
  "request_id": "e688bf86-7548-4b55-aa11-59403258dc04",
  "action_ref": {"ref": "action.open"},
  "actor_instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559",
  "parameters": {
    "target_instance_id": "ac53c615-66bb-4791-b6d1-681bb1803996"
  },
  "intent_source": "ai_controller"
}
```

`intent_source` is audit/debug metadata; it never changes validation rules.

### 13.3 ActionResult

```json
{
  "schema_id": "aigs.action.result",
  "schema_version": 1,
  "request_id": "e688bf86-7548-4b55-aa11-59403258dc04",
  "status": "failed",
  "failure": {
    "code": "LOCKED",
    "message_key": "action.open.failure.locked",
    "details": {}
  },
  "emitted_event_ids": []
}
```

AI receives structured failure codes and may replan. The runtime never asks the LLM to narrate an action into success.

## 14. Activity contracts

An Activity is a long-running operation with a lifecycle and explicit cancellation semantics.

### 14.1 ActivityDefinition

```json
{
  "schema_id": "aigs.activity.definition",
  "schema_version": 1,
  "id": "activity.cook_meal",
  "kind": "activity",
  "display_name": "Cook Meal",
  "executor_key": "core.activity.cook_meal",
  "parameters_schema_ref": "urn:aigs:schema:v1:activity-cook-meal-parameters",
  "cancel_policy": "immediate_safe_point",
  "progress_policy": "event_driven",
  "failure_codes": [
    "APPLIANCE_UNAVAILABLE",
    "MISSING_INGREDIENT",
    "ACTOR_INTERRUPTED"
  ]
}
```

### 14.2 ActivityInstance

```json
{
  "schema_id": "aigs.activity.instance",
  "schema_version": 1,
  "activity_instance_id": "916932ff-851b-47fa-b1e6-fe8dbfc0c318",
  "activity_ref": {"ref": "activity.cook_meal"},
  "actor_instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559",
  "status": "running",
  "started_at": {"game_time": 12720},
  "progress": 0.35,
  "parameters": {
    "recipe_ref": "recipe.tomato_soup"
  }
}
```

Allowed lifecycle states in v1:

```text
pending -> running -> completed
                 -> canceled
                 -> failed
```

No nested resumable activity stack is required for M1. A future schema version may add it without changing Action semantics.

## 15. Condition expression contract

Events, affordances, and declarative preconditions need a safe expression language that AI can construct without embedding source code.

Conditions use a typed AST.

Core operators initially include:

- `all`
- `any`
- `not`
- `eq`
- `neq`
- `gt`
- `gte`
- `lt`
- `lte`
- `exists`
- `has_tag`

Operands are typed as one of:

- literal;
- actor state path;
- target state path;
- referenced entity state path;
- event payload field;
- project variable/fact.

Example:

```json
{
  "op": "all",
  "args": [
    {
      "op": "gt",
      "left": {"source": "actor_state", "path": ["needs", "hunger"]},
      "right": {"literal": 0.7}
    },
    {
      "op": "eq",
      "left": {"source": "target_state", "path": ["powered"]},
      "right": {"literal": true}
    }
  ]
}
```

Paths are arrays of exact keys rather than executable dotted expressions. The evaluator resolves only fields registered as queryable for that schema/component.

No JavaScript, GDScript, Python, template expression, or arbitrary eval string is allowed in a core Condition.

## 16. Event / Trigger / Effect contracts

### 16.1 WorldEvent

Runtime mutations emit immutable WorldEvents.

```json
{
  "schema_id": "aigs.world_event",
  "schema_version": 1,
  "event_id": "9b103681-c8ec-4834-af0d-4899f62978fc",
  "event_type": "world.object.locked",
  "game_time": 12630,
  "actor_instance_id": "fc56ab7b-373a-4a4c-b3e4-a34f84320559",
  "target_instance_ids": ["ac53c615-66bb-4791-b6d1-681bb1803996"],
  "payload": {
    "locked": true
  },
  "causal": {
    "action_request_id": "e688bf86-7548-4b55-aa11-59403258dc04",
    "parent_event_id": null
  }
}
```

WorldEvents support event rules, perception, debugging, replay investigation, and AI context construction.

### 16.2 TriggerDefinition

```json
{
  "schema_id": "aigs.trigger.definition",
  "schema_version": 1,
  "trigger_type": "world_event",
  "event_type": "world.object.locked",
  "filters": {
    "target_definition_ref": {"ref": "object.front_door"}
  }
}
```

Other trigger types such as game-time schedule or threshold watcher are discriminated unions, not arbitrary strings with unknown payloads.

### 16.3 EventDefinition

```json
{
  "schema_id": "aigs.event.definition",
  "schema_version": 1,
  "id": "event.react_to_front_door_lock",
  "kind": "event",
  "display_name": "React to front door being locked",
  "trigger": {
    "trigger_type": "world_event",
    "event_type": "world.object.locked",
    "filters": {
      "target_definition_ref": {"ref": "object.front_door"}
    }
  },
  "condition": {
    "op": "eq",
    "left": {"source": "event_payload", "path": ["locked"]},
    "right": {"literal": true}
  },
  "effects": [
    {
      "effect_type": "core.notify_perception",
      "parameters": {
        "radius_profile": "audible_same_room"
      }
    }
  ],
  "repeat": {
    "mode": "unlimited",
    "cooldown_game_seconds": 0
  }
}
```

### 16.4 EffectOperation

Effects use registered typed operations.

Examples:

- `core.emit_event`
- `core.request_action`
- `core.start_dialogue`
- `core.modify_relationship`
- `core.create_memory_seed`
- `core.set_project_variable`

Every effect type has its own parameter schema in the registry. Unknown effect types fail validation unless supplied by an installed extension.

Effects do not contain arbitrary executable source code.

## 17. Fact, perception, belief, and knowledge contracts

The system needs information provenance to stop AI characters from becoming omniscient.

### 17.1 Fact

A Fact is a structured proposition suitable for comparison and provenance.

```json
{
  "subject": {
    "instance_id": "ac53c615-66bb-4791-b6d1-681bb1803996"
  },
  "predicate": "state.locked",
  "value": true,
  "qualifiers": {}
}
```

Fact predicates are registered. Core systems expose a controlled fact/query vocabulary to AI rather than arbitrary object internals.

### 17.2 PerceptionRecord

A PerceptionRecord captures what reached a Character's senses from a WorldEvent or environment query.

```json
{
  "schema_id": "aigs.perception.record",
  "schema_version": 1,
  "perception_id": "64f70332-8814-40a1-940c-aea908f77841",
  "observer_instance_id": "6f8755b1-07c0-4095-8f43-404a23e68243",
  "source_event_id": "9b103681-c8ec-4834-af0d-4899f62978fc",
  "channel": "hearing",
  "facts": [
    {
      "subject": {"instance_id": "ac53c615-66bb-4791-b6d1-681bb1803996"},
      "predicate": "state.locked",
      "value": true,
      "qualifiers": {}
    }
  ],
  "confidence": 0.9,
  "game_time": 12631
}
```

Perception is not itself a belief. The Character may misinterpret it.

### 17.3 BeliefRecord

A BeliefRecord is a claim the Character currently treats as possibly true.

```json
{
  "schema_id": "aigs.belief.record",
  "schema_version": 1,
  "belief_id": "belief.sarah.front_door_locked",
  "owner_instance_id": "6f8755b1-07c0-4095-8f43-404a23e68243",
  "claim": {
    "subject": {"instance_id": "ac53c615-66bb-4791-b6d1-681bb1803996"},
    "predicate": "state.locked",
    "value": true,
    "qualifiers": {}
  },
  "confidence": 0.82,
  "source_refs": [
    {"type": "perception", "id": "64f70332-8814-40a1-940c-aea908f77841"}
  ],
  "last_updated_game_time": 12631
}
```

Beliefs may be false relative to World Truth. The engine does not silently correct them merely because the authoritative state differs.

### 17.4 KnowledgeView

The first version does **not** persist a second duplicated knowledge database. `KnowledgeView` is a derived, AI-facing/query schema constructed from beliefs, retained memories, known definitions, and explicit system knowledge.

A KnowledgeView may classify entries as:

- `known`
- `believed`
- `suspected`
- `remembered`
- `reported_by_other`

This avoids conflicting persistent copies while still giving AI a clean distinction between information exposure and current belief.

## 18. Memory contract

Memory records retain experiences and information with provenance.

```json
{
  "schema_id": "aigs.memory.record",
  "schema_version": 1,
  "memory_id": "memory.sarah.player_took_keys.001",
  "owner_instance_id": "6f8755b1-07c0-4095-8f43-404a23e68243",
  "memory_type": "episodic",
  "summary": "I saw my brother take Dad's car keys from the table.",
  "participants": [
    {"instance_id": "c8a33185-8b29-4eae-a957-4664b7e0ecbe"}
  ],
  "source_event_ids": ["6eed0638-a97f-43ad-8f30-1fd90b972e8f"],
  "learned_facts": [],
  "salience": 0.8,
  "affect": {
    "valence": -0.1,
    "arousal": 0.45
  },
  "created_game_time": 13240,
  "retention": {
    "policy": "normal"
  }
}
```

Memory summaries are descriptive context, not authoritative World Truth. Structured source references allow debugging why a Character remembers or believes something.

Long raw dialogue transcripts may be referenced externally but are not required inside every MemoryRecord.

## 19. Relationship contract

Relationships are directed. Sarah's trust in Father does not have to equal Father's trust in Sarah.

A project registers relationship-dimension definitions with ranges and defaults. This allows dating sims, family sims, RPG faction relations, or custom social mechanics without hard-coding one universal set.

Example dimension definition:

```json
{
  "schema_id": "aigs.relationship_dimension.definition",
  "schema_version": 1,
  "id": "relationship_dimension.trust",
  "kind": "relationship_dimension",
  "display_name": "Trust",
  "minimum": -1.0,
  "maximum": 1.0,
  "default": 0.0
}
```

Runtime state:

```json
{
  "schema_id": "aigs.relationship.state",
  "schema_version": 1,
  "relationship_id": "relationship.sarah_to_player",
  "source_instance_id": "6f8755b1-07c0-4095-8f43-404a23e68243",
  "target_instance_id": "c8a33185-8b29-4eae-a957-4664b7e0ecbe",
  "dimensions": {
    "relationship_dimension.affection": 0.62,
    "relationship_dimension.trust": 0.81
  }
}
```

Semantic validation checks each dimension against its registered numeric range.

## 20. AI provider and role contracts

Provider integration is normalized behind internal schemas/interfaces.

### 20.1 ProviderProfile

```json
{
  "schema_id": "aigs.ai_provider.profile",
  "schema_version": 1,
  "id": "ai_provider.openrouter_default",
  "kind": "ai_provider_profile",
  "display_name": "OpenRouter",
  "adapter_key": "core.ai.openrouter",
  "credential_ref": "credential.openrouter.default",
  "capabilities": [
    "text",
    "streaming",
    "structured_output",
    "tools",
    "vision"
  ],
  "options": {}
}
```

`credential_ref` is a symbolic reference resolved from secure local credential storage. Secret values are never serialized into project files.

### 20.2 AIRoleProfile

AI responsibilities are separate from providers/models.

```json
{
  "schema_id": "aigs.ai_role.profile",
  "schema_version": 1,
  "id": "ai_role.npc_planner",
  "kind": "ai_role_profile",
  "display_name": "NPC Planner",
  "preferred_provider_ref": {"ref": "ai_provider.openrouter_default"},
  "model_policy": {
    "model": "provider_model_identifier",
    "fallback_models": []
  },
  "required_capabilities": ["structured_output", "tools"],
  "budgets": {
    "max_input_tokens": 12000,
    "max_output_tokens": 1500
  },
  "tool_policy_ref": {"ref": "tool_policy.npc_runtime"}
}
```

Provider-specific fields live inside adapter-owned validated options or extension schemas; they never appear in Character/Action/Event contracts.

### 20.3 Normalized invocation

The provider layer will normalize:

- messages/context units;
- structured-output schema request;
- available tools;
- streaming preference;
- budget/timeout;
- provider/model selection policy;
- usage/cost metadata;
- typed provider errors.

This design lets OpenRouter be the default while keeping Inworld or future local/direct models optional.

## 21. Copilot ChangeSet contract

The Creator Copilot never directly edits arbitrary files. It proposes typed project operations.

### 21.1 ChangeSet

```json
{
  "schema_id": "aigs.copilot.changeset",
  "schema_version": 1,
  "changeset_id": "0fe2636e-df16-4683-8ef1-3eb79710bd40",
  "request_summary": "Make Dad fatter and meaner looking.",
  "mode": "atomic",
  "operations": [
    {
      "operation_id": "op-1",
      "operation_type": "core.update_definition",
      "target_ref": {"ref": "asset_identity.character_father"},
      "patch": {
        "body": {"build": "heavy"},
        "expression_bias": "stern"
      },
      "depends_on": []
    },
    {
      "operation_id": "op-2",
      "operation_type": "core.regenerate_asset_variants",
      "target_ref": {"ref": "asset_identity.character_father"},
      "parameters": {
        "affected_tags": ["portrait"]
      },
      "depends_on": ["op-1"]
    }
  ],
  "provenance": {
    "actor": "creator_copilot",
    "ai_role_ref": {"ref": "ai_role.creator"}
  }
}
```

### 21.2 ChangeSet rules

- v1 ChangeSets apply atomically: all validated operations commit or none do.
- Every operation type is registered and schema-validated.
- Unknown operation types fail validation.
- Destructive operations are explicitly marked for preview.
- Applying a ChangeSet creates a `ChangeReceipt` containing before-state snapshots or deterministic inverse operations.
- The AI model does **not** invent its own undo logic.
- Code/file-system operations are not part of the first runtime-facing ChangeSet vocabulary; later development tooling may add separately permissioned operations.

Preview UI derives its human-readable diff from the validated ChangeSet and current project state.

## 22. Asset identity and provenance

### 22.1 AssetIdentity

An AssetIdentity describes semantic identity independent of generated files.

```json
{
  "schema_id": "aigs.asset_identity.definition",
  "schema_version": 1,
  "id": "asset_identity.character_father",
  "kind": "asset_identity",
  "display_name": "Father Visual Identity",
  "subject_ref": {"ref": "character.father"},
  "asset_type": "character_visual",
  "canonical_profile": {
    "age_band": "middle_aged",
    "build": "heavy",
    "hair": "short gray",
    "eyes": "brown",
    "style_notes": "semi-realistic illustrated"
  },
  "variant_specs": [
    {"id": "portrait.neutral", "tags": ["portrait", "neutral"]},
    {"id": "portrait.angry", "tags": ["portrait", "angry"]}
  ]
}
```

### 22.2 AssetVariant

```json
{
  "schema_id": "aigs.asset_variant.record",
  "schema_version": 1,
  "variant_id": "asset_variant.character_father.portrait_neutral.v3",
  "asset_identity_ref": {"ref": "asset_identity.character_father"},
  "variant_spec_id": "portrait.neutral",
  "storage": {
    "project_path": "assets/generated/father/portrait_neutral_v3.png",
    "content_sha256": "..."
  },
  "generation_record_ref": {"ref": "generation.father_portrait_neutral.003"},
  "status": "active"
}
```

### 22.3 GenerationRecord

Provenance captures enough information to understand and reproduce/edit an asset without storing credentials.

```json
{
  "schema_id": "aigs.asset_generation.record",
  "schema_version": 1,
  "id": "generation.father_portrait_neutral.003",
  "kind": "asset_generation_record",
  "provider_adapter": "core.image.provider_example",
  "model_identifier": "model-name",
  "prompt_recipe_version": 2,
  "prompt": "...",
  "reference_variant_ids": [],
  "parameters": {},
  "created_at": "2026-08-23T05:00:00Z"
}
```

Regeneration creates a new versioned AssetVariant and retains history until an explicit cleanup policy removes unused versions.

## 23. Validation architecture

Validation is layered. JSON Schema alone cannot enforce all project invariants.

### Layer 1 — structural validation

JSON Schema checks:

- required fields;
- primitive types;
- enums/discriminators;
- ID format;
- numeric ranges;
- disallowed unknown properties;
- basic union shapes.

### Layer 2 — registry and reference validation

Semantic validator checks:

- referenced IDs exist;
- reference kinds match expected kinds;
- executor/effect/condition/extension keys are registered;
- no duplicate definition IDs;
- schema versions are supported.

### Layer 3 — project invariant validation

Checks project-wide rules such as:

- illegal containment cycles;
- orphaned definitions where prohibited;
- invalid relationship dimension values;
- missing required asset variants;
- Event references to unavailable trigger/effect capabilities;
- ChangeSet dependency cycles.

### Layer 4 — runtime validation

Action and Activity executors validate current mutable state immediately before execution.

### Layer 5 — AI ChangeSet validation

Copilot operations are validated against current project state, permissions, dependency graph, and destructive-change policy before the creator can approve application.

No lower layer assumes a higher layer has already run.

## 24. Schema versioning and migration

### 24.1 Version fields

Each persisted document includes integer `schema_version`.

The project manifest includes integer `project_format_version`.

Schema files live under a versioned registry namespace:

```text
schemas/v1/...
```

Breaking persisted-shape changes create a new schema version and an explicit migration.

### 24.2 Compatibility policy

Within one persisted version:

- bug fixes may tighten implementation validation only when existing valid project data is demonstrably unaffected;
- newly optional fields may be added if older documents remain valid;
- changing required fields, semantics, enum meaning, or ID behavior requires a new schema version.

### 24.3 Migrations

Migrations are deterministic code, not LLM prompts.

A migration must:

1. read and validate the old version where possible;
2. transform to the next supported version;
3. preserve stable definition IDs unless the migration explicitly records an identity migration;
4. validate the result;
5. create a backup/snapshot before replacing project data;
6. report every changed file/object;
7. fail without partial save when migration cannot complete.

Migrations advance one version at a time (`v1 -> v2 -> v3`) so each step is independently testable.

## 25. Proposed repository layout for machine-readable schemas

The implementation following approval should use:

```text
schemas/
  v1/
    core/
      definition-base.schema.json
      definition-ref.schema.json
      runtime-instance-ref.schema.json
      extension-map.schema.json
    project/
      project-manifest.schema.json
    character/
      character-definition.schema.json
      character-state.schema.json
      controller-profile.schema.json
      controller-binding.schema.json
    world/
      world-entity-definition.schema.json
      location-definition.schema.json
      room-definition.schema.json
      object-definition.schema.json
      item-definition.schema.json
    interaction/
      affordance-definition.schema.json
      action-definition.schema.json
      action-request.schema.json
      action-result.schema.json
      activity-definition.schema.json
      activity-instance.schema.json
    event/
      world-event.schema.json
      trigger-definition.schema.json
      condition-expression.schema.json
      effect-operation.schema.json
      event-definition.schema.json
    cognition/
      fact.schema.json
      perception-record.schema.json
      belief-record.schema.json
      knowledge-view.schema.json
      memory-record.schema.json
    social/
      relationship-dimension-definition.schema.json
      relationship-state.schema.json
    ai/
      provider-profile.schema.json
      ai-role-profile.schema.json
      changeset.schema.json
      change-receipt.schema.json
    asset/
      asset-identity-definition.schema.json
      asset-variant-record.schema.json
      asset-generation-record.schema.json
```

Documentation remains under `docs/SCHEMAS/`; machine-readable contracts are top-level `schemas/` because they are executable project infrastructure, not merely documentation.

## 26. Project data layout

A generated game project should be organized by semantic definitions rather than one giant database file.

Proposed layout:

```text
project.json

definitions/
  characters/
  world/
    locations/
    rooms/
    objects/
  items/
  actions/
  activities/
  affordances/
  events/
  relationships/
  ai/
  assets/

assets/
  source/
  generated/

scripts/
  systems/
```

Each major definition is stored independently so AI and humans can diff/review changes without rewriting a huge file.

Exact storage grouping may be optimized later, but identity and references may never depend on those paths.

## 27. Validation fixtures and CI contract

THE-6 implementation must ship CI-ready fixtures.

Proposed fixture layout:

```text
tests/schema_fixtures/
  manifest.json
  valid/
    minimal_character.json
    father_character.json
    front_door_object.json
    open_action.json
    cook_activity.json
    door_event.json
    perception_record.json
    belief_record.json
    relationship_state.json
    ai_provider_profile.json
    changeset.json
    asset_identity.json
  invalid/
    character_missing_id.json
    character_unknown_property.json
    reference_missing_target.json
    action_unknown_executor.json
    activity_invalid_status.json
    event_unknown_effect.json
    belief_invalid_confidence.json
    relationship_out_of_range.json
    changeset_dependency_cycle.json
    asset_variant_missing_identity.json
```

Fixture manifest entries declare:

- file path;
- expected schema;
- expected structural validity;
- optional expected semantic error code.

CI must prove both positive and negative fixtures. A validator that only accepts valid samples is insufficient; invalid fixtures must fail for the expected reason.

## 28. Error contract

All schema/semantic validation errors normalize to a common structure:

```json
{
  "code": "REFERENCE_NOT_FOUND",
  "severity": "error",
  "schema_id": "aigs.character.definition",
  "object_id": "character.father",
  "path": ["initial_location_ref"],
  "message": "Reference room.missing_room does not exist.",
  "details": {
    "ref": "room.missing_room"
  }
}
```

Error `code` is stable for tests and AI. Human-readable `message` may change or be localized later.

## 29. AI-facing schema catalog

The engine generates a compact Tool/Schema Catalog from the canonical registry.

The Creator Copilot receives only the schemas/tools relevant to its task. Runtime Character agents receive a much narrower catalog consisting primarily of:

- current perceived/known context;
- currently valid/bindable Affordances;
- Action/Activity parameter schemas;
- structured result/failure schemas.

NPC agents do **not** receive project-edit ChangeSet tools.

Creator Copilot does **not** automatically receive unrestricted runtime/system-shell access.

This is the permission boundary between "AI that develops the game" and "AI characters living inside the game."

## 30. Security constraints

- No persisted project schema contains plaintext provider credentials.
- No core schema accepts executable code strings.
- `additionalProperties` is false except documented extension maps and typed payload slots.
- Provider/Action/Activity/Effect/Condition executors are selected through registered keys, not arbitrary import paths supplied by game data.
- AI tool schemas are generated from the same registry used by runtime validation.
- Unknown tool/operation IDs fail closed.
- ChangeSets default to atomic application.
- Runtime AI agents cannot call Creator Copilot project-mutation tools.

## 31. Complexity controls for v1

The first schema version deliberately excludes several tempting abstractions:

- no universal arbitrary scripting expression language;
- no nested resumable Activity stacks;
- no arbitrary user-defined mutation effects without a registered effect type;
- no provider-specific AI fields in gameplay schemas;
- no duplicate persisted "knowledge database" separate from beliefs/memories;
- no filenames as semantic IDs;
- no all-in-one Character JSON containing every subsystem's mutable state;
- no graph database requirement;
- no network service requirement for local schema resolution.

These can be added later if real use cases justify them.

## 32. Snowed In proof requirements

Before M0 is considered successful, the v1 contracts must be capable of representing at least the following without schema hacks:

- one human-controlled teenager and AI-controlled family members using one CharacterDefinition/State model;
- switching one Character from AIController to HumanController;
- a house containing rooms and interactive objects;
- an unlocked/locked front door;
- a stove offering CookMeal-related Affordances;
- inventory Item instances such as car keys;
- atomic actions such as Open, Lock, Take, Give, Eat, TalkTo;
- Activities such as CookMeal and Sleep;
- an AI Character receiving a failed ActionResult and replanning;
- WorldEvents triggering reactive EventDefinitions;
- perception of events by some Characters but not others;
- a Character retaining a false or outdated Belief;
- episodic Memory records;
- directed relationship dimensions;
- OpenRouter-backed AI role profiles without gameplay-provider coupling;
- optional Inworld adapter configuration without changing Character/Action schemas;
- a Creator Copilot ChangeSet that edits a Character or visual identity and previews the change;
- asset regeneration that preserves canonical identity and provenance.

## 33. Acceptance criteria for THE-6

The task is complete only when, after this design is approved:

1. machine-readable JSON Schemas exist for every required family;
2. each schema has at least one valid representative fixture;
3. major invariants have invalid fixtures;
4. structural and semantic validation are both implemented;
5. cross-reference validation is demonstrated;
6. schema and project versioning are documented and tested;
7. all schemas use stable IDs and explicit references;
8. `docs/SCHEMAS/` explains the registry and extension model;
9. CI can run schema fixtures without launching the full editor;
10. `docs/CURRENT_STATE.md` and Linear reflect the verified result.

## 34. Decisions proposed by this spec

Approval of this design would lock the following additional architectural decisions:

1. strict UTF-8 JSON is the canonical persisted project format;
2. JSON Schema Draft 2020-12 is the source format for machine-readable structural contracts;
3. project Definitions and mutable Runtime State are separate schema families;
4. persistent definition IDs are human-readable immutable namespaced IDs;
5. runtime instance IDs are opaque UUIDs;
6. core schemas are strict (`additionalProperties: false`) and extensibility uses explicit namespaced extensions;
7. Actions/Activities use registered executor keys rather than embedded executable code;
8. Conditions use a non-executable typed AST;
9. Effects are registered typed operations, not arbitrary mutation code;
10. Knowledge is an AI/query view derived from beliefs, memories, and exposed system knowledge rather than a second duplicated persistent truth store;
11. ChangeSets are atomic in v1 and undo state is produced by the engine, not by the LLM;
12. machine-readable schemas live under top-level `schemas/v1/` and are executable infrastructure.

## 35. Review focus

Before implementation planning, review this specification specifically for:

- whether the Definition/Runtime split feels intuitive enough for creators and AI;
- whether namespaced human-readable stable IDs are preferable to opaque IDs for definitions;
- whether strict schemas plus namespaced extension points provide enough flexibility;
- whether the Action/Activity/Affordance contracts preserve the intended emergent autonomy without opening arbitrary-state mutation;
- whether cognition provenance is sufficiently clear without becoming overengineered;
- whether atomic ChangeSets provide the right safety model for Creator Copilot.

No runtime/schema implementation should begin until this design is approved.