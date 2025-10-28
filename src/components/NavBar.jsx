// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Navbar - top navigation bar
 */
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };


  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-white">
        Leave Management System by 
        <span className='text-pink-400'> Ritesh</span> 
        </h1>

     


      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
      >
        Logout
      </button>
      
    </nav>
  );
}
