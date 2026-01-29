import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order status updated');
      fetchOrders();
    } catch (error) {
      alert('Error updating status');
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

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 className="mb-3">Orders Management</h1>

      {orders.length === 0 ? (
        <div className="card p-3 text-center">
          <h3>No Orders Yet</h3>
          <p>Orders will appear here when customers make purchases.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                    </td>
                    <td>
                      <div>{order.user?.name || 'N/A'}</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        {order.user?.email || ''}
                      </div>
                    </td>
                    <td>{order.orderItems.length} item(s)</td>
                    <td>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="form-select"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          backgroundColor: getStatusColor(order.status) + '20',
                          color: getStatusColor(order.status),
                          fontWeight: '600',
                          border: 'none'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          alert(JSON.stringify(order, null, 2));
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
