<template>
    <div class="bg-white rounded-xl shadow p-4 w-full">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold">
          Progress for "{{ reference.title }}"
        </h2>
        <span class="text-sm text-gray-500">
          Last drawn: {{ lastDateDisplay || 'Never' }}
        </span>
      </div>
  
      <div class="mb-2 text-sm">
        <span class="font-medium">{{ completed }}</span> of 
        <span class="font-medium">{{ reference.iterationTarget }}</span> drawings completed
      </div>
  
      <div class="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          class="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300"
          :style="{ width: progressPercent + '%' }"
        />
      </div>
  
      <div class="text-sm text-green-600">
        🔥 {{ streak }}-day streak
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { Drawing, Reference } from '@/types'
  
  const props = defineProps<{
    reference: Reference
    drawings: Drawing[]
  }>()
  
  // Sort and get unique drawing days
  const drawingDates = computed(() => {
    return [...new Set(props.drawings.map(d => d.createdAt.slice(0, 10)))].sort()
  })
  
  // Count total drawings
  const completed = computed(() => drawingDates.value.length)
  
  // Progress percent
  const progressPercent = computed(() => {
    return Math.min(100, (completed.value / props.reference.iterationTarget) * 100)
  })
  
  // Get last drawing date
  const lastDateDisplay = computed(() => {
    const last = drawingDates.value[drawingDates.value.length - 1];
    return last ? new Date(last).toDateString() : null
  })
  
  // Calculate streak (consecutive days, ending today or yesterday)
  const streak = computed(() => {
    let count = 0
    let today = new Date()
    today.setHours(0, 0, 0, 0)
  
    const dates = new Set(drawingDates.value)
  
    for (let i = 0; i < 365; i++) {
      const iso = today.toISOString().slice(0, 10)
      if (dates.has(iso)) {
        count++
        today.setDate(today.getDate() - 1)
      } else {
        break
      }
    }
  
    return count
  })
  </script>
  