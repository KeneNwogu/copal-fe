<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex flex-col gap-6">
        <!-- Page Header -->
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h2 class="text-2xl font-bold">Reference Practice</h2>
            <p class="text-gray-500">
              Track your progress by practicing with references
            </p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" size="sm">
              <FileIcon class="h-4 w-4 mr-2" />
              Import Reference
            </Button>
            <Button size="sm" variant="outline" @click="showSetupForm = true">
              <PlusIcon class="h-4 w-4 mr-2" />
              New Practice
            </Button>
          </div>
        </div>

        <!-- Practice Setup Form (Shown when creating a new practice) -->
        <Card v-if="showSetupForm">
          <CardHeader>
            <CardTitle>Create New Practice</CardTitle>
            <CardDescription
              >Setup your reference practice routine</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="relative px-2 sm:px-4">
              <form class="space-y-4 sm:space-y-6" @submit.prevent="createPractice">
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                  :class="{ 'opacity-50': isSubmittingForm }"
                >
                  <div class="space-y-3 sm:space-y-4">
                    <div class="mb-2 sm:mb-4">
                      <Label class="mb-1 sm:mb-2" for="practice-name">Practice Name</Label>
                      <Input
                        id="practice-name"
                        v-model="createReferenceForm.name"
                        placeholder="e.g., Portrait Study"
                        class="w-full"
                      />
                    </div>
                    <div>
                      <Label class="mb-1 sm:mb-2" for="iterations">Number of Iterations</Label>
                      <Input
                        id="iterations"
                        type="number"
                        min="1"
                        v-model="createReferenceForm.iterations"
                        placeholder="10"
                        class="w-full"
                      />
                    </div>
                    <div class="mb-2 sm:mb-4">
                      <Label class="mb-1 sm:mb-2" for="frequency">Frequency</Label>
                      <Select v-model="createReferenceForm.frequency" class="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="mb-2 sm:mb-4">
                      <Label class="mb-1 sm:mb-2" for="goal">Your Goal</Label>
                      <Textarea
                        id="goal"
                        v-model="createReferenceForm.goal"
                        placeholder="What do you want to improve with this practice?"
                        class="w-full"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col gap-4">
                    <Label>Reference Image</Label>
                    <div
                      class="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-64"
                    >
                      <div v-if="!filePreview">
                        <ImageIcon class="h-12 w-12 text-gray-400" />
                        <p class="mt-2 text-sm text-gray-500">
                          Drag & drop or click to upload
                        </p>
                        <p class="text-xs text-gray-400">
                          JPG, PNG or GIF, Max 5MB
                        </p>
                      </div>

                      <div v-else>
                        <img
                          :src="filePreview"
                          alt="Selected reference image"
                          class="absolute inset-0 w-full h-full object-fit z-0"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="mt-4 z-1"
                        @click="($refs.fileInput as any).click()"
                        >Select File</Button
                      >
                      <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        @change="handleFileUpload"
                      />
                    </div>
                    <!-- <div class="flex gap-2">
                      <Button variant="outline" size="sm" class="flex-1">
                        <SearchIcon class="h-4 w-4 mr-2" />
                        Browse Library
                      </Button>
                      <Button variant="outline" size="sm" class="flex-1">
                        <ShufficonIcon class="h-4 w-4 mr-2" />
                        Random Reference
                      </Button>
                    </div> -->
                  </div>
                </div>
              </form>
              <div
                v-if="isSubmittingForm"
                class="absolute inset-0 flex items-center justify-center bg-white/50"
              >
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
                ></div>
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between">
            <Button
              variant="ghost"
              @click="showSetupForm = false"
              :disabled="isSubmittingForm"
              >Cancel</Button
            >
            <Button
              variant="outline"
              @click="createPractice"
              :disabled="isSubmittingForm"
              >Create Practice</Button
            >
          </CardFooter>
        </Card>

        <!-- Active Practices -->
        <div v-else>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Practices</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <!-- Loading State -->
              <div
                v-if="isLoadingReferences"
                class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              >
                <PracticeCardSkeleton v-for="n in 3" :key="n" />
              </div>
              <!-- Actual Content -->
              <div v-else>
                <div v-if="activePractices.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <!-- Practice Card -->
                  <PracticeCard
                    v-for="practice in activePractices"
                    :key="practice._id"
                    :practice="practice"
                  />

                  <!-- Add New Card -->
                  <div
                    @click="showSetupForm = true"
                    class="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-80"
                  >
                    <div
                      class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      <PlusIcon class="h-6 w-6 text-primary" />
                    </div>
                    <p class="mt-4 text-sm font-medium">Create New Practice</p>
                  </div>
                </div>
                <EmptyState
                  v-else
                  :icon="ArtistIcon"
                  title="No active practices"
                  description="Start a new practice to begin your journey!"
                  action-text="Start a Practice"
                  @action-click="showSetupForm = true"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <PracticeCard
                v-for="practice in completedPractices"
                :key="practice._id"
                :practice="practice"
              />

              <div v-if="!completedPractices.length" class="bg-gray-50 rounded-lg p-12 text-center my-6">
                <ArtistIcon class="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 class="text-lg font-medium mb-2">
                  No completed practices yet
                </h3>
                <p class="text-gray-500 mb-6">
                  Keep practicing and you'll see your completed work here!
                </p>
                <Button variant="outline" @click="showSetupForm = true">Start a Practice</Button>
              </div>
            </TabsContent>

            <TabsContent value="all">
              <!-- Loading State -->
              <div
                v-if="isLoadingReferences"
                class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              >
                <PracticeCardSkeleton v-for="n in 3" :key="n" />
              </div>
              <!-- Actual Content -->
              <div v-else>
                <div v-if="allPractices.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <PracticeCard
                    v-for="practice in allPractices"
                    :key="practice._id"
                    :practice="practice"
                  />
                  <!-- Add New Card -->
                  <div
                    @click="showSetupForm = true"
                    class="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-80"
                  >
                    <div
                      class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      <PlusIcon class="h-6 w-6 text-primary" />
                    </div>
                    <p class="mt-4 text-sm font-medium">Create New Practice</p>
                  </div>
                </div>
                <EmptyState
                  v-else
                  :icon="ArtistIcon"
                  title="No practices found"
                  description="Start your first practice to begin your journey!"
                  action-text="Start a Practice"
                  @action-click="showSetupForm = true"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <!-- Tips Section -->
        <div class="mt-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <LightbulbIcon class="h-5 w-5 mr-2 text-yellow-500" />
                Tips for Effective Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="p-4 bg-yellow-50 rounded-lg">
                  <h4 class="font-medium mb-2">Consistent Schedule</h4>
                  <p class="text-sm text-gray-600">
                    Create a regular practice routine, even if it's just 15
                    minutes daily.
                  </p>
                </div>
                <div class="p-4 bg-blue-50 rounded-lg">
                  <h4 class="font-medium mb-2">Focus on Progress</h4>
                  <p class="text-sm text-gray-600">
                    Don't compare with others - track your own improvement over
                    time.
                  </p>
                </div>
                <div class="p-4 bg-green-50 rounded-lg">
                  <h4 class="font-medium mb-2">Analyze Your Work</h4>
                  <p class="text-sm text-gray-600">
                    After each iteration, note what improved and what needs more
                    work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  PlusIcon,
  FileIcon,
  // SearchIcon,
  ImageIcon,
  LightbulbIcon,
} from "lucide-vue-next";
import PracticeCardSkeleton from "@/components/preloaders/PracticeCardSkeleton.vue";
import EmptyState from "@/components/references/EmptyState.vue";

