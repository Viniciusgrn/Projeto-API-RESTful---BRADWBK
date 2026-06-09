<template>
  <div class="create-container pb-16 pa-4">
    <h2 class="text-h6 font-weight-bold mb-4">Novo Post</h2>

    <!-- Cover preview -->
    <div class="cover-preview mb-4" v-if="form.coverImageUrl">
      <v-img :src="form.coverImageUrl" height="200" cover rounded="lg" />
    </div>
    <div v-else class="cover-placeholder mb-4 bg-grey-lighten-4 rounded-lg d-flex flex-column align-center justify-center">
      <v-icon size="60" color="grey">mdi-book-open-variant</v-icon>
      <span class="text-caption text-grey mt-2">Adiciona a capa do livro</span>
    </div>

    <v-form @submit.prevent="submit" ref="formRef">
      <!-- Google Books search -->
      <v-autocomplete
        v-model="selectedBook"
        v-model:search="searchQuery"
        :items="bookSuggestions"
        item-title="title"
        item-value="id"
        label="Pesquisar livro *"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        :loading="searching"
        no-filter
        clearable
        return-object
        class="mb-2"
        placeholder="Escreve o título ou autor..."
        @update:modelValue="onBookSelected"
        @click:clear="clearBook"
      >
        <template #item="{ item, props }">
          <v-list-item v-bind="props" :title="undefined">
            <template #prepend>
              <v-img
                v-if="item.raw.coverUrl"
                :src="item.raw.coverUrl"
                width="40"
                height="56"
                cover
                rounded
                class="mr-3 flex-shrink-0"
              />
              <v-icon v-else size="40" class="mr-3">mdi-book</v-icon>
            </template>
            <v-list-item-title class="font-weight-bold">{{ item.raw.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.raw.authors }}</v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #no-data>
          <v-list-item v-if="searchQuery && searchQuery.length >= 3 && !searching">
            <v-list-item-title class="text-grey">Nenhum resultado encontrado</v-list-item-title>
          </v-list-item>
          <v-list-item v-else-if="searching">
            <v-list-item-title class="text-grey">A pesquisar...</v-list-item-title>
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-title class="text-grey">Escreve pelo menos 3 letras</v-list-item-title>
          </v-list-item>
        </template>
      </v-autocomplete>

      <!-- Fields filled automatically (editable) -->
      <v-text-field
        v-model="form.bookTitle"
        label="Título do livro *"
        prepend-inner-icon="mdi-book"
        variant="outlined"
        :rules="[v => !!v || 'Obrigatório']"
        class="mb-2"
      />

      <v-text-field
        v-model="form.bookAuthor"
        label="Autor *"
        prepend-inner-icon="mdi-account-edit"
        variant="outlined"
        :rules="[v => !!v || 'Obrigatório']"
        class="mb-2"
      />

      <v-textarea
        v-model="form.content"
        label="A sua impressão sobre o livro *"
        prepend-inner-icon="mdi-pencil"
        variant="outlined"
        rows="5"
        counter="500"
        :rules="[v => !!v || 'Obrigatório', v => v.length <= 500 || 'Máximo 500 caracteres']"
        class="mb-4"
      />

      <!-- Rating stars -->
      <div class="mb-4">
        <div class="text-body-2 font-weight-bold mb-1">Avaliação</div>
        <div class="d-flex gap-1">
          <v-icon
            v-for="n in 5"
            :key="n"
            :color="n <= rating ? 'warning' : 'grey-lighten-2'"
            size="32"
            class="cursor-pointer"
            @click="rating = n"
          >
            {{ n <= rating ? 'mdi-star' : 'mdi-star-outline' }}
          </v-icon>
        </div>
      </div>

      <!-- XP info -->
      <v-alert type="info" variant="tonal" rounded="lg" class="mb-4" icon="mdi-star-circle">
        <strong>+20 XP</strong> por publicar uma review · <strong>+50 XP</strong> ao marcar como lido
      </v-alert>

      <!-- Error snackbar -->
      <v-snackbar v-model="errorSnack" color="error" timeout="4000" location="top">
        {{ errorMsg }}
      </v-snackbar>

      <div class="d-flex gap-2">
        <v-btn
          variant="tonal"
          class="flex-grow-1"
          :loading="loading"
          @click="submitAndMarkRead"
        >
          <v-icon start>mdi-book-check</v-icon>
          Já li! (+50XP)
        </v-btn>
        <v-btn
          color="primary"
          class="flex-grow-1"
          :loading="loading"
          type="submit"
        >
          <v-icon start>mdi-send</v-icon>
          Publicar
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/services/apiPosts'
import { markBookRead } from '@/services/apiXP'
import { getLoggedUser } from '@/composable/auth'

