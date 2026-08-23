# ADR-0013 — Creator uses a Tauri/React desktop shell with a separate Godot runtime process

Status: Accepted
Date: 2026-08-23

## Context

AI Game Studio needs a polished Windows creator application while keeping Godot as hidden runtime infrastructure. The initial creator workflow must support local project editing, schema-aware validation, future Copilot and asset-generation panels, and a separate playtest window without requiring creators to use the Godot editor.

A Godot-only creator UI would reduce initial toolchain count but would make professional desktop authoring workflows harder to evolve. A web-style desktop shell around a separate runtime introduces a process boundary, but it keeps creator UX and runtime responsibilities independently testable and replaceable.

## Decision

The v0.1 Creator App uses Tauri 2 with React and TypeScript. The Godot Runtime is a separate local process launched by the Creator App for playtest.

The canonical project model is the integration boundary. The Creator App edits strict schema-backed project definitions; the Runtime loads those definitions and owns runtime state. The Creator App does not treat Godot scenes as project source-of-truth, and the Runtime does not silently edit canonical project definitions.

The creator/runtime bridge must be local-only, versioned, machine-readable, and testable without a graphical runtime. The exact transport is deferred to the runtime-bridge implementation slice, but runtime contracts must not depend on React or Tauri internals.

Creator project persistence uses constrained native commands rather than granting the webview unrestricted filesystem access. Project folders remain ordinary user-owned local folders. Credentials remain outside project data.

## Consequences

- Creator UX can use desktop-oriented React components and future AI-assisted panels while Godot remains invisible infrastructure.
- Project definitions remain portable and independent from the creator implementation.
- Creator and runtime can fail independently; a runtime crash must not terminate the editor.
- The application has two build/runtime stacks: Tauri/Rust/React for authoring and Godot for playtest.
- A versioned local process bridge is required before runtime playtest integration.
- Windows packaging must include all application binaries required by the product while relying only on platform components supported by the declared Windows baseline.
