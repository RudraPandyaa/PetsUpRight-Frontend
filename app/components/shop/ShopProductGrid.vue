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
  sortBy?: string
  currentPage?: number
  perPage?: number
  filters?: {
    search?: string
    petType: string[]
    category: string[]
    brand: string[]
    priceMin?: number
    priceMax?: number
    priceRange?: number[]
    ratings: number[]
  }
}>()

const route = useRoute()
const { getProducts } = useProducts()

const products = ref<any[]>([])
const loading = ref(true)

async function fetchProducts() {
  loading.value = true
  try {
    const f = props.filters
    const facetValueIds = [
      ...(f?.petType || []),
      ...(f?.category || []),
    ]

    const minPrice = Number(f?.priceMin ?? 0)
    const maxPrice = Number(f?.priceMax ?? 10000)
    const page = props.currentPage || 1
    const perPage = props.perPage || 12

    const result = await getProducts({
      take: 100, // enough for client pagination
      skip: 0,
      facetValueIds: facetValueIds.length ? facetValueIds : undefined,
      term: f?.search || undefined,
      collectionSlug: (route.query.collection as string) || undefined,
    })

    let items = (result.items || []).map((item: any) => {
      const priceObj = item.priceWithTax || {}
      let priceValue = 0
      if (typeof priceObj.value === 'number') priceValue = priceObj.value
      else if (typeof priceObj.min === 'number') priceValue = priceObj.min

      return {
        id: item.productId,
        name: item.productName,
        slug: item.slug,
        image: item.productAsset?.preview
          ? String(item.productAsset.preview).replace(/\\/g, '/') + '?preset=medium'
          : '/images/shop/Rectangle-5.png',
        price: Math.round(priceValue / 100),
        rating: 4.9,
      }
    })

    // Price
    if (!(minPrice <= 0 && maxPrice >= 10000)) {
      items = items.filter((p) => p.price >= minPrice && p.price <= maxPrice)
    }

    // Ratings
    if (f?.ratings?.length) {
      const minRating = Math.min(...f.ratings)
      items = items.filter((p) => p.rating >= minRating)
    }

    // Sort
    const sort = props.sortBy || 'popularity'
    if (sort === 'price-low') items.sort((a, b) => a.price - b.price)
    else if (sort === 'price-high') items.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)

    // Total (full filtered list)
    emit('update:total', items.length)

    // Page slice
    const start = (page - 1) * perPage
    products.value = items.slice(start, start + perPage)
  } catch (e) {
    console.error(e)
    products.value = []
    emit('update:total', 0)
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.filters, props.sortBy, props.currentPage, props.perPage, route.query.collection],
  () => fetchProducts(),
  { deep: true, immediate: true }
)
const emit = defineEmits<{ 'update:total': [n: number] }>()
function onAddToCart(product: any) {
  console.log('Add to cart:', product.name)
}

function onBuyNow(product: any) {
  navigateTo(`/product/${product.slug}`)
}
</script>