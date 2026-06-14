<template>
  <div class="auth-screen d-flex flex-column align-center justify-center pa-6">
    <!-- Logo -->
    <div class="text-h3 font-weight-bold mb-1" style="font-family: 'Georgia', serif; letter-spacing: -1px;">
      BookForum
    </div>
    <div class="text-caption text-medium-emphasis mb-8">A sua comunidade de leitores</div>

    <!-- Card -->
    <v-card flat border rounded="xl" class="auth-card pa-6 w-100">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="filled"
        rounded="lg"
        density="compact"
        hide-details
        class="mb-3"
        prepend-inner-icon="mdi-email-outline"
        autocomplete="email"
      />
      <v-text-field
        v-model="password"
        label="Senha"
        :type="visible ? 'text' : 'password'"
        variant="filled"
        rounded="lg"
        density="compact"
        hide-details
        class="mb-4"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="visible = !visible"
        autocomplete="current-password"
        @keyup.enter="apply"
      />

      <v-alert v-if="message" :type="alertType" density="compact" rounded="lg" class="mb-4 text-body-2">
        {{ message }}
      </v-alert>

      <v-btn
        color="primary"
        size="large"
        block
        rounded="lg"
        :loading="loading"
        @click="apply"
      >
        Entrar
      </v-btn>
    </v-card>

    <!-- Switch to register -->
    <v-card flat border rounded="xl" class="auth-card pa-4 w-100 mt-3 text-center">
      <span class="text-body-2 text-medium-emphasis">Não tem conta? </span>
      <span class="text-body-2 font-weight-bold text-primary" style="cursor:pointer" @click="$emit('go-register')">
        Cadastre-se
      </span>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/services/apiLogin'
import { getUserById } from '@/services/apiRegisterUsers'
import api from '@/services/api'

const emit = defineEmits(['close', 'go-register'])
const router = useRouter()

const visible = ref(false)
const password = ref('')
const email = ref('')
const message = ref('')
const alertType = ref<'success' | 'error'>('success')
const loading = ref(false)

async function apply() {
  if (!email.value || !password.value) return
  message.value = ''
  loading.value = true
  try {
    const res = await loginUser(email.value, password.value)
    // Salva o token ANTES de qualquer chamada protegida (o interceptor usa ele)
    if (res?.token) localStorage.setItem('token', res.token)
    // Fetch full user for latestdata
    try {
      const full = await getUserById(res.id)
      Object.assign(res, full)
    } catch (e) {}
    // Normalize avatarUrl
    if (res?.avatarUrl) {
      const url = String(res.avatarUrl).trim()
      if (url && url !== 'null' && !/^https?:\/\//i.test(url)) {
        const base = (api.defaults?.baseURL || '').replace(/\/api\/?$/, '')
        res.avatarUrl = url.startsWith('/') ? base + url : base + '/' + url
      }
    }
    localStorage.setItem('user', JSON.stringify(res))
    localStorage.setItem('token', res.token)
    try { window.dispatchEvent(new CustomEvent('user-updated', { detail: res })) } catch (e) {}
    router.push('/feed')
  } catch (error: any) {
    message.value = error.response?.data || 'Email ou senha incorretos'
    alertType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-screen {
  background: rgb(var(--v-theme-surface));
}
.auth-card {
  max-width: 400px;
}
</style>
