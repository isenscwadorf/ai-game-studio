import type { ValidationResult } from '../domain/validation';

type ValidationBannerProps = {
  validation: ValidationResult;
};

export function ValidationBanner({ validation }: ValidationBannerProps) {
  if (validation.valid) {
    return <span className="validation-status validation-status--valid">Validation: Valid</span>;
  }

  return (
    <section aria-live="polite" className="validation-banner validation-status--invalid" role="alert">
      <strong>Validation: Invalid</strong>
      <ul>
        {validation.errors.map((issue) => (
          <li key={`${issue.path}-${issue.code}-${issue.message}`}>
            <code>{issue.path || '/'}</code> <strong>{issue.code}</strong> {issue.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
