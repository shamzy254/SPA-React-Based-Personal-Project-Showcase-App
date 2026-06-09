import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('ProductDetail page', () => {
  test('loads product, updates and deletes it', async () => {
    const product = { id: 1, name: 'Sample', description: 'Desc', category: 'Cat', price: 10.0, stock: 5 };

    global.fetch = jest.fn((url, options) => {
      if (url.endsWith('/products/1') && (!options || options.method === 'GET')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(product) });
      }

      if (url.endsWith('/products/1') && options && options.method === 'PATCH') {
        const body = JSON.parse(options.body);
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ...product, ...body }) });
      }

      if (url.endsWith('/products/1') && options && options.method === 'DELETE') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }

      return Promise.resolve({ ok: false });
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Manage Sample/i)).toBeInTheDocument());

    // Update values
    await user.clear(screen.getByLabelText(/Price/i));
    await user.type(screen.getByLabelText(/Price/i), '12.50');
    await user.clear(screen.getByLabelText(/Stock/i));
    await user.type(screen.getByLabelText(/Stock/i), '8');

    await user.click(screen.getByRole('button', { name: /Save changes/i }));

    await waitFor(() => expect(screen.getByText(/Product updated successfully/i)).toBeInTheDocument());

    // Delete
    await user.click(screen.getByRole('button', { name: /Delete product/i }));

    await waitFor(() => expect(screen.queryByText(/Manage Sample/i)).not.toBeInTheDocument());
  });
});
