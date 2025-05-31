<template>
  <div class="min-h-screen bg-gray-50">
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-4/5 max-w-6xl flex items-center gap-4">
      <div class="flex flex-1 justify-center items-center">
        <NavbarComponent />
      </div>
      
      <div class="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          class="px-3 py-2 shadow-md backdrop-blur-md border border-gray-200 rounded-xl cursor-pointer"
          @click="handleShare"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share
        </Button>
        
        <!-- Show login button when not authenticated -->
        <Button 
          v-if="!authStore.isAuthenticated"
          variant="default" 
          size="sm" 
          class="px-4 py-2 shadow-md backdrop-blur-md border border-gray-200 rounded-xl cursor-pointer"
          @click="handleLogin"
        >
          Login
        </Button>
        
        <!-- Show user menu when authenticated -->
        <div v-else class="relative">
          <Button 
            variant="default" 
            size="sm" 
            class="px-4 py-2 shadow-md backdrop-blur-md border border-gray-200 rounded-xl cursor-pointer"
            @click="showUserMenu = !showUserMenu"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ authStore.user?.name?.split(' ')[0] || 'User' }}
          </Button>
          
          <!-- User dropdown -->
          <div v-if="showUserMenu" class="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px] z-10">
            <div v-if="authStore.user" class="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
              {{ authStore.user.email }}
            </div>
            <button 
              @click="handleLogout"
              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <main class="pt-20">
      <slot />
    </main>
    
    <!-- Click outside to close user menu -->
    <div
      v-if="showUserMenu"
      @click="showUserMenu = false"
      class="fixed inset-0 z-0"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import NavbarComponent from '../components/navBar.vue'
import { Button } from '../components/ui/button'

const router = useRouter()
const authStore = useAuthStore()
const showUserMenu = ref(false)

const handleLogin = () => {
  router.push('/login')
}

const handleShare = () => {
  console.log('Share button clicked')
  // TODO: Implement share functionality
}

const handleLogout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  // Stay on the same page after logout
}
</script> 