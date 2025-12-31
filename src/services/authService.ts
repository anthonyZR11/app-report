import api from '@/lib/api'

export const authService = {
  login({ email, password }: { email: string; password: string }) {
    return api.post(`/api/login`, {
      email,
      password,
    })
  },
}
