extends SceneTree

const VNStage = preload("res://src/vn_stage.gd")
var failures: Array[String] = []

func _init() -> void:
    var stage = VNStage.new()
    stage.configure(_project())
    _assert(stage.set_location("location.kitchen") == OK, "start location should be selectable")
    _assert(stage.current_location_ref == "location.kitchen", "current location should update")
    _assert(stage.destination_ids() == ["location.porch"], "only explicit destination_refs should be offered")
    _assert(stage.visible_character_ids() == ["character.alex", "character.maria"], "characters at current location should be visible")
    _assert(stage.set_active_npc("character.maria") == OK, "visible NPC should be selectable")
    _assert(stage.set_active_npc("character.outside") == ERR_UNAVAILABLE, "invisible NPC must not become active")

    var maria_visual: Dictionary = stage.character_visual("character.maria")
    _assert(maria_visual.get("mode") == "asset", "active character visual should resolve imported asset")
    _assert(maria_visual.get("framing") == "two_thirds", "two-thirds framing must be preserved")
    _assert(maria_visual.get("project_path") == "assets/imported/characters/maria.png", "sprite path should remain project-relative")

    var alex_visual: Dictionary = stage.character_visual("character.alex")
    _assert(alex_visual.get("framing") == "full_body", "full-body framing must be preserved")
    _assert(stage.location_background().get("project_path") == "assets/imported/locations/kitchen.webp", "location background should resolve through identity and active variant")

    _assert(stage.set_location("location.porch") == OK, "destination should be navigable")
    _assert(stage.visible_character_ids() == ["character.outside"], "visible character set should follow initial location")
    _assert(stage.active_npc_ref == "", "active NPC should clear when leaving its location")
    _assert(stage.character_visual("character.outside").get("mode") == "placeholder", "missing visual should use named placeholder")

    _finish()

func _project() -> Dictionary:
    return {
        "root_path": "/game",
        "locations": {
            "location.kitchen": {
                "id": "location.kitchen", "display_name": "Kitchen",
                "destination_refs": [{"ref": "location.porch"}],
                "visual_identity_ref": {"ref": "asset_identity.kitchen"}
            },
            "location.porch": {"id": "location.porch", "display_name": "Porch", "destination_refs": []}
        },
        "characters": {
            "character.maria": {"id": "character.maria", "display_name": "Maria", "initial_location_ref": {"ref": "location.kitchen"}, "visual_identity_ref": {"ref": "asset_identity.maria"}},
            "character.alex": {"id": "character.alex", "display_name": "Alex", "initial_location_ref": {"ref": "location.kitchen"}, "visual_identity_ref": {"ref": "asset_identity.alex"}},
            "character.outside": {"id": "character.outside", "display_name": "Sam", "initial_location_ref": {"ref": "location.porch"}}
        },
        "asset_variants": {
            "asset_variant.maria": {"variant_id": "asset_variant.maria", "asset_identity_ref": {"ref": "asset_identity.maria"}, "status": "active", "storage": {"project_path": "assets/imported/characters/maria.png"}, "presentation": {"sprite_framing": "two_thirds"}},
            "asset_variant.alex": {"variant_id": "asset_variant.alex", "asset_identity_ref": {"ref": "asset_identity.alex"}, "status": "active", "storage": {"project_path": "assets/imported/characters/alex.png"}, "presentation": {"sprite_framing": "full_body"}},
            "asset_variant.kitchen": {"variant_id": "asset_variant.kitchen", "asset_identity_ref": {"ref": "asset_identity.kitchen"}, "status": "active", "storage": {"project_path": "assets/imported/locations/kitchen.webp"}}
        }
    }

func _assert(condition: bool, message: String) -> void:
    if not condition:
        failures.append(message)

func _finish() -> void:
    if failures.is_empty():
        print("PASS test_stage_state")
        quit(0)
        return
    for failure in failures:
        push_error(failure)
    quit(1)
