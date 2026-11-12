<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ProjectMedia } from '@/types/project'
import { projectMediaUrl } from '@/utils/assets'

const props = defineProps<{
  slug: string
  media: ProjectMedia[]
}>()

const activeIndex = ref(0)

const active = computed(() => props.media[activeIndex.value])

const url = (file: string) => projectMediaUrl(props.slug, file)
const posterUrl = (item: ProjectMedia) => (item.poster ? url(item.poster) : undefined)
</script>

<template>
  <div class="gallery">
    <template v-if="active">
      <figure class="gallery__viewer">
        <video
          v-if="active.type === 'video'"
          :key="active.file"
          class="gallery__media"
          :src="url(active.file)"
          :poster="posterUrl(active)"
          :aria-label="active.alt"
          controls
          playsinline
          preload="metadata"
        >
          Your browser can't play this video.
        </video>
        <img
          v-else
          :key="active.file"
          class="gallery__media"
          :src="url(active.file)"
          :alt="active.alt"
          loading="lazy"
          decoding="async"
        />
        <figcaption v-if="active.caption" class="gallery__caption">{{ active.caption }}</figcaption>
      </figure>

      <ul v-if="media.length > 1" class="gallery__thumbs" aria-label="Choose a screenshot or video">
        <li v-for="(item, index) in media" :key="item.file">
          <button
            type="button"
            class="gallery__thumb"
            :class="{ 'gallery__thumb--active': index === activeIndex }"
            :aria-label="`Show ${item.type}: ${item.alt}`"
            :aria-pressed="index === activeIndex"
            @click="activeIndex = index"
          >
            <img
              v-if="item.type === 'image' || item.poster"
              :src="item.type === 'image' ? url(item.file) : posterUrl(item)"
              alt=""
              loading="lazy"
            />
            <span v-if="item.type === 'video'" class="gallery__play" aria-hidden="true">▶</span>
          </button>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.gallery__viewer {
  margin: 0;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  overflow: hidden;
}

.gallery__media {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  background: #000;
}

.gallery__caption {
  padding: 8px 12px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.gallery__thumbs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding-bottom: 4px;
  overflow-x: auto;
  list-style: none;
}

.gallery__thumb {
  position: relative;
  display: grid;
  place-items: center;
  width: 96px;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  background: var(--color-surface-raised);
  overflow: hidden;
  cursor: pointer;
}

.gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__thumb--active,
.gallery__thumb:focus-visible {
  border-color: var(--color-accent);
  outline: none;
}

.gallery__play {
  position: absolute;
  color: var(--color-text);
  text-shadow: 0 0 6px #000;
}
</style>
