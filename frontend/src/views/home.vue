<template>
  <v-app theme="bookgramLight">
    <v-main class="landing-bg d-flex align-center justify-center">
      <v-container max-width="400">
        <div class="text-center mb-8">
          <div class="bookgram-landing-logo mb-2">BookForum</div>
          <div class="text-body-1 text-medium-emphasis">A sua comunidade de livros</div>
        </div>

        <v-card class="pa-6" elevation="0" rounded="xl" border>
          <v-btn
            block
            size="large"
            class="mb-3 gradient-btn"
            rounded="lg"
            @click="showLogin = true"
          >
            Entrar
          </v-btn>
          <v-btn
            block
            size="large"
            variant="outlined"
            rounded="lg"
            @click="showRegister = true"
          >
            Criar Conta
          </v-btn>
        </v-card>

        <div class="text-center mt-6 text-caption text-medium-emphasis">
          Compartilhe. Descubra. Leia mais.
        </div>
      </v-container>

      <v-dialog v-model="showLogin" max-width="440" scrollable>
        <Login @close="showLogin = false" @go-register="showLogin = false; showRegister = true" />
      </v-dialog>

      <v-dialog v-model="showRegister" max-width="440" scrollable>
        <Register @close="showRegister = false" />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Login from '@/components/login.vue'
import Register from '@/components/registerUser.vue'

const showLogin = ref(false)
const showRegister = ref(false)
const router = useRouter()

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/feed')
  }
})
</script>

<style scoped>
.landing-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdfcfb 0%, #f8f4ff 50%, #fce4ec 100%);
}

.bookgram-landing-logo {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #405DE6, #833AB4, #C13584, #E1306C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Georgia', serif;
  letter-spacing: -1px;
}

.gradient-btn {
  background: linear-gradient(135deg, #405DE6, #833AB4) !important;
  color: white !important;
}
</style>
