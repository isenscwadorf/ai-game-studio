import { projectDisplay } from '../../domain/projectDisplay';
import type { ProjectSnapshot } from '../../domain/projectTypes';
import type { ValidationResult } from '../../domain/validation';

type ProjectDashboardProps = {
  project: ProjectSnapshot;
  validation: ValidationResult;
};

export function ProjectDashboard({ project, validation }: ProjectDashboardProps) {
  const characterCount = project.definitions.filter((definition) => definition.collection === 'characters').length;
  const locationCount = project.definitions.filter((definition) => definition.collection === 'locations').length;
  const display = projectDisplay(project.manifest);

  return (
    <section aria-labelledby="dashboard-title" className="dashboard">
      <p className="eyebrow">Project dashboard</p>
      <h1 id="dashboard-title">{display.displayName}</h1>
      <p className="dashboard__premise">{display.premise}</p>
      <dl className="summary-cards">
        <div>
          <dt>Characters</dt>
          <dd>{characterCount}</dd>
        </div>
        <div>
          <dt>Locations</dt>
          <dd>{locationCount}</dd>
        </div>
        <div>
          <dt>Validation</dt>
          <dd>{validation.valid ? 'Valid' : 'Invalid'}</dd>
        </div>
      </dl>
      <p className="slice-note">Playtest arrives in Slice 2</p>
    </section>
  );
}
