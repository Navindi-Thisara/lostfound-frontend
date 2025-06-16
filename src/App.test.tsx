import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sign In heading by default', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /sign in/i });
  expect(heading).toBeInTheDocument();
});
