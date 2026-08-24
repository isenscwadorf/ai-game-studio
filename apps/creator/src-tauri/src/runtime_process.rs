use std::{
    fs,
    path::{Path, PathBuf},
    process::{Child, Command},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc, Mutex,
    },
    thread,
};

use serde::Serialize;
use serde_json::{json, Value};
use tauri::{Emitter, Manager};

use crate::runtime_bridge::{
    accept_websocket, bind_loopback, decode_incoming, read_text_frame, send_envelope,
    BridgeBootstrap, IncomingMessage, RuntimeSocket, PROTOCOL_VERSION,
};

const RUNTIME_EVENT_NAME: &str = "aigs://runtime-event";

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(tag = "type")]
pub(crate) enum RuntimeUiEvent {
    #[serde(rename = "launching")]
    Launching {
        #[serde(rename = "sessionId")]
        session_id: String,
    },
    #[serde(rename = "ready")]
    Ready {
        #[serde(rename = "sessionId")]
        session_id: String,
    },
    #[serde(rename = "project_loaded")]
    ProjectLoaded {
        #[serde(rename = "sessionId")]
        session_id: String,
    },
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
        #[serde(rename = "requestId")]
        request_id: String,
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

struct ManagedSession {
    session_id: String,
    child: Arc<Mutex<Option<Child>>>,
    stopping: Arc<AtomicBool>,
}

#[derive(Clone, Default)]
pub struct RuntimeManager {
    active: Arc<Mutex<Option<ManagedSession>>>,
}

impl RuntimeManager {
    fn clear_if_current(&self, session_id: &str) {
        if let Ok(mut active) = self.active.lock() {
            if active
                .as_ref()
                .is_some_and(|session| session.session_id == session_id)
            {
                *active = None;
            }
        }
    }
}

fn valid_definition_id(value: &str) -> bool {
    !value.is_empty()
        && value.len() <= 256
        && value
            .bytes()
            .all(|byte| byte.is_ascii_lowercase() || byte.is_ascii_digit() || matches!(byte, b'.' | b'_' | b'-'))
        && value.as_bytes()[0].is_ascii_lowercase()
        && !value.contains("..")
}

fn read_definition_id(path: &Path) -> Result<String, String> {
    let bytes = fs::read(path)
        .map_err(|error| format!("failed to read saved definition {}: {error}", path.display()))?;
    let value: Value = serde_json::from_slice(&bytes)
        .map_err(|error| format!("saved definition {} is malformed JSON: {error}", path.display()))?;
    value
        .get("id")
        .and_then(Value::as_str)
        .map(str::to_owned)
        .ok_or_else(|| format!("saved definition {} does not contain an id", path.display()))
}

fn validate_definition_file(
    project_root: &Path,
    directory: &str,
    definition_id: &str,
    label: &str,
) -> Result<(), String> {
    if !valid_definition_id(definition_id) {
        return Err(format!("{label} reference is not a safe canonical definition ID"));
    }
    let path = project_root
        .join(directory)
        .join(format!("{definition_id}.json"));
    if !path.is_file() {
        return Err(format!("{label} {definition_id} does not exist in the saved project"));
    }
    let saved_id = read_definition_id(&path)?;
    if saved_id != definition_id {
        return Err(format!(
            "{label} file ID mismatch: expected {definition_id}, found {saved_id}"
        ));
    }
    Ok(())
}

pub(crate) fn validate_start_request(
    project_root: &Path,
    start_location_ref: &str,
) -> Result<(), String> {
    if !project_root.is_dir() {
        return Err("playtest project root does not exist".to_owned());
    }
    if !project_root.join("project.json").is_file() {
        return Err("playtest project is missing project.json".to_owned());
    }
    validate_definition_file(
        project_root,
        "locations",
        start_location_ref,
        "start Location",
    )
}

fn validate_entry_scene(project_root: &Path, entry_scene_ref: Option<&str>) -> Result<(), String> {
    if let Some(scene_ref) = entry_scene_ref {
        validate_definition_file(project_root, "dialogue", scene_ref, "entry Scene")?;
    }
    Ok(())
}

fn normalize_message(message: IncomingMessage, session_id: &str) -> Result<Option<RuntimeUiEvent>, String> {
    let event = match message {
        IncomingMessage::Hello(_) => return Err("runtime sent a duplicate session hello".to_owned()),
        IncomingMessage::Ready => RuntimeUiEvent::Ready {
            session_id: session_id.to_owned(),
        },
        IncomingMessage::ProjectLoaded => RuntimeUiEvent::ProjectLoaded {
            session_id: session_id.to_owned(),
        },
        IncomingMessage::LoadError { message } => RuntimeUiEvent::LoadError {
            session_id: session_id.to_owned(),
            message,
        },
        IncomingMessage::Log(payload) => {
            if !matches!(payload.level.as_str(), "debug" | "info" | "warn" | "error") {
                return Err("runtime log level is not registered".to_owned());
            }
            RuntimeUiEvent::Log {
                session_id: session_id.to_owned(),
                entry: RuntimeLogEntry {
                    level: payload.level,
                    message: payload.message,
                },
            }
        }
        IncomingMessage::State(payload) => RuntimeUiEvent::State {
            session_id: session_id.to_owned(),
            state: RuntimeStateEvent {
                current_location_ref: payload.current_location_ref,
                active_scene_ref: payload.active_scene_ref,
                active_npc_ref: payload.active_npc_ref,
                ai_status: payload.ai_status,
            },
        },
        IncomingMessage::DialogueRequest {
            request_id,
            npc_ref,
            text,
        } => RuntimeUiEvent::DialogueRequest {
            session_id: session_id.to_owned(),
            request_id,
            npc_ref,
            text,
        },
        IncomingMessage::Exited { code } => RuntimeUiEvent::Exited {
            session_id: session_id.to_owned(),
            code,
        },
    };
    Ok(Some(event))
}

fn receive_required_text(socket: &mut RuntimeSocket, context: &str) -> Result<String, String> {
    read_text_frame(socket)?.ok_or_else(|| format!("runtime connection closed before {context}"))
}

pub(crate) fn run_bridge_session<F>(
    bridge: BridgeBootstrap,
    project_root: String,
    start_location_ref: String,
    entry_scene_ref: Option<String>,
    mut sink: F,
) -> Result<(), String>
where
    F: FnMut(RuntimeUiEvent),
{
    let session_id = bridge.session_id.clone();
    let secret = bridge.secret.clone();
    let mut socket = accept_websocket(bridge.listener)?;

    let hello_text = receive_required_text(&mut socket, "session authentication")?;
    match decode_incoming(&hello_text, &session_id, &secret, false)? {
        IncomingMessage::Hello(_) => {}
        _ => return Err("runtime did not authenticate with session.hello".to_owned()),
    }

    send_envelope(
        &mut socket,
        &session_id,
        "creator.accepted",
        "session.accepted",
        json!({}),
    )?;
    send_envelope(
        &mut socket,
        &session_id,
        "creator.project_load",
        "project.load",
        json!({
            "project_root": project_root,
            "start_location_ref": start_location_ref,
            "entry_scene_ref": entry_scene_ref,
        }),
    )?;

    loop {
        let Some(text) = read_text_frame(&mut socket)? else {
            return Err("runtime connection closed without runtime.exited".to_owned());
        };
        let message = decode_incoming(&text, &session_id, &secret, true)?;
        let is_exit = matches!(message, IncomingMessage::Exited { .. });
        if let Some(event) = normalize_message(message, &session_id)? {
            sink(event);
        }
        if is_exit {
            return Ok(());
        }
    }
}

fn runtime_executable_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    if let Some(path) = std::env::var_os("AIGS_RUNTIME_EXECUTABLE") {
        let path = PathBuf::from(path);
        if path.is_file() {
            return Ok(path);
        }
        return Err(format!(
            "AIGS_RUNTIME_EXECUTABLE does not point to a file: {}",
            path.display()
        ));
    }

