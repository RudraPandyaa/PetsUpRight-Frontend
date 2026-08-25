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
  { id: 101, name: 'Grain-Free Kibble', image: '/images/shop/Rectangle-5.png', price: 80, rating: 4.9 },
  { id: 102, name: 'Chicken & Rice Food', image: '/images/shop/Rectangle-5.png', price: 120, rating: 4.8 },
  { id: 103, name: 'Salmon Dog Treats', image: '/images/shop/Rectangle-5.png', price: 45, rating: 4.7 },
  { id: 104, name: 'Soft Pet Bed', image: '/images/shop/Rectangle-5.png', price: 999, rating: 4.9 },
  { id: 105, name: 'Rope Chew Toy', image: '/images/shop/Rectangle-5.png', price: 35, rating: 4.6 },
  { id: 106, name: 'Catnip Mouse Toy', image: '/images/shop/Rectangle-5.png', price: 25, rating: 4.5 },
  { id: 107, name: 'Grooming Brush', image: '/images/shop/Rectangle-5.png', price: 60, rating: 4.8 },
  { id: 108, name: 'Leather Collar', image: '/images/shop/Rectangle-5.png', price: 150, rating: 4.7 },
  { id: 109, name: 'Nylon Leash', image: '/images/shop/Rectangle-5.png', price: 90, rating: 4.6 },
  { id: 110, name: 'Stainless Bowl Set', image: '/images/shop/Rectangle-5.png', price: 75, rating: 4.9 },
  { id: 111, name: 'Dental Chew Sticks', image: '/images/shop/Rectangle-5.png', price: 40, rating: 4.4 },
  { id: 112, name: 'Pet Carrier Bag', image: '/images/shop/Rectangle-5.png', price: 1299, rating: 4.8 },
])

function onAddToCart(product: any) {
  console.log('Add to cart (recent):', product)
}

function onBuyNow(product: any) {
  console.log('Buy now (recent):', product)
  if (product.slug) navigateTo(`/product/${product.slug}`)
}
</script>