import { defineStore } from 'pinia';
import { ref, readonly } from 'vue';

export type Tool = 'hand' | 'pen' | 'square' | 'circle' | 'arrow' | 'text' | 'eraser';

export interface ToolState {
  selectedTool: Tool;
  selectedColor: string;
  strokeWidth: number;
  fillColor: string | null;
  opacity: number;
  isDrawing: boolean;
}

export const useToolsStore = defineStore('tools', () => {
  const selectedTool = ref<Tool>('hand');
  const selectedColor = ref('#000000');
  const strokeWidth = ref(2);
  const fillColor = ref<string | null>(null);
  const opacity = ref(1);
  const isDrawing = ref(false);

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#ffc0cb',
    '#a52a2a', '#808080', '#000080', '#008080', '#800000', '#808000'
  ];

  function selectTool(tool: Tool) {
    selectedTool.value = tool;
    console.log('Selected tool:', tool);
  }

  function selectColor(color: string) {
    selectedColor.value = color;
    console.log('Selected color:', color);
  }

  function setStrokeWidth(width: number) {
    strokeWidth.value = width;
  }

  function setFillColor(color: string | null) {
    fillColor.value = color;
  }

  function setOpacity(value: number) {
    opacity.value = Math.max(0, Math.min(1, value));
  }

  function setIsDrawing(drawing: boolean) {
    isDrawing.value = drawing;
  }

  function resetToDefaults() {
    selectedTool.value = 'hand';
    selectedColor.value = '#000000';
    strokeWidth.value = 2;
    fillColor.value = null;
    opacity.value = 1;
    isDrawing.value = false;
  }

  return {
    // State (readonly)
    selectedTool: readonly(selectedTool),
    selectedColor: readonly(selectedColor),
    strokeWidth: readonly(strokeWidth),
    fillColor: readonly(fillColor),
    opacity: readonly(opacity),
    isDrawing: readonly(isDrawing),
    colors,
    
    // Actions
    selectTool,
    selectColor,
    setStrokeWidth,
    setFillColor,
    setOpacity,
    setIsDrawing,
    resetToDefaults,
  };
}); 