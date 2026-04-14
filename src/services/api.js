import axios from 'axios';

const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // If explicitly set in env (local dev or Vercel env vars), use it directly
  if (apiUrl) {
    const normalized = apiUrl.replace(/\/$/, ''); // remove trailing slash
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
  }

  // On localhost, default to local backend
  if (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )) {
    return 'http://localhost:5000/api';
  }

  // Production fallback: use Render backend URL
  // This is the deployed Render service URL — update if your Render URL changes
  return 'https://food-management-system-backend-x5xi.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000, // 30s timeout to handle Render cold-start spin-up
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. The server may be starting up — please try again in a moment.'));
    }
    return Promise.reject(error);
  }
);

export default api;
