<template>
  <div class="bg-gray-50 rounded-lg p-12 text-center my-6">
    <component :is="icon" class="h-16 w-16 mx-auto text-gray-400 mb-4" />
    <h3 class="text-lg font-medium mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-500 mb-6">
      {{ description }}
    </p>
    <Button variant="outline" @click="$emit('action-click')">{{ actionText }}</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type { Component } from "vue";

defineProps<{
  icon: Component;
  title: string;
  description: string;
  actionText: string;
}>();

defineEmits<{
  "action-click": [];
}>();
</script>