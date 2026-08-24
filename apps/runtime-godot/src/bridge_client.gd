extends Node

signal connected
signal message_received(message: Dictionary)
signal connection_failed(message: String)
signal closed

const PROTOCOL := "aigs.playtest"
const DEFAULT_PROTOCOL_VERSION := 1
const MAX_MESSAGE_BYTES := 256 * 1024

var _socket := WebSocketPeer.new()
var _endpoint := ""
var _session_id := ""
var _secret := ""
var _protocol_version := DEFAULT_PROTOCOL_VERSION
var _hello_sent := false
var _was_open := false

static func build_envelope(session_id: String, message_id: String, message_type: String, payload: Dictionary, protocol_version: int = DEFAULT_PROTOCOL_VERSION) -> Dictionary:
    return {
        "protocol": PROTOCOL,
        "protocol_version": protocol_version,
        "session_id": session_id,
        "message_id": message_id,
        "type": message_type,
        "payload": payload,
    }

static func validate_envelope(value: Variant, expected_session_id: String, expected_protocol_version: int = DEFAULT_PROTOCOL_VERSION) -> Dictionary:
    if typeof(value) != TYPE_DICTIONARY:
        return {"ok": false, "error": "Runtime bridge message must be an object."}
    var envelope: Dictionary = value
    var expected_keys := ["message_id", "payload", "protocol", "protocol_version", "session_id", "type"]
    var keys := envelope.keys()
    keys.sort()
    if keys != expected_keys:
        return {"ok": false, "error": "Runtime bridge envelope fields do not match protocol v%d." % expected_protocol_version}
    if envelope.protocol != PROTOCOL:
        return {"ok": false, "error": "Runtime bridge protocol identifier mismatch."}
    if envelope.protocol_version != expected_protocol_version:
        return {"ok": false, "error": "Runtime bridge protocol version mismatch."}
    if envelope.session_id != expected_session_id:
        return {"ok": false, "error": "Runtime bridge session ID mismatch."}
    if typeof(envelope.message_id) != TYPE_STRING or envelope.message_id.is_empty() or envelope.message_id.length() > 128:
        return {"ok": false, "error": "Runtime bridge message ID is invalid."}
    if typeof(envelope.type) != TYPE_STRING or envelope.type.is_empty():
        return {"ok": false, "error": "Runtime bridge message type is invalid."}
    if typeof(envelope.payload) != TYPE_DICTIONARY:
        return {"ok": false, "error": "Runtime bridge payload must be an object."}
    return {"ok": true, "value": envelope}

func configure(endpoint: String, session_id: String, secret: String, protocol_version: int = DEFAULT_PROTOCOL_VERSION) -> void:
    _endpoint = endpoint
    _session_id = session_id
    _secret = secret
    _protocol_version = protocol_version

func connect_bridge() -> Error:
    if not _endpoint.begins_with("ws://127.0.0.1:") and not _endpoint.begins_with("ws://localhost:"):
        connection_failed.emit("Runtime bridge endpoint must be localhost WebSocket.")
        return ERR_INVALID_PARAMETER
    set_process(true)
    return _socket.connect_to_url(_endpoint)

func send_message(message_id: String, message_type: String, payload: Dictionary) -> Error:
    if _socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
        return ERR_UNAVAILABLE
    var text := JSON.stringify(build_envelope(_session_id, message_id, message_type, payload, _protocol_version))
    if text.to_utf8_buffer().size() > MAX_MESSAGE_BYTES:
        return ERR_OUT_OF_MEMORY
    return _socket.send_text(text)

func close_bridge() -> void:
    if _socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
        _socket.close(1000, "playtest closing")

func _process(_delta: float) -> void:
    _socket.poll()
    var state := _socket.get_ready_state()
    if state == WebSocketPeer.STATE_OPEN:
        if not _was_open:
            _was_open = true
            connected.emit()
        if not _hello_sent:
            _hello_sent = true
            var error := send_message("runtime.hello", "session.hello", {"secret": _secret})
            if error != OK:
                connection_failed.emit("Failed to send runtime session hello.")
                return
        _drain_messages()
    elif state == WebSocketPeer.STATE_CLOSED and _was_open:
        set_process(false)
        closed.emit()

func _drain_messages() -> void:
    while _socket.get_available_packet_count() > 0:
        var packet := _socket.get_packet()
        if not _socket.was_string_packet():
            connection_failed.emit("Runtime bridge accepts text WebSocket frames only.")
            continue
        if packet.size() > MAX_MESSAGE_BYTES:
            connection_failed.emit("Runtime bridge message exceeded the maximum size.")
            continue
        var parser := JSON.new()
        var error := parser.parse(packet.get_string_from_utf8())
        if error != OK:
            connection_failed.emit("Runtime bridge received malformed JSON.")
            continue
        var validation := validate_envelope(parser.data, _session_id, _protocol_version)
        if not validation.ok:
            connection_failed.emit(validation.error)
            continue
        message_received.emit(validation.value)
