# Changelog

All notable user-visible and architectural changes will be recorded here.

## Unreleased

### Added

- Initial repository architecture baseline and durable cross-AI handoff documentation.
- Canonical principles for shared Character model, autonomous NPC agency, Actions/Activities, provider abstraction, and per-character beliefs.
- Creator Foundation local project workflow: blank project creation, opening,
  validation-gated saving, recovery-backed persistence, and reopen support.
- Schema-backed manual Character and logical Location editing.
- Repairable native project opening, Character name drafts that preserve the
  last canonical document, and guarded dirty Open/window-close transitions.
- Stable-ID disambiguation for duplicate Character and Location names, a
  one-column narrow layout, and strict local-only Creator CSP/capabilities.
- Explicit production window-destroy authority, safe invalid-manifest display
  fallbacks, and precompiled validators compatible with the strict CSP.
- Native-ESM-safe Ajv standalone helper bindings and differential parity across
  all 45 generated canonical validators.
- Bounded, cycle-safe Ajv helper unwrapping with fail-fast helper and formats
  shape checks shared by generated code and native-ESM tests.
- Creator aggregate verification and a two-job GitHub Actions definition that
  packages a Windows Creator smoke ZIP when hosted validation is run.

No gameplay runtime, playtest, Copilot, AI asset generation, Inworld TTS, or
standalone game export exists yet. The Windows artifact and launch smoke remain
pending the final PR gate.
