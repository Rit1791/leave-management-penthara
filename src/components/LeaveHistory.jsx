// src/components/LeaveHistory.jsx
import React from 'react';

/**
 * LeaveHistory - displays all leaves in a table
 * @param {Array} leaves - list of leave objects
 */
export default function LeaveHistory({ leaves , onStatusChange, isAdmin }) {
  if (!leaves.length) {
    return <p className="text-gray-300 mt-4">No leaves applied yet.</p>;
  }

  return (
    <div className="mt-10 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/10 hover:shadow-blue-400/40 hover:scale-102">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Leave History
        </h3>


      <div className='overflow-x-auto rounded-xl border border-white/10'>
      <table className="min-w-full text-gray-100 bg-gradient-to-r from blue-700 via-purple-700 to-indigo-700 text-sm">
        <thead className="bg-gradient-to-r from blue-700 via-purple-700 to-indigo-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Employee Name</th>
            <th className="px-4 py-2 text-left font-semibold">From</th>
            <th className="px-4 py-2 text-left font-semibold">To</th>
            <th className="px-4 py-2 text-left font-semibold">Reason</th>
            <th className="px-4 py-2 text-left font-semibold">Status</th>
            {isAdmin && <th className="px-4 py-2 text-center font-semibold">Actions</th>}
           </tr>
        </thead>

        <tbody>
          {leaves.map((leave,index) => (
            <tr key={leave.id} className={`${index%2==0?"bg-white/5":"bg-white-10"} hover:bg-white/20 transition-all duration-200`}>
              <td className="px-4 py-2 font-medium text-gray-200">
                  {leave.employeeName || '—'}
                </td>
              <td className="px-4 py-2">{leave.from}</td>
              <td className="px-4 py-2">{leave.to}</td>
              <td className="px-4 py-2">{leave.reason}</td>
              <td className={`px-4 py-2 font-semibold ${leave.status==="Approved"?"text-green-400":leave.status==="Rejected"?"text-red-400":"text-yellow-300"}`}>{leave.status}</td>


              {isAdmin && (
                <td className="px-4 py-2 text-center space-x-3">
                  <div className='flex gap-1 md:flex-row flex-col'>
                  <button
                    onClick={() => onStatusChange(leave.id, 'Approved')}
                    className="px-4 py-1 w-[100px] rounded-lg text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all text-white shadow-md hover:shadow-green-400/50 cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onStatusChange(leave.id, 'Rejected')}
                    className="px-4 py-1 w-[100px] rounded-lg text-sm font-medium bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 transition-all text-white shadow-md hover:shadow-red-400/50 cursor-pointer"
                  >
                    Reject
                  </button>
                  </div>
                  
                </td>
              )}



            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
