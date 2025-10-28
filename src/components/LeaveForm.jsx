// src/components/LeaveForm.jsx
import React, { useState } from 'react';

/**
 * LeaveForm - form to apply for leave
 * @param {Function} onSubmit - function passed from parent to handle submission
 */
export default function LeaveForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Submits the leave form data to parent
   * @param {Object} formData - The leave form data
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.reason) return;

    const userName = localStorage.getItem("user") || "Unknown User";
    
    // Pass data up to parent (Dashboard)
    onSubmit({
      ...formData,
      employeeName:userName,
      status: 'Pending',
      id: Date.now()
    });

    // Reset form
    setFormData({ from: '', to: '', reason: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="my-8 p-6 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl text-white space-y-6  transition-all duration-300 hover:shadow-blue-400/40 w-full max-w-lg mx-auto hover:scale-102 ">
      
      <h3 className="text-lg font-semibold text-gray-700">
        Apply for Leave
        </h3>

      <div>
        <label className="block text-sm font-medium text-blue-100 mb-1">From Date:</label>
        <input
          type="date"
          name="from"
          value={formData.from}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-blue-400 focus:border-blur-400 transition "
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-100 mb-1">To Date:</label>
        <input
          type="date"
          name="to"
          value={formData.to}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-100 mb-1">Reason:</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition resize-none"
          rows="3"
          placeholder="Enter reason for leave ..."
          required
        />
      </div>

      <button type="submit" 
      className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-all duration-300 cursor-pointer">
        Submit Leave
      </button>
    </form>
  );
}
