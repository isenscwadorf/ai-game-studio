extends SceneTree

const DialogueRuntime = preload("res://src/dialogue_runtime.gd")
var failures: Array[String] = []

func _init() -> void:
    var runtime = DialogueRuntime.new()
    runtime.configure(_project())
    _assert(runtime.start_scene("dialogue.intro") == OK, "intro scene should start")
    _assert(runtime.current_view_model().get("kind") == "line", "entry point should be a line")
    _assert(runtime.current_view_model().get("speaker_ref") == "character.maria", "line speaker should become active NPC")
    _assert(runtime.active_npc_ref == "character.maria", "active NPC should track current speaker")
    _assert(runtime.free_input_allowed(), "free scene should permit free input")

    _assert(runtime.advance() == OK, "line should advance")
    _assert(runtime.current_view_model().get("kind") == "narration", "second entry should be narration")
    _assert(runtime.advance() == OK, "narration should advance")
    _assert(runtime.current_view_model().get("kind") == "choice", "third entry should be choice")
    _assert(runtime.advance() == ERR_UNAVAILABLE, "choice should require explicit selection")
    _assert(runtime.choose(1) == OK, "cross-scene option should resolve")
    _assert(runtime.active_scene_ref == "dialogue.outside", "choice should jump across scenes")
    _assert(runtime.current_view_model().get("text") == "The porch light flickers.", "cross-scene target should resolve immutable entry ID")
    _assert(runtime.history.size() == 3, "line, narration, and destination narration should append history")

    _assert(runtime.start_scene("dialogue.locked") == OK, "choices-only scene should start")
    _assert(not runtime.free_input_allowed(), "choices_only scene should disable free text")
    _assert(runtime.choose(0) == OK, "self-cycle choice should be traversable one explicit step at a time")
    _assert(runtime.current_view_model().get("entry_id") == "entry.locked", "cycle should remain bounded by caller actions")

    _assert(runtime.start_scene("dialogue.end") == OK, "ending scene should start")
    _assert(runtime.advance() == OK, "terminal line should end cleanly")
    _assert(runtime.current_view_model().get("ended") == true, "terminal next=null should expose ended state")

    _finish()

func _target(entry_id: String, scene_ref: Variant = null) -> Dictionary:
    return {"scene_ref": scene_ref, "entry_id": entry_id}

func _project() -> Dictionary:
    return {"dialogue_scenes": {
        "dialogue.intro": {
            "id": "dialogue.intro", "input_mode": "free", "entry_point": "entry.start",
            "entries": [
                {"entry_id": "entry.start", "kind": "line", "speaker_ref": {"ref": "character.maria"}, "text": "The snow is getting worse.", "next": _target("entry.snow")},
                {"entry_id": "entry.snow", "kind": "narration", "text": "Wind rattles the windows.", "next": _target("entry.choice")},
                {"entry_id": "entry.choice", "kind": "choice", "prompt": "What now?", "options": [
                    {"label": "Stay inside", "target": _target("entry.start")},
                    {"label": "Check the porch", "target": _target("entry.porch", {"ref": "dialogue.outside"})}
                ]}
            ]
        },
        "dialogue.outside": {
            "id": "dialogue.outside", "input_mode": "free", "entry_point": "entry.porch",
            "entries": [{"entry_id": "entry.porch", "kind": "narration", "text": "The porch light flickers.", "next": null}]
        },
        "dialogue.locked": {
            "id": "dialogue.locked", "input_mode": "choices_only", "entry_point": "entry.locked",
            "entries": [{"entry_id": "entry.locked", "kind": "choice", "options": [
                {"label": "Again", "target": _target("entry.locked")}
            ]}]
        },
        "dialogue.end": {
            "id": "dialogue.end", "input_mode": "free", "entry_point": "entry.end",
            "entries": [{"entry_id": "entry.end", "kind": "line", "speaker_ref": {"ref": "character.maria"}, "text": "Goodnight.", "next": null}]
        }
    }}

func _assert(condition: bool, message: String) -> void:
    if not condition:
        failures.append(message)

func _finish() -> void:
    if failures.is_empty():
        print("PASS test_dialogue_runtime")
        quit(0)
        return
    for failure in failures:
        push_error(failure)
    quit(1)
