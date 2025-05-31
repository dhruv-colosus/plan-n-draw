<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Welcome to PlanDraw</h2>
        <p class="mt-2 text-sm text-gray-600">
          Create beautiful diagrams and collaborate with your team
        </p>
      </div>
      
      <div class="bg-white py-8 px-6 shadow-xl rounded-lg">
        <div class="space-y-6">
          <div>
            <button
              @click="handleGoogleLogin"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-gray-500 group-hover:text-gray-400" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </span>
              {{ isLoading ? 'Signing in...' : 'Continue with Google' }}
            </button>
          </div>
          
          <div class="text-center">
            <p class="text-xs text-gray-500">
              By continuing, you agree to our 
              <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
              and 
              <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <p class="text-sm text-gray-600">
          New to PlanDraw? Your account will be created automatically.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const isLoading = ref(false);

const handleGoogleLogin = async () => {
  isLoading.value = true;
  try {
    await authStore.login();
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script> 