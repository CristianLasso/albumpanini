import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import HomePage from '../../../pages/HomePage/HomePage'

test('The register component shows the title, the cat input field, the breed dropdown, the genders radio butons, the vaccines checkboxes, the accept terms and conditions checkbox and the register button', () => {
  render(<HomePage />);

  expect(screen.getByRole('heading', { name: /React App/i })).toBeInTheDocument()
  expect(screen.getByRole('h3', { name: /Tus albumes son:/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Agregar album​/i })).toBeInTheDocument();
  expect(screen.getByText(/Tus albumes son:/i)).toBeInTheDocument();
});
