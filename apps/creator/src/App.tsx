import { useEffect, useReducer, useRef, useState } from 'react';
import { CreatorShell } from './components/CreatorShell';
import { UnsavedChangesDialog } from './components/UnsavedChangesDialog';
import { createBlankProject } from './domain/blankProject';
import { slugifyIdPart } from './domain/ids';
import { projectDisplay } from './domain/projectDisplay';
import type { ProjectSnapshot } from './domain/projectTypes';
import { validateProject, type ValidationResult } from './domain/validation';
import { ProjectDashboard } from './features/dashboard/ProjectDashboard';
import { CharacterEditor } from './features/characters/CharacterEditor';
import { LocationEditor } from './features/locations/LocationEditor';
import { HomeScreen } from './features/home/HomeScreen';
import { NewProjectDialog } from './features/home/NewProjectDialog';
import type { ProjectGateway } from './platform/ProjectGateway';
import type { VisualAssetGateway } from './platform/VisualAssetGateway';
import type { CreatorWindowGateway } from './platform/CreatorWindowGateway';
import { tauriProjectGateway } from './platform/tauriProjectGateway';
import { tauriVisualAssetGateway } from './platform/tauriVisualAssetGateway';
import { initialProjectEditorState, reducer } from './state/projectReducer';
import { RequestGuard } from './state/requestGuard';
import { addRecentProject, loadRecentProjects, saveRecentProjects } from './state/recentProjects';

type AppProps = {
  gateway?: ProjectGateway;
  visualAssetGateway?: VisualAssetGateway;
  windowGateway?: CreatorWindowGateway;
};

type PendingTransition =
  | { type: 'new' }
  | { type: 'open'; projectDir?: string }
  | { type: 'close' };

const noWindowGateway: CreatorWindowGateway = {
  async onCloseRequested() { return () => undefined; },
  async forceClose() { return undefined; },
};

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message.trim();
  }
  if (typeof error === 'string' && error.trim().length > 0) {
    return error.trim();
  }
  return 'Project operation failed.';
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function usableSnapshot(snapshot: unknown): ProjectSnapshot {
  if (!isPlainRecord(snapshot)) {
    const validation = validateProject(snapshot);
    throw new Error(validation.errors.map((issue) => issue.message).join(' ') || 'Project snapshot is malformed.');
  }
  if (!isPlainRecord(snapshot.manifest) || !Array.isArray(snapshot.definitions)
    || !('rootPath' in snapshot) || (snapshot.rootPath !== null && typeof snapshot.rootPath !== 'string')
    || typeof snapshot.dirty !== 'boolean') {
    throw new Error('Project snapshot envelope is malformed.');
  }
  for (const definition of snapshot.definitions) {
    if (!isPlainRecord(definition)
      || (definition.collection !== 'characters' && definition.collection !== 'locations')
      || !isPlainRecord(definition.document)) {
      throw new Error('Project snapshot contains an invalid stored definition.');
    }
  }
  return snapshot as ProjectSnapshot;
}

function projectFolderName(displayName: string): string {
  const baseName = slugifyIdPart(displayName);
  const nonReservedName = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(baseName)
    ? `${baseName}_project`
    : baseName;
  return nonReservedName.slice(0, 240);
}

function recordRecentProject(project: ProjectSnapshot): void {
  if (!project.rootPath) {
    return;
  }
  saveRecentProjects(addRecentProject(loadRecentProjects(), {
    path: project.rootPath,
    displayName: projectDisplay(project.manifest).displayName,
    lastOpenedAt: Date.now(),
  }));
}

