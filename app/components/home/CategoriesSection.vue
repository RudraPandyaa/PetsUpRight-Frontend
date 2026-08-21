<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const categories = [
  { name: 'Dry Food', image: '/images/categories/dry-food.jpg', link: '/shop?category=dry-food' },
  { name: 'Furniture', image: '/images/categories/furniture.jpg', link: '/shop?category=furniture' },
  { name: 'Collars', image: '/images/categories/collars.jpg', link: '/shop?category=collars' },
  { name: 'Leashes', image: '/images/categories/leashes.jpg', link: '/shop?category=leashes' },
  { name: 'Toys', image: '/images/categories/toys.jpg', link: '/shop?category=toys' },
  { name: 'Grooming', image: '/images/categories/grooming.jpg', link: '/shop?category=grooming' },
  { name: 'Beds', image: '/images/categories/beds.jpg', link: '/shop?category=beds' },
  { name: 'Treats', image: '/images/categories/treats.jpg', link: '/shop?category=treats' },
]

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

function next() {
  if (currentIndex.value < categories.length - visibleCount) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = Math.max(0, categories.length - visibleCount)
  }
}

function goTo(index: number) {
  currentIndex.value = index
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(next, 3500)
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
</script>

<template>
  <section class="py-14 md:py-20 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Heading -->
      <div class="text-center mb-10 md:mb-12">
        <img
            src="/images/icons/paw.png"
            alt=""
            class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 opacity-80"
        />
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1a1a2e] tracking-wider">
          CATEGORIES
        </h2>
        <p class="text-sm md:text-base text-[#1a1a2e]/55 mt-2 max-w-md mx-auto">
          From nutritious treats to fun toys and everyday must-haves.
        </p>
      </div>

      <!-- Slider -->
      <div class="relative overflow-hidden select-none cursor-grab active:cursor-grabbing">
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
            :key="cat.name"
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
      <div class="flex justify-center gap-2 mt-8">
        <button
          v-for="i in Math.ceil(categories.length / visibleCount)"
          :key="i"
          type="button"
          class="h-2 rounded-full transition-all duration-300"
          :class="
            currentIndex === i - 1
              ? 'bg-[#44476f] w-6'
              : 'bg-[#d4c8e8] w-2 hover:bg-[#c3b5df]'
          "
          @click="goTo(i - 1)"
        />
      </div>
    </div>
  </section>
</template>