// Import shadcn components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import api from "@/lib/axios";
import { type Reference } from "@/types";
import type { Ref } from "vue";
import PracticeCard from "@/components/references/PracticeCard.vue";

// Mock data
// const ShufficonIcon = ImageIcon; // Placeholder for shuffle icon
const ArtistIcon = ImageIcon; // Placeholder for artist icon

const showSetupForm = ref(false);

const isLoadingReferences = ref(true);

const practices: Ref<Reference[]> = ref([]);

const activePractices: Ref<Reference[]> = ref([]);
const completedPractices: Ref<Reference[]> = ref([]);
const allPractices: Ref<Reference[]> = ref([]);

const currentTab = ref("active");

// watch current tab for changes
// Watch current tab for changes and update displayed practices
watch(currentTab, (newTab) => {
  switch (newTab) {
    case "active":
      practices.value = activePractices.value;
      break;
    case "completed":
      practices.value = completedPractices.value;
      break;
    case "all":
      practices.value = allPractices.value;
      break;
  }
  console.log(newTab, practices.value);
});

// Fetch references on component mount
const fetchReferences = async () => {
  try {
    const response = await api.get("/references");
    let references: Reference[] = response.data.references;
    practices.value = references;

    allPractices.value = references;
    activePractices.value = references.filter(
      (r) => r.completedIterations < r.iterations
    );
    completedPractices.value = references.filter(
      (r) => r.completedIterations === r.iterations
    );
  } catch (error) {
    console.error("Error fetching references:", error);
  } finally {
    isLoadingReferences.value = false;
  }
};

onMounted(() => {
  fetchReferences();
});

const createReferenceForm = ref({
  name: "",
  iterations: 0,
  frequency: "daily",
  goal: "",
  file: null as File | null,
});

const filePreview = ref("");
const isSubmittingForm = ref(false);

const createPractice = async () => {
  try {
    isSubmittingForm.value = true;
    // This would normally save the form data
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Submit form data to backend
    const formData = new FormData();
    formData.append("name", createReferenceForm.value.name);
    formData.append(
      "iterations",
      createReferenceForm.value.iterations.toString()
    );
    formData.append("frequency", createReferenceForm.value.frequency);
    formData.append("goal", createReferenceForm.value.goal);
    if (createReferenceForm.value.file) {
      formData.append("image", createReferenceForm.value.file);
    }

    let res = await api.post("/references", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.status, res.data);

    console.log("Practice created:", createReferenceForm.value);
    showSetupForm.value = false;
  } finally {
    isSubmittingForm.value = false;
  }
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    createReferenceForm.value.file = input.files[0];

    // Optional: Create preview URL for the image
    filePreview.value = URL.createObjectURL(input.files[0]);
    // You can add preview logic here if needed
  }
};
</script>
