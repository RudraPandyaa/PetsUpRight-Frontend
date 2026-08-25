<template>
  <div>
    <!-- Loading -->
    <div
      v-if="loading"
      :class="viewMode === 'grid'
        ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'
        : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-xl p-4 animate-pulse border border-gray-100"
      >
        <div class="aspect-square bg-gray-200 rounded-lg mb-3"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Products -->
    <div
      v-else
      :class="viewMode === 'grid'
        ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'
        : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :view-mode="viewMode"
        @add-to-cart="onAddToCart"
        @buy-now="onBuyNow"
      />
    </div>

    <!-- Empty state -->
    <div
      v-if="!loading && products.length === 0"
      class="py-20 text-center text-gray-400"
    >
      <p class="text-lg">No products found</p>
      <p class="text-sm mt-1">Try adjusting your filters</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/shop/ProductCard.vue'

const props = defineProps<{
  viewMode: 'grid' | 'list'
  filters?: {
    petType: string[]
    category: string[]
    brand: string[]
    ratings: number[]
    priceRange: number[]
  }
}>()

const loading = ref(false)

const products = ref([
  { id: 1, name: 'Grain-Free Kibble', image: '/images/shop/Rectangle-5.png', price: 80, rating: 4.9, slug: 'grain-free-kibble' },
  { id: 2, name: 'Chicken & Rice Food', image: '/images/shop/Rectangle-5.png', price: 120, rating: 4.8, slug: 'chicken-rice-food' },
  { id: 3, name: 'Salmon Dog Treats', image: '/images/shop/Rectangle-5.png', price: 45, rating: 4.7, slug: 'salmon-dog-treats' },
  { id: 4, name: 'Soft Pet Bed', image: '/images/shop/Rectangle-5.png', price: 999, rating: 4.9, slug: 'soft-pet-bed' },
  { id: 5, name: 'Rope Chew Toy', image: '/images/shop/Rectangle-5.png', price: 35, rating: 4.6, slug: 'rope-chew-toy' },
  { id: 6, name: 'Catnip Mouse Toy', image: '/images/shop/Rectangle-5.png', price: 25, rating: 4.5, slug: 'catnip-mouse-toy' },
  { id: 7, name: 'Grooming Brush', image: '/images/shop/Rectangle-5.png', price: 60, rating: 4.8, slug: 'grooming-brush' },
  { id: 8, name: 'Leather Collar', image: '/images/shop/Rectangle-5.png', price: 150, rating: 4.7, slug: 'leather-collar' },
  { id: 9, name: 'Nylon Leash', image: '/images/shop/Rectangle-5.png', price: 90, rating: 4.6, slug: 'nylon-leash' },
  { id: 10, name: 'Stainless Bowl Set', image: '/images/shop/Rectangle-5.png', price: 75, rating: 4.9, slug: 'stainless-bowl-set' },
  { id: 11, name: 'Dental Chew Sticks', image: '/images/shop/Rectangle-5.png', price: 40, rating: 4.4, slug: 'dental-chew-sticks' },
  { id: 12, name: 'Pet Carrier Bag', image: '/images/shop/Rectangle-5.png', price: 1299, rating: 4.8, slug: 'pet-carrier-bag' },
])

function onAddToCart(product: any) {
  console.log('Add to cart:', product.name)
}

function onBuyNow(product: any) {
  navigateTo(`/product/${product.slug || product.id}`)
}
</script>