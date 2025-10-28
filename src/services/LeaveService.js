// src/services/LeaveService.js

/**
 * Returns all stored leaves from localStorage
 * @returns {Array} Array of leave objects
 */
export const getLeaveHistory = () => {
  const leaves = localStorage.getItem('leaves');
  return leaves ? JSON.parse(leaves) : [];
};

/**
 * Saves a new leave request to localStorage
 * @param {Object} leave - The new leave data
 * @returns {Array} Updated list of leaves
 */
export const saveLeave = (leave) => {
  const leaves = getLeaveHistory();
  const updatedLeaves = [...leaves, leave];
  localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
  return updatedLeaves;
};

/**
 * Clears all leaves (optional helper)
 */
export const clearLeaves = () => {
  localStorage.removeItem('leaves');
};
