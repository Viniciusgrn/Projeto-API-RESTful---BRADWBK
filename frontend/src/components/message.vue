<template>
  <div class="msg-shell pb-16">

    <!-- Lista de conversas -->
    <div v-if="!selectedUser || !isMobile" class="msg-list" :class="{ 'msg-list--full': !selectedUser }">
      <div class="msg-list-header px-4 py-3 d-flex align-center">
        <span class="text-h6 font-weight-bold flex-grow-1">Mensagens</span>
      </div>
      <v-divider />

      <div v-if="users.length === 0" class="text-center py-10 text-medium-emphasis text-body-2">
        Nenhum usuário encontrado
      </div>

      <v-list>
        <v-list-item
          v-for="u in users"
          :key="u.id"
          :active="selectedUser?.id === u.id"
          active-color="primary"
          rounded="lg"
          class="ma-1"
          @click="selectUser(u)"
        >
          <template #prepend>
            <v-avatar size="44" color="primary">
              <v-img v-if="u.avatarUrl && u.avatarUrl !== 'null'" :src="u.avatarUrl" />
              <span v-else class="text-white font-weight-bold">{{ u.username.charAt(0).toUpperCase() }}</span>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium">{{ u.username }}</v-list-item-title>
          <v-list-item-subtitle class="text-truncate">{{ lastMessageFor(u) }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </div>

    <!-- Área de chat -->
    <div v-if="selectedUser" class="msg-chat">
      <div class="msg-chat-header d-flex align-center px-3 py-2 bg-surface">
        <v-btn v-if="isMobile" icon variant="text" size="small" @click="selectedUser = null" class="mr-1">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-avatar size="36" color="primary" class="mr-2">
          <v-img v-if="selectedUser.avatarUrl && selectedUser.avatarUrl !== 'null'" :src="selectedUser.avatarUrl" />
          <span v-else class="text-white font-weight-bold text-body-2">{{ selectedUser.username.charAt(0).toUpperCase() }}</span>
        </v-avatar>
        <span class="font-weight-bold text-body-1">{{ selectedUser.username }}</span>
      </div>
      <v-divider />

      <div class="msg-bubbles" ref="messagesContainer">
        <div v-if="messages.length === 0" class="text-center text-medium-emphasis text-body-2 py-8">
          Comece a conversa! 👋
        </div>
        <div
          v-for="m in messages"
          :key="m.id"
          class="bubble-row"
          :class="Number(m.senderId) === Number(me?.id) ? 'bubble-sent' : 'bubble-received'"
        >
          <div class="bubble">{{ m.content }}</div>
          <div class="bubble-time">{{ formatTime(m.createdAt) }}</div>
        </div>
      </div>

      <div class="msg-input d-flex align-center px-3 py-2 bg-surface">
        <v-text-field
          v-model="newMessage"
          placeholder="Escreva uma mensagem..."
          variant="solo-filled"
          flat
          rounded="xl"
          density="compact"
          hide-details
          class="flex-grow-1 mr-2"
          @keyup.enter="send"
        />
        <v-btn icon color="primary" :disabled="!newMessage.trim()" @click="send">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Placeholder desktop -->
    <div v-if="!selectedUser && !isMobile" class="msg-empty d-flex flex-column align-center justify-center text-medium-emphasis">
      <v-icon size="64" color="grey-lighten-2">mdi-message-outline</v-icon>
      <div class="mt-3 text-body-1">Selecione uma conversa</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import { getUsers } from '@/services/apiRegisterUsers'
import { getConversation, sendMessage, getMessagesForUser } from '@/services/apiMessages'
import { connectSocket, disconnectSocket, subscribeConversation, unsubscribeConversation } from '@/services/socket'

interface User { id: number; username: string; avatarUrl?: string }
interface Message { id: number; senderId: number; receiverId: number; content: string; createdAt: string }

const props = defineProps<{ preselectUserId?: number | null }>()

const me = getLoggedUser() as User | null
const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const messages = ref<Message[]>([])       // mensagens da conversa atual
const allMessages = ref<Message[]>([])    // todas as mensagens (para preview na lista)
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const isMobile = computed(() => window.innerWidth < 768)

async function loadUsers() {
  try {
    const all: User[] = await getUsers()
    users.value = all.filter(u => u.id !== me?.id)
  } catch (e) { console.warn('loadUsers', e) }
}

function lastMessageFor(u: User) {
  const conv = allMessages.value.filter(m =>
    (Number(m.senderId) === Number(u.id) && Number(m.receiverId) === Number(me?.id)) ||
    (Number(m.senderId) === Number(me?.id) && Number(m.receiverId) === Number(u.id))
  )
  return conv.at(-1)?.content ?? ''
}

function formatTime(ts: string) {
  if (!ts) return ''
  const d = new Date(ts)
  const now = new Date()
  if (d.toDateString() === now.toDateString())
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return d.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
}

function scrollToBottom() {
  setTimeout(() => {
    if (messagesContainer.value)
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }, 50)
}

async function selectUser(u: User) {
  selectedUser.value = u
  if (!me?.id || !u.id) return
  try {
    messages.value = await getConversation(me.id, u.id) as Message[]
    scrollToBottom()
  } catch (e) { console.warn('loadConversation', e) }
  const a = Number(me.id), b = Number(u.id)
  const convId = a < b ? `${a}_${b}` : `${b}_${a}`
  subscribeConversation(convId, (msg: Message) => {
    if (selectedUser.value &&
      ((Number(msg.senderId) === Number(me.id) && Number(msg.receiverId) === Number(selectedUser.value.id)) ||
       (Number(msg.receiverId) === Number(me.id) && Number(msg.senderId) === Number(selectedUser.value.id)))) {
      if (msg.id && messages.value.some(m => Number(m.id) === Number(msg.id))) return
      messages.value.push(msg)
      // Update sidebar preview
      if (!allMessages.value.some(m => Number(m.id) === Number(msg.id)))
        allMessages.value.push(msg)
      scrollToBottom()
    }
  })
}

async function send() {
  if (!newMessage.value.trim() || !selectedUser.value || !me?.id) return
  const content = newMessage.value.trim()
  newMessage.value = ''
  try {
    // Não adicionamos localmente — o WebSocket entrega a mensagem de volta
    await sendMessage({ senderId: me.id, receiverId: selectedUser.value.id, content })
  } catch (e) {
    console.error('send error', e)
    newMessage.value = content
  }
}

onMounted(async () => {
  await loadUsers()
  if (me?.id) {
    try {
      const all = await getMessagesForUser(me.id) as Message[]
      allMessages.value = (all || []).reverse()
    } catch (e) {}
  }
  // Pre-select user if navigated from Explore
  if (props.preselectUserId) {
    const target = users.value.find(u => u.id === props.preselectUserId)
    if (target) selectUser(target)
  }
  try { connectSocket(() => {}) } catch (e) { console.warn('Socket failed', e) }
})

onUnmounted(() => {
  try { unsubscribeConversation() } catch (e) {}
  try { disconnectSocket() } catch (e) {}
})
</script>

<style scoped>
.msg-shell {
  display: flex;
  height: calc(100vh - 112px);
  overflow: hidden;
}
.msg-list {
  width: 320px;
  min-width: 280px;
  border-right: 1px solid rgba(0,0,0,0.08);
  overflow-y: auto;
  flex-shrink: 0;
}
.msg-list--full {
  width: 100%;
  border-right: none;
}
.msg-list-header {
  position: sticky;
  top: 0;
  background: rgb(var(--v-theme-surface));
  z-index: 1;
}
.msg-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.msg-chat-header {
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.msg-bubbles {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.msg-input {
  border-top: 1px solid rgba(0,0,0,0.08);
}
.msg-empty { flex: 1; }
.bubble-row {
  display: flex;
  flex-direction: column;
  max-width: 72%;
}
.bubble-sent { align-self: flex-end; align-items: flex-end; }
.bubble-received { align-self: flex-start; align-items: flex-start; }
.bubble {
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.4;
  word-break: break-word;
  background: rgb(var(--v-theme-surface-variant));
}
.bubble-sent .bubble {
  background: rgb(var(--v-theme-primary));
  color: white;
  border-bottom-right-radius: 4px;
}
.bubble-received .bubble { border-bottom-left-radius: 4px; }
.bubble-time {
  font-size: 0.7rem;
  color: rgba(var(--v-theme-on-surface), 0.5);
  margin-top: 2px;
  padding: 0 4px;
}
@media (max-width: 767px) {
  .msg-list { width: 100%; min-width: unset; border-right: none; }
  .msg-chat {
    position: fixed;
    top: 56px; left: 0; right: 0; bottom: 56px;
    background: rgb(var(--v-theme-background));
    z-index: 10;
  }
}
</style>
