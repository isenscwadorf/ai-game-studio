export const schemaCatalog = [
  {
    "schemaId": "aigs.action.definition",
    "urn": "urn:aigs:schema:v1:action-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:action-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.action.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "action"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "executor_key": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "parameters_schema_ref": {
          "type": "string",
          "pattern": "^urn:aigs:schema:v1:[a-z0-9-]+$"
        },
        "preconditions": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:condition-expression"
          }
        },
        "failure_codes": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Z][A-Z0-9_]+$"
          },
          "uniqueItems": true
        },
        "emits": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
          },
          "uniqueItems": true
        },
        "ai": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "summary": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "executor_key",
        "parameters_schema_ref",
        "failure_codes"
      ]
    }
  },
  {
    "schemaId": "aigs.action.request",
    "urn": "urn:aigs:schema:v1:action-request",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:action-request",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.action.request"
        },
        "schema_version": {
          "const": 1
        },
        "request_id": {
          "type": "string",
          "format": "uuid"
        },
        "action_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "actor_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "parameters": {
          "type": "object"
        },
        "intent_source": {
          "enum": [
            "human_controller",
            "ai_controller",
            "event_system",
            "test_controller",
            "replay_controller"
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "request_id",
        "action_ref",
        "actor_instance_id",
        "parameters",
        "intent_source"
      ]
    }
  },
  {
    "schemaId": "aigs.action.result",
    "urn": "urn:aigs:schema:v1:action-result",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:action-result",
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "schema_id": {
              "const": "aigs.action.result"
            },
            "schema_version": {
              "const": 1
            },
            "request_id": {
              "type": "string",
              "format": "uuid"
            },
            "status": {
              "const": "success"
            },
            "failure": {
              "type": "null"
            },
            "emitted_event_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "uuid"
              }
            }
          },
          "required": [
            "schema_id",
            "schema_version",
            "request_id",
            "status",
            "failure",
            "emitted_event_ids"
          ]
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "schema_id": {
              "const": "aigs.action.result"
            },
            "schema_version": {
              "const": 1
            },
            "request_id": {
              "type": "string",
              "format": "uuid"
            },
            "status": {
              "const": "failed"
            },
            "failure": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "code": {
                  "type": "string",
                  "pattern": "^[A-Z][A-Z0-9_]+$"
                },
                "message_key": {
                  "type": "string",
                  "pattern": "^[a-z][a-z0-9_.-]*$"
                },
                "details": {
                  "type": "object"
                }
              },
              "required": [
                "code",
                "message_key",
                "details"
              ]
            },
            "emitted_event_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "uuid"
              }
            }
          },
          "required": [
            "schema_id",
            "schema_version",
            "request_id",
            "status",
            "failure",
            "emitted_event_ids"
          ]
        }
      ]
    }
  },
  {
    "schemaId": "aigs.activity.definition",
    "urn": "urn:aigs:schema:v1:activity-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:activity-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.activity.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "activity"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "executor_key": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "parameters_schema_ref": {
          "type": "string",
          "pattern": "^urn:aigs:schema:v1:[a-z0-9-]+$"
        },
        "cancel_policy": {
          "enum": [
            "immediate",
            "immediate_safe_point",
            "not_cancelable"
          ]
        },
        "progress_policy": {
          "enum": [
            "event_driven",
            "time_based",
            "manual"
          ]
        },
        "failure_codes": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Z][A-Z0-9_]+$"
          },
          "uniqueItems": true
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "executor_key",
        "parameters_schema_ref",
        "cancel_policy",
        "progress_policy",
        "failure_codes"
      ]
    }
  },
  {
    "schemaId": "aigs.activity.instance",
    "urn": "urn:aigs:schema:v1:activity-instance",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:activity-instance",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.activity.instance"
        },
        "schema_version": {
          "const": 1
        },
        "activity_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "activity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "actor_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "status": {
          "enum": [
            "pending",
            "running",
            "completed",
            "canceled",
            "failed"
          ]
        },
        "started_at": {
          "type": [
            "object",
            "null"
          ],
          "additionalProperties": false,
          "properties": {
            "game_time": {
              "type": "integer",
              "minimum": 0
            }
          },
          "required": [
            "game_time"
          ]
        },
        "progress": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
        "parameters": {
          "type": "object"
        },
        "failure": {
          "oneOf": [
            {
              "type": "null"
            },
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "code": {
                  "type": "string",
                  "pattern": "^[A-Z][A-Z0-9_]+$"
                },
                "message_key": {
                  "type": "string",
                  "pattern": "^[a-z][a-z0-9_.-]*$"
                },
                "details": {
                  "type": "object"
                }
              },
              "required": [
                "code",
                "message_key",
                "details"
              ]
            }
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "activity_instance_id",
        "activity_ref",
        "actor_instance_id",
        "status",
        "started_at",
        "progress",
        "parameters",
        "failure"
      ]
    }
  },
  {
    "schemaId": "aigs.affordance.definition",
    "urn": "urn:aigs:schema:v1:affordance-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:affordance-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.affordance.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "affordance"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "interaction_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "target_kinds": {
          "type": "array",
          "items": {
            "enum": [
              "character",
              "object",
              "item",
              "room",
              "location"
            ]
          },
          "minItems": 1,
          "uniqueItems": true
        },
        "target_tags_all": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "availability_condition": {
          "$ref": "urn:aigs:schema:v1:condition-expression"
        },
        "bindings": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_.-]*$"
          },
          "additionalProperties": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "source": {
                "enum": [
                  "actor_instance",
                  "target_instance",
                  "literal"
                ]
              },
              "value": {}
            },
            "required": [
              "source"
            ]
          }
        },
        "ai": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "summary": {
              "type": "string"
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "string",
                "pattern": "^[a-z0-9][a-z0-9_-]*$"
              },
              "uniqueItems": true
            }
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "interaction_ref",
        "target_kinds"
      ]
    }
  },
  {
    "schemaId": "aigs.affordance.offer",
    "urn": "urn:aigs:schema:v1:affordance-offer",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:affordance-offer",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.affordance.offer"
        },
        "schema_version": {
          "const": 1
        },
        "offer_id": {
          "type": "string",
          "format": "uuid"
        },
        "affordance_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "actor_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "target_instance_id": {
          "type": [
            "string",
            "null"
          ],
          "format": "uuid"
        },
        "interaction_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "bound_parameters": {
          "type": "object"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "offer_id",
        "affordance_ref",
        "actor_instance_id",
        "target_instance_id",
        "interaction_ref",
        "bound_parameters"
      ]
    }
  },
  {
    "schemaId": "aigs.ai.provider_profile",
    "urn": "urn:aigs:schema:v1:provider-profile",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:provider-profile",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.ai.provider_profile"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "ai_provider_profile"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "adapter_key": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "capabilities": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "text": {
              "type": "boolean"
            },
            "structured_output": {
              "type": "boolean"
            },
            "tools": {
              "type": "boolean"
            },
            "streaming": {
              "type": "boolean"
            },
            "vision": {
              "type": "boolean"
            },
            "embeddings": {
              "type": "boolean"
            },
            "speech_to_text": {
              "type": "boolean"
            },
            "text_to_speech": {
              "type": "boolean"
            }
          },
          "required": [
            "text",
            "structured_output",
            "tools",
            "streaming",
            "vision",
            "embeddings",
            "speech_to_text",
            "text_to_speech"
          ]
        },
        "provider_config": {
          "type": "object",
          "propertyNames": {
            "pattern": "^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"
          },
          "additionalProperties": {
            "$ref": "urn:aigs:schema:v1:safe-config-value"
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "adapter_key",
        "capabilities"
      ]
    }
  },
  {
    "schemaId": "aigs.ai.role_profile",
    "urn": "urn:aigs:schema:v1:ai-role-profile",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:ai-role-profile",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.ai.role_profile"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "ai_role"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "provider_profile_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "model_candidates": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "model": {
                "type": "string",
                "minLength": 1
              },
              "priority": {
                "type": "integer",
                "minimum": 0
              },
              "max_cost_per_million_tokens": {
                "type": [
                  "number",
                  "null"
                ],
                "minimum": 0
              }
            },
            "required": [
              "model",
              "priority"
            ]
          },
          "minItems": 1
        },
        "tool_allowlist": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
          },
          "uniqueItems": true
        },
        "context_policy": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "max_context_tokens": {
              "type": "integer",
              "minimum": 1
            },
            "include_raw_world_truth": {
              "type": "boolean"
            },
            "memory_mode": {
              "enum": [
                "none",
                "relevant",
                "summary",
                "full_allowed"
              ]
            }
          },
          "required": [
            "max_context_tokens",
            "include_raw_world_truth",
            "memory_mode"
          ]
        },
        "latency_budget_ms": {
          "type": [
            "integer",
            "null"
          ],
          "minimum": 1
        },
        "cost_budget_usd_per_call": {
          "type": [
            "number",
            "null"
          ],
          "minimum": 0
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "provider_profile_ref",
        "model_candidates",
        "tool_allowlist",
        "context_policy"
      ]
    }
  },
  {
    "schemaId": "aigs.asset_catalog.definition",
    "urn": "urn:aigs:schema:v1:asset-catalog-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:asset-catalog-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.asset_catalog.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "asset_catalog"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "identity_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "variant_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:asset-variant-ref"
          },
          "uniqueItems": true
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name"
      ]
    }
  },
  {
    "schemaId": "aigs.asset_generation.record",
    "urn": "urn:aigs:schema:v1:asset-generation-record",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:asset-generation-record",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.asset_generation.record"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "asset_generation_record"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "provider_adapter": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "model_identifier": {
          "type": "string",
          "minLength": 1
        },
        "prompt_recipe_version": {
          "type": "integer",
          "minimum": 1
        },
        "prompt": {
          "type": "string"
        },
        "reference_variant_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "uniqueItems": true
        },
        "parameters": {
          "type": "object",
          "propertyNames": {
            "pattern": "^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"
          },
          "additionalProperties": {
            "$ref": "urn:aigs:schema:v1:safe-config-value"
          }
        },
        "parent_generation_ref": {
          "oneOf": [
            {
              "type": "null"
            },
            {
              "$ref": "urn:aigs:schema:v1:definition-ref"
            }
          ]
        },
        "created_at": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "provider_adapter",
        "model_identifier",
        "prompt_recipe_version",
        "prompt",
        "reference_variant_ids",
        "parameters",
        "parent_generation_ref",
        "created_at"
      ]
    }
  },
  {
    "schemaId": "aigs.asset_identity.definition",
    "urn": "urn:aigs:schema:v1:asset-identity-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:asset-identity-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.asset_identity.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "asset_identity"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "subject_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "asset_type": {
          "enum": [
            "character_visual",
            "location_visual",
            "object_visual",
            "item_visual",
            "tileset",
            "background",
            "ui",
            "audio",
            "other"
          ]
        },
        "canonical_profile": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "age_band": {
              "type": "string"
            },
            "build": {
              "type": "string"
            },
            "hair": {
              "type": "string"
            },
            "eyes": {
              "type": "string"
            },
            "style_notes": {
              "type": "string"
            },
            "architecture_style": {
              "type": "string"
            },
            "complexity": {
              "type": "string"
            },
            "palette": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "materials": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "variant_specs": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "id": {
                "type": "string",
                "pattern": "^[a-z][a-z0-9_-]*(\\.[a-z0-9_-]+)*$"
              },
              "tags": {
                "type": "array",
                "items": {
                  "type": "string",
                  "pattern": "^[a-z0-9][a-z0-9_-]*$"
                },
                "uniqueItems": true
              }
            },
            "required": [
              "id",
              "tags"
            ]
          },
          "uniqueItems": true
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "subject_ref",
        "asset_type",
        "canonical_profile",
        "variant_specs"
      ]
    }
  },
  {
    "schemaId": "aigs.asset_variant.record",
    "urn": "urn:aigs:schema:v1:asset-variant-record",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:asset-variant-record",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.asset_variant.record"
        },
        "schema_version": {
          "const": 1
        },
        "variant_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "asset_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "variant_spec_id": {
          "type": "string",
          "minLength": 1
        },
        "storage": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "project_path": {
              "type": "string",
              "minLength": 1
            },
            "content_sha256": {
              "type": "string",
              "pattern": "^[a-f0-9]{64}$"
            }
          },
          "required": [
            "project_path",
            "content_sha256"
          ]
        },
        "generation_record_ref": {
          "oneOf": [
            {
              "type": "null"
            },
            {
              "$ref": "urn:aigs:schema:v1:definition-ref"
            }
          ]
        },
        "status": {
          "enum": [
            "active",
            "candidate",
            "superseded",
            "rejected"
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "variant_id",
        "asset_identity_ref",
        "variant_spec_id",
        "storage",
        "generation_record_ref",
        "status"
      ]
    }
  },
  {
    "schemaId": "aigs.belief.record",
    "urn": "urn:aigs:schema:v1:belief-record",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:belief-record",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.belief.record"
        },
        "schema_version": {
          "const": 1
        },
        "belief_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "owner_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "claim": {
          "$ref": "urn:aigs:schema:v1:fact"
        },
        "confidence": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
        "source_refs": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "type": {
                "enum": [
                  "perception",
                  "memory",
                  "report",
                  "inference",
                  "system"
                ]
              },
              "id": {
                "type": "string",
                "minLength": 1
              }
            },
            "required": [
              "type",
              "id"
            ]
          },
          "minItems": 1
        },
        "last_updated_game_time": {
          "type": "integer",
          "minimum": 0
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "belief_id",
        "owner_instance_id",
        "claim",
        "confidence",
        "source_refs",
        "last_updated_game_time"
      ]
    }
  },
  {
    "schemaId": "aigs.change_receipt",
    "urn": "urn:aigs:schema:v1:change-receipt",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:change-receipt",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.change_receipt"
        },
        "schema_version": {
          "const": 1
        },
        "receipt_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "changeset_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "status": {
          "enum": [
            "applied",
            "rejected",
            "rolled_back"
          ]
        },
        "applied_operation_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^op-[A-Za-z0-9_-]+$"
          },
          "uniqueItems": true
        },
        "snapshot_ref": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "receipt_id",
        "changeset_id",
        "status",
        "applied_operation_ids",
        "snapshot_ref",
        "errors"
      ]
    }
  },
  {
    "schemaId": "aigs.changeset",
    "urn": "urn:aigs:schema:v1:changeset",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:changeset",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.changeset"
        },
        "schema_version": {
          "const": 1
        },
        "changeset_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "request_summary": {
          "type": "string",
          "minLength": 1
        },
        "mode": {
          "const": "atomic"
        },
        "operations": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "operation_id": {
                    "type": "string",
                    "pattern": "^op-[A-Za-z0-9_-]+$"
                  },
                  "depends_on": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^op-[A-Za-z0-9_-]+$"
                    },
                    "uniqueItems": true
                  },
                  "destructive": {
                    "type": "boolean"
                  },
                  "operation_type": {
                    "const": "create_definition"
                  },
                  "definition": {
                    "type": "object"
                  }
                },
                "required": [
                  "operation_id",
                  "operation_type",
                  "depends_on",
                  "destructive",
                  "definition"
                ]
              },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "operation_id": {
                    "type": "string",
                    "pattern": "^op-[A-Za-z0-9_-]+$"
                  },
                  "depends_on": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^op-[A-Za-z0-9_-]+$"
                    },
                    "uniqueItems": true
                  },
                  "destructive": {
                    "type": "boolean"
                  },
                  "operation_type": {
                    "const": "update_definition"
                  },
                  "target_ref": {
                    "$ref": "urn:aigs:schema:v1:definition-ref"
                  },
                  "patch": {
                    "type": "object"
                  }
                },
                "required": [
                  "operation_id",
                  "operation_type",
                  "depends_on",
                  "destructive",
                  "target_ref",
                  "patch"
                ]
              },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "operation_id": {
                    "type": "string",
                    "pattern": "^op-[A-Za-z0-9_-]+$"
                  },
                  "depends_on": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^op-[A-Za-z0-9_-]+$"
                    },
                    "uniqueItems": true
                  },
                  "destructive": {
                    "type": "boolean"
                  },
                  "operation_type": {
                    "const": "delete_definition"
                  },
                  "target_ref": {
                    "$ref": "urn:aigs:schema:v1:definition-ref"
                  }
                },
                "required": [
                  "operation_id",
                  "operation_type",
                  "depends_on",
                  "destructive",
                  "target_ref"
                ]
              },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "operation_id": {
                    "type": "string",
                    "pattern": "^op-[A-Za-z0-9_-]+$"
                  },
                  "depends_on": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^op-[A-Za-z0-9_-]+$"
                    },
                    "uniqueItems": true
                  },
                  "destructive": {
                    "type": "boolean"
                  },
                  "operation_type": {
                    "const": "move_asset_variant"
                  },
                  "variant_ref": {
                    "$ref": "urn:aigs:schema:v1:definition-ref"
                  },
                  "new_project_path": {
                    "type": "string",
                    "minLength": 1
                  }
                },
                "required": [
                  "operation_id",
                  "operation_type",
                  "depends_on",
                  "destructive",
                  "variant_ref",
                  "new_project_path"
                ]
              },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "operation_id": {
                    "type": "string",
                    "pattern": "^op-[A-Za-z0-9_-]+$"
                  },
                  "depends_on": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^op-[A-Za-z0-9_-]+$"
                    },
                    "uniqueItems": true
                  },
                  "destructive": {
                    "type": "boolean"
                  },
                  "operation_type": {
                    "const": "generate_asset_request"
                  },
                  "asset_identity_ref": {
                    "$ref": "urn:aigs:schema:v1:definition-ref"
                  },
                  "variant_spec_ids": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "minLength": 1
                    },
                    "minItems": 1
                  }
                },
                "required": [
                  "operation_id",
                  "operation_type",
                  "depends_on",
                  "destructive",
                  "asset_identity_ref",
                  "variant_spec_ids"
                ]
              }
            ]
          },
          "minItems": 1
        },
        "provenance": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "actor": {
              "enum": [
                "creator",
                "creator_copilot",
                "system",
                "migration"
              ]
            },
            "ai_role_ref": {
              "oneOf": [
                {
                  "type": "null"
                },
                {
                  "$ref": "urn:aigs:schema:v1:definition-ref"
                }
              ]
            }
          },
          "required": [
            "actor",
            "ai_role_ref"
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "changeset_id",
        "request_summary",
        "mode",
        "operations",
        "provenance"
      ]
    }
  },
  {
    "schemaId": "aigs.character.definition",
    "urn": "urn:aigs:schema:v1:character-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:character-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.character.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "character"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "persona": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "summary": {
              "type": "string"
            },
            "background": {
              "type": "string"
            },
            "personality": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "uniqueItems": true
            },
            "speech": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "register": {
                  "type": "string"
                },
                "notes": {
                  "type": "string"
                }
              }
            },
            "values": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "uniqueItems": true
            },
            "fears": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "uniqueItems": true
            },
            "desires": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "uniqueItems": true
            },
            "secrets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "visual_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "component_config_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "default_controller_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "initial_location_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "persona"
      ]
    }
  },
  {
    "schemaId": "aigs.character.state",
    "urn": "urn:aigs:schema:v1:character-state",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:character-state",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.character.state"
        },
        "schema_version": {
          "const": 1
        },
        "instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "definition_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "location_instance_id": {
          "type": [
            "string",
            "null"
          ],
          "format": "uuid"
        },
        "active_activity_id": {
          "type": [
            "string",
            "null"
          ],
          "format": "uuid"
        },
        "controller_binding_id": {
          "type": [
            "string",
            "null"
          ],
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "instance_id",
        "definition_ref",
        "location_instance_id",
        "active_activity_id",
        "controller_binding_id"
      ]
    }
  },
  {
    "schemaId": "aigs.controller.binding",
    "urn": "urn:aigs:schema:v1:controller-binding",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:controller-binding",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.controller.binding"
        },
        "schema_version": {
          "const": 1
        },
        "binding_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "character_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "controller_profile_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "binding_id",
        "character_instance_id",
        "controller_profile_ref"
      ]
    }
  },
  {
    "schemaId": "aigs.controller.profile",
    "urn": "urn:aigs:schema:v1:controller-profile",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:controller-profile",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.controller.profile"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "controller_profile"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "controller_type": {
          "enum": [
            "human",
            "ai",
            "replay",
            "test",
            "remote"
          ]
        },
        "ai_role_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "decision_policy": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "decision_mode": {
              "enum": [
                "event_driven",
                "manual",
                "replay",
                "test"
              ]
            },
            "minimum_replan_interval_ms": {
              "type": "integer",
              "minimum": 0
            },
            "allow_routine_shortcuts": {
              "type": "boolean"
            }
          },
          "required": [
            "decision_mode"
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "controller_type",
        "decision_policy"
      ]
    }
  },
  {
    "schemaId": "aigs.event.definition",
    "urn": "urn:aigs:schema:v1:event-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:event-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.event.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "event"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "trigger": {
          "$ref": "urn:aigs:schema:v1:trigger-definition"
        },
        "condition": {
          "oneOf": [
            {
              "type": "null"
            },
            {
              "$ref": "urn:aigs:schema:v1:condition-expression"
            }
          ]
        },
        "effects": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:effect-operation"
          },
          "minItems": 1
        },
        "repeat": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "mode": {
              "enum": [
                "once",
                "unlimited",
                "limited"
              ]
            },
            "max_occurrences": {
              "type": [
                "integer",
                "null"
              ],
              "minimum": 1
            },
            "cooldown_game_seconds": {
              "type": "integer",
              "minimum": 0
            }
          },
          "required": [
            "mode",
            "cooldown_game_seconds"
          ]
        },
        "priority": {
          "type": "integer",
          "minimum": -1000,
          "maximum": 1000
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "trigger",
        "condition",
        "effects",
        "repeat"
      ]
    }
  },
  {
    "schemaId": "aigs.item.definition",
    "urn": "urn:aigs:schema:v1:item-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:item-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.item.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "item"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "stacking": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "stackable": {
              "type": "boolean"
            },
            "max_stack": {
              "type": "integer",
              "minimum": 1
            }
          },
          "required": [
            "stackable",
            "max_stack"
          ]
        },
        "affordance_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "asset_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "stacking"
      ]
    }
  },
  {
    "schemaId": "aigs.knowledge.view",
    "urn": "urn:aigs:schema:v1:knowledge-view",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:knowledge-view",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.knowledge.view"
        },
        "schema_version": {
          "const": 1
        },
        "owner_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "generated_game_time": {
          "type": "integer",
          "minimum": 0
        },
        "entries": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "classification": {
                "enum": [
                  "known",
                  "believed",
                  "suspected",
                  "remembered",
                  "reported_by_other"
                ]
              },
              "fact": {
                "$ref": "urn:aigs:schema:v1:fact"
              },
              "confidence": {
                "type": "number",
                "minimum": 0,
                "maximum": 1
              },
              "source_refs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "type": {
                      "enum": [
                        "perception",
                        "memory",
                        "report",
                        "inference",
                        "system"
                      ]
                    },
                    "id": {
                      "type": "string",
                      "minLength": 1
                    }
                  },
                  "required": [
                    "type",
                    "id"
                  ]
                }
              }
            },
            "required": [
              "classification",
              "fact",
              "confidence",
              "source_refs"
            ]
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "owner_instance_id",
        "generated_game_time",
        "entries"
      ]
    }
  },
  {
    "schemaId": "aigs.location.definition",
    "urn": "urn:aigs:schema:v1:location-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:location-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.location.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "location"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "child_location_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "visual_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "component_config_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name"
      ]
    }
  },
  {
    "schemaId": "aigs.memory.record",
    "urn": "urn:aigs:schema:v1:memory-record",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:memory-record",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.memory.record"
        },
        "schema_version": {
          "const": 1
        },
        "memory_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "owner_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "memory_type": {
          "enum": [
            "episodic",
            "semantic",
            "reported",
            "procedural_hint"
          ]
        },
        "summary": {
          "type": "string",
          "minLength": 1
        },
        "participants": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:runtime-instance-ref"
          },
          "uniqueItems": true
        },
        "source_event_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uuid"
          },
          "uniqueItems": true
        },
        "learned_facts": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:fact"
          }
        },
        "salience": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
        "affect": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "valence": {
              "type": "number",
              "minimum": -1,
              "maximum": 1
            },
            "arousal": {
              "type": "number",
              "minimum": 0,
              "maximum": 1
            }
          },
          "required": [
            "valence",
            "arousal"
          ]
        },
        "created_game_time": {
          "type": "integer",
          "minimum": 0
        },
        "retention": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "policy": {
              "enum": [
                "short",
                "normal",
                "long",
                "permanent"
              ]
            }
          },
          "required": [
            "policy"
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "memory_id",
        "owner_instance_id",
        "memory_type",
        "summary",
        "participants",
        "source_event_ids",
        "learned_facts",
        "salience",
        "affect",
        "created_game_time",
        "retention"
      ]
    }
  },
  {
    "schemaId": "aigs.object.definition",
    "urn": "urn:aigs:schema:v1:object-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:object-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.object.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "object"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "affordance_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "component_config_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "asset_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "portable": {
          "type": "boolean"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name"
      ]
    }
  },
  {
    "schemaId": "aigs.perception.record",
    "urn": "urn:aigs:schema:v1:perception-record",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:perception-record",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.perception.record"
        },
        "schema_version": {
          "const": 1
        },
        "perception_id": {
          "type": "string",
          "format": "uuid"
        },
        "observer_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "source_event_id": {
          "type": [
            "string",
            "null"
          ],
          "format": "uuid"
        },
        "channel": {
          "enum": [
            "vision",
            "hearing",
            "touch",
            "smell",
            "system",
            "reported"
          ]
        },
        "facts": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:fact"
          },
          "minItems": 1
        },
        "confidence": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
        "game_time": {
          "type": "integer",
          "minimum": 0
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "perception_id",
        "observer_instance_id",
        "source_event_id",
        "channel",
        "facts",
        "confidence",
        "game_time"
      ]
    }
  },
  {
    "schemaId": "aigs.project.manifest",
    "urn": "urn:aigs:schema:v1:project-manifest",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:project-manifest",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.project.manifest"
        },
        "schema_version": {
          "const": 1
        },
        "project_id": {
          "type": "string",
          "pattern": "^project\\.[a-z0-9][a-z0-9_-]*$"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "project_format_version": {
          "type": "integer",
          "minimum": 1
        },
        "definition_roots": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "uniqueItems": true
        },
        "asset_catalog_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "default_ai_profiles": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "creator_copilot": {
              "$ref": "urn:aigs:schema:v1:definition-ref"
            },
            "npc_planner": {
              "$ref": "urn:aigs:schema:v1:definition-ref"
            },
            "npc_dialogue": {
              "$ref": "urn:aigs:schema:v1:definition-ref"
            }
          }
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "project_id",
        "display_name",
        "project_format_version",
        "definition_roots"
      ]
    }
  },
  {
    "schemaId": "aigs.relationship_dimension.definition",
    "urn": "urn:aigs:schema:v1:relationship-dimension-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:relationship-dimension-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.relationship_dimension.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "relationship_dimension"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "range": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "min": {
              "type": "number"
            },
            "max": {
              "type": "number"
            },
            "default": {
              "type": "number"
            }
          },
          "required": [
            "min",
            "max",
            "default"
          ]
        },
        "ai_description": {
          "type": "string"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "range"
      ]
    }
  },
  {
    "schemaId": "aigs.relationship.state",
    "urn": "urn:aigs:schema:v1:relationship-state",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:relationship-state",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.relationship.state"
        },
        "schema_version": {
          "const": 1
        },
        "relationship_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "source_character_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "target_character_instance_id": {
          "type": "string",
          "format": "uuid"
        },
        "dimension_values": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "number"
          }
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "relationship_id",
        "source_character_instance_id",
        "target_character_instance_id",
        "dimension_values"
      ]
    }
  },
  {
    "schemaId": "aigs.room.definition",
    "urn": "urn:aigs:schema:v1:room-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:room-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.room.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "room"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "parent_location_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "object_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "portal_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "visual_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "component_config_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name",
        "parent_location_ref"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.action_open_parameters",
    "urn": "urn:aigs:schema:v1:action-open-parameters",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:action-open-parameters",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "target_instance_id": {
          "type": "string",
          "format": "uuid"
        }
      },
      "required": [
        "target_instance_id"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.activity_cook_meal_parameters",
    "urn": "urn:aigs:schema:v1:activity-cook-meal-parameters",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:activity-cook-meal-parameters",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "recipe_ref": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        }
      },
      "required": [
        "recipe_ref"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.asset_variant_ref",
    "urn": "urn:aigs:schema:v1:asset-variant-ref",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:asset-variant-ref",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "variant_id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        }
      },
      "required": [
        "variant_id"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.condition_expression",
    "urn": "urn:aigs:schema:v1:condition-expression",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:condition-expression",
      "$defs": {
        "operand": {
          "oneOf": [
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "literal": {}
              },
              "required": [
                "literal"
              ]
            },
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "source": {
                  "enum": [
                    "actor_state",
                    "target_state",
                    "event_payload",
                    "project_variable"
                  ]
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "minLength": 1
                  },
                  "minItems": 1
                }
              },
              "required": [
                "source",
                "path"
              ]
            },
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "source": {
                  "const": "referenced_entity_state"
                },
                "entity_ref": {
                  "$ref": "urn:aigs:schema:v1:definition-ref"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "minLength": 1
                  },
                  "minItems": 1
                }
              },
              "required": [
                "source",
                "entity_ref",
                "path"
              ]
            }
          ]
        },
        "eq": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "eq"
            },
            "left": {
              "$ref": "#/$defs/operand"
            },
            "right": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "left",
            "right"
          ]
        },
        "neq": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "neq"
            },
            "left": {
              "$ref": "#/$defs/operand"
            },
            "right": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "left",
            "right"
          ]
        },
        "gt": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "gt"
            },
            "left": {
              "$ref": "#/$defs/operand"
            },
            "right": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "left",
            "right"
          ]
        },
        "gte": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "gte"
            },
            "left": {
              "$ref": "#/$defs/operand"
            },
            "right": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "left",
            "right"
          ]
        },
        "lt": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "lt"
            },
            "left": {
              "$ref": "#/$defs/operand"
            },
            "right": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "left",
            "right"
          ]
        },
        "lte": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "lte"
            },
            "left": {
              "$ref": "#/$defs/operand"
            },
            "right": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "left",
            "right"
          ]
        },
        "all": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "all"
            },
            "args": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/expression"
              },
              "minItems": 1
            }
          },
          "required": [
            "op",
            "args"
          ]
        },
        "any": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "any"
            },
            "args": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/expression"
              },
              "minItems": 1
            }
          },
          "required": [
            "op",
            "args"
          ]
        },
        "not": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "not"
            },
            "arg": {
              "$ref": "#/$defs/expression"
            }
          },
          "required": [
            "op",
            "arg"
          ]
        },
        "exists": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "exists"
            },
            "value": {
              "$ref": "#/$defs/operand"
            }
          },
          "required": [
            "op",
            "value"
          ]
        },
        "has_tag": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "op": {
              "const": "has_tag"
            },
            "value": {
              "$ref": "#/$defs/operand"
            },
            "tag": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9_-]*$"
            }
          },
          "required": [
            "op",
            "value",
            "tag"
          ]
        },
        "expression": {
          "oneOf": [
            {
              "$ref": "#/$defs/eq"
            },
            {
              "$ref": "#/$defs/neq"
            },
            {
              "$ref": "#/$defs/gt"
            },
            {
              "$ref": "#/$defs/gte"
            },
            {
              "$ref": "#/$defs/lt"
            },
            {
              "$ref": "#/$defs/lte"
            },
            {
              "$ref": "#/$defs/all"
            },
            {
              "$ref": "#/$defs/any"
            },
            {
              "$ref": "#/$defs/not"
            },
            {
              "$ref": "#/$defs/exists"
            },
            {
              "$ref": "#/$defs/has_tag"
            }
          ]
        }
      },
      "$ref": "#/$defs/expression"
    }
  },
  {
    "schemaId": "aigs.schema.definition_ref",
    "urn": "urn:aigs:schema:v1:definition-ref",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:definition-ref",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "ref": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        }
      },
      "required": [
        "ref"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.effect_operation",
    "urn": "urn:aigs:schema:v1:effect-operation",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:effect-operation",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "effect_type": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "parameters": {
          "type": "object"
        }
      },
      "required": [
        "effect_type",
        "parameters"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.entity_handle",
    "urn": "urn:aigs:schema:v1:entity-handle",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:entity-handle",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "definition_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        },
        "instance_id": {
          "type": "string",
          "format": "uuid"
        }
      },
      "required": [
        "definition_ref",
        "instance_id"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.fact",
    "urn": "urn:aigs:schema:v1:fact",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:fact",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "subject": {
          "$ref": "urn:aigs:schema:v1:entity-handle"
        },
        "predicate": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "value": {},
        "qualifiers": {
          "type": "object"
        }
      },
      "required": [
        "subject",
        "predicate",
        "value",
        "qualifiers"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.runtime_instance_ref",
    "urn": "urn:aigs:schema:v1:runtime-instance-ref",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:runtime-instance-ref",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "instance_id": {
          "type": "string",
          "format": "uuid"
        }
      },
      "required": [
        "instance_id"
      ]
    }
  },
  {
    "schemaId": "aigs.schema.safe_config_value",
    "urn": "urn:aigs:schema:v1:safe-config-value",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:safe-config-value",
      "oneOf": [
        {
          "type": [
            "string",
            "number",
            "boolean",
            "null"
          ]
        },
        {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:safe-config-value"
          }
        },
        {
          "type": "object",
          "propertyNames": {
            "pattern": "^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"
          },
          "additionalProperties": {
            "$ref": "urn:aigs:schema:v1:safe-config-value"
          }
        }
      ]
    }
  },
  {
    "schemaId": "aigs.schema.trigger_definition",
    "urn": "urn:aigs:schema:v1:trigger-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:trigger-definition",
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "trigger_type": {
              "const": "world_event"
            },
            "event_type": {
              "type": "string",
              "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
            },
            "filters": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "actor_definition_ref": {
                  "$ref": "urn:aigs:schema:v1:definition-ref"
                },
                "target_definition_ref": {
                  "$ref": "urn:aigs:schema:v1:definition-ref"
                }
              }
            }
          },
          "required": [
            "trigger_type",
            "event_type"
          ]
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "trigger_type": {
              "const": "game_time"
            },
            "at_game_time": {
              "type": "integer",
              "minimum": 0
            },
            "repeat_every_game_seconds": {
              "type": [
                "integer",
                "null"
              ],
              "minimum": 1
            }
          },
          "required": [
            "trigger_type",
            "at_game_time",
            "repeat_every_game_seconds"
          ]
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "trigger_type": {
              "const": "threshold"
            },
            "condition": {
              "$ref": "urn:aigs:schema:v1:condition-expression"
            },
            "edge": {
              "enum": [
                "rising",
                "falling",
                "either"
              ]
            }
          },
          "required": [
            "trigger_type",
            "condition",
            "edge"
          ]
        }
      ]
    }
  },
  {
    "schemaId": "aigs.schema.validation_error",
    "urn": "urn:aigs:schema:v1:validation-error",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:validation-error",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "code": {
          "type": "string",
          "pattern": "^[A-Z][A-Z0-9_]+$"
        },
        "severity": {
          "enum": [
            "error",
            "warning",
            "info"
          ]
        },
        "schema_id": {
          "type": [
            "string",
            "null"
          ]
        },
        "object_id": {
          "type": [
            "string",
            "null"
          ]
        },
        "path": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "integer"
              }
            ]
          }
        },
        "message": {
          "type": "string"
        },
        "details": {
          "type": "object"
        }
      },
      "required": [
        "code",
        "severity",
        "schema_id",
        "object_id",
        "path",
        "message",
        "details"
      ]
    }
  },
  {
    "schemaId": "aigs.world_entity.definition",
    "urn": "urn:aigs:schema:v1:world-entity-definition",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:world-entity-definition",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.world_entity.definition"
        },
        "schema_version": {
          "const": 1
        },
        "id": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
        },
        "kind": {
          "const": "world_entity"
        },
        "display_name": {
          "type": "string",
          "minLength": 1
        },
        "description": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z0-9][a-z0-9_-]*$"
          },
          "uniqueItems": true
        },
        "extensions": {
          "type": "object",
          "propertyNames": {
            "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"
          },
          "additionalProperties": {
            "type": "object"
          }
        },
        "affordance_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "component_config_refs": {
          "type": "array",
          "items": {
            "$ref": "urn:aigs:schema:v1:definition-ref"
          },
          "uniqueItems": true
        },
        "asset_identity_ref": {
          "$ref": "urn:aigs:schema:v1:definition-ref"
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "id",
        "kind",
        "display_name"
      ]
    }
  },
  {
    "schemaId": "aigs.world_event",
    "urn": "urn:aigs:schema:v1:world-event",
    "schema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "urn:aigs:schema:v1:world-event",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "schema_id": {
          "const": "aigs.world_event"
        },
        "schema_version": {
          "const": 1
        },
        "event_id": {
          "type": "string",
          "format": "uuid"
        },
        "event_type": {
          "type": "string",
          "pattern": "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"
        },
        "game_time": {
          "type": "integer",
          "minimum": 0
        },
        "actor_instance_id": {
          "type": [
            "string",
            "null"
          ],
          "format": "uuid"
        },
        "target_instance_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uuid"
          },
          "uniqueItems": true
        },
        "payload": {
          "type": "object"
        },
        "causal": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "action_request_id": {
              "type": [
                "string",
                "null"
              ],
              "format": "uuid"
            },
            "parent_event_id": {
              "type": [
                "string",
                "null"
              ],
              "format": "uuid"
            }
          },
          "required": [
            "action_request_id",
            "parent_event_id"
          ]
        }
      },
      "required": [
        "schema_id",
        "schema_version",
        "event_id",
        "event_type",
        "game_time",
        "actor_instance_id",
        "target_instance_ids",
        "payload",
        "causal"
      ]
    }
  }
] as const;
