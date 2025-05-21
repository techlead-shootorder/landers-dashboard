'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage only on the client side
  useEffect(() => {
    // Check if code is running on the client side
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
        setIsLoggedIn(true);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
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