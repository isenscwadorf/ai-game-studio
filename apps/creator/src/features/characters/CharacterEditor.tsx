import { useEffect, useState } from 'react';
import { VisualAssetControls } from '../../components/VisualAssetControls';
import { createCharacterDefinition } from '../../domain/characterFactory';
import type { StoredDefinition } from '../../domain/projectTypes';
import { validateDocument } from '../../domain/validation';
import type { VisualAssetGateway } from '../../platform/VisualAssetGateway';

type EditorSpeech = Record<string, unknown> & { register?: string; notes?: string };
type EditorPersona = Record<string, unknown> & {
  summary?: string;
  background?: string;
  personality?: string[];
  speech?: EditorSpeech;
  values?: string[];
  fears?: string[];
  desires?: string[];
  secrets?: string[];
};
type EditableCharacter = StoredDefinition['document'] & { persona: EditorPersona };

type CharacterEditorProps = {
  busy: boolean;
  definitions: StoredDefinition[];
  selectedCharacterKey: string | null;
  onCreate: (definition: StoredDefinition['document']) => void;
  onDelete: (id: string) => void;
  onSelect: (key: string) => void;
  onUpdate: (id: string, document: StoredDefinition['document']) => void;
  projectRoot?: string | null;
  visualAssetGateway?: VisualAssetGateway;
  onEnsureSaved?: () => Promise<boolean>;
  onProjectReload?: () => Promise<void>;
};

type CharacterListItem = { key: string; document: StoredDefinition['document'] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function editableCharacter(document: StoredDefinition['document'] | undefined): EditableCharacter | null {
  return document && validateDocument('aigs.character.definition', document).valid
    ? document as EditableCharacter
    : null;
}

function displayName(value: unknown): string {
  return isRecord(value) && typeof value.display_name === 'string' && value.display_name.trim().length > 0
    ? value.display_name
    : 'Unnamed character';
}

function definitionId(value: unknown): string | null {
  return isRecord(value) && typeof value.id === 'string' && value.id.length > 0 ? value.id : null;
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : [];
}

function definitionRef(value: unknown): string {
  return isRecord(value) && typeof value.ref === 'string' ? value.ref : '';
}

function characterItems(definitions: StoredDefinition[]): CharacterListItem[] {
  return definitions
    .filter((definition) => definition.collection === 'characters')
    .map((definition, index) => ({ key: `character-${index}`, document: definition.document }));
}

function locationIds(definitions: StoredDefinition[]): string[] {
  return definitions
    .filter((definition) => definition.collection === 'locations')
    .flatMap((definition) => typeof definition.document.id === 'string' ? [definition.document.id] : []);
}

export function normalizeMultilineList(value: string): string[] {
  return [...new Set(value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean))];
}

function ListField({ disabled, label, value, onCommit }: { disabled: boolean; label: string; value: string[]; onCommit: (value: string[]) => void }) {
  const [draft, setDraft] = useState(() => value.join('\n'));

  useEffect(() => {
    setDraft(value.join('\n'));
  }, [value]);

  return (
    <label className="form-field">
      <span>{label}</span>
      <textarea
        disabled={disabled}
        onBlur={() => { if (!disabled) onCommit(normalizeMultilineList(draft)); }}
        onChange={(event) => setDraft(event.target.value)}
        value={draft}
      />
    </label>
  );
}

