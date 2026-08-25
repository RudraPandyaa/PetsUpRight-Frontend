<template>
  <div class="container mx-auto px-4 py-6 md:py-10">
    <div v-if="loading" class="animate-pulse grid lg:grid-cols-2 gap-10">
      <div class="aspect-square bg-gray-200 rounded-xl" />
      <div class="space-y-4">
        <div class="h-6 bg-gray-200 rounded w-1/3" />
        <div class="h-10 bg-gray-200 rounded w-3/4" />
        <div class="h-8 bg-gray-200 rounded w-1/4" />
      </div>
    </div>

    <template v-else-if="product">
      <!-- Breadcrumb -->
      <ProductBreadcrumb :name="product.name" />

      <!-- Main: Gallery + Info -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mt-4">
        <ProductGallery
          :images="galleryImages"
          :name="product.name"
        />

        <ProductInfo
          :product="product"
          :variant="selectedVariant"
          :quantity="quantity"
          @update:variant="selectedVariant = $event"
          @update:quantity="quantity = $event"
          @add-to-cart="onAddToCart"
          @buy-now="onBuyNow"
        />
      </div>

      <!-- Next sections baad me -->
      <!-- Description tabs -->
      <!-- Frequently Bought Together -->
      <!-- Reviews -->
      <!-- You May Also Like -->
    </template>

    <div v-else class="py-20 text-center text-gray-400">
      Product not found
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProductBySlug } = useProducts()

const product = ref<any>(null)
const selectedVariant = ref<any>(null)
const quantity = ref(1)
const loading = ref(true)

const galleryImages = computed(() => {
  if (!product.value) return ['/images/shop/Rectangle-5.png']
  const list = (product.value.assets || []).map((a: any) => a.preview)
  const featured = product.value.featuredAsset?.preview
  if (featured && !list.includes(featured)) list.unshift(featured)
  return list.length ? list : ['/images/shop/Rectangle-5.png']
})

onMounted(async () => {
  try {
    product.value = await getProductBySlug(route.params.slug as string)
    selectedVariant.value = product.value?.variants?.[0] ?? null
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

function onAddToCart() {
  console.log('ADD', selectedVariant.value?.id, quantity.value)
}

function onBuyNow() {
  console.log('BUY', selectedVariant.value?.id, quantity.value)
}
</script>