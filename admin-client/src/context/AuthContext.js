import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Only allow admin users in admin panel
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      if (data.user.role !== 'admin') {
        return { success: false, error: 'Access denied. Admin privileges required.' };
      }
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
