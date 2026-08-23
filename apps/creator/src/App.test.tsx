import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the creator identity', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'AI Game Studio' })).toBeInTheDocument();
    expect(screen.getByText('Create or open a local project')).toBeInTheDocument();
  });
});
