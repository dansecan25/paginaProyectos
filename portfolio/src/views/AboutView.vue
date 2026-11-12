<script setup lang="ts">
import {
  ABOUT_HEADLINE,
  ABOUT_INTERESTS,
  ABOUT_INTRO,
  ABOUT_LANGUAGES,
  ABOUT_NAME,
  ABOUT_SECTIONS,
  ABOUT_STATS,
} from '@/constants/about'
import { PROJECTS } from '@/constants/projects'

const stats = [
  ABOUT_STATS[0]!,
  { value: String(PROJECTS.length), label: 'personal projects on this site, built on my own time' },
  ...ABOUT_STATS.slice(1),
]

const sectionNumber = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <div class="about">
    <header class="about__hero">
      <p class="about__eyebrow">About me</p>
      <h1 class="about__name">{{ ABOUT_NAME }}</h1>
      <p class="about__headline">{{ ABOUT_HEADLINE }}</p>
      <p class="about__intro">{{ ABOUT_INTRO }}</p>
    </header>

    <dl class="about__stats">
      <div v-for="stat in stats" :key="stat.label" class="about__stat">
        <dt class="about__stat-label">{{ stat.label }}</dt>
        <dd class="about__stat-value">{{ stat.value }}</dd>
      </div>
    </dl>

    <div class="about__sections">
      <section
        v-for="(section, index) in ABOUT_SECTIONS"
        :key="section.title"
        class="about__section"
        :aria-labelledby="`about-section-${index}`"
      >
        <p class="about__section-number" aria-hidden="true">{{ sectionNumber(index) }}</p>
        <h2 :id="`about-section-${index}`" class="about__section-title">{{ section.title }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph" class="about__paragraph">
          {{ paragraph }}
        </p>
      </section>
    </div>

    <section class="about__toolbox" aria-labelledby="about-toolbox">
      <h2 id="about-toolbox" class="about__section-title">Toolbox</h2>
      <div class="about__chips-group">
        <h3 class="about__chips-title">Languages</h3>
        <ul class="about__chips">
          <li v-for="language in ABOUT_LANGUAGES" :key="language" class="about__chip">
            {{ language }}
          </li>
        </ul>
      </div>
      <div class="about__chips-group">
        <h3 class="about__chips-title">Focus</h3>
        <ul class="about__chips">
          <li v-for="interest in ABOUT_INTERESTS" :key="interest" class="about__chip">
            {{ interest }}
          </li>
        </ul>
      </div>
    </section>

    <nav class="about__actions" aria-label="Next steps">
      <RouterLink class="about__button about__button--primary" to="/projects">
        See my projects
      </RouterLink>
      <RouterLink class="about__button" to="/contact">Get in touch</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 64px 1rem 120px;
}

.about__eyebrow {
  width: fit-content;
  padding: 4px 20px;
  border-radius: var(--radius-sm);
  background: var(--color-chip);
}

.about__name {
  margin: 24px 0 8px;
  font-size: 3rem;
}

.about__headline {
  max-width: 32ch;
  margin-bottom: 24px;
  font-size: 1.6rem;
  line-height: 1.35;
  color: var(--color-accent);
  text-shadow: 0 0 18px var(--color-accent-soft);
}

.about__intro {
  max-width: 560px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 48px 0;
}

.about__stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 6px;
  padding: 20px;
  border: 1px solid var(--color-accent-soft);
  border-radius: var(--radius-md);
  background: var(--color-surface-accent);
}

.about__stat-value {
  font-family: var(--font-mono);
  font-size: 2rem;
  color: var(--color-accent);
}

.about__stat-label {
  color: var(--color-text-muted);
  line-height: 1.4;
}

.about__sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  gap: 16px;
}

/* `section` has a global left margin in main.css. */
.about__section,
.about__toolbox {
  margin-left: 0;
  padding: 24px;
  border: 1px solid var(--color-card);
  border-radius: var(--radius-md);
  background: rgba(31, 31, 31, 0.94);
  transition: border-color 0.2s ease;
}

.about__section:hover {
  border-color: var(--color-accent-soft);
}

.about__section-number {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-accent);
}

.about__section-title {
  margin: 4px 0 12px;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: normal;
}

.about__paragraph {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.about__paragraph + .about__paragraph {
  margin-top: 12px;
}

.about__toolbox {
  margin-top: 16px;
}

.about__chips-group + .about__chips-group {
  margin-top: 16px;
}

.about__chips-title {
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.about__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.about__chip {
  padding: 4px 12px;
  border: 1px solid var(--color-accent-soft);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text);
}

.about__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 48px;
}

.about__button {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  background: var(--color-text);
  color: var(--color-bg);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.about__button:hover,
.about__button:focus-visible {
  background: #cccccc;
}

.about__button--primary {
  background: var(--color-accent);
}

.about__button--primary:hover,
.about__button--primary:focus-visible {
  background: #85ff66;
}

@media (max-width: 768px) {
  .about {
    padding-top: 40px;
  }

  .about__name {
    font-size: 2.2rem;
  }

  .about__headline {
    font-size: 1.25rem;
  }

  .about__section,
  .about__toolbox {
    padding: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about__section {
    transition: none;
  }
}
</style>
