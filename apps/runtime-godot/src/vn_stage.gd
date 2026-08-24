extends RefCounted

var project: Dictionary = {}
var current_location_ref := ""
var active_npc_ref := ""

func configure(project_data: Dictionary) -> void:
    project = project_data
    current_location_ref = ""
    active_npc_ref = ""

func set_location(location_id: String) -> Error:
    var locations: Dictionary = project.get("locations", {})
    if not locations.has(location_id):
        return ERR_DOES_NOT_EXIST
    current_location_ref = location_id
    if not active_npc_ref.is_empty() and active_npc_ref not in visible_character_ids():
        active_npc_ref = ""
    return OK

func destination_ids() -> Array[String]:
    var result: Array[String] = []
    var location := _current_location()
    var refs: Variant = location.get("destination_refs", [])
    if typeof(refs) != TYPE_ARRAY:
        return result
    for value in refs:
        var identifier := _definition_ref(value)
        if not identifier.is_empty() and project.get("locations", {}).has(identifier):
            result.append(identifier)
    return result

func visible_character_ids() -> Array[String]:
    var result: Array[String] = []
    var characters: Dictionary = project.get("characters", {})
    for character_id in characters:
        var character: Variant = characters[character_id]
        if typeof(character) != TYPE_DICTIONARY:
            continue
        if _definition_ref(character.get("initial_location_ref")) == current_location_ref:
            result.append(character_id)
    result.sort()
    return result

func set_active_npc(character_id: String) -> Error:
    if character_id not in visible_character_ids():
        return ERR_UNAVAILABLE
    active_npc_ref = character_id
    return OK

func character_visual(character_id: String) -> Dictionary:
    var character: Variant = project.get("characters", {}).get(character_id)
    if typeof(character) != TYPE_DICTIONARY:
        return _placeholder(character_id)
    var identity_id := _definition_ref(character.get("visual_identity_ref"))
    if identity_id.is_empty():
        return _placeholder(str(character.get("display_name", character_id)))
    var variant := _active_variant_for_identity(identity_id)
    if variant.is_empty():
        return _placeholder(str(character.get("display_name", character_id)))
    var project_path := _variant_project_path(variant)
    if project_path.is_empty():
        return _placeholder(str(character.get("display_name", character_id)))
    var presentation: Variant = variant.get("presentation", {})
    var framing := "full_body"
    if typeof(presentation) == TYPE_DICTIONARY and presentation.get("sprite_framing") == "two_thirds":
        framing = "two_thirds"
    return {
        "mode": "asset",
        "name": str(character.get("display_name", character_id)),
        "project_path": project_path,
        "framing": framing,
    }

func location_background() -> Dictionary:
    var location := _current_location()
    if location.is_empty():
        return _placeholder("Unknown location")
    var identity_id := _definition_ref(location.get("visual_identity_ref"))
    if identity_id.is_empty():
        return _placeholder(str(location.get("display_name", current_location_ref)))
    var variant := _active_variant_for_identity(identity_id)
    var project_path := _variant_project_path(variant)
    if project_path.is_empty():
        return _placeholder(str(location.get("display_name", current_location_ref)))
    return {
        "mode": "asset",
        "name": str(location.get("display_name", current_location_ref)),
        "project_path": project_path,
    }

func _current_location() -> Dictionary:
    return project.get("locations", {}).get(current_location_ref, {})

func _definition_ref(value: Variant) -> String:
    if typeof(value) == TYPE_DICTIONARY and typeof(value.get("ref")) == TYPE_STRING:
        return value.ref
    return ""

func _active_variant_for_identity(identity_id: String) -> Dictionary:
    var variants: Dictionary = project.get("asset_variants", {})
    for variant_id in variants:
        var variant: Variant = variants[variant_id]
        if typeof(variant) != TYPE_DICTIONARY:
            continue
        if variant.get("status") == "active" and _definition_ref(variant.get("asset_identity_ref")) == identity_id:
            return variant
    return {}

func _variant_project_path(variant: Dictionary) -> String:
    if variant.is_empty():
        return ""
    var storage: Variant = variant.get("storage")
    if typeof(storage) != TYPE_DICTIONARY or typeof(storage.get("project_path")) != TYPE_STRING:
        return ""
    return storage.project_path

func _placeholder(name: String) -> Dictionary:
    return {"mode": "placeholder", "name": name}
