import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      backgroundColor: '#1a1a1a',
      padding: '15px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          ⚙️ Admin Dashboard
        </Link>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                Products
              </Link>
              <Link to="/orders" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                Orders
              </Link>
              <span style={{ color: 'white', marginLeft: '10px' }}>
                {user.name} (Admin)
              </span>
              <button
                onClick={logout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
