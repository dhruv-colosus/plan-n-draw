<template>
  <div class="w-full h-full relative overflow-hidden bg-gray-100">
    <!-- Canvas Container -->
    <div 
      ref="canvasContainer" 
      class="w-full h-full"
      :class="{
        'cursor-grab': toolsStore.selectedTool === 'hand' && !isDraggingCanvas,
        'cursor-grabbing': toolsStore.selectedTool === 'hand' && isDraggingCanvas,
        'cursor-crosshair': toolsStore.selectedTool === 'pen' || ['square', 'circle', 'arrow'].includes(toolsStore.selectedTool),
        'cursor-text': toolsStore.selectedTool === 'text',
        'cursor-not-allowed': toolsStore.selectedTool === 'eraser'
      }"
    >
      <!-- Konva Stage will be mounted here -->
    </div>

    <!-- Zoom Controls -->
    <div class="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col space-y-2">
      <button 
        @click="zoomIn"
        class="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
        :disabled="scale >= MAX_SCALE"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <div class="px-2 py-1 text-xs text-gray-600 text-center">
        {{ Math.round(scale * 100) }}%
      </div>
      <button 
        @click="zoomOut"
        class="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
        :disabled="scale <= MIN_SCALE"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
        </svg>
      </button>
      <button 
        @click="resetZoom"
        class="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors text-xs"
      >
        Reset
      </button>
    </div>

    <!-- Text Input Modal -->
    <div 
      v-if="showTextInput" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click="cancelTextInput"
    >
      <div 
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        @click.stop
      >
        <h3 class="text-lg font-semibold mb-4">Add Text</h3>
        <input
          ref="textInput"
          v-model="textInputValue"
          type="text"
          placeholder="Enter your text..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="confirmTextInput"
          @keyup.escape="cancelTextInput"
        />
        <div class="flex justify-end space-x-2 mt-4">
          <button 
            @click="cancelTextInput"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="confirmTextInput"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Text
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { useToolsStore } from '../stores/tools'
import Konva from 'konva'

const toolsStore = useToolsStore()

// Canvas configuration
const CANVAS_WIDTH = 4000
const CANVAS_HEIGHT = 3000
const MIN_SCALE = 0.1
const MAX_SCALE = 3

// Refs
const canvasContainer = ref<HTMLDivElement>()
const textInput = ref<HTMLInputElement>()

// Konva instances
let stage: Konva.Stage | null = null
let layer: Konva.Layer | null = null
let transformer: Konva.Transformer | null = null

// State
const scale = ref(1)
const isDraggingCanvas = ref(false)
const showTextInput = ref(false)
const textInputValue = ref('')
const pendingTextPosition = ref<{ x: number; y: number } | null>(null)

// Drawing and shape creation state
let isPainting = false
let isCreatingShape = false
let currentLine: Konva.Line | null = null
let currentShape: Konva.Shape | null = null
let startPos: { x: number; y: number } | null = null

// Initialize Konva stage
const initStage = () => {
  if (!canvasContainer.value) return

  const containerWidth = canvasContainer.value.clientWidth
  const containerHeight = canvasContainer.value.clientHeight

  stage = new Konva.Stage({
    container: canvasContainer.value,
    width: containerWidth,
    height: containerHeight,
    x: (containerWidth - CANVAS_WIDTH) / 2,
    y: (containerHeight - CANVAS_HEIGHT) / 2,
    scaleX: scale.value,
    scaleY: scale.value,
    draggable: false
  })

  layer = new Konva.Layer()
  stage.add(layer)

  // Add transformer for drag and resize with stroke preservation
  transformer = new Konva.Transformer({
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'middle-left', 'middle-right'],
    borderStroke: '#2563eb',
    borderStrokeWidth: 2,
    anchorStroke: '#2563eb',
    anchorStrokeWidth: 2,
    anchorSize: 8,
    keepRatio: false
  })
  layer.add(transformer)

  // Add grid
  createGrid()

  // Add event listeners
  setupEventListeners()

  layer.batchDraw()
}

