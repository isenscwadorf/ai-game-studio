extends SceneTree

const ProjectLoader = preload("res://src/project_loader.gd")
var failures: Array[String] = []

func _init() -> void:
    var root := ProjectSettings.globalize_path("user://aigs-project-loader-%s" % Time.get_ticks_usec())
    DirAccess.make_dir_recursive_absolute(root)
    _test_valid_project(root + "/valid")
    _test_missing_manifest(root + "/missing")
    _test_invalid_json(root + "/invalid")
    _test_unsafe_asset_path(root + "/unsafe")
    _test_missing_optional_asset_warns(root + "/warning")
    _test_missing_start_refs(root + "/refs")
    if failures.is_empty():
        print("PASS test_project_loader")
        quit(0)
    for failure in failures:
        push_error(failure)
    quit(1)

func _assert(condition: bool, message: String) -> void:
    if not condition:
        failures.append(message)

func _write_text(path: String, text: String) -> void:
    DirAccess.make_dir_recursive_absolute(path.get_base_dir())
    var file := FileAccess.open(path, FileAccess.WRITE)
    _assert(file != null, "failed to open %s for write" % path)
    if file:
        file.store_string(text)

func _write_json(path: String, value: Variant) -> void:
    _write_text(path, JSON.stringify(value, "  "))

func _base_manifest() -> Dictionary:
    return {
        "schema_id": "aigs.project.manifest",
        "schema_version": 1,
        "project_id": "project.runtime_test",
        "display_name": "Runtime Test",
        "project_format_version": 1,
        "definition_roots": ["characters", "locations", "dialogue", "assets/variants"]
    }

func _write_location(root: String) -> void:
    _write_json(root + "/locations/location.kitchen.json", {
        "schema_id": "aigs.location.definition", "schema_version": 1,
        "id": "location.kitchen", "kind": "location", "display_name": "Kitchen"
    })

func _write_scene(root: String) -> void:
    _write_json(root + "/dialogue/dialogue.scene_intro.json", {
        "schema_id": "aigs.dialogue_scene.definition", "schema_version": 1,
        "id": "dialogue.scene_intro", "kind": "dialogue_scene", "display_name": "Intro",
        "input_mode": "free", "entry_id": "entry.start",
        "entries": [{"id": "entry.start", "type": "narration", "text": "Snow falls.", "next": null}]
    })

func _test_valid_project(root: String) -> void:
    _write_json(root + "/project.json", _base_manifest())
    _write_location(root)
    _write_scene(root)
    var result: Dictionary = ProjectLoader.load_project(root, "location.kitchen", "dialogue.scene_intro")
    _assert(result.get("ok") == true, "valid project should load: %s" % result.get("errors", []))
    _assert(result.get("project", {}).get("locations", {}).has("location.kitchen"), "start location should be indexed")
    _assert(result.get("project", {}).get("dialogue_scenes", {}).has("dialogue.scene_intro"), "entry scene should be indexed")

func _test_missing_manifest(root: String) -> void:
    DirAccess.make_dir_recursive_absolute(root)
    var result: Dictionary = ProjectLoader.load_project(root, "", "")
    _assert(result.get("ok") == false, "missing manifest must fail")
    _assert("project.json" in " ".join(result.get("errors", [])), "missing manifest error should name project.json")

func _test_invalid_json(root: String) -> void:
    _write_text(root + "/project.json", "{not json")
    var result: Dictionary = ProjectLoader.load_project(root, "", "")
    _assert(result.get("ok") == false, "invalid manifest JSON must fail")

func _test_unsafe_asset_path(root: String) -> void:
    _write_json(root + "/project.json", _base_manifest())
    _write_location(root)
    _write_json(root + "/assets/variants/asset_variant.bad.json", {
        "schema_id": "aigs.asset_variant.record", "schema_version": 1,
        "variant_id": "asset_variant.bad", "asset_identity_ref": {"ref": "asset_identity.bad"},
        "variant_spec_id": "imported.default",
        "storage": {"project_path": "../outside.png", "content_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
        "generation_record_ref": null, "status": "active"
    })
    var result: Dictionary = ProjectLoader.load_project(root, "location.kitchen", "")
    _assert(result.get("ok") == false, "traversing asset path must fail")
    _assert("unsafe" in " ".join(result.get("errors", [])).to_lower(), "unsafe path error should be explicit")

func _test_missing_optional_asset_warns(root: String) -> void:
    _write_json(root + "/project.json", _base_manifest())
    _write_location(root)
    _write_json(root + "/assets/variants/asset_variant.missing.json", {
        "schema_id": "aigs.asset_variant.record", "schema_version": 1,
        "variant_id": "asset_variant.missing", "asset_identity_ref": {"ref": "asset_identity.missing"},
        "variant_spec_id": "imported.default",
        "storage": {"project_path": "assets/imported/characters/missing.png", "content_sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"},
        "generation_record_ref": null, "status": "active"
    })
    var result: Dictionary = ProjectLoader.load_project(root, "location.kitchen", "")
    _assert(result.get("ok") == true, "missing optional image should not block load")
    _assert(result.get("warnings", []).size() == 1, "missing optional image should produce one warning")

func _test_missing_start_refs(root: String) -> void:
    _write_json(root + "/project.json", _base_manifest())
    _write_location(root)
    _write_scene(root)
    var missing_location: Dictionary = ProjectLoader.load_project(root, "location.missing", "")
    _assert(missing_location.get("ok") == false, "missing start Location must fail")
    var missing_scene: Dictionary = ProjectLoader.load_project(root, "location.kitchen", "dialogue.missing")
    _assert(missing_scene.get("ok") == false, "missing entry Scene must fail")
