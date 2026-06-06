import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('Products page', () => {
  test('shows products and filters results', async () => {
    const products = [
      { id: 1, name: 'Astra Wireless Headphones', description: 'Noise canceling', category: 'Audio', price: 129.99, stock: 42 },
      { id: 2, name: 'Nimbus Smart Watch', description: 'Sleep tracker', category: 'Wearables', price: 199.99, stock: 18 }
    ];

    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(products) }));

    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Astra Wireless Headphones/i)).toBeInTheDocument());
    expect(screen.getByText(/Nimbus Smart Watch/i)).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search products/i);
    await userEvent.type(searchInput, 'Nimbus');

    expect(screen.getByText(/Nimbus Smart Watch/i)).toBeInTheDocument();
    expect(screen.queryByText(/Astra Wireless Headphones/i)).not.toBeInTheDocument();
  });
});
