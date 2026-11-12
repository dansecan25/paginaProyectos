<script setup lang="ts">
import GithubActivityGraph from '@/components/GithubActivityGraph.vue'
import { SOCIAL_LINKS } from '@/constants/links'
import { SOCIAL_ICONS as ICONS } from '@/constants/socialIcons'

const [github, ...others] = SOCIAL_LINKS
</script>

<template>
  <div class="links">
    <p class="links__eyebrow">Links</p>
    <h1 class="links__title">Where to find me</h1>
    <p class="links__intro">
      My code lives on GitHub. Everything on this site is open there, with releases you can
      install.
    </p>

    <section v-if="github" class="links__card links__card--github" aria-labelledby="github-title">
      <header class="links__card-header">
        <component :is="ICONS[github.network]" class="links__icon" aria-hidden="true" />
        <div>
          <h2 id="github-title" class="links__card-title">{{ github.label }}</h2>
          <p class="links__handle">@{{ github.handle }}</p>
        </div>
        <a
          class="links__button"
          :href="github.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open profile
        </a>
      </header>
      <p class="links__description">{{ github.description }}</p>
      <GithubActivityGraph />
    </section>

    <ul class="links__grid">
      <li v-for="link in others" :key="link.network">
        <a class="links__card links__card--small" :href="link.url" target="_blank" rel="noopener noreferrer">
          <component :is="ICONS[link.network]" class="links__icon" aria-hidden="true" />
          <span>
            <span class="links__card-title">{{ link.label }}</span>
            <span class="links__handle">@{{ link.handle }}</span>
            <span class="links__description">{{ link.description }}</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.links {
  max-width: 1000px;
  margin: 0 auto;
  padding: 64px 1rem 120px;
}

.links__eyebrow {
  width: fit-content;
  padding: 4px 20px;
  border-radius: var(--radius-sm);
  background: var(--color-chip);
}

.links__title {
  margin: 24px 0 12px;
  font-size: 2.5rem;
}

.links__intro {
  max-width: 60ch;
  margin-bottom: 40px;
  color: var(--color-text-muted);
}

/* `section` has a global left margin in main.css. */
.links__card {
  display: block;
  margin-left: 0;
  padding: 24px;
  border: 1px solid var(--color-accent-soft);
  border-radius: var(--radius-md);
  background: rgba(31, 31, 31, 0.94);
  color: var(--color-text);
  text-decoration: none;
}

.links__card--github {
  box-shadow: 0 0 32px rgba(51, 255, 0, 0.08);
}

.links__card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.links__card-header > div {
  flex: 1;
  min-width: 0;
}

.links__icon {
  flex: none;
  width: 40px;
  height: 40px;
  fill: var(--color-text);
}

.links__card-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: normal;
}

.links__handle {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-accent);
}

.links__description {
  display: block;
  margin: 16px 0 24px;
  color: var(--color-text-muted);
}

.links__button {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: var(--color-bg);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.links__button:hover,
.links__button:focus-visible {
  background: #85ff66;
}

.links__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 16px;
  list-style: none;
}

.links__card--small {
  display: flex;
  gap: 16px;
  height: 100%;
  border-color: var(--color-card);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.links__card--small .links__description {
  margin: 8px 0 0;
}

.links__card--small:hover,
.links__card--small:focus-visible {
  border-color: var(--color-accent);
  background: var(--color-surface-raised);
  outline: none;
}

@media (max-width: 768px) {
  .links {
    padding-top: 40px;
  }

  .links__title {
    font-size: 2rem;
  }

  .links__card {
    padding: 18px;
  }
}
</style>
