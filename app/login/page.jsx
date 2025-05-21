// app/login/page.jsx
"use client"
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

// AuthForm component that can toggle between Login and Signup modes
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { isLoggedIn, setIsLoggedIn, loading, setAuth } = useAuth();

  const router = useRouter();

  const toggleView = () => {
    setIsLogin(!isLogin);
    // Reset form fields when switching views
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("passowrd", password);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("data", data);

      if (!response.ok) {
        console.error('Login failed:', data.error);
        alert(data.error);
        return;
      }

      // Combine user and token into one object
      const authData = data.loginData;

      const userData = {...authData, email}
      
      // Make sure we only access localStorage on the client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify(userData));
      }
      
      setAuth(userData);
      setIsLoggedIn(true);
      router.push('/');
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Blue gradient background with logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-red-300 to-red-500 justify-center items-center">
        <div className="text-center">
          <div className="text-6xl font-bold mb-2 text-white flex items-center justify-center">
            L<span className="bg-white text-red-500 rounded-full w-12 h-12 flex items-center justify-center">@</span>nders
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center text-red-500">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Name field (only for signup) */}
            {!isLogin && (
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full py-3 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-3 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password field */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-3 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Login/Signup button */}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium transition duration-300 cursor-pointer"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          {/* Google login option */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Or {isLogin ? 'Sign In' : 'Sign Up'} Using Google
            </p>
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center mx-auto w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
            </button>
          </div>

          {/* Toggle between login and signup */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleView}
                className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
            {isLogin && (
              <button
                type="button"
                className="hover:underline cursor-pointer text-blue-500 hover:text-blue-600 text-sm mt-2"
              >
                Forgot password?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}