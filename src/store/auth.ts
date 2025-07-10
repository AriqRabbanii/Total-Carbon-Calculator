import { defineStore } from 'pinia';
import api from '@/services/api';

// Definisikan tipe untuk data pengguna
interface User {
  name: string;
  email: string;
  role: 'admin' | 'umum';
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userRole: (state) => state.user?.role,
  },

  actions: {
    /**
     * Aksi untuk menangani proses login.
     * Panggilan API akan diaktifkan saat backend siap.
     */
    async login(credentials: { email: string, password: string }) {
      console.log('Login action called with:', credentials);
      // const { data } = await api.post('/login', credentials);
      // this.token = data.token;
      // this.user = data.user;
      // localStorage.setItem('token', data.token);
      // api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    },

    /**
     * Aksi untuk logout.
     */
    async logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    },

    /**
     * Aksi untuk mengambil data pengguna jika token sudah ada.
     * Panggilan API akan diaktifkan saat backend siap.
     */
    async fetchUser() {
      if (this.token && !this.user) {
        try {
          console.log("Mencoba mengambil data pengguna (fetchUser)... Panggilan API di-skip untuk sementara.");
          // const { data } = await api.get('/user');
          // this.user = data;
        } catch (error) {
          console.error("Gagal fetch user, token mungkin tidak valid.", error);
          await this.logout();
        }
      }
    },
  },
});