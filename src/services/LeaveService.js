/**
 *  Returns all stored leaves from localStorage
 * @returns {Array} Array of leave objects
 */
export const getLeaveHistory = () => {
  const leaves = localStorage.getItem('leaves');   // Reads the string value stored under the key 'leaves' from the browser’s localStorage.
  return leaves ? JSON.parse(leaves) : [];    // it parses the JSON string into a JavaScript array
};


/**
 * Saves a new leave request to localStorage
 * @param {Object} leave - The new leave data
 * @returns {Array} Updated list of leaves
 */
export const saveLeave = (leave) => {
  const leaves = getLeaveHistory();    // Calls the function above to read the current list of leaves from localStorage (returns [] if none)
  const updatedLeaves = [...leaves, leave ]; 
  localStorage.setItem('leaves', JSON.stringify(updatedLeaves));   // Converts the updated array to a JSON string
  return updatedLeaves;  
};


/**
 * Clears all leaves 
 */
export const clearLeaves = () => {
  localStorage.removeItem('leaves'); 
};