    let resource_dir = app
        .path()
        .resource_dir()
        .map_err(|error| format!("failed to resolve Creator resource directory: {error}"))?;
    #[cfg(target_os = "windows")]
    let executable = resource_dir
        .join("runtime")
        .join("AI Game Studio Runtime.exe");
    #[cfg(not(target_os = "windows"))]
    let executable = resource_dir.join("runtime").join("ai-game-studio-runtime");
    if !executable.is_file() {
        return Err(format!(
            "packaged playtest runtime was not found: {}",
            executable.display()
        ));
    }
    Ok(executable)
}

fn spawn_runtime(
    executable: &Path,
    bridge: &BridgeBootstrap,
) -> Result<Child, String> {
    Command::new(executable)
        .args([
            "--",
            "--bridge-endpoint",
            bridge.endpoint.as_str(),
            "--session-id",
            bridge.session_id.as_str(),
            "--bridge-secret",
            bridge.secret.as_str(),
            "--protocol-version",
            &PROTOCOL_VERSION.to_string(),
        ])
        .spawn()
        .map_err(|error| format!("failed to launch playtest runtime: {error}"))
}

fn emit_runtime_event(app: &tauri::AppHandle, event: RuntimeUiEvent) {
    let _ = app.emit(RUNTIME_EVENT_NAME, event);
}

