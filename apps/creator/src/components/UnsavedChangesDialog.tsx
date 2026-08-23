import { useEffect, useRef } from 'react';

type UnsavedChangesDialogProps = {
  busy: boolean;
  error: string | null;
  validationBlocked: boolean;
  onCancel: () => void;
  onDiscard: () => void;
  onSave: () => void;
};

export function UnsavedChangesDialog({
  busy,
  error,
  validationBlocked,
  onCancel,
  onDiscard,
  onSave,
}: UnsavedChangesDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog) return undefined;
    try {
      if (typeof dialog.showModal !== 'function') throw new Error('HTMLDialogElement.showModal is unavailable.');
      dialog.showModal();
    } catch {
      dialog.setAttribute('open', '');
      dialog.focus();
    }
    return () => {
      if (dialog.open) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <dialog
      aria-labelledby="unsaved-changes-title"
      aria-modal="true"
      className="modal"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <header className="modal__header">
        <h2 id="unsaved-changes-title">Unsaved changes</h2>
        <p>Save this project before continuing, discard the current changes, or cancel.</p>
      </header>
      {validationBlocked ? (
        <p className="operation-error" role="alert">Save is blocked until the project validation issues are repaired.</p>
      ) : error ? <p className="operation-error" role="alert">{error}</p> : null}
      <footer className="modal__actions">
        <button disabled={busy} onClick={onCancel} type="button">Cancel</button>
        <button className="button--danger" disabled={busy} onClick={onDiscard} type="button">Discard</button>
        <button className="button--primary" disabled={busy} onClick={onSave} type="button">Save</button>
      </footer>
    </dialog>
  );
}
