<template>
  <div class="xp-bar">
    <div class="d-flex align-center justify-space-between mb-1">
      <div class="d-flex align-center gap-1">
        <v-icon color="gold" size="18">mdi-star-circle</v-icon>
        <span class="text-body-2 font-weight-bold">Nível {{ xp.level }}</span>
        <v-chip size="x-small" color="gold" variant="tonal" class="ml-1">
          🔥 {{ xp.streak }}
        </v-chip>
      </div>
      <span class="text-caption text-medium-emphasis">{{ xp.xp }}/{{ xp.xpForNextLevel }} XP</span>
    </div>
    <v-progress-linear
      :model-value="progressPercent"
      color="gold"
      bg-color="grey-lighten-3"
      rounded
      height="6"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface XPData {
  level: number
  xp: number
  xpForNextLevel: number
  streak: number
}

const props = defineProps<{ xp: XPData }>()

const progressPercent = computed(() =>
  Math.min(100, Math.floor((props.xp.xp / props.xp.xpForNextLevel) * 100))
)
</script>

<style scoped>
.xp-bar { width: 100%; }
.gap-1 { gap: 4px; }
</style>
