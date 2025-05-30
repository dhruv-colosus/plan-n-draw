<script setup lang="ts">
import { Button } from '@/components/ui/button';
const handleClick=()=>{
  console.log("clicked");
}

</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
     <RouterLink to="/about"> <Button @click="handleClick">About me</Button></RouterLink>

  </div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
