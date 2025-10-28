// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/PT.jpeg" 

/**
 * LoginPage - mocked login
 */
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    // simple mocked auth: store username and go to dashboard
    localStorage.setItem('user', username || 'User');
    navigate('/dashboard');
  };

   const handleAdminLogin = () => {
    if(!username){
        alert("Enter Username")
    }else{
    localStorage.setItem("admin", "true");
    navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6">
        <div>
          <div className='flex justify-center mb-6'>
            <img src={Logo} className='w-24 h-24 rounded-3xl shadow-lg border-2 border-white/30 hover:scale-105 transition-all duration-300' />
          </div>
          
            <h1 className="text-3xl font-bold text-white text-center mb-6">
          Leave Management System
            </h1>
            <p className="text-center text-gray-200 mb-8 text-sm">
          Please login to continue
        </p>

      <form onSubmit={handleUserLogin} className="space-y-4 p-6 border border-white/20 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-blue-400/40 transi duration-300 hover:scale-105 rounded-2xl">
        <div >

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-300 text-center mb-6 drop-shadow-md p-2">Login</h1>


        <label className="block mb-2">
          <span className=" block text-sm text-gray-100 mb-1">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full border rounded-lg bg-white/20 placeholder-gray-300 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter username"
            required
          />
        </label>
        </div>
         
         <div>

        <label className="block mb-4">
          <span className="text-sm text-gray-100 mb-1">Password</span>
          <input
            type="password"
            className="mt-1 w-full border rounded-lg bg-white/20 placeholder-gray-300 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="password "
            required
          />
        </label> 
         </div>


        <button type="submit" className="w-full py-2 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-semibold transition duration-200 cursor-pointer
        ">
          Login
        </button>
        <button type="button" onClick={handleAdminLogin} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg w-full font-semibold transition duration-200 cursor-pointer">
          Admin Login
        </button>
      </form>
    </div>
    </div>
  );
}
