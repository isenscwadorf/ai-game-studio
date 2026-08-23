# ADR-0004: AI Providers Sit Behind an Internal Adapter Layer

Status: Accepted  
Date: 2026-08-23

## Context

The platform needs multiple AI roles and may use OpenRouter, Inworld, direct providers, or local models over time. Hard-wiring gameplay code to one vendor would create lock-in and make model/provider changes risky.

## Decision

All AI services are accessed through internal provider-neutral interfaces. Gameplay and simulation systems must not import OpenRouter, Inworld, or other vendor SDKs directly.

OpenRouter is the default general LLM gateway. Inworld is optional for character/voice/runtime/orchestration capabilities where useful. Future providers can be added as adapters.

AI roles such as Creator Copilot, Character Planner, Character Dialogue, Asset Director, Debugger, and Summarizer may use different provider/model policies.

## Consequences

### Positive

- Providers/models can change without rewriting gameplay.
- Role-specific cost, latency, and capability policies are possible.
- Tests can use fake/deterministic provider adapters.
- Exported projects can apply different provider policies than the editor.

### Costs

- Internal interfaces must model streaming, structured output, tools, embeddings, speech, and failure states carefully.
- Lowest-common-denominator abstractions must be avoided; capabilities should be explicit.

## Invariant

No gameplay system may directly call provider-specific APIs. Provider-specific code lives only in adapter/service integration boundaries.
