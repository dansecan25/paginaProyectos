<script setup lang="ts">
import FrameworkBadge from './FrameworkBadge.vue'
import ProjectMediaGallery from './ProjectMediaGallery.vue'
import type { Project } from '@/types/project'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="details">
    <header class="details__header">
      <div class="details__tags">
        <FrameworkBadge :framework="project.framework" />
        <span class="details__chip">{{ project.language }}</span>
        <span class="details__chip details__chip--status">{{ project.status }}</span>
      </div>
      <h2 class="details__title">{{ project.title }}</h2>
      <p class="details__summary">{{ project.summary }}</p>
      <div v-if="project.releasesUrl || project.repoUrl" class="details__links">
        <a
          v-if="project.releasesUrl"
          class="details__link details__link--download"
          :href="project.releasesUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the latest release
        </a>
        <a
          v-if="project.repoUrl"
          class="details__link"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source on GitHub
        </a>
      </div>
    </header>

    <ProjectMediaGallery :key="project.slug" :slug="project.slug" :media="project.media" />

    <div class="details__columns">
      <section class="details__block">
        <h3 class="details__heading">Highlights</h3>
        <ul class="details__list">
          <li v-for="item in project.highlights" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="details__block">
        <h3 class="details__heading">Tech stack</h3>
        <ul class="details__stack">
          <li v-for="tech in project.stack" :key="tech" class="details__chip">{{ tech }}</li>
        </ul>
      </section>
    </div>

    <div class="details__sections">
      <section v-for="section in project.sections" :key="section.title" class="details__block">
        <h3 class="details__heading">{{ section.title }}</h3>
        <ul class="details__list">
          <li v-for="point in section.points" :key="point">{{ point }}</li>
        </ul>
      </section>
    </div>
  </article>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.details__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.details__tags :deep(.framework-badge) {
  min-width: 0;
}

.details__chip {
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  background: var(--color-chip);
  color: var(--color-text);
  font-size: 0.8rem;
}

.details__chip--status {
  border: 1px solid var(--color-accent-soft);
  color: var(--color-accent);
  background: transparent;
}

.details__title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 12px;
}

.details__summary {
  max-width: 75ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.details__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.details__link {
  display: inline-block;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-text);
  color: var(--color-bg);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.details__link:hover,
.details__link:focus-visible {
  background: #cccccc;
}

.details__link--download {
  background: var(--color-accent);
}

.details__link--download:hover,
.details__link--download:focus-visible {
  background: #85ff66;
}

/* `section` has a global left margin in main.css; these blocks align to the panel instead. */
.details__block {
  margin-left: 0;
  padding: 20px;
  border-radius: var(--radius-md);
  background: rgba(31, 31, 31, 0.94);
}

.details__columns,
.details__sections {
  display: grid;
  align-items: start;
  gap: 20px;
}

.details__columns {
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
}

.details__sections {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.details__heading {
  margin-bottom: 12px;
  font-size: 1.1rem;
  color: var(--color-text);
}

.details__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 1.2rem;
  font-family: var(--font-heading);
  line-height: 1.5;
  color: var(--color-text-muted);
}

.details__list li::marker {
  color: var(--color-accent);
}

.details__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

@media (max-width: 768px) {
  .details__title {
    font-size: 2rem;
  }

  .details__columns {
    grid-template-columns: 1fr;
  }

  .details__sections {
    grid-template-columns: 1fr;
  }

  .details__block {
    padding: 16px;
  }
}
</style>
