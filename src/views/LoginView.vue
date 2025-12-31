<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { setAuthToken } from '@/lib/api'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const errors = ref<Record<string, string[] | null>>({})

async function onSubmit() {
  try {
    const { data } = await authService.login({ 
      email: email.value,
      password: password.value 
  })

    localStorage.setItem('token', data.token)
    setAuthToken(data.token)
    await router.replace({ name: 'home' })
  } catch (e: any) {
    if(e.status ===  422){
      errors.value = e.response.data.errors ?? {}
    }
    
    if (axios.isAxiosError(e)) {
    if(e.response?.status === 422) {
      errors.value = e.response.data.errors ?? {}
    } else {
        toast.error(e.response?.data?.message || 'Error al iniciar sesión')
      }
  } else {
      toast.error('Error inesperado')
    }
  }
}
</script>

<template>
  <div class="login">
    <form class="login__card" @submit.prevent="onSubmit">
      <h1 class="login__title">Iniciar sesión</h1>
      <input
        class="login__input"
        v-model="email"
        type="text"
        placeholder="Ingresa tu usuario"
      />
      <div v-if="errors.email" class="error">
        {{ errors.email[0] }}
      </div>
      <input
        class="login__input"
        v-model="password"
        type="password"
        placeholder="Ingresa tu contraseña"
      />
      <div v-if="errors.password" class="error">
        {{ errors.password[0]}}
      </div>

      <div v-if="errors.credentials" class="error-generic">
        {{ errors.credentials[0]}}
      </div>
      <ButtonComponent class="login__btn" label="Ingresar" type="submit" />
    </form>
  </div>
</template>

<style lang="sass" scoped>
@use "sass:color"

.login
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  padding: 24px
  background: linear-gradient(135deg, $primary-color, $secondary-color)
  font-family: ArgentumSansRegular, sans-serif

.login__card
  width: min(420px, 92vw)
  background: #fff
  border-radius: 16px
  padding: 28px
  box-shadow: 0 14px 40px rgba(0,0,0,.18)

.login__title
  margin: 0
  color: #141414
  font-size: 22px
  margin-bottom: 1rem
  text-align: center

.login__input
  width: 100%
  box-sizing: border-box
  border: 1px solid $gray-color
  border-radius: 12px
  padding: 12px 14px
  outline: none
  font-size: 14px
  margin-bottom: 1rem

.login__btn
  width: 100%
  margin-top: 16px
  background: $orange-color
  color: #181818
  border: none
  border-radius: 999px
  padding: 12px 16px
  font-weight: 600
  cursor: pointer
  transition: filter .2s ease

.login__btn:hover
  background-color: color.adjust($orange-color, $lightness: -5%)

.error, .error-generic
  color: #e74c3c
  font-size: 0.7rem
  margin-top: -0.8rem
  margin-bottom: 0.75rem
  padding: 0 0.4rem

.error-generic
  padding: 0
  text-align: center
  margin-top: 0.2rem
</style>
