<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

// Reactive state untuk form
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Inisialisasi router dan store
const router = useRouter();
const authStore = useAuthStore();

// Fungsi untuk menangani login
const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan kata sandi tidak boleh kosong.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Memanggil action login dari Pinia store
    await authStore.login({
      email: email.value,
      password: password.value,
    });

    // Simulasi login berhasil
    authStore.token = 'dummy-token-for-dev';
    authStore.user = { name: 'Pengguna Demo', email: email.value, role: 'umum' };
    
    router.push({ name: 'Dashboard' });

  } catch (error) {
    console.error('Login Gagal:', error);
    errorMessage.value = 'Login gagal. Periksa kembali email dan kata sandi Anda.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="background-overlay"></div>
    <div class="login-container">
      <img src="@/assets/images/logo_boncar_white.png" alt="Boncar Logo" class="logo">
      
      <h1 class="title">Masuk Ke Akun Anda</h1>
      <router-link :to="{ name: 'Register' }" class="register-link-alt">
        Atau daftar akun baru
      </router-link>

      <div class="login-card">
        <form @submit.prevent="handleLogin">
          <h2 class="card-title">Login</h2>
          
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="input-group">
            <label for="email">Username/Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email"
              placeholder="Masukkan Email" 
              required
            >
          </div>
          <div class="input-group">
            <label for="password">Kata Sandi</label>
            <input 
              type="password" 
              id="password" 
              v-model="password"
              placeholder="Masukkan Kata Sandi" 
              required
            >
          </div>

          <div class="options">
            <label class="remember-me">
              <input type="checkbox">
              Ingat Saya
            </label>
            <a href="#" class="forgot-password">Lupa sandi?</a>
          </div>

          <button type="submit" :disabled="isLoading" class="login-button">
            <span v-if="!isLoading">Masuk</span>
            <span v-else class="spinner"></span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/images/forest_background.jpg');
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  padding: 40px 20px;
}

.background-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.login-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.logo {
  width: 220px;
  height: auto;
  margin-bottom: 16px;
}

.title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.register-link-alt {
  color: white;
  margin-top: 4px;
  margin-bottom: 24px;
  text-decoration: none;
  opacity: 0.9;
}

.login-card {
  background-color: #F0F4F1;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.error-message {
  background-color: #ffdddd;
  color: #d8000c;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
  background-color: #2C8A4A;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  text-align: center;
  transition: background-color 5000s ease-in-out 0s;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.input-group input:-webkit-autofill,
.input-group input:-webkit-autofill:hover,
.input-group input:-webkit-autofill:focus,
.input-group input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #2C8A4A inset !important;
  -webkit-text-fill-color: white !important;
  caret-color: white;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-bottom: 24px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555;
}

.forgot-password {
  color: #2C8A4A;
  text-decoration: none;
  font-weight: bold;
}

.login-button {
  width: auto;
  padding: 12px 40px;
  background-color: #2C8A4A;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  min-height: 48px;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>