"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the context
const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {

    let isUserLoggedIn = localStorage.getItem('auth') ? true : false;
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);

    const router = useRouter();
    //   const [user, setUser] = useState(null);
    //   const [loading, setLoading] = useState(true);

    //   useEffect(() => {
    //     // Fetch the user on mount, e.g., from an API or localStorage
    //     const fetchUser = async () => {
    //       try {
    //         const storedUser = JSON.parse(localStorage.getItem('user'));
    //         setUser(storedUser);
    //       } catch (error) {
    //         console.error('Error fetching user:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchUser();
    //   }, []);

    //   const login = (userData) => {
    //     setUser(userData);
    //     localStorage.setItem('user', JSON.stringify(userData));
    //   };

    //   const logout = () => {
    //     setUser(null);
    //     localStorage.removeItem('user');
    //   };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [isLoggedIn, router]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {isLoggedIn ? children : null}
        </AuthContext.Provider>
    );
};

// Hook to use the context
export const useAuth = () => {
    return useContext(AuthContext);
};
