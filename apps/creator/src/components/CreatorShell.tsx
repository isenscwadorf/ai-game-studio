import type { ReactNode } from 'react';
import { projectDisplay } from '../domain/projectDisplay';
import type { ProjectSnapshot } from '../domain/projectTypes';
import type { ValidationResult } from '../domain/validation';
import { ValidationBanner } from './ValidationBanner';

type CreatorShellProps = {
  activeWorkspace: WorkspaceName;
  children: ReactNode;
  busy: boolean;
  error: string | null;
  project: ProjectSnapshot;
  saving: boolean;
  validation: ValidationResult;
  onOpenProject: () => void;
  onSave: () => void;
  onWorkspaceChange: (workspace: WorkspaceName) => void;
};

export type WorkspaceName = 'Dashboard' | 'Characters' | 'Locations';

const workspaceItems = [
  { name: 'Dashboard', disabled: false },
  { name: 'Characters', disabled: false },
  { name: 'Locations', disabled: false },
  { name: 'Dialogue', disabled: true },
  { name: 'Events', disabled: true },
  { name: 'Assets', disabled: true },
  { name: 'Copilot', disabled: true },
  { name: 'Debug', disabled: true },
];

export function CreatorShell({ activeWorkspace, busy, children, error, project, saving, validation, onOpenProject, onSave, onWorkspaceChange }: CreatorShellProps) {
  const display = projectDisplay(project.manifest);
  return (
    <div className="creator-shell">
      <header className="creator-shell__topbar">
        <span className="creator-shell__brand">AI Game Studio</span>
        <span className="creator-shell__project-name">{display.displayName}</span>
        <button disabled={busy} onClick={onOpenProject} type="button">Open Project</button>
        <button className="button--primary" disabled={busy} onClick={onSave} type="button">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </header>
      <aside className="creator-shell__sidebar">
        <nav aria-label="Creator workspaces">
          {workspaceItems.map((item) => (
            <button aria-current={item.name === activeWorkspace ? 'page' : undefined} disabled={item.disabled} key={item.name} onClick={() => {
              if (item.name === 'Dashboard' || item.name === 'Characters' || item.name === 'Locations') onWorkspaceChange(item.name);
            }} type="button">
              {item.name}
            </button>
          ))}
        </nav>
      </aside>
      <main className="creator-shell__workspace">
        {error ? <p className="operation-error" role="alert">{error}</p> : null}
        {children}
      </main>
      <footer className="creator-shell__status" aria-label="Project status">
        <ValidationBanner validation={validation} />
        <span>{project.dirty ? 'Unsaved' : 'Saved'}</span>
        <span>Runtime: Not included in Creator Foundation</span>
      </footer>
    </div>
  );
}
