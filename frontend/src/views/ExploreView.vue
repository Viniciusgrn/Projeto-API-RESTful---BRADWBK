<template>
  <div class="pb-16">
    <!-- Search bar -->
    <div class="pa-3">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        :placeholder="activeTab === 'posts' ? 'Pesquisar livros, autores…' : 'Pesquisar usuários…'"
        density="compact"
        variant="filled"
        rounded
        hide-details
        bg-color="grey-lighten-4"
        @input="onSearch"
      />
    </div>

    <!-- Tabs -->
    <v-tabs v-model="activeTab" density="compact" class="px-2 mb-1">
      <v-tab value="posts" prepend-icon="mdi-grid">Posts</v-tab>
      <v-tab value="people" prepend-icon="mdi-account-search">Pessoas</v-tab>
    </v-tabs>

    <!-- ── POSTS TAB ── -->
    <div v-if="activeTab === 'posts'">
      <!-- Loading -->
      <div v-if="loading" class="d-flex justify-center py-8">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <!-- Grid of posts -->
      <div v-else class="explore-grid">
      <div
        v-for="post in filtered"
        :key="post.id"
        class="explore-item"
        @click="openPost(post)"
      >
        <div v-if="post.coverImageUrl" class="explore-img-wrapper">
          <img :src="post.coverImageUrl" class="explore-img" loading="lazy" />
          <div class="explore-overlay d-flex flex-column justify-end pa-1">
            <div class="text-white text-caption font-weight-bold text-truncate">{{ post.bookTitle }}</div>
            <div class="d-flex align-center gap-1">
              <v-icon size="14" color="white">mdi-heart</v-icon>
              <span class="text-white text-caption">{{ post.likesCount }}</span>
            </div>
          </div>
        </div>
        <div v-else class="explore-img-wrapper bg-grey-lighten-3 d-flex flex-column justify-center align-center pa-2">
          <v-icon size="40" color="grey">mdi-book</v-icon>
          <div class="text-caption text-center mt-1 text-grey-darken-1 text-truncate w-100">{{ post.bookTitle }}</div>
        </div>
      </div>
    </div> <!-- end posts grid -->
    </div> <!-- end posts tab -->

    <!-- ── PESSOAS TAB ── -->
    <div v-if="activeTab === 'people'" class="pa-2">
      <div v-if="usersLoading" class="d-flex justify-center py-8">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div v-else-if="filteredUsers.length === 0" class="text-center py-10 text-medium-emphasis text-body-2">
        Nenhum usuário encontrado
      </div>

      <v-list v-else>
        <v-list-item
          v-for="u in filteredUsers"
          :key="u.id"
          rounded="lg"
          class="mb-1"
        >
          <template #prepend>
            <v-avatar size="46" color="primary">
              <v-img v-if="u.avatarUrl && u.avatarUrl !== 'null'" :src="u.avatarUrl" />
              <span v-else class="text-white font-weight-bold">{{ u.username.charAt(0).toUpperCase() }}</span>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium">{{ u.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ u.email }}</v-list-item-subtitle>
          <template #append>
            <v-btn
              size="small"
              variant="tonal"
              color="primary"
              prepend-icon="mdi-message-outline"
              @click="messageUser(u)"
            >
              Mensagem
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <!-- Post Detail Dialog -->
    <v-dialog v-model="showDialog" max-width="614" scrollable>
      <PostCard
        v-if="selectedPost"
        :post="selectedPost"
        @like="handleLike"
        @comment="handleComment"
        @delete="handleDelete"
        @user-click="() => {}"
      />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import { getFeed, toggleLike, addComment, deletePost, type PostDTO } from '@/services/apiPosts'
import { getUsers } from '@/services/apiRegisterUsers'
import { getLoggedUser } from '@/composable/auth'

interface UserSummary { id: number; username: string; email: string; avatarUrl?: string }

const router = useRouter()
const currentUser = getLoggedUser()
const activeTab = ref('posts')
const all = ref<PostDTO[]>([])
const filtered = ref<PostDTO[]>([])
const search = ref('')
const loading = ref(true)
const showDialog = ref(false)
const selectedPost = ref<PostDTO | null>(null)

// People
const allUsers = ref<UserSummary[]>([])
const usersLoading = ref(false)
const filteredUsers = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return allUsers.value
  return allUsers.value.filter(u => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
})

onMounted(async () => {
  loading.value = true
  try {
    all.value = await getFeed(currentUser?.id)
    filtered.value = all.value
  } finally {
    loading.value = false
  }
  // Load users in background
  usersLoading.value = true
  try {
    const users: UserSummary[] = await getUsers()
    allUsers.value = users.filter(u => u.id !== currentUser?.id)
  } catch (e) { console.warn('loadUsers', e) }
  finally { usersLoading.value = false }
})

function onSearch() {
  if (activeTab.value === 'posts') filterPosts()
}

function filterPosts() {
  const q = search.value.toLowerCase()
  if (!q) { filtered.value = all.value; return }
  filtered.value = all.value.filter(p =>
    p.bookTitle?.toLowerCase().includes(q) ||
    p.bookAuthor?.toLowerCase().includes(q) ||
    p.content?.toLowerCase().includes(q) ||
    p.username?.toLowerCase().includes(q)
  )
}

function messageUser(u: UserSummary) {
  router.push({ path: '/message', query: { userId: u.id } })
}

function openPost(post: PostDTO) {
  selectedPost.value = post
  showDialog.value = true
}

async function handleLike(postId: number) {
  if (!currentUser?.id) return
  const updated = await toggleLike(postId, currentUser.id)
  const idx = all.value.findIndex(p => p.id === postId)
  if (idx !== -1) {
    all.value[idx] = updated
    if (selectedPost.value?.id === postId) selectedPost.value = updated
  }
  filterPosts()
}

async function handleComment({ postId, content }: { postId: number; content: string }) {
  if (!currentUser?.id) return
  const updated = await addComment(postId, currentUser.id, content)
  const idx = all.value.findIndex(p => p.id === postId)
  if (idx !== -1) {
    all.value[idx] = updated
    if (selectedPost.value?.id === postId) selectedPost.value = updated
  }
}

async function handleDelete(postId: number) {
  if (!currentUser?.id) return
  if (!confirm('Excluir este post?')) return
  await deletePost(postId, currentUser.id)
  all.value = all.value.filter(p => p.id !== postId)
  showDialog.value = false
  filterPosts()
}
</script>

<style scoped>
.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.explore-item {
  aspect-ratio: 1;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.explore-img-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.explore-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.explore-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
}

.gap-1 { gap: 4px; }
.pb-16 { padding-bottom: 64px; }
.w-100 { width: 100%; }
</style>
