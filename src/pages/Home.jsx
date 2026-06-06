import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="panel">
      <header>
        <h1 className="section-title">E-Commerce Admin Portal</h1>
        <p className="section-copy">
          Manage your product catalogue from a responsive administration app. Add new inventory, search existing products, and update prices or details in real time using a simulated backend.
        </p>
      </header>

      <div className="grid-2">
        <div className="card">
          <h2 className="card-title">What you can do</h2>
          <p className="card-copy">
            Add products with images, edit price and stock values, search dynamically, and access product details through client-side routing. The app is built using React hooks, React Router, and a mock REST API.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">Ready to start?</h2>
          <p className="card-copy">
            Navigate to the Products page to browse inventory or open the Add Product form to add a new item to the catalogue.
          </p>
          <Link to="/products" className="primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}
