import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App routing', () => {
  test('renders navigation links and home page content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/E-Commerce Admin Portal/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Products/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /Add Product/i })).toBeInTheDocument();
  });
});
