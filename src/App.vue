<<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
</script>

<template>
  <div class="flex h-screen" style="width: 100vw;">
    <SidebarProvider>
      <AppSidebar />
      <main class="flex-1 overflow-y-auto">
        <SidebarTrigger />
        <router-view /> <!-- this is the one that matters -->
      </main>
    </SidebarProvider>
  </div>
</template>

