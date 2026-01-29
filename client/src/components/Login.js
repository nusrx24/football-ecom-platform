import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-3">Welcome Back</h2>
          <p className="text-center" style={{ color: '#666', marginBottom: '30px' }}>
            Sign in to your account
          </p>

          {error && (
            <div className="alert alert-error mb-2">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={onChange}
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '10px' }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p style={{ color: '#666' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
