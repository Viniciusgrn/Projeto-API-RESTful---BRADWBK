<template>
  <div class="pb-16">
    <!-- Loading -->
    <div v-if="loading" class="d-flex justify-center pa-8">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <template v-else>
      <!-- ── Header ── -->
      <div class="pa-4 pb-2">
        <!-- Linha superior: username + menu -->
        <div class="d-flex align-center justify-space-between mb-3">
          <span class="font-weight-bold text-body-1">{{ user?.username }}</span>
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon variant="text" v-bind="props" size="small">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list density="compact" min-width="160">
              <v-list-item prepend-icon="mdi-cog-outline" title="Editar perfil" @click="showEditProfile = true" />
              <v-list-item prepend-icon="mdi-bookshelf" title="Biblioteca" @click="$router.push('/myBooks')" />
              <v-divider />
              <v-list-item prepend-icon="mdi-logout" title="Sair" base-color="error" @click="handleLogout" />
            </v-list>
          </v-menu>
        </div>

        <div class="d-flex align-center mb-4 gap-4">
          <!-- Avatar com gradient ring -->
          <div class="avatar-ring flex-shrink-0" @click="showEditProfile = true">
            <v-avatar size="82">
              <v-img v-if="avatarSrc" :src="avatarSrc" cover />
              <v-icon v-else size="48" color="grey">mdi-account-circle</v-icon>
            </v-avatar>
          </div>

          <!-- Stats -->
          <div class="d-flex flex-grow-1 justify-space-around text-center">
            <div>
              <div class="text-h6 font-weight-bold">{{ posts.length }}</div>
              <div class="text-caption text-medium-emphasis">posts</div>
            </div>
            <div>
              <div class="text-h6 font-weight-bold">{{ xpData?.totalBooksRead ?? 0 }}</div>
              <div class="text-caption text-medium-emphasis">lidos</div>
            </div>
            <div>
              <div class="text-h6 font-weight-bold">{{ xpData?.level ?? 1 }}</div>
              <div class="text-caption text-medium-emphasis">nível</div>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="text-caption text-medium-emphasis">{{ user?.email }}</div>

        <!-- Bio -->
        <div v-if="user?.bio" class="text-body-2 mt-1 mb-3" style="white-space: pre-wrap;">{{ user.bio }}</div>
        <div v-else class="mb-3"></div>

        <!-- XP Bar -->
        <XpBadge v-if="xpData" :xp="xpData" class="mb-3" />

        <!-- Botões de ação -->
        <div class="d-flex gap-2 mb-3">
          <v-btn
            variant="outlined"
            rounded="lg"
            size="small"
            class="flex-grow-1"
            @click="showEditProfile = true"
          >
            Editar perfil
          </v-btn>
          <v-btn
            variant="outlined"
            rounded="lg"
            size="small"
            class="flex-grow-1"
            @click="$router.push('/myBooks')"
          >
            <v-icon start size="16">mdi-bookshelf</v-icon>
            Biblioteca
          </v-btn>
        </div>

        <!-- Conquistas -->
        <div v-if="xpData" class="d-flex flex-wrap" style="gap:6px">
          <v-chip v-if="xpData.streak >= 3" color="orange" size="small" prepend-icon="mdi-fire">
            {{ xpData.streak }} dias
          </v-chip>
          <v-chip v-if="xpData.totalBooksRead >= 1" color="success" size="small" prepend-icon="mdi-book-check">
            {{ xpData.totalBooksRead }} lidos
          </v-chip>
          <v-chip v-if="xpData.level >= 5" color="primary" size="small" prepend-icon="mdi-star">
            Leitor Avançado
          </v-chip>
          <v-chip v-if="xpData.level >= 10" color="purple" size="small" prepend-icon="mdi-crown">
            Mestre
          </v-chip>
        </div>
      </div>

      <v-divider class="mb-1" />

      <!-- ── Grelha de posts ── -->
      <div v-if="posts.length === 0" class="text-center py-12 px-4">
        <v-icon size="56" color="grey-lighten-2">mdi-book-open-variant-outline</v-icon>
        <div class="text-body-1 text-medium-emphasis mt-3">Ainda não publicou nenhuma review</div>
        <v-btn color="primary" rounded="lg" class="mt-4" size="small" @click="$router.push('/create')">
          <v-icon start>mdi-plus</v-icon>Criar post
        </v-btn>
      </div>

      <div v-else class="posts-grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-thumb"
          @click="openPost(post)"
        >
          <div v-if="post.coverImageUrl" class="thumb-wrapper">
            <img :src="post.coverImageUrl" class="thumb-img" loading="lazy" />
            <div class="thumb-overlay d-flex align-center justify-center" style="gap:4px">
              <v-icon size="14" color="white">mdi-heart</v-icon>
              <span class="text-white text-caption font-weight-bold">{{ post.likesCount }}</span>
            </div>
          </div>
          <div v-else class="thumb-wrapper no-cover d-flex flex-column align-center justify-center pa-1">
            <v-icon size="24" color="grey-lighten-1">mdi-book</v-icon>
            <div class="text-caption text-grey text-center mt-1" style="font-size:9px;line-height:1.2;overflow:hidden;max-height:32px">
              {{ post.bookTitle }}
            </div>
          </div>
        </div>
      </div>


    </template>

    <!-- ── Dialog: ver post ── -->
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

    <!-- ── Dialog: editar perfil ── -->
    <v-dialog v-model="showEditProfile" max-width="520">
      <profile-component @close-dialog="onProfileClosed" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import XpBadge from '@/components/XpBadge.vue'
