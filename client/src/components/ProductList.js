import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(p => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/product/${p._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
