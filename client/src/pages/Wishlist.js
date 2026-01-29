import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="card p-3 text-center">
          <h2>Your Wishlist is Empty</h2>
          <p>Save products you love to buy them later!</p>
          <Link to="/" className="btn btn-primary" style={{ maxWidth: '200px', margin: '20px auto' }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 className="mb-3">My Wishlist ({wishlist.length})</h1>

      <div className="product-grid">
        {wishlist.map(product => (
          <div className="card" key={product._id}>
            <img
              src={product.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="card-img"
            />
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-text">
                {product.description?.substring(0, 80)}{product.description?.length > 80 ? '...' : ''}
              </p>
              <div className="card-price">${product.price.toFixed(2)}</div>
              
              <div className="flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  ✕
                </button>
              </div>
              
              <Link
                to={`/product/${product._id}`}
                className="btn btn-outline btn-sm"
                style={{ width: '100%', marginTop: '10px' }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
