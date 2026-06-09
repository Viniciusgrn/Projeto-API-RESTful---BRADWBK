<template>
  <div class="pb-16 px-3">
    <!-- Header -->
    <div class="d-flex align-center py-3 mb-2">
      <v-icon color="primary" class="mr-2">mdi-bell</v-icon>
      <span class="text-h6 font-weight-bold">Notificações</span>
      <v-spacer />
      <v-btn
        v-if="unreadCount > 0"
        size="small"
        variant="text"
        color="primary"
        @click="markAllRead"
      >Marcar todas como lidas</v-btn>
    </div>

    <v-divider class="mb-3" />

    <div v-if="loading" class="d-flex justify-center pa-8">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <div v-else-if="notifications.length === 0" class="text-center py-12">
      <v-icon size="56" color="grey-lighten-2">mdi-bell-outline</v-icon>
      <div class="text-body-1 text-medium-emphasis mt-3">Nenhuma notificação ainda</div>
    </div>

    <v-list v-else lines="two" class="bg-transparent">
      <v-list-item
        v-for="n in notifications"
        :key="n.id"
        rounded="lg"
        class="mb-1"
        :class="{ 'unread': !n.read }"
        @click="markRead(n)"
      >
        <template #prepend>
          <v-avatar :color="iconColor(n.type)" size="40">
            <v-icon color="white" size="20">{{ iconFor(n.type) }}</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title v-html="n.title" />
        <v-list-item-subtitle>{{ formatTime(n.createdAt) }}</v-list-item-subtitle>

        <template #append>
          <v-icon v-if="!n.read" size="10" color="error">mdi-circle</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import { getNotificationsForUser, markNotificationRead } from '@/services/apiNotifications'

const me = getLoggedUser()
const notifications = ref<any[]>([])
const loading = ref(true)

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

async function load() {
  if (!me?.id) return
  loading.value = true
  try {
    const list = await getNotificationsForUser(me.id)
    notifications.value = (list || []).map((n: any) => ({ ...n, read: n.read ?? false }))
  } finally {
    loading.value = false
  }
}
onMounted(load)

async function markRead(n: any) {
  if (n.read) return
  try {
    await markNotificationRead(n.id)
  } catch (e) {
    console.warn('Falha ao marcar como lida', e)
  }
  n.read = true
}

async function markAllRead() {
  const unread = notifications.value.filter(n => !n.read)
  await Promise.all(unread.map(n => markRead(n)))
}

function iconFor(type: string) {
  if (type === 'message') return 'mdi-chat'
  if (type === 'friend_request') return 'mdi-account-plus'
  if (type === 'comment') return 'mdi-comment-text'
  return 'mdi-bell-ring'
}
function iconColor(type: string) {
  if (type === 'message') return 'primary'
  if (type === 'friend_request') return 'success'
  if (type === 'comment') return 'purple'
  return 'amber'
}
function formatTime(ts: any) {
  if (!ts) return ''
  return new Date(ts).toLocaleString('pt-BR')
}
</script>

<style scoped>
.pb-16 { padding-bottom: 64px; }
.unread {
  background: rgba(var(--v-theme-primary), 0.06);
}
</style>
