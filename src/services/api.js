import axios from 'axios';
import axiosRetry from 'axios-retry';

const getBaseUrl = () => {
  // Production fallback to direct Render backend URL to avoid Vercel 10s proxy timeout
  if (import.meta.env.PROD || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'))) {
    return 'https://food-management-system-backend.onrender.com/api';
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  // Use explicitly set environment variable if available
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

  return 'https://food-management-system-backend.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 100000, // 100s to handle full Render cold start which can take up to 2 mins occasionally
});

// Configure axios-retry to handle Render cold starts silently
axiosRetry(api, {
  retries: 15,
  retryDelay: (retryCount) => {
    return 3000; // 3 seconds between retries
  },
  retryCondition: (error) => {
    // Retry on standard network errors or 500/502/503/504
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error' ||
      (error.response && error.response.status >= 500 && error.response.status <= 599)
    );
  },
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
    // If it *still* failed after 15 retries (approx 45s), then inform the user
    if ((error.code === 'ECONNABORTED' || error.message === 'Network Error') && error.config && error.config['axios-retry'] && error.config['axios-retry'].retryCount >= 15) {
      return Promise.reject(new Error('The server is taking a while to start up (Cold Start). Please check your internet or try again later.'));
    }
    return Promise.reject(error);
  }
);

export default api;