// Create grid background
const createGrid = () => {
  if (!layer) return

  const gridSize = 50
  const gridGroup = new Konva.Group({
    name: 'grid'
  })

  // Vertical lines
  for (let i = 0; i <= CANVAS_WIDTH; i += gridSize) {
    const line = new Konva.Line({
      points: [i, 0, i, CANVAS_HEIGHT],
      stroke: '#e2e8f0',
      strokeWidth: 0.5,
      opacity: 0.3,
      listening: false
    })
    gridGroup.add(line)
  }

  // Horizontal lines
  for (let i = 0; i <= CANVAS_HEIGHT; i += gridSize) {
    const line = new Konva.Line({
      points: [0, i, CANVAS_WIDTH, i],
      stroke: '#e2e8f0',
      strokeWidth: 0.5,
      opacity: 0.3,
      listening: false
    })
    gridGroup.add(line)
  }

  layer.add(gridGroup)
}

// Get stage position relative to canvas coordinates
const getStagePointerPosition = () => {
  if (!stage) return null
  
  const pos = stage.getPointerPosition()
  if (!pos) return null

  return {
    x: (pos.x - stage.x()) / stage.scaleX(),
    y: (pos.y - stage.y()) / stage.scaleY()
  }
}

// Setup event listeners
const setupEventListeners = () => {
  if (!stage || !layer) return

  // Mouse down event
  stage.on('mousedown touchstart', (e) => {
    const currentTool = toolsStore.selectedTool

    // Handle canvas panning with hand tool
    if (currentTool === 'hand') {
      // If clicking on empty canvas, enable canvas dragging
      if (e.target === stage) {
        isDraggingCanvas.value = true
        stage!.draggable(true)
        return
      }
      // If clicking on object, select it for transformation (but not the transformer itself)
      if (e.target.name() !== 'grid' && e.target.getClassName() !== 'Transformer') {
        transformer?.nodes([e.target])
        layer?.batchDraw()
      }
      return
    }

    // Handle eraser tool
    if (currentTool === 'eraser') {
      if (e.target !== stage && e.target.name() !== 'grid' && e.target.getClassName() !== 'Transformer') {
        e.target.destroy()
        transformer?.nodes([])
        layer?.batchDraw()
      }
      return
    }

    // For all other tools, deselect any selected objects first
    if (e.target === stage) {
      transformer?.nodes([])
      layer?.batchDraw()
    }

    const stagePos = getStagePointerPosition()
    if (!stagePos) return

    // Handle pen tool - start drawing
    if (currentTool === 'pen') {
      // Only start drawing on empty canvas, not on existing objects
      if (e.target === stage) {
        isPainting = true
        currentLine = new Konva.Line({
          stroke: toolsStore.selectedColor,
          strokeWidth: toolsStore.strokeWidth,
          globalCompositeOperation: 'source-over',
          lineCap: 'round',
          lineJoin: 'round',
          points: [stagePos.x, stagePos.y],
          name: 'drawing',
          draggable: true
        })
        layer!.add(currentLine)
      }
      return
    }

    // Handle shape creation tools - start creating shape
    if (['square', 'circle', 'arrow'].includes(currentTool)) {
      if (e.target === stage) {
        isCreatingShape = true
        startPos = stagePos
        
        // Create initial shape
        switch (currentTool) {
          case 'square': {
            currentShape = new Konva.Rect({
              x: stagePos.x,
              y: stagePos.y,
              width: 0,
              height: 0,
              stroke: toolsStore.selectedColor,
              strokeWidth: toolsStore.strokeWidth,
              fill: toolsStore.fillColor || 'transparent',
              name: 'shape',
              draggable: true,
              strokeScaleEnabled: false // Preserve stroke width during scaling
            })
            break
          }
          case 'circle': {
            currentShape = new Konva.Ellipse({
              x: stagePos.x,
              y: stagePos.y,
              radiusX: 0,
              radiusY: 0,
              stroke: toolsStore.selectedColor,
              strokeWidth: toolsStore.strokeWidth,
              fill: toolsStore.fillColor || 'transparent',
              name: 'shape',
              draggable: true,
              strokeScaleEnabled: false
            })
            break
          }
          case 'arrow': {
            currentShape = new Konva.Arrow({
              points: [stagePos.x, stagePos.y, stagePos.x, stagePos.y],
              stroke: toolsStore.selectedColor,
              strokeWidth: toolsStore.strokeWidth,
              fill: toolsStore.selectedColor,
              pointerLength: 15,
              pointerWidth: 15,
              name: 'shape',
              draggable: true,
              strokeScaleEnabled: false
            })
            break
          }
        }
        
        if (currentShape) {
          layer!.add(currentShape)
        }
      }
      return
    }

    // Handle text tool
    if (currentTool === 'text' && e.target === stage) {
      showTextInputDialog(stagePos)
      return
    }
  })

  // Mouse move event
  stage.on('mousemove touchmove', () => {
    const stagePos = getStagePointerPosition()
    if (!stagePos) return

    // Handle pen drawing
    if (isPainting && currentLine && toolsStore.selectedTool === 'pen') {
      const newPoints = currentLine.points().concat([stagePos.x, stagePos.y])
      currentLine.points(newPoints)
      layer!.batchDraw()
      return
    }

    // Handle shape creation
    if (isCreatingShape && currentShape && startPos) {
      const currentTool = toolsStore.selectedTool
      
      switch (currentTool) {
        case 'square': {
          const width = stagePos.x - startPos.x
          const height = stagePos.y - startPos.y
          ;(currentShape as Konva.Rect).width(Math.abs(width))
          ;(currentShape as Konva.Rect).height(Math.abs(height))
          currentShape.x(width < 0 ? stagePos.x : startPos.x)
          currentShape.y(height < 0 ? stagePos.y : startPos.y)
          break
        }
        
        case 'circle': {
          const radiusX = Math.abs(stagePos.x - startPos.x) / 2
          const radiusY = Math.abs(stagePos.y - startPos.y) / 2
          ;(currentShape as Konva.Ellipse).radiusX(radiusX)
          ;(currentShape as Konva.Ellipse).radiusY(radiusY)
          currentShape.x(startPos.x + (stagePos.x - startPos.x) / 2)
          currentShape.y(startPos.y + (stagePos.y - startPos.y) / 2)
          break
        }
        
        case 'arrow': {
          ;(currentShape as Konva.Arrow).points([startPos.x, startPos.y, stagePos.x, stagePos.y])
          break
        }
      }
      
      layer!.batchDraw()
    }
  })

  // Mouse up event
  stage.on('mouseup touchend', () => {
    // Handle canvas panning
    if (toolsStore.selectedTool === 'hand') {
      isDraggingCanvas.value = false
      stage!.draggable(false)
      return
    }

    // Handle pen drawing
    if (isPainting && toolsStore.selectedTool === 'pen') {
      isPainting = false
      currentLine = null
      return
    }

    // Handle shape creation
    if (isCreatingShape) {
      isCreatingShape = false
      
      // Remove shape if it's too small (accidental click)
      if (currentShape) {
        const currentTool = toolsStore.selectedTool
        let tooSmall = false
        
        switch (currentTool) {
          case 'square': {
            const rect = currentShape as Konva.Rect
            tooSmall = rect.width() < 5 || rect.height() < 5
            break
          }
          case 'circle': {
            const ellipse = currentShape as Konva.Ellipse
            tooSmall = ellipse.radiusX() < 5 || ellipse.radiusY() < 5
            break
          }
          case 'arrow': {
            const arrow = currentShape as Konva.Arrow
            const points = arrow.points()
            const distance = Math.sqrt(Math.pow(points[2] - points[0], 2) + Math.pow(points[3] - points[1], 2))
            tooSmall = distance < 10
            break
          }
        }
        
        if (tooSmall) {
          currentShape.destroy()
        }
      }
      
      currentShape = null
      startPos = null
      layer!.batchDraw()
    }
  })

  // Click event for object selection
  stage.on('click tap', (e) => {
    // Only handle selection if we're not creating shapes or painting
    if (isCreatingShape || isPainting) return

    const currentTool = toolsStore.selectedTool

    if (currentTool === 'hand') {
      // Select clicked object for transformation (but not the transformer itself)
      if (e.target === stage || e.target.name() === 'grid' || e.target.getClassName() === 'Transformer') {
        transformer?.nodes([])
      } else {
        // Additional safety check to prevent transformer recursion
        if (transformer && e.target && e.target.getClassName() !== 'Transformer') {
          transformer.nodes([e.target])
        }
      }
      layer?.batchDraw()
    }
  })

  // Zoom with mouse wheel
  stage.on('wheel', (e) => {
    e.evt.preventDefault()

    const oldScale = stage!.scaleX()
    const pointer = stage!.getPointerPosition()
    if (!pointer) return

    const mousePointTo = {
      x: (pointer.x - stage!.x()) / oldScale,
      y: (pointer.y - stage!.y()) / oldScale
    }

    let direction = e.evt.deltaY > 0 ? -1 : 1
    const scaleBy = 1.05
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale))
    scale.value = clampedScale

    stage!.scale({ x: clampedScale, y: clampedScale })

    const newPos = {
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale
    }

    stage!.position(newPos)
    stage!.batchDraw()
  })
}

