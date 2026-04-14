import axios from 'axios';

const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Use explicitly set environment variable if available
  if (apiUrl) {
    const normalized = apiUrl.replace(/\/$/, '');
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
  }

  // Local development check
  if (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )) {
    return 'http://localhost:5000/api';
  }

  // Use relative path for production to leverage Vercel rewrites/proxy
  // This avoids CORS issues as the request remains same-origin from the browser's perspective
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
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
      return Promise.reject(new Error('Request timed out. The server may be starting up — please try again.'));
    }
    return Promise.reject(error);
  }
);

export default api;
