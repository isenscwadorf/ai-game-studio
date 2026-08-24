import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CharacterEditor } from '../src/features/characters/CharacterEditor';
import { LocationEditor } from '../src/features/locations/LocationEditor';
import type { StoredDefinition } from '../src/domain/projectTypes';

const character: StoredDefinition = {
  collection: 'characters',
  document: {
    schema_id: 'aigs.character.definition', schema_version: 1, id: 'character.maria', kind: 'character',
    display_name: 'Maria', persona: {},
  },
};
const kitchen: StoredDefinition = {
  collection: 'locations',
  document: {
    schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.kitchen', kind: 'location', display_name: 'Kitchen',
  },
};
const hall: StoredDefinition = {
  collection: 'locations',
  document: {
    schema_id: 'aigs.location.definition', schema_version: 1, id: 'location.hall', kind: 'location', display_name: 'Hall',
  },
};

describe('Slice 2 authoring fields', () => {
  it('stores Character Initial Location as a DefinitionRef', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(<CharacterEditor
      busy={false}
      definitions={[character, kitchen]}
      onCreate={vi.fn()}
      onDelete={vi.fn()}
      onSelect={vi.fn()}
      onUpdate={onUpdate}
      selectedCharacterKey="character-0"
    />);

    await user.selectOptions(screen.getByLabelText('Initial Location'), 'location.kitchen');
    expect(onUpdate).toHaveBeenCalledWith('character.maria', expect.objectContaining({
      initial_location_ref: { ref: 'location.kitchen' },
    }));
  });

  it('stores Location Destinations as DefinitionRefs and excludes self', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(<LocationEditor
      busy={false}
      definitions={[kitchen, hall]}
      onCreate={vi.fn()}
      onDelete={vi.fn()}
      onSelect={vi.fn()}
      onUpdate={onUpdate}
      selectedLocationKey="location-0"
    />);

    const destinations = screen.getByLabelText('Destinations');
    expect(screen.queryByRole('option', { name: 'location.kitchen' })).not.toBeInTheDocument();
    await user.selectOptions(destinations, 'location.hall');
    expect(onUpdate).toHaveBeenCalledWith('location.kitchen', expect.objectContaining({
      destination_refs: [{ ref: 'location.hall' }],
    }));
  });
});
