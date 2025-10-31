import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/DashboardPage';
import AdminDashboard from './Pages/AdminDashboard';
import {Toaster} from "react-hot-toast"

/**
 * App - top-level router + shell
 */
function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/admin" element={<AdminDashboard />} />
        {/* fallback to / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
