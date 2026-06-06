const API_BASE = 'http://localhost:4000';

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error('Failed to load products');
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (!response.ok) throw new Error('Could not add product');
  return response.json();
}

export async function updateProduct(id, updates) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Could not update product');
  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Could not delete product');
  return response.json();
}
