<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import api from "@/lib/axios";
import type { Drawing, Reference } from "@/types";
import ReferenceSelector from "@/components/references/ReferenceSelector.vue";
import ProgressOverview from "@/components/ProgressOverview.vue";
import DrawingCalendar from "@/components/DrawingCalendar.vue";
import DrawingRating from "@/components/drawings/DrawingRating.vue";
import DrawingUpload from "@/components/drawings/DrawingUpload.vue";

const references = ref<Reference[]>([]);
const drawings = ref<Drawing[]>([]);

const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const refsResponse = await api.get("/references");
    references.value = refsResponse.data.references;
  } catch (err) {
    error.value = "Failed to load data. Please try again.";
    console.error("Error fetching data:", err);
  } finally {
    isLoading.value = false;
  }
};

const fetchDrawings = async (referenceId: string) => {
  try {
    isLoading.value = true;
    error.value = null;

    const drawingsResponse = await api.get(
      `/drawings?reference=${referenceId}`
    );
    drawings.value = drawingsResponse.data.drawings;
  } catch (err) {
    error.value = "Failed to load drawings. Please try again.";
    console.error("Error fetching drawings:", err);
  } finally {
    isLoading.value = false;
  }
};

const selectedReference = ref<Reference | null>(null);
const selectedDrawing = ref<Drawing | null>(null);
const selectedDay = ref<string | null>(null);

watch(selectedReference, (newRef) => {
  if (newRef) {
    fetchDrawings(newRef._id!);
    selectedDrawing.value = null;
    selectedDay.value = null;
  } else {
    drawings.value = [];
  }
});

onMounted(() => {
  fetchData();
});

// const filteredDrawings = computed(() => {
//   if (!selectedReference.value) return [];
//   return drawings.value.filter(
//     (d: Drawing) => d.referenceId === selectedReference.value?._id
//   );
// });

const showDrawingProgress = (drawing: Drawing) => {
  // filter drawing to get day
  selectedDrawing.value = drawing;
  selectedDay.value = null;
};

const showUploadForm = (day: string) => {
  selectedDrawing.value = null;
  selectedDay.value = day;
};
</script>

<template>
  <div class="flex flex-col lg:flex-row mt-5 gap-9">
    <div class="p-4 w-full lg:w-[60%] flex flex-col">
      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <div v-if="isLoading" class="flex items-center justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
        ></div>
      </div>

      <div v-else>
        <ReferenceSelector
          :references="references"
          v-model:selectedReference="selectedReference"
          class="w-1/3"
        />

        <div v-if="selectedReference" class="mt-6 flex-1">
          <ProgressOverview
            :drawings="drawings"
            :reference="selectedReference"
            class="mb-8"
          />

          <DrawingCalendar
            :reference="selectedReference"
            :drawings="drawings"
            @showDrawingProgress="showDrawingProgress"
            @showUploadForm="showUploadForm"
          />
        </div>
      </div>
    </div>

    <div class="w-full lg:w-[40%] space-y-4">
      <DrawingRating
        :drawing="selectedDrawing"
        v-if="selectedDrawing"
        @close="selectedDrawing = null"
      />

      <DrawingUpload
        v-if="selectedReference && selectedDay"
        :selectedReference="selectedReference"
        :selectedDay="selectedDay"
        @uploadSuccess="fetchDrawings(selectedReference._id!)"
      />
    </div>
  </div>
</template>
