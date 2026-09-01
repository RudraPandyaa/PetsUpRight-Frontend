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
        <div v-else class="no-image">
          <img src="/images/shop/Rectangle-5.png" :alt="name" class="main-img" />
        </div>
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="thumbs">
      <button
        v-for="(img, i) in displayImages"
        :key="i"
        type="button"
        class="thumb"
        :class="{ active: activeImage === img }"
        @click="activeImage = img"
      >
        <img :src="img + '?preset=thumb'" :alt="`${name} ${i + 1}`" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  name: string
  discount?: number
}>()
const displayImages = computed(() => {
  const imgs = props.images?.length ? [...props.images] : []
  // kam se kam 3 slots (duplicate last / placeholder)
  while (imgs.length < 3) {
    imgs.push(imgs[0] || '/images/shop/Rectangle-5.png')
  }
  return imgs.slice(0, 3)
})
const activeImage = ref('')

watch(
  () => props.images,
  (imgs) => {
    activeImage.value = imgs?.[0] || ''
  },
  { immediate: true }
)
</script>

<style scoped>
.product-gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-image {
  flex: 1;
  min-height: 320px;
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
  border-radius: 12px;
  overflow: hidden;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.no-image {
  color: #9ca3af;
  font-size: 0.9rem;
}

.thumbs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 0.85rem;
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
  .thumb {
    width: 60px;
    height: 60px;
  }
}
</style>