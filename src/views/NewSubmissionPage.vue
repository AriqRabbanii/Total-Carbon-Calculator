<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State untuk form
const formData = ref({
  formulaName: '',
  formula: '',
  climateZone: '',
  reference: '',
});
const selectedFile = ref<File | null>(null);
const fileName = ref('');

const goBack = () => {
  router.back();
};

// Fungsi untuk menangani perubahan file
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    // Validasi tipe file
    if (file.type === 'application/pdf') {
      selectedFile.value = file;
      fileName.value = file.name;
    } else {
      alert('Hanya file dengan format PDF yang diizinkan.');
      // Reset input file
      target.value = '';
      selectedFile.value = null;
      fileName.value = '';
    }
  }
};

// Fungsi untuk menangani pengiriman form
const handleSubmit = () => {
  if (!selectedFile.value) {
    alert('Mohon unggah berkas pendukung.');
    return;
  }
  // Simulasi pengiriman data
  console.log('Data yang Dikirim:', formData.value);
  console.log('File yang Dikirim:', selectedFile.value);
  alert('Pengajuan berhasil dikirim!');
  router.push({ name: 'Dashboard' });
};
</script>

<template>
  <div class="page-wrapper">
    <div class="background-overlay"></div>
    <div class="content-wrapper">
      <header class="page-header">
        <button @click="goBack" class="back-button material-icons">arrow_back</button>
        <span class="header-icon material-icons">post_add</span>
        <h1 class="title">Pengajuan Alometrik Baru</h1>
      </header>
      <div class="form-card">
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="formulaName">Nama Rumus (Contoh: "Chave et al. (2014)")</label>
            <input id="formulaName" type="text" v-model="formData.formulaName" required>
          </div>
          <div class="input-group">
            <label for="formula">Rumus</label>
            <input id="formula" type="text" v-model="formData.formula" required>
          </div>
          <div class="input-group">
            <label for="climateZone">Zona Iklim</label>
            <input id="climateZone" type="text" v-model="formData.climateZone" required>
          </div>
          <div class="input-group">
            <label for="reference">Sumber/Referensi</label>
            <input id="reference" type="text" v-model="formData.reference" required>
          </div>
          
          <div class="input-group">
            <label>Upload Berkas Pendukung</label>
            <label class="file-upload-label">
              <input type="file" @change="handleFileChange" accept=".pdf" required>
              <span class="file-upload-button">Pilih File</span>
              <span class="file-name">{{ fileName || 'Tidak ada file dipilih' }}</span>
            </label>
          </div>

          <button type="submit" class="submit-button">Kirim</button>
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
  background: rgba(0, 0, 0, 0.6); z-index: 1;
}
.content-wrapper {
  position: relative; z-index: 2; width: 100%; max-width: 420px;
  margin: 0 auto;
}
.page-header {
  display: flex; align-items: center; padding: 16px; color: white;
  gap: 12px;
}
.title { font-size: 20px; font-weight: bold; margin: 0; }
.header-icon { font-size: 28px; }
.back-button {
  background: none; border: none; color: white;
  font-size: 24px; cursor: pointer;
}
.form-card {
  padding: 32px; background-color: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
}
.input-group { margin-bottom: 20px; }
.input-group label {
  display: block; margin-bottom: 8px; color: #555; font-weight: 500;
  font-size: 14px;
}
.input-group input[type="text"] {
  width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;
  font-size: 16px;
}

/* Custom File Upload */
.file-upload-label {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
.file-upload-label input[type="file"] {
  display: none;
}
.file-upload-button {
  background-color: #2C8A4A;
  color: white;
  padding: 12px 16px;
  white-space: nowrap;
}
.file-name {
  padding: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #555;
  font-size: 14px;
}

.submit-button {
  width: auto; padding: 12px 50px;
  margin: 16px auto 0 auto; display: block;
  background-color: #2C8A4A; color: white; border: none;
  border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer;
}
</style>