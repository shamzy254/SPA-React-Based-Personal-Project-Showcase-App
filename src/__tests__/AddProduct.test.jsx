import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('AddProduct page', () => {
  test('submits new product and shows success message', async () => {
    const productListResponse = [];
    const createdProduct = {
      id: 999,
      name: 'Test Product',
      description: 'New sample item',
      category: 'Test',
      price: 12.99,
      stock: 3
    };

    global.fetch = jest.fn((url, options) => {
      if (url.endsWith('/products') && (!options || options.method === 'GET')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(productListResponse) });
      }
      if (url.endsWith('/products') && options.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(createdProduct) });
      }
      return Promise.resolve({ ok: false });
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/new-product']}>
        <App />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Product Name/i), 'Test Product');
    await user.type(screen.getByLabelText(/Category/i), 'Test');
    await user.type(screen.getByLabelText(/Price/i), '12.99');
    await user.type(screen.getByLabelText(/Stock Quantity/i), '3');
    await user.type(screen.getByLabelText(/Description/i), 'New sample item');

    await user.click(screen.getByRole('button', { name: /Add Product/i }));

    await waitFor(() => expect(screen.getByText(/Product added successfully/i)).toBeInTheDocument());
  });
});
