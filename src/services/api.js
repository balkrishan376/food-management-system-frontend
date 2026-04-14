import axios from 'axios';

const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Use relative path for production to leverage Vercel rewrites/proxy
  // This avoids CORS issues and handles Render cold starts better via the proxy
  if (import.meta.env.PROD && typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return '/api';
  }

  // Use explicitly set environment variable if available (e.g., in development)
  if (apiUrl) {
    const normalized = apiUrl.replace(/\/$/, '');
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
  }

  // Local development fallback
  if (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )) {
    return 'http://localhost:5000/api';
  }

  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 45000, // Increased timeout for Render cold starts
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
