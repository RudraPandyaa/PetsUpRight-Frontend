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

const { getProducts } = useProducts()
const products = ref<any[]>([])
const loading = ref(true)

async function fetchProducts() {
  loading.value = true
  try {
    // Abhi ke liye simple mapping (baad mein real facet IDs se replace karenge)
    const result = await getProducts({
      take: 12,
      // minPrice: props.filters?.priceRange?.[0],
      // maxPrice: props.filters?.priceRange?.[1],
    })

    products.value = result.items.map((item: any) => ({
      id: item.productId,
      name: item.productName,
      slug: item.slug,
      image: item.productAsset?.preview
        ? item.productAsset.preview + '?preset=medium'
        : '/images/shop/Rectangle-5.png',
      price: getPriceValue(item) / 100,
      rating: 4.9,
    }))
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function getPriceValue(item: any) {
  if (item.priceWithTax?.__typename === 'PriceRange') {
    return item.priceWithTax.min
  }
  return item.priceWithTax?.value || 0
}

// Filters change hone pe dubara fetch
watch(() => props.filters, fetchProducts, { deep: true, immediate: true })
</script>