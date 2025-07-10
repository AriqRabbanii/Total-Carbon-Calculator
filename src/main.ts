// PERUBAHAN DI SINI: Impor CSS Global
import '@/assets/css/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');

import { useAuthStore } from './store/auth';
const authStore = useAuthStore();
authStore.fetchUser();