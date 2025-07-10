import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/new-submission',
    name: 'NewSubmission',
    component: () => import('@/views/NewSubmissionPage.vue'),
    meta: { requiresAuth: true }
  },
  // --- PENAMBAHAN RUTE REKAPITULASI ---
  {
    path: '/recapitulation',
    name: 'RecapList',
    component: () => import('@/views/RecapListPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/recapitulation/:id',
    name: 'RecapDetail',
    component: () => import('@/views/RecapDetailPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  // --- NAMA RUTE LAMA DIGANTI DENGAN YANG BARU ---
  {
    path: '/alometric-verification',
    name: 'AlometricVerification', // Menggunakan nama ini
    component: () => import('@/views/AlometricVerificationPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/submission/:id',
    name: 'SubmissionDetail',
    component: () => import('@/views/SubmissionDetailPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  // --- PENAMBAHAN RUTE KALKULATOR ---
  {
    path: '/calculator/form',
    name: 'CalculatorForm',
    component: () => import('@/views/CalculatorFormPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calculator/tree-input',
    name: 'TreeInput',
    component: () => import('@/views/TreeInputPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calculator/results',
    name: 'CalculatorResults',
    component: () => import('@/views/CalculatorResultsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: { guestOnly: true }
  },
  // --- PENAMBAHAN RUTE BARU DI SINI ---
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
    {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  // --- PENAMBAHAN RUTE BARU DI SINI ---
  {
    path: '/new-submission',
    name: 'NewSubmission',
    component: () => import('@/views/NewSubmissionPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/submission-verification',
    name: 'SubmissionVerification',
    component: () => import('@/views/SubmissionVerificationPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/submission/:id',
    name: 'SubmissionDetail',
    component: () => import('@/views/SubmissionDetailPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.user?.role;

  if (to.meta.requiresAdmin && userRole !== 'admin') {
    next({ name: 'Dashboard' });
  }
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } 
  else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'Dashboard' });
  } 
  else {
    next();
  }
});

export default router;