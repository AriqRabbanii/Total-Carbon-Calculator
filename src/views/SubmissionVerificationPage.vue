<script setup lang="ts">
import { ref, computed } from 'vue';

type Status = 'menungguVerifikasi' | 'diterima' | 'ditolak';

interface Submission {
  id: number;
  fullName: string;
  idNumber: string;
  institution: string;
  submissionDate: string;
  status: Status;
}

const submissions = ref<Submission[]>([
  { id: 1, fullName: 'Liam Chen', idNumber: '2308114578990', institution: 'USK', submissionDate: '3 Juni 2025', status: 'menungguVerifikasi' },
  { id: 2, fullName: 'Zoe Kim', idNumber: '2308188790768', institution: 'USK', submissionDate: '3 Juni 2025', status: 'diterima' },
  { id: 3, fullName: 'Noah Tan', idNumber: '2308188790768', institution: 'USK', submissionDate: '3 Juni 2025', status: 'ditolak' },
]);

const getStatusInfo = (status: Status) => {
  switch (status) {
    case 'menungguVerifikasi': return { text: 'Menunggu Verifikasi', color: '#f39c12' };
    case 'diterima': return { text: 'Diterima', color: '#27ae60' };
    case 'ditolak': return { text: 'Ditolak', color: '#e74c3c' };
  }
};
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Verifikasi Pengajuan</h1>
    <div class="submissions-list">
      <div v-for="sub in submissions" :key="sub.id" class="submission-card">
        <div class="info-row"><strong>Nomor:</strong> {{ sub.id }}</div>
        <div class="info-row"><strong>Nama Lengkap:</strong> {{ sub.fullName }}</div>
        <div class="info-row"><strong>NPM/NIP/NIK:</strong> {{ sub.idNumber }}</div>
        <div class="info-row"><strong>Instansi:</strong> {{ sub.institution }}</div>
        <div class="info-row"><strong>Tanggal:</strong> {{ sub.submissionDate }}</div>
        <div class="card-footer">
          <span class="status-badge" :style="{ backgroundColor: getStatusInfo(sub.status).color }">
            {{ getStatusInfo(sub.status).text }}
          </span>
          <router-link :to="{ name: 'SubmissionDetail', params: { id: sub.id } }" class="detail-link">
            Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
}
.page-title {
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  margin-bottom: 20px;
}
.submission-card {
  background-color: rgba(44, 138, 74, 0.9);
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
}
.info-row {
  margin-bottom: 8px;
}
.card-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-badge {
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}
.detail-link {
  color: white;
  text-decoration: underline;
}
</style>