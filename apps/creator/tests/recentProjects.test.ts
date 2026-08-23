import { describe, expect, it } from 'vitest';
import {
  addRecentProject,
  loadRecentProjects,
  RECENT_PROJECTS_STORAGE_KEY,
  saveRecentProjects,
} from '../src/state/recentProjects';

describe('recent projects', () => {
  it('keeps ten unique Windows paths ordered newest first', () => {
    const existing = Array.from({ length: 10 }, (_, index) => ({
      path: `C:\\Games\\Project${index}`,
      displayName: `Project ${index}`,
      lastOpenedAt: index,
    }));

    const result = addRecentProject(existing, {
      path: 'c:\\games\\project4',
      displayName: 'Project Four',
      lastOpenedAt: 10,
    });

    expect(result[0]).toEqual({
      path: 'c:\\games\\project4',
      displayName: 'Project Four',
      lastOpenedAt: 10,
    });
    expect(new Set(result.map((item) => item.path.toLowerCase())).size).toBe(result.length);
    expect(result).toHaveLength(10);
  });

  it('persists only the recent-project metadata', () => {
    saveRecentProjects([{
      path: 'C:\\Games\\A',
      displayName: 'A',
      lastOpenedAt: 42,
      credentials: { token: 'must not persist' },
      project: { manifest: { display_name: 'must not persist' } },
    } as never]);

    expect(JSON.parse(localStorage.getItem(RECENT_PROJECTS_STORAGE_KEY) ?? 'null')).toEqual([{
      path: 'C:\\Games\\A',
      displayName: 'A',
      lastOpenedAt: 42,
    }]);
    expect(loadRecentProjects()).toEqual([{
      path: 'C:\\Games\\A',
      displayName: 'A',
      lastOpenedAt: 42,
    }]);
  });

  it('retains the stored newest-first order when history is reloaded', () => {
    localStorage.setItem(RECENT_PROJECTS_STORAGE_KEY, JSON.stringify([
      { path: 'C:\\Games\\Newest', displayName: 'Newest', lastOpenedAt: 3 },
      { path: 'C:\\Games\\Older', displayName: 'Older', lastOpenedAt: 2 },
    ]));

    expect(loadRecentProjects().map((project) => project.path)).toEqual([
      'C:\\Games\\Newest',
      'C:\\Games\\Older',
    ]);
  });

  it('enforces Windows path uniqueness before writing history', () => {
    saveRecentProjects([
      { path: 'C:\\Games\\A', displayName: 'A', lastOpenedAt: 2 },
      { path: 'c:\\games\\a', displayName: 'Old A', lastOpenedAt: 1 },
      { path: 'C:\\Games\\B', displayName: 'B', lastOpenedAt: 0 },
    ]);

    expect(JSON.parse(localStorage.getItem(RECENT_PROJECTS_STORAGE_KEY) ?? 'null')).toEqual([
      { path: 'C:\\Games\\A', displayName: 'A', lastOpenedAt: 2 },
      { path: 'C:\\Games\\B', displayName: 'B', lastOpenedAt: 0 },
    ]);
  });

  it('loads only valid history, choosing the newest normalized duplicate first', () => {
    localStorage.setItem(RECENT_PROJECTS_STORAGE_KEY, JSON.stringify([
      { path: 'C:\\Games\\A\\', displayName: 'Old A', lastOpenedAt: 1 },
      { path: 'C:/Games//A', displayName: 'New A', lastOpenedAt: 4 },
      { path: 'C:\\Games\\B', displayName: 'B', lastOpenedAt: 5 },
      { path: '   ', displayName: 'No path', lastOpenedAt: 99 },
      { path: 'C:\\Games\\NoName', displayName: ' ', lastOpenedAt: 99 },
      { path: 'C:\\Games\\BadTime', displayName: 'Bad time', lastOpenedAt: null },
    ]));

    expect(loadRecentProjects()).toEqual([
      { path: 'C:\\Games\\B', displayName: 'B', lastOpenedAt: 5 },
      { path: 'C:\\Games\\A', displayName: 'New A', lastOpenedAt: 4 },
    ]);
  });

  it('writes sorted, normalized history without blank or non-finite metadata', () => {
    saveRecentProjects([
      { path: 'C:\\Games\\A\\', displayName: 'A', lastOpenedAt: 4 },
      { path: 'C:\\Games\\B', displayName: 'B', lastOpenedAt: 5 },
      { path: '', displayName: 'Blank path', lastOpenedAt: 100 } as never,
      { path: 'C:\\Games\\Blank', displayName: '  ', lastOpenedAt: 100 } as never,
      { path: 'C:\\Games\\NaN', displayName: 'NaN', lastOpenedAt: Number.NaN } as never,
      { path: 'C:\\Games\\Infinity', displayName: 'Infinity', lastOpenedAt: Number.POSITIVE_INFINITY } as never,
    ]);

    expect(JSON.parse(localStorage.getItem(RECENT_PROJECTS_STORAGE_KEY) ?? 'null')).toEqual([
      { path: 'C:\\Games\\B', displayName: 'B', lastOpenedAt: 5 },
      { path: 'C:\\Games\\A', displayName: 'A', lastOpenedAt: 4 },
    ]);
  });
});
