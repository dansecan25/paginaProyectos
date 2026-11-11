<script setup lang="ts">
import { computed } from 'vue'
import { getFrameworkBadge } from '@/constants/frameworks'

const props = defineProps<{ framework: string }>()

const colors = computed(() => getFrameworkBadge(props.framework))
</script>

<template>
  <span class="framework-badge" :style="{ background: colors.background, color: colors.text }">
    {{ framework }}
  </span>
</template>

<style scoped>
.framework-badge {
  display: inline-block;
  min-width: 55%;
  max-width: 100%;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
