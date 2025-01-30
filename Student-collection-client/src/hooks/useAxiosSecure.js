import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://student-collection-server.vercel.app', // Replace with your API base URL
  // baseURL: 'http://localhost:5000', // Replace with your API base URL
  timeout: 15000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Optional: Default headers
  },
});

export default axiosInstance;
