import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LoginPage from '../pages/LoginPage.vue';
import MainCanvas from '../pages/protected/MainCanvas.vue';
import CallbackPage from '../pages/auth/CallbackPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainCanvas
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: CallbackPage,
      meta: { requiresGuest: true }
    }
  ]
});

// Global navigation guard
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  
  // Check authentication status
  const isAuthenticated = await authStore.checkAuth();
  
  // Handle routes that require guest (not authenticated)
  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'home' };
  }
  
  // Note: We don't redirect to login for non-authenticated users
  // The ProtectedLayout will handle showing appropriate UI for both states
});

export default router; 