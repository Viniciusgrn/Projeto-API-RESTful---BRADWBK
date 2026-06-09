<template>
  <div class="pb-16 px-3">
    <!-- Header -->
    <div class="d-flex align-center py-3 mb-2">
      <v-icon color="primary" class="mr-2">mdi-clipboard-list</v-icon>
      <span class="text-h6 font-weight-bold">Minhas Atividades</span>
      <v-spacer />
      <v-chip size="small" color="warning" v-if="pending.length > 0">{{ pending.length }} pendentes</v-chip>
    </div>

    <v-divider class="mb-3" />

    <div v-if="loading" class="d-flex justify-center pa-8">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <div v-else-if="activities.length === 0" class="text-center py-12">
      <v-icon size="56" color="grey-lighten-2">mdi-clipboard-check-outline</v-icon>
      <div class="text-body-1 text-medium-emphasis mt-3">Nenhuma atividade atribuída ainda</div>
    </div>

    <template v-else>
      <!-- Pending -->
      <div v-if="pending.length > 0" class="mb-4">
        <div class="text-caption text-medium-emphasis font-weight-bold text-uppercase mb-2 pl-1">Por fazer</div>
        <v-card
          v-for="ua in pending"
          :key="ua.id"
          class="mb-2"
          rounded="lg"
          elevation="1"
          :color="typeCardColor(ua.type)"
        >
          <v-card-item>
            <template #prepend>
              <v-avatar :color="typeColor(ua.type)" size="36">
                <v-icon size="18" color="white">{{ typeIcon(ua.type) }}</v-icon>
              </v-avatar>
            </template>
            <v-card-title class="text-body-2 font-weight-bold">{{ ua.title }}</v-card-title>
            <v-card-subtitle class="d-flex align-center" style="gap:4px">
              <v-chip v-if="ua.xpReward > 0" size="x-small" color="amber" prepend-icon="mdi-star">+{{ ua.xpReward }} XP</v-chip>
              <v-chip v-if="ua.badgeName" size="x-small" color="purple" prepend-icon="mdi-medal">{{ ua.badgeName }}</v-chip>
              <v-chip v-if="ua.deadline" size="x-small" color="error" prepend-icon="mdi-calendar">{{ formatDate(ua.deadline) }}</v-chip>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text v-if="ua.description || ua.bookTitle" class="pt-0 pb-2">
            <div v-if="ua.description" class="text-caption text-medium-emphasis">{{ ua.description }}</div>
            <div v-if="ua.bookTitle" class="text-caption mt-1">
              <v-icon size="12" color="primary">mdi-book</v-icon> {{ ua.bookTitle }}
            </div>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn
              size="small"
              color="success"
              variant="tonal"
              prepend-icon="mdi-check"
              :loading="completing === ua.id"
              @click="markComplete(ua)"
            >Concluir</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Completed -->
      <div v-if="completed.length > 0">
        <div class="text-caption text-medium-emphasis font-weight-bold text-uppercase mb-2 pl-1">Concluídas</div>
        <v-card
          v-for="ua in completed"
          :key="ua.id"
          class="mb-2 opacity-70"
          rounded="lg"
          elevation="0"
          variant="outlined"
        >
          <v-card-item>
            <template #prepend>
              <v-avatar color="success" size="36">
                <v-icon size="18" color="white">mdi-check</v-icon>
              </v-avatar>
            </template>
            <v-card-title class="text-body-2 text-decoration-line-through text-medium-emphasis">{{ ua.title }}</v-card-title>
            <v-card-subtitle>
              <v-chip v-if="ua.xpReward > 0" size="x-small" color="success" prepend-icon="mdi-star">+{{ ua.xpReward }} XP ganhos</v-chip>
              <span v-if="ua.completedAt" class="text-caption text-medium-emphasis ml-2">{{ formatDate(ua.completedAt) }}</span>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </div>
    </template>

    <v-snackbar v-model="snackbar" color="success" timeout="3000" location="top">{{ snackMsg }}</v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import { getMyActivities, completeActivity, type UserActivityDTO } from '@/services/apiActivities'

const me = getLoggedUser()
const activities = ref<UserActivityDTO[]>([])
const loading = ref(true)
const completing = ref<number | null>(null)
const snackbar = ref(false)
const snackMsg = ref('')

const pending = computed(() => activities.value.filter(a => a.status === 'PENDING'))
const completed = computed(() => activities.value.filter(a => a.status === 'COMPLETED'))

async function load() {
  if (!me?.id) return
  loading.value = true
  try {
    activities.value = await getMyActivities(me.id)
  } finally {
    loading.value = false
  }
}
onMounted(load)

async function markComplete(ua: UserActivityDTO) {
  if (!me?.id) return
  completing.value = ua.id
  try {
    const updated = await completeActivity(ua.id, me.id)
    const idx = activities.value.findIndex(a => a.id === ua.id)
    if (idx !== -1) activities.value[idx] = updated
    snackMsg.value = ua.xpReward > 0 ? `🎉 +${ua.xpReward} XP ganhos!` : '✓ Atividade concluída!'
    snackbar.value = true
  } finally {
    completing.value = null
  }
}

function typeColor(type: string) {
  return type === 'CHALLENGE' ? 'orange' : type === 'EVENT' ? 'purple' : 'primary'
}
function typeCardColor(type: string) {
  return undefined // let it inherit
}
function typeIcon(type: string) {
  return type === 'CHALLENGE' ? 'mdi-trophy' : type === 'EVENT' ? 'mdi-calendar-star' : 'mdi-clipboard-check'
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.pb-16 { padding-bottom: 64px; }
</style>
