import React, { useEffect, useState } from 'react';
import LeaveForm from '../components/LeaveForm';
import LeaveHistory from '../components/LeaveHistory';
import { getLeaveHistory, saveLeave } from '../services/LeaveService';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

function Dashboard() {
  const user = localStorage.getItem('user') || 'User';   // gets username from browser
  const [leaves, setLeaves] = useState([])
  const [leaveBalance, setLeaveBalance] = useState(10); // total leaves 

  useEffect(() => {
    const existingLeaves = getLeaveHistory() || []; // It calls getLeaveHistory() a helper function from your LeaveService.js
    setLeaves(existingLeaves);

    const approvedDays = existingLeaves.reduce((total, leave) => {  //reduce() is a special JS function that adds things up. total keep track of running total , leave represent each leave object
      if (leave.status === "Approved") {
        const from = new Date(leave.from);  // convert date string into date object
        const to = new Date(leave.to);  // convert date string into date object
        const days = (to - from) / (1000 * 60 * 60 * 24) + 1;  //1000 ms × 60 s × 60 min × 24 hr = 86,400,000 ms in a day (+1 for start and end day)
        return total + days;  // add number of days to running total
      }
      return total;
    }, 0);
    setLeaveBalance(Math.max(10 - approvedDays, 0));
  }, []); //only runs once


  const handleNewLeave = (newLeave) => {  //handles how new leave applications get stored and displayed.
    const updatedLeaves = saveLeave(newLeave);
    setLeaves(updatedLeaves);
  };


  const handleStatusChange = (id, status) => {   //handles approval/rejection of leave
    const updatedLeaves = leaves.map(l => {
      if (l.id === id) {
        const updatedLeave = { ...l, status };  //clone the old leave object  and just overwrite the status key ( update status from pending to approved or rejected )

        //  If approved, deduct days from balance
        if (status === "Approved" && l.status !== "Approved") {  // when admin pressed approved but prev status was not approved
          const from = new Date(l.from);
          const to = new Date(l.to);
          const days = (to - from) / (1000 * 60 * 60 * 24) + 1;
          setLeaveBalance(prev => Math.max(prev - days, 0));  // so that leave balance never goes into negative
        }

        return updatedLeave;
      }
      return l;  // when l.id != id return original leave object(l)
    });

    localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
    setLeaves(updatedLeaves);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 p-4 md:p-8 flex flex-col items-center">
        <div className='w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20'>

          <h2 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg ">
            Welcome, <span className='text-pink-400'>{user}</span>  </h2>


          {/* Leave Balance Section */}
          <div className={`bg-white/10 backdrop-blur-md border ${leaveBalance === 0 ? 'border-red-500/60 shadow-red-400/40' : 'border-white/20 hover:shadow-blue-400/40'} rounded-xl p-4 text-center shadow-md w-fit mx-auto mb-6 hover:scale-102 transition-all`}>

            <p className={`text-lg font-medium mb-3 ${leaveBalance === 0 ? 'text-red-300' : 'text-blue-100'}`}>
              Leave Balance:{" "}
              <span className={`font-bold drop-shadow-md ${leaveBalance === 0 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {leaveBalance} days
              </span>
            </p>

            {/* Progress Bar */}
            <div className="w-64 bg-white/20 rounded-full h-3 overflow-hidden mx-auto shadow-inner border border-white/10">
              <div className={`h-full rounded-full transition-all duration-700 ${leaveBalance === 0 ? 'bg-red-600' :leaveBalance >= 7 ? 'bg-green-400' :leaveBalance >= 4 ? 'bg-yellow-400' : 'bg-orange-500'}`} style={{ width: `${(10 - leaveBalance) * 10}%` }}>
              </div>
            </div>

            <p className="text-sm text-gray-300 mt-2">
              Used:{" "}
              <span className={`font-semibold ${leaveBalance === 0 ? 'text-red-400' : 'text-white'}`}>
                {10 - leaveBalance} 
              </span>{" "}
              / 10 days
            </p>

            {/* When leaves = 0 */}
            {leaveBalance === 0 && (
              <p className="text-red-400 text-sm font-semibold mt-3  ">
                 You have used all your available leaves!
              </p>
            )}
          </div>
          
          {/* Apply for leave section */}
          <section className="mb-12">
            <h3
              className="text-2xl font-bold text-gray-100 mb-2 border-b border-white/30 inline-block pb-2">
              Apply for Leave
            </h3>

            <div className="mt-6 flex justify-center">
              <LeaveForm onSubmit={handleNewLeave} />
            </div>
          </section>



          {/* Leave History Section */}
          <section>
            <h3
              className="text-2xl font-bold text-gray-100 mb-2 border-b border-white/30 inline-block pb-2">
              Leave History
            </h3>
            <LeaveHistory
              leaves={leaves}
              onStatusChange={handleStatusChange}
              isAdmin={false}
            />
          </section>

        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Dashboard