<template>
    <div class="w-full">
      <div class="flex justify-between items-center mb-4">
        <button @click="prevMonth" 
          class="text-sm text-gray-500 hover:text-black"
          :disabled="isPrevBtnDisabled"
          :class="{ 'opacity-0': isPrevBtnDisabled }"
          :style="{
            cursor: isPrevBtnDisabled ? 'none' : 'pointer',
            pointerEvents: isPrevBtnDisabled ? 'none' : 'auto',
          }"
        >
          ← Previous
        </button>
        <h3 class="text-lg font-semibold">
          {{ monthLabel }}
        </h3>
        <button @click="nextMonth" class="text-sm text-gray-500 hover:text-black">
          Next →
        </button>
      </div>
  
      <div class="grid grid-cols-7 gap-1 text-sm text-center text-gray-500 mb-1">
        <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      </div>
  
      <div class="grid grid-cols-7 gap-1">
        <div v-for="blank in leadingEmptyDays" :key="'blank-' + blank" class="h-14"></div>
  
        <button
          v-for="day in daysInMonth"
          :key="day"
          class="h-14 rounded-lg flex items-center justify-center cursor-default transition-all"
          :class="{
            'bg-indigo-500 text-white': isDrawingDay(day),
            'hover:bg-indigo-100': !isDrawingDay(day),
          }"
          :disabled="!isDrawingDay(day)"
        >
          {{ day }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { Drawing } from '@/types'
  
  const props = defineProps<{
    drawings: Drawing[]
  }>()
  
  const today = new Date()
  const currentMonth = ref(today.getMonth())
  const currentYear = ref(today.getFullYear())
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const monthLabel = computed(() => {
    return new Date(currentYear.value, currentMonth.value).toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    })
  })
  
  const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  })
  
  const leadingEmptyDays = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay()
  })
  
  // Drawing dates for lookup
  const drawingSet = computed(() => {
    return new Set(
      props.drawings.map(d => new Date(d.createdAt).toISOString().slice(0, 10))
    )
  })
  
  const isDrawingDay = (day: number) => {
    const date = new Date(currentYear.value, currentMonth.value, day)
    const iso = date.toISOString().slice(0, 10)
    return drawingSet.value.has(iso)
  }

  const sortedDrawings = computed(() => {
    return props.drawings.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  })

  // previous button is disabled for the earliest month
  const isPrevBtnDisabled = computed(() => {
    let earliestMonth = sortedDrawings.value[0]?.createdAt || today;
    earliestMonth = new Date(earliestMonth);
    return earliestMonth.getMonth() === currentMonth.value && earliestMonth.getFullYear() === currentYear.value;
  })
  
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value += 1
    } else {
      currentMonth.value++
    }
  }
  
  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value -= 1
    } else {
      currentMonth.value--
    }
  }
  </script>
  