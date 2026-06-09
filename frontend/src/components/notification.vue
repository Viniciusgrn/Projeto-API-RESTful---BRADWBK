<template>
  <div>
    <template v-if="!inline">
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-badge :content="unreadCount" color="error" v-bind="props">
            <v-btn icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <v-list style="min-width: 320px; max-height: 360px; overflow:auto;">
          <template v-if="notifications.length">
            <v-list-item v-for="n in notifications" :key="n.id">
              <v-list-item-avatar>
                <v-icon v-if="n.type === 'message'">mdi-email</v-icon>
                <v-icon v-else-if="n.type === 'friend_request'">mdi-account-plus</v-icon>
                <v-icon v-else>mdi-bell-ring</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="n.title"></v-list-item-title>
                <v-list-item-subtitle>{{ formatTime(n.createdAt) }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text small @click="markRead(n)">Marcar lido</v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-list-item v-else>
            <v-list-item-content>
              <v-list-item-title>Sem notificações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <!-- Inline mode: render list directly (used inside dialog) -->
      <v-list style="min-width: 320px; max-height: 60vh; overflow:auto;">
        <template v-if="notifications.length">
          <v-list-item v-for="n in notifications" :key="n.id">
            <v-list-item-avatar>
              <v-icon v-if="n.type === 'message'">mdi-email</v-icon>
              <v-icon v-else-if="n.type === 'friend_request'">mdi-account-plus</v-icon>
              <v-icon v-else>mdi-bell-ring</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="n.title"></v-list-item-title>
              <v-list-item-subtitle>{{ formatTime(n.createdAt) }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text small @click="markRead(n)">Marcar lido</v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title>Sem notificações</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'
import { onNotification } from '@/services/socket'
import { getLoggedUser } from '@/composable/auth'
import { getNotificationsForUser, markNotificationRead } from '@/services/apiNotifications'

const props = defineProps<{ inline?: boolean }>()
const inline = props.inline ?? false

const notifications = ref<Array<any>>([])
const unreadCount = ref(0)

function formatTime(ts:any){ if(!ts) return ''; const d = new Date(ts); return d.toLocaleString() }

function pushNotification(n:any){
  n.read = n.read || false
  // evita duplicar notificação que já foi carregada do servidor
  if (notifications.value.some(x => x.id === n.id)) {
    unreadCount.value = notifications.value.filter(x=>!x.read).length
    return
  }
  notifications.value.unshift(n)
  unreadCount.value = notifications.value.filter(x=>!x.read).length
}

function markRead(n:any){
  // persist read state to server
  try {
    markNotificationRead(n.id).then(() => {
      n.read = true
      unreadCount.value = notifications.value.filter(x=>!x.read).length
    }).catch(e=>{ console.warn('mark read failed', e); n.read = true; unreadCount.value = notifications.value.filter(x=>!x.read).length })
  } catch(e) { n.read = true; unreadCount.value = notifications.value.filter(x=>!x.read).length }
}

let off: (()=>void) | null = null
onMounted(()=>{
  // register handler
  off = onNotification((n)=>{
    pushNotification(n)
  })

  // load persisted notifications
  try {
    const u = getLoggedUser()
    if (u?.id) {
      getNotificationsForUser(u.id).then(list => {
        notifications.value = (list || []).map((n: any) => ({ ...n, read: n.read ?? false }))
        unreadCount.value = notifications.value.filter((x: any) => !x.read).length
      }).catch(e => console.warn('Could not load notifications', e))
    }
  } catch(e) {}
})

onUnmounted(()=>{ if(off) off() })
</script>

<style scoped>
.v-list-item{ cursor: pointer }
</style>
 