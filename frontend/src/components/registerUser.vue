<template>
  <div class="reg-screen pa-6 d-flex flex-column align-center">
    <!-- Logo -->
    <div class="text-h4 font-weight-bold mb-1" style="font-family: 'Georgia', serif; letter-spacing: -1px;">
      BookForum
    </div>
    <div class="text-caption text-medium-emphasis mb-5">Crie sua conta</div>

    <v-card flat border rounded="xl" class="reg-card pa-5 w-100">

      <!-- Avatar picker -->
      <div class="d-flex flex-column align-center mb-4">
        <div class="avatar-wrap" @click="triggerFilePick">
          <v-avatar size="72" color="grey-lighten-3">
            <v-img v-if="photoUrl" :src="photoUrl" cover />
            <v-icon v-else size="36" color="grey">mdi-camera-plus-outline</v-icon>
          </v-avatar>
          <div class="avatar-hint text-caption text-medium-emphasis mt-1">Foto de perfil (opcional)</div>
        </div>
        <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileChange" />
      </div>

      <v-text-field
        v-model="username"
        label="Nome de usuário *"
        variant="filled"
        rounded="lg"
        density="compact"
        hide-details
        class="mb-3"
        :rules="[v => !!v || 'Obrigatório']"
        prepend-inner-icon="mdi-account-outline"
        autocomplete="username"
      />
      <v-text-field
        v-model="email"
        label="Email *"
        type="email"
        variant="filled"
        rounded="lg"
        density="compact"
        hide-details
        class="mb-3"
        :rules="[v => !!v || 'Obrigatório']"
        prepend-inner-icon="mdi-email-outline"
        autocomplete="email"
      />
      <v-text-field
        v-model="password"
        label="Senha *"
        :type="visible ? 'text' : 'password'"
        variant="filled"
        rounded="lg"
        density="compact"
        hide-details
        class="mb-4"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="visible = !visible"
        autocomplete="new-password"
        :rules="[v => !!v || 'Obrigatório']"
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
        :disabled="!username || !email || !password"
        @click="save"
      >
        Criar Conta
      </v-btn>
    </v-card>

    <v-card flat border rounded="xl" class="reg-card pa-4 w-100 mt-3 text-center">
      <span class="text-body-2 text-medium-emphasis">Já tem conta? </span>
      <span class="text-body-2 font-weight-bold text-primary" style="cursor:pointer" @click="$emit('close')">
        Entrar
      </span>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createUser } from '@/services/apiRegisterUsers'
import api from '@/services/api'

const emit = defineEmits(['close'])

const username = ref('')
const email = ref('')
const password = ref('')
const visible = ref(false)
const photo = ref<File | null>(null)
const photoUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const message = ref('')
const alertType = ref<'success' | 'error'>('success')
const loading = ref(false)

function triggerFilePick() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  photo.value = file
  photoUrl.value = URL.createObjectURL(file)
}

async function save() {
  if (!username.value || !email.value || !password.value) return
  message.value = ''
  loading.value = true
  try {
    const response = await createUser({ username: username.value, email: email.value, password: password.value })
    // Upload avatar if selected
    if (photo.value && response?.id) {
      try {
        const form = new FormData()
        form.append('file', photo.value)
        await api.post(`/users/${response.id}/avatar`, form)
      } catch (e) { console.warn('Avatar upload failed', e) }
    }
    message.value = 'Conta criada! Você já pode fazer login.'
    alertType.value = 'success'
    setTimeout(() => emit('close'), 1500)
  } catch (error: any) {
    message.value = error.response?.data?.message || error.response?.data ||
      (error.response?.status === 409 ? 'Este email já está registrado.' : 'Erro ao criar conta.')
    alertType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reg-screen {
  background: rgb(var(--v-theme-surface));
}
.reg-card {
  max-width: 400px;
}
.avatar-wrap {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
