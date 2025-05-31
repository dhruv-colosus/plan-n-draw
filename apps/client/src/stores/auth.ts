import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { authService, type User } from '../services/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => user.value !== null);

  async function login() {
    await authService.login();
  }

  async function logout() {
    isLoading.value = true;
    try {
      await authService.logout();
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUser() {
    isLoading.value = true;
    try {
      user.value = await authService.getCurrentUser();
    } finally {
      isLoading.value = false;
    }
  }

  async function checkAuth() {
    const authenticated = await authService.checkAuth();
    if (authenticated && !user.value) {
      await fetchUser();
    }
    return authenticated;
  }

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    isAuthenticated,
    login,
    logout,
    fetchUser,
    checkAuth,
  };
}); 