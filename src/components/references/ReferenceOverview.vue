<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const props = defineProps<{
  totalReferences: number
  lastReferenceUpload: string | null
}>();
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Reference Tracker</CardTitle>
      <CardDescription>Keep up your practice!</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Total References</span>
        <span class="font-semibold text-lg">{{ props.totalReferences }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Last Upload</span>
        <span class="text-sm">{{ props.lastReferenceUpload || 'No uploads yet' }}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="secondary" @click="$router.push('/references')" class="text-black">
        <Plus class="mr-2 h-4 w-4" />
        Add New Reference
      </Button>
    </CardFooter>
  </Card>
</template>