#[tauri::command]
pub fn start_playtest(
    app: tauri::AppHandle,
    manager: tauri::State<'_, RuntimeManager>,
    project_root: String,
    start_location_ref: String,
    entry_scene_ref: Option<String>,
) -> Result<PlaytestSessionSummary, String> {
    let project_path = PathBuf::from(&project_root);
    validate_start_request(&project_path, &start_location_ref)?;
    validate_entry_scene(&project_path, entry_scene_ref.as_deref())?;

    {
        let active = manager
            .active
            .lock()
            .map_err(|_| "runtime manager lock was poisoned".to_owned())?;
        if active.is_some() {
            return Err("a playtest session is already active".to_owned());
        }
    }

    let bridge = bind_loopback()?;
    let session_id = bridge.session_id.clone();
    let executable = runtime_executable_path(&app)?;
    let child = Arc::new(Mutex::new(Some(spawn_runtime(&executable, &bridge)?)));
    let stopping = Arc::new(AtomicBool::new(false));

    {
        let mut active = manager
            .active
            .lock()
            .map_err(|_| "runtime manager lock was poisoned".to_owned())?;
        *active = Some(ManagedSession {
            session_id: session_id.clone(),
            child: Arc::clone(&child),
            stopping: Arc::clone(&stopping),
        });
    }

    emit_runtime_event(
        &app,
        RuntimeUiEvent::Launching {
            session_id: session_id.clone(),
        },
    );

    let app_for_thread = app.clone();
    let manager_for_thread = manager.inner().clone();
    let session_for_thread = session_id.clone();
    thread::spawn(move || {
        let result = run_bridge_session(
            bridge,
            project_root,
            start_location_ref,
            entry_scene_ref,
            |event| emit_runtime_event(&app_for_thread, event),
        );
        if let Err(message) = result {
            if !stopping.load(Ordering::SeqCst) {
                emit_runtime_event(
                    &app_for_thread,
                    RuntimeUiEvent::Failed {
                        session_id: Some(session_for_thread.clone()),
                        message,
                    },
                );
            }
        }
        if let Ok(mut child_guard) = child.lock() {
            if let Some(child) = child_guard.as_mut() {
                let _ = child.try_wait();
            }
        }
        manager_for_thread.clear_if_current(&session_for_thread);
    });

    Ok(PlaytestSessionSummary {
        session_id,
        status: "launching".to_owned(),
    })
}

