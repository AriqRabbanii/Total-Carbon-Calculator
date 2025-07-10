<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

defineProps<{
  isOpen: boolean;
  userRole: 'admin' | 'umum';
}>();

const emit = defineEmits(['close']);

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push({ name: 'Login' });
};

// Data untuk item menu
const adminMenu = [
  { name: 'Beranda', icon: 'home', route: 'Dashboard' },
  { name: 'Pengguna', icon: 'groups', route: 'Users' },
  // --- PERUBAHAN DI SINI ---
  { name: 'Verifikasi Alometrik', icon: 'fact_check', route: 'AlometricVerification' },
];

const userMenu = [
    { name: 'Beranda', icon: 'home', route: 'Dashboard' },
    { name: 'Profil', icon: 'person', route: 'Profile' },
    // --- PERUBAHAN DI SINI ---
    { name: 'Pengajuan Alometrik Baru', icon: 'post_add', route: 'NewSubmission' },
    { name: 'Kalkulator', icon: 'calculate', route: 'CalculatorForm' },
    { name: 'Rekapitulasi', icon: 'receipt_long', route: 'RecapList' },
];

</script>

<template>
  <div>
    <div v-if="isOpen" @click="emit('close')" class="drawer-overlay"></div>
    <aside class="drawer" :class="{ open: isOpen }">
      <div class="drawer-header">
        <button @click="emit('close')" class="menu-button material-icons">menu</button>
        <h2 class="drawer-title">Boncar</h2>
      </div>
      <nav class="drawer-nav">
        <template v-if="userRole === 'admin'">
          <router-link v-for="item in adminMenu" :key="item.name" :to="{ name: item.route }" @click="emit('close')">
            <span class="material-icons">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </template>
        
        <template v-if="userRole === 'umum'">
           <router-link v-for="item in userMenu" :key="item.name" :to="{ name: item.route }" @click="emit('close')">
            <span class="material-icons">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </template>
        
        <hr class="divider">
        <a href="#" @click.prevent="handleLogout" class="logout-link">
          <span class="material-icons">logout</span>
          Log Out
        </a>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 998;
}

.drawer {
  position: fixed;
  top: 0;
  left: -280px; /* Lebar drawer */
  width: 280px;
  height: 100%;
  background-color: #2C8A4A;
  color: white;
  box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  transition: left 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.drawer.open {
  left: 0;
}

.drawer-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #2C8A4A;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 28px;
  padding: 0;
  margin-right: 16px;
}

.drawer-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  flex-grow: 1;
}

.drawer-nav a {
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 8px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.drawer-nav a:hover {
  background-color: #25733e;
}

.drawer-nav a .material-icons {
  margin-right: 24px;
  font-size: 24px;
}

.divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: auto 10px 15px 10px;
}

.logout-link {
  font-weight: bold;
}
</style>