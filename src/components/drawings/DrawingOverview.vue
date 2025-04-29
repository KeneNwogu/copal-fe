<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-vue-next';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const props = defineProps<{
  totalDrawings: number
  lastDrawingUpload: string | null
  isLoading?: boolean
}>()

function openReferenceDialog() {
  // TODO: Open the reference dialog.
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Drawing Tracker</CardTitle>
      <CardDescription>Keep up your practice!</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Total References</span>
        <span v-if="isLoading" class="w-12 h-6">
          <Skeleton class="h-full w-full" />
        </span>
        <span v-else class="font-semibold text-lg">{{ props.totalDrawings }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Last Upload</span>
        <span v-if="isLoading" class="w-24 h-5">
          <Skeleton class="h-full w-full" />
        </span>
        <span v-else class="text-sm">{{ props.lastDrawingUpload || 'No uploads yet' }}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="secondary" @click="openReferenceDialog" class="text-black">
        <Plus class="mr-2 h-4 w-4" />
        Add New Drawing
      </Button>
    </CardFooter>
  </Card>
</template>
  