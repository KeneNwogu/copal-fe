<script setup lang="ts">
import { ref, computed } from 'vue';
import api from '@/lib/axios';
import type { Reference } from '@/types';

const props = defineProps<{
  selectedReference: Reference;
  selectedDay: Date;
}>();

const selectedDate = computed(() => new Date(props.selectedDay))

const emit = defineEmits(['uploadSuccess']);

const imageFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isUploading = ref(false);
const error = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) {
    imageFile.value = null;
    previewUrl.value = null;
    return;
  }

  const file = files[0];
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file';
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image size should be less than 5MB';
    return;
  }

  imageFile.value = file;
  error.value = null;

  // Create preview URL
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const handleSubmit = async () => {
  if (!imageFile.value) {
    error.value = 'Please select an image';
    return;
  }

  try {
    isUploading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('file', imageFile.value);
    formData.append('reference', props.selectedReference._id!);
    // TODO: enable uploads for past dates
    // formData.append('date', props.selectedDay.toISOString());

    const response = await api.post('/drawings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    emit('uploadSuccess', response.data);
    
    // Reset form
    imageFile.value = null;
    previewUrl.value = null;
  } catch (err) {
    error.value = 'Failed to upload image. Please try again.';
    console.error('Error uploading image:', err);
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-4">
      Upload Drawing for {{ selectedDate.toLocaleDateString() }}
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <label
          for="image-upload"
          class="block text-sm font-medium text-gray-700"
        >
          Select Image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          @change="handleFileChange"
          class="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>

      <div v-if="previewUrl" class="mt-4">
        <img
          :src="previewUrl"
          alt="Preview"
          class="max-w-xs rounded-lg shadow-sm"
        />
      </div>

      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="isUploading || !imageFile"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isUploading">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
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
          Uploading...
        </span>
        <span v-else>Upload Drawing</span>
      </button>
    </form>
  </div>
</template>