<template>
    <div class="w-full h-full flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <!-- Score Card -->
      <div class="flex items-center gap-4">
        <div 
          class="flex items-center justify-center w-16 h-16 rounded-full font-bold text-2xl"
          :class="{
            'bg-red-100 text-red-700': score < 4,
            'bg-yellow-100 text-yellow-700': score >= 4 && score < 7,
            'bg-green-100 text-green-700': score >= 7
          }"
        >
          {{ score }}/10
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
          <li v-for="(tip, index) in tips" :key="index" class="flex gap-2">
            <LightbulbIcon class="h-5 w-5 text-yellow-500 flex-shrink-0" />
            <p class="text-sm">{{ tip }}</p>
          </li>
        </ul>
      </div>
  
      <!-- Recommended Courses -->
      <div class="mt-2">
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
                <p class="text-xs text-gray-500">{{ course.duration }} • {{ course.level }}</p>
              </div>
              <Badge 
                :variant="course.category === 'Fundamentals' ? 'default' : 
                  course.category === 'Advanced' ? 'secondary' : 'outline'"
                class="text-xs"
              >
                {{ course.category }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Action Button -->
      <Button class="mt-auto w-full text-black">View All Courses</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Separator } from "@/components/ui/separator";
  import { LightbulbIcon } from 'lucide-vue-next';
  
  const props = defineProps({
    score: {
      type: Number,
      default: 6
    },
    tips: {
      type: Array,
      default: () => [
        "Focus on improving your line consistency by practicing gesture drawing daily.",
        "Work on perspective skills by studying basic vanishing point exercises.",
        "Try using reference images more deliberately to improve proportions."
      ]
    },
    recommendedCourses: {
      type: Array<{title: string, duration: string, level: string, category: string}>,
      default: () => [
        {
          title: "Fundamentals of Drawing Proportions",
          duration: "4 weeks",
          level: "Beginner",
          category: "Fundamentals"
        },
        {
          title: "Mastering Digital Brushwork",
          duration: "6 weeks",
          level: "Intermediate",
          category: "Technique"
        },
        {
          title: "Advanced Character Design",
          duration: "8 weeks",
          level: "Advanced",
          category: "Advanced"
        }
      ]
    }
  });
  
  const scoreDescription = computed(() => {
    if (props.score < 4) return "Needs significant improvement";
    if (props.score < 7) return "Showing good progress";
    return "Excellent work!";
  });
  </script>