export function App({
  gateway = tauriProjectGateway,
  visualAssetGateway = tauriVisualAssetGateway,
  windowGateway = noWindowGateway,
}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialProjectEditorState);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<'Dashboard' | 'Characters' | 'Locations'>('Dashboard');
  const [selectedCharacterKey, setSelectedCharacterKey] = useState<string | null>(null);
  const [selectedLocationKey, setSelectedLocationKey] = useState<string | null>(null);
  const [operation, setOperation] = useState<'idle' | 'opening' | 'creating' | 'saving' | 'closing'>('idle');
  const [pendingTransition, setPendingTransition] = useState<PendingTransition | null>(null);
  const [transitionError, setTransitionError] = useState<string | null>(null);
  const mountedRef = useRef(false);
  const pendingTransitionRef = useRef<PendingTransition | null>(null);
  const requestGuardRef = useRef(new RequestGuard());
  const transitionRequestRef = useRef<(transition: PendingTransition) => void>(() => undefined);
  const validation: ValidationResult = state.project ? validateProject(state.project) : { valid: true, errors: [] };
  const busy = operation !== 'idle';

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestGuardRef.current.invalidate();
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    let unlisten: (() => void) | null = null;
    void windowGateway.onCloseRequested(() => transitionRequestRef.current({ type: 'close' }))
      .then((listener) => {
        if (disposed) listener();
        else unlisten = listener;
      })
      .catch((error) => {
        if (mountedRef.current) dispatch({ type: 'operationFailed', error: errorMessage(error) });
      });
    return () => {
      disposed = true;
      unlisten?.();
    };
  }, [windowGateway]);

  function beginOperation(nextOperation: Exclude<typeof operation, 'idle'>): number | null {
    const requestGeneration = requestGuardRef.current.begin();
    if (requestGeneration === null) {
      return null;
    }
    setOperation(nextOperation);
    return requestGeneration;
  }

  function isCurrentRequest(requestGeneration: number): boolean {
    return mountedRef.current && requestGuardRef.current.isCurrent(requestGeneration);
  }

  function finishOperation(requestGeneration: number) {
    if (!mountedRef.current || !requestGuardRef.current.finish(requestGeneration)) {
      return;
    }
    setOperation('idle');
  }

  async function openProject(projectDir?: string) {
    const requestGeneration = beginOperation('opening');
    if (requestGeneration === null) {
      return;
    }
    try {
      const selectedDirectory = projectDir ?? await gateway.chooseProjectDirectory();
      if (!selectedDirectory) {
        return;
      }
      const project = usableSnapshot(await gateway.openProject(selectedDirectory));
      if (!isCurrentRequest(requestGeneration)) {
        return;
      }
      recordRecentProject(project);
      setActiveWorkspace('Dashboard');
      setSelectedCharacterKey(null);
      setSelectedLocationKey(null);
      dispatch({ type: 'projectOpened', project });
    } catch (error) {
      if (isCurrentRequest(requestGeneration)) {
        dispatch({ type: 'operationFailed', error: errorMessage(error) });
      }
    } finally {
      finishOperation(requestGeneration);
    }
  }

  async function closeWindow() {
    const requestGeneration = beginOperation('closing');
    if (requestGeneration === null) return;
    try {
      await windowGateway.forceClose();
    } catch (error) {
      if (isCurrentRequest(requestGeneration)) {
        dispatch({ type: 'operationFailed', error: errorMessage(error) });
      }
    } finally {
      finishOperation(requestGeneration);
    }
  }

  function executeTransition(transition: PendingTransition) {
    if (transition.type === 'open') {
      void openProject(transition.projectDir);
    } else if (transition.type === 'new') {
      setNewProjectOpen(true);
    } else {
      void closeWindow();
    }
  }

  function requestTransition(transition: PendingTransition) {
    if (busy || pendingTransitionRef.current) return;
    if (state.project?.dirty) {
      pendingTransitionRef.current = transition;
      setTransitionError(null);
      setPendingTransition(transition);
      return;
    }
    executeTransition(transition);
  }

  transitionRequestRef.current = requestTransition;

  function clearPendingTransition() {
    pendingTransitionRef.current = null;
    setPendingTransition(null);
    setTransitionError(null);
  }

  function discardAndContinue() {
    const transition = pendingTransitionRef.current;
    if (!transition || busy) return;
    clearPendingTransition();
    executeTransition(transition);
  }

  async function createProject(displayName: string, premise: string) {
    const requestGeneration = beginOperation('creating');
    if (requestGeneration === null) {
      return;
    }
    try {
      const parentDirectory = await gateway.chooseParentDirectory();
      if (!parentDirectory) {
        return;
      }
      const blankProject = createBlankProject({ displayName, premise });
      const project = usableSnapshot(await gateway.createProject(
        parentDirectory,
        projectFolderName(blankProject.manifest.display_name),
        blankProject,
      ));
      if (!isCurrentRequest(requestGeneration)) {
        return;
      }
      recordRecentProject(project);
      setNewProjectOpen(false);
      setActiveWorkspace('Dashboard');
      setSelectedCharacterKey(null);
      setSelectedLocationKey(null);
      dispatch({ type: 'projectOpened', project });
    } catch (error) {
      if (isCurrentRequest(requestGeneration)) {
        dispatch({ type: 'operationFailed', error: errorMessage(error) });
      }
    } finally {
      finishOperation(requestGeneration);
    }
  }

  async function saveProject(): Promise<boolean> {
    const projectToSave = state.project;
    if (!projectToSave || !validateProject(projectToSave).valid) return false;
    const requestGeneration = beginOperation('saving');
    if (requestGeneration === null) return false;
    try {
      const savedProject = usableSnapshot(await gateway.saveProject(projectToSave));
      if (isCurrentRequest(requestGeneration)) {
        dispatch({ type: 'projectSaved', project: savedProject });
        return true;
      }
    } catch (error) {
      if (isCurrentRequest(requestGeneration)) {
        const message = errorMessage(error);
        dispatch({ type: 'operationFailed', error: message });
        if (pendingTransitionRef.current) setTransitionError(message);
      }
    } finally {
      finishOperation(requestGeneration);
    }
    return false;
  }

  async function ensureSavedForVisualMutation(): Promise<boolean> {
    if (!state.project) return false;
    return state.project.dirty ? saveProject() : true;
  }

  async function reloadCurrentProject(): Promise<void> {
    const rootPath = state.project?.rootPath;
    if (!rootPath) throw new Error('An open project is required to refresh visual assets.');
    const project = usableSnapshot(await gateway.openProject(rootPath));
    if (!mountedRef.current) return;
    recordRecentProject(project);
    dispatch({ type: 'projectOpened', project });
  }

  async function saveAndContinue() {
    const transition = pendingTransitionRef.current;
    if (!transition) return;
    const saved = await saveProject();
    if (!saved || pendingTransitionRef.current !== transition) return;
    clearPendingTransition();
    executeTransition(transition);
  }

  if (!state.project) {
    return (
      <>
        <HomeScreen
          error={state.error}
          loading={busy}
          onNewProject={() => requestTransition({ type: 'new' })}
          onOpenProject={() => requestTransition({ type: 'open' })}
          onOpenRecentProject={(path) => requestTransition({ type: 'open', projectDir: path })}
          recentProjects={loadRecentProjects()}
        />
        {newProjectOpen ? (
          <NewProjectDialog
            creating={operation === 'creating'}
            onCancel={() => setNewProjectOpen(false)}
            onCreate={(displayName, premise) => void createProject(displayName, premise)}
          />
        ) : null}
      </>
    );
  }

  const project = state.project;

  return (
    <CreatorShell
      activeWorkspace={activeWorkspace}
      error={state.error}
      onOpenProject={() => requestTransition({ type: 'open' })}
      onSave={() => void saveProject()}
      project={project}
      busy={busy}
      saving={operation === 'saving'}
      validation={validation}
      onWorkspaceChange={setActiveWorkspace}
    >
      {activeWorkspace === 'Characters' ? (
        <CharacterEditor
          busy={busy}
          definitions={project.definitions}
          onEnsureSaved={ensureSavedForVisualMutation}
          onProjectReload={reloadCurrentProject}
          projectRoot={project.rootPath}
          selectedCharacterKey={selectedCharacterKey}
          visualAssetGateway={visualAssetGateway}
          onCreate={(document) => {
            dispatch({ type: 'characterCreated', document });
            setSelectedCharacterKey(`character-${project.definitions.filter((definition) => definition.collection === 'characters').length}`);
          }}
          onDelete={(id) => {
            dispatch({ type: 'characterDeleted', id });
            setSelectedCharacterKey(null);
          }}
          onSelect={setSelectedCharacterKey}
          onUpdate={(id, document) => dispatch({ type: 'characterUpdated', id, document })}
        />
      ) : activeWorkspace === 'Locations' ? (
        <LocationEditor
          busy={busy}
          definitions={project.definitions}
          onEnsureSaved={ensureSavedForVisualMutation}
          onProjectReload={reloadCurrentProject}
          projectRoot={project.rootPath}
          selectedLocationKey={selectedLocationKey}
          visualAssetGateway={visualAssetGateway}
          onCreate={(document) => {
            dispatch({ type: 'locationCreated', document });
            setSelectedLocationKey(`location-${project.definitions.filter((definition) => definition.collection === 'locations').length}`);
          }}
          onDelete={(id) => {
            dispatch({ type: 'locationDeleted', id });
            setSelectedLocationKey(null);
          }}
          onSelect={setSelectedLocationKey}
          onUpdate={(id, document) => dispatch({ type: 'locationUpdated', id, document })}
        />
      ) : <ProjectDashboard project={project} validation={validation} />}
      {pendingTransition ? (
        <UnsavedChangesDialog
          busy={busy}
          error={transitionError}
          onCancel={clearPendingTransition}
          onDiscard={discardAndContinue}
          onSave={() => void saveAndContinue()}
          validationBlocked={!validation.valid}
        />
      ) : null}
    </CreatorShell>
  );
}
