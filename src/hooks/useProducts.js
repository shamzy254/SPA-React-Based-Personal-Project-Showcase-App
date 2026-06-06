import { useEffect, useMemo, useState } from 'react';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const result = await fetchProducts();
        setProducts(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }, [products, search]);

  async function addProduct(product) {
    setLoading(true);
    try {
      const created = await createProduct(product);
      setProducts((current) => [...current, created]);
      return created;
    } finally {
      setLoading(false);
    }
  }

  async function patchProduct(id, updates) {
    setLoading(true);
    try {
      const updated = await updateProduct(id, updates);
      setProducts((current) => current.map((product) => (product.id === id ? updated : product)));
      return updated;
    } finally {
      setLoading(false);
    }
  }

  async function removeProduct(id) {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } finally {
      setLoading(false);
    }
  }

  return {
    products: filteredProducts,
    rawProducts: products,
    loading,
    error,
    search,
    setSearch,
    addProduct,
    patchProduct,
    removeProduct
  };
}
