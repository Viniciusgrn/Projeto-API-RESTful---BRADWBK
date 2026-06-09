<template>
  <v-card flat rounded="0" class="post-card border-b mb-0" color="surface">
    <!-- Header: Avatar + Name + Menu -->
    <div class="d-flex align-center px-3 py-2">
      <v-avatar size="36" class="cursor-pointer" @click="$emit('user-click', post.userId)">
        <v-img v-if="avatarSrc" :src="avatarSrc" cover />
        <v-icon v-else size="36">mdi-account-circle</v-icon>
      </v-avatar>
      <div class="ml-2 flex-grow-1">
        <div class="font-weight-bold text-body-2 cursor-pointer" @click="$emit('user-click', post.userId)">
          {{ post.username }}
        </div>
        <div class="text-caption text-medium-emphasis">
          {{ post.bookTitle }}<span v-if="post.bookAuthor"> · {{ post.bookAuthor }}</span>
        </div>
      </div>
      <v-btn icon size="small" flat @click="showMenu = !showMenu" v-if="isOwner">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
      <v-menu v-model="showMenu" :close-on-content-click="true">
        <template #activator="{ props }">
          <span v-bind="props"></span>
        </template>
        <v-list>
          <v-list-item @click="$emit('delete', post.id)" prepend-icon="mdi-delete" title="Excluir post" />
        </v-list>
      </v-menu>
    </div>

    <!-- Book Cover Image -->
    <div class="post-image-wrapper" v-if="post.coverImageUrl">
      <v-img
        :src="post.coverImageUrl"
        aspect-ratio="1"
        cover
        class="post-image"
        @dblclick="handleDoubleTap"
      >
        <transition name="heart-pop">
          <v-icon
            v-if="showHeart"
            class="heart-icon"
            color="white"
            size="80"
          >mdi-heart</v-icon>
        </transition>
      </v-img>
    </div>

    <!-- Action Bar -->
    <div class="px-3 pt-2 d-flex align-center">
      <v-btn icon size="small" flat @click="$emit('like', post.id)" class="mr-1">
        <v-icon :color="post.likedByCurrentUser ? 'error' : ''">
          {{ post.likedByCurrentUser ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
      <v-btn icon size="small" flat @click="showComments = !showComments" class="mr-1">
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
      <v-spacer />
    </div>

    <!-- Likes Count -->
    <div class="px-3 pb-1">
      <span class="text-body-2 font-weight-bold">
        {{ post.likesCount }} {{ post.likesCount === 1 ? 'curtida' : 'curtidas' }}
      </span>
    </div>

    <!-- Caption -->
    <div class="px-3 pb-1">
      <span class="font-weight-bold text-body-2">{{ post.username }}</span>
      <span class="text-body-2 ml-1">{{ post.content }}</span>
    </div>

    <!-- Comments Preview -->
    <div class="px-3 pb-1" v-if="post.comments && post.comments.length > 0 && !showComments">
      <span
        class="text-caption text-medium-emphasis cursor-pointer"
        @click="showComments = true"
      >
        Ver {{ post.comments.length }} {{ post.comments.length === 1 ? 'comentário' : 'comentários' }}
      </span>
    </div>

    <!-- Comments Expanded -->
    <div v-if="showComments" class="px-3">
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="d-flex align-start mb-2"
      >
        <v-avatar size="24" class="mr-2 mt-1">
          <v-img v-if="comment.userAvatarUrl" :src="comment.userAvatarUrl" cover />
          <v-icon v-else size="24">mdi-account-circle</v-icon>
        </v-avatar>
        <div>
          <span class="font-weight-bold text-caption">{{ comment.username }}</span>
          <span class="text-caption ml-1">{{ comment.content }}</span>
        </div>
      </div>
    </div>

    <!-- Timestamp -->
    <div class="px-3 pb-2">
      <span class="text-caption text-medium-emphasis">{{ timeAgo }}</span>
    </div>

    <!-- Add Comment -->
    <div class="px-3 pb-3 d-flex align-center gap-2 border-t">
      <v-avatar size="28">
        <v-img v-if="currentUserAvatar" :src="currentUserAvatar" cover />
        <v-icon v-else size="28">mdi-account-circle</v-icon>
      </v-avatar>
      <v-text-field
        v-model="newComment"
        density="compact"
        variant="plain"
        placeholder="Adicionar comentário…"
        hide-details
        class="flex-grow-1"
        @keyup.enter="submitComment"
      />
      <v-btn
        v-if="newComment.trim()"
        variant="text"
        color="info"
        size="small"
        @click="submitComment"
      >
        Publicar
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import api from '@/services/api'

interface PostComment {
  id: number
  userId: number
  username: string
  userAvatarUrl?: string
  content: string
  createdAt: string
}

interface Post {
  id: number
  userId: number
  username: string
  userAvatarUrl?: string
  bookTitle: string
  bookAuthor?: string
  coverImageUrl?: string
  content: string
  createdAt: string
  likesCount: number
  likedByCurrentUser: boolean
  comments: PostComment[]
}

const props = defineProps<{ post: Post }>()
const emit = defineEmits(['like', 'comment', 'delete', 'user-click'])

const currentUser = computed(() => getLoggedUser())
const isOwner = computed(() => currentUser.value?.id === props.post.userId)

const showComments = ref(false)
const showMenu = ref(false)
const newComment = ref('')
const showHeart = ref(false)

function resolveAvatar(url?: string | null): string | null {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  const base = (api.defaults.baseURL || '').replace(/\/api\/?$/, '')
  return url.startsWith('/') ? base + url : base + '/' + url
}

const avatarSrc = computed(() => resolveAvatar(props.post.userAvatarUrl))
const currentUserAvatar = computed(() => resolveAvatar(currentUser.value?.avatarUrl))

function handleDoubleTap() {
  if (!props.post.likedByCurrentUser) {
    emit('like', props.post.id)
  }
  showHeart.value = true
  setTimeout(() => { showHeart.value = false }, 1000)
}

function submitComment() {
  if (!newComment.value.trim()) return
  emit('comment', { postId: props.post.id, content: newComment.value.trim() })
  newComment.value = ''
  showComments.value = true
}

const timeAgo = computed(() => {
  const created = new Date(props.post.createdAt)
  const now = new Date()
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000)
  if (diff < 60) return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}min`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
})
</script>

<style scoped>
.post-card {
  max-width: 614px;
  margin: 0 auto;
}

.post-image-wrapper {
  width: 100%;
  position: relative;
}

.post-image {
  width: 100%;
}

.heart-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
}

.heart-pop-enter-active {
  animation: heartPop 0.8s ease-out;
}

@keyframes heartPop {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
}

.cursor-pointer {
  cursor: pointer;
}

.gap-2 {
  gap: 8px;
}
</style>
