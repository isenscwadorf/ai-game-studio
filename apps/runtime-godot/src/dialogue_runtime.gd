extends RefCounted

var project: Dictionary = {}
var active_scene_ref := ""
var active_entry_id := ""
var active_npc_ref := ""
var history: Array[Dictionary] = []

func configure(project_data: Dictionary) -> void:
    project = project_data
    active_scene_ref = ""
    active_entry_id = ""
    active_npc_ref = ""
    history.clear()

func start_scene(scene_id: String) -> Error:
    var scenes: Dictionary = project.get("dialogue_scenes", {})
    if not scenes.has(scene_id):
        return ERR_DOES_NOT_EXIST
    var scene: Dictionary = scenes[scene_id]
    var entry_point: Variant = scene.get("entry_point")
    if typeof(entry_point) != TYPE_STRING or entry_point.is_empty():
        return ERR_INVALID_DATA
    if _find_entry(scene, entry_point).is_empty():
        return ERR_DOES_NOT_EXIST
    active_scene_ref = scene_id
    active_entry_id = entry_point
    _record_current_entry()
    return OK

func current_view_model() -> Dictionary:
    if active_scene_ref.is_empty() or active_entry_id.is_empty():
        return {"ended": true}
    var scene := _active_scene()
    var entry := _find_entry(scene, active_entry_id)
    if entry.is_empty():
        return {"ended": true}
    var model := entry.duplicate(true)
    if entry.get("kind") == "line":
        model["speaker_ref"] = _definition_ref(entry.get("speaker_ref"))
    model["scene_ref"] = active_scene_ref
    model["ended"] = false
    return model

func advance() -> Error:
    var entry := _active_entry()
    if entry.is_empty():
        return ERR_UNAVAILABLE
    if entry.get("kind") == "choice":
        return ERR_UNAVAILABLE
    return _follow_target(entry.get("next"))

func choose(option_index: int) -> Error:
    var entry := _active_entry()
    if entry.is_empty() or entry.get("kind") != "choice":
        return ERR_UNAVAILABLE
    var options: Variant = entry.get("options")
    if typeof(options) != TYPE_ARRAY or option_index < 0 or option_index >= options.size():
        return ERR_INVALID_PARAMETER
    var option: Variant = options[option_index]
    if typeof(option) != TYPE_DICTIONARY:
        return ERR_INVALID_DATA
    return _follow_target(option.get("target"))

func free_input_allowed() -> bool:
    if active_scene_ref.is_empty() or active_npc_ref.is_empty():
        return false
    return _active_scene().get("input_mode", "free") != "choices_only"

func _active_scene() -> Dictionary:
    return project.get("dialogue_scenes", {}).get(active_scene_ref, {})

func _active_entry() -> Dictionary:
    if active_entry_id.is_empty():
        return {}
    return _find_entry(_active_scene(), active_entry_id)

func _find_entry(scene: Dictionary, entry_id: String) -> Dictionary:
    var entries: Variant = scene.get("entries", [])
    if typeof(entries) != TYPE_ARRAY:
        return {}
    for value in entries:
        if typeof(value) == TYPE_DICTIONARY and value.get("entry_id") == entry_id:
            return value
    return {}

func _definition_ref(value: Variant) -> String:
    if typeof(value) == TYPE_DICTIONARY and typeof(value.get("ref")) == TYPE_STRING:
        return value.ref
    return ""

func _follow_target(target: Variant) -> Error:
    if target == null:
        active_entry_id = ""
        return OK
    if typeof(target) != TYPE_DICTIONARY:
        return ERR_INVALID_DATA

    var scene_id := active_scene_ref
    var scene_ref: Variant = target.get("scene_ref")
    if scene_ref != null:
        scene_id = _definition_ref(scene_ref)
        if scene_id.is_empty():
            return ERR_INVALID_DATA

    var entry_id: Variant = target.get("entry_id")
    if typeof(entry_id) != TYPE_STRING or entry_id.is_empty():
        return ERR_INVALID_DATA
    var scenes: Dictionary = project.get("dialogue_scenes", {})
    if not scenes.has(scene_id):
        return ERR_DOES_NOT_EXIST
    var scene: Dictionary = scenes[scene_id]
    if _find_entry(scene, entry_id).is_empty():
        return ERR_DOES_NOT_EXIST

    active_scene_ref = scene_id
    active_entry_id = entry_id
    _record_current_entry()
    return OK

func _record_current_entry() -> void:
    var entry := _active_entry()
    if entry.is_empty():
        return
    match entry.get("kind"):
        "line":
            var speaker := _definition_ref(entry.get("speaker_ref"))
            if not speaker.is_empty():
                active_npc_ref = speaker
            history.append({
                "kind": "line",
                "speaker_ref": speaker,
                "text": str(entry.get("text", "")),
                "scene_ref": active_scene_ref,
                "entry_id": active_entry_id,
            })
        "narration":
            history.append({
                "kind": "narration",
                "text": str(entry.get("text", "")),
                "scene_ref": active_scene_ref,
                "entry_id": active_entry_id,
            })
