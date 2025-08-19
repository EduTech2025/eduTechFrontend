'use client'; // needed for App Router

import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, logout as doLogout } from './LocalStorage';
import auth from '@/lib/auth_api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [id, setId] = useState('');
  const [uuid, setUUID] = useState('');
  const [role, setRole] = useState('');

  const fetchUser = async () => {
    const token = getToken();
    

    try {
      if(token!=null){
      const resp = await auth.get_user(token);
      setEmail(resp.data.email);
      setId(resp.data.id);
      setUUID(resp.data.uuid);
      setRole(resp.data?.is_superuser!=false?'admin':'user');
      setIsAuthenticated(true);
    }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setIsAuthenticated(false);
    } 
  };

  const logout = () => {
    doLogout(); // removes token + redirects (you can customize this)
    setEmail('');
    setId('');
    setUUID('');
    setRole('');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      email,
      id,
      role,
        uuid,
      isAuthenticated,
      logout,
      setId,
      setEmail,
      setIsAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
