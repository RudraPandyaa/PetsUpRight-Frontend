<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 group',
      isList ? 'flex flex-row' : 'flex flex-col'
    ]"
  >
    <!-- Image -->
    <div
      :class="[
        'relative bg-gray-50 overflow-hidden shrink-0',
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
        @click.stop="toggleWishlist"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="isWishlisted ? 'text-[#1a1a2e] fill-[#c3b5df]' : 'text-gray-400'"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div :class="['p-4 flex flex-col', isList ? 'flex-1 justify-center' : '']">
      <h3 class="text-sm font-medium text-[#1a1a2e] line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center gap-1 mt-1.5">
        <div class="flex text-amber-400 text-xs">
          <span v-for="i in 5" :key="i">
            {{ i <= Math.round(product.rating) ? '★' : '☆' }}
          </span>
        </div>
        <span class="text-xs text-gray-500">({{ product.rating }})</span>
      </div>

      <!-- Price -->
      <p class="text-base font-semibold text-[#1a1a2e] mt-2">
        ₹{{ product.price.toFixed(2) }}
      </p>

      <!-- Buttons -->
      <div :class="['mt-3', isList ? 'flex flex-wrap items-center gap-2' : 'space-y-2']">
        <button
          @click="$emit('add-to-cart', product)"
          class="bg-[#1a1a2e] hover:bg-[#44476f] text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          :class="isList ? '' : 'w-full'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>

        <template v-if="!isList">
          <div class="text-center text-xs text-gray-400 font-medium">OR</div>
        </template>

        <button
          @click="$emit('buy-now', product)"
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
}

const props = defineProps<{
  product: Product
  viewMode?: 'grid' | 'list'
}>()

defineEmits<{
  'add-to-cart': [product: Product]
  'buy-now': [product: Product]
}>()

const isList = computed(() => props.viewMode === 'list')
const isWishlisted = ref(false)

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
}
</script>