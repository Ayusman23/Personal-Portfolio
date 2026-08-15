import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, getAdminMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await getAdminMe();
          if (res.data.success) {
            setAdminUser(res.data.data);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Session expired or invalid token');
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    const res = await loginAdmin({ username, password });
    if (res.data.success) {
      const { token: userToken, ...userData } = res.data.data;
      localStorage.setItem('portfolio_token', userToken);
      setToken(userToken);
      setAdminUser(userData);
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setToken(null);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated: !!token && !!adminUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
