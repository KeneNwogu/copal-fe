<script setup lang="ts">
import ReferenceOverview from "@/components/references/ReferenceOverview.vue";
import DrawingOverview from "@/components/drawings/DrawingOverview.vue";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const totalReferences = 10;
const lastUploaded = "2021-01-01";
</script>

<template>
  <div class="ml-8 mx-auto">
    <div class="flex items-start w-[90%] my-3 justify-between">
      <ReferenceOverview class="mr-4" />
      <DrawingOverview />
    </div>

    <section class="my-5 w-[90%]">
      <Tabs default-value="drawings" class="w-full">
        <TabsList variant="line" class="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="drawings">Drawings</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        <TabsContent value="drawings">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          >
            <Skeleton v-for="i in 6" :key="i" class="h-40 rounded-lg" />
          </div>
        </TabsContent>
        <TabsContent value="references">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          >
            <Skeleton v-for="i in 6" :key="i" class="h-40 rounded-lg" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  </div>
</template>
