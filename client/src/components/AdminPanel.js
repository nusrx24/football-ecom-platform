import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
      const payload = { ...form, price: parseFloat(form.price) };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload, { headers });
        setMessage('Product updated');
        setEditingId(null);
      } else {
        await api.post('/products', payload, { headers });
        setMessage('Product created');
      }
      setForm({ name: '', price: '', description: '' });
      await fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  const onEdit = p => {
    setEditingId(p._id);
    setForm({ name: p.name || '', price: p.price?.toString() || '', description: p.description || '' });
    setMessage('Editing product');
  };

  const onDelete = async id => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`, { headers });
      setMessage('Product deleted');
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={onChange} required />
        </div>
        <div>
          <label>Price</label>
          <input name="price" value={form.price} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={onChange} />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', description: '' }); }}>Cancel</button>}
      </form>
      {message && <p>{message}</p>}

      <h3 style={{ marginTop: 20 }}>Products</h3>
      <div>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <strong>{p.name}</strong> — ${p.price}
            <div>
              <button onClick={() => onEdit(p)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => onDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
