<template>
  <div class="pb-16 px-3">
    <!-- Header -->
    <div class="d-flex align-center py-3 mb-2">
      <v-icon color="primary" class="mr-2">mdi-shield-crown</v-icon>
      <span class="text-h6 font-weight-bold">Painel Admin</span>
      <v-spacer />
      <v-btn icon size="small" color="primary" @click="openCreate">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>

    <v-divider class="mb-3" />

    <!-- Tabs -->
    <v-tabs v-model="tab" density="compact" class="mb-3">
      <v-tab value="activities">Atividades</v-tab>
      <v-tab value="users">Usuários</v-tab>
    </v-tabs>

    <!-- ── Atividades Tab ── -->
    <div v-if="tab === 'activities'">
    <div class="d-flex gap-2 mb-4 flex-wrap">
      <v-chip color="primary" size="small" prepend-icon="mdi-flag-checkered">
        {{ activities.length }} atividades
      </v-chip>
      <v-chip color="success" size="small" prepend-icon="mdi-account-multiple">
        {{ users.length }} usuários
      </v-chip>
    </div>

    <!-- Activity list -->
    <div v-if="loadingActivities" class="d-flex justify-center pa-8">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <div v-else-if="activities.length === 0" class="text-center py-10">
      <v-icon size="48" color="grey-lighten-2">mdi-clipboard-list-outline</v-icon>
      <div class="text-body-2 text-medium-emphasis mt-2">Nenhuma atividade criada</div>
      <v-btn color="primary" size="small" class="mt-3" @click="openCreate">Criar primeira</v-btn>
    </div>

    <v-card v-for="act in activities" :key="act.id" class="mb-3" rounded="lg" elevation="1">
      <v-card-item>
        <template #prepend>
          <v-avatar :color="typeColor(act.type)" size="36">
            <v-icon size="18" color="white">{{ typeIcon(act.type) }}</v-icon>
          </v-avatar>
        </template>
        <v-card-title class="text-body-1 font-weight-bold">{{ act.title }}</v-card-title>
        <v-card-subtitle>
          <v-chip size="x-small" :color="typeColor(act.type)" class="mr-1">{{ typeLabel(act.type) }}</v-chip>
          <v-chip v-if="act.xpReward > 0" size="x-small" color="amber" prepend-icon="mdi-star">+{{ act.xpReward }} XP</v-chip>
          <v-chip v-if="act.badgeName" size="x-small" color="purple" prepend-icon="mdi-medal" class="ml-1">{{ act.badgeName }}</v-chip>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text v-if="act.description || act.bookTitle || act.deadline" class="pt-0 text-caption text-medium-emphasis">
        <div v-if="act.description">{{ act.description }}</div>
        <div v-if="act.bookTitle"><v-icon size="12">mdi-book</v-icon> {{ act.bookTitle }}</div>
        <div v-if="act.deadline"><v-icon size="12">mdi-calendar</v-icon> Prazo: {{ formatDate(act.deadline) }}</div>
      </v-card-text>

      <v-card-actions class="pt-0">
        <v-btn size="x-small" variant="tonal" color="primary" prepend-icon="mdi-account-plus" @click="openAssign(act)">
          Atribuir
        </v-btn>
        <v-btn size="x-small" variant="tonal" color="success" prepend-icon="mdi-chart-bar" @click="openProgress(act)">
          Progresso
        </v-btn>
        <v-spacer />
        <v-btn size="x-small" variant="text" color="error" icon @click="deleteAct(act.id)">
          <v-icon size="16">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    </div> <!-- end activities tab -->

    <!-- ── Usuários Tab ── -->
    <div v-if="tab === 'users'">
      <div v-if="loadingActivities" class="d-flex justify-center pa-8">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <v-card v-for="u in users" :key="u.id" class="mb-2" rounded="lg" elevation="1">
        <v-card-item>
          <template #prepend>
            <v-avatar :color="u.role === 'ADMIN' ? 'amber' : 'grey-lighten-2'" size="36">
              <v-icon size="18" :color="u.role === 'ADMIN' ? 'white' : 'grey'">{{ u.role === 'ADMIN' ? 'mdi-shield-crown' : 'mdi-account' }}</v-icon>
            </v-avatar>
          </template>
          <v-card-title class="text-body-2 font-weight-bold">{{ u.username }}</v-card-title>
          <v-card-subtitle class="text-caption">{{ u.email }}</v-card-subtitle>
          <template #append>
            <v-chip v-if="u.role === 'ADMIN'" color="amber" size="x-small" prepend-icon="mdi-shield-crown">Admin</v-chip>
            <v-btn
              v-else
              size="x-small"
              variant="tonal"
              color="primary"
              :loading="promoting === u.id"
              @click="promoteUser(u)"
            >Promover</v-btn>
          </template>
        </v-card-item>
      </v-card>
    </div> <!-- end users tab -->

    <v-dialog v-model="showCreate" max-width="360" scrollable>
      <v-card rounded="lg">
        <div class="d-flex align-center px-4 pt-3 pb-1">
          <span class="text-subtitle-1 font-weight-bold">Nova atividade</span>
          <v-spacer />
          <v-btn icon size="small" variant="text" @click="showCreate = false"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider />
        <v-card-text class="pa-3">
          <v-text-field v-model="form.title" label="Título *" density="compact" variant="outlined" class="mb-2" hide-details />
          <v-textarea v-model="form.description" label="Descrição" density="compact" variant="outlined" rows="2" class="mb-2" hide-details />
          <v-select v-model="form.type" :items="typeOptions" label="Tipo" density="compact" variant="outlined" class="mb-2" hide-details />
          <v-text-field v-model.number="form.xpReward" label="XP de recompensa" type="number" density="compact" variant="outlined" class="mb-2" hide-details />
          <v-text-field v-model="form.badgeName" label="Badge (opcional)" density="compact" variant="outlined" class="mb-2" hide-details />
          <v-text-field v-model="form.bookTitle" label="Livro associado (opcional)" density="compact" variant="outlined" class="mb-2" hide-details />
          <v-text-field v-model="form.deadline" label="Prazo (YYYY-MM-DDTHH:MM:SS)" density="compact" variant="outlined" hide-details placeholder="ex: 2026-06-30T23:59:00" />
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer />
          <v-btn variant="tonal" color="primary" :loading="saving" @click="submitCreate">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ── Dialog: Atribuir usuários ── -->
    <v-dialog v-model="showAssign" max-width="360" scrollable>
      <v-card rounded="lg">
        <div class="d-flex align-center px-4 pt-3 pb-1">
          <span class="text-subtitle-1 font-weight-bold">Atribuir: {{ selectedAct?.title }}</span>
          <v-spacer />
          <v-btn icon size="small" variant="text" @click="showAssign = false"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider />
        <v-card-text class="pa-2">
          <v-list density="compact">
            <v-list-item v-for="u in users" :key="u.id" rounded="lg" class="px-1">
              <template #prepend>
                <v-checkbox-btn
                  :model-value="selectedUserIds.includes(u.id)"
                  @update:model-value="toggleUser(u.id)"
                  density="compact"
                />
              </template>
              <v-list-item-title class="text-body-2">{{ u.username }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">{{ u.email }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-btn size="small" variant="text" @click="selectedUserIds = users.map(u => u.id)">Todos</v-btn>
          <v-spacer />
          <v-btn variant="tonal" color="primary" :loading="saving" :disabled="selectedUserIds.length === 0" @click="submitAssign">
            Atribuir ({{ selectedUserIds.length }})
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ── Dialog: Progresso ── -->
    <v-dialog v-model="showProgress" max-width="360" scrollable>
      <v-card rounded="lg">
        <div class="d-flex align-center px-4 pt-3 pb-1">
          <span class="text-subtitle-1 font-weight-bold">Progresso: {{ selectedAct?.title }}</span>
          <v-spacer />
          <v-btn icon size="small" variant="text" @click="showProgress = false"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider />
        <div v-if="loadingProgress" class="d-flex justify-center pa-6"><v-progress-circular indeterminate /></div>
        <v-list v-else density="compact">
          <div v-if="progress.length === 0" class="text-center pa-4 text-caption text-medium-emphasis">Ainda não foi atribuída a ninguém</div>
          <v-list-item v-for="p in progress" :key="p.id">
            <v-list-item-title>{{ p.username }}</v-list-item-title>
            <template #append>
              <v-chip :color="p.status === 'COMPLETED' ? 'success' : 'warning'" size="x-small">
                {{ p.status === 'COMPLETED' ? '✓ Concluída' : 'Pendente' }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackColor" timeout="3000" location="top">{{ snackMsg }}</v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import api from '@/services/api'
import {
  adminCreateActivity, adminAssignActivity, adminListActivities,
  adminGetProgress, adminDeleteActivity, adminListUsers,
  type Activity, type UserActivityDTO, type UserSummary
} from '@/services/apiActivities'

const me = getLoggedUser()
const myId = me?.id as number

const tab = ref('activities')
const activities = ref<Activity[]>([])
const users = ref<UserSummary[]>([])
const promoting = ref<number | null>(null)

async function promoteUser(u: UserSummary) {
  if (!confirm(`Promover "${u.username}" a Admin?`)) return
  promoting.value = u.id
  try {
    await api.post(`/users/${u.id}/promote`, null, { params: { requesterId: myId } })
    u.role = 'ADMIN'
    toast(`${u.username} é agora Admin!`)
  } catch {
    toast('Sem permissão ou erro ao promover', 'error')
  } finally {
    promoting.value = null
  }
}
const loadingActivities = ref(true)
const saving = ref(false)

// Create dialog
const showCreate = ref(false)
const form = ref({ title: '', description: '', type: 'TASK', xpReward: 30, badgeName: '', bookTitle: '', deadline: '' })
const typeOptions = [
  { title: 'Tarefa', value: 'TASK' },
  { title: 'Desafio de leitura', value: 'CHALLENGE' },
  { title: 'Evento / Clube', value: 'EVENT' },
]

// Assign dialog
const showAssign = ref(false)
const selectedAct = ref<Activity | null>(null)
const selectedUserIds = ref<number[]>([])

// Progress dialog
const showProgress = ref(false)
const progress = ref<UserActivityDTO[]>([])
const loadingProgress = ref(false)

// Snackbar
const snackbar = ref(false)
const snackMsg = ref('')
const snackColor = ref('success')

function toast(msg: string, color = 'success') {
  snackMsg.value = msg; snackColor.value = color; snackbar.value = true
}

async function load() {
  loadingActivities.value = true
  try {
    const [acts, us] = await Promise.all([adminListActivities(myId), adminListUsers(myId)])
    activities.value = acts
    users.value = us
  } catch {
    toast('Erro ao carregar dados', 'error')
  } finally {
    loadingActivities.value = false
  }
}
onMounted(load)

function openCreate() {
  form.value = { title: '', description: '', type: 'TASK', xpReward: 30, badgeName: '', bookTitle: '', deadline: '' }
  showCreate.value = true
}
async function submitCreate() {
  if (!form.value.title.trim()) { toast('Título obrigatório', 'error'); return }
  saving.value = true
  try {
    const a = await adminCreateActivity(myId, {
      title: form.value.title,
      description: form.value.description || undefined,
      type: form.value.type,
      xpReward: form.value.xpReward,
      badgeName: form.value.badgeName || undefined,
      bookTitle: form.value.bookTitle || undefined,
      deadline: form.value.deadline || undefined,
    })
    activities.value.unshift(a)
    showCreate.value = false
    toast('Atividade criada!')
  } catch {
    toast('Erro ao criar atividade', 'error')
  } finally {
    saving.value = false
  }
}

function openAssign(act: Activity) {
  selectedAct.value = act
  selectedUserIds.value = []
  showAssign.value = true
}
function toggleUser(id: number) {
  const idx = selectedUserIds.value.indexOf(id)
  if (idx === -1) selectedUserIds.value.push(id)
  else selectedUserIds.value.splice(idx, 1)
}
async function submitAssign() {
  if (!selectedAct.value) return
  saving.value = true
  try {
    await adminAssignActivity(myId, selectedAct.value.id, selectedUserIds.value)
    showAssign.value = false
    toast(`Atribuída a ${selectedUserIds.value.length} usuário(s)!`)
  } catch {
    toast('Erro ao atribuir', 'error')
  } finally {
    saving.value = false
  }
}

async function openProgress(act: Activity) {
  selectedAct.value = act
  progress.value = []
  showProgress.value = true
  loadingProgress.value = true
  try {
    progress.value = await adminGetProgress(myId, act.id)
  } finally {
    loadingProgress.value = false
  }
}

async function deleteAct(id: number) {
  if (!confirm('Eliminar esta atividade e todas as atribuições?')) return
  try {
    await adminDeleteActivity(myId, id)
    activities.value = activities.value.filter(a => a.id !== id)
    toast('Eliminada')
  } catch {
    toast('Erro ao eliminar', 'error')
  }
}

function typeColor(type: string) {
  return type === 'CHALLENGE' ? 'orange' : type === 'EVENT' ? 'purple' : 'primary'
}
function typeIcon(type: string) {
  return type === 'CHALLENGE' ? 'mdi-trophy' : type === 'EVENT' ? 'mdi-calendar-star' : 'mdi-clipboard-check'
}
function typeLabel(type: string) {
  return type === 'CHALLENGE' ? 'Desafio' : type === 'EVENT' ? 'Evento' : 'Tarefa'
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.gap-2 { gap: 8px; }
.pb-16 { padding-bottom: 64px; }
</style>
