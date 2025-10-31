import React, { useState } from 'react';
import toast from 'react-hot-toast';



/**
 * LeaveForm - form to apply for leave
 * @param {Function} onSubmit - function passed from parent to handle submission
 */
function LeaveForm({ onSubmit }) {
  const [formData, setFormData] = useState({
                                    from: '',
                                    to: '',
                                    reason: ''
                                  });
  const userName = localStorage.getItem("user") || "Unknown User";  


  const handleChange = (e) => {          // handleChnage called whenever user types something in the input field
    const { name, value } = e.target;    // e.target.name = the name attribute of that input  , e.target.value = the current value entered by the user
    setFormData({ ...formData, [name]: value });  
  };


  /**
   * Submits the leave form data to parent
   * @param {Object} formData - The leave form data
   */
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!formData.from || !formData.to || !formData.reason){
      toast.error("Please fill all fields before submitting!")
      return      // stops the function immediately (so nothing else runs until all fields are filled)
    };
    
    onSubmit({              // Pass data up to parent (Dashboard) (handleNewLeave function comming from parent)
      ...formData,
      employeeName:userName,
      status: 'Pending',
      id: Date.now()
    });
    toast.success("Leave submitted successfully!");
    setFormData({ from: '', to: '', reason: '' });  // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="my-8 p-6 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl text-white space-y-6  transition-all duration-300 hover:shadow-blue-400/40 w-full max-w-lg mx-auto hover:scale-102 ">
      
      <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg shadow-pink-500/60 hover:shadow-blue-400/80 transition-all duration-300 mb-6 flex items-center gap-2">
        New Leave Request
      </h3>

      <div>
        <label className="block text-sm font-medium text-blue-100 mb-1"> From Date: </label>
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
        <label className="block text-sm font-medium text-blue-100 mb-1"> To Date: </label>
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
        <label className="block text-sm font-medium text-blue-100 mb-1"> Reason: </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition resize-none"
          rows="4"
          placeholder="Enter reason for leave "
          required
        />
      </div>

      <button type="submit" className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-all duration-300 cursor-pointer">
        Submit Leave
      </button>
    </form>
  );
}

export default LeaveForm
