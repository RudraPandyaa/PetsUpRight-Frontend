import { ref, onMounted, onBeforeUnmount } from 'vue'

interface UseCarouselOptions {
  itemCount: number
  autoplayInterval?: number
  loop?: boolean
}

export function useCarousel({
  itemCount,
  autoplayInterval = 3500,
  loop = true,
}: UseCarouselOptions) {
  const currentIndex = ref(0)
  const isDragging = ref(false)
  const dragOffset = ref(0)

  let startX = 0
  let autoplayTimer: ReturnType<typeof setInterval> | null = null

  function next() {
    if (currentIndex.value < itemCount - 1) {
      currentIndex.value++
    } else if (loop) {
      currentIndex.value = 0
    }
  }

  function prev() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else if (loop) {
      currentIndex.value = itemCount - 1
    }
  }

  function goTo(index: number) {
    currentIndex.value = Math.max(0, Math.min(index, itemCount - 1))
  }

  function startAutoplay() {
    if (!autoplayInterval || itemCount <= 1) return
    stopAutoplay()
    autoplayTimer = setInterval(next, autoplayInterval)
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer)
      autoplayTimer = null
    }
  }

  function onDragStart(clientX: number) {
    isDragging.value = true
    startX = clientX
    stopAutoplay()
  }

  function onDragMove(clientX: number) {
    if (!isDragging.value) return
    dragOffset.value = clientX - startX
  }

  function onDragEnd() {
    if (!isDragging.value) return

    const threshold = 50
    if (dragOffset.value > threshold) prev()
    else if (dragOffset.value < -threshold) next()

    isDragging.value = false
    dragOffset.value = 0
    startAutoplay()
  }

  onMounted(startAutoplay)
  onBeforeUnmount(stopAutoplay)

  return {
    currentIndex,
    isDragging,
    dragOffset,
    next,
    prev,
    goTo,
    startAutoplay,
    stopAutoplay,
    onDragStart,
    onDragMove,
    onDragEnd,
  }
}