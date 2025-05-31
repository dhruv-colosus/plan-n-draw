<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 class="mt-4 text-lg font-medium text-gray-900">
            {{ statusMessage }}
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            Please wait while we complete your login...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const router = useRouter();
const route = useRoute();
const { refreshAuth, isAuthenticated } = useAuth();
const statusMessage = ref('Completing your login...');

onMounted(async () => {
  try {
    // Check for error in URL params
    if (route.query.error) {
      statusMessage.value = 'Login failed. Redirecting...';
      setTimeout(() => {
        router.push('/login?error=' + route.query.error);
      }, 2000);
      return;
    }

    // Wait a moment for the server to set the cookie
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Refresh authentication state
    await refreshAuth();
    
    if (isAuthenticated.value) {
      statusMessage.value = 'Login successful! Redirecting...';
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      statusMessage.value = 'Login failed. Redirecting...';
      setTimeout(() => {
        router.push('/login?error=auth_failed');
      }, 2000);
    }
  } catch (error) {
    console.error('Auth callback error:', error);
    statusMessage.value = 'Login failed. Redirecting...';
    setTimeout(() => {
      router.push('/login?error=auth_failed');
    }, 2000);
  }
});
</script> 