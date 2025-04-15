<template>
  <Card>
    <CardHeader class="pb-2">
      <CardTitle>{{ practice.name }}</CardTitle>
      <CardDescription
        >{{ practice.completedIterations }}/{{ practice.iterations }}
        iterations</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div class="relative h-40 w-full overflow-hidden rounded-md mb-4">
        <img
          :src="practice.image"
          :alt="practice.name"
          class="object-cover w-full h-full"
        />
      </div>
      <Progress
        :value="(practice.completedIterations / practice.iterations) * 100"
        class="mb-2"
      />
      <div class="flex justify-between text-xs text-gray-500">
        <span>Started {{ practice.createdAt }}</span>
        <span>{{ practice.frequency }}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="w-full" @click="$emit('continue')"
        >Continue Practice</Button
      >
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Reference } from "@/types";

defineProps<{
  practice: Reference;
}>();

defineEmits<{
  continue: [];
}>();
</script>