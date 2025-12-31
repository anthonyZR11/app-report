import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/fonts.sass'
import { setAuthToken } from '@/lib/api'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const token = localStorage.getItem('token')
const toastOptions: ToastContainerOptions = {
  autoClose: 3000,
}
if (token) setAuthToken(token)

const app = createApp(App)
app.use(router)
app.use(Vue3Toastify, toastOptions)
app.mount('#app')
