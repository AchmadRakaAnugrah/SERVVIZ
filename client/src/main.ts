import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'
import { useAuthStore } from './store';

const app = createApp(App)

const pinia = createPinia();

app.use(pinia)
app.use(router)

app.mount('#app')

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use((config) => {
    const authStore = useAuthStore(); // Get the auth store
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });