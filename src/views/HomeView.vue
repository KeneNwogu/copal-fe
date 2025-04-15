<script setup lang="ts">
import ReferenceOverview from "@/components/references/ReferenceOverview.vue";
import DrawingOverview from "@/components/drawings/DrawingOverview.vue";
import EmptyState from "@/components/references/EmptyState.vue";
import { ImageIcon } from "lucide-vue-next";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { onMounted, ref } from "vue";
import api from "@/lib/axios";
import type { Reference, Drawing } from "@/types";

const referencesCount = ref(0);
const drawingsCount = ref(0);
const latestReference = ref<string | null>(null);
const latestDrawing = ref<string | null>(null);

const drawings = ref<Drawing[]>([]);
const references = ref<Reference[]>([]);
const isLoading = ref(true);

onMounted(() => {
  // TODO: Replace with actual API call
  // Simulating API response for now
  referencesCount.value = 10;
  drawingsCount.value = 5;
  latestReference.value = null;
  latestDrawing.value = null;

  api.get("/user/dashboard").then((res) => {
    console.log(res.data, "res.data");
    referencesCount.value = res.data.totalReferences;
    drawingsCount.value = res.data.totalDrawings;
    latestReference.value = res.data.lastReferenceUpload
      ? res.data.lastReferenceUpload.split("T")[0]
      : null;
    latestDrawing.value = res.data.lastDrawingUpload
      ? res.data.lastDrawingUpload.split("T")[0]
      : null;
  });

  Promise.all([api.get("/drawings"), api.get("/references")]).then(
    ([drawingsRes, referencesRes]) => {
      drawings.value = drawingsRes.data.drawings;
      references.value = referencesRes.data.references;
      isLoading.value = false;
    }
  );
});
</script>

<template>
  <div class="ml-8 mx-auto">
    <div
      class="flex flex-col md:flex-row items-start w-[90%] my-3 justify-between gap-4"
    >
      <ReferenceOverview
        class="w-full md:w-auto md:mr-4"
        :total-references="referencesCount"
        :last-reference-upload="latestReference"
      />
      <DrawingOverview
        class="w-full md:w-auto"
        :total-drawings="drawingsCount"
        :last-drawing-upload="latestDrawing"
      />
    </div>

    <section class="my-8 w-[90%]">
      <Tabs default-value="drawings" class="w-full h-full">
        <TabsList class="w-full">
          <TabsTrigger value="drawings">Drawings</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        <TabsContent value="drawings">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          >
            <Skeleton v-if="isLoading" v-for="i in 6" :key="i" class="h-40 rounded-lg" />
            <template v-else>
              <EmptyState
                v-if="drawings.length === 0"
                :icon="ImageIcon"
                title="No drawings yet"
                description="Start your artistic journey by uploading your first drawing"
                action-text="Create Drawing"
                @action-click="$router.push('/streaks')"
                class="col-span-full"
              />
              <div v-else v-for="drawing in drawings" :key="drawing._id" class="aspect-square w-full overflow-hidden rounded-lg">
                <img :src="drawing.image" alt="" class="h-full w-full object-fit">
              </div>
            </template>
          </div>
        </TabsContent>
        <TabsContent value="references">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          >
            <Skeleton v-if="isLoading" v-for="i in 6" :key="i" class="h-40 rounded-lg" />
            <template v-else>
              <EmptyState
                v-if="references.length === 0"
                :icon="ImageIcon"
                title="No references yet"
                description="Add your first reference image to start practicing"
                action-text="Add Reference"
                @action-click="$router.push('/references')"
                class="col-span-full"
              />
              <div v-else v-for="reference in references" :key="reference._id" class="aspect-square w-full overflow-hidden rounded-lg">
                <img :src="reference.image" alt="" class="h-full w-full object-fit">
              </div>
            </template>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  </div>
</template>
