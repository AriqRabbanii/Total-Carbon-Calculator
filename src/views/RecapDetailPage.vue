<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const goBack = () => router.back();

// Data dummy untuk detail. Di aplikasi nyata, ini akan diambil dari API/store berdasarkan route.params.id
const detailData = ref({
  iklim: 'Lembab',
  kabupaten: 'KOTA BANDA ACEH',
  provinsi: 'ACEH',
  desa: 'TIBANG',
  kecamatan: 'SYIAH KUALA',
  luasArea: '7.15 ha',
  namaHutan: 'Hutan Kota BNI',
  metode: 'Sampling',
  totalBiomassaTon: '40.62 (Ton/Ha)',
  totalBiomassaKg: '40621 (Kg/Ha)',
  totalKarbonTon: '20.31 (Ton/Ha)',
  totalKarbonKg: '20310.5 (Kg/Ha)',
});

const metaData = ref([
  { no: 1, namaPohon: 'Cemara Laut', namaIlmiah: 'Casuarina equisetifolia', keliling: '123 cm', diameter: '39.15 cm', jmlBiomassa: '1263.43', jmlKarbon: '0.63' },
  { no: 2, namaPohon: 'Flamboyan', namaIlmiah: 'Delonix regia', keliling: '32 cm', diameter: '10.19 cm', jmlBiomassa: '24.63', jmlKarbon: '0.01' },
]);
</script>

<template>
  <div class="page-wrapper">
    <div class="background-overlay"></div>
    <div class="content-wrapper">
      <header class="page-header">
        <button @click="goBack" class="back-button material-icons">arrow_back</button>
        <h1 class="title">Detail Rekapitulasi</h1>
      </header>
      <div class="detail-container">
        <div class="detail-section">
          <h3>Detail</h3>
          <div v-for="(value, key) in detailData" :key="key" class="info-row">
            <span class="label">{{ key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}</span>
            <span class="value">{{ value }}</span>
          </div>
        </div>
        <div class="meta-section">
          <h3>Meta</h3>
          <div v-for="meta in metaData" :key="meta.no" class="meta-card">
            <div v-for="(value, key) in meta" :key="key" class="info-row">
              <span class="label">{{ key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}</span>
              <span class="value">{{ value }}</span>
            </div>
          </div>
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
.detail-container {
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 24px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
.detail-section, .meta-section {
  margin-bottom: 24px;
}
h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}
.label {
  color: #555;
  text-transform: capitalize;
}
.value {
  color: #333;
  font-weight: bold;
  text-align: right;
}
.meta-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>