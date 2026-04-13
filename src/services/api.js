import axios from 'axios';

const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const isLocalhost = window.location.hostname === 'localhost';
  
  if (isLocalhost) {
    return apiUrl || 'http://localhost:5000/api';
  }
  
  // In production, use relative /api for monorepo deployments
  // OR the VITE_API_URL if it's explicitly provided and NOT localhost
  if (apiUrl && !apiUrl.includes('localhost')) {
    return apiUrl;
  }
  
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
