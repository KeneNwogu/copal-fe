<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <div class="flex flex-col gap-6">
          <!-- Page Header -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 class="text-2xl font-bold">Reference Practice</h2>
              <p class="text-gray-500">Track your progress by practicing with references</p>
            </div>
            <div class="flex gap-2">
              <Button variant="outline" size="sm">
                <FileIcon class="h-4 w-4 mr-2" />
                Import Reference
              </Button>
              <Button size="sm" variant="outline">
                <PlusIcon class="h-4 w-4 mr-2" />
                New Practice
              </Button>
            </div>
          </div>
  
          <!-- Practice Setup Form (Shown when creating a new practice) -->
          <Card v-if="showSetupForm">
            <CardHeader>
              <CardTitle>Create New Practice</CardTitle>
              <CardDescription>Setup your reference practice routine</CardDescription>
            </CardHeader>
            <CardContent>
              <form class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div class="mb-4">
                      <Label class="my-2" for="practice-name">Practice Name</Label>
                      <Input id="practice-name" placeholder="e.g., Portrait Study" />
                    </div>
                    <div>
                      <Label class="my-2" for="iterations">Number of Iterations</Label>
                      <Input id="iterations" type="number" min="1" placeholder="10" />
                    </div>
                    <div class="mb-4">
                      <Label class="my-2" for="frequency">Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <!-- <SelectItem value="custom">Custom</SelectItem> -->
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="mb-4">
                      <Label class="my-2" for="goal">Your Goal</Label>
                      <Textarea id="goal" placeholder="What do you want to improve with this practice?" />
                    </div>
                  </div>
                  <div class="flex flex-col gap-4">
                    <Label>Reference Image</Label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-64">
                      <ImageIcon class="h-12 w-12 text-gray-400" />
                      <p class="mt-2 text-sm text-gray-500">Drag & drop or click to upload</p>
                      <p class="text-xs text-gray-400">JPG, PNG or GIF, Max 5MB</p>
                      <Button variant="ghost" size="sm" class="mt-4">Select File</Button>
                    </div>
                    <div class="flex gap-2">
                      <Button variant="outline" size="sm" class="flex-1">
                        <SearchIcon class="h-4 w-4 mr-2" />
                        Browse Library
                      </Button>
                      <Button variant="outline" size="sm" class="flex-1">
                        <ShufficonIcon class="h-4 w-4 mr-2" />
                        Random Reference
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter class="flex justify-between">
              <Button variant="ghost" @click="showSetupForm = false">Cancel</Button>
              <Button variant="outline" @click="createPractice">Create Practice</Button>
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
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <!-- Practice Card -->
                  <Card v-for="(practice, index) in practices" :key="index">
                    <CardHeader class="pb-2">
                      <CardTitle>{{ practice.name }}</CardTitle>
                      <CardDescription>{{ practice.completedIterations }}/{{ practice.totalIterations }} iterations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div class="relative h-40 w-full overflow-hidden rounded-md mb-4">
                        <img :src="practice.reference" :alt="practice.name" class="object-cover w-full h-full" />
                      </div>
                      <Progress :value="(practice.completedIterations / practice.totalIterations) * 100" class="mb-2" />
                      <div class="flex justify-between text-xs text-gray-500">
                        <span>Started {{ practice.startDate }}</span>
                        <span>{{ practice.frequency }}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" class="w-full">Continue Practice</Button>
                    </CardFooter>
                  </Card>
  
                  <!-- Add New Card -->
                  <div 
                    @click="showSetupForm = true"
                    class="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-80"
                  >
                    <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <PlusIcon class="h-6 w-6 text-primary" />
                    </div>
                    <p class="mt-4 text-sm font-medium">Create New Practice</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div class="bg-gray-50 rounded-lg p-12 text-center my-6">
                  <ArtistIcon class="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 class="text-lg font-medium mb-2">No completed practices yet</h3>
                  <p class="text-gray-500 mb-6">Keep practicing and you'll see your completed work here!</p>
                  <Button @click="showSetupForm = true">Start a Practice</Button>
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
                    <p class="text-sm text-gray-600">Create a regular practice routine, even if it's just 15 minutes daily.</p>
                  </div>
                  <div class="p-4 bg-blue-50 rounded-lg">
                    <h4 class="font-medium mb-2">Focus on Progress</h4>
                    <p class="text-sm text-gray-600">Don't compare with others - track your own improvement over time.</p>
                  </div>
                  <div class="p-4 bg-green-50 rounded-lg">
                    <h4 class="font-medium mb-2">Analyze Your Work</h4>
                    <p class="text-sm text-gray-600">After each iteration, note what improved and what needs more work.</p>
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
  import { ref } from 'vue';
  import { 
    BookOpenIcon, 
    GalleryHorizontalEndIcon, 
    PlusIcon, 
    FileIcon, 
    SearchIcon, 
    ImageIcon, 
    LightbulbIcon 
  } from 'lucide-vue-next';
  
  // Import shadcn components
  import { Button } from '@/components/ui/button';
  import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
  import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
  } from '@/components/ui/card';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { Textarea } from '@/components/ui/textarea';
  import { Progress } from '@/components/ui/progress';
  import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
  } from '@/components/ui/select';
  import { 
    Tabs, 
    TabsList, 
    TabsTrigger, 
    TabsContent 
  } from '@/components/ui/tabs';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  
  // Mock data
  const ShufficonIcon = ImageIcon; // Placeholder for shuffle icon
  const ArtistIcon = ImageIcon; // Placeholder for artist icon
  
  const showSetupForm = ref(false);
  
  const practices = ref([
    {
      name: "Portrait Study",
      completedIterations: 3,
      totalIterations: 10,
      reference: "/api/placeholder/400/320",
      startDate: "April 5, 2025",
      frequency: "Daily"
    },
    {
      name: "Hand Poses",
      completedIterations: 5,
      totalIterations: 12,
      reference: "/api/placeholder/400/320",
      startDate: "March 28, 2025",
      frequency: "3x per week"
    }
  ]);
  
  const createPractice = () => {
    // This would normally save the form data
    showSetupForm.value = false;
  };
  </script>