import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppWithoutRouter } from './App';

test('renders tester route', () => {
  render(
    <MemoryRouter initialEntries={['/tester']}>
      <AppWithoutRouter />
    </MemoryRouter>
  );

  const registerButton = screen.getByText(/Register/i); 
  expect(registerButton).toBeInTheDocument();
});
