<template>
  <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">Current Tool State</h3>
    
    <div class="space-y-3">
      <!-- Selected Tool -->
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600">Selected Tool:</span>
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
            <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- Dynamic icon based on selected tool -->
              <path v-if="toolsStore.selectedTool === 'hand'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              <path v-else-if="toolsStore.selectedTool === 'pen'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              <rect v-else-if="toolsStore.selectedTool === 'square'" x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
              <circle v-else-if="toolsStore.selectedTool === 'circle'" cx="12" cy="12" r="9" stroke-width="2"/>
              <path v-else-if="toolsStore.selectedTool === 'arrow'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              <path v-else-if="toolsStore.selectedTool === 'text'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              <path v-else-if="toolsStore.selectedTool === 'eraser'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="text-sm font-medium capitalize text-gray-800">{{ toolsStore.selectedTool }}</span>
        </div>
      </div>

      <!-- Selected Color -->
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600">Selected Color:</span>
        <div class="flex items-center space-x-2">
          <div 
            class="w-6 h-6 rounded border border-gray-300 shadow-sm" 
            :style="{ backgroundColor: toolsStore.selectedColor }"
          ></div>
          <span class="text-sm font-mono text-gray-800">{{ toolsStore.selectedColor }}</span>
        </div>
      </div>

      <!-- Stroke Width -->
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600">Stroke Width:</span>
        <div class="flex items-center space-x-2">
          <input 
            type="range" 
            min="1" 
            max="10" 
            :value="toolsStore.strokeWidth"
            @input="updateStrokeWidth"
            class="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span class="text-sm font-medium text-gray-800 w-6">{{ toolsStore.strokeWidth }}px</span>
        </div>
      </div>

      <!-- Opacity -->
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600">Opacity:</span>
        <div class="flex items-center space-x-2">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            :value="toolsStore.opacity"
            @input="updateOpacity"
            class="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span class="text-sm font-medium text-gray-800 w-8">{{ Math.round(toolsStore.opacity * 100) }}%</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="pt-2 border-t border-gray-200">
        <button 
          @click="toolsStore.resetToDefaults"
          class="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToolsStore } from '../stores/tools'

const toolsStore = useToolsStore()

const updateStrokeWidth = (event: Event) => {
  const target = event.target as HTMLInputElement
  toolsStore.setStrokeWidth(parseInt(target.value))
}

const updateOpacity = (event: Event) => {
  const target = event.target as HTMLInputElement
  toolsStore.setOpacity(parseFloat(target.value))
}
</script> 