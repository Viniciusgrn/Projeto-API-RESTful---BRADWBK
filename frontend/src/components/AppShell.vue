<template>
  <v-app :theme="currentTheme">
    <!-- Top Bar -->
    <v-app-bar flat border="b" height="56" class="bg-surface">
      <v-app-bar-title>
        <span class="bookgram-logo">BookForum</span>
      </v-app-bar-title>
      <template #append>
        <v-btn icon @click="toggleTheme">
          <v-icon>{{ currentTheme === 'bookgramLight' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>
        <v-btn icon @click="$router.push('/notifications')">
          <v-badge :content="notifCount" :model-value="notifCount > 0" color="error" floating>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
        <v-btn v-if="isAdmin" icon @click="$router.push('/admin')" color="amber">
          <v-icon>mdi-shield-crown</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-background">
      <router-view />
    </v-main>

    <!-- Bottom Nav (Instagram-style) -->
    <v-bottom-navigation
      v-model="activeTab"
      class="bg-surface bottom-nav"
      height="56"
      border="t"
    >
      <v-btn value="feed" @click="$router.push('/feed')">
        <v-icon size="26">mdi-home{{ activeTab === 'feed' ? '' : '-outline' }}</v-icon>
      </v-btn>

      <v-btn value="explore" @click="$router.push('/explore')">
        <v-icon size="26">mdi-magnify</v-icon>
      </v-btn>

      <v-btn value="create" @click="$router.push('/create')">
        <v-icon size="26">mdi-plus-box{{ activeTab === 'create' ? '' : '-outline' }}</v-icon>
      </v-btn>

      <v-btn value="message" @click="$router.push('/message')">
        <v-badge :content="unreadCount" :model-value="unreadCount > 0" color="error" floating>
          <v-icon size="26">mdi-chat{{ activeTab === 'message' ? '' : '-outline' }}</v-icon>
        </v-badge>
      </v-btn>

      <v-btn value="profile" @click="$router.push('/profile')">
        <v-avatar size="28" v-if="userAvatar && !avatarError">
          <v-img :src="userAvatar" @error="avatarError = true" />
        </v-avatar>
        <v-icon size="26" v-else>mdi-account-circle{{ activeTab === 'profile' ? '' : '-outline' }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getLoggedUser } from '@/composable/auth'
import { useTheme } from 'vuetify'
import { getNotificationsForUser } from '@/services/apiNotifications'


const route = useRoute()
const vuetifyTheme = useTheme()

const currentTheme = ref(vuetifyTheme.global.name.value)
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'bookgramLight' ? 'bookgramDark' : 'bookgramLight'
  vuetifyTheme.global.name.value = currentTheme.value
}

const routeToTab: Record<string, string> = {
  '/feed': 'feed',
  '/explore': 'explore',
  '/create': 'create',
  '/message': 'message',
  '/profile': 'profile',
}

const isAdmin = computed(() => getLoggedUser()?.role === 'ADMIN')
const notifCount = ref(0)

const activeTab = ref('feed')
watch(() => route.path, (path) => {
  activeTab.value = routeToTab[path] ?? ''
  if (path === '/message') unreadCount.value = 0
}, { immediate: true })

const unreadCount = ref(0)

async function loadNotifications() {
  const u = getLoggedUser()
  if (!u?.id) return
  try {
    const notifs = await getNotificationsForUser(u.id)
    // badge do chat (topo): mensagens não lidas
    unreadCount.value = notifs.filter((n: any) => !n.read && n.type === 'message').length
    // badge de notificações (rodapé): demais notificações não lidas
    notifCount.value = notifs.filter((n: any) => !n.read && n.type !== 'message').length
  } catch {}
}

onMounted(() => {
  loadNotifications()
  // refresh every 30s
  setInterval(loadNotifications, 30000)
})

const avatarError = ref(false)

// ref reativo ao invés de computed (localStorage não é reativo)
const user = ref(getLoggedUser())

function refreshUser() {
  avatarError.value = false
  user.value = getLoggedUser()
}

const userAvatar = computed(() => {
  const u = user.value
  if (!u?.avatarUrl) return null
  const url = String(u.avatarUrl).trim()
  if (url === 'null' || url === 'undefined' || url === '') return null
  if (/^https?:\/\//i.test(url)) return url
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '')
  return apiBase + (url.startsWith('/') ? url : '/' + url)
})

onMounted(() => {
  window.addEventListener('user-updated', refreshUser)
})

onUnmounted(() => {
  window.removeEventListener('user-updated', refreshUser)
})
</script>

<style scoped>
.bookgram-logo {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Georgia', serif;
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
