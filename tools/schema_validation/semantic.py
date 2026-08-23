from __future__ import annotations

from typing import Any


CORE_EXECUTORS = {
    "core.action.open",
    "core.action.close",
    "core.action.lock",
    "core.action.unlock",
    "core.action.take",
    "core.action.give",
    "core.action.eat",
    "core.action.talk_to",
    "core.action.move_to",
    "core.activity.cook_meal",
    "core.activity.sleep",
}

CORE_EFFECTS = {
    "core.emit_event",
    "core.request_action",
    "core.start_dialogue",
    "core.modify_relationship",
    "core.create_memory_seed",
    "core.set_project_variable",
    "core.notify_perception",
}

CORE_EXTENSION_NAMESPACES = set()


def error(code: str, message: str, object_id=None, path=None, details=None):
    return {
        "code": code,
        "severity": "error",
        "schema_id": None,
        "object_id": object_id,
        "path": path or [],
        "message": message,
        "details": details or {},
    }


def iter_definition_refs(value: Any, path=()):
    if isinstance(value, dict):
        if set(value.keys()) == {"ref"} and isinstance(value["ref"], str):
            yield path, value["ref"]
            return
        for key, child in value.items():
            yield from iter_definition_refs(child, (*path, key))
    elif isinstance(value, list):
        for i, child in enumerate(value):
            yield from iter_definition_refs(child, (*path, i))


