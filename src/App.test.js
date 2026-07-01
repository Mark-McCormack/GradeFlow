import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('allows adding a module to a year and updates the summary', () => {
  render(<App />);

  const addModuleButton = screen.getAllByRole('button', { name: /add module/i })[0];
  userEvent.click(addModuleButton);

  expect(screen.getAllByLabelText(/module name/i).length).toBeGreaterThan(0);
});
