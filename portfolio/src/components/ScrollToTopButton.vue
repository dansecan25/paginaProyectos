<script setup lang="ts">
import { useScrollThreshold } from '@/composables/useScrollThreshold'
import { scrollBehavior } from '@/utils/motion'

const SHOW_AFTER_PX = 400

const isVisible = useScrollThreshold(SHOW_AFTER_PX)

const scrollToTop = () => window.scrollTo({ top: 0, behavior: scrollBehavior() })
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="isVisible"
      type="button"
      class="scroll-top"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" class="scroll-top__icon">
        <path d="M12 5l-7 7 1.4 1.4L11 8.8V20h2V8.8l4.6 4.6L19 12z" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-top {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: max(24px, env(safe-area-inset-bottom));
  z-index: 1000;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-accent);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.scroll-top:hover {
  background: var(--color-surface-raised);
  transform: translateY(-2px);
}

.scroll-top:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.scroll-top__icon {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
