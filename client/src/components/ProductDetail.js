import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchProductAndRelated();
  }, [id]);

  const fetchProductAndRelated = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setSelectedSize(res.data.sizes?.[0] || '');
      setCustomName('');
      setCustomNumber('');

      // Fetch related products (same category)
      const allProducts = await api.get('/products');
      const related = allProducts.data
        .filter(p => p._id !== id && p.category === res.data.category)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        selectedSize,
        customName: product.allowNameNumber ? customName : '',
        customNumber: product.allowNameNumber ? customNumber : ''
      }, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        ...product,
        selectedSize,
        customName: product.allowNameNumber ? customName : '',
        customNumber: product.allowNameNumber ? customNumber : ''
      }, quantity);
      navigate('/cart');
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to leave a review');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.post(`/products/${id}/reviews`, reviewForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewForm({ rating: 5, comment: '' });
      fetchProductAndRelated();
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting review');
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!product) {
    return (
      <div className="container">
        <div className="alert alert-error">
          <h3>Product Not Found</h3>
          <Link to="/" className="btn btn-primary mt-2">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline mb-3"
        style={{ marginTop: '20px' }}
      >
        ← Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '50px' }}>
        <div>
          <img
            src={product.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
          />
        </div>

        <div>
          <h1 style={{ marginBottom: '10px' }}>{product.name}</h1>
          
          <div className="flex-between" style={{ marginBottom: '20px' }}>
            <div>
              {product.rating > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < Math.round(product.rating) ? '#ffc107' : '#ddd', fontSize: '1.5rem' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ color: '#666' }}>
                    {product.rating.toFixed(1)} ({product.numReviews} reviews)
                  </span>
                </div>
              )}
              {product.category && (
                <div style={{ color: '#666', marginTop: '10px' }}>
                  Category: <span style={{ fontWeight: '600' }}>{product.category}</span>
                </div>
              )}
              {(product.team || product.league || product.brand || product.season || product.jerseyType || product.isRetro) && (
                <div style={{ color: '#666', marginTop: '10px', display: 'grid', gap: '6px' }}>
                  {product.team && <div>Team: <span style={{ fontWeight: '600' }}>{product.team}</span></div>}
                  {product.league && <div>League: <span style={{ fontWeight: '600' }}>{product.league}</span></div>}
                  {product.brand && <div>Brand: <span style={{ fontWeight: '600' }}>{product.brand}</span></div>}
                  {product.season && <div>Season: <span style={{ fontWeight: '600' }}>{product.season}</span></div>}
                  {product.jerseyType && <div>Jersey Type: <span style={{ fontWeight: '600' }}>{product.jerseyType}</span></div>}
                  {product.isRetro && <div>Edition: <span style={{ fontWeight: '600' }}>Retro</span></div>}
                </div>
              )}
            </div>
            <button
              className={`btn ${isInWishlist(product._id) ? 'btn-danger' : 'btn-outline'}`}
              onClick={handleWishlist}
              style={{ padding: '10px 20px' }}
            >
              {isInWishlist(product._id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          <div className="card-price" style={{ fontSize: '2rem', marginBottom: '20px' }}>
            ${product.price.toFixed(2)}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px' }}>Description</h3>
            <p style={{ lineHeight: '1.8', color: '#666' }}>
              {product.description || 'No description available.'}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '10px', fontWeight: '600' }}>
              Availability: {' '}
              <span style={{ color: product.countInStock > 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
                {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {product.countInStock > 0 && (
            <>
              {product.sizes?.length > 0 && (
                <div className="form-group">
                  <label className="form-label">Size</label>
                  <select
                    className="form-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}

              {product.allowNameNumber && (
                <div className="card mb-3" style={{ padding: '15px', backgroundColor: 'var(--light-color)' }}>
                  <h4 style={{ marginBottom: '10px' }}>Name & Number Customization</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Player Name</label>
                      <input
                        className="form-input"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g., SAKA"
                        maxLength={20}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Number</label>
                      <input
                        className="form-input"
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                        placeholder="7"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Quantity</label>
                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, Math.min(product.countInStock, val)));
                    }}
                    min="1"
                    max={product.countInStock}
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2" style={{ marginTop: '30px' }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="flex-between mb-3">
            <h2>Customer Reviews ({product.numReviews})</h2>
            {user && !showReviewForm && (
              <button className="btn btn-primary" onClick={() => setShowReviewForm(true)}>
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="card mb-3" style={{ padding: '20px', backgroundColor: 'var(--light-color)' }}>
              <h3 className="mb-2">Write Your Review</h3>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience with this product"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">Submit Review</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, idx) => (
              <div key={idx} style={{ padding: '20px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div className="flex-between mb-1">
                  <strong>{review.name}</strong>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < review.rating ? '#ffc107' : '#ddd', fontSize: '1.2rem' }}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ color: '#666', fontSize: '0.875rem', marginBottom: '10px' }}>
                  {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p style={{ lineHeight: '1.6', color: '#333' }}>{review.comment}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '40px 0' }}>
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-3">Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <div className="card" key={p._id}>
                <img
                  src={p.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(p.name)}`}
                  alt={p.name}
                  className="card-img"
                />
                <div className="card-body">
                  <h3 className="card-title">{p.name}</h3>
                  <div className="card-price">${p.price.toFixed(2)}</div>
                  <Link to={`/product/${p._id}`} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
