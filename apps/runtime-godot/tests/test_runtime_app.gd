extends SceneTree

const RuntimeApp = preload("res://src/runtime_app.gd")
var failures: Array[String] = []

func _init() -> void:
    var valid := RuntimeApp.parse_user_args(PackedStringArray([
        "--bridge-endpoint", "ws://127.0.0.1:43120",
        "--session-id", "session.test",
        "--bridge-secret", "secret-value",
        "--protocol-version", "1",
    ]))
    _assert(valid.get("ok") == true, "complete localhost bootstrap arguments should parse")
    _assert(valid.get("endpoint") == "ws://127.0.0.1:43120", "endpoint should be preserved")
    _assert(valid.get("protocol_version") == 1, "protocol version should parse as integer")

    var missing := RuntimeApp.parse_user_args(PackedStringArray([
        "--bridge-endpoint", "ws://127.0.0.1:43120",
        "--session-id", "session.test",
    ]))
    _assert(missing.get("ok") == false, "missing secret/version must fail")

    var remote := RuntimeApp.parse_user_args(PackedStringArray([
        "--bridge-endpoint", "ws://192.168.1.20:43120",
        "--session-id", "session.test",
        "--bridge-secret", "secret-value",
        "--protocol-version", "1",
    ]))
    _assert(remote.get("ok") == false, "non-loopback bridge endpoints must fail")

    var state := RuntimeApp.build_state_payload(
        "location.kitchen", "dialogue.intro", "character.maria", "idle"
    )
    _assert(state == {
        "current_location_ref": "location.kitchen",
        "active_scene_ref": "dialogue.intro",
        "active_npc_ref": "character.maria",
        "ai_status": "idle",
    }, "runtime state payload must match the Creator protocol exactly")

    _finish()

func _assert(condition: bool, message: String) -> void:
    if not condition:
        failures.append(message)

func _finish() -> void:
    if failures.is_empty():
        print("PASS test_runtime_app")
        quit(0)
        return
    for failure in failures:
        push_error(failure)
    quit(1)
