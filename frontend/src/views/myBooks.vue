<template>
  <div class="pb-16">
    <!-- Header -->
    <div class="d-flex align-center justify-space-between pa-4 pb-2">
      <h2 class="text-h6 font-weight-bold">A Minha Biblioteca</h2>
      <v-btn icon size="small" color="primary" @click="showAdd = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="d-flex justify-center pa-8">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- Empty state -->
    <div v-else-if="books.length === 0" class="text-center pa-8 text-medium-emphasis">
      <v-icon size="64" class="mb-3">mdi-bookshelf</v-icon>
      <div class="text-h6">Você ainda não tem livros</div>
      <div class="text-body-2 mb-4">Adicione seu primeiro livro à biblioteca</div>
      <v-btn color="primary" @click="showAdd = true">Adicionar livro</v-btn>
    </div>

    <!-- Books grid -->
    <v-container fluid v-else>
      <v-row dense>
        <v-col
          v-for="book in books"
          :key="book.id"
          cols="6"
          sm="4"
          md="3"
        >
          <v-card rounded="lg" elevation="0" border @click="selectedBook = book; showDetail = true" class="cursor-pointer">
            <v-img
              :src="book.coverImageUrl || ''"
              height="160"
              cover
              rounded="t-lg"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                  <v-icon size="48" color="grey">mdi-book-open-variant</v-icon>
                </div>
              </template>
            </v-img>
            <v-card-text class="pa-2">
              <div class="text-body-2 font-weight-bold text-truncate">{{ book.title }}</div>
              <div class="text-caption text-medium-emphasis text-truncate">{{ book.author }}</div>
              <v-chip
                size="x-small"
                :color="book.available ? 'success' : 'grey'"
                variant="tonal"
                class="mt-1"
              >
                {{ book.available ? 'Disponível' : 'Indisponível' }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Book detail dialog -->
    <v-dialog v-model="showDetail" max-width="400">
      <v-card v-if="selectedBook" rounded="xl">
        <v-img
          :src="selectedBook.coverImageUrl || ''"
          height="200"
          cover
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
              <v-icon size="64" color="grey">mdi-book-open-variant</v-icon>
            </div>
          </template>
        </v-img>
        <v-card-title>{{ selectedBook.title }}</v-card-title>
        <v-card-subtitle>{{ selectedBook.author }}</v-card-subtitle>
        <v-card-text v-if="selectedBook.description">{{ selectedBook.description }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showDetail = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add book dialog -->
    <v-dialog v-model="showAdd" max-width="520">
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="pb-2">Adicionar Livro</v-card-title>
        <v-form @submit.prevent="addNewBook" ref="addFormRef">
          <v-text-field v-model="newBook.title" label="Título *" variant="outlined" :rules="[v => !!v || 'Obrigatório']" class="mb-2" />
          <v-text-field v-model="newBook.author" label="Autor *" variant="outlined" :rules="[v => !!v || 'Obrigatório']" class="mb-2" />
          <v-text-field v-model="newBook.coverImageUrl" label="URL da capa" variant="outlined" class="mb-2" />
          <v-textarea v-model="newBook.description" label="Descrição" variant="outlined" rows="3" class="mb-2" />
          <v-switch v-model="newBook.available" label="Disponível para troca/empréstimo" color="primary" />
          <v-card-actions class="pt-2 px-0">
            <v-spacer />
            <v-btn text @click="showAdd = false">Cancelar</v-btn>
            <v-btn color="primary" type="submit" :loading="adding">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMyBooks, addBook } from '@/services/apiBooks'
import { getLoggedUser } from '@/composable/auth'

const books = ref<any[]>([])
const loading = ref(true)
const showAdd = ref(false)
const showDetail = ref(false)
const selectedBook = ref<any>(null)
const adding = ref(false)
const addFormRef = ref()

const newBook = ref({ title: '', author: '', coverImageUrl: '', description: '', available: true })

const currentUser = getLoggedUser()

onMounted(async () => {
  if (currentUser?.id) {
    books.value = await getMyBooks(currentUser.id)
  }
  loading.value = false
})

async function addNewBook() {
  const { valid } = await addFormRef.value.validate()
  if (!valid || !currentUser?.id) return
  adding.value = true
  try {
    await addBook({ title: newBook.value.title, author: newBook.value.author, description: newBook.value.description, coverImageUrl: newBook.value.coverImageUrl, available: newBook.value.available, owner: { id: currentUser.id } })
    books.value = await getMyBooks(currentUser.id)
    showAdd.value = false
    newBook.value = { title: '', author: '', coverImageUrl: '', description: '', available: true }
  } finally {
    adding.value = false
  }
}
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
.pb-16 { padding-bottom: 64px; }
</style>
