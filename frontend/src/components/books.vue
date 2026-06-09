<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-start" dense>
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

<script setup>
import { ref, onMounted } from 'vue'
import { getBook } from '@/services/apiBooks.ts'

import bookTopicsDialog from '@/components/bookTopicsDialog.vue'

const books = ref([])
const showDialog = ref(false)
const selectedBook = ref(null)
const topics = ref([])

onMounted(async () => {
  books.value = await getBook()
})

async function openExplore(book) {
  selectedBook.value = book
  showDialog.value = true
}
</script>
<style scoped>
.v-card {
  border-radius: 16px;
  overflow: hidden;
  width: 50vh;
  margin-top: 60px;
}
</style>
