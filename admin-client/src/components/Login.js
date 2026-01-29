import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '60px' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-3">🔐 Admin Login</h2>
          
          {error && (
            <div className="alert alert-error mb-3">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login to Dashboard
            </button>
          </form>
          
          <div className="mt-3 text-center" style={{ fontSize: '0.9rem', color: '#666' }}>
            <p>⚠️ Admin access only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
