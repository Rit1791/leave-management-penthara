import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/PT.jpeg"
import toast from 'react-hot-toast';
import { motion } from "framer-motion"

// LoginPage.jsx — Handles user and admin login functionality using localStorage and toast notifications.

 function LoginPage() {
  const [username, setUsername] = useState('');   // creates state variable for username
  const [password, setPassword] = useState("")  // create state variable for password
  const navigate = useNavigate();  

  const handleUserLogin = (e) => {  // triggred when user clicked on login button
    e.preventDefault();    // prevents page from refreshing

 {/* 
      username.trim checks if the username input is empty
      username.trim() removes any spaces before or after the text
      !username.trim() means → “if username is blank.”
  */}

    if (!username.trim()||!password.trim()) {    
      toast.error("Please enter a username and password !");
      return;
    }

    localStorage.setItem('user', username || 'User');      // stores the username inside the browser’s local storage, under the key 'user'.
    toast.success(`Welcome, ${username || 'User'}!`);   // creates a toast notification for user success
    setTimeout(() => navigate('/dashboard'), 1000);      // takes user to dashboard 
  };

  const handleAdminLogin = () => {         // triggred when user clicked on Admin login button
    if (!username.trim() || !password.trim()) {    // check if either username or password is empty
      toast.error("Please enter a username and password !");
    } else {
      localStorage.setItem("admin", "true");   // stored as key value pairs in browser
      toast.success(`Admin Login Successfull`);
      setTimeout(()=>navigate("/admin"),1000)      // takes admin to admin dashboard after waiting 1 sec
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6">

      {/*Smooth animation using Framer Motion */}
      <motion.div 
      initial={{opacity:0,y:100}} // component starts fully invisible and starts fully invisible.
      whileInView={{opacity:1,y:0}} // component became visible and move to its natural position.
      transition={{duration:1.5}}  // how long animation takes
      viewport={{once:true}}   // Ensures the animation runs only once
      >
        <div className='flex justify-center mb-6'>
          <img src={Logo} className='w-24 h-24 rounded-3xl shadow-lg border-2 border-white/30 hover:scale-105 hover:shadow-blue-500/70 transition-all duration-300' />
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Leave Management System | Built by Ritesh
        </h1>
        <p className="text-center text-gray-200 mb-8 text-sm">
          Please login to continue
        </p>

        <form onSubmit={handleUserLogin} className="space-y-4 p-6 border border-white/20 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-blue-400/40 transition duration-300 hover:scale-102 rounded-2xl">
        {/*  Form triggers handleUserLogin when submitted*/}
          <div >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 text-center mb-6 drop-shadow-md p-2 ">Login</h1>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border rounded-lg bg-white/20 placeholder-gray-300 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password "
                required
              />
            </label>
          </div>


          <button type="submit" className="w-full py-2 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-semibold transition duration-200 cursor-pointer">
            Login
          </button>
          <button type="button" onClick={handleAdminLogin} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg w-full font-semibold transition duration-200 cursor-pointer">
            Admin Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage