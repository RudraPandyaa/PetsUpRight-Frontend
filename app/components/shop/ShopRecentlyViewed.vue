<template>
  <section v-if="recentProducts.length" class="bg-[#f7f7f8] py-12 md:py-16">
    <div class="container mx-auto px-4">
      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-bold text-[#1a1a2e] mb-6 md:mb-8">
        Recently Viewed
      </h2>

      <!-- Products -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        <ProductCard v-for="product in recentProducts" :key="product.id" :product="product" view-mode="grid" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/shop/ProductCard.vue'

const { getAll } = useRecentlyViewed()
const { getProductBySlug } = useProducts()

const recentProducts = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const storedProducts = getAll()

    const products = await Promise.all(
      storedProducts.map(async (stored: any) => {
        try {
          const product = await getProductBySlug(
            stored.slug
          )

          if (!product) {
            return null
          }

          const firstVariant =
            product.variants?.[0]

          if (!firstVariant?.id) {
            return null
          }

          return {
            id: product.id,

            variantId: String(
              firstVariant.id
            ),

            name: product.name,

            slug: product.slug,

            image:
              product.featuredAsset?.preview
                ? `${product.featuredAsset.preview}?preset=medium`
                : '/images/shop/Rectangle-5.png',

            price: Math.round(
              Number(
                firstVariant.priceWithTax ?? 0
              ) / 100
            ),

            rating: 4.9,
          }
        } catch (error) {
          console.error(
            'Failed to load recently viewed product:',
            stored.slug,
            error
          )

          return null
        }
      })
    )

    recentProducts.value =
      products.filter(Boolean)

  } catch (error) {
    console.error(
      'Failed to load recently viewed:',
      error
    )

    recentProducts.value = []
  } finally {
    loading.value = false
  }
})
</script>