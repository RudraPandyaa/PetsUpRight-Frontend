<template>
  <section class="you-may-like mt-12 md:mt-16">
    <h2 class="section-title">You May Also Like</h2>

    <!-- Loading -->
    <div v-if="pending" class="products-grid">
      <div v-for="i in 4" :key="i" class="product-card animate-pulse">
        <div class="image-wrap bg-gray-200" />
        <div class="info space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4" />
          <div class="h-3 bg-gray-200 rounded w-1/2" />
          <div class="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>

    <!-- Products -->
    <div v-else-if="products.length" class="products-grid">
      <!-- existing product card loop -->
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <!-- ... same as your current template ... -->
      </div>
    </div>

    <!-- Empty -->
    <p v-else class="text-gray-400 text-sm">No products found.</p>
  </section>
</template>

<script setup lang="ts">
const { products, pending, error } = useYouMayAlsoLike()

watch([pending, products, error], () => {
  console.log('pending:', pending.value)
  console.log('error:', error.value)
  console.log('products:', products.value)
})
</script>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #44476F;
  margin: 0 0 1.25rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

/* Card */
.product-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Image */
.image-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #f3f4f6;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wishlist-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #d1d5db;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: color 0.2s ease;
}

.wishlist-btn.active {
  color: #ef4444; /* red heart */
}

/* Info */
.info {
  padding: 0.85rem 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4B4B7C;
  margin: 0 0 0.3rem;
  line-height: 1.3;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.35rem;
}

.stars {
  color: #C3B5DF;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.rating-count {
  font-size: 0.8rem;
  color: #77767F;
}

.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #6B7280;
  margin: 0 0 0.75rem;
}

/* Buttons */
.btn-cart {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: #2D3057;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-cart:hover {
  background: #1f2240;
}

.or-divider {
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.08em;
  margin: 0.45rem 0;
}

.btn-buy {
  width: 100%;
  background: #ffffff;
  color: #2D3057;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.55rem 0.75rem;
  border: 1.5px solid #2D3057;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-buy:hover {
  background: #2D3057;
  color: #ffffff;
}

/* Responsive */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>