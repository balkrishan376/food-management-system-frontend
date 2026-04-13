import axios from 'axios';

const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const isLocalhost = window.location.hostname === 'localhost';
  
  if (isLocalhost) {
    return apiUrl || 'http://localhost:5000/api';
  }
  
  // In production, if explicitly provided VITE_API_URL
  if (apiUrl) {
    // Ensure it ends with /api
    const normalizedUrl = apiUrl.replace(/\/$/, ''); // Remove trailing slash
    if (!normalizedUrl.endsWith('/api')) {
      return `${normalizedUrl}/api`;
    }
    return normalizedUrl;
  }
  
  // Fallback to relative /api for same-origin monorepo deployments
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
