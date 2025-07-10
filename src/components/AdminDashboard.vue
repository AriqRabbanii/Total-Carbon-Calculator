<script setup lang="ts">
// Data dummy untuk statistik admin sesuai gambar
const stats = [
  { title: 'Pengguna', value: 73 },
  { title: 'File Belum Diproses', value: 10 },
  { title: 'Rumus Alometrik', value: 5 },
];
</script>

<template>
  <div class="admin-dashboard">
    <div class="welcome-card">
      <h3>Selamat Datang</h3>
      <h2>Administrator</h2>
    </div>
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.title" class="stat-card">
        <div class="stat-title">{{ stat.title }}</div>
        <div class="stat-value">{{ stat.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.welcome-card {
  background-color: rgba(44, 138, 74, 0.9);
  color: white;
  padding: 20px 24px;
  border-radius: 15px;
  text-align: left;
}

.welcome-card h3 {
  font-weight: normal;
  font-size: 1em;
  margin: 0;
  opacity: 0.8;
}

.welcome-card h2 {
  font-size: 1.5em;
  margin: 4px 0 0 0;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: rgba(69, 178, 107, 0.9);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-title {
  font-size: 0.9em;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
}
</style>