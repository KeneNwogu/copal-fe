<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Title -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ isSignIn ? "Sign in to your account" : "Create your account" }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isSignIn ? "Don't have an account?" : "Already have an account?" }}
          <button
            @click="toggleForm"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {{ isSignIn ? "Sign up" : "Sign in" }}
          </button>
        </p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="non_field_error"
        class="rounded-md bg-red-50 p-4 mb-4 border border-red-300"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800">
              {{ non_field_error }}
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                @click="non_field_error = ''"
                class="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
              >
                <span class="sr-only">Dismiss</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Auth Form -->
      <form class="mt-8 space-y-6 border-none" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <div v-if="!isSignIn">
            <label for="firstName" class="sr-only">First Name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              name="firstName"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.firstName.length > 0 }"
              placeholder="First Name"
            />
            <p v-for="error in errors.firstName" :key="error" class="mt-1 text-sm text-red-600">
              {{ error }}
            </p>
          </div>

          <div v-if="!isSignIn">
            <label for="lastName" class="sr-only">Last Name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              name="lastName"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.lastName.length > 0 }"
              placeholder="Last Name"
            />
            <p v-for="error in errors.lastName" :key="error" class="mt-1 text-sm text-red-600">
              {{ error }}
            </p>
          </div>

          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.email.length > 0 }"
              placeholder="Email address"
            />
            <p v-for="error in errors.email" :key="error" class="mt-1 text-sm text-red-600">
              {{ error }}
            </p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.password.length > 0 }"
              placeholder="Password"
            />
            <p v-for="error in errors.password" :key="error" class="mt-1 text-sm text-red-600">
              {{ error }}
            </p>
          </div>
          <div v-if="!isSignIn">
            <label for="confirmPassword" class="sr-only"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.confirmPassword.length > 0 }"
              placeholder="Confirm Password"
            />
            <p v-for="error in errors.confirmPassword" :key="error" class="mt-1 text-sm text-red-600">
              {{ error }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between" v-if="isSignIn">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="form.rememberMe"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute inset-y-0 flex items-center pl-3">
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5 text-indigo-300"
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
            </span>
            <span>{{ isSignIn ? "Sign in" : "Sign up" }}</span>
          </button>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            @click="initiateGoogleSignIn"
            type="button"
            :disabled="isGoogleLoading"
            class="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isGoogleLoading" class="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <svg
              v-else
              class="animate-spin h-5 w-5 text-gray-500"
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
            Sign {{ isSignIn ? "in" : "up" }} with Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';
import api from '@/lib/axios';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const isSignIn = ref(true);
const isLoading = ref(false);
const isGoogleLoading = ref(false);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false
});

let errors: {
  firstName: string[];
  lastName: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
} = reactive({
  firstName: [],
  lastName: [],
  email: [],
  password: [],
  confirmPassword: []
});

const resetForm = () => {
  form.firstName = '';
  form.lastName = '';
  form.email = '';
  form.password = '';
  form.confirmPassword = '';
  form.rememberMe = false;
}

const resetErrors = () => {
  errors = reactive({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    confirmPassword: []
  });

  non_field_error.value = "";
}

const non_field_error = ref("");

const validateForm = () => {
  let isValid = true;

  resetErrors();

  // Email validation
  if (!form.email) {
    errors.email = ['Email is required'];
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = ['Please enter a valid email address'];
    isValid = false;
  }

  // Password validation
  if (!form.password) {
    errors.password = ['Password is required'];
    isValid = false;
  } else if (form.password.length < 8 && !isSignIn.value) {
    errors.password = ['Password must be at least 8 characters long'];
    isValid = false;
  }

  // Confirm password validation (only for sign up)
  if (!isSignIn.value && form.password !== form.confirmPassword) {
    errors.confirmPassword = ['Passwords do not match'];
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1500));
    // console.log('Form submitted:', {
    //   type: isSignIn.value ? 'sign-in' : 'sign-up',
    //   email: form.email,
    //   password: form.password,
    //   rememberMe: form.rememberMe
    // });

    if (isSignIn.value) {
      // Redirect to dashboard or perform any other action after successful sign in
      let res = await api.post('/user/login', {
        email: form.email,
        password: form.password
      })

      userStore.setUser(res.data.user);
      userStore.setToken(res.data.token);

      router.push('/');
      isLoading.value = false;
    }

    else {
      // perform sign up call
      await api.post('/user', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      })

      isLoading.value = false;
      toggleForm();
    }
  } catch (error: any) {
    if(error.response){
      if(error.response?.data?.message) non_field_error.value = error.response.data.message;
      else {
        // form errors
        errors = error.response.data;
      }
    }
    console.error('Authentication error:', error);
  } finally {
    isLoading.value = false;
  }
};

const toggleForm = () => {
  isSignIn.value = !isSignIn.value;
  resetForm();
  resetErrors();
};



const initiateGoogleSignIn = async () => {
  if (isGoogleLoading.value) return;
  isGoogleLoading.value = true;
  try {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/auth/google`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirect to Google OAuth URL
    window.location.href = response.data.url;
  } catch (error) {
    console.error('Error initiating Google sign in:', error);
    isGoogleLoading.value = false;
  }
};
</script>
