<template>
  <div class="p-4 w-full flex flex-col">
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

      <DrawingCalendar :drawings="filteredDrawings"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Drawing, Reference } from "@/types";
import ReferenceSelector from "@/components/references/ReferenceSelector.vue";
import ProgressOverview from "@/components/ProgressOverview.vue";
import DrawingCalendar from "@/components/DrawingCalendar.vue";

const references = ref<Reference[]>([
    {id: "1", title: "Reference 1", iterationTarget: 30},
    {id: "2", title: "Reference 2", iterationTarget: 30},
]); // Fetched from API
const drawings = ref<any[]>([]); // Also fetched

const selectedReference = ref<Reference | null>(null);

const filteredDrawings = computed(() => {
  if (!selectedReference.value) return [];
  return drawings.value.filter(
    (d) => d.referenceId === selectedReference.value?.id
  );
});
</script>
