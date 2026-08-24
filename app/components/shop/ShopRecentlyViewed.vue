<template>
  <section class="bg-[#f7f7f8] py-12 md:py-16">
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
const recentProducts = ref([
  {
    id: 101,
    name: 'Grain-Free Kibble',
    image: '/images/shop/Rectangle-5.png',
    price: 80,
    rating: 4.9,
  },
  {
    id: 102,
    name: 'Grain-Free Kibble',
    image: '/images/shop/Rectangle-5.png',
    price: 80,
    rating: 4.9,
  },
  {
    id: 103,
    name: 'Grain-Free Kibble',
    image: '/images/shop/Rectangle-5.png',
    price: 80,
    rating: 4.9,
  },
  {
    id: 104,
    name: 'Grain-Free Kibble',
    image: '/images/shop/Rectangle-5.png',
    price: 80,
    rating: 4.9,
  },
])

function onAddToCart(product: any) {
  console.log('Add to cart (recent):', product)
}

function onBuyNow(product: any) {
  console.log('Buy now (recent):', product)
}
</script>