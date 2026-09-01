<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const { getCollections } = useCollections()

const categories = ref<any[]>([])
const loading = ref(true)

const currentIndex = ref(0)
const isDragging = ref(false)
const dragOffset = ref(0)
const visibleCount = 6

let startX = 0
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const slideWidth = 100 / visibleCount

const trackStyle = computed(() => {
  const base = -(currentIndex.value * slideWidth)
  const dragPercent = isDragging.value
    ? (dragOffset.value / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100
    : 0

  return {
    transform: `translateX(${base + dragPercent}%)`,
    transition: isDragging.value ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
  }
})

const maxIndex = computed(() =>
  Math.max(0, categories.value.length - visibleCount)
)

function next() {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = maxIndex.value
  }
}

function goTo(index: number) {
  currentIndex.value = index
}

function startAutoplay() {
  stopAutoplay()
  if (categories.value.length > visibleCount) {
    autoplayTimer = setInterval(next, 3500)
  }
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

onMounted(async () => {
  try {
    const items = await getCollections()
    categories.value = items.map((c: any) => ({
      id: c.id,
      name: c.name,
      image: c.featuredAsset?.preview || '/images/categories/placeholder.jpg',
      link: `/shop?collection=${c.slug}`,
    }))
  } catch (error) {
    console.error('Failed to fetch collections:', error)
  } finally {
    loading.value = false
    startAutoplay()
  }
})

onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section class="md:pt-20 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Heading -->
      <div class="text-center mb-10 md:mb-12">
        <div class="paw-icon">🐾</div>
        <h2 class="title">
          CATEGORIES
        </h2>
        <p class="text-[20px] text-[#1a1a2e]/55 mt-2 max-w-[560px] mx-auto">
          From nutritious treats to fun toys and everyday must-haves.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="flex flex-col items-center"
        >
          <div class="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-200 animate-pulse"></div>
          <div class="h-4 w-16 bg-gray-200 rounded mt-3 animate-pulse"></div>
        </div>
      </div>

      <!-- Slider -->
      <div
        v-else
        class="relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
      >
        <div
          class="flex"
          :style="trackStyle"
          @mousedown.prevent="(e) => onDragStart(e.clientX)"
          @mousemove="(e) => onDragMove(e.clientX)"
          @mouseup="onDragEnd"
          @mouseleave="onDragEnd"
          @touchstart.passive="(e) => onDragStart(e.touches[0].clientX)"
          @touchmove.passive="(e) => onDragMove(e.touches[0].clientX)"
          @touchend="onDragEnd"
        >
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="shrink-0 px-0"
            :style="{ width: `${slideWidth}%` }"
          >
            <NuxtLink :to="cat.link" class="flex flex-col items-center group">
              <div
                class="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden
                    shadow-md ring-2 ring-transparent group-hover:ring-[#c3b5df]
                    transition-all duration-300 group-hover:scale-105 mx-auto"
              >
                <img
                  :src="cat.image"
                  :alt="cat.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span class="text-sm md:text-base font-semibold text-[#44476f] mt-3 group-hover:text-[#1a1a2e] transition">
                {{ cat.name }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>


<!-- Dots -->
<div
  v-if="!loading && categories.length > visibleCount"
  class="flex justify-center gap-2 mt-8"
>
  <button
    v-for="i in maxIndex + 1"
    :key="i"
    type="button"
    class="h-2 rounded-full transition-all duration-300"
    :class="
      currentIndex === i - 1
        ? 'bg-[#44476f] w-2'
        : 'bg-[#d4c8e8] w-2 hover:bg-[#c3b5df]'
    "
    @click="goTo(i - 1)"
  />
</div>

    </div>
  </section>
</template>

<style>
.paw-icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #c3b5df;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #44476f;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  font-family: 'Paytone One', sans-serif;
}
</style>