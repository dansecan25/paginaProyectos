<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import { PROJECTS } from '@/constants/projects'
</script>

<template>
  <ul class="projects-grid">
    <li v-for="project in PROJECTS" :key="project.slug">
      <router-link
        class="projects-grid__link"
        :to="{ name: 'Projects', params: { slug: project.slug } }"
        :aria-label="`See details of ${project.title}`"
      >
        <ProjectCard :project="project" />
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  list-style: none;
}

.projects-grid__link {
  display: block;
  height: 100%;
  border-radius: var(--radius-md);
  text-decoration: none;
}

.projects-grid__link:hover :deep(.project-card),
.projects-grid__link:focus-visible :deep(.project-card) {
  background: var(--color-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 6px 18px var(--color-accent-soft);
}

.projects-grid__link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
</style>