// Text handling
const showTextInputDialog = (pos: { x: number; y: number }) => {
  pendingTextPosition.value = pos
  showTextInput.value = true
  nextTick(() => {
    textInput.value?.focus()
  })
}

const confirmTextInput = () => {
  if (textInputValue.value.trim() && pendingTextPosition.value) {
    addTextAtPosition(pendingTextPosition.value, textInputValue.value.trim())
  }
  cancelTextInput()
}

const addTextAtPosition = (pos: { x: number; y: number }, textContent: string) => {
  if (!layer) return

  const text = new Konva.Text({
    x: pos.x,
    y: pos.y,
    text: textContent,
    fontSize: 18,
    fill: toolsStore.selectedColor,
    fontFamily: 'Arial',
    name: 'text',
    draggable: true
  })

  layer.add(text)
  layer.batchDraw()
}

const cancelTextInput = () => {
  showTextInput.value = false
  textInputValue.value = ''
  pendingTextPosition.value = null
}

// Zoom functions
const zoomIn = () => {
  const newScale = Math.min(MAX_SCALE, scale.value * 1.2)
  scale.value = newScale
  if (stage) {
    stage.scale({ x: newScale, y: newScale })
    stage.batchDraw()
  }
}

const zoomOut = () => {
  const newScale = Math.max(MIN_SCALE, scale.value / 1.2)
  scale.value = newScale
  if (stage) {
    stage.scale({ x: newScale, y: newScale })
    stage.batchDraw()
  }
}

const resetZoom = () => {
  scale.value = 1
  if (stage && canvasContainer.value) {
    const containerWidth = canvasContainer.value.clientWidth
    const containerHeight = canvasContainer.value.clientHeight
    
    stage.scale({ x: 1, y: 1 })
    stage.position({
      x: (containerWidth - CANVAS_WIDTH) / 2,
      y: (containerHeight - CANVAS_HEIGHT) / 2
    })
    stage.batchDraw()
  }
}

// Initialize and cleanup
onMounted(() => {
  nextTick(() => {
    initStage()
    
    // Handle window resize
    const handleResize = () => {
      if (stage && canvasContainer.value) {
        const containerWidth = canvasContainer.value.clientWidth
        const containerHeight = canvasContainer.value.clientHeight
        stage.size({ width: containerWidth, height: containerHeight })
        stage.batchDraw()
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
})

onUnmounted(() => {
  stage?.destroy()
})
</script> 