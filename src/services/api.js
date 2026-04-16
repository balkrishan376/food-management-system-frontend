import axios from 'axios';

const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Use explicitly set environment variable if available
  if (apiUrl) {
    const normalized = apiUrl.replace(/\/$/, '');
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
  }

  // Production fallback to direct Render backend URL to avoid Vercel 10s proxy timeout
  if (import.meta.env.PROD || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'))) {
    return 'https://food-management-system-backend.onrender.com/api';
  }

  // Local development fallback
  if (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )) {
    return 'http://localhost:5000/api';
  }

  return 'https://food-management-system-backend.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 100000, // 100s to handle full Render cold start which can take up to 2 mins occasionally
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('The server is taking a while to start up. Please wait 30 seconds and try again.'));
    }
    return Promise.reject(error);
  }
);

export default api;