import ProfileComponent from '@/components/profile.vue'
import { getUserPosts, toggleLike, addComment, deletePost, type PostDTO } from '@/services/apiPosts'
import { getXP, type UserXPDTO } from '@/services/apiXP'
import { getUserById } from '@/services/apiRegisterUsers'
import { getLoggedUser, logout } from '@/composable/auth'
import api from '@/services/api'

const router = useRouter()
const user = ref<any>(getLoggedUser())
const posts = ref<PostDTO[]>([])
const xpData = ref<UserXPDTO | null>(null)
const loading = ref(true)
const showDialog = ref(false)
const selectedPost = ref<PostDTO | null>(null)
const showEditProfile = ref(false)

const avatarSrc = computed(() => {
  const u = user.value
  if (!u?.avatarUrl) return null
  const url = String(u.avatarUrl)
  if (/^https?:\/\//i.test(url)) return url
  const base = (api.defaults.baseURL || '').replace(/\/api\/?$/, '')
  return url.startsWith('/') ? base + url : base + '/' + url
})

async function loadData() {
  const u = getLoggedUser()
  if (!u?.id) return
  loading.value = true
  try {
    const [userPosts, xp, fullUser] = await Promise.all([
      getUserPosts(u.id, u.id),
      getXP(u.id),
      getUserById(u.id).catch(() => null),
    ])
    posts.value = userPosts
    xpData.value = xp
    if (fullUser) user.value = { ...u, ...fullUser }
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

function onProfileClosed() {
  showEditProfile.value = false
  // refresh avatar from updated localStorage
  loadData()
}

function openPost(post: PostDTO) {
  selectedPost.value = post
  showDialog.value = true
}

async function handleLike(postId: number) {
  const uid = user.value?.id
  if (!uid) return
  const updated = await toggleLike(postId, uid)
  const idx = posts.value.findIndex(p => p.id === postId)
  if (idx !== -1) posts.value[idx] = updated
  if (selectedPost.value?.id === postId) selectedPost.value = updated
}

async function handleComment({ postId, content }: { postId: number; content: string }) {
  const uid = user.value?.id
  if (!uid) return
  const updated = await addComment(postId, uid, content)
  const idx = posts.value.findIndex(p => p.id === postId)
  if (idx !== -1) posts.value[idx] = updated
  if (selectedPost.value?.id === postId) selectedPost.value = updated
}

async function handleDelete(postId: number) {
  const uid = user.value?.id
  if (!uid) return
  if (!confirm('Excluir este post?')) return
  await deletePost(postId, uid)
  posts.value = posts.value.filter(p => p.id !== postId)
  showDialog.value = false
}

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<style scoped>
.avatar-ring {
  display: inline-flex;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C, #FD1D1D, #F77737);
  cursor: pointer;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.post-thumb {
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  background: #f5f5f5;
}

.thumb-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.no-cover {
  background: #f0f0f0;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  opacity: 0;
  transition: opacity 0.2s;
}

.post-thumb:hover .thumb-overlay {
  opacity: 1;
}

.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.pb-16 { padding-bottom: 64px; }
</style>
