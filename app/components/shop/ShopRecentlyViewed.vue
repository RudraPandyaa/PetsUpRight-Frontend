<template>
  <section v-if="recentProducts.length" class="bg-[#f7f7f8] py-12 md:py-16">
    <div class="container mx-auto px-4">
      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-bold text-[#1a1a2e] mb-6 md:mb-8">
        Recently Viewed
      </h2>

      <!-- Products -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        <ProductCard
          v-for="product in recentProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="onAddToCart"
          @buy-now="onBuyNow"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/shop/ProductCard.vue'

const { getAll } = useRecentlyViewed()

const recentProducts = ref<any[]>([])

onMounted(() => {
  recentProducts.value = getAll().map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image,
    price: p.price,
    rating: 4.9,
  }))
})

function onAddToCart(product: any) {
  console.log('Add to cart (recent):', product.name)
}

function onBuyNow(product: any) {
  if (product.slug) navigateTo(`/product/${product.slug}`)
}
</script>