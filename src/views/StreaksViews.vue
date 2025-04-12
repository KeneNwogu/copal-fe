<template>
  <div class="flex mt-5">
    <div class="p-4 w-full flex flex-col">
      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>
    
      <div v-if="isLoading" class="flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>

      <div v-else>
        <ReferenceSelector
          :references="references"
          v-model:selectedReference="selectedReference"
          class="w-1/3"
        />

        <div v-if="selectedReference" class="mt-6 flex-1">
          <ProgressOverview
            :drawings="filteredDrawings"
            :reference="selectedReference"
            class="mb-8"
          />

          <DrawingCalendar :drawings="filteredDrawings" />
        </div>
      </div>
    </div>
    <div>
      <DrawingRating />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import api from "@/lib/axios";
import type { Reference } from "@/types";
import ReferenceSelector from "@/components/references/ReferenceSelector.vue";
import ProgressOverview from "@/components/ProgressOverview.vue";
import DrawingCalendar from "@/components/DrawingCalendar.vue";
import DrawingRating from "@/components/drawings/DrawingRating.vue";


const references = ref<Reference[]>([]);
const drawings = ref<Drawing[]>([]);

const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchData = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    const refsResponse = await api.get('/references');
    references.value = refsResponse.data.references;
    // drawings.value = drawingsResponse.data;
  } catch (err) {
    error.value = 'Failed to load data. Please try again.';
    console.error('Error fetching data:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
})

const selectedReference = ref<Reference | null>(null);

const filteredDrawings = computed(() => {
  if (!selectedReference.value) return [];
  return drawings.value.filter(
    (d) => d.referenceId === selectedReference.value?.id
  );
});
</script>
