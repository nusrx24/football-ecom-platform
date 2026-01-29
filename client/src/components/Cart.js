import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="card p-3 text-center">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="btn btn-primary" style={{maxWidth: '200px', margin: '20px auto'}}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-3">Shopping Cart</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px', alignItems: 'start'}}>
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.itemKey || item._id}>
                  <td>
                    <div className="flex gap-2" style={{alignItems: 'center'}}>
                      <img
                        src={item.image || `https://via.placeholder.com/60x60?text=${encodeURIComponent(item.name)}`}
                        alt={item.name}
                        className="cart-item-img"
                      />
                      <div>
                        <strong>{item.name}</strong>
                        {item.category && <div style={{fontSize: '0.875rem', color: '#666'}}>{item.category}</div>}
                        {item.selectedSize && (
                          <div style={{fontSize: '0.875rem', color: '#666'}}>Size: {item.selectedSize}</div>
                        )}
                        {(item.customName || item.customNumber) && (
                          <div style={{fontSize: '0.875rem', color: '#666'}}>
                            Custom: {item.customName || '—'} #{item.customNumber || '—'}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          updateQuantity(item.itemKey, val);
                        }}
                        min="1"
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (window.confirm(`Remove ${item.name} from cart?`)) {
                          removeFromCart(item.itemKey);
                        }
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Clear entire cart?')) {
                  clearCart();
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="card" style={{position: 'sticky', top: '100px'}}>
          <div className="card-body">
            <h3 className="mb-2">Order Summary</h3>
            
            <div className="flex-between mb-1">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex-between mb-1">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="flex-between mb-2">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>

            {subtotal < 100 && subtotal > 0 && (
              <div className="alert alert-info mb-2" style={{padding: '10px', fontSize: '0.875rem'}}>
                Add ${(100 - subtotal).toFixed(2)} more for free shipping!
              </div>
            )}
            
            <div className="flex-between mb-3" style={{paddingTop: '15px', borderTop: '2px solid var(--border-color)', fontSize: '1.25rem', fontWeight: '700'}}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button
              className="btn btn-primary"
              style={{width: '100%', marginBottom: '10px'}}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            
            <Link
              to="/"
              className="btn btn-outline"
              style={{width: '100%', display: 'block'}}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
