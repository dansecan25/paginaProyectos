<script setup lang="ts">
import FrameworkBadge from './FrameworkBadge.vue'
import type { Project } from '@/types/project'

defineProps<{
  project: Project
  selected?: boolean
}>()
</script>

<template>
  <article class="project-card" :class="{ 'project-card--selected': selected }">
    <FrameworkBadge :framework="project.framework" />
    <div>
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__language">{{ project.language }}</p>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  background: var(--color-card);
  color: var(--color-text);
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.project-card--selected {
  border-color: var(--color-accent);
  box-shadow: 0 0 18px var(--color-accent-soft);
}

.project-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.project-card__language {
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--color-text-muted);
}
</style>
