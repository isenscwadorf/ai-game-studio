# Product Vision

AI Game Studio is a creator-facing game platform where complex games are built from explicit, composable systems that both humans and AI can understand.

## Target experience

A creator can start from an empty project and ask:

> Create a game about a high-school student snowed in with his family during a severe storm.

The Creator Copilot should be able to inspect the engine's schema/tool catalog, propose the required cast, locations, systems, maps, assets, events, triggers, and gameplay dependencies, then create a structured editable project after creator approval.

The creator can then correct any part naturally:

- make a Character heavier, meaner, kinder, older, or visually different
- simplify or modernize a house
- change relationships or behavior
- replace generated backgrounds/tiles/portraits
- add or remove systems
- inspect and edit the generated events/data/code manually

## Runtime experience

Characters are systemic actors, not dialogue puppets. They can perceive, remember, form beliefs, create goals/plans, and initiate valid game Actions. The same underlying Character systems apply to the human-controlled protagonist and NPCs.

AI does not narrate arbitrary state changes. It works through the same typed game capabilities that the editor/player use, allowing deterministic validation, failure, consequences, debugging, and save/load.

## Game categories

The platform should ultimately support:

- systemic RPGs
- visual novels
- dating sims
- life sims
- hybrids of these genres

The architecture should make genre systems modular rather than baking one genre's assumptions into the core runtime.

## Creator accessibility

The same underlying project model should be editable through:

1. natural language with Copilot
2. user-friendly visual editors
3. advanced schema/code tooling

A creator should not need to know Godot internals for ordinary use.

## AI-native differentiators

- engine schemas deliberately optimized for AI comprehension/tool use
- Creator Copilot that co-develops the actual project, not just returns code snippets
- autonomous Characters with legitimate in-world agency
- persistent semantic asset identity and regeneration history
- project-aware debugging and explanation
- provider-neutral model architecture
- durable repo/project documentation enabling multiple AI agents to work safely over time

## Design posture

Build a small, coherent systemic foundation first. The Snowed In vertical slice exists to prove that the architecture produces a living, debuggable world before expanding into combat, farming, large maps, marketplaces, multiplayer, or other high-scope features.
