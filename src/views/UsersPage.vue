<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

type Role = 'Pengguna' | 'Admin';

interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: Role;
}

const router = useRouter();
const goBack = () => router.back();

// Data dummy untuk pengguna
const users = ref<User[]>([
  { id: 1, fullName: 'Liam Chen', username: 'liamc22', email: 'liam.chen22@gmail.com', role: 'Pengguna' },
  { id: 2, fullName: 'Zoe Kim', username: 'zoekim_', email: 'zoekim.08@gmail.com', role: 'Pengguna' },
  { id: 3, fullName: 'Noah Tan', username: 'noah_tn', email: 'noah.tan11@gmail.com', role: 'Pengguna' },
]);

</script>

<template>
  <div class="page-wrapper">
    <div class="background-overlay"></div>
    <div class="content-wrapper">
      <header class="page-header">
        <button @click="goBack" class="back-button material-icons">arrow_back</button>
        <span class="header-icon material-icons">groups</span>
        <h1 class="title">Pengguna</h1>
      </header>
      <div class="main-card">
        <div class="search-header">
          <h3>Data Pengguna</h3>
          <div class="search-bar">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Cari...">
          </div>
        </div>
        <div class="users-list">
          <div v-for="(user, index) in users" :key="user.id" class="user-card">
            <div class="info-row"><strong>Nomor:</strong><span>{{ index + 1 }}</span></div>
            <div class="info-row"><strong>Nama Lengkap:</strong><span>{{ user.fullName }}</span></div>
            <div class="info-row"><strong>Username:</strong><span>{{ user.username }}</span></div>
            <div class="info-row"><strong>Email:</strong><span>{{ user.email }}</span></div>
            <div class="info-row"><strong>Hak Akses:</strong><span>{{ user.role }}</span></div>
            <div class="card-footer">
              <button class="btn btn-edit">Edit</button>
              <button class="btn btn-delete">Hapus</button>
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
.search-bar .material-icons { color: #888; }
.search-bar input {
  border: none; outline: none; padding: 10px;
  width: 100%; background: transparent;
}
.users-list {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding-right: 8px;
}
.user-card {
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
.info-row span {
  text-align: right;
}
.card-footer {
  margin-top: 16px;
  display: flex;
  gap: 10px;
}
.btn {
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.btn-edit { background-color: #007bff; }
.btn-delete { background-color: #dc3545; }
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