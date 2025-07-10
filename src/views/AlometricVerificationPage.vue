<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

type Status = 'pending' | 'approved' | 'rejected';

interface Submission {
  id: number;
  fullName: string;
  nik: string;
  institution: string;
  phone: string;
  date: string;
  status: Status;
}

const router = useRouter();
const goBack = () => router.back();

// Data dummy untuk pengajuan
const submissions = ref<Submission[]>([
  { id: 1, fullName: 'Liam Chen', nik: '2308114578990', institution: 'USK', phone: '08xxxxxxx', date: '3 Juni 2025', status: 'pending' },
  { id: 2, fullName: 'Zoe Kim', nik: '2308188790768', institution: 'USK', phone: '08xxxxxxx', date: '3 Juni 2025', status: 'approved' },
  { id: 3, fullName: 'Noah Tan', nik: '2308188790768', institution: 'USK', phone: '08xxxxxxx', date: '3 Juni 2025', status: 'rejected' },
]);

// Helper untuk gaya dan teks status
const getStatusInfo = (status: Status) => {
  switch (status) {
    case 'pending': return { text: 'Menunggu Verifikasi', color: '#f39c12' };
    case 'approved': return { text: 'Diterima', color: '#27ae60' };
    case 'rejected': return { text: 'Ditolak', color: '#e74c3c' };
  }
};
</script>

<template>
  <div class="page-wrapper">
    <div class="background-overlay"></div>
    <div class="content-wrapper">
      <header class="page-header">
        <button @click="goBack" class="back-button material-icons">arrow_back</button>
        <span class="header-icon material-icons">fact_check</span>
        <h1 class="title">Verifikasi Alometrik</h1>
      </header>
      <div class="main-card">
        <div class="search-header">
          <h3>Data Pengajuan</h3>
          <div class="search-bar">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Cari...">
          </div>
        </div>
        <div class="submissions-list">
          <div v-for="sub in submissions" :key="sub.id" class="submission-card">
            <div class="info-row"><strong>Nomor:</strong><span>{{ sub.id }}</span></div>
            <div class="info-row"><strong>Nama Lengkap:</strong><span>{{ sub.fullName }}</span></div>
            <div class="info-row"><strong>NPM/NIP/NIK:</strong><span>{{ sub.nik }}</span></div>
            <div class="info-row"><strong>Instansi/Institusi:</strong><span>{{ sub.institution }}</span></div>
            <div class="info-row"><strong>Nomor HP:</strong><span>{{ sub.phone }}</span></div>
            <div class="info-row"><strong>Tanggal Pengajuan:</strong><span>{{ sub.date }}</span></div>
            <div class="card-footer">
              <span class="status-badge" :style="{ backgroundColor: getStatusInfo(sub.status).color }">
                {{ getStatusInfo(sub.status).text }}
              </span>
              <a href="#" class="detail-link">Detail</a>
            </div>
          </div>
        </div>
        <div class="pagination">
          <a href="#">&lt;&lt; Previous</a>
          <span>1 2 3 ... 7 8 9</span>
          <a href="#">Next &gt;&gt;</a>
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
  display: flex; align-items: center; padding-bottom: 16px; color: white; gap: 12px;
}
.title { font-size: 20px; font-weight: bold; margin: 0; }
.header-icon { font-size: 28px; }
.back-button {
  background: none; border: none; color: white;
  font-size: 24px; cursor: pointer;
}
.main-card {
  padding: 16px; background-color: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
}
.search-header {
  margin-bottom: 16px;
}
.search-header h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}
.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 0 16px;
  border: 1px solid #ddd;
}
.search-bar .material-icons {
  color: #888;
}
.search-bar input {
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
  background: transparent;
}
.submissions-list {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding-right: 8px;
}
.submission-card {
  background-color: #2C8A4A;
  color: white;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 16px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}
.card-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}
.detail-link {
  color: white;
  text-decoration: underline;
  font-size: 14px;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px 8px 8px;
  color: #333;
  font-size: 14px;
}
.pagination a {
  color: #2C8A4A;
  font-weight: bold;
  text-decoration: none;
}
</style>