#[tauri::command]
pub fn stop_playtest(
    app: tauri::AppHandle,
    manager: tauri::State<'_, RuntimeManager>,
    session_id: String,
) -> Result<(), String> {
    let managed = {
        let mut active = manager
            .active
            .lock()
            .map_err(|_| "runtime manager lock was poisoned".to_owned())?;
        let current = active
            .as_ref()
            .ok_or_else(|| "there is no active playtest session".to_owned())?;
        if current.session_id != session_id {
            return Err("playtest session ID does not match the active session".to_owned());
        }
        active.take().expect("active session was checked above")
    };

    managed.stopping.store(true, Ordering::SeqCst);
    let mut child_guard = managed
        .child
        .lock()
        .map_err(|_| "runtime child lock was poisoned".to_owned())?;
    if let Some(child) = child_guard.as_mut() {
        match child.try_wait() {
            Ok(Some(_)) => {}
            Ok(None) => {
                child
                    .kill()
                    .map_err(|error| format!("failed to stop playtest runtime: {error}"))?;
                let _ = child.wait();
            }
            Err(error) => return Err(format!("failed to inspect playtest runtime: {error}")),
        }
    }
    emit_runtime_event(
        &app,
        RuntimeUiEvent::Exited {
            session_id,
            code: None,
        },
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::runtime_bridge::{PROTOCOL, PROTOCOL_VERSION};
    use serde_json::json;
    use std::{collections::BTreeSet, fs, thread};
    use tungstenite::Message;

    fn send_client_envelope(
        socket: &mut tungstenite::WebSocket<tungstenite::stream::MaybeTlsStream<std::net::TcpStream>>,
        session_id: &str,
        message_id: &str,
        message_type: &str,
        payload: Value,
    ) {
        let text = json!({
            "protocol": PROTOCOL,
            "protocol_version": PROTOCOL_VERSION,
            "session_id": session_id,
            "message_id": message_id,
            "type": message_type,
            "payload": payload,
        })
        .to_string();
        socket.send(Message::Text(text.into())).unwrap();
    }

    fn read_client_json(
        socket: &mut tungstenite::WebSocket<tungstenite::stream::MaybeTlsStream<std::net::TcpStream>>,
    ) -> Value {
        loop {
            match socket.read().unwrap() {
                Message::Text(text) => return serde_json::from_str(text.as_str()).unwrap(),
                Message::Ping(payload) => socket.send(Message::Pong(payload)).unwrap(),
                Message::Pong(_) | Message::Frame(_) => {}
                other => panic!("unexpected WebSocket message in test: {other:?}"),
            }
        }
    }

    #[test]
    fn validates_that_start_location_exists_in_saved_project() {
        let temp = tempfile::tempdir().unwrap();
        fs::write(
            temp.path().join("project.json"),
            br#"{"schema_id":"aigs.project.manifest"}"#,
        )
        .unwrap();
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
        let bridge = bind_loopback().unwrap();
        let endpoint = bridge.endpoint.clone();
        let client = thread::spawn(move || tungstenite::connect(endpoint.as_str()).unwrap().0);
        let mut server = accept_websocket(bridge.listener).unwrap();
        let mut client = client.join().unwrap();

        send_envelope(
            &mut server,
            "session.one",
            "creator.1",
            "session.accepted",
            json!({}),
        )
        .unwrap();

        let value = read_client_json(&mut client);
        let keys = value
            .as_object()
            .unwrap()
            .keys()
            .cloned()
            .collect::<BTreeSet<_>>();
        assert_eq!(
            keys,
            [
                "message_id",
                "payload",
                "protocol",
                "protocol_version",
                "session_id",
                "type",
            ]
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
            let (mut socket, _) = tungstenite::connect(endpoint.as_str()).unwrap();
            send_client_envelope(
                &mut socket,
                &client_session_id,
                "runtime.1",
                "session.hello",
                json!({"secret": secret}),
            );
            let accepted = read_client_json(&mut socket);
            assert_eq!(accepted["type"], "session.accepted");
            let load = read_client_json(&mut socket);
            assert_eq!(load["type"], "project.load");
            assert_eq!(load["payload"]["project_root"], "C:/Games/Us");
            assert_eq!(
                load["payload"]["start_location_ref"],
                "location.kitchen"
            );
            assert_eq!(
                load["payload"]["entry_scene_ref"],
                "dialogue.scene_intro"
            );

            for (index, (kind, payload)) in [
                ("project.loaded", json!({})),
                ("runtime.ready", json!({})),
                ("runtime.log", json!({"level":"info","message":"loaded"})),
                (
                    "runtime.state",
                    json!({
                        "current_location_ref":"location.kitchen",
                        "active_scene_ref":null,
                        "active_npc_ref":"character.maria",
                        "ai_status":"idle"
                    }),
                ),
                (
                    "dialogue.request",
                    json!({
                        "request_id":"dialogue.1",
                        "npc_ref":"character.maria",
                        "text":"Are you okay?"
                    }),
                ),
                ("runtime.exited", json!({"code":0})),
            ]
            .into_iter()
            .enumerate()
            {
                send_client_envelope(
                    &mut socket,
                    &client_session_id,
                    &format!("runtime.{}", index + 2),
                    kind,
                    payload,
                );
            }
        });

        let events = Arc::new(Mutex::new(Vec::new()));
        let event_sink = Arc::clone(&events);
        run_bridge_session(
            bridge,
            "C:/Games/Us".to_owned(),
            "location.kitchen".to_owned(),
            Some("dialogue.scene_intro".to_owned()),
            move |event| event_sink.lock().unwrap().push(event),
        )
        .unwrap();
        client.join().unwrap();

        let events = events.lock().unwrap();
        assert_eq!(events.len(), 6);
        assert_eq!(
            events[0],
            RuntimeUiEvent::ProjectLoaded {
                session_id: session_id.clone()
            }
        );
        assert_eq!(
            events[1],
            RuntimeUiEvent::Ready {
                session_id: session_id.clone()
            }
        );
        assert!(matches!(events[2], RuntimeUiEvent::Log { .. }));
        assert!(matches!(events[3], RuntimeUiEvent::State { .. }));
        assert!(matches!(
            &events[4],
            RuntimeUiEvent::DialogueRequest { request_id, .. } if request_id == "dialogue.1"
        ));
        assert_eq!(
            events[5],
            RuntimeUiEvent::Exited {
                session_id,
                code: Some(0)
            }
        );
    }
}
