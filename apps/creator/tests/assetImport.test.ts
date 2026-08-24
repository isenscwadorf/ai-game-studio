import { describe, expect, it } from 'vitest';
import { isImportedProjectPath, parseSpriteFraming } from '../src/domain/assetImport';

describe('asset import domain helpers', () => {
  it('accepts only the two supported character sprite framings', () => {
    expect(parseSpriteFraming('full_body')).toBe('full_body');
    expect(parseSpriteFraming('two_thirds')).toBe('two_thirds');
    expect(() => parseSpriteFraming('portrait')).toThrow(/sprite framing/i);
    expect(() => parseSpriteFraming(null)).toThrow(/sprite framing/i);
  });

  it('accepts only canonical project-relative imported character paths', () => {
    expect(isImportedProjectPath('assets/imported/characters/character_maria-a1b2c3d4e5f6.png', 'character_sprite')).toBe(true);
    expect(isImportedProjectPath('assets/imported/characters/character_maria-a1b2c3d4e5f6.webp', 'character_sprite')).toBe(true);
    expect(isImportedProjectPath('assets/imported/locations/kitchen-a1b2c3d4e5f6.jpg', 'character_sprite')).toBe(false);
    expect(isImportedProjectPath('../outside.png', 'character_sprite')).toBe(false);
    expect(isImportedProjectPath('C:/Users/Test/outside.png', 'character_sprite')).toBe(false);
  });

  it('accepts only canonical project-relative imported location paths', () => {
    expect(isImportedProjectPath('assets/imported/locations/kitchen-a1b2c3d4e5f6.jpeg', 'location_background')).toBe(true);
    expect(isImportedProjectPath('assets/imported/characters/kitchen-a1b2c3d4e5f6.jpeg', 'location_background')).toBe(false);
    expect(isImportedProjectPath('/absolute/location.png', 'location_background')).toBe(false);
  });
});
