<template>
  <div class="pa-2 pb-16">
    <message-component :preselect-user-id="preselectUserId" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import messageComponent from '@/components/message.vue'

const route = useRoute()
const preselectUserId = computed(() => {
  const v = route.query.userId
  return v ? Number(v) : null
})
</script>
