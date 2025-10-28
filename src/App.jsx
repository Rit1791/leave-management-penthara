// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/DashboardPage';
import AdminDashboard from './Pages/AdminDashboard';

/**
 * App - top-level router + shell
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/admin" element={<AdminDashboard />} />
        {/* fallback to / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
