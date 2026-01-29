import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '30px' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="mb-3">My Profile</h2>
          
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              value={user.name}
              disabled
              style={{ backgroundColor: 'var(--light-color)' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={user.email}
              disabled
              style={{ backgroundColor: 'var(--light-color)' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Type</label>
            <input
              className="form-input"
              type="text"
              value={user.role === 'admin' ? 'Administrator' : 'Customer'}
              disabled
              style={{ backgroundColor: 'var(--light-color)' }}
            />
          </div>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h3 className="mb-3">Order History</h3>
          <p style={{ color: '#666', textAlign: 'center', padding: '40px 0' }}>
            No orders yet. Start shopping to see your order history here!
          </p>
        </div>
      </div>
    </div>
  );
}
