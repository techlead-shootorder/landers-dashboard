'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const login = localStorage.getItem('auth');
  const [isLoggedIn, setIsLoggedIn] = useState(login ? true : false);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
      setIsLoggedIn(true)
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    setIsLoggedIn(false);
    router.push('/login');
  };


  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
