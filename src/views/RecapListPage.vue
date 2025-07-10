<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => router.back();

// Data dummy untuk daftar rekapitulasi
const recapList = ref([
  { id: 1, name: 'Hutan Kota BNI', date: '05/07/2025' },
  { id: 2, name: 'Taman Hutan Raya', date: '04/07/2025' },
]);

const viewDetails = (id: number) => {
  router.push({ name: 'RecapDetail', params: { id } });
};
</script>

<template>
  <div class="page-wrapper">
    <div class="background-overlay"></div>
    <div class="content-wrapper">
      <header class="page-header">
        <button @click="goBack" class="back-button material-icons">arrow_back</button>
        <h1 class="title">Rekapitulasi</h1>
      </header>
      <div class="recap-list">
        <div v-for="recap in recapList" :key="recap.id" class="recap-item" @click="viewDetails(recap.id)">
          <div>
            <div class="item-name">{{ recap.name }}</div>
            <div class="item-date">Dihitung pada {{ recap.date }}</div>
          </div>
          <span class="material-icons">chevron_right</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  background-image: url('@/assets/images/forest_background.jpg');
  background-size: cover; background-position: center; min-height: 100vh;
  padding: 20px;
}
.background-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6); z-index: 1;
}
.content-wrapper {
  position: relative; z-index: 2; width: 100%; max-width: 420px;
  margin: 0 auto;
}
.page-header {
  display: flex; align-items: center; padding-bottom: 16px; color: white; gap: 16px;
}
.title { font-size: 20px; font-weight: bold; margin: 0; }
.back-button {
  background: none; border: none; color: white;
  font-size: 24px; cursor: pointer;
}
.recap-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.recap-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #2C8A4A;
  color: white;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.recap-item:hover {
  background-color: #25733e;
}
.item-name {
  font-size: 16px;
  font-weight: bold;
}
.item-date {
  font-size: 12px;
  opacity: 0.8;
}
</style>