import { onMounted, onUnmounted, ref } from 'vue'

/** True once the page has scrolled further down than `threshold` pixels. */
export function useScrollThreshold(threshold: number) {
  const isPastThreshold = ref(false)

  const update = () => {
    isPastThreshold.value = window.scrollY > threshold
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))

  return isPastThreshold
}
