<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCalculatorStore, Equation, type ProjectData } from '@/store/calculator';

const router = useRouter();
const calculatorStore = useCalculatorStore();

// Menambahkan field lokasi ke form
const form = ref<Omit<ProjectData, 'luasArea'> & { luasArea: string }>({
  namaHutan: '',
  luasArea: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  desa: '',
  selectedMethod: 'sensus',
  defaultClimate: Equation.BrownMoist,
});

// Data dummy untuk dropdown
const provinces = ref(['Aceh', 'Sumatera Utara']);
const regencies = ref(['Banda Aceh', 'Aceh Besar']);
const districts = ref(['Syiah Kuala', 'Kuta Alam']);
const villages = ref(['Tibang', 'Kopelma Darussalam']);


const handleNext = () => {
  const luasArea = parseFloat(form.value.luasArea);
  if (isNaN(luasArea) || luasArea <= 0) {
    alert('Luas Area harus berupa angka positif.');
    return;
  }

  // Validasi dropdown
  if (!form.value.provinsi || !form.value.kabupaten || !form.value.kecamatan || !form.value.desa) {
    alert('Semua data lokasi harus dipilih.');
    return;
  }

  calculatorStore.setProjectData({
    ...form.value,
    luasArea,
  });
  router.push({ name: 'TreeInput' });
};

const goBack = () => {
  router.back();
}
</script>

<template>
  <div class="page-wrapper">
    <div class="background-overlay"></div>
    <div class="content-wrapper">
      <header class="page-header">
         <button @click="goBack" class="back-button material-icons">arrow_back</button>
         <h1 class="title">Kalkulator Biomassa</h1>
      </header>

      <div class="form-card">
        <form @submit.prevent="handleNext">
          <h2>1. Pendataan Wilayah & Metode</h2>
          <hr>

          <div class="form-grid">
            <div class="input-group">
              <label>Provinsi*</label>
              <select v-model="form.provinsi" required>
                <option disabled value="">Pilih salah satu opsi</option>
                <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div class="input-group">
              <label>Kabupaten*</label>
              <select v-model="form.kabupaten" required>
                <option disabled value="">Pilih salah satu opsi</option>
                <option v-for="r in regencies" :key="r" :value="r">{{ r }}</option>
              </select>
            </div>
            <div class="input-group">
              <label>Kecamatan*</label>
              <select v-model="form.kecamatan" required>
                <option disabled value="">Pilih salah satu opsi</option>
                <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
              </select>
            </div>
            <div class="input-group">
              <label>Desa*</label>
              <select v-model="form.desa" required>
                <option disabled value="">Pilih salah satu opsi</option>
                <option v-for="v in villages" :key="v" :value="v">{{ v }}</option>
              </select>
            </div>
            <div class="input-group">
              <label>Nama Hutan*</label>
              <input type="text" v-model="form.namaHutan" required>
            </div>
            <div class="input-group">
              <label>Luas Area (Ha)*</label>
              <input type="text" v-model="form.luasArea" required>
            </div>
          </div>
          
          <div class="input-group full-width">
            <label>Pilih Zona Iklim (untuk rumus Brown)*</label>
            <select v-model="form.defaultClimate">
              <option :value="Equation.BrownDry">Iklim Kering (&lt;1500 mm/th)</option>
              <option :value="Equation.BrownMoist">Iklim Lembab (1500-4000 mm/th)</option>
              <option :value="Equation.BrownWet">Iklim Basah (&gt;4000 mm/th)</option>
            </select>
          </div>

          <div class="radio-group full-width">
            <label>Pilih Metode Perhitungan</label>
            <div class="radio-options">
              <div>
                <input type="radio" id="sensus" value="sensus" v-model="form.selectedMethod">
                <label for="sensus">Sensus</label>
              </div>
              <div>
                <input type="radio" id="sampling" value="sampling" v-model="form.selectedMethod">
                <label for="sampling">Sampling</label>
              </div>
            </div>
          </div>

          <button type="submit" class="submit-button">Lanjut ke Data Pohon</button>
        </form>
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
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
.content-wrapper {
  position: relative; z-index: 2; width: 100%; max-width: 800px;
  margin: 0 auto;
}
.page-header {
  display: flex; align-items: center;
  padding: 16px;
  color: white;
}
.title { font-size: 20px; font-weight: bold; }
.back-button {
  background: none; border: none; color: white;
  font-size: 24px; cursor: pointer; margin-right: 16px;
}
.form-card {
  padding: 24px 32px; background-color: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
}
h2 { font-size: 18px; margin-bottom: 8px; color: #333; }
hr { border: 0; border-top: 1px solid #e0e0e0; margin-bottom: 24px; }

/* Gaya untuk Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}

.input-group, .radio-group { margin-bottom: 16px; }

/* Gaya untuk elemen yang butuh lebar penuh di dalam grid */
.full-width {
  grid-column: 1 / -1;
}

.input-group label, .radio-group > label {
  display: block; margin-bottom: 8px; color: #555; font-weight: 500;
  font-size: 14px;
}
input[type="text"], select {
  width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;
  font-size: 16px;
}
.radio-options {
  display: flex;
  gap: 24px;
}
.radio-options div { display: flex; align-items: center; }
input[type="radio"] { margin-right: 8px; }

.submit-button {
  width: auto;
  padding: 12px 40px;
  margin: 16px auto 0 auto;
  display: block;
  background-color: #2C8A4A; color: white; border: none;
  border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer;
}
</style>