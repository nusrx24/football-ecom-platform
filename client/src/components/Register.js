import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');

    // Validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-3">Create Account</h2>
          <p className="text-center" style={{ color: '#666', marginBottom: '30px' }}>
            Join us to start shopping
          </p>

          {error && (
            <div className="alert alert-error mb-2">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-2">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                value={form.password}
                onChange={onChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '10px' }}
              disabled={loading || success}
            >
              {loading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p style={{ color: '#666' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
