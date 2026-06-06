import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const { products, loading, error, search, setSearch } = useProducts();
  const navigate = useNavigate();

  return (
    <section className="panel">
      <header>
        <h1 className="section-title">Product Catalogue</h1>
        <p className="section-copy">
          Search and browse all products. Click an item to open its detail page, update stock, or modify pricing for the store.
        </p>
      </header>

      <SearchBar value={search} onChange={(value) => setSearch(value)} />

      {loading && <p className="card-copy">Loading products...</p>}
      {error && <p className="card-copy">{error}</p>}
      {!loading && !products.length && <p className="card-copy">No products match your search.</p>}

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div>
              <div className="badge">{product.category}</div>
              <h3>{product.name}</h3>
              <p className="product-copy">{product.description}</p>
            </div>
            <div className="product-meta">
              <span>${product.price.toFixed(2)}</span>
              <span>{product.stock} in stock</span>
            </div>
            <button type="button" className="secondary" onClick={() => navigate(`/products/${product.id}`)}>
              Manage
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
