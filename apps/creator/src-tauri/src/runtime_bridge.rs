use std::net::{TcpListener, TcpStream};

use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;
use tungstenite::{accept, Message, WebSocket};

pub(crate) const PROTOCOL: &str = "aigs.playtest";
pub(crate) const PROTOCOL_VERSION: u32 = 1;
pub(crate) const MAX_MESSAGE_BYTES: usize = 256 * 1024;
pub(crate) type RuntimeSocket = WebSocket<TcpStream>;

#[derive(Debug)]
pub(crate) struct BridgeBootstrap {
    pub listener: TcpListener,
    pub endpoint: String,
    pub session_id: String,
    pub secret: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
pub(crate) struct HelloPayload {
    pub secret: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
pub(crate) struct LogPayload {
    pub level: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
pub(crate) struct StatePayload {
    pub current_location_ref: Option<String>,
    pub active_scene_ref: Option<String>,
    pub active_npc_ref: Option<String>,
    pub ai_status: Option<String>,
}

#[derive(Debug, Clone, PartialEq)]
pub(crate) enum IncomingMessage {
    Hello(HelloPayload),
    Ready,
    ProjectLoaded,
    LoadError { message: String },
    Log(LogPayload),
    State(StatePayload),
    DialogueRequest {
        request_id: String,
        npc_ref: String,
        text: String,
    },
    Exited { code: Option<i32> },
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct RawEnvelope {
    protocol: String,
    protocol_version: u32,
    session_id: String,
    message_id: String,
    #[serde(rename = "type")]
    message_type: String,
    payload: Value,
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct EmptyPayload {}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct MessagePayload {
    message: String,
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct DialogueRequestPayload {
    request_id: String,
    npc_ref: String,
    text: String,
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct ExitedPayload {
    code: Option<i32>,
}

fn random_hex(byte_count: usize) -> Result<String, String> {
    let mut bytes = vec![0u8; byte_count];
    getrandom::fill(&mut bytes).map_err(|error| format!("failed to obtain OS randomness: {error}"))?;
    Ok(bytes.iter().map(|byte| format!("{byte:02x}")).collect())
}

fn constant_time_eq(left: &[u8], right: &[u8]) -> bool {
    if left.len() != right.len() {
        return false;
    }
    let mut difference = 0u8;
    for (left_byte, right_byte) in left.iter().zip(right) {
        difference |= left_byte ^ right_byte;
    }
    difference == 0
}

fn decode_payload<T: DeserializeOwned>(payload: Value, message_type: &str) -> Result<T, String> {
    serde_json::from_value(payload)
        .map_err(|error| format!("invalid payload for {message_type}: {error}"))
}

fn require_bounded_text(value: &str, field: &str, maximum: usize) -> Result<(), String> {
    if value.trim().is_empty() {
        return Err(format!("runtime {field} must not be empty"));
    }
    if value.len() > maximum {
        return Err(format!("runtime {field} exceeded the configured maximum length"));
    }
    Ok(())
}

pub(crate) fn bind_loopback() -> Result<BridgeBootstrap, String> {
    let listener = TcpListener::bind(("127.0.0.1", 0))
        .map_err(|error| format!("failed to bind runtime bridge to loopback: {error}"))?;
    let address = listener
        .local_addr()
        .map_err(|error| format!("failed to read runtime bridge address: {error}"))?;
    if !address.ip().is_loopback() {
        return Err("runtime bridge refused a non-loopback bind".to_owned());
    }
    Ok(BridgeBootstrap {
        listener,
        endpoint: format!("ws://{address}"),
        session_id: format!("session.{}", random_hex(16)?),
        secret: random_hex(32)?,
    })
}

pub(crate) fn accept_websocket(listener: TcpListener) -> Result<RuntimeSocket, String> {
    let (stream, peer) = listener
        .accept()
        .map_err(|error| format!("failed to accept runtime bridge connection: {error}"))?;
    if !peer.ip().is_loopback() {
        return Err("runtime bridge rejected a non-loopback client".to_owned());
    }
    accept(stream).map_err(|error| format!("runtime WebSocket handshake failed: {error}"))
}

pub(crate) fn send_envelope(
    socket: &mut RuntimeSocket,
    session_id: &str,
    message_id: &str,
    message_type: &str,
    payload: Value,
) -> Result<(), String> {
    require_bounded_text(message_id, "message ID", 128)?;
    require_bounded_text(message_type, "message type", 128)?;
    let text = serde_json::json!({
        "protocol": PROTOCOL,
        "protocol_version": PROTOCOL_VERSION,
        "session_id": session_id,
        "message_id": message_id,
        "type": message_type,
        "payload": payload,
    })
    .to_string();
    if text.len() > MAX_MESSAGE_BYTES {
        return Err("runtime message exceeded the configured maximum size".to_owned());
    }
    socket
        .send(Message::Text(text.into()))
        .map_err(|error| format!("failed to send runtime WebSocket message: {error}"))
}

pub(crate) fn read_text_frame(socket: &mut RuntimeSocket) -> Result<Option<String>, String> {
    loop {
        let message = match socket.read() {
            Ok(message) => message,
            Err(tungstenite::Error::ConnectionClosed | tungstenite::Error::AlreadyClosed) => {
                return Ok(None)
            }
            Err(error) => return Err(format!("failed to read runtime WebSocket message: {error}")),
        };
        if message.len() > MAX_MESSAGE_BYTES {
            return Err("runtime message exceeded the configured maximum size".to_owned());
        }
        match message {
            Message::Text(text) => return Ok(Some(text.to_string())),
            Message::Close(_) => return Ok(None),
            Message::Ping(payload) => socket
                .send(Message::Pong(payload))
                .map_err(|error| format!("failed to answer runtime WebSocket ping: {error}"))?,
            Message::Pong(_) | Message::Frame(_) => {}
            Message::Binary(_) => {
                return Err("runtime bridge accepts text WebSocket frames only".to_owned())
            }
        }
    }
}

pub(crate) fn decode_incoming(
    text: &str,
    expected_session_id: &str,
    expected_secret: &str,
    authenticated: bool,
) -> Result<IncomingMessage, String> {
    if text.len() > MAX_MESSAGE_BYTES {
        return Err("runtime message exceeded the configured maximum size".to_owned());
    }
    let envelope: RawEnvelope =
        serde_json::from_str(text).map_err(|error| format!("malformed runtime JSON: {error}"))?;
    if envelope.protocol != PROTOCOL {
        return Err("runtime protocol identifier mismatch".to_owned());
    }
    if envelope.protocol_version != PROTOCOL_VERSION {
        return Err(format!(
            "runtime protocol version mismatch: expected {PROTOCOL_VERSION}, received {}",
            envelope.protocol_version
        ));
    }
    if envelope.session_id != expected_session_id {
        return Err("runtime session ID mismatch".to_owned());
    }
    require_bounded_text(&envelope.message_id, "message ID", 128)?;

    if !authenticated {
        if envelope.message_type != "session.hello" {
            return Err("runtime must authenticate before sending normal traffic".to_owned());
        }
        let hello: HelloPayload = decode_payload(envelope.payload, "session.hello")?;
        if !constant_time_eq(hello.secret.as_bytes(), expected_secret.as_bytes()) {
            return Err("runtime session secret did not match".to_owned());
        }
        return Ok(IncomingMessage::Hello(hello));
    }

    match envelope.message_type.as_str() {
        "runtime.ready" => {
            let _: EmptyPayload = decode_payload(envelope.payload, "runtime.ready")?;
            Ok(IncomingMessage::Ready)
        }
        "project.loaded" => {
            let _: EmptyPayload = decode_payload(envelope.payload, "project.loaded")?;
            Ok(IncomingMessage::ProjectLoaded)
        }
        "project.load_error" => {
            let payload: MessagePayload = decode_payload(envelope.payload, "project.load_error")?;
            require_bounded_text(&payload.message, "load error", 16 * 1024)?;
            Ok(IncomingMessage::LoadError {
                message: payload.message,
            })
        }
        "runtime.log" => Ok(IncomingMessage::Log(decode_payload(
            envelope.payload,
            "runtime.log",
        )?)),
        "runtime.state" => Ok(IncomingMessage::State(decode_payload(
            envelope.payload,
            "runtime.state",
        )?)),
        "dialogue.request" => {
            let payload: DialogueRequestPayload =
                decode_payload(envelope.payload, "dialogue.request")?;
            require_bounded_text(&payload.request_id, "dialogue request ID", 128)?;
            require_bounded_text(&payload.npc_ref, "dialogue NPC reference", 256)?;
            require_bounded_text(&payload.text, "dialogue text", 16 * 1024)?;
            Ok(IncomingMessage::DialogueRequest {
                request_id: payload.request_id,
                npc_ref: payload.npc_ref,
                text: payload.text,
            })
        }
        "runtime.exited" => {
            let payload: ExitedPayload = decode_payload(envelope.payload, "runtime.exited")?;
            Ok(IncomingMessage::Exited { code: payload.code })
        }
        "session.hello" => Err("runtime session is already authenticated".to_owned()),
        other => Err(format!("unknown runtime message type: {other}")),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn envelope(session_id: &str, message_type: &str, payload: Value) -> String {
        serde_json::json!({
            "protocol": PROTOCOL,
            "protocol_version": PROTOCOL_VERSION,
            "session_id": session_id,
            "message_id": "message.1",
            "type": message_type,
            "payload": payload
        })
        .to_string()
    }

    #[test]
    fn bridge_binds_only_to_loopback_with_ephemeral_port_and_secret() {
        let bridge = bind_loopback().unwrap();
        let address = bridge.listener.local_addr().unwrap();
        assert!(address.ip().is_loopback());
        assert_ne!(address.port(), 0);
        assert!(bridge.endpoint.starts_with("ws://127.0.0.1:"));
        assert!(bridge.secret.len() >= 32);
        assert!(bridge.session_id.len() >= 16);
    }

    #[test]
    fn independent_bridges_receive_distinct_secrets_and_sessions() {
        let first = bind_loopback().unwrap();
        let second = bind_loopback().unwrap();
        assert_ne!(first.secret, second.secret);
        assert_ne!(first.session_id, second.session_id);
    }

    #[test]
    fn unauthenticated_traffic_accepts_only_matching_session_hello_secret() {
        let session_id = "session.abc";
        let good = envelope(
            session_id,
            "session.hello",
            serde_json::json!({"secret":"right"}),
        );
        assert_eq!(
            decode_incoming(&good, session_id, "right", false).unwrap(),
            IncomingMessage::Hello(HelloPayload {
                secret: "right".to_owned()
            })
        );

        let bad = envelope(
            session_id,
            "session.hello",
            serde_json::json!({"secret":"wrong"}),
        );
        assert!(decode_incoming(&bad, session_id, "right", false)
            .unwrap_err()
            .contains("secret"));

        let early = envelope(session_id, "runtime.ready", serde_json::json!({}));
        assert!(decode_incoming(&early, session_id, "right", false)
            .unwrap_err()
            .contains("authenticate"));
    }

    #[test]
    fn rejects_wrong_protocol_version_session_unknown_type_and_malformed_json() {
        let session_id = "session.abc";
        let wrong_version = serde_json::json!({
            "protocol": PROTOCOL,
            "protocol_version": 99,
            "session_id": session_id,
            "message_id": "message.1",
            "type": "runtime.ready",
            "payload": {}
        })
        .to_string();
        assert!(decode_incoming(&wrong_version, session_id, "secret", true).is_err());

        let wrong_session = envelope("session.other", "runtime.ready", serde_json::json!({}));
        assert!(decode_incoming(&wrong_session, session_id, "secret", true).is_err());

        let unknown = envelope(
            session_id,
            "runtime.exec",
            serde_json::json!({"command":"calc"}),
        );
        assert!(decode_incoming(&unknown, session_id, "secret", true)
            .unwrap_err()
            .contains("unknown"));
        assert!(decode_incoming("{not json", session_id, "secret", true).is_err());
    }

    #[test]
    fn decodes_registered_messages_into_typed_payloads() {
        let session_id = "session.abc";
        let log = envelope(
            session_id,
            "runtime.log",
            serde_json::json!({"level":"info","message":"loaded"}),
        );
        assert_eq!(
            decode_incoming(&log, session_id, "secret", true).unwrap(),
            IncomingMessage::Log(LogPayload {
                level: "info".to_owned(),
                message: "loaded".to_owned(),
            })
        );

        let state = envelope(
            session_id,
            "runtime.state",
            serde_json::json!({
                "current_location_ref":"location.kitchen",
                "active_scene_ref":null,
                "active_npc_ref":"character.maria",
                "ai_status":"idle"
            }),
        );
        assert!(matches!(
            decode_incoming(&state, session_id, "secret", true).unwrap(),
            IncomingMessage::State(_)
        ));

        let dialogue = envelope(
            session_id,
            "dialogue.request",
            serde_json::json!({
                "request_id":"dialogue.1",
                "npc_ref":"character.maria",
                "text":"Are you okay?"
            }),
        );
        assert!(matches!(
            decode_incoming(&dialogue, session_id, "secret", true).unwrap(),
            IncomingMessage::DialogueRequest { request_id, .. } if request_id == "dialogue.1"
        ));

        let extra = envelope(
            session_id,
            "runtime.log",
            serde_json::json!({"level":"info","message":"x","extra":true}),
        );
        assert!(decode_incoming(&extra, session_id, "secret", true).is_err());
    }
}
