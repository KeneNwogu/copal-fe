<template>
  <div
    class="w-full h-[100vh] overflow-scroll flex flex-col gap-4 p-4 border rounded-lg shadow-sm relative"
  >
    <!-- Close Button -->
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <XIcon class="h-5 w-5 text-gray-500" />
    </button>
    <!-- Score Card -->
    <div class="flex items-center gap-4">
      <div
        class="flex items-center justify-center w-20 h-20 rounded-full font-bold text-md"
        :class="{
          'bg-red-100 text-red-700': drawing.overallScore < 40,
          'bg-yellow-100 text-yellow-700':
            drawing.overallScore >= 40 && drawing.overallScore < 70,
          'bg-green-100 text-green-700': drawing.overallScore >= 70,
        }"
      >
        {{ drawing.overallScore }}/100
      </div>
      <div>
        <h2 class="text-lg font-bold">Great work!</h2>
        <p class="text-sm text-gray-500">{{ scoreDescription }}</p>
      </div>
    </div>

    <!-- Separator -->
    <Separator />

    <!-- Feedback Section -->
    <div>
      <h3 class="text-sm font-semibold mb-2">Helpful Tips</h3>
      <ul class="space-y-2">
        <li
          v-for="(tip, index) in drawing.improvementTips"
          :key="index"
          class="flex gap-2"
        >
          <LightbulbIcon class="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <p class="text-sm">{{ tip }}</p>
        </li>
      </ul>
    </div>

    <!-- Category Feedback Section -->
    <section class="mt-5 mb-3">
      <h3 class="text-sm font-semibold mb-2">Category Breakdown</h3>
      <div class="space-y-3">
        <div
          v-for="(score, category) in drawing.categoryScores"
          :key="category"
          class="space-y-1"
        >
          <div v-if="category != '_id'">
            <div class="flex justify-between items-center">
              <span class="text-sm capitalize bold">{{ category }}</span>
              <span class="text-sm font-medium">{{ score }}/100</span>
            </div>
            <div class="text-sm text-gray-600">
              {{ drawing.categoryFeedback[category] }}
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
              <div
                class="h-full rounded-full transition-all"
                :class="{
                  'bg-red-500': score < 40,
                  'bg-yellow-500': score >= 40 && score < 70,
                  'bg-green-500': score >= 70,
                }"
                :style="{ width: `${score}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommended Courses -->
    <!-- <div class="mt-2">
      <h3 class="text-sm font-semibold mb-2">Recommended Courses</h3>
      <div class="space-y-2">
        <div
          v-for="(course, index) in recommendedCourses"
          :key="index"
          class="border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-medium text-sm">{{ course.title }}</h4>
              <p class="text-xs text-gray-500">
                {{ course.duration }} • {{ course.level }}
              </p>
            </div>
            <Badge
              :variant="
                course.category === 'Fundamentals'
                  ? 'default'
                  : course.category === 'Advanced'
                  ? 'secondary'
                  : 'outline'
              "
              class="text-xs"
            >
              {{ course.category }}
            </Badge>
          </div>
        </div>
      </div> -->
    <!-- </div> -->

    <!-- Action Button -->
    <!-- <Button class="mt-auto w-full text-black">View All Courses</Button> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Separator } from "@/components/ui/separator";
import { LightbulbIcon, XIcon } from "lucide-vue-next";
import type { Drawing } from "@/types";

defineEmits<{
  (e: 'close'): void
}>();

const props = defineProps<{
  drawing: Drawing;
}>();

const scoreDescription = computed(() => {
  if (props.drawing.overallScore! < 40) return "Needs significant improvement";
  if (props.drawing.overallScore! < 70) return "Showing good progress";
  return "Excellent work!";
});
</script>
