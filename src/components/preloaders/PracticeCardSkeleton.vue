<template>
  <Card>
    <CardHeader class="pb-2">
      <div class="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2 mt-2"></div>
    </CardHeader>
    <CardContent>
      <div class="h-40 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div class="h-2 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div class="flex justify-between mt-4">
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    </CardContent>
    <CardFooter>
      <div class="h-9 bg-gray-200 rounded animate-pulse w-full"></div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
</script>