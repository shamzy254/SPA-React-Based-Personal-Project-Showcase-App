import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { useProducts } from '../hooks/useProducts';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patchProduct, removeProduct } = useProducts();
  const [product, setProduct] = useState(null);
  const [updates, setUpdates] = useState({ price: '', stock: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchProductById(id);
        setProduct(result);
        setUpdates({ price: result.price.toString(), stock: result.stock.toString() });
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdates((current) => ({ ...current, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    try {
      const updated = await patchProduct(product.id, {
        price: parseFloat(updates.price) || product.price,
        stock: parseInt(updates.stock, 10) || product.stock
      });
      setProduct(updated);
      setStatus('Product updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to update product.');
    }
  };

  const handleDelete = async () => {
    try {
      await removeProduct(product.id);
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Unable to delete product.');
    }
  };

  if (error) {
    return (
      <section className="panel">
        <h1 className="section-title">Product Details</h1>
        <p className="product-copy">{error}</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="panel">
        <h1 className="section-title">Loading product...</h1>
      </section>
    );
  }

  return (
    <section className="panel">
      <h1 className="section-title">Manage {product.name}</h1>
      <div className="message-card">
        <p className="card-copy">Use this page to adjust pricing, stock, or delete the product from the catalogue. Updates are sent to the simulated backend.</p>
      </div>

      <div className="product-detail">
        <div className="card">
          <h2 className="card-title">Current Details</h2>
          <p className="card-copy">{product.description}</p>
          <div className="product-meta">
            <span className="badge">Category: {product.category}</span>
            <span>Price: ${product.price.toFixed(2)}</span>
            <span>Stock: {product.stock}</span>
          </div>
        </div>

        <form className="card" onSubmit={handleUpdate}>
          <h2 className="card-title">Update Product</h2>
          <div className="form-row">
            <label>
              Price
              <input type="number" name="price" value={updates.price} step="0.01" onChange={handleChange} />
            </label>
            <label>
              Stock
              <input type="number" name="stock" value={updates.stock} onChange={handleChange} />
            </label>
          </div>
          <button type="submit" className="primary">Save changes</button>
          <button type="button" className="danger" onClick={handleDelete} style={{ marginLeft: '1rem' }}>
            Delete product
          </button>
          {status && <p className="notification">{status}</p>}
          {error && <p className="notification" style={{ color: '#fda4af' }}>{error}</p>}
        </form>
      </div>
    </section>
  );
}
