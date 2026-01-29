import React from 'react';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'white' }}>
            Welcome to Football Store
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
            Discover the best football equipment, jerseys, and accessories for players and fans
          </p>
        </div>
      </div>
      
      <div className="container">
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Browse Our Products</h2>
        <ProductList />
      </div>
    </div>
  );
}
