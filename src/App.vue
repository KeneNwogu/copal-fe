<
<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const isAuthRoute = computed(() => {
  return route.path === '/auth' || route.path === '/authSuccess';
});

const isLandingRoute = computed(() => {
  return route.path === '/';
});

const canShowSidebar = computed(() => {
  return !isAuthRoute.value && !isLandingRoute.value;
});

import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const profilePicture = computed(() => {
  return userStore.user?.profilePicture || '/api/placeholder/32/32';
});

const logoutUser = () => {
  userStore.clearUserData();
  router.push("/auth");
}

import {
  BookOpenIcon,
  GalleryHorizontalEndIcon
} from "lucide-vue-next";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>

<template>
  <div class="flex h-screen" style="width: 100vw">
    <SidebarProvider>
      <AppSidebar v-if="canShowSidebar" />
      <main class="flex-1 overflow-y-auto">
        <SidebarTrigger v-if="canShowSidebar" />
        <!-- Header -->
        <header class="bg-white border-b sticky top-0 z-10">
          <div
            class="container mx-auto px-4 py-4 flex justify-between items-center"
          >
            <h2 class="text-xl font-bold text-primary">Copal</h2>
            <div class="flex items-center gap-4">
              <Button variant="outline" size="sm" class="hidden md:flex">
                <BookOpenIcon class="h-4 w-4 md:mr-2" />
                <span class="hidden md:inline">Tutorials</span>
              </Button>
              <Button variant="outline" v-if="userStore.user" size="sm" class="flex">
                <GalleryHorizontalEndIcon class="h-4 w-4 md:mr-2" />
                <span class="hidden md:inline">My Gallery</span>
              </Button>
              <DropdownMenu v-if="userStore.user">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" class="rounded-full">
                    <Avatar>
                      <AvatarImage :src="profilePicture" alt="User" />
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem
                    @click="logoutUser"
                  >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <router-view />
        <!-- this is the one that matters -->
      </main>
    </SidebarProvider>
  </div>
</template>
