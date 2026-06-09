import { ref, onMounted } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import { getMyBooks } from '@/services/apiBooks'
import { ref, onMounted } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import { getMyBooks } from '@/services/apiBooks'
<template>
  <v-container fluid class="mybooks-container">
    <v-row class="d-flex justify-center align-start" dense>
      <div v-if="loading" class="text-center" style="width: 100%">
        <v-progress-circular indeterminate size="48"></v-progress-circular>
      </div>

      <div v-else-if="books.length === 0" class="text-center" style="width: 100%">
        <p>Você ainda não adicionou nenhum livro.</p>
      </div>

      <v-col
        v-for="(book, index) in books"
        :key="book.id || index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex justify-center"
      >
        <v-card class="mx-auto elevation-4" max-width="260">
          <v-img height="200" :src="book.coverImageUrl || '/default-cover.png'" cover></v-img>

          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-subtitle>{{ book.author }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="warning" @click="openExplore(book)"> Explore </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="book.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="book.show = !book.show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="book.show">
              <v-divider></v-divider>
              <v-card-text>{{ book.description }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <bookTopicsDialog
      :model-value="showDialog"
      :book="selectedBook"
      :topics="topics"
      @update:model-value="showDialog = $event"
    />
  </v-container>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLoggedUser } from '@/composable/auth'
import { getMyBooks } from '@/services/apiBooks'

interface Book {
  id: number
  title: string
  author: string
  description?: string
  coverImageUrl?: string
  show?: boolean
}

interface Topic {
  id: number
  title: string
  description: string
}

const user = getLoggedUser()
const books = ref<Book[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    if (user && user.id) {
      books.value = await getMyBooks(user.id)
    }
  } catch (e) {
    console.error('Erro ao carregar livros do usuário', e)
  } finally {
    loading.value = false
  }
})

const showDialog = ref(false)
const selectedBook = ref<Book | null>(null)
const topics = ref<Topic[]>([])

function openExplore(book: Book) {
  selectedBook.value = book
  showDialog.value = true
}
</script>

<style scoped>
/* container that keeps list inside viewport and enables scrolling when needed */
.mybooks-container {
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.v-card {
  border-radius: 16px;
  overflow: hidden;
  width: 260px; /* fixed sensible width instead of 50vh */
  margin-top: 16px;
}
</style>
