import axios from 'axios';

// Determine the base URL for API requests
const getBaseURL = () => {
  // If REACT_APP_API_URL is explicitly set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In production (on Render), use relative URLs for same-origin requests
  if (window.location.origin.includes('onrender.com') || process.env.NODE_ENV === 'production') {
    return ''; // Use relative URLs, so requests go to the same server
  }
  
  // In development, use localhost
  return 'http://localhost:5000';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default api;
