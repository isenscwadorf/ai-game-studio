extends SceneTree

const DialogueRuntime = preload("res://src/dialogue_runtime.gd")
const VNStage = preload("res://src/vn_stage.gd")
const RuntimeScreen = preload("res://src/runtime_screen.gd")
var failures: Array[String] = []

func _init() -> void:
    var project := _project()
    var stage = VNStage.new()
    stage.configure(project)
    stage.set_location("location.kitchen")
    var dialogue = DialogueRuntime.new()
    dialogue.configure(project)
    dialogue.start_scene("dialogue.intro")

    var screen = RuntimeScreen.new()
    root.add_child(screen)
    screen.configure(project, stage, dialogue)
    screen.render()

    _assert(screen.has_node("Background"), "screen must have full-window background")
    _assert(screen.has_node("SpriteLayer"), "screen must have layered sprite stage")
    _assert(screen.has_node("DialoguePanel"), "screen must have bottom dialogue panel")
    _assert(screen.has_node("LocationMenu"), "screen must expose logical Locations menu")
    _assert(screen.has_node("HistoryPanel"), "screen must expose current-session History")
    _assert(screen.get_node("SpriteLayer").get_child_count() == 1, "visible character should render one sprite/placeholder")
    _assert(screen.get_node("DialoguePanel/VBox/Speaker").text == "Maria", "speaker label should resolve character display name")
    _assert(screen.get_node("DialoguePanel/VBox/Text").text == "The snow is getting worse.", "dialogue text should render")
    _assert(screen.sprite_height_ratio("two_thirds") < screen.sprite_height_ratio("full_body"), "two-thirds sprites should scale slightly smaller without cropping")
    _assert(screen.sprite_height_ratio("two_thirds") > 0.55, "two-thirds sprites must remain substantial head-to-knees art")

    _finish()

func _project() -> Dictionary:
    return {
        "root_path": "/missing-on-purpose",
        "characters": {
            "character.maria": {"id": "character.maria", "display_name": "Maria", "initial_location_ref": {"ref": "location.kitchen"}}
        },
        "locations": {
            "location.kitchen": {"id": "location.kitchen", "display_name": "Kitchen", "destination_refs": [{"ref": "location.porch"}]},
            "location.porch": {"id": "location.porch", "display_name": "Porch", "destination_refs": []}
        },
        "asset_variants": {},
        "dialogue_scenes": {
            "dialogue.intro": {
                "id": "dialogue.intro", "input_mode": "free", "entry_point": "entry.start",
                "entries": [{"entry_id": "entry.start", "kind": "line", "speaker_ref": {"ref": "character.maria"}, "text": "The snow is getting worse.", "next": null}]
            }
        }
    }

func _assert(condition: bool, message: String) -> void:
    if not condition:
        failures.append(message)

func _finish() -> void:
    if failures.is_empty():
        print("PASS test_runtime_screen")
        quit(0)
        return
    for failure in failures:
        push_error(failure)
    quit(1)
