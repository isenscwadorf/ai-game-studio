export type RecentProject = {
  path: string;
  displayName: string;
  lastOpenedAt: number;
};

export const RECENT_PROJECTS_STORAGE_KEY = 'aigs.creator.recentProjects';
const MAX_RECENT_PROJECTS = 10;

function normalizeWindowsPath(path: string): string | null {
  if (path.trim().length === 0) {
    return null;
  }
  const withWindowsSeparators = path.replace(/\//g, '\\');
  const isUnc = withWindowsSeparators.startsWith('\\\\');
  const prefix = isUnc ? '\\\\' : '';
  let normalized = `${prefix}${withWindowsSeparators.slice(prefix.length).replace(/\\+/g, '\\')}`;
  if (normalized === '\\' || /^[A-Za-z]:\\$/.test(normalized)) {
    return normalized;
  }
  if (/^\\\\[^\\]+\\[^\\]+\\?$/.test(normalized)) {
    return `${normalized.replace(/\\+$/, '')}\\`;
  }
  normalized = normalized.replace(/\\+$/, '');
  return normalized || null;
}

function windowsPathKey(path: string): string {
  return path.toLowerCase();
}

function toRecentProject(value: unknown): RecentProject | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.path !== 'string'
    || typeof candidate.displayName !== 'string'
    || typeof candidate.lastOpenedAt !== 'number'
    || !Number.isFinite(candidate.lastOpenedAt)
    || candidate.displayName.trim().length === 0) {
    return null;
  }
  const path = normalizeWindowsPath(candidate.path);
  if (!path) {
    return null;
  }
  return {
    path,
    displayName: candidate.displayName,
    lastOpenedAt: candidate.lastOpenedAt,
  };
}

function normalizeRecentProjects(projects: unknown[]): RecentProject[] {
  return projects
    .map(toRecentProject)
    .filter((project): project is RecentProject => project !== null)
    .map((project, index) => ({ project, index }))
    .sort((left, right) => right.project.lastOpenedAt - left.project.lastOpenedAt || left.index - right.index)
    .filter(({ project }, index, sorted) => sorted.findIndex(({ project: candidate }) =>
      windowsPathKey(candidate.path) === windowsPathKey(project.path)) === index)
    .slice(0, MAX_RECENT_PROJECTS)
    .map(({ project }) => project);
}

export function addRecentProject(existing: RecentProject[], project: RecentProject): RecentProject[] {
  return normalizeRecentProjects([project, ...existing]);
}

export function loadRecentProjects(): RecentProject[] {
  const stored = localStorage.getItem(RECENT_PROJECTS_STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return normalizeRecentProjects(parsed);
  } catch {
    return [];
  }
}

export function saveRecentProjects(projects: RecentProject[]): void {
  const metadataOnly = normalizeRecentProjects(projects);
  localStorage.setItem(RECENT_PROJECTS_STORAGE_KEY, JSON.stringify(metadataOnly));
}
