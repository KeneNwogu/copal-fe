<script setup lang="ts">
import { computed } from 'vue'
import type { Reference } from '@/types'

const props = defineProps<{
  references: Reference[]
  selectedReference: Reference | null
}>()

const emit = defineEmits<{
  (e: 'update:selectedReference', value: Reference | null): void
}>()

// Use internal ID for binding since objects can't be v-modeled in a select
const internalSelectedId = computed({
  get: () => props.selectedReference?.id ?? '',
  set: (id: string) => {
    const selected = props.references.find(ref => ref.id === id) || null
    emit('update:selectedReference', selected)
  }
})
</script>


<template>
    <div class="w-full max-w-md">
      <label for="reference" class="block text-sm font-medium text-gray-700 mb-1">
        Select a Reference
      </label>
      <select
        id="reference"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        v-model="internalSelectedId"
      >
        <option disabled value="">-- Choose a reference --</option>
        <option v-for="ref in references" :key="ref.id" :value="ref.id">
          {{ ref.title }}
        </option>
      </select>
    </div>
  </template>
  
 