import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="logo">Admin Showcase</div>
        <div className="nav-links">
          <NavLink end to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            Products
          </NavLink>
          <NavLink to="/new-product" className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Product
          </NavLink>
        </div>
      </nav>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-product" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
