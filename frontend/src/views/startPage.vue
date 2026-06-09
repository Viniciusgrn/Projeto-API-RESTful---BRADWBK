<template>
  <v-app>
    <v-main class="background-startPage">
    <books/>
    <navegationProfile/>
      
      <v-dialog v-model="isRegisterBookOpen" persistent>
        <template #activator="{ props }"></template>
        <registerBook @close="closeDialog" />
      </v-dialog>
      <v-dialog v-model="isProfileOpen" persistent>
        <profile-component />
      </v-dialog>
      <v-dialog v-model="isNotificationsOpen" persistent>
        <notification-component />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useDialog } from '@/composable/dialog.ts'

import navegationProfile from '@/components/navegationProfile.vue'
import books from '@/components/books.vue'
import registerBook from '@/components/registerBook.vue'
import profileComponent from '@/components/profile.vue'
import notificationComponent from '@/components/notification.vue'

const { activeDialog, closeDialog } = useDialog()

const isRegisterBookOpen = computed({
  get: () => activeDialog.value === 'registerBook',
  set: (val) => {
    if (!val) closeDialog()
  }
})

const isProfileOpen = computed({
  get: () => activeDialog.value === 'profile',
  set: (val) => { if (!val) closeDialog() }
})

const isNotificationsOpen = computed({
  get: () => activeDialog.value === 'notifications',
  set: (val) => { if (!val) closeDialog() }
})
</script>

<style>
.background-startPage {
  position: relative;
  min-height: 100vh;
}
</style>
