extends RefCounted

const PROJECT_SCHEMA := "aigs.project.manifest"
const CHARACTER_SCHEMA := "aigs.character.definition"
const LOCATION_SCHEMA := "aigs.location.definition"
const DIALOGUE_SCHEMA := "aigs.dialogue.scene"
const ASSET_IDENTITY_SCHEMA := "aigs.asset_identity.definition"
const ASSET_VARIANT_SCHEMA := "aigs.asset_variant.record"
const ASSET_CATALOG_SCHEMA := "aigs.asset_catalog.definition"

static func load_project(root_path: String, start_location_ref: String = "", entry_scene_ref: String = "") -> Dictionary:
    var errors: Array[String] = []
    var warnings: Array[String] = []
    var project := {
        "root_path": root_path,
        "manifest": {},
        "characters": {},
        "locations": {},
        "dialogue_scenes": {},
        "asset_identities": {},
        "asset_variants": {},
        "asset_catalogs": {},
    }

    if root_path.is_empty() or not DirAccess.dir_exists_absolute(root_path):
        errors.append("Project root does not exist: %s" % root_path)
        return _result(project, errors, warnings)

    var manifest_result := _read_json(root_path.path_join("project.json"))
    if not manifest_result.ok:
        errors.append(manifest_result.error)
        return _result(project, errors, warnings)
    var manifest: Variant = manifest_result.value
    if typeof(manifest) != TYPE_DICTIONARY:
        errors.append("project.json must contain a JSON object.")
        return _result(project, errors, warnings)
    if manifest.get("schema_id") != PROJECT_SCHEMA:
        errors.append("project.json is not an AI Game Studio project manifest.")
        return _result(project, errors, warnings)
    project.manifest = manifest

    var roots: Variant = manifest.get("definition_roots", [])
    if typeof(roots) != TYPE_ARRAY:
        errors.append("project.json definition_roots must be an array.")
        return _result(project, errors, warnings)

    for root_value in roots:
        if typeof(root_value) != TYPE_STRING or not _is_safe_relative_path(root_value):
            errors.append("Unsafe definition root in project.json: %s" % str(root_value))
            continue
        _scan_definition_root(root_path, root_value, project, errors)

    _validate_asset_paths(root_path, project.asset_variants, errors, warnings)

    if not start_location_ref.is_empty() and not project.locations.has(start_location_ref):
        errors.append("Start Location was not found: %s" % start_location_ref)
    if not entry_scene_ref.is_empty() and not project.dialogue_scenes.has(entry_scene_ref):
        errors.append("Entry Scene was not found: %s" % entry_scene_ref)

    return _result(project, errors, warnings)

static func _result(project: Dictionary, errors: Array[String], warnings: Array[String]) -> Dictionary:
    return {
        "ok": errors.is_empty(),
        "project": project,
        "errors": errors,
        "warnings": warnings,
    }

static func _read_json(path: String) -> Dictionary:
    if not FileAccess.file_exists(path):
        return {"ok": false, "error": "Required JSON file was not found: %s" % path.get_file()}
    var file := FileAccess.open(path, FileAccess.READ)
    if file == null:
        return {"ok": false, "error": "Could not open JSON file: %s" % path}
    var parser := JSON.new()
    var parse_error := parser.parse(file.get_as_text())
    if parse_error != OK:
        return {
            "ok": false,
            "error": "Invalid JSON in %s at line %d: %s" % [path.get_file(), parser.get_error_line(), parser.get_error_message()]
        }
    return {"ok": true, "value": parser.data}

static func _scan_definition_root(root_path: String, relative_root: String, project: Dictionary, errors: Array[String]) -> void:
    var directory_path := root_path.path_join(relative_root)
    if not DirAccess.dir_exists_absolute(directory_path):
        return
    for filename in DirAccess.get_files_at(directory_path):
        if not filename.to_lower().ends_with(".json"):
            continue
        var document_result := _read_json(directory_path.path_join(filename))
        if not document_result.ok:
            errors.append(document_result.error)
            continue
        var document: Variant = document_result.value
        if typeof(document) != TYPE_DICTIONARY:
            errors.append("Definition file must contain an object: %s" % filename)
            continue
        _index_document(document, project, errors, relative_root.path_join(filename))

static func _index_document(document: Dictionary, project: Dictionary, errors: Array[String], source: String) -> void:
    var schema_id := str(document.get("schema_id", ""))
    match schema_id:
        CHARACTER_SCHEMA:
            _insert_definition(project.characters, document, "id", source, errors)
        LOCATION_SCHEMA:
            _insert_definition(project.locations, document, "id", source, errors)
        DIALOGUE_SCHEMA:
            _insert_definition(project.dialogue_scenes, document, "id", source, errors)
        ASSET_IDENTITY_SCHEMA:
            _insert_definition(project.asset_identities, document, "id", source, errors)
        ASSET_VARIANT_SCHEMA:
            _insert_definition(project.asset_variants, document, "variant_id", source, errors)
        ASSET_CATALOG_SCHEMA:
            _insert_definition(project.asset_catalogs, document, "id", source, errors)
        _:
            pass

static func _insert_definition(index: Dictionary, document: Dictionary, id_key: String, source: String, errors: Array[String]) -> void:
    var identifier: Variant = document.get(id_key)
    if typeof(identifier) != TYPE_STRING or identifier.is_empty():
        errors.append("Definition in %s is missing %s." % [source, id_key])
        return
    if index.has(identifier):
        errors.append("Duplicate definition ID %s in %s." % [identifier, source])
        return
    index[identifier] = document

static func _validate_asset_paths(root_path: String, variants: Dictionary, errors: Array[String], warnings: Array[String]) -> void:
    for variant_id in variants:
        var variant: Dictionary = variants[variant_id]
        var storage: Variant = variant.get("storage")
        if typeof(storage) != TYPE_DICTIONARY:
            errors.append("Asset variant %s is missing storage metadata." % variant_id)
            continue
        var project_path: Variant = storage.get("project_path")
        if typeof(project_path) != TYPE_STRING or project_path.is_empty():
            errors.append("Asset variant %s is missing storage.project_path." % variant_id)
            continue
        if not _is_safe_relative_path(project_path):
            errors.append("Unsafe asset project_path for %s: %s" % [variant_id, project_path])
            continue
        if not FileAccess.file_exists(root_path.path_join(project_path)):
            warnings.append("Optional visual asset is missing: %s" % project_path)

static func _is_safe_relative_path(value: String) -> bool:
    if value.is_empty() or value.begins_with("/") or value.begins_with("\\") or value.contains("\\") or value.contains(":"):
        return false
    var parts := value.split("/", false)
    if parts.is_empty():
        return false
    for part in parts:
        if part.is_empty() or part == "." or part == "..":
            return false
    return true
