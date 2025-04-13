<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4">
      <button
        @click="prevMonth"
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
      <button 
      :disabled="isNextBtnDisabled"
        :class="{ 'opacity-0': isNextBtnDisabled }"
        :style="{
          cursor: isNextBtnDisabled ? 'none' : 'pointer',
          pointerEvents: isNextBtnDisabled ? 'none' : 'auto',
        }"
      @click="nextMonth" class="text-sm text-gray-500 hover:text-black">
        Next →
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 text-sm text-center text-gray-500 mb-1">
      <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="blank in leadingEmptyDays"
        :key="'blank-' + blank"
        class="h-14"
      ></div>

      <button
        v-for="day in daysInMonth"
        :key="day"
        class="h-14 rounded-lg flex items-center justify-center cursor-default transition-all"
        :class="{
          'bg-red-500 text-white': getDrawingStatus(day) === 'low-score',
          'bg-yellow-500 text-white': getDrawingStatus(day) === 'medium-score',
          'bg-green-500 text-white': getDrawingStatus(day) === 'high-score',
          'bg-gray-200': getDrawingStatus(day) === 'no-drawing',
          'hover:bg-gray-100': getDrawingStatus(day) === 'no-drawing',
        }"
        :disabled="!isDrawingDay(day) && getCurrentDay(day) !== todayISO"
        @click="
          isDrawingDay(day)
            ? $emit('showDrawingProgress', getDrawing(day))
            : getCurrentDay(day) === todayISO
            ? $emit('showUploadForm', getCurrentDay(day))
            : null
        "
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from "vue";
import type { Drawing, Reference } from "@/types";

const props = defineProps<{
  drawings: Drawing[];
  reference: Reference;
}>();

defineEmits(["showUploadForm", "showDrawingProgress"]);

const today = new Date();
const todayISO = today.toISOString().slice(0, 10);

const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthLabel = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  );
});

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const leadingEmptyDays = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// Drawing dates for lookup
const drawingMap = computed(() => {
  return props.drawings.reduce((acc, drawing) => {
    const date = new Date(drawing.day).toISOString().slice(0, 10);
    acc[date] = drawing;
    return acc;
  }, {} as Record<string, Drawing>);
});

const getCurrentDay = (day: number) => {
  const date = new Date(currentYear.value, currentMonth.value, day, 20);
  const iso = date.toISOString().slice(0, 10);
  return iso;
};

const getDrawing = (day: number) => {
  const date = new Date(currentYear.value, currentMonth.value, day, 20);
  const iso = date.toISOString().slice(0, 10);
  const drawing = drawingMap.value[iso];

  return drawing;
};

const getDrawingStatus = (day: number) => {
  const date = new Date(currentYear.value, currentMonth.value, day, 20);
  const iso = date.toISOString().slice(0, 10);
  const drawing = drawingMap.value[iso];

  if (!drawing) return "no-drawing";

  const score = drawing.overallScore || 0;
  if (score < 45) return "low-score";
  if (score < 70) return "medium-score";
  return "high-score";
};

const isDrawingDay = (day: number) => {
  return getDrawingStatus(day) !== "no-drawing";
};

const sortedDrawings = computed(() => {
  return props.drawings.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});

// previous button is disabled for the earliest month
const isPrevBtnDisabled = computed(() => {
  let earliestMonth = sortedDrawings.value[0]?.createdAt || today;
  earliestMonth = new Date(earliestMonth);
  return (
    earliestMonth.getMonth() === currentMonth.value &&
    earliestMonth.getFullYear() === currentYear.value
  );
});

const isNextBtnDisabled = computed(() => {
  let length = sortedDrawings.value.length;
  let latestMonth: any = sortedDrawings.value[length - 1]?.createdAt;
  latestMonth = new Date(latestMonth);

  return (
    latestMonth.getMonth() === currentMonth.value &&
    latestMonth.getFullYear() === currentYear.value &&
    props.reference.iterations <= props.drawings.length
  );
});

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value++;
  }
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value--;
  }
};
</script>
