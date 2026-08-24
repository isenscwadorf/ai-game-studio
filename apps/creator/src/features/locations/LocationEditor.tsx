import { useEffect, useState } from 'react';
import { VisualAssetControls } from '../../components/VisualAssetControls';
import { createLocationDefinition } from '../../domain/locationFactory';
import type { StoredDefinition } from '../../domain/projectTypes';
import { validateDocument } from '../../domain/validation';
import type { VisualAssetGateway } from '../../platform/VisualAssetGateway';

type LocationEditorProps = {
  busy: boolean;
  definitions: StoredDefinition[];
  selectedLocationKey: string | null;
  onCreate: (definition: StoredDefinition['document']) => void;
  onDelete: (id: string) => void;
  onSelect: (key: string) => void;
  onUpdate: (id: string, document: StoredDefinition['document']) => void;
  projectRoot?: string | null;
  visualAssetGateway?: VisualAssetGateway;
  onEnsureSaved?: () => Promise<boolean>;
  onProjectReload?: () => Promise<void>;
};

type LocationListItem = { key: string; document: StoredDefinition['document'] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function editableLocation(document: StoredDefinition['document'] | undefined): StoredDefinition['document'] | null {
  return document && validateDocument('aigs.location.definition', document).valid
    ? document
    : null;
}

function displayName(value: unknown): string {
  return isRecord(value) && typeof value.display_name === 'string' && value.display_name.trim().length > 0
    ? value.display_name
    : 'Unnamed location';
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

function referenceIds(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => isRecord(item) && typeof item.ref === 'string' ? [item.ref] : []);
}

function locationItems(definitions: StoredDefinition[]): LocationListItem[] {
  return definitions
    .filter((definition) => definition.collection === 'locations')
    .map((definition, index) => ({ key: `location-${index}`, document: definition.document }));
}

export function normalizeLocationTags(value: string, document: StoredDefinition['document']): string[] {
  const normalized = [...new Set(value.split(/\r?\n/).map((item) => item.trim().toLowerCase()).filter(Boolean))];
  return normalized.reduce<string[]>((tags, tag) => (
    validateDocument('aigs.location.definition', { ...document, tags: [...tags, tag] }).valid
      ? [...tags, tag]
      : tags
  ), []);
}

function selectedLocationIds(event: React.ChangeEvent<HTMLSelectElement>): string[] {
  return [...event.currentTarget.selectedOptions].map((option) => option.value);
}

function LocationMultiSelect({ disabled, label, locationIds, selectedIds, onChange }: {
  disabled: boolean;
  label: string;
  locationIds: string[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <select disabled={disabled} multiple onChange={(event) => { if (!disabled) onChange(selectedLocationIds(event)); }} value={selectedIds}>
        {locationIds.map((id) => <option key={id} value={id}>{id}</option>)}
      </select>
    </label>
  );
}

export function LocationEditor({
  busy,
  definitions,
  selectedLocationKey,
  onCreate,
  onDelete,
  onSelect,
  onUpdate,
  projectRoot = null,
  visualAssetGateway,
  onEnsureSaved,
  onProjectReload,
}: LocationEditorProps) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newChildLocationIds, setNewChildLocationIds] = useState<string[]>([]);
  const [nameDraft, setNameDraft] = useState('');
  const [tagDraft, setTagDraft] = useState('');
  const locations = locationItems(definitions);
  const selected = locations.find((location) => location.key === selectedLocationKey)?.document;
  const editable = editableLocation(selected);
  const editableId = stringValue(editable?.id);
  const editableDisplayName = stringValue(editable?.display_name);
  const editableTags = stringList(editable?.tags);
  const allLocationIds = locations.flatMap((location) => (
    validateDocument('aigs.location.definition', location.document).valid
      ? [stringValue(location.document.id)]
      : []
  )).filter(Boolean);

  useEffect(() => {
    setNameDraft(editableDisplayName);
    setTagDraft(editableTags.join('\n'));
  }, [selectedLocationKey, editableId, editableDisplayName, editableTags.join('\n')]);

  function addLocation() {
    const trimmedName = newName.trim();
    if (busy || !trimmedName) return;

    const ids = new Set(definitions.map((definition) => definition.document.id).filter((id): id is string => typeof id === 'string'));
    const document = createLocationDefinition(trimmedName, ids);
    const candidate = { ...document, child_location_refs: newChildLocationIds.map((ref) => ({ ref })) };
    if (!validateDocument('aigs.location.definition', candidate).valid) return;
    onCreate(candidate);
    setNewName('');
    setNewChildLocationIds([]);
    setCreating(false);
  }

  function update(change: (location: StoredDefinition['document']) => StoredDefinition['document']) {
    if (busy || !editable || !editableId) return;
    const candidate = change(editable);
    if (validateDocument('aigs.location.definition', candidate).valid) {
      onUpdate(editableId, candidate);
    }
  }

  const otherLocationIds = allLocationIds.filter((id) => id !== editableId);

  return (
    <section aria-labelledby="locations-title" className="location-editor">
      <div className="location-editor__header">
        <div>
          <p className="eyebrow">Definitions</p>
          <h1 id="locations-title">Locations</h1>
        </div>
        <button disabled={busy} onClick={() => { if (!busy) setCreating(true); }} type="button">New Location</button>
      </div>

      {creating ? (
        <form aria-label="Add location" className="location-editor__new" onSubmit={(event) => { event.preventDefault(); addLocation(); }}>
          <label className="form-field">
            <span>Name</span>
            <input autoFocus disabled={busy} onChange={(event) => setNewName(event.target.value)} value={newName} />
          </label>
          <LocationMultiSelect disabled={busy} label="Child locations" locationIds={allLocationIds} selectedIds={newChildLocationIds} onChange={setNewChildLocationIds} />
          <div className="modal__actions">
            <button disabled={busy} onClick={() => { setCreating(false); setNewName(''); setNewChildLocationIds([]); }} type="button">Cancel</button>
            <button className="button--primary" disabled={busy || !newName.trim()} type="submit">Add Location</button>
          </div>
        </form>
      ) : null}

      <div className="location-editor__content">
        <nav aria-label="Location list" className="location-editor__list">
          {locations.length === 0 ? <p>No locations yet.</p> : locations.map((location) => (
            <button
              aria-current={location.key === selectedLocationKey ? 'page' : undefined}
              aria-label={`${displayName(location.document)}, ID ${definitionId(location.document) ?? 'unavailable'}`}
              key={location.key}
              onClick={() => onSelect(location.key)}
              type="button"
            >
              <span>{displayName(location.document)}</span>
              <small className="definition-list__id">{definitionId(location.document) ?? 'ID unavailable'}</small>
            </button>
          ))}
        </nav>

        <div className="location-editor__detail">
          {!selected ? <p>Select a location to edit it.</p> : !editable ? (
            <p role="alert">Location data is malformed and cannot be edited safely.</p>
          ) : (
            <div key={`${selectedLocationKey ?? 'unselected'}:${editableId}`}>
              {visualAssetGateway && onEnsureSaved && onProjectReload ? (
                <VisualAssetControls
                  busy={busy}
                  gateway={visualAssetGateway}
                  onEnsureSaved={onEnsureSaved}
                  onProjectReload={onProjectReload}
                  projectRoot={projectRoot}
                  subjectId={editableId}
                  visualKind="location_background"
                />
              ) : null}
              <label className="form-field">
                <span>Name</span>
                <input disabled={busy} onBlur={() => update((location) => ({ ...location, display_name: nameDraft }))} onChange={(event) => setNameDraft(event.target.value)} value={nameDraft} />
              </label>
              <label className="form-field">
                <span>Description</span>
                <textarea disabled={busy} onChange={(event) => update((location) => ({ ...location, description: event.target.value }))} value={stringValue(editable.description)} />
              </label>
              <label className="form-field">
                <span>Tags (one per line)</span>
                <textarea disabled={busy} onBlur={() => { if (!busy) update((location) => ({ ...location, tags: normalizeLocationTags(tagDraft, location) })); }} onChange={(event) => setTagDraft(event.target.value)} value={tagDraft} />
              </label>
              <LocationMultiSelect
                disabled={busy}
                label="Child locations"
                locationIds={otherLocationIds}
                selectedIds={referenceIds(editable.child_location_refs).filter((id) => id !== editableId)}
                onChange={(ids) => update((location) => ({ ...location, child_location_refs: ids.map((ref) => ({ ref })) }))}
              />
              <LocationMultiSelect
                disabled={busy}
                label="Destinations"
                locationIds={otherLocationIds}
                selectedIds={referenceIds(editable.destination_refs).filter((id) => id !== editableId)}
                onChange={(ids) => update((location) => ({ ...location, destination_refs: ids.map((ref) => ({ ref })) }))}
              />
              <button className="button--danger" disabled={busy} onClick={() => { if (!busy && editableId) onDelete(editableId); }} type="button">Delete Location</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
