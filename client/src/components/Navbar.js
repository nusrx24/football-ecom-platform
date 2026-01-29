import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ⚽ Football Store
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          
          <li>
            <Link to="/wishlist" className="navbar-link cart-badge">
              ❤️ Wishlist
              {wishlist.length > 0 && <span className="cart-count">{wishlist.length}</span>}
            </Link>
          </li>

          <li>
            <Link to="/cart" className="navbar-link cart-badge">
              🛒 Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>

          {user ? (
            <li style={{ position: 'relative' }}>
              <button
                className="navbar-link"
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit' }}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user.name}
              </button>
              
              {showUserMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '10px',
                    background: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: '8px',
                    minWidth: '200px',
                    zIndex: 1000
                  }}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <Link
                    to="/profile"
                    className="navbar-link"
                    style={{
                      display: 'block',
                      padding: '12px 20px',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="navbar-link"
                    style={{
                      display: 'block',
                      padding: '12px 20px',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    className="navbar-link"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 20px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: 'inherit',
                      fontWeight: 'inherit'
                    }}
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
