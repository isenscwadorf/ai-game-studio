extends SceneTree

const BridgeClient = preload("res://src/bridge_client.gd")
var failures: Array[String] = []

func _init() -> void:
    var envelope: Dictionary = BridgeClient.build_envelope(
        "session.one", "runtime.1", "runtime.ready", {}, 1
    )
    var keys := envelope.keys()
    keys.sort()
    _assert(keys == ["message_id", "payload", "protocol", "protocol_version", "session_id", "type"], "envelope keys must be exact")
    _assert(envelope.protocol == "aigs.playtest", "protocol identifier must match Creator")
    _assert(envelope.protocol_version == 1, "protocol version must be 1")

    var valid: Dictionary = BridgeClient.validate_envelope(envelope, "session.one", 1)
    _assert(valid.get("ok") == true, "valid envelope should pass")

    var wrong_version := envelope.duplicate(true)
    wrong_version.protocol_version = 99
    _assert(BridgeClient.validate_envelope(wrong_version, "session.one", 1).get("ok") == false, "wrong version must fail")

    var wrong_session := envelope.duplicate(true)
    wrong_session.session_id = "session.other"
    _assert(BridgeClient.validate_envelope(wrong_session, "session.one", 1).get("ok") == false, "wrong session must fail")

    var extra := envelope.duplicate(true)
    extra.command = "calc"
    _assert(BridgeClient.validate_envelope(extra, "session.one", 1).get("ok") == false, "unknown envelope property must fail")

    if failures.is_empty():
        print("PASS test_bridge_protocol")
        quit(0)
    for failure in failures:
        push_error(failure)
    quit(1)

func _assert(condition: bool, message: String) -> void:
    if not condition:
        failures.append(message)
