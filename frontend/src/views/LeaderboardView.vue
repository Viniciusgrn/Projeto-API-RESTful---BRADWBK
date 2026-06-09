<template>
  <div class="pb-16">
    <div class="pa-4">
      <div class="d-flex align-center mb-4">
        <v-icon color="warning" size="28" class="mr-2">mdi-trophy</v-icon>
        <span class="text-h6 font-weight-bold">Ranking de Leitores</span>
      </div>

      <!-- Top 3 Podium -->
      <div class="podium d-flex justify-center align-end mb-6 gap-2" v-if="leaders.length >= 3">
        <!-- 2nd place -->
        <div class="podium-item text-center">
          <div class="avatar-ring-silver mx-auto mb-1">
            <v-avatar size="52">
              <v-img v-if="leaders[1]?.userAvatarUrl" :src="leaders[1].userAvatarUrl" />
              <v-icon v-else size="52">mdi-account-circle</v-icon>
            </v-avatar>
          </div>
          <div class="text-caption font-weight-bold">{{ leaders[1]?.username }}</div>
          <div class="podium-bar podium-2 d-flex align-center justify-center">
            <span class="text-white font-weight-bold">2</span>
          </div>
        </div>

        <!-- 1st place -->
        <div class="podium-item text-center">
          <v-icon color="warning" size="24">mdi-crown</v-icon>
          <div class="avatar-ring-gold mx-auto mb-1">
            <v-avatar size="68">
              <v-img v-if="leaders[0]?.userAvatarUrl" :src="leaders[0].userAvatarUrl" />
              <v-icon v-else size="68">mdi-account-circle</v-icon>
            </v-avatar>
          </div>
          <div class="text-body-2 font-weight-bold">{{ leaders[0]?.username }}</div>
          <div class="podium-bar podium-1 d-flex align-center justify-center">
            <span class="text-white font-weight-bold">1</span>
          </div>
        </div>

        <!-- 3rd place -->
        <div class="podium-item text-center">
          <div class="avatar-ring-bronze mx-auto mb-1">
            <v-avatar size="44">
              <v-img v-if="leaders[2]?.userAvatarUrl" :src="leaders[2].userAvatarUrl" />
              <v-icon v-else size="44">mdi-account-circle</v-icon>
            </v-avatar>
          </div>
          <div class="text-caption font-weight-bold">{{ leaders[2]?.username }}</div>
          <div class="podium-bar podium-3 d-flex align-center justify-center">
            <span class="text-white font-weight-bold">3</span>
          </div>
        </div>
      </div>

      <!-- Full List -->
      <v-list>
        <v-list-item
          v-for="(leader, idx) in leaders"
          :key="leader.userId"
          :class="['rounded-lg mb-1', idx === 0 ? 'bg-amber-lighten-5' : '']"
        >
          <template #prepend>
            <div class="rank-num mr-3 font-weight-bold text-body-1" :style="rankColor(idx)">
              {{ idx + 1 }}
            </div>
            <v-avatar size="40">
              <v-img v-if="leader.userAvatarUrl" :src="leader.userAvatarUrl" />
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium">
            {{ leader.username }}
            <v-chip
              v-if="leader.streak >= 3"
              size="x-small"
              color="orange"
              class="ml-1"
            >🔥 {{ leader.streak }}</v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            Nível {{ leader.level }} · {{ leader.totalBooksRead }} livros lidos
          </v-list-item-subtitle>
          <template #append>
            <div class="text-right">
              <div class="text-body-2 font-weight-bold" style="color: #F77737">
                {{ levelXP(leader) }} XP
              </div>
              <v-progress-linear
                :model-value="xpPercent(leader)"
                color="orange"
                bg-color="grey-lighten-3"
                rounded
                height="4"
                style="width: 60px"
              />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLeaderboard, type UserXPDTO } from '@/services/apiXP'

const leaders = ref<UserXPDTO[]>([])

onMounted(async () => {
  leaders.value = await getLeaderboard()
})

function rankColor(idx: number) {
  if (idx === 0) return 'color: #FFD700'
  if (idx === 1) return 'color: #C0C0C0'
  if (idx === 2) return 'color: #CD7F32'
  return 'color: #999'
}

function levelXP(leader: UserXPDTO) {
  return (leader.level - 1) * 100 + leader.xp
}

function xpPercent(leader: UserXPDTO) {
  return Math.min(100, Math.floor((leader.xp / leader.xpForNextLevel) * 100))
}
</script>

<style scoped>
.podium { gap: 8px; }

.podium-item { flex: 1; max-width: 110px; }

.podium-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
}

.podium-1 { height: 80px; background: linear-gradient(180deg, #FFD700, #FFA000); }
.podium-2 { height: 60px; background: linear-gradient(180deg, #C0C0C0, #9E9E9E); }
.podium-3 { height: 44px; background: linear-gradient(180deg, #CD7F32, #8D6E63); }

.avatar-ring-gold {
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #FFD700, #FFA000);
  display: inline-flex;
}
.avatar-ring-silver {
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #C0C0C0, #9E9E9E);
  display: inline-flex;
}
.avatar-ring-bronze {
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #CD7F32, #8D6E63);
  display: inline-flex;
}

.rank-num { min-width: 24px; text-align: center; }
.pb-16 { padding-bottom: 64px; }
</style>
