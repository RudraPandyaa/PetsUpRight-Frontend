<script setup lang="ts">
const { items, bundleName, bundleDesc, currentPrice, pending } =
  useFrequentlyBought()

// originalPrice optional – collection custom field se la sakte ho
const originalPrice = computed(() => Math.round(currentPrice.value * 1.2))
</script>

<template>
  <section v-if="!pending && items.length" class="frequently-bought mt-12 md:mt-16">
    <h2 class="section-title">Frequently Bought Together</h2>
    <div class="bundle-card">
      <div class="products-row">
        <template v-for="(item, index) in items" :key="item.id">
          <div class="product-thumb">
            <img :src="item.image" :alt="item.name" class="thumb-img" />
          </div>
          <span v-if="index < items.length - 1" class="plus">+</span>
        </template>
      </div>

      <div class="bundle-info">
        <div>
          <h3 class="bundle-name">{{ bundleName }}</h3>
          <p class="bundle-desc">{{ bundleDesc }}</p>
        </div>
        <div class="price-action">
          <div class="prices">
            <span class="current-price">₹{{ currentPrice.toLocaleString('en-IN') }}</span>
            <span class="original-price">₹{{ originalPrice.toLocaleString('en-IN') }}</span>
          </div>
          <button class="add-btn" @click="$emit('add-bundle', items)">
            Add Both to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #44476F;
  margin: 0 0 1.25rem;
}

.bundle-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 2rem;
  padding: 2.25rem 2.5rem;
}

/* Products row */
.products-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.product-thumb {
  width: 100;
  height: 100px;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  background: #f9fafb;
  flex-shrink: 0;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plus {
  font-size: 1.25rem;
  font-weight: 500;
  color: #9ca3af;
  flex-shrink: 0;
}

/* Bundle info */
.bundle-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  flex: 1;
  min-width: 200px;
}

.bundle-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #44476F;
  margin: 0 0 0.25rem;
}

.bundle-desc {
  font-size: 1.15rem;
  color: #6b7280;
  margin: 0;
}

.price-action {
  display: flex;
  flex-direction: column;   
  align-items: flex-end;    
  gap: 0.5rem;
}

.prices {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.15rem;
  font-weight: 700;
  color: #44476F;
}

.original-price {
  font-size: 0.9rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.add-btn {
  background: #ffffff;
  border: 2.5px solid #44476F;
  color: #1a1a2e;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.55rem 1.15rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.add-btn:hover {
  background: #1a1a2e;
  color: #ffffff;
}

/* Responsive */
@media (max-width: 640px) {
  .bundle-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-thumb {
    width: 72px;
    height: 72px;
  }

  .price-action {
    width: 100%;
    justify-content: space-between;
  }
}
</style>