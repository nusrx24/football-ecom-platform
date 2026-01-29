import React, { useState } from 'react';

export default function Cart() {
  const [items, setItems] = useState([]);

  // basic local-cart using localStorage
  React.useEffect(() => {
    const raw = localStorage.getItem('cart');
    if (raw) setItems(JSON.parse(raw));
  }, []);

  const clear = () => { setItems([]); localStorage.removeItem('cart'); };

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {items.map((it, idx) => (
            <div key={idx}>{it.name} x {it.qty || 1} - ${it.price}</div>
          ))}
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={clear}>Clear</button>
        </div>
      )}
    </div>
  );
}
