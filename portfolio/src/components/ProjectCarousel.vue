<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '@/types/project'
import { scrollBehavior } from '@/utils/motion'

const props = defineProps<{
  projects: Project[]
  selectedSlug: string
  detailsId: string
}>()

const emit = defineEmits<{ select: [slug: string] }>()

const track = ref<HTMLElement | null>(null)
const tabs = new Map<string, HTMLElement>()

const setTabRef = (slug: string, el: unknown) => {
  if (el instanceof HTMLElement) tabs.set(slug, el)
  else tabs.delete(slug)
}

const tabId = (slug: string) => `project-tab-${slug}`

/** Scrolls the track horizontally only, so the page itself never jumps. */
const centerTab = (slug: string, behavior: ScrollBehavior) => {
  const tab = tabs.get(slug)
  if (!track.value || !tab) return
  const left = tab.offsetLeft - (track.value.clientWidth - tab.clientWidth) / 2
  track.value.scrollTo({ left, behavior })
}

/** Selects by index, wrapping around both ends. */
const selectAt = (index: number, focus = false) => {
  const count = props.projects.length
  const project = props.projects[(index + count) % count]
  if (!project) return
  emit('select', project.slug)
  if (focus) nextTick(() => tabs.get(project.slug)?.focus({ preventScroll: true }))
}

const selectByOffset = (offset: number, focus = false) =>
  selectAt(props.projects.findIndex((p) => p.slug === props.selectedSlug) + offset, focus)

const KEY_ACTIONS: Record<string, () => void> = {
  ArrowRight: () => selectByOffset(1, true),
  ArrowLeft: () => selectByOffset(-1, true),
  Home: () => selectAt(0, true),
  End: () => selectAt(props.projects.length - 1, true),
}

const onKeydown = (event: KeyboardEvent) => {
  const action = KEY_ACTIONS[event.key]
  if (!action) return
  event.preventDefault()
  action()
}

onMounted(() => centerTab(props.selectedSlug, 'auto'))
watch(
  () => props.selectedSlug,
  (slug) => nextTick(() => centerTab(slug, scrollBehavior())),
)
</script>

<template>
  <div class="carousel">
    <button
      type="button"
      class="carousel__arrow"
      aria-label="Previous project"
      @click="selectByOffset(-1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" /></svg>
    </button>

    <div
      ref="track"
      class="carousel__track"
      role="tablist"
      aria-label="Projects"
      @keydown="onKeydown"
    >
      <button
        v-for="project in projects"
        :id="tabId(project.slug)"
        :key="project.slug"
        :ref="(el) => setTabRef(project.slug, el)"
        type="button"
        role="tab"
        class="carousel__item"
        :aria-selected="project.slug === selectedSlug"
        :aria-controls="detailsId"
        :tabindex="project.slug === selectedSlug ? 0 : -1"
        @click="emit('select', project.slug)"
      >
        <ProjectCard :project="project" :selected="project.slug === selectedSlug" />
      </button>
    </div>

    <button
      type="button"
      class="carousel__arrow"
      aria-label="Next project"
      @click="selectByOffset(1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4 4.6 4.6z" /></svg>
    </button>
  </div>
</template>

<style scoped>
.carousel {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
}

.carousel__track {
  position: relative;
  display: flex;
  gap: 16px;
  padding: 16px 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: var(--color-card) transparent;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 24px, #000 calc(100% - 24px), transparent);
  mask-image: linear-gradient(to right, transparent, #000 24px, #000 calc(100% - 24px), transparent);
}

.carousel__item {
  flex: 0 0 clamp(200px, 62vw, 260px);
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: none;
  font: inherit;
  cursor: pointer;
  scroll-snap-align: center;
}

.carousel__item[aria-selected='true'] :deep(.project-card) {
  transform: translateY(-4px);
}

.carousel__item:hover :deep(.project-card) {
  background: var(--color-card-hover);
}

.carousel__item:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 3px;
}

.carousel__arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-card);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}

.carousel__arrow:hover,
.carousel__arrow:focus-visible {
  border-color: var(--color-accent);
  color: var(--color-accent);
  outline: none;
}

.carousel__arrow svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

@media (max-width: 480px) {
  .carousel {
    gap: 4px;
  }

  .carousel__arrow {
    width: 32px;
    height: 32px;
  }
}
</style>
