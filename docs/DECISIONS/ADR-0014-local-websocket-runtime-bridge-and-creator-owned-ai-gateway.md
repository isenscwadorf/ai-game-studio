# ADR-0014 — Playtest uses a localhost WebSocket bridge and Creator-owned AI gateway

Status: Accepted
Date: 2026-08-23

## Context

ADR-0013 requires the Tauri/React Creator and Godot playtest runtime to remain separate processes with a local-only, versioned, machine-readable bridge. Creator MVP Slice 2 also adds live OpenRouter dialogue while preserving the rule that provider credentials are Creator-machine settings and runtime AI cannot access Creator mutation tools or canonical project writes.

The bridge therefore needs bidirectional structured messages for runtime lifecycle, project load state, logs, telemetry, and dialogue requests. Live AI dialogue must not require placing the user's provider key inside the Godot process or project files.

## Decision

Slice 2 uses a versioned JSON protocol over a localhost-only WebSocket connection between the Creator and the Godot playtest runtime.

The Tauri Rust backend owns the listener, playtest session lifecycle, child process launch/termination, per-session authentication secret, message validation, secure provider credential access, and outbound OpenRouter requests. React displays and requests operations through a narrow native gateway but does not receive stored raw secrets. Godot receives no provider credentials.

Each playtest uses an opaque session ID, an ephemeral loopback port, and a cryptographically random session secret. The runtime authenticates before normal bridge traffic is accepted. Messages use registered typed envelopes; the protocol does not expose arbitrary shell commands, generic filesystem access, or generic remote execution.

For Slice 2, live AI responses are speech-only. Godot sends a typed dialogue request containing non-secret conversational context; the Creator builds the bounded provider request, calls OpenRouter through the native adapter, normalizes the response to dialogue text, and returns a typed dialogue response. Runtime AI cannot mutate canonical project data or request game-state actions in this slice.

A fake/headless runtime must implement the same protocol for deterministic bridge tests without a graphical Godot process.

## Consequences

- Provider secrets remain outside project files and outside the Godot runtime.
- The Creator must remain open for live AI dialogue during playtest.
- Authored runtime content can continue when the AI provider or bridge fails, but live AI dialogue degrades non-fatally.
- Creator/runtime integration can be tested headlessly with the same versioned contract used by Godot.
- WebSocket lifecycle, authentication, message-size limits, and protocol validation become security-sensitive native responsibilities.
- A future exported standalone game cannot depend on this Creator-owned gateway; standalone export remains outside v0.1 and will require a separate credential/provider deployment design if introduced later.
