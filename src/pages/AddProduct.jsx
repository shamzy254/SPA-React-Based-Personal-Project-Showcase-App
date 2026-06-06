import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const initialForm = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: ''
};

export default function AddProduct() {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0
    };

    try {
      await addProduct(newProduct);
      setStatus('Product added successfully. Redirecting to products...');
      setTimeout(() => navigate('/products'), 1000);
    } catch (err) {
      setError(err.message || 'Unable to add product.');
    }
  };

  return (
    <section className="panel">
      <h1 className="section-title">Add New Product</h1>
      <p className="section-copy">
        Use the form below to add new product details to the catalogue. Changes are saved to the simulated backend and will show immediately on the Products page.
      </p>
      <form onSubmit={handleSubmit} className="product-detail">
        <div className="form-group">
          <label>
            Product Name
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Category
            <input name="category" value={formData.category} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-row">
          <label>
            Price (USD)
            <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
          </label>
          <label>
            Stock Quantity
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          </label>
        </div>

        <label className="form-group">
          Description
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="primary" style={{ width: 'fit-content' }}>
          Add Product
        </button>
        {status && <p className="notification">{status}</p>}
        {error && <p className="notification" style={{ color: '#fda4af' }}>{error}</p>}
      </form>
    </section>
  );
}
