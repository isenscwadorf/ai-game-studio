extends Node

const BridgeClient = preload("res://src/bridge_client.gd")
const DialogueRuntime = preload("res://src/dialogue_runtime.gd")
const ProjectLoader = preload("res://src/project_loader.gd")
const RuntimeScreen = preload("res://src/runtime_screen.gd")
const VNStage = preload("res://src/vn_stage.gd")
const PROTOCOL_VERSION := 1

var _bridge
var _project: Dictionary = {}
var _stage
var _dialogue
var _screen
var _session_accepted := false
var _message_counter := 0
var _dialogue_counter := 0
var _pending_dialogue: Dictionary = {}
var _ai_status := "unavailable"

static func parse_user_args(args: PackedStringArray) -> Dictionary:
    var values: Dictionary = {}
    var index := 0
    while index < args.size():
        var key := args[index]
        if key not in ["--bridge-endpoint", "--session-id", "--bridge-secret", "--protocol-version"]:
            return {"ok": false, "error": "Unknown runtime argument: %s" % key}
        if index + 1 >= args.size():
            return {"ok": false, "error": "Runtime argument %s requires a value." % key}
        if values.has(key):
            return {"ok": false, "error": "Runtime argument %s was supplied more than once." % key}
        values[key] = args[index + 1]
        index += 2

    for required in ["--bridge-endpoint", "--session-id", "--bridge-secret", "--protocol-version"]:
        if not values.has(required) or str(values[required]).is_empty():
            return {"ok": false, "error": "Missing required runtime argument: %s" % required}

    var endpoint := str(values["--bridge-endpoint"])
    if not endpoint.begins_with("ws://127.0.0.1:") and not endpoint.begins_with("ws://localhost:"):
        return {"ok": false, "error": "Runtime bridge endpoint must be a localhost WebSocket."}

    var version_text := str(values["--protocol-version"])
    if not version_text.is_valid_int():
        return {"ok": false, "error": "Runtime protocol version must be an integer."}
    var version := version_text.to_int()
    if version != PROTOCOL_VERSION:
        return {"ok": false, "error": "Unsupported runtime protocol version: %d" % version}

    return {
        "ok": true,
        "endpoint": endpoint,
        "session_id": str(values["--session-id"]),
        "secret": str(values["--bridge-secret"]),
        "protocol_version": version,
    }

static func build_state_payload(
    current_location_ref: String,
    active_scene_ref: String,
    active_npc_ref: String,
    ai_status: String
) -> Dictionary:
    return {
        "current_location_ref": current_location_ref if not current_location_ref.is_empty() else null,
        "active_scene_ref": active_scene_ref if not active_scene_ref.is_empty() else null,
        "active_npc_ref": active_npc_ref if not active_npc_ref.is_empty() else null,
        "ai_status": ai_status if not ai_status.is_empty() else null,
    }

func _ready() -> void:
    var config := parse_user_args(OS.get_cmdline_user_args())
    if not config.get("ok", false):
        push_error(str(config.get("error", "Invalid runtime bootstrap arguments.")))
        get_tree().quit(2)
        return

    _bridge = BridgeClient.new()
    add_child(_bridge)
    _bridge.message_received.connect(_on_bridge_message)
    _bridge.connection_failed.connect(_on_bridge_failure)
    _bridge.closed.connect(_on_bridge_closed)
    _bridge.configure(
        config.endpoint,
        config.session_id,
        config.secret,
        config.protocol_version
    )
    var error := _bridge.connect_bridge()
    if error != OK:
        push_error("Failed to connect to the Creator runtime bridge: %s" % error_string(error))
        get_tree().quit(3)

func _exit_tree() -> void:
    if _bridge != null:
        _send("runtime.exited", {"code": 0})
        _bridge.close_bridge()

func _on_bridge_message(message: Dictionary) -> void:
    var message_type := str(message.get("type", ""))
    var payload: Variant = message.get("payload", {})
    if typeof(payload) != TYPE_DICTIONARY:
        _on_bridge_failure("Runtime bridge payload must be an object.")
        return
    match message_type:
        "session.accepted":
            _session_accepted = true
        "project.load":
            if not _session_accepted:
                _on_bridge_failure("Creator sent project.load before accepting the session.")
                return
            _load_project(payload)
        "dialogue.response":
            _handle_dialogue_response(payload)
        "dialogue.error":
            _handle_dialogue_error(payload)
        _:
            _send("runtime.log", {
                "level": "warn",
                "message": "Ignored unsupported Creator message: %s" % message_type,
            })

