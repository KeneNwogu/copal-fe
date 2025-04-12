<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <!-- Loading Animation -->
      <div class="mb-8">
        <svg
          class="animate-spin h-16 w-16 text-indigo-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">
        Signing you in...
      </h2>
      <p class="text-gray-600">Please wait while we get everything ready</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();

onMounted(async () => {
  try {
    // Get the token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // localStorage.setItem('auth_token', token);

    // Configure axios with the token
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Fetch user data
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Use the userStore to handle login
    const userStore = useUserStore();
    userStore.setUser(response.data);
    userStore.setToken(token);

    router.push("/");
  } catch (error) {
    console.error("Authentication error:", error);
    // Redirect to login page on error
    router.push("/auth");
  }
});
</script>
