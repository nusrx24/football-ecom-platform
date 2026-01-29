import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const getItemKey = (item) => {
  const size = item.selectedSize || '';
  const name = item.customName || '';
  const number = item.customNumber || '';
  return `${item._id}|${size}|${name}|${number}`;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const incomingKey = getItemKey(action.payload);
      const existing = state.items.find(item => item.itemKey === incomingKey);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.itemKey === incomingKey
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, itemKey: incomingKey, quantity: action.payload.quantity || 1 }]
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.itemKey !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.itemKey === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      const normalized = parsed.map(item => ({
        ...item,
        itemKey: item.itemKey || getItemKey(item)
      }));
      dispatch({ type: 'LOAD_CART', payload: normalized });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeFromCart = (itemKey) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemKey });
  };

  const updateQuantity = (itemKey, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemKey, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
