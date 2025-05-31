<template>
  <nav class="w-auto inline-block">
    <div class="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-2 py-1">
      <div class="flex items-center justify-center">
        <!-- Drawing Tools - Always visible -->
        <div class="flex items-center space-x-1">
          <!-- Hand Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-primary text-white hover:bg-primary/90': selectedTool === 'hand' }"
            @click="selectTool('hand')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </Button>

          <!-- Square Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-primary text-white hover:bg-primary/90': selectedTool === 'square' }"
            @click="selectTool('square')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
            </svg>
          </Button>

          <!-- Circle Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-primary text-white hover:bg-primary/90': selectedTool === 'circle' }"
            @click="selectTool('circle')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke-width="2"/>
            </svg>
          </Button>

          <!-- Arrow Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-primary text-white hover:bg-primary/90': selectedTool === 'arrow' }"
            @click="selectTool('arrow')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>

          <!-- Text Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-primary text-white hover:bg-primary/90': selectedTool === 'text' }"
            @click="selectTool('text')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </Button>

          <!-- Color Picker -->
          <div class="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              class="p-1.5 hover:bg-gray-100 relative cursor-pointer"
              @click="showColorPicker = !showColorPicker"
            >
              <div class="w-4 h-4 rounded border border-gray-300" :style="{ backgroundColor: selectedColor }"></div>
            </Button>
            
            <!-- Color Palette -->
            <div v-if="showColorPicker" class="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
              <div class="grid grid-cols-6 gap-2">
                <div 
                  v-for="color in colors" 
                  :key="color"
                  class="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:scale-110 transition-transform"
                  :style="{ backgroundColor: color }"
                  @click="selectColor(color)"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden absolute right-2">
          <Button 
            variant="ghost" 
            size="icon" 
            class="p-1 cursor-pointer"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg 
              class="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </Button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden mt-2 pt-2 border-t border-gray-200"
      >
        <div class="flex flex-col space-y-2">
          <!-- Mobile Drawing Tools -->
          <div class="grid grid-cols-5 gap-2 mb-2">
            <Button 
              v-for="tool in ['hand', 'square', 'circle', 'arrow', 'text']"
              :key="tool"
              variant="ghost" 
              size="sm" 
              class="p-2 cursor-pointer"
              :class="{ 'bg-primary text-white': selectedTool === tool }"
              @click="selectTool(tool)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Tool icons would go here -->
              </svg>
            </Button>
          </div>

          <!-- Mobile Color Picker -->
          <div class="grid grid-cols-8 gap-2">
            <div 
              v-for="color in colors" 
              :key="color"
              class="w-6 h-6 rounded cursor-pointer border border-gray-200"
              :style="{ backgroundColor: color }"
              @click="selectColor(color)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './ui/button'

const isMobileMenuOpen = ref(false)
const showColorPicker = ref(false)
const selectedTool = ref('hand')
const selectedColor = ref('#000000')

const colors = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
  '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#ffc0cb',
  '#a52a2a', '#808080', '#000080', '#008080', '#800000', '#808000'
]

const selectTool = (tool: string) => {
  selectedTool.value = tool
  console.log('Selected tool:', tool)
}

const selectColor = (color: string) => {
  selectedColor.value = color
  showColorPicker.value = false
  console.log('Selected color:', color)
}

// Close color picker when clicking outside
const closeColorPicker = () => {
  showColorPicker.value = false
}

// Add click outside listener
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    if (!target?.closest('.relative')) {
      closeColorPicker()
    }
  })
}
</script> 