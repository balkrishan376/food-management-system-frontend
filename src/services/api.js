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
  // 60 seconds is enough to handle Render cold starts without causing the app to hang indefinitely
  timeout: 60000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Configure axios-retry to handle Render cold starts where it might throw 502 Bad Gateway while waking up
axiosRetry(api, {
  retries: 5, // Retry up to 5 times to cover a 45-second cold start window
  retryDelay: (retryCount) => {
    return retryCount * 3000; // 3s, 6s, 9s, 12s, 15s delay between retries
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error' ||
      (error.response && error.response.status >= 500 && error.response.status <= 599)
    );
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Provide a scalable, user-friendly error message on network failure
    if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
      error.message = 'Network Error: The backend server is warming up or unreachable. Please wait 30 seconds and try again.';
    }
    return Promise.reject(error);
  }
);

export default api;
