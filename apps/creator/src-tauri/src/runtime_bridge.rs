use std::{io::Read, net::TcpListener};

use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;

pub(crate) const PROTOCOL: &str = "aigs.playtest";
pub(crate) const PROTOCOL_VERSION: u32 = 1;
pub(crate) const MAX_MESSAGE_BYTES: usize = 256 * 1024;

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
    DialogueRequest { npc_ref: String, text: String },
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
        endpoint: address.to_string(),
        session_id: format!("session.{}", random_hex(16)?),
        secret: random_hex(32)?,
    })
}

pub(crate) fn decode_incoming(
    line: &str,
    expected_session_id: &str,
    expected_secret: &str,
    authenticated: bool,
) -> Result<IncomingMessage, String> {
    if line.len() > MAX_MESSAGE_BYTES {
        return Err("runtime message exceeded the configured maximum size".to_owned());
    }
    let envelope: RawEnvelope =
        serde_json::from_str(line).map_err(|error| format!("malformed runtime JSON: {error}"))?;
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
    if envelope.message_id.trim().is_empty() || envelope.message_id.len() > 128 {
        return Err("runtime message ID must be a non-empty bounded string".to_owned());
    }

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
            Ok(IncomingMessage::LoadError { message: payload.message })
        }
        "runtime.log" => Ok(IncomingMessage::Log(decode_payload(envelope.payload, "runtime.log")?)),
        "runtime.state" => Ok(IncomingMessage::State(decode_payload(envelope.payload, "runtime.state")?)),
        "dialogue.request" => {
            let payload: DialogueRequestPayload = decode_payload(envelope.payload, "dialogue.request")?;
            Ok(IncomingMessage::DialogueRequest {
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

pub(crate) fn read_bounded_line<R: Read>(reader: &mut R) -> Result<String, String> {
    let mut bytes = Vec::new();
    let mut byte = [0u8; 1];
    loop {
        match reader.read(&mut byte) {
            Ok(0) if bytes.is_empty() => return Err("runtime connection closed before a message arrived".to_owned()),
            Ok(0) => break,
            Ok(_) if byte[0] == b'\n' => break,
            Ok(_) => {
                bytes.push(byte[0]);
                if bytes.len() > MAX_MESSAGE_BYTES {
                    return Err("runtime message exceeded the configured maximum size".to_owned());
                }
            }
            Err(error) => return Err(format!("failed to read runtime message: {error}")),
        }
    }
    if bytes.last() == Some(&b'\r') {
        bytes.pop();
    }
    String::from_utf8(bytes).map_err(|_| "runtime message must be UTF-8".to_owned())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Cursor;

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
        assert!(bridge.endpoint.starts_with("127.0.0.1:"));
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
        let good = envelope(session_id, "session.hello", serde_json::json!({"secret":"right"}));
        assert_eq!(
            decode_incoming(&good, session_id, "right", false).unwrap(),
            IncomingMessage::Hello(HelloPayload { secret: "right".to_owned() })
        );

        let bad = envelope(session_id, "session.hello", serde_json::json!({"secret":"wrong"}));
        assert!(decode_incoming(&bad, session_id, "right", false).unwrap_err().contains("secret"));

        let early = envelope(session_id, "runtime.ready", serde_json::json!({}));
        assert!(decode_incoming(&early, session_id, "right", false).unwrap_err().contains("authenticate"));
    }

    #[test]
    fn rejects_wrong_protocol_version_session_unknown_type_and_malformed_json() {
        let session_id = "session.abc";
        let wrong_version = serde_json::json!({
            "protocol": PROTOCOL, "protocol_version": 99, "session_id": session_id,
            "message_id": "message.1", "type": "runtime.ready", "payload": {}
        }).to_string();
        assert!(decode_incoming(&wrong_version, session_id, "secret", true).is_err());

        let wrong_session = envelope("session.other", "runtime.ready", serde_json::json!({}));
        assert!(decode_incoming(&wrong_session, session_id, "secret", true).is_err());

        let unknown = envelope(session_id, "runtime.exec", serde_json::json!({"command":"calc"}));
        assert!(decode_incoming(&unknown, session_id, "secret", true).unwrap_err().contains("unknown"));
        assert!(decode_incoming("{not json", session_id, "secret", true).is_err());
    }

    #[test]
    fn decodes_registered_messages_into_typed_payloads() {
        let session_id = "session.abc";
        let log = envelope(session_id, "runtime.log", serde_json::json!({"level":"info","message":"loaded"}));
        assert_eq!(decode_incoming(&log, session_id, "secret", true).unwrap(), IncomingMessage::Log(LogPayload {
            level: "info".to_owned(), message: "loaded".to_owned(),
        }));

        let state = envelope(session_id, "runtime.state", serde_json::json!({
            "current_location_ref":"location.kitchen", "active_scene_ref":null,
            "active_npc_ref":"character.maria", "ai_status":"idle"
        }));
        assert!(matches!(decode_incoming(&state, session_id, "secret", true).unwrap(), IncomingMessage::State(_)));

        let extra = envelope(session_id, "runtime.log", serde_json::json!({"level":"info","message":"x","extra":true}));
        assert!(decode_incoming(&extra, session_id, "secret", true).is_err());
    }

    #[test]
    fn bounded_reader_rejects_oversized_messages() {
        let mut okay = Cursor::new(b"{\"ok\":true}\n".to_vec());
        assert_eq!(read_bounded_line(&mut okay).unwrap(), "{\"ok\":true}");

        let mut oversized = Cursor::new(vec![b'x'; MAX_MESSAGE_BYTES + 1]);
        assert!(read_bounded_line(&mut oversized).unwrap_err().contains("maximum"));
    }
}
