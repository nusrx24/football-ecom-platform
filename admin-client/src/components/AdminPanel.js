import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function AdminPanel() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    team: '',
    league: '',
    brand: '',
    season: '',
    jerseyType: '',
    isRetro: false,
    sizes: '',
    allowNameNumber: false,
    countInStock: ''
  });
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // products, orders

  const headers = {};
  const token = localStorage.getItem('token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()) : [],
        countInStock: parseInt(form.countInStock) || 0
      };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload, { headers });
        setMessage('Product updated successfully');
        setEditingId(null);
      } else {
        await api.post('/products', payload, { headers });
        setMessage('Product created successfully');
      }
      setForm({ name: '', price: '', description: '', image: '', category: '', countInStock: '' });
      await fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  const onEdit = p => {
    setEditingId(p._id);
    setForm({
      name: p.name || '',
      price: p.price?.toString() || '',
      description: p.description || '',
      image: p.image || '',
      category: p.category || '',
      team: p.team || '',
      league: p.league || '',
      brand: p.brand || '',
      season: p.season || '',
      jerseyType: p.jerseyType || '',
      isRetro: p.isRetro || false,
      sizes: p.sizes?.join(', ') || '',
      allowNameNumber: p.allowNameNumber || false,
      countInStock: p.countInStock?.toString() || ''
    });
    setMessage('Editing product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`, { headers });
      setMessage('Product deleted successfully');
      await fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', price: '', description: '', image: '', category: '', countInStock: '' });
    setMessage('');
  };

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 className="mb-3">Admin Dashboard</h1>

      <div className="flex gap-2 mb-3">
        <button
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('products')}
        >
          Products Management
        </button>
        <Link to="/orders" className="btn btn-outline">
          Orders Management
        </Link>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="mb-3">{editingId ? 'Edit Product' : 'Create New Product'}</h3>
              
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'} mb-2`}>
                  {message}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label className="form-label">Price * ($)</label>
                    <input
                      className="form-input"
                      name="price"
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={onChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock Quantity *</label>
                    <input
                      className="form-input"
                      name="countInStock"
                      type="number"
                      value={form.countInStock}
                      onChange={onChange}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    className="form-input"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="e.g., Jerseys, Shoes, Equipment"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label className="form-label">Team</label>
                    <input
                      className="form-input"
                      name="team"
                      value={form.team}
                      onChange={onChange}
                      placeholder="e.g., Arsenal, Barcelona"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">League</label>
                    <input
                      className="form-input"
                      name="league"
                      value={form.league}
                      onChange={onChange}
                      placeholder="e.g., Premier League, La Liga"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label className="form-label">Brand</label>
                    <input
                      className="form-input"
                      name="brand"
                      value={form.brand}
                      onChange={onChange}
                      placeholder="e.g., Nike, Adidas"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Season</label>
                    <input
                      className="form-input"
                      name="season"
                      value={form.season}
                      onChange={onChange}
                      placeholder="e.g., 2023-24, 1989-90"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label className="form-label">Jersey Type</label>
                    <input
                      className="form-input"
                      name="jerseyType"
                      value={form.jerseyType}
                      onChange={onChange}
                      placeholder="e.g., Home, Away, Third"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Available Sizes (comma-separated)</label>
                    <input
                      className="form-input"
                      name="sizes"
                      value={form.sizes}
                      onChange={onChange}
                      placeholder="e.g., XS, S, M, L, XL, XXL"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', alignItems: 'center' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    <input
                      type="checkbox"
                      name="isRetro"
                      checked={form.isRetro}
                      onChange={(e) => setForm({ ...form, isRetro: e.target.checked })}
                      style={{ marginRight: '8px' }}
                    />
                    Retro Edition
                  </label>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    <input
                      type="checkbox"
                      name="allowNameNumber"
                      checked={form.allowNameNumber}
                      onChange={(e) => setForm({ ...form, allowNameNumber: e.target.checked })}
                      style={{ marginRight: '8px' }}
                    />
                    Allow Name & Number
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    className="form-input"
                    name="image"
                    type="url"
                    value={form.image}
                    onChange={onChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        marginTop: '10px',
                        borderRadius: '8px'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={onChange}
                    placeholder="Enter product description"
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Product' : 'Create Product'}
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="mb-3">All Products ({products.length})</h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td>
                          <img
                            src={p.image || 'https://via.placeholder.com/60'}
                            alt={p.name}
                            className="cart-item-img"
                          />
                        </td>
                        <td>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            {[p.team, p.league, p.brand, p.jerseyType].filter(Boolean).join(' • ') && (
                              <div>{[p.team, p.league, p.brand, p.jerseyType].filter(Boolean).join(' • ')}</div>
                            )}
                            {p.description?.substring(0, 50)}{p.description?.length > 50 ? '...' : ''}
                          </div>
                        </td>
                        <td>${p.price.toFixed(2)}</td>
                        <td>{p.category || '-'}</td>
                        <td>
                          <span style={{
                            color: p.countInStock > 0 ? 'var(--success-color)' : 'var(--danger-color)'
                          }}>
                            {p.countInStock}
                          </span>
                        </td>
                        <td>
                          ⭐ {p.rating?.toFixed(1) || '0.0'} ({p.numReviews || 0})
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => onEdit(p)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => onDelete(p._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {products.length === 0 && (
                <p className="text-center" style={{ padding: '40px 0', color: '#666' }}>
                  No products yet. Create your first product above!
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