const errorSnack = ref(false)
const errorMsg = ref('')
function showError(msg: string) {
  errorMsg.value = msg
  errorSnack.value = true
}

interface BookSuggestion {
  id: string
  title: string
  authors: string
  coverUrl: string
}

const router = useRouter()
const currentUser = getLoggedUser()
const formRef = ref()
const loading = ref(false)
const rating = ref(0)

const searchQuery = ref('')
const searching = ref(false)
const bookSuggestions = ref<BookSuggestion[]>([])
const selectedBook = ref<BookSuggestion | null>(null)

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const form = ref({
  bookTitle: '',
  bookAuthor: '',
  coverImageUrl: '',
  content: '',
})

watch(searchQuery, (val) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  if (!val || val.length < 3) {
    bookSuggestions.value = []
    return
  }
  searchTimeout = setTimeout(() => searchGoogleBooks(val), 400)
})

async function searchGoogleBooks(query: string) {
  searching.value = true
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8&lang=por`
    )
    const data = await res.json()
    bookSuggestions.value = (data.docs || []).map((doc: any) => {
      return {
        id: doc.key || '',
        title: doc.title || 'Sem título',
        authors: (doc.author_name || []).join(', '),
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : '',
      }
    })
  } catch (e) {
    bookSuggestions.value = []
  } finally {
    searching.value = false
  }
}

function onBookSelected(book: BookSuggestion | null) {
  if (!book) return
  form.value.bookTitle = book.title
  form.value.bookAuthor = book.authors
  form.value.coverImageUrl = book.coverUrl
}

function clearBook() {
  selectedBook.value = null
  form.value.bookTitle = ''
  form.value.bookAuthor = ''
  form.value.coverImageUrl = ''
  bookSuggestions.value = []
}

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!currentUser?.id) {
    showError('Sessão expirada. Faz login novamente.')
    return
  }

  loading.value = true
  try {
    const stars = rating.value > 0 ? ' ' + '⭐'.repeat(rating.value) : ''
    await createPost({
      userId: currentUser.id,
      bookTitle: form.value.bookTitle,
      bookAuthor: form.value.bookAuthor || undefined,
      coverImageUrl: form.value.coverImageUrl || undefined,
      content: form.value.content + stars,
    })
    router.push('/feed')
  } catch (e: any) {
    showError(e?.response?.data?.message || e?.response?.data || 'Erro ao publicar. Tenta novamente.')
  } finally {
    loading.value = false
  }
}

async function submitAndMarkRead() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!currentUser?.id) {
    showError('Sessão expirada. Faz login novamente.')
    return
  }

  loading.value = true
  try {
    const stars = rating.value > 0 ? ' ' + '⭐'.repeat(rating.value) : ''
    await createPost({
      userId: currentUser.id,
      bookTitle: form.value.bookTitle,
      bookAuthor: form.value.bookAuthor || undefined,
      coverImageUrl: form.value.coverImageUrl || undefined,
      content: form.value.content + stars,
    })
    await markBookRead(currentUser.id)
    router.push('/feed')
  } catch (e: any) {
    showError(e?.response?.data?.message || e?.response?.data || 'Erro ao publicar. Tenta novamente.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-container {
  max-width: 614px;
  margin: 0 auto;
}

.cover-placeholder {
  height: 160px;
}

.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.cursor-pointer { cursor: pointer; }
.pb-16 { padding-bottom: 64px; }
</style>
