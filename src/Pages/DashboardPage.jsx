// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import LeaveForm from '../components/LeaveForm';
import LeaveHistory from '../components/LeaveHistory';
import { getLeaveHistory, saveLeave } from '../services/LeaveService';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';


/**
 * Dashboard - placeholder for now
 */
export default function Dashboard() {
  const user = localStorage.getItem('user') || 'User';
  const [leaves, setLeaves] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState(10);

  useEffect(() => {
    const existingLeaves = getLeaveHistory();
    setLeaves(existingLeaves);

    const approvedDays = existingLeaves.reduce((total, leave) => {
      if (leave.status === "Approved") {
        const from = new Date(leave.from);
        const to = new Date(leave.to);
        const days = (to - from) / (1000 * 60 * 60 * 24) + 1;
        return total + days;
      }
      return total;
    }, 0);
    setLeaveBalance(10 - approvedDays);
  }, []);


  const handleNewLeave = (newLeave) => {
    const updatedLeaves = saveLeave(newLeave);
    setLeaves(updatedLeaves);
  };

  //   const handleStatusChange = (id, status) => {
  //   const updatedLeaves = leaves.map(l => l.id === id ? { ...l, status } : l);
  //   localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
  //   setLeaves(updatedLeaves);
  // };

  const handleStatusChange = (id, status) => {
    const updatedLeaves = leaves.map(l => {
      if (l.id === id) {
        const updatedLeave = { ...l, status };

        // 🔹 If approved, deduct days from balance
        if (status === "Approved" && l.status !== "Approved") {
          const from = new Date(l.from);
          const to = new Date(l.to);
          const days = (to - from) / (1000 * 60 * 60 * 24) + 1;
          setLeaveBalance(prev => Math.max(prev - days, 0));
        }

        return updatedLeave;
      }
      return l;
    });

    localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
    setLeaves(updatedLeaves);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 flex flex-col items-center">
        <div className='w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20'>

        <h2 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Welcome, <span className='text-pink-400'>{user}</span>  </h2>

        <p className="text-center text-blue-100 mb-6 text-lg font-medium">Leave Balance: <span className='font-bold text-white drop-shadow-md'>{leaveBalance} days</span></p>

  


        {/* <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="bg-gray-200 border px-3 py-1 rounded mb-4"
        >
          Toggle Admin Mode ({isAdmin ? 'On' : 'Off'})
        </button> */}

        <div className='mb-8 flex justify-center'>
        <LeaveForm onSubmit={handleNewLeave} />
        </div>

        <div>
        <LeaveHistory
          leaves={leaves}
          onStatusChange={handleStatusChange}
          isAdmin={isAdmin}
        />
        </div>

        {/* We'll replace these with proper components in later steps */}

        {/* <section className="mb-6">
        <h3 className="font-medium">Apply for Leave (placeholder)</h3>
      </section> */}


        {/* <section>
        <h3 className="font-medium">Leave History (placeholder)</h3>
      </section> */}

        {/* <LeaveHistory leaves={leaves} /> */}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
