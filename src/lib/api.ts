import router from '@/router'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: 'application/json' },
})

export const setAuthToken = (newToken: string | null) => {
  if (newToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      await router.replace({ name: 'login' })
    }
    return Promise.reject(error)
  },
)

export default api
