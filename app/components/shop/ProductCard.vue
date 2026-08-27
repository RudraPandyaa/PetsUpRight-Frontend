<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 group',
      isList ? 'flex flex-row' : 'flex flex-col'
    ]"
  >
    <!-- Image → product page -->
    <NuxtLink
      :to="productLink"
      :class="[
        'relative bg-gray-50 overflow-hidden shrink-0 block',
        isList ? 'w-32 sm:w-40 md:w-48 aspect-square' : 'aspect-square w-full'
      ]"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      <!-- Wishlist -->
      <button
        type="button"
        @click.prevent.stop="toggleWishlist"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="isWishlisted ? 'text-[#1a1a2e] fill-[#E85D75]' : 'text-gray-400'"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </NuxtLink>

    <!-- Content -->
    <div :class="['p-4 flex flex-col', isList ? 'flex-1 justify-center' : '']">
      <NuxtLink :to="productLink">
        <h3 class="text-md font-medium text-[#1a1a2e] line-clamp-2 hover:text-[#44476f]">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center gap-1 mt-1.5">
        <div class="flex text-amber-400 text-lg">
          <span v-for="i in 5" :key="i">
            {{ i <= Math.round(product.rating || 0) ? '★' : '☆' }}
          </span>
        </div>
        <span class="text-xs text-gray-500">({{ product.rating || 4.9 }})</span>
      </div>

      <p class="text-base font-semibold text-lg text-[#1a1a2e] mt-2">
        ₹{{ Math.round(product.price) }}
      </p>

      <div :class="['mt-3', isList ? 'flex flex-wrap items-center gap-2' : 'space-y-2']">
        <button
          type="button"
          @click="$emit('add-to-cart', product)"
          class="bg-[#1a1a2e] hover:bg-[#44476f] text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          :class="isList ? '' : 'w-full'"
        >
          Add to Cart
        </button>

        <template v-if="!isList">
          <div class="text-center text-xs text-gray-400 font-medium">OR</div>
        </template>

        <button
          type="button"
          @click="onBuyNow"
          class="border border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          :class="isList ? '' : 'w-full'"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number | string
  name: string
  image: string
  price: number
  rating: number
  slug?: string
}

const props = defineProps<{
  product: Product
  viewMode?: 'grid' | 'list'
}>()

const emit = defineEmits<{
  'add-to-cart': [product: Product]
  'buy-now': [product: Product]
}>()

const isList = computed(() => props.viewMode === 'list')
const isWishlisted = ref(false)

const productLink = computed(() => {
  const slug = props.product.slug || props.product.id
  return `/product/${slug}`
})

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
}

function onBuyNow() {
  emit('buy-now', props.product)
  navigateTo(productLink.value)
}
</script>