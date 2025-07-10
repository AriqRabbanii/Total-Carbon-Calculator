// src/services/api.ts

import axios from 'axios';
import { useAuthStore } from '@/store/auth';

// Buat instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ambil URL dari environment variable
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Interceptor untuk menambahkan token otentikasi ke setiap request
api.interceptors.request.use(config => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;