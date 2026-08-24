use std::{
    io::Write,
    net::TcpStream,
    path::Path,
    sync::{Arc, Mutex},
};

use serde::Serialize;
use serde_json::Value;

use crate::runtime_bridge::BridgeBootstrap;

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(tag = "type")]
pub(crate) enum RuntimeUiEvent {
    #[serde(rename = "launching")]
    Launching { #[serde(rename = "sessionId")] session_id: String },
    #[serde(rename = "ready")]
    Ready { #[serde(rename = "sessionId")] session_id: String },
    #[serde(rename = "project_loaded")]
    ProjectLoaded { #[serde(rename = "sessionId")] session_id: String },
    #[serde(rename = "load_error")]
    LoadError {
        #[serde(rename = "sessionId")]
        session_id: String,
        message: String,
    },
    #[serde(rename = "log")]
    Log {
        #[serde(rename = "sessionId")]
        session_id: String,
        entry: RuntimeLogEntry,
    },
    #[serde(rename = "state")]
    State {
        #[serde(rename = "sessionId")]
        session_id: String,
        state: RuntimeStateEvent,
    },
    #[serde(rename = "dialogue_request")]
    DialogueRequest {
        #[serde(rename = "sessionId")]
        session_id: String,
        #[serde(rename = "npcRef")]
        npc_ref: String,
        text: String,
    },
    #[serde(rename = "exited")]
    Exited {
        #[serde(rename = "sessionId")]
        session_id: String,
        code: Option<i32>,
    },
    #[serde(rename = "failed")]
    Failed {
        #[serde(rename = "sessionId")]
        session_id: Option<String>,
        message: String,
    },
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub(crate) struct RuntimeLogEntry {
    pub level: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub(crate) struct RuntimeStateEvent {
    #[serde(rename = "currentLocationRef")]
    pub current_location_ref: Option<String>,
    #[serde(rename = "activeSceneRef")]
    pub active_scene_ref: Option<String>,
    #[serde(rename = "activeNpcRef")]
    pub active_npc_ref: Option<String>,
    #[serde(rename = "aiStatus")]
    pub ai_status: Option<String>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct PlaytestSessionSummary {
    pub session_id: String,
    pub status: String,
}

pub(crate) fn validate_start_request(_project_root: &Path, _start_location_ref: &str) -> Result<(), String> {
    Err("not implemented".to_owned())
}

pub(crate) fn write_envelope(
    _stream: &mut TcpStream,
    _session_id: &str,
    _message_id: &str,
    _message_type: &str,
    _payload: Value,
) -> Result<(), String> {
    Err("not implemented".to_owned())
}

pub(crate) fn run_bridge_session<F>(
    _bridge: BridgeBootstrap,
    _project_root: String,
    _start_location_ref: String,
    _entry_scene_ref: Option<String>,
    _writer_slot: Arc<Mutex<Option<TcpStream>>>,
    _sink: F,
) -> Result<(), String>
where
    F: FnMut(RuntimeUiEvent),
{
    Err("not implemented".to_owned())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::runtime_bridge::{bind_loopback, read_bounded_line, PROTOCOL, PROTOCOL_VERSION};
    use serde_json::json;
    use std::{
        fs,
        io::{BufRead, BufReader},
        net::TcpStream,
        sync::{Arc, Mutex},
        thread,
    };

    fn write_json_line(stream: &mut TcpStream, value: Value) {
        let mut bytes = serde_json::to_vec(&value).unwrap();
        bytes.push(b'\n');
        stream.write_all(&bytes).unwrap();
        stream.flush().unwrap();
    }

    #[test]
    fn validates_that_start_location_exists_in_saved_project() {
        let temp = tempfile::tempdir().unwrap();
        fs::write(temp.path().join("project.json"), br#"{"schema_id":"aigs.project.manifest"}"#).unwrap();
        fs::create_dir(temp.path().join("locations")).unwrap();
        fs::write(
            temp.path().join("locations/location.kitchen.json"),
            br#"{"id":"location.kitchen"}"#,
        )
        .unwrap();

        assert!(validate_start_request(temp.path(), "location.kitchen").is_ok());
        assert!(validate_start_request(temp.path(), "location.missing")
            .unwrap_err()
            .contains("start Location"));
    }

    #[test]
    fn creator_outgoing_envelope_has_exact_versioned_fields() {
        let listener = std::net::TcpListener::bind(("127.0.0.1", 0)).unwrap();
        let address = listener.local_addr().unwrap();
        let client = thread::spawn(move || TcpStream::connect(address).unwrap());
        let (mut server, _) = listener.accept().unwrap();
        let mut client = client.join().unwrap();

        write_envelope(
            &mut server,
            "session.one",
            "creator.1",
            "session.accepted",
            json!({}),
        )
        .unwrap();

        let line = read_bounded_line(&mut client).unwrap();
        let value: Value = serde_json::from_str(&line).unwrap();
        let keys = value.as_object().unwrap().keys().cloned().collect::<std::collections::BTreeSet<_>>();
        assert_eq!(
            keys,
            ["message_id", "payload", "protocol", "protocol_version", "session_id", "type"]
                .into_iter()
                .map(str::to_owned)
                .collect()
        );
        assert_eq!(value["protocol"], PROTOCOL);
        assert_eq!(value["protocol_version"], PROTOCOL_VERSION);
    }

    #[test]
    fn bridge_session_authenticates_sends_project_load_and_normalizes_events() {
        let bridge = bind_loopback().unwrap();
        let endpoint = bridge.endpoint.clone();
        let session_id = bridge.session_id.clone();
        let secret = bridge.secret.clone();
        let client_session_id = session_id.clone();
        let client = thread::spawn(move || {
            let mut stream = TcpStream::connect(endpoint).unwrap();
            write_json_line(&mut stream, json!({
                "protocol": PROTOCOL,
                "protocol_version": PROTOCOL_VERSION,
                "session_id": client_session_id,
                "message_id": "runtime.1",
                "type": "session.hello",
                "payload": {"secret": secret}
            }));
            let mut reader = BufReader::new(stream.try_clone().unwrap());
            let mut accepted = String::new();
            reader.read_line(&mut accepted).unwrap();
            let accepted: Value = serde_json::from_str(accepted.trim_end()).unwrap();
            assert_eq!(accepted["type"], "session.accepted");
            let mut load = String::new();
            reader.read_line(&mut load).unwrap();
            let load: Value = serde_json::from_str(load.trim_end()).unwrap();
            assert_eq!(load["type"], "project.load");
            assert_eq!(load["payload"]["project_root"], "C:/Games/Us");
            assert_eq!(load["payload"]["start_location_ref"], "location.kitchen");

            for (index, (kind, payload)) in [
                ("project.loaded", json!({})),
                ("runtime.ready", json!({})),
                ("runtime.log", json!({"level":"info","message":"loaded"})),
                ("runtime.state", json!({
                    "current_location_ref":"location.kitchen",
                    "active_scene_ref":null,
                    "active_npc_ref":"character.maria",
                    "ai_status":"idle"
                })),
                ("runtime.exited", json!({"code":0})),
            ].into_iter().enumerate() {
                write_json_line(&mut stream, json!({
                    "protocol": PROTOCOL,
                    "protocol_version": PROTOCOL_VERSION,
                    "session_id": client_session_id,
                    "message_id": format!("runtime.{}", index + 2),
                    "type": kind,
                    "payload": payload
                }));
            }
        });

        let events = Arc::new(Mutex::new(Vec::new()));
        let event_sink = Arc::clone(&events);
        run_bridge_session(
            bridge,
            "C:/Games/Us".to_owned(),
            "location.kitchen".to_owned(),
            Some("dialogue.scene_intro".to_owned()),
            Arc::new(Mutex::new(None)),
            move |event| event_sink.lock().unwrap().push(event),
        )
        .unwrap();
        client.join().unwrap();

        let events = events.lock().unwrap();
        assert_eq!(events.len(), 5);
        assert_eq!(events[0], RuntimeUiEvent::ProjectLoaded { session_id: session_id.clone() });
        assert_eq!(events[1], RuntimeUiEvent::Ready { session_id: session_id.clone() });
        assert!(matches!(events[2], RuntimeUiEvent::Log { .. }));
        assert!(matches!(events[3], RuntimeUiEvent::State { .. }));
        assert_eq!(events[4], RuntimeUiEvent::Exited { session_id, code: Some(0) });
    }
}
