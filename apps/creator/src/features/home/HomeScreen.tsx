import type { RecentProject } from '../../state/recentProjects';

type HomeScreenProps = {
  error: string | null;
  loading: boolean;
  recentProjects: RecentProject[];
  onNewProject: () => void;
  onOpenProject: () => void;
  onOpenRecentProject: (path: string) => void;
};

export function HomeScreen({
  error,
  loading,
  recentProjects,
  onNewProject,
  onOpenProject,
  onOpenRecentProject,
}: HomeScreenProps) {
  return (
    <main className="home-screen">
      <section aria-labelledby="home-title" className="home-screen__content">
        <p className="eyebrow">Creator Foundation</p>
        <h1 id="home-title">AI Game Studio</h1>
        <p className="home-screen__summary">Create or open a local project</p>
        {error ? <p className="operation-error" role="alert">{error}</p> : null}
        <div className="home-screen__actions">
          <button className="button--primary" disabled={loading} onClick={onNewProject} type="button">New Project</button>
          <button disabled={loading} onClick={onOpenProject} type="button">Open Project</button>
        </div>
        <section aria-labelledby="recent-projects-title" className="recent-projects">
          <h2 id="recent-projects-title">Recent projects</h2>
          {recentProjects.length === 0 ? (
            <p>No recent local projects.</p>
          ) : (
            <ul>
              {recentProjects.map((project) => (
                <li key={project.path}>
                  <button disabled={loading} onClick={() => onOpenRecentProject(project.path)} type="button">
                    <span>{project.displayName}</span>
                    <small>{project.path}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}