func _load_project(payload: Dictionary) -> void:
    var root_path: Variant = payload.get("project_root")
    var start_location_ref: Variant = payload.get("start_location_ref")
    var entry_value: Variant = payload.get("entry_scene_ref")
    if typeof(root_path) != TYPE_STRING or typeof(start_location_ref) != TYPE_STRING:
        _send("project.load_error", {"message": "project.load is missing required project/location fields."})
        return
    var entry_scene_ref := "" if entry_value == null else str(entry_value)
    var result := ProjectLoader.load_project(root_path, start_location_ref, entry_scene_ref)
    if not result.get("ok", false):
        _send("project.load_error", {"message": " ".join(result.get("errors", []))})
        return

    _project = result.project
    _stage = VNStage.new()
    _stage.configure(_project)
    var location_error := _stage.set_location(start_location_ref)
    if location_error != OK:
        _send("project.load_error", {"message": "Start Location could not be activated."})
        return

    _dialogue = DialogueRuntime.new()
    _dialogue.configure(_project)
    if not entry_scene_ref.is_empty():
        var scene_error := _dialogue.start_scene(entry_scene_ref)
        if scene_error != OK:
            _send("project.load_error", {"message": "Entry Scene could not be started."})
            return
        _sync_stage_active_npc()

    _screen = RuntimeScreen.new()
    add_child(_screen)
    _screen.configure(_project, _stage, _dialogue)
    _screen.advance_requested.connect(_on_advance_requested)
    _screen.choice_requested.connect(_on_choice_requested)
    _screen.location_requested.connect(_on_location_requested)
    _screen.npc_requested.connect(_on_npc_requested)
    _screen.free_text_submitted.connect(_on_free_text_submitted)
    _ai_status = "idle"
    _screen.set_ai_status("AI: connected to Creator")
    _screen.render()

    for warning in result.get("warnings", []):
        _send("runtime.log", {"level": "warn", "message": str(warning)})
    _send("project.loaded", {})
    _send("runtime.ready", {})
    _send_state()

func _on_advance_requested() -> void:
    if _dialogue == null:
        return
    var error := _dialogue.advance()
    if error != OK:
        return
    _sync_stage_active_npc()
    _render_and_send_state()

func _on_choice_requested(option_index: int) -> void:
    if _dialogue == null:
        return
    var error := _dialogue.choose(option_index)
    if error != OK:
        return
    _sync_stage_active_npc()
    _render_and_send_state()

func _on_location_requested(location_id: String) -> void:
    if _stage == null or _stage.set_location(location_id) != OK:
        return
    if _dialogue != null and _dialogue.active_scene_ref.is_empty():
        _dialogue.set_active_npc(_stage.active_npc_ref)
    _render_and_send_state()

func _on_npc_requested(character_id: String) -> void:
    if _stage == null or _stage.set_active_npc(character_id) != OK:
        return
    if _dialogue != null:
        _dialogue.set_active_npc(character_id)
    _render_and_send_state()

func _on_free_text_submitted(text: String) -> void:
    if _dialogue == null or not _dialogue.free_input_allowed():
        return
    var npc_ref := _dialogue.active_npc_ref
    if npc_ref.is_empty():
        return
    _dialogue.append_player_line(text)
    _dialogue_counter += 1
    var request_id := "dialogue.%d" % _dialogue_counter
    _pending_dialogue[request_id] = npc_ref
    _ai_status = "waiting"
    if _screen != null:
        _screen.set_ai_status("AI: thinking…")
        _screen.clear_free_text()
        _screen.render()
    _send("dialogue.request", {
        "request_id": request_id,
        "npc_ref": npc_ref,
        "text": text,
    })
    _send_state()

func _handle_dialogue_response(payload: Dictionary) -> void:
    var request_id := str(payload.get("request_id", ""))
    var text := str(payload.get("text", "")).strip_edges()
    if request_id.is_empty() or text.is_empty() or not _pending_dialogue.has(request_id):
        return
    var npc_ref := str(_pending_dialogue[request_id])
    _pending_dialogue.erase(request_id)
    _dialogue.append_ai_line(npc_ref, text)
    _ai_status = "idle"
    if _screen != null:
        _screen.set_ai_status("AI: ready")
        _screen.render()
    _send_state()

func _handle_dialogue_error(payload: Dictionary) -> void:
    var request_id := str(payload.get("request_id", ""))
    if not request_id.is_empty():
        _pending_dialogue.erase(request_id)
    _ai_status = "error"
    var message := str(payload.get("message", "AI reply unavailable."))
    if _screen != null:
        _screen.set_ai_status("AI: %s" % message)
    _send("runtime.log", {"level": "warn", "message": message})
    _send_state()

func _sync_stage_active_npc() -> void:
    if _stage == null or _dialogue == null or _dialogue.active_npc_ref.is_empty():
        return
    _stage.set_active_npc(_dialogue.active_npc_ref)

func _render_and_send_state() -> void:
    if _screen != null:
        _screen.render()
    _send_state()

func _send_state() -> void:
    if _stage == null or _dialogue == null:
        return
    _send("runtime.state", build_state_payload(
        _stage.current_location_ref,
        _dialogue.active_scene_ref,
        _dialogue.active_npc_ref,
        _ai_status
    ))

func _next_message_id() -> String:
    _message_counter += 1
    return "runtime.%d" % _message_counter

func _send(message_type: String, payload: Dictionary) -> void:
    if _bridge == null:
        return
    var error := _bridge.send_message(_next_message_id(), message_type, payload)
    if error != OK and message_type != "runtime.exited":
        push_warning("Runtime bridge send failed for %s: %s" % [message_type, error_string(error)])

func _on_bridge_failure(message: String) -> void:
    push_error(message)
    _ai_status = "unavailable"
    if _screen != null:
        _screen.set_ai_status("AI: Creator connection unavailable")

func _on_bridge_closed() -> void:
    _ai_status = "unavailable"
    if _screen != null:
        _screen.set_ai_status("AI: Creator disconnected; authored play remains available")
