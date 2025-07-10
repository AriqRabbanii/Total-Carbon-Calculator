<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
// Menggunakan nama dummy sesuai gambar
const userName = 'Liam Chen';
</script>

<template>
  <div class="user-dashboard">
    <div class="welcome-card">
      <h3>Selamat Datang</h3>
      <h2>{{ userName }}</h2>
    </div>
    <div class="stats-grid">
      <div class="stat-card main-stat">
        <h4>Cadangan Karbon</h4>
        <p>1,25 Ton/Ha</p>
      </div>
      <div class="stat-card">
        <h4>Pohon Yang Dihitung</h4>
        <p>125</p>
      </div>
      <div class="stat-card">
        <h4>Lokasi Yang Dihitung</h4>
        <p>125</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-dashboard {
  max-width: 420px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.welcome-card {
  background-color: rgba(44, 138, 74, 0.9);
  color: white;
  padding: 20px;
  border-radius: 20px;
  text-align: left;
}

.welcome-card h3 {
  font-weight: normal;
  font-size: 1em;
  margin: 0 0 4px 0;
  opacity: 0.9;
}

.welcome-card h2 {
  font-size: 1.8em;
  margin: 0;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  grid-template-areas:
    "main main"
    "tree location";
}

.stat-card {
  background-color: rgba(69, 178, 107, 0.9);
  color: white;
  padding: 16px;
  border-radius: 20px;
  text-align: center;
}

.main-stat {
  grid-area: main;
  grid-column: 1 / -1; /* Memastikan ini mengambil lebar penuh */
}

.stat-card h4 {
  margin: 0 0 8px 0;
  font-size: 1em;
  font-weight: normal;
  opacity: 0.9;
}

.stat-card p {
  margin: 0;
  font-size: 1.6em;
  font-weight: bold;
}
</style>