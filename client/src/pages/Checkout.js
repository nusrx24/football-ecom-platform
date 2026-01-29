import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });
  const [processing, setProcessing] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    setProcessing(true);
    
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        orderItems: cart.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          selectedSize: item.selectedSize,
          customName: item.customName,
          customNumber: item.customNumber
        })),
        shippingAddress: {
          fullName: form.fullName,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          phone: form.phone
        },
        paymentMethod: 'Card',
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total
      };

      await api.post('/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="card p-3 text-center">
          <h2>Your Cart is Empty</h2>
          <p>Add some products before checking out.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')} style={{ maxWidth: '200px', margin: '20px auto' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 className="mb-3">Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <form onSubmit={handleSubmit}>
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="mb-3">Shipping Information</h3>
              
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  className="form-input"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address *</label>
                <input
                  className="form-input"
                  type="text"
                  name="address"
                  placeholder="Street address"
                  value={form.address}
                  onChange={onChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h3 className="mb-3">Payment Information</h3>
              
              <div className="form-group">
                <label className="form-label">Card Number *</label>
                <input
                  className="form-input"
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={onChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label className="form-label">Expiry Date *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CVV *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="cardCVV"
                    placeholder="123"
                    maxLength="4"
                    value={form.cardCVV}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
            disabled={processing}
          >
            {processing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
          </button>
        </form>

        <div>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <div className="card-body">
              <h3 className="mb-3">Order Summary</h3>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item._id} className="flex-between mb-2" style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{item.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: '600' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-between mb-1">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex-between mb-1">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex-between mb-3">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="flex-between" style={{ paddingTop: '15px', borderTop: '2px solid var(--border-color)', fontSize: '1.25rem', fontWeight: '700' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
