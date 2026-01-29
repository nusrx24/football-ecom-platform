import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      processing: '#0066cc',
      shipped: '#0099ff',
      delivered: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#666';
  };

  if (!user) {
    return (
      <div className="container">
        <div className="alert alert-info">
          <p>Please log in to view your orders.</p>
          <button className="btn btn-primary mt-2" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 className="mb-3">My Orders</h1>

      {orders.length === 0 ? (
        <div className="card p-3 text-center">
          <h3>No Orders Yet</h3>
          <p>Start shopping to see your orders here!</p>
          <button className="btn btn-primary" onClick={() => navigate('/')} style={{ maxWidth: '200px', margin: '20px auto' }}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="card mb-3">
              <div className="card-body">
                <div className="flex-between mb-2">
                  <div>
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backgroundColor: getStatusColor(order.status) + '20',
                      color: getStatusColor(order.status),
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      textTransform: 'capitalize'
                    }}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '15px' }}>
                  <h4 className="mb-2">Items:</h4>
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex-between mb-1" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <div className="flex gap-2" style={{ alignItems: 'center' }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: '600' }}>{item.name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontWeight: '600' }}>
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                  <div>
                    <h4 className="mb-1">Shipping Address:</h4>
                    <p style={{ color: '#666', lineHeight: '1.6' }}>
                      {order.shippingAddress.fullName}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h4 className="mb-1">Order Summary:</h4>
                    <div style={{ color: '#666' }}>
                      <div>Items: ${order.itemsPrice.toFixed(2)}</div>
                      <div>Tax: ${order.taxPrice.toFixed(2)}</div>
                      <div>Shipping: ${order.shippingPrice.toFixed(2)}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--dark-color)', marginTop: '10px' }}>
                        Total: ${order.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