class SemanticValidator:
    def __init__(self, registry):
        self.registry = registry

    def validate_project(self, project: dict) -> list[dict]:
        errors = []
        definitions = project.get("definitions", [])
        by_id = {}
        duplicates = set()
        valid_definitions = []

        for i, definition in enumerate(definitions):
            try:
                structural = list(self.registry.validate_document(definition))
            except (KeyError, ValueError, AttributeError) as exc:
                errors.append(error("SCHEMA_UNKNOWN", str(exc), path=["definitions", i]))
                continue
            for structural_error in structural:
                errors.append(error(
                    "STRUCTURAL_VALIDATION_FAILED",
                    structural_error.message,
                    object_id=definition.get("id"),
                    path=["definitions", i, *list(structural_error.absolute_path)],
                ))

            definition_id = definition.get("id")
            if definition_id:
                if definition_id in by_id:
                    duplicates.add(definition_id)
                by_id[definition_id] = definition
            if not structural:
                valid_definitions.append(definition)

        for definition_id in sorted(duplicates):
            errors.append(error(
                "DUPLICATE_DEFINITION_ID",
                f"Duplicate definition ID: {definition_id}",
                object_id=definition_id,
                details={"id": definition_id},
            ))

        for definition in valid_definitions:
            object_id = definition.get("id")
            for path, ref in iter_definition_refs(definition):
                if ref not in by_id:
                    errors.append(error(
                        "REFERENCE_NOT_FOUND",
                        f"Reference {ref} does not exist.",
                        object_id=object_id,
                        path=list(path),
                        details={"ref": ref},
                    ))

        valid_dimensions = {}
        for definition in valid_definitions:
            sid = definition.get("schema_id")
            object_id = definition.get("id")
            if sid in {"aigs.action.definition", "aigs.activity.definition"}:
                executor_key = definition.get("executor_key")
                if executor_key not in CORE_EXECUTORS:
                    errors.append(error(
                        "EXECUTOR_NOT_REGISTERED",
                        f"Executor {executor_key} is not registered.",
                        object_id=object_id,
                        path=["executor_key"],
                        details={"executor_key": executor_key},
                    ))
                parameter_schema = definition.get("parameters_schema_ref")
                if parameter_schema and not self.registry.has_urn(parameter_schema):
                    errors.append(error(
                        "PARAMETER_SCHEMA_NOT_REGISTERED",
                        f"Parameter schema {parameter_schema} is not registered.",
                        object_id=object_id,
                        path=["parameters_schema_ref"],
                        details={"urn": parameter_schema},
                    ))
            if sid == "aigs.event.definition":
                for index, effect in enumerate(definition.get("effects", [])):
                    if effect.get("effect_type") not in CORE_EFFECTS:
                        errors.append(error(
                            "EFFECT_NOT_REGISTERED",
                            f"Effect {effect.get('effect_type')} is not registered.",
                            object_id=object_id,
                            path=["effects", index, "effect_type"],
                            details={"effect_type": effect.get("effect_type")},
                        ))
            if sid == "aigs.relationship_dimension.definition":
                bounds = definition["range"]
                if bounds["min"] > bounds["max"]:
                    errors.append(error(
                        "RELATIONSHIP_RANGE_INVALID",
                        f"Relationship range min {bounds['min']} exceeds max {bounds['max']}.",
                        object_id=object_id,
                        path=["range"],
                        details=bounds,
                    ))
                else:
                    if bounds["default"] < bounds["min"] or bounds["default"] > bounds["max"]:
                        errors.append(error(
                            "RELATIONSHIP_DEFAULT_OUT_OF_RANGE",
                            f"Relationship default {bounds['default']} is outside [{bounds['min']}, {bounds['max']}].",
                            object_id=object_id,
                            path=["range", "default"],
                            details=bounds,
                        ))
                    valid_dimensions[object_id] = definition
            for namespace in definition.get("extensions", {}):
                if namespace not in CORE_EXTENSION_NAMESPACES:
                    errors.append(error(
                        "UNKNOWN_EXTENSION_NAMESPACE",
                        f"Extension namespace {namespace} is not registered.",
                        object_id=object_id,
                        path=["extensions", namespace],
                        details={"namespace": namespace},
                    ))

        for state in project.get("runtime_documents", []):
            if not isinstance(state, dict) or state.get("schema_id") != "aigs.relationship.state":
                continue
            try:
                structural = list(self.registry.validate_document(state))
            except (KeyError, ValueError, AttributeError) as exc:
                errors.append(error("SCHEMA_UNKNOWN", str(exc), path=["runtime_documents"]))
                continue
            for structural_error in structural:
                errors.append(error(
                    "STRUCTURAL_VALIDATION_FAILED",
                    structural_error.message,
                    object_id=state.get("relationship_id"),
                    path=["runtime_documents", *list(structural_error.absolute_path)],
                ))
            if structural:
                continue
            for dim_id, value in state.get("dimension_values", {}).items():
                dim = valid_dimensions.get(dim_id)
                if not dim:
                    if dim_id not in by_id:
                        errors.append(error(
                            "REFERENCE_NOT_FOUND",
                            f"Relationship dimension {dim_id} does not exist.",
                            object_id=state.get("relationship_id"),
                            path=["dimension_values", dim_id],
                            details={"ref": dim_id},
                        ))
                    continue
                bounds = dim["range"]
                if value < bounds["min"] or value > bounds["max"]:
                    errors.append(error(
                        "RELATIONSHIP_VALUE_OUT_OF_RANGE",
                        f"{dim_id} value {value} is outside [{bounds['min']}, {bounds['max']}].",
                        object_id=state.get("relationship_id"),
                        path=["dimension_values", dim_id],
                        details={"dimension": dim_id, "value": value, "min": bounds["min"], "max": bounds["max"]},
                    ))

        for changeset in project.get("changesets", []):
            if isinstance(changeset, dict):
                errors.extend(self.validate_changeset(changeset))
            else:
                errors.append(error("STRUCTURAL_VALIDATION_FAILED", "ChangeSet must be an object."))

        errors.sort(key=lambda e: (e["code"], str(e.get("object_id")), str(e.get("path"))))
        return errors

    def validate_changeset(self, changeset: dict) -> list[dict]:
        errors = []
        try:
            structural = list(self.registry.validate_document(changeset))
        except (KeyError, ValueError, AttributeError) as exc:
            return [error("SCHEMA_UNKNOWN", str(exc))]
        for structural_error in structural:
            errors.append(error(
                "STRUCTURAL_VALIDATION_FAILED",
                structural_error.message,
                object_id=changeset.get("changeset_id"),
                path=list(structural_error.absolute_path),
            ))
        if structural:
            return errors

        operations = changeset.get("operations", [])
        op_ids = [op["operation_id"] for op in operations]
        duplicate_ids = sorted({op_id for op_id in op_ids if op_ids.count(op_id) > 1})
        for op_id in duplicate_ids:
            errors.append(error(
                "CHANGESET_DUPLICATE_OPERATION_ID",
                f"Operation ID {op_id} is duplicated.",
                object_id=changeset.get("changeset_id"),
                path=["operations"],
                details={"operation_id": op_id},
            ))

        known = set(op_ids)
        for op in operations:
            for dep in op.get("depends_on", []):
                if dep not in known:
                    errors.append(error(
                        "CHANGESET_DEPENDENCY_NOT_FOUND",
                        f"Dependency {dep} does not exist.",
                        object_id=changeset.get("changeset_id"),
                        path=["operations", op.get("operation_id"), "depends_on"],
                    ))

        graph = {op["operation_id"]: set(op.get("depends_on", [])) for op in operations}
        visiting, visited = set(), set()

        def visit(node):
            if node in visited:
                return False
            if node in visiting:
                return True
            visiting.add(node)
            for dep in graph.get(node, ()):
                if dep in graph and visit(dep):
                    return True
            visiting.remove(node)
            visited.add(node)
            return False

        if any(visit(node) for node in list(graph)):
            errors.append(error(
                "CHANGESET_DEPENDENCY_CYCLE",
                "ChangeSet dependency graph contains a cycle.",
                object_id=changeset.get("changeset_id"),
            ))
        return errors
