import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  return (
    <div>
      <nav style={{ padding: 12, background: '#0b5', marginBottom: 12 }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/admin" style={{ marginRight: 12 }}>Admin</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}