export function CharacterEditor({
  busy,
  definitions,
  selectedCharacterKey,
  onCreate,
  onDelete,
  onSelect,
  onUpdate,
  projectRoot = null,
  visualAssetGateway,
  onEnsureSaved,
  onProjectReload,
}: CharacterEditorProps) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameDraft, setNameDraft] = useState('');
  const characters = characterItems(definitions);
  const locations = locationIds(definitions);
  const selected = characters.find((character) => character.key === selectedCharacterKey)?.document;
  const editable = editableCharacter(selected);
  const editableId = stringValue(editable?.id);
  const editableDisplayName = stringValue(editable?.display_name);

  useEffect(() => {
    setNameDraft(editableDisplayName);
  }, [selectedCharacterKey, editableId, editableDisplayName]);

  function addCharacter() {
    const trimmedName = newName.trim();
    if (busy || !trimmedName) return;

    const ids = new Set(definitions.map((definition) => definition.document.id).filter((id): id is string => typeof id === 'string'));
    onCreate(createCharacterDefinition(trimmedName, ids));
    setNewName('');
    setCreating(false);
  }

  function update(change: (character: EditableCharacter) => EditableCharacter) {
    if (busy || !editable || !editableId) return;
    const candidate = change(editable);
    if (validateDocument('aigs.character.definition', candidate).valid) {
      onUpdate(editableId, candidate);
    }
  }

  function updatePersona(change: (persona: EditorPersona) => EditorPersona) {
    update((character) => ({ ...character, persona: change(character.persona) }));
  }

  return (
    <section aria-labelledby="characters-title" className="character-editor">
      <div className="character-editor__header">
        <div>
          <p className="eyebrow">Definitions</p>
          <h1 id="characters-title">Characters</h1>
        </div>
        <button disabled={busy} onClick={() => { if (!busy) setCreating(true); }} type="button">New Character</button>
      </div>

      {creating ? (
        <form aria-label="Add character" className="character-editor__new" onSubmit={(event) => { event.preventDefault(); addCharacter(); }}>
          <label className="form-field">
            <span>Name</span>
            <input autoFocus disabled={busy} onChange={(event) => setNewName(event.target.value)} value={newName} />
          </label>
          <div className="modal__actions">
            <button disabled={busy} onClick={() => { setCreating(false); setNewName(''); }} type="button">Cancel</button>
            <button className="button--primary" disabled={busy || !newName.trim()} type="submit">Add Character</button>
          </div>
        </form>
      ) : null}

      <div className="character-editor__content">
        <nav aria-label="Character list" className="character-editor__list">
          {characters.length === 0 ? <p>No characters yet.</p> : characters.map((character) => (
            <button
              aria-current={character.key === selectedCharacterKey ? 'page' : undefined}
              aria-label={`${displayName(character.document)}, ID ${definitionId(character.document) ?? 'unavailable'}`}
              key={character.key}
              onClick={() => onSelect(character.key)}
              type="button"
            >
              <span>{displayName(character.document)}</span>
              <small className="definition-list__id">{definitionId(character.document) ?? 'ID unavailable'}</small>
            </button>
          ))}
        </nav>

        <div className="character-editor__detail">
          {!selected ? <p>Select a character to edit it.</p> : !editable ? (
            <p role="alert">Character data is malformed and cannot be edited safely.</p>
          ) : (
            <div key={editable.id}>
              {visualAssetGateway && onEnsureSaved && onProjectReload ? (
                <VisualAssetControls
                  busy={busy}
                  gateway={visualAssetGateway}
                  onEnsureSaved={onEnsureSaved}
                  onProjectReload={onProjectReload}
                  projectRoot={projectRoot}
                  subjectId={editableId}
                  visualKind="character_sprite"
                />
              ) : null}
              <label className="form-field">
                <span>Name</span>
                <input
                  disabled={busy}
                  onBlur={() => update((character) => ({ ...character, display_name: nameDraft }))}
                  onChange={(event) => setNameDraft(event.target.value)}
                  value={nameDraft}
                />
              </label>
              <label className="form-field">
                <span>Description</span>
                <textarea disabled={busy} onChange={(event) => update((character) => ({ ...character, description: event.target.value }))} value={stringValue(editable.description)} />
              </label>
              <label className="form-field">
                <span>Initial Location</span>
                <select
                  disabled={busy}
                  onChange={(event) => update((character) => {
                    const next = { ...character };
                    if (event.target.value) next.initial_location_ref = { ref: event.target.value };
                    else delete next.initial_location_ref;
                    return next;
                  })}
                  value={definitionRef(editable.initial_location_ref)}
                >
                  <option value="">Not set</option>
                  {locations.map((id) => <option key={id} value={id}>{id}</option>)}
                </select>
              </label>
              <label className="form-field">
                <span>Persona summary</span>
                <textarea disabled={busy} onChange={(event) => updatePersona((persona) => ({ ...persona, summary: event.target.value }))} value={stringValue(editable.persona.summary)} />
              </label>
              <label className="form-field">
                <span>Background</span>
                <textarea disabled={busy} onChange={(event) => updatePersona((persona) => ({ ...persona, background: event.target.value }))} value={stringValue(editable.persona.background)} />
              </label>
              <ListField disabled={busy} label="Personality (one per line)" value={stringList(editable.persona.personality)} onCommit={(personality) => updatePersona((persona) => ({ ...persona, personality }))} />
              <label className="form-field">
                <span>Speech register</span>
                <input disabled={busy} onChange={(event) => updatePersona((persona) => ({ ...persona, speech: { ...persona.speech, register: event.target.value } }))} value={stringValue(editable.persona.speech?.register)} />
              </label>
              <label className="form-field">
                <span>Speech notes</span>
                <textarea disabled={busy} onChange={(event) => updatePersona((persona) => ({ ...persona, speech: { ...persona.speech, notes: event.target.value } }))} value={stringValue(editable.persona.speech?.notes)} />
              </label>
              <ListField disabled={busy} label="Values (one per line)" value={stringList(editable.persona.values)} onCommit={(values) => updatePersona((persona) => ({ ...persona, values }))} />
              <ListField disabled={busy} label="Fears (one per line)" value={stringList(editable.persona.fears)} onCommit={(fears) => updatePersona((persona) => ({ ...persona, fears }))} />
              <ListField disabled={busy} label="Desires (one per line)" value={stringList(editable.persona.desires)} onCommit={(desires) => updatePersona((persona) => ({ ...persona, desires }))} />
              <ListField disabled={busy} label="Secrets (one per line)" value={stringList(editable.persona.secrets)} onCommit={(secrets) => updatePersona((persona) => ({ ...persona, secrets }))} />
              <button className="button--danger" disabled={busy} onClick={() => { if (!busy) onDelete(editable.id); }} type="button">Delete Character</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
