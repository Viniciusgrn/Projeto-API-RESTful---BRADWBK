<template>
  <v-app-bar app fixed color="secondary">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

    <v-toolbar-title>BookForum</v-toolbar-title>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
      <v-btn icon="mdi-filter" variant="text"></v-btn>
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
    </template>

  <v-btn icon="mdi-bell" variant="text" @click="openDialog('notifications')"></v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
    color="primary"
  >
    <div class="avatar" style="display: flex; justify-content: center; padding: 20px;">
      <img
        :src="avatarErrored ? defaultAvatar : (avatarSrc || defaultAvatar)"
        :title="avatarSrc"
        @error="avatarErrored = true"
        alt="" class="avatar-preview" />
    </div>

    <v-toolbar-title style="display: flex; justify-content: center">{{ userName }}</v-toolbar-title>
    <v-list style="text-align: center; border-radius: 13px; padding: 0; margin: 20px" bg-color="background">
      <v-list-item
        v-for="item in items"
        :key="item.value"
        @click="handleItemClick(item)"
        :class="[
          'list-item-custom',
          item.value === 'exit' ? 'exit-item' : '',
          selected === item.value ? 'selected' : '',
        ]"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, inject, computed, watch, onMounted, onUnmounted } from 'vue'
import api from '@/services/api'

import { useRouter, useRoute } from 'vue-router'

import { useDialog } from '@/composable/dialog.ts'
import { getLoggedUser, logout } from '@/composable/auth.ts'

const currentTheme = inject('currentTheme')
const { openDialog } = useDialog()
const router = useRouter()
const userName = computed(() => {
  const u = getLoggedUser()
  return u?.username ?? 'Usuário'
})

const _refresh = ref(0)
// serverUser will hold the user object fetched from backend; prefer it over localStorage
const serverUser = ref(null)
const avatarSrc = computed(() => {
  // prefer serverUser, fallback to local storage when not available
  const u = serverUser.value || getLoggedUser()
  if (!u || !u.avatarUrl) return ''
  const url = String(u.avatarUrl)
  if (/^https?:\/\//i.test(url)) return url
  const apiBase = api.defaults?.baseURL || ''
  const backendBase = apiBase.replace(/\/api\/?$/, '')
  if (!url.startsWith('/')) return backendBase + '/' + url
  return backendBase + url
})

async function fetchUserFromServer() {
  try {
    const local = getLoggedUser()
    if (!local || !local.id) {
      serverUser.value = null
      return
    }
    const { data } = await api.get(`/users/${local.id}`)
    serverUser.value = data
    avatarErrored.value = false
  } catch (e) {
    // keep previous serverUser or null; log for diagnostics
    // eslint-disable-next-line no-console
    console.warn('Could not fetch user from backend', e)
  }
}

const defaultAvatar = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><rect fill='%23e0e0e0' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23666'>User</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})

const drawer = ref(false)
const avatarErrored = ref(false)
const route = useRoute()
const selected = ref('startPage')
const noSelectItems = ['exit', 'registerBook', 'myBooks', 'Community', 'message', 'donation', 'profile']

const items = [
  { title: 'Home', value: 'startPage' },
  { title: 'Cadastro de Livros', value: 'registerBook' },
  { title: 'Meus Livros', value: 'myBooks' },
  { title: 'Comunidade', value: 'Community' },
  { title: 'Message', value: 'message' },
  { title: 'Doação', value: 'donation' },
  { title: 'Profile', value: 'profile' },
  { title: 'Sair', value: 'exit' },
]

function handleItemClick(item) {
  if (!noSelectItems.includes(item.value)) {
    selectItem(item.value)
  }
  drawer.value = false

  if (item.value === 'registerBook') {
    openDialog('registerBook')
    return
  }

  if (item.value === 'profile') {
    // open profile as a dialog instead of navigating to a separate route
    openDialog('profile')
    return
  }

  if (item.value === 'myBooks') {
    router.push('/myBooks')
    return
  }

  if (item.value === 'Community') {
    router.push('/community')
    return
  }
  
  if (item.value === 'message') {
    router.push('/message')
    return
  }

  if (item.value === 'donation') {
    router.push('/donation')
    return
  }

  if (item.value === 'profile') {
    router.push('/profile')
    return
  }

  if (item.value === 'exit') {
    logout()
    router.push('/')
    return
  }

  router.push(`/${item.value}`)
}

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'lightTheme' ? 'darkTheme' : 'lightTheme'
}

function selectItem(value) {
  selected.value = value
}

onMounted(() => {
  if (route.name && items.find((i) => i.value === route.name)) {
    selected.value = String(route.name)
  }

  try {
    console.log('avatarSrc', avatarSrc.value)
    console.log('localStorage.user', localStorage.getItem('user'))
  } catch (e) {}
  fetchUserFromServer()

  const onDrawerChange = (val) => { if (val) fetchUserFromServer() }
  watch(drawer, onDrawerChange)

  const onUserUpdated = () => fetchUserFromServer()
  window.addEventListener('user-updated', onUserUpdated)
  onUnmounted(() => window.removeEventListener('user-updated', onUserUpdated))
})

watch(
  () => route.name,
  (name) => {
    if (name && items.find((i) => i.value === name)) {
      selected.value = String(name)
    }
  },
)
</script>
<style scoped>
.list-item-custom {
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.list-item-custom.selected {
  background-color: #1976d2;
  color: white;
}

.list-item-custom.exit-item:hover {
  background-color: #b71c1c;
}
.list-item-custom:hover {
  background-color: #c7c3c388;
  color: black;
}

.avatar-preview {
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 100px;
}

.avatar-preview {
  object-fit: cover;
  margin-bottom: 8px;
}

.avatar-preview {
  background-color: #e0e0e0;
}
</style>
