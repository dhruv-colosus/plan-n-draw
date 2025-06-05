<template>
  <ProtectedLayout>
    <div class="h-screen w-full bg-gray-50 relative overflow-hidden">
      <!-- Main Canvas Area -->
      <DrawingCanvas />
    </div>
  </ProtectedLayout>
</template>

<script setup lang="ts">
import ProtectedLayout from '../../layouts/ProtectedLayout.vue'
import DrawingCanvas from '../../components/DrawingCanvas.vue'
</script>

