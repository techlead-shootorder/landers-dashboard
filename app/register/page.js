'use client';
import { useState } from 'react';


export default function Register() {
  const [form, setForm] = useState({
    username: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log(form);
  };



  return (
    <div className="min-h-screen flex">
      {/* Left Side (Brand) */}
      <div className="w-1/2 bg-gradient-to-b from-red-300 to-red-500 flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold">
          <span className="text-white">L</span>
          <span className="text-white font-extrabold tracking-wide">@nders</span>
        </h1>
        {/* <p className="mt-2 text-black text-lg">Talk, Qualify & Sell with AI</p> */}
      </div>

      {/* Right Side (Form) */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-3xl font-bold mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="username"
              placeholder="User name"
              className="w-1/2 p-3 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-1/2 p-3 border rounded"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-1/2 p-3 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-1/2 p-3 border rounded"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-1/2 p-3 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-1/2 p-3 border rounded"
              onChange={handleChange}
              required
            />
          </div>

          <p className="text-sm text-gray-600">
            By creating an account, you agree to our{' '}
            <span className="text-blue-600 font-medium">Terms of use</span> and{' '}
            <span className="text-blue-600 font-medium">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white py-2 px-6 rounded mt-2"
          >
            Create an Account
          </button>
        </form>

        <div className="my-6 text-center">
          <p>Or Sign In Using Google</p>
          <button className="mt-2 border rounded-full p-3 cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
        </div>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
