<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store/auth';

// Komponen-komponen spesifik untuk setiap peran
import AdminDashboard from '@/components/AdminDashboard.vue';
import UserDashboard from '@/components/UserDashboard.vue';
import AppDrawer from '@/components/AppDrawer.vue';

const authStore = useAuthStore();
const drawerOpen = ref(false);

// Tentukan peran pengguna dari store
const userRole = computed(() => authStore.user?.role || 'umum');

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

// Mengubah data user menjadi admin untuk keperluan demo
const switchToAdmin = () => {
  if (authStore.user) authStore.user.role = 'admin';
};

const switchToUser = () => {
  if (authStore.user) authStore.user.role = 'umum';
}
</script>

<template>
  <div class="dashboard-layout">
    <div class="demo-switchers">
      <button @click="switchToUser">Lihat sbg User</button>
      <button @click="switchToAdmin">Lihat sbg Admin</button>
    </div>
    
    <AppDrawer :is-open="drawerOpen" :user-role="userRole" @close="drawerOpen = false" />
    
    <div class="main-content">
      <header class="main-header">
        <button @click="toggleDrawer" class="menu-button">☰</button>
        <h1 class="header-title">Beranda</h1>
      </header>
      
      <main class="content-area">
        <AdminDashboard v-if="userRole === 'admin'" />
        <UserDashboard v-else />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #f4f7f6;
}

.main-content {
  transition: margin-left 0.3s;
}

.main-header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #333;
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 16px;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
}

.content-area {
  padding: 24px;
  background-image: url('@/assets/images/forest_background.jpg');
  background-size: cover;
  background-attachment: fixed;
  min-height: calc(100vh - 73px);
  position: relative;
}

.content-area::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
}

.demo-switchers {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  background: rgba(255,255,255,0.8);
  padding: 5px;
  border-radius: 5px;
}
.demo-switchers button {
  margin: 0 5px;
}

</style>