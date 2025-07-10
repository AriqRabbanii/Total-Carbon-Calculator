<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCalculatorStore } from '@/store/calculator';

const router = useRouter();
const store = useCalculatorStore();

const showDetails = ref(false);

if (!store.results || !store.projectData) {
  // Jika tidak ada hasil, kembali ke form awal
  router.replace({ name: 'CalculatorForm' });
}

// Menggabungkan data lokasi menjadi satu string
const fullLocation = computed(() => {
  if (!store.projectData) return 'N/A';
  return [
    store.projectData.desa,
    store.projectData.kecamatan,
    store.projectData.kabupaten,
    store.projectData.provinsi,
  ].filter(Boolean).join(', ');
});

// Format tanggal saat ini
const calculationDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});
</script>

<template>
  <div class="page-wrapper">
     <div class="background-overlay"></div>
     <div class="content-wrapper">
       <header class="page-header">
         <button @click="router.back()" class="back-button material-icons">arrow_back</button>
         <h1 class="title">Hasil Kalkulator</h1>
       </header>
       
       <div class="results-card" v-if="store.projectData && store.results">
          <h2>Total Keseluruhan (Grand Total)</h2>
          
          <div class="info-grid">
            <div class="info-label">Hutan</div>
            <div class="info-value">: {{ store.projectData.namaHutan }}</div>
            
            <div class="info-label">Luas Hutan</div>
            <div class="info-value">: {{ store.projectData.luasArea.toFixed(2) }} ha</div>

            <div class="info-label">Lokasi</div>
            <div class="info-value">: {{ fullLocation }}</div>

            <div class="info-label">Tanggal</div>
            <div class="info-value">: {{ calculationDate }}</div>
          </div>

          <hr class="divider">
          
          <div class="metric-grid">
            <div class="metric">
              <label>Total Biomassa</label>
              <p>{{ store.results.totalBiomass.toFixed(2) }} <span>Ton/Ha</span></p>
            </div>
            <div class="metric">
              <label>Total Cadangan Karbon</label>
              <p>{{ store.results.totalCarbon.toFixed(2) }} <span>Ton/Ha</span></p>
            </div>
          </div>
          
          <button @click="showDetails = !showDetails" class="detail-button">
            <span class="material-icons">{{ showDetails ? 'visibility_off' : 'visibility' }}</span>
            {{ showDetails ? 'Sembunyikan Detail' : 'Lihat Detail' }}
          </button>
       </div>
       
       <div v-if="showDetails && store.results" class="details-card">
          <h3>Rincian Perhitungan per Pohon</h3>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pohon</th>
                  <th>Keliling (cm)</th>
                  <th>AGB (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tree, index) in store.results.detailedTreeResults" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ tree.name }}</td>
                  <td>{{ tree.circumference.toFixed(1) }}</td>
                  <td>{{ tree.agb.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
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
  position: relative; z-index: 2; width: 100%; max-width: 800px;
  margin: 0 auto;
}
.page-header {
  display: flex; align-items: center; padding: 16px; color: white;
}
.title { font-size: 20px; font-weight: bold; }
.back-button {
  background: none; border: none; color: white;
  font-size: 24px; cursor: pointer; margin-right: 16px;
}
.results-card {
  padding: 24px 32px; background-color: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
}
h2 { font-size: 20px; margin-bottom: 24px; color: #333; font-weight: bold; }

.info-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 8px 16px;
  color: #333;
}
.info-label { color: #555; }

.divider { border: 0; border-top: 1px solid #e0e0e0; margin: 24px 0; }

.metric-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.metric label { font-size: 16px; color: #555; }
.metric p {
  font-size: 32px; font-weight: bold; color: #2C8A4A; margin: 4px 0 0 0;
}
.metric span { font-size: 16px; color: #777; font-weight: normal; }

.detail-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  background-color: #2C8A4A;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.details-card {
  margin-top: 16px;
  padding: 24px; background-color: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
}
h3 { color: #333; margin-bottom: 16px; font-weight: bold;}
.table-responsive { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
th { background-color: #f8f8f8; }
</style>