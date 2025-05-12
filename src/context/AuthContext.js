'use client'; // needed for App Router

import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, logout as doLogout } from './LocalStorage';
import auth from '@/lib/auth_api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  const fetchUser = async () => {
    const token = getToken();
    

    try {
      const resp = await auth.get_user(token);
      setEmail(resp.data.email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setIsAuthenticated(false);
    } 
  };

  const logout = () => {
    doLogout(); // removes token + redirects (you can customize this)
    setEmail('');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      email,
      isAuthenticated,
      logout,
      setEmail,
      setIsAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
