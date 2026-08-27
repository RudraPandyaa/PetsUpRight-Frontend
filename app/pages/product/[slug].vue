<template>
  <div class="container mx-auto px-4 pt-6 md:pt-10 pb-10">
    <!-- Loading -->
    <div v-if="loading" class="animate-pulse grid lg:grid-cols-2 gap-10">
      <div class="aspect-square bg-gray-200 rounded-xl" />
      <div class="space-y-4">
        <div class="h-6 bg-gray-200 rounded w-1/3" />
        <div class="h-10 bg-gray-200 rounded w-3/4" />
        <div class="h-8 bg-gray-200 rounded w-1/4" />
      </div>
    </div>

    <!-- Product -->
    <template v-else-if="product">
      <ProductBreadcrumb :name="product.name" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mt-4 items-stretch">
        <ProductGallery
          :images="galleryImages"
          :name="product.name"
          class="h-full"
        />

        <ProductInfo
          :product="product"
          :variant="selectedVariant"
          :quantity="quantity"
          class="h-full"
          @update:variant="selectedVariant = $event"
          @update:quantity="quantity = $event"
          @add-to-cart="onAddToCart"
          @buy-now="onBuyNow"
        />
      </div>

      <ProductTabs
        :description="product.description || ''"
        :highlights="product.highlights || []"
        :ingredients="product.ingredients || ''"
        :usage="product.usage || ''"
        :specs="product.specs || ''"
        :shipping="product.shipping || ''"
      />
      <ProductFrequentlyBought 
        :exclude-product-id="product.id"
        @add-bundle="onAddBundle"
      />
      <ProductReviews />
      <ProductYouMayAlsoLike
        @add-to-cart="onAddToCart"
        @buy-now="onBuyNow"
      />
      <ProductWhyShop />
      <ProductExpertBanner @talk-expert="onTalkExpert" />
    </template>

    <!-- Not found -->
    <div v-else class="py-20 text-center text-gray-400">
      Product not found
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProductBySlug } = useProducts()
const { add } = useRecentlyViewed()

const product = ref<any>(null)
const selectedVariant = ref<any>(null)
const quantity = ref(1)
const loading = ref(true)

const slug = computed(() => route.params.slug as string)

const galleryImages = computed(() => {
  if (!product.value) return ['/images/shop/Rectangle-5.png']
  const list = (product.value.assets || [])
    .map((a: any) => a.preview)
    .filter(Boolean)
  const featured = product.value.featuredAsset?.preview
  if (featured && !list.includes(featured)) list.unshift(featured)
  return list.length ? list : ['/images/shop/Rectangle-5.png']
})

async function loadProduct() {
  loading.value = true
  try {
    const data = await getProductBySlug(slug.value)
    product.value = data
    selectedVariant.value = data?.variants?.[0] || null

    if (data) {
      add({
        id: data.id,
        name: data.name,
        slug: data.slug,
        image: data.featuredAsset?.preview || '',
        price: Math.round(Number(data.variants?.[0]?.priceWithTax || 0) / 100),
      })
    }
  } catch (e) {
    console.error(e)
    product.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadProduct)
watch(slug, loadProduct)

function onAddToCart() {
  console.log('ADD', selectedVariant.value?.id, quantity.value)
}

function onBuyNow() {
  console.log('BUY', selectedVariant.value?.id, quantity.value)
}

function onAddBundle() {
  console.log('Add bundle to cart')
}

function onTalkExpert() {
  console.log('Talk to expert clicked')
}

useHead({
  title: computed(() =>
    product.value ? `${product.value.name} | PetsUpRight` : 'Product | PetsUpRight'
  ),
})
</script>