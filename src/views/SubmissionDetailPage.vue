<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Data dummy. Di aplikasi nyata, ini akan diambil dari API.
const dummySubmissions = [
  { id: 1, fullName: 'Liam Chen', idNumber: '2308114578990', institution: 'USK', phoneNumber: '08xxxxxxx', submissionDate: '3 Juni 2025' },
  { id: 2, fullName: 'Zoe Kim', idNumber: '2308188790768', institution: 'USK', phoneNumber: '08xxxxxxx', submissionDate: '3 Juni 2025' },
  { id: 3, fullName: 'Noah Tan', idNumber: '2308188790768', institution: 'USK', phoneNumber: '08xxxxxxx', submissionDate: '3 Juni 2025' },
];

const route = useRoute();
const submissionId = computed(() => Number(route.params.id));

// Cari submission berdasarkan ID dari route
const submission = ref(dummySubmissions.find(s => s.id === submissionId.value));
</script>

<template>
  <div class="page-container">
    <div v-if="submission">
      <h1 class="page-title">Detail Pengajuan #{{ submission.id }}</h1>
      <div class="detail-layout">
        <div class="notes-section">
          <div class="file-icon">📁</div>
          <div class="notes-card">
            <h4>Catatan:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div class="details-card">
          <div class="detail-item">
            <label>Nama</label>
            <div class="value-box">{{ submission.fullName }}</div>
          </div>
          <div class="detail-item">
            <label>NPM/NIP/NIK</label>
            <div class="value-box">{{ submission.idNumber }}</div>
          </div>
          <div class="detail-item">
            <label>Instansi/Institusi</label>
            <div class="value-box">{{ submission.institution }}</div>
          </div>
          <div class="detail-item">
            <label>Tanggal Upload</label>
            <div class="value-box">{{ submission.submissionDate }}</div>
          </div>
          <div class="action-buttons">
            <button class="btn btn-approve">Terima</button>
            <button class="btn btn-reject">Tolak</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      <h1>Pengajuan tidak ditemukan.</h1>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
}
.page-title {
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  margin-bottom: 20px;
}
.notes-section {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}
.file-icon {
  font-size: 50px;
  color: white;
}
.notes-card {
  background: rgba(255,255,255,0.9);
  padding: 15px;
  border-radius: 10px;
  flex-grow: 1;
}
.details-card {
  background-color: rgba(44, 138, 74, 0.9);
  padding: 30px;
  border-radius: 20px;
}
.detail-item {
  margin-bottom: 16px;
}
.detail-item label {
  color: white;
  display: block;
  margin-bottom: 5px;
}
.value-box {
  background-color: white;
  color: #333;
  padding: 12px 16px;
  border-radius: 10px;
}
.action-buttons {
  margin-top: 30px;
  text-align: right;
}
.btn {
  padding: 12px 30px;
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
}
.btn-approve { background-color: #27ae60; margin-right: 10px; }
.btn-reject { background-color: #e74c3c; }
.not-found {
  color: white; text-align: center; padding-top: 50px;
}
</style>