<template>
  <div class="feed-container pb-16">
    <!-- XP Bar at top -->
    <div v-if="xpData" class="px-4 pt-3 pb-2">
      <XpBadge :xp="xpData" />
    </div>

    <!-- Stories row (active users) -->
    <div class="stories-row px-2 py-2 d-flex overflow-x-auto">
      <div class="story-item text-center mx-1" v-for="item in storyUsers" :key="item.userId">
        <div class="story-ring">
          <v-avatar size="56" class="story-avatar">
            <v-img v-if="item.userAvatarUrl" :src="item.userAvatarUrl" cover />
            <v-icon v-else size="56">mdi-account-circle</v-icon>
          </v-avatar>
        </div>
        <div class="text-caption mt-1 story-name">{{ item.username }}</div>
        <div class="text-caption" style="color: #F77737">Nível {{ item.level }}</div>
      </div>
    </div>

    <v-divider />

    <!-- Loading -->
    <div v-if="loading" class="d-flex justify-center py-8">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- Empty state -->
    <div v-else-if="posts.length === 0" class="text-center py-16 px-4">
      <v-icon size="80" color="grey-lighten-2">mdi-book-open-variant</v-icon>
      <div class="text-h6 mt-4 text-medium-emphasis">Ainda não há posts</div>
      <div class="text-body-2 text-medium-emphasis mb-4">Seja o primeiro a compartilhar uma leitura!</div>
      <v-btn color="primary" rounded @click="$router.push('/create')">
        <v-icon start>mdi-plus</v-icon>Criar post
      </v-btn>
    </div>

    <!-- Posts Feed -->
    <template v-else>
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @like="handleLike"
        @comment="handleComment"
        @delete="handleDelete"
        @user-click="goToUserProfile"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import XpBadge from '@/components/XpBadge.vue'
import { getFeed, toggleLike, addComment, deletePost, type PostDTO } from '@/services/apiPosts'
import { getXP, getLeaderboard, type UserXPDTO } from '@/services/apiXP'
import { getLoggedUser } from '@/composable/auth'

const router = useRouter()
const currentUser = getLoggedUser()
const posts = ref<PostDTO[]>([])
const loading = ref(true)
const xpData = ref<UserXPDTO | null>(null)
const storyUsers = ref<UserXPDTO[]>([])

onMounted(async () => {
  loading.value = true
  try {
    const [feedData, leaderboard] = await Promise.all([
      getFeed(currentUser?.id),
      getLeaderboard(),
    ])
    posts.value = feedData
    storyUsers.value = leaderboard.slice(0, 10)

    if (currentUser?.id) {
      xpData.value = await getXP(currentUser.id)
    }
  } finally {
    loading.value = false
  }
})

async function handleLike(postId: number) {
  if (!currentUser?.id) return
  const updated = await toggleLike(postId, currentUser.id)
  const idx = posts.value.findIndex(p => p.id === postId)
  if (idx !== -1) posts.value[idx] = updated
}

async function handleComment({ postId, content }: { postId: number; content: string }) {
  if (!currentUser?.id) return
  const updated = await addComment(postId, currentUser.id, content)
  const idx = posts.value.findIndex(p => p.id === postId)
  if (idx !== -1) posts.value[idx] = updated
}

async function handleDelete(postId: number) {
  if (!currentUser?.id) return
  if (!confirm('Excluir este post?')) return
  await deletePost(postId, currentUser.id)
  posts.value = posts.value.filter(p => p.id !== postId)
}

function goToUserProfile(userId: number) {
  if (userId === currentUser?.id) {
    router.push('/profile')
  }
}
</script>

<style scoped>
.feed-container {
  max-width: 614px;
  margin: 0 auto;
}

.stories-row {
  gap: 4px;
  scrollbar-width: none;
}
.stories-row::-webkit-scrollbar { display: none; }

.story-item {
  min-width: 72px;
  flex-shrink: 0;
}

.story-ring {
  display: inline-flex;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C, #FD1D1D, #F77737);
}

.story-avatar {
  border: 2px solid white;
}

.story-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 64px;
  margin: 0 auto;
}

.pb-16 { padding-bottom: 64px; }
</style>
