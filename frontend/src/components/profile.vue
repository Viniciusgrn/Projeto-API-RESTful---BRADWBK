<template>
  <v-card class="mx-auto" style="width: 100%; max-width: 360px">
    <!-- Header -->
    <div class="d-flex align-center px-3 pt-3 pb-1">
      <v-btn icon size="small" variant="text" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <span class="text-subtitle-1 font-weight-bold ml-2">Editar perfil</span>
      <v-spacer />
      <v-btn size="small" color="primary" variant="tonal" :loading="saving" @click="onSave">Salvar</v-btn>
    </div>

    <v-divider />

    <v-card-text class="pa-3">
      <!-- Avatar -->
      <div class="d-flex align-center mb-3">
        <v-avatar size="56" class="mr-3" style="cursor:pointer" @click="$refs.avatarInput.click()">
          <img :src="avatarPreviewUrl || avatarSrc || defaultAvatar" @error="avatarErrored = true" alt="avatar" />
          <div class="avatar-overlay d-flex align-center justify-center">
            <v-icon color="white" size="18">mdi-camera</v-icon>
          </div>
        </v-avatar>
        <div>
          <div class="text-body-2 font-weight-medium">{{ user?.username || 'Usuário' }}</div>
          <v-btn
            v-if="avatarFile"
            size="x-small"
            color="primary"
            variant="tonal"
            :loading="uploadingAvatar"
            @click="uploadAvatar"
            class="mt-1"
          >Enviar foto</v-btn>
          <div v-else class="text-caption text-medium-emphasis">Toque para trocar foto</div>
        </div>
        <input ref="avatarInput" type="file" accept="image/*" style="display:none" @change="onAvatarInputChange" />
      </div>

      <v-divider class="mb-3" />

      <!-- Fields -->
      <v-text-field
        v-model="username"
        label="Nome"
        density="compact"
        variant="outlined"
        class="mb-2"
        hide-details
      />
      <v-text-field
        v-model="emailField"
        label="E-mail"
        density="compact"
        variant="outlined"
        class="mb-2"
        hide-details
      />
      <v-text-field
        v-model="passwordField"
        label="Nova senha"
        type="password"
        density="compact"
        variant="outlined"
        placeholder="Deixe vazio para manter"
        class="mb-2"
        hide-details
      />
      <v-textarea
        v-model="bioField"
        label="Bio"
        density="compact"
        variant="outlined"
        rows="3"
        auto-grow
        counter="500"
        maxlength="500"
        placeholder="Conte um pouco sobre você e suas leituras…"
        hide-details="auto"
      />
    </v-card-text>

    <!-- Danger zone -->
    <div class="px-3 pb-3">
      <v-btn
        size="small"
        variant="text"
        color="error"
        class="text-caption"
        @click="onDelete"
      >
        <v-icon size="14" class="mr-1">mdi-trash-can-outline</v-icon>
        Excluir conta
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.v-avatar {
  position: relative;
}
.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}
.v-avatar:hover .avatar-overlay {
  opacity: 1;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { getLoggedUser, logout } from '@/composable/auth.ts'
import { getUserById, updateUser, deleteUser } from '@/services/apiRegisterUsers'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close-dialog'])
const router = useRouter()

const user = ref(null)
const avatarErrored = ref(false)

const username = ref('')
const emailField = ref('')
const passwordField = ref('')
const bioField = ref('')
const avatarFile = ref(null)
const avatarPreviewUrl = ref(null)
let lastObjectUrl = null
const uploadingAvatar = ref(false)
const saving = ref(false)

async function loadUser() {
  const local = getLoggedUser()
  if (!local || !local.id) return
  try {
    user.value = await getUserById(local.id)
    username.value = user.value.username || ''
    emailField.value = user.value.email || ''
    bioField.value = user.value.bio || ''
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not fetch user for profile', e)
  }
}

onMounted(loadUser)

const avatarSrc = computed(() => {
  const u = user.value
  if (!u || !u.avatarUrl) return ''
  const url = String(u.avatarUrl)
  if (/^https?:\/\//i.test(url)) return url
  const apiBase = api.defaults?.baseURL || ''
  const backendBase = apiBase.replace(/\/api\/?$/, '')
  return url.startsWith('/') ? backendBase + url : backendBase + '/' + url
})

const defaultAvatar = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><rect fill='%23e0e0e0' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23666'>User</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})

async function onSave() {
  const local = getLoggedUser()
  if (!local || !local.id) return
  saving.value = true
  const payload = {
    username: username.value,
    email: emailField.value,
    bio: bioField.value,
  }
  if (passwordField.value && passwordField.value.length > 0) payload.password = passwordField.value

  try {
    // se o usuário escolheu uma nova foto, envia antes de salvar os demais campos
    if (avatarFile.value) {
      await uploadAvatar()
    }
    const updated = await updateUser(local.id, payload)
    try {
      const existing = localStorage.getItem('user')
      if (existing) {
        const parsed = JSON.parse(existing)
        parsed.username = updated.username
        parsed.email = updated.email
        parsed.bio = updated.bio
        if (updated.avatarUrl) parsed.avatarUrl = updated.avatarUrl
        localStorage.setItem('user', JSON.stringify(parsed))
        try { window.dispatchEvent(new CustomEvent('user-updated', { detail: parsed })) } catch (e) {}
      }
    } catch (e) {}
    user.value = updated
    passwordField.value = ''
    emit('close-dialog')
  } catch (e) {
    console.error('Could not update user', e)
    alert('Erro ao atualizar perfil')
  } finally {
    saving.value = false
  }
}

function makeAbsoluteAvatar(returnedAvatarUrl) {
  if (!returnedAvatarUrl) return null
  const url = String(returnedAvatarUrl)
  if (/^https?:\/\//i.test(url)) return url
  const apiBase = api.defaults?.baseURL || ''
  const backendBase = apiBase.replace(/\/api\/?$/, '')
  return url.startsWith('/') ? backendBase + url : backendBase + '/' + url
}

async function uploadAvatar() {
  const local = getLoggedUser()
  if (!local || !local.id) return
  let file = avatarFile.value
  if (Array.isArray(file)) file = file.length ? file[0] : null
  if (!file) return
  try {
    uploadingAvatar.value = true
    const form = new FormData()
    form.append('file', file)
    const resp = await api.post(`/users/${local.id}/avatar`, form)
    const returned = resp?.data
    if (returned) {
      // update local user state
      user.value = returned
      // update localStorage with absolute avatarUrl for quick UI
      try {
        const existing = localStorage.getItem('user')
        if (existing) {
          const parsed = JSON.parse(existing)
          parsed.avatarUrl = makeAbsoluteAvatar(returned.avatarUrl)
          localStorage.setItem('user', JSON.stringify(parsed))
          try { window.dispatchEvent(new CustomEvent('user-updated', { detail: parsed })) } catch (e) {}
        }
      } catch (e) {}
      // clear preview object URL
      if (lastObjectUrl) {
        try { URL.revokeObjectURL(lastObjectUrl) } catch (e) {}
        lastObjectUrl = null
      }
      avatarFile.value = null
      avatarPreviewUrl.value = null
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Avatar upload failed', e)
    alert('Erro ao enviar imagem')
  } finally {
    uploadingAvatar.value = false
  }
}

function onAvatarInputChange(e) {
  if (lastObjectUrl) {
    try { URL.revokeObjectURL(lastObjectUrl) } catch (e) {}
    lastObjectUrl = null
  }
  const file = e.target.files?.[0]
  if (!file) { avatarPreviewUrl.value = null; return }
  avatarFile.value = file
  const url = URL.createObjectURL(file)
  avatarPreviewUrl.value = url
  lastObjectUrl = url
}

async function onDelete() {
  const ok = window.confirm('Confirma exclusão da sua conta? Esta operação é irreversível.')
  if (!ok) return
  const local = getLoggedUser()
  if (!local || !local.id) return
  try {
    await deleteUser(local.id)
    logout()
    emit('close-dialog')
    router.push('/')
  } catch (e) {
    console.error('Could not delete user', e)
    alert('Erro ao excluir conta')
  }
}

function close() {
  emit('close-dialog')
}
</script>
