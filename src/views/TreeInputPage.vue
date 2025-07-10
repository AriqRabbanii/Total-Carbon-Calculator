<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCalculatorStore, Equation } from '@/store/calculator';

const router = useRouter();
const store = useCalculatorStore();

// Grup "Lainnya" yang berisi Chave dihapus
const equationGroups = ref([
  {
    label: 'Spesifik Spesies',
    options: [
      { text: 'Shorea leprosela', value: Equation.ShoreaLeprosula },
      { text: 'Dipterocarpus spp.', value: Equation.Dipterocarpus },
      { text: 'Swietenia macrophylla (Mahoni)', value: Equation.SwieteniaMacrophylla },
      { text: 'Mangifera indica (Mangga)', value: Equation.MangiferaIndica },
      { text: 'Acacia mangium', value: Equation.AcaciaMangium },
    ],
  },
]);

const getClimateName = (climate: Equation) => {
    switch (climate) {
        case Equation.BrownDry: return "Umum (Brown, 1997 - Iklim Kering)";
        case Equation.BrownMoist: return "Umum (Brown, 1997 - Iklim Lembab)";
        case Equation.BrownWet: return "Umum (Brown, 1997 - Iklim Basah)";
        default: return "Tidak Diketahui";
    }
};

const handleCalculate = () => {
  store.calculateResults();
  router.push({ name: 'CalculatorResults' });
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
         <h1 class="title">Pendataan Pohon</h1>
       </header>
       <div class="trees-container">
         <div v-for="(tree, index) in store.trees" :key="tree.id" class="tree-card">
           <div class="card-header">
             <h3>Data Pohon {{ index + 1 }}</h3>
             <button @click="store.removeTree(tree.id)" class="delete-button material-icons">delete</button>
           </div>
           
           <div class="input-group">
             <label>Nama Pohon (Opsional)</label>
             <input type="text" v-model="tree.name">
           </div>
           <div class="input-group">
             <label>Spesies Pohon (untuk API)</label>
             <input type="text" v-model="tree.species">
           </div>
           <div class="input-group">
              <label>Pilih Persamaan Alometrik</label>
              <select v-model="tree.selectedEquation">
                <option :value="store.projectData?.defaultClimate">
                  {{ getClimateName(store.projectData!.defaultClimate) }}
                </option>
                <optgroup v-for="group in equationGroups" :key="group.label" :label="group.label">
                  <option v-for="option in group.options" :key="option.value" :value="option.value">
                    {{ option.text }}
                  </option>
                </optgroup>
              </select>
           </div>
           <div class="input-group">
             <label>Keliling Pohon (cm)*</label>
             <input type="number" v-model.number="tree.circumference">
           </div>
           
           <div v-if="tree.selectedEquation === Equation.BrownWet" class="input-group">
             <label>Tinggi Pohon (m)*</label>
             <input type="number" v-model.number="tree.height">
           </div>
         </div>
       </div>
       <div class="button-footer">
         <button @click="store.addTree" class="btn-secondary">Tambah Pohon</button>
         <button @click="handleCalculate" class="btn-primary">HITUNG</button>
       </div>
    </div>
  </div>
</template>

<style scoped>
/* Style tetap sama seperti sebelumnya */
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
  position: relative; z-index: 2; width: 100%; max-width: 500px;
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
.trees-container {
  background-color: rgba(255, 255, 255, 0.98);
  padding: 16px; max-height: calc(100vh - 180px); overflow-y: auto;
  border-radius: 20px;
}
.tree-card {
  background: #f0f4f1; padding: 16px; border-radius: 15px; margin-bottom: 16px;
  border: 1px solid #e0e0e0;
}
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
h3 { color: #333; margin: 0; }
.delete-button {
  background: none; color: #e74c3c; border: none;
  cursor: pointer; font-size: 22px;
}
.input-group { margin-bottom: 12px; }
.input-group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 500;
}
.input-group input, .input-group select {
  width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;
  font-size: 16px;
  background-color: white;
}
.button-footer {
  display: flex; gap: 16px; padding: 16px 0 0 0;
}
.btn-primary, .btn-secondary {
  flex: 1; padding: 14px; border-radius: 30px;
  border: none; font-weight: bold; cursor: pointer; font-size: 16px;
}
.btn-primary { background-color: #2C8A4A; color: white; }
.btn-secondary { background-color: #ffffff; color: #333; }
</style>