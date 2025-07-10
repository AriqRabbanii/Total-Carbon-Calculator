<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const router = useRouter();

// Reactive state untuk form, diisi dengan data dari store
const profileData = ref({
  firstName: '',
  lastName: '',
  username: '',
  nik: '1234567890123456', // Contoh data
  institution: 'Universitas Syiah Kuala', // Contoh data
  phone: '081234567890', // Contoh data
  email: '',
});

onMounted(() => {
  if (authStore.user) {
    const nameParts = authStore.user.name.split(' ');
    profileData.value.firstName = nameParts[0] || '';
    profileData.value.lastName = nameParts.slice(1).join(' ') || '';
    profileData.value.username = authStore.user.name.replace(' ', '').toLowerCase(); // Contoh
    profileData.value.email = authStore.user.email;
  }
});

const handleSave = () => {
  alert('Perubahan disimpan!');
  // Logika untuk mengirim data ke backend akan ada di sini
};

const goBack = () => {
    router.back();
}
</script>

<template>
  <div class="profile-page">
    <div class="background-overlay"></div>
    
    <div class="content-wrapper">
      <header class="profile-header">
        <button @click="goBack" class="back-button material-icons">arrow_back</button>
        <h1 class="title">Profil</h1>
        <div class="placeholder"></div>
      </header>

      <div class="profile-container">
        <div class="avatar-section">
          <div class="avatar-placeholder material-icons">person</div>
        </div>
        <a href="#" class="change-password-link">Ganti Sandi Akun</a>

        <form @submit.prevent="handleSave" class="profile-form">
          <div class="input-group">
            <input type="text" v-model="profileData.firstName" placeholder="Nama Depan">
          </div>
          <div class="input-group">
            <input type="text" v-model="profileData.lastName" placeholder="Nama Belakang">
          </div>
          <div class="input-group">
            <input type="text" v-model="profileData.username" placeholder="Username">
          </div>
          <div class="input-group">
            <input type="text" v-model="profileData.nik" placeholder="NPM/NIP/NIK">
          </div>
          <div class="input-group">
            <input type="text" v-model="profileData.institution" placeholder="Instansi/Institusi">
          </div>
          <div class="input-group">
            <input type="text" v-model="profileData.phone" placeholder="Nomor HP">
          </div>
          <div class="input-group">
            <input type="email" v-model="profileData.email" placeholder="Email" readonly>
          </div>
          <button type="submit" class="save-button">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background-image: url('@/assets/images/forest_background.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: white;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.background-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #2C8A4A;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.back-button, .placeholder {
  width: 40px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.profile-container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(240, 244, 241, 0.95);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.avatar-section {
  margin-bottom: 16px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #757575;
}

.change-password-link {
  color: #1a592e;
  text-decoration: underline;
  margin-bottom: 24px;
  font-weight: bold;
}

.profile-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  margin-bottom: 16px;
  width: 100%;
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
}

.input-group input[readonly] {
  background-color: #6c757d;
  cursor: not-allowed;
}

.save-button {
  /* === PERBAIKAN DI SINI === */
  width: auto; /* Ubah dari 100% menjadi auto */
  padding: 14px 40px; /* Tambahkan padding horizontal */
  margin-top: 8px;
  background-color: #2C8A4A;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>