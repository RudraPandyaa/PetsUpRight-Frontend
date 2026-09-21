<template>
  <div class="product-gallery">
    <!-- Main image -->
    <div class="main-image relative">
      <!-- Discount badge (optional – parent se pass kar sakte ho) -->
      <span v-if="discount" class="discount-badge">
        {{ discount }}% OFF
      </span>

      <div class="main-frame">
        <img
          v-if="activeImage"
          :src="activeImage + '?preset=large'"
          :alt="name"
          class="main-img"
        />
        <div v-else class="no-image h-full flex items-center justify-center bg-gray-100 text-gray-400 font-semibold text-lg">
          No image available
        </div>
      </div>
    </div>

    <!-- Thumbnails Carousel -->
    <div v-if="displayImages.length > 1" class="thumbs-carousel-wrapper mt-3 flex items-center justify-between gap-2">
      <button 
        v-if="displayImages.length > 3" 
        type="button" 
        class="nav-btn prev-btn" 
        @click="prevSlide"
        :disabled="startIndex === 0"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="thumbs flex-1" :style="{ gridTemplateColumns: `repeat(${Math.min(3, displayImages.length)}, 1fr)` }">
        <button
          v-for="(img, i) in visibleThumbnails"
          :key="startIndex + i"
          type="button"
          class="thumb"
          :class="{ active: activeImage === img }"
          @click="activeImage = img"
        >
          <img :src="img + '?preset=thumb'" :alt="`${name} ${startIndex + i + 1}`" />
        </button>
      </div>

      <button 
        v-if="displayImages.length > 3" 
        type="button" 
        class="nav-btn next-btn" 
        @click="nextSlide"
        :disabled="startIndex >= displayImages.length - 3"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  images: string[]
  name: string
  discount?: number
}>()

const displayImages = computed(() => {
  return props.images?.length ? [...props.images] : []
})

const activeImage = ref('')
const startIndex = ref(0)

const visibleThumbnails = computed(() => {
  return displayImages.value.slice(startIndex.value, startIndex.value + 3)
})

function prevSlide() {
  if (startIndex.value > 0) {
    startIndex.value--
  }
}

function nextSlide() {
  if (startIndex.value < displayImages.value.length - 3) {
    startIndex.value++
  }
}

watch(
  () => props.images,
  (imgs) => {
    activeImage.value = imgs?.[0] || ''
    startIndex.value = 0
  },
  { immediate: true }
)
</script>

<style scoped>
.product-gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.main-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}

.discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: #e11d48;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.main-frame {
  width: 100%;
  aspect-ratio: 1 / 0.95;
  overflow: hidden;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.03);
}

.no-image {
  color: #9ca3af;
  font-size: 0.9rem;
}

.thumbs-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-btn {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s;
  flex-shrink: 0;
}

.nav-btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.thumbs {
  display: grid;
  gap: 0.75rem;
}

.thumbs::-webkit-scrollbar {
  display: none;
}

.thumb {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  background: #f5f3f0;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.thumb.active {
  border-color: #44476f;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 640px) {
  .main-frame {
    aspect-ratio: 1 / 1;
  }
}
</style>