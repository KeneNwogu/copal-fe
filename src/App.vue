<
<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";

import { ref } from "vue";
import {
  BookOpenIcon,
  GalleryHorizontalEndIcon,
  PlusIcon,
  FileIcon,
  SearchIcon,
  ImageIcon,
  LightbulbIcon,
} from "lucide-vue-next";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
      <AppSidebar />
      <main class="flex-1 overflow-y-auto">
        <SidebarTrigger />
        <!-- Header -->
        <header class="bg-white border-b sticky top-0 z-10">
          <div
            class="container mx-auto px-4 py-4 flex justify-between items-center"
          >
            <h2 class="text-xl font-bold text-primary">Copal</h2>
            <div class="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <BookOpenIcon class="h-4 w-4 mr-2" />
                Tutorials
              </Button>
              <Button variant="outline" size="sm">
                <GalleryHorizontalEndIcon class="h-4 w-4 mr-2" />
                My Gallery
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" class="rounded-full">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/32/32" alt="User" />
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
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
