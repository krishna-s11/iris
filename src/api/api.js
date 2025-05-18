import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://1a76-13-53-142-82.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Soft logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error('Session expired. Please login again.', {
        onClose: () => {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          window.location.href = '/auth/login';
        },
        autoClose: 3000, // after 3 seconds logout
      });
    }
    return Promise.reject(error);
  }
);

export default api;
