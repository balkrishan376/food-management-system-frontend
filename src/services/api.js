import axios from 'axios';
import axiosRetry from 'axios-retry';

const getBaseUrl = () => {
  // Production: Prioritize Railway if available, then fallback to Render
  if (import.meta.env.PROD || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'))) {
    // Check if a Railway URL is provided in env, otherwise use the hardcoded one
    // Replace the URL below with your Railway URL once deployed
    return import.meta.env.VITE_RAILWAY_URL || 'https://food-management-system-backend.onrender.com/api';
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
  // 90 seconds timeout to handle the longest possible Render cold starts + some buffer
  timeout: 90000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Configure axios-retry to handle Render cold starts robustly
axiosRetry(api, {
  retries: 10, // Increased to 10 retries to cover extreme cold start delays (up to 2-3 mins)
  retryDelay: (retryCount) => {
    // Progressive delay: 2s, 4s, 6s, 8s, 10s, 12s, 14s, 16s, 18s, 20s
    // Total wait time will be ~110 seconds + request durations
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    // Retry on network errors regardless of method (POST is safe for cold-start wake-up)
    if (axiosRetry.isNetworkError(error) || error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      return true;
    }
    
    // Specifically retry on 502, 503, 504 which are common during Render cold starts
    if (error.response && [502, 503, 504].includes(error.response.status)) {
      return true;
    }


    // Default idempotent check for other 5xx errors
    return axiosRetry.isIdempotentRequestError(error);
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`♻️ Retrying request (${retryCount}/10)... Backend is likely warming up.`);
  },
  shouldResetTimeout: true,
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
    // Provide a clear message for persistent network issues
    if (error.message === 'Network Error' || error.code === 'ECONNABORTED' || (error.response && error.response.status >= 502)) {
      error.message = 'The server is taking a moment to wake up. Please wait about 30 seconds and try again. This only happens on the first visit.';
    }
    return Promise.reject(error);
  }
);

export default api;

