import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render navbar', () => {
  render(<App />);
  expect(screen.getByText('Zendesk Coding Challenge')).toBeInTheDocument();
});

test('render cards', () => {
  render(<App />);
  expect(screen.get);
});
