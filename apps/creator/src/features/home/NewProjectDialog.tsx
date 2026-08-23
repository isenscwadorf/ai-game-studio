import { useEffect, useRef, useState, type FormEvent } from 'react';

type NewProjectDialogProps = {
  creating: boolean;
  onCancel: () => void;
  onCreate: (displayName: string, premise: string) => void;
};

export function NewProjectDialog({ creating, onCancel, onCreate }: NewProjectDialogProps) {
  const [displayName, setDisplayName] = useState('');
  const [premise, setPremise] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog) {
      return undefined;
    }
    try {
      if (typeof dialog.showModal !== 'function') {
        throw new Error('HTMLDialogElement.showModal is unavailable.');
      }
      dialog.showModal();
    } catch {
      dialog.setAttribute('open', '');
      dialog.focus();
    }
    return () => {
      if (dialog.open) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
      previouslyFocused?.focus();
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCreate(displayName, premise);
  }

  return (
    <dialog aria-labelledby="new-project-title" aria-modal="true" className="modal" onCancel={(event) => {
      event.preventDefault();
      if (!creating) {
        onCancel();
      }
    }} ref={dialogRef} role="dialog" tabIndex={-1}>
      <form onSubmit={submit}>
        <header className="modal__header">
          <h2 id="new-project-title">New Project</h2>
          <p>Start a new local project.</p>
        </header>
        <div className="form-field">
          <label htmlFor="project-name">Project name</label>
          <input
            id="project-name"
            disabled={creating}
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
          />
        </div>
        <div className="form-field">
          <label htmlFor="project-premise">Premise</label>
          <textarea
            id="project-premise"
            disabled={creating}
            onChange={(event) => setPremise(event.target.value)}
            rows={4}
            value={premise}
          />
        </div>
        <footer className="modal__actions">
          <button disabled={creating} onClick={onCancel} type="button">Cancel</button>
          <button className="button--primary" disabled={creating || displayName.trim().length === 0} type="submit">
            {creating ? 'Creating…' : 'Create Project'}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
