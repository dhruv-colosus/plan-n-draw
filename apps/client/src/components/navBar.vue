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
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'hand' }"
            @click="toolsStore.selectTool('hand')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 113 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">1</span>
          </Button>

          <!-- Pen Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'pen' }"
            @click="toolsStore.selectTool('pen')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">2</span>
          </Button>

          <!-- Square Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'square' }"
            @click="toolsStore.selectTool('square')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
            </svg>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">3</span>
          </Button>

          <!-- Circle Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'circle' }"
            @click="toolsStore.selectTool('circle')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke-width="2"/>
            </svg>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">4</span>
          </Button>

          <!-- Arrow Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'arrow' }"
            @click="toolsStore.selectTool('arrow')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">5</span>
          </Button>

          <!-- Text Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'text' }"
            @click="toolsStore.selectTool('text')"
          >
            <span class="text-sm font-semibold">Aa</span>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">6</span>
          </Button>

          <!-- Eraser Tool -->
          <Button 
            variant="ghost" 
            size="sm" 
            class="p-1.5 hover:bg-gray-100 cursor-pointer relative"
            :class="{ 'bg-primary text-white hover:bg-primary/90': toolsStore.selectedTool === 'eraser' }"
            @click="toolsStore.selectTool('eraser')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="absolute -bottom-0.5 -right-0.5 text-xs opacity-40 bg-white rounded px-0.5">7</span>
          </Button>

          <!-- Color Picker -->
          <div class="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              class="p-1.5 hover:bg-gray-100 relative cursor-pointer"
              @click="showColorPicker = !showColorPicker"
            >
              <div class="w-4 h-4 rounded border border-gray-300" :style="{ backgroundColor: toolsStore.selectedColor }"></div>
            </Button>
            
            <!-- Color Palette -->
            <div v-if="showColorPicker" class="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
              <div class="grid grid-cols-6 gap-2">
                <div 
                  v-for="color in toolsStore.colors" 
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
              v-for="tool in ['hand', 'pen', 'square', 'circle', 'arrow', 'text', 'eraser']"
              :key="tool"
              variant="ghost" 
              size="sm" 
              class="p-2 cursor-pointer"
              :class="{ 'bg-primary text-white': toolsStore.selectedTool === tool }"
              @click="toolsStore.selectTool(tool as any)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="tool === 'hand'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                <path v-else-if="tool === 'pen'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                <rect v-else-if="tool === 'square'" x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                <circle v-else-if="tool === 'circle'" cx="12" cy="12" r="9" stroke-width="2"/>
                <path v-else-if="tool === 'arrow'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                <path v-else-if="tool === 'text'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                <path v-else-if="tool === 'eraser'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span v-if="tool === 'text'" class="text-xs font-semibold">Aa</span>
            </Button>
          </div>

          <!-- Mobile Color Picker -->
          <div class="grid grid-cols-8 gap-2">
            <div 
              v-for="color in toolsStore.colors" 
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
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from './ui/button'
import { useToolsStore } from '../stores/tools'

const toolsStore = useToolsStore()

const isMobileMenuOpen = ref(false)
const showColorPicker = ref(false)

// Keyboard shortcuts mapping
const toolKeyMap: Record<string, string> = {
  '1': 'hand',
  '2': 'pen', 
  '3': 'square',
  '4': 'circle',
  '5': 'arrow',
  '6': 'text',
  '7': 'eraser'
}

const selectColor = (color: string) => {
  toolsStore.selectColor(color)
  showColorPicker.value = false
}

// Handle keyboard shortcuts
const handleKeyDown = (event: KeyboardEvent) => {
  // Only trigger if no input elements are focused and no modifiers are pressed
  if (event.target instanceof HTMLInputElement || 
      event.target instanceof HTMLTextAreaElement ||
      event.ctrlKey || event.metaKey || event.altKey) {
    return
  }

  const tool = toolKeyMap[event.key]
  if (tool) {
    event.preventDefault()
    toolsStore.selectTool(tool as any)
  }
}

// Close color picker when clicking outside
const closeColorPicker = () => {
  showColorPicker.value = false
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  
  // Add click outside listener for color picker
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    if (!target?.closest('.relative')) {
      closeColorPicker()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script> 