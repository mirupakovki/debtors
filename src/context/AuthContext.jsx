// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '../constants/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Проверяем сохраненную сессию
    const savedAuth = localStorage.getItem('tradesmanAuth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (new Date().getTime() < authData.expires) {
          setUser(authData.user);
          setToken(authData.token);
        } else {
          localStorage.removeItem('tradesmanAuth');
        }
      } catch (error) {
        localStorage.removeItem('tradesmanAuth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (phone) => {
    try {
      console.log('🔐 Попытка входа с номером:', phone);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `phone=${encodeURIComponent(phone)}`
      });
      
      const data = await response.json();
      console.log('📥 Ответ от сервера:', data);
      
      if (data.success) {
        const authData = {
          user: data.user,
          token: data.token,
          expires: new Date().getTime() + (24 * 60 * 60 * 1000)
        };
        
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('tradesmanAuth', JSON.stringify(authData));
        
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('❌ Ошибка входа:', error);
      return { success: false, message: 'Ошибка сети: ' + error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tradesmanAuth');
    localStorage.removeItem('debtsState');
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};