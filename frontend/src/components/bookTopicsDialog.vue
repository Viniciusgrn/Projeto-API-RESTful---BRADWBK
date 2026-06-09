<template>
  <v-dialog v-model="model" width="500">
    <v-card>
      <v-card-title>
        Tópicos de {{ selectedBook?.title }}
        <v-spacer></v-spacer>
        <v-btn icon @click="model = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="topic in topics"
            :key="topic.id"
            :title="topic.title"
          >
            <v-card-text>{{ topic.description }}</v-card-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getTopicsByBookId } from '@/services/apiTopics.ts'


interface Topic {
  id: number
  title: string
  description: string
}

interface Book {
  id: number
  title: string
}

const props = defineProps<{ modelValue: boolean; selectedBook: Book | null; topics?: Topic[] }>()
const emit = defineEmits(['update:modelValue'])
const model = ref(props.modelValue)
const topics = ref<Topic[]>([])

watch(() => props.modelValue, value => (model.value = value))
watch(model, value => emit('update:modelValue', value))

watch(() => props.selectedBook, async (book) => {
  if (!book) return
  topics.value = await getTopicsByBookId(book.id) as Topic[] || []
})
</script>
