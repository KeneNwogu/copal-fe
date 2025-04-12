import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export function setupInterceptors(){
    api.interceptors.request.use(
        (config) => {
            const userStore = useUserStore();
            const token = userStore.token;
    
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
    
            return config;
        },
        error => Promise.reject(error)
    );
    
    // Add response interceptor
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const router = useRouter();
            const userStore = useUserStore();
    
            if (error.response?.status === 401) {
                // Clear any existing auth tokens or user data here
                userStore.clearUserData();
                // Redirect to sign in page
                await router.push('/auth');
            }
    
            return Promise.reject(error);
        }
    );
}

export default api;