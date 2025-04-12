import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupInterceptors } from './lib/axios'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)

setupInterceptors();
app.mount('#app')
