import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [team, setTeam] = useState('all');
  const [league, setLeague] = useState('all');
  const [brand, setBrand] = useState('all');
  const [jerseyType, setJerseyType] = useState('all');
  const [retroOnly, setRetroOnly] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, category, team, league, brand, jerseyType, retroOnly, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.league?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (team !== 'all') {
      filtered = filtered.filter(p => p.team === team);
    }

    if (league !== 'all') {
      filtered = filtered.filter(p => p.league === league);
    }

    if (brand !== 'all') {
      filtered = filtered.filter(p => p.brand === brand);
    }

    if (jerseyType !== 'all') {
      filtered = filtered.filter(p => p.jerseyType === jerseyType);
    }

    if (retroOnly) {
      filtered = filtered.filter(p => p.isRetro);
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  const teams = ['all', ...new Set(products.map(p => p.team).filter(Boolean))];
  const leagues = ['all', ...new Set(products.map(p => p.league).filter(Boolean))];
  const brands = ['all', ...new Set(products.map(p => p.brand).filter(Boolean))];
  const jerseyTypes = ['all', ...new Set(products.map(p => p.jerseyType).filter(Boolean))];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <div className="filters-container">
        <div className="filters-row">
          <div className="form-group">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Team</label>
            <select
              className="form-select"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              {teams.map(val => (
                <option key={val} value={val}>
                  {val === 'all' ? 'All Teams' : val}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">League</label>
            <select
              className="form-select"
              value={league}
              onChange={(e) => setLeague(e.target.value)}
            >
              {leagues.map(val => (
                <option key={val} value={val}>
                  {val === 'all' ? 'All Leagues' : val}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Brand</label>
            <select
              className="form-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map(val => (
                <option key={val} value={val}>
                  {val === 'all' ? 'All Brands' : val}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Jersey Type</label>
            <select
              className="form-select"
              value={jerseyType}
              onChange={(e) => setJerseyType(e.target.value)}
            >
              {jerseyTypes.map(val => (
                <option key={val} value={val}>
                  {val === 'all' ? 'All Types' : val}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price Range</label>
            <select
              className="form-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200">$200+</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'end' }}>
            <label className="form-label" style={{ marginBottom: 0 }}>
              <input
                type="checkbox"
                checked={retroOnly}
                onChange={(e) => setRetroOnly(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Retro Only
            </label>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(p => (
            <div className="card" key={p._id}>
              <img
                src={p.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(p.name)}`}
                alt={p.name}
                className="card-img"
              />
              <div className="card-body">
                <h3 className="card-title">{p.name}</h3>
                {(p.team || p.league || p.brand || p.jerseyType) && (
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '6px' }}>
                    {[p.team, p.league, p.brand, p.jerseyType].filter(Boolean).join(' • ')}
                  </div>
                )}
                <p className="card-text">{p.description?.substring(0, 80)}{p.description?.length > 80 ? '...' : ''}</p>
                <div className="card-price">${p.price.toFixed(2)}</div>
                <div className="flex gap-2">
                  <Link to={`/product/${p._id}`} className="btn btn-outline btn-sm" style={{flex: 1}}>
                    View Details
                  </Link>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{flex: 1}}
                    onClick={() => handleAddToCart(p)}
                    disabled={p.countInStock === 0}
                  >
                    {p.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
