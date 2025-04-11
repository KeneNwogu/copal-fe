<script setup lang="ts">
import { Home, Plus, LineChart } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Add Reference",
    url: "/references",
    icon: Plus,
  },
  // {
  //   title: "New Drawing",
  //   url: "#",
  //   icon: Plus,
  // },
  {
    title: "Streaks",
    url: "/streaks",
    icon: LineChart,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];
</script>

<template>
  <Sidebar class="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
    <div class="px-4 py-5 flex items-center border-b border-gray-200">
      <div class="bg-blue-600 text-white p-1.5 rounded">
        <LineChart class="h-5 w-5" />
      </div>
      <span class="ml-3 font-bold text-lg text-gray-800">Copal</span>
    </div>
    
    <SidebarContent class="flex-1 overflow-y-auto py-4">
      <SidebarGroup>
        <SidebarGroupLabel class="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" class="px-2">
              <SidebarMenuButton asChild>
                <a :href="item.url" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700">
                  <component :is="item.icon" class="h-5 w-5 text-gray-500" />
                  <span class="font-medium">{{item.title}}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    
    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
          U
        </div>
        <div>
          <div class="text-sm font-medium">User Name</div>
          <div class="text-xs text-gray-500">Free Plan</div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>