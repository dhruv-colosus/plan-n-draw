<script setup lang="ts">
import { Button } from './ui/button';
import { ref } from 'vue';
import { useHelloGreeting, useHello } from '../composables/useTrpc';

const name = ref('');
const handleClick = () => {
  console.log("clicked");
}

// Use tRPC hooks
const { data: greeting, isLoading: greetingLoading, error: greetingError } = useHelloGreeting();
const { data: personalGreeting, isLoading: personalLoading, error: personalError } = useHello(name);
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center p-8 space-y-6">
    <!-- tRPC Demo Section -->
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">tRPC Demo</h2>
      
      <!-- Simple Greeting -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Simple Greeting:</h3>
        <div v-if="greetingLoading" class="text-blue-500">Loading...</div>
        <div v-else-if="greetingError" class="text-red-500">Error: {{ greetingError.message }}</div>
        <div v-else-if="greeting" class="text-green-600 font-medium">
          {{ greeting.message }}
          <div class="text-sm text-gray-500">{{ new Date(greeting.timestamp).toLocaleString() }}</div>
        </div>
      </div>

      <!-- Personal Greeting -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Personal Greeting:</h3>
        <input 
          v-model="name" 
          type="text" 
          placeholder="Enter your name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        />
        <div v-if="personalLoading" class="text-blue-500">Loading...</div>
        <div v-else-if="personalError" class="text-red-500">Error: {{ personalError.message }}</div>
        <div v-else-if="personalGreeting" class="text-green-600 font-medium">
          {{ personalGreeting.message }}
          <div class="text-sm text-gray-500">{{ new Date(personalGreeting.timestamp).toLocaleString() }}</div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex space-x-4">
      <RouterLink to="/about">
        <Button @click="handleClick" class="bg-blue-500 hover:bg-blue-600 text-white">
          About me
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
