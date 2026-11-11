<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectCarousel from '@/components/ProjectCarousel.vue'
import ProjectDetails from '@/components/ProjectDetails.vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import { PROJECTS, findProject } from '@/constants/projects'

const DETAILS_ID = 'project-details'

const route = useRoute()
const router = useRouter()

const routeSlug = computed(() => {
  const slug = route.params.slug
  return typeof slug === 'string' ? slug : undefined
})

const selected = computed(() => findProject(routeSlug.value) ?? PROJECTS[0]!)

// An unknown or missing slug falls back to the first project, and the URL follows.
watchEffect(() => {
  if (routeSlug.value !== selected.value.slug) selectProject(selected.value.slug)
})

function selectProject(slug: string) {
  router.replace({ name: 'Projects', params: { slug } })
}
</script>

<template>
  <div class="projects-page">
    <header class="projects-page__intro">
      <p class="projects-page__eyebrow">Project portfolio</p>
      <h1 class="projects-page__title">PROJECTS</h1>
      <p class="projects-page__subtitle">
        Pick a project to see what it does, how it is built and what I learned along the way.
      </p>
    </header>

    <ProjectCarousel
      :projects="PROJECTS"
      :selected-slug="selected.slug"
      :details-id="DETAILS_ID"
      @select="selectProject"
    />

    <div
      :id="DETAILS_ID"
      class="projects-page__details"
      role="tabpanel"
      :aria-labelledby="`project-tab-${selected.slug}`"
    >
      <Transition name="fade" mode="out-in">
        <ProjectDetails :key="selected.slug" :project="selected" />
      </Transition>
    </div>

    <ScrollToTopButton />
  </div>
</template>

<style scoped>
.projects-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 96px;
}

.projects-page__intro {
  margin-top: 48px;
}

.projects-page__eyebrow {
  display: inline-block;
  margin-bottom: 24px;
  padding: 4px 20px;
  border-radius: var(--radius-sm);
  background: var(--color-chip);
}

.projects-page__title {
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 12px;
}

.projects-page__subtitle {
  max-width: 60ch;
  color: var(--color-text-muted);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}

@media (max-width: 768px) {
  .projects-page__intro {
    margin-top: 24px;
  }

  .projects-page__title {
    font-size: 2.25rem;
  }
}
</style>
