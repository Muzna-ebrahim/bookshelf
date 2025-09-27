// API Configuration - Updated
export const API_BASE_URL = 'https://bookshelf-backend-ziuf.onrender.com';

// Wake up the backend server
export const wakeUpServer = async () => {
  try {
    await fetch(`${API_BASE_URL}/books`, { method: 'HEAD' });
  } catch (error) {
    console.log('Waking up server...');
  }
};