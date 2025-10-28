import React, { useEffect, useState } from "react";
import LeaveHistory from "../components/LeaveHistory";
import { getLeaveHistory } from "../services/LeaveService";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const existingLeaves = getLeaveHistory() || [];
    setLeaves(existingLeaves);
  }, []);

  const handleStatusChange = (id, status) => {
    const updatedLeaves = leaves.map((l) =>
      l.id === id ? { ...l, status } : l
    );
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));
    setLeaves(updatedLeaves);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900  flex flex-col items-center p-8">
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-extrabold text-white text-center mb-6 drop-shadow-md">Admin Dashboard</h2>
        <p className="text-center text-gray-300 mb-10 text-sm tracking-wide">Manage and review employee leave requests below</p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-inner hover:shadow-lg transition-all">
        <LeaveHistory
          leaves={leaves}
          onStatusChange={handleStatusChange}
          isAdmin={true}
        />
        </div>

        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
