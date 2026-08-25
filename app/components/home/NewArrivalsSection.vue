<template>
  <section class="new-arrivals container mx-auto px-4">
    <!-- Header -->
    <div class="section-header">
      <div class="paw-icon">🐾</div>
      <h2 class="title">NEW ARRIVALS</h2>
      <p class="subtitle">
        From nutritious treats to fun toys and everyday must-haves.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="products-grid">
      <div v-for="i in 8" :key="i" class="product-card animate-pulse">
        <div class="image-wrapper bg-gray-200"></div>
        <div class="product-info">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-else class="products-grid">
      <div
        v-for="product in products"
        :key="product.productId"
        class="product-card"
      >
        <!-- Wishlist heart -->
        <button
          class="wishlist-btn"
          :class="{ active: product.isWishlisted }"
          @click="toggleWishlist(product)"
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>

        <!-- Product Image -->
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.productName" loading="lazy" />
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <h3 class="product-name">{{ product.productName }}</h3>

          <div class="rating">
            <span class="stars">★★★★★</span>
            <span class="rating-value">(4.9)</span>
          </div>

          <p class="price">{{ formatPriceDisplay(product.price) }}</p>

          <!-- Actions -->
          <div class="actions">
            <button class="btn-add-to-cart" @click="addToCart(product)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </button>

            <span class="or-text">OR</span>

            <button class="btn-buy-now" @click="buyNow(product)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Shop All Button -->
    <div class="shop-all-wrapper">
      <button class="btn-shop-all" @click="goToShopAll">
        SHOP ALL
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const products = ref([
  { productId: 1, productName: 'Grain-Free Kibble', slug: 'grain-free-kibble', image: '/images/shop/Rectangle-5.png', price: 80, isWishlisted: false },
  { productId: 2, productName: 'Chicken & Rice Food', slug: 'chicken-rice-food', image: '/images/shop/Rectangle-5.png', price: 120, isWishlisted: false },
  { productId: 3, productName: 'Salmon Dog Treats', slug: 'salmon-dog-treats', image: '/images/shop/Rectangle-5.png', price: 45, isWishlisted: false },
  { productId: 4, productName: 'Soft Pet Bed', slug: 'soft-pet-bed', image: '/images/shop/Rectangle-5.png', price: 999, isWishlisted: false },
  { productId: 5, productName: 'Rope Chew Toy', slug: 'rope-chew-toy', image: '/images/shop/Rectangle-5.png', price: 35, isWishlisted: false },
  { productId: 6, productName: 'Catnip Mouse Toy', slug: 'catnip-mouse-toy', image: '/images/shop/Rectangle-5.png', price: 25, isWishlisted: false },
  { productId: 7, productName: 'Grooming Brush', slug: 'grooming-brush', image: '/images/shop/Rectangle-5.png', price: 60, isWishlisted: false },
  { productId: 8, productName: 'Leather Collar', slug: 'leather-collar', image: '/images/shop/Rectangle-5.png', price: 150, isWishlisted: false },
  { productId: 9, productName: 'Nylon Leash', slug: 'nylon-leash', image: '/images/shop/Rectangle-5.png', price: 90, isWishlisted: false },
  { productId: 10, productName: 'Stainless Bowl Set', slug: 'stainless-bowl-set', image: '/images/shop/Rectangle-5.png', price: 75, isWishlisted: false },
  { productId: 11, productName: 'Dental Chew Sticks', slug: 'dental-chew-sticks', image: '/images/shop/Rectangle-5.png', price: 40, isWishlisted: false },
  { productId: 12, productName: 'Pet Carrier Bag', slug: 'pet-carrier-bag', image: '/images/shop/Rectangle-5.png', price: 1299, isWishlisted: false },
])

const loading = ref(false)

function toggleWishlist(product: any) {
  product.isWishlisted = !product.isWishlisted
}

function addToCart(product: any) {
  console.log('Added to cart:', product.productName)
}

function buyNow(product: any) {
  navigateTo(`/product/${product.slug}`)
}

function goToShopAll() {
  navigateTo('/shop')
}

// price already rupees me hai
function formatPriceDisplay(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price)
}
</script>
<style scoped>
/* ========== Pets Upright Brand Colors ==========
   Light Purple : #c3b5df
   Dark Navy    : #44476f
   Black        : #000000
   White        : #ffffff
   Soft Gray    : #ede7e7
================================================= */

.new-arrivals {
  margin: 0 auto;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: #ffffff;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.paw-icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #c3b5df;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #44476f;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  max-width: 420px;
  margin-inline: auto;
}

/* Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* Product Card */
.product-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 3px rgba(68, 71, 111, 0.08);
  border: 1px solid #ede7e7;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 8px 25px rgba(68, 71, 111, 0.15);
  transform: translateY(-4px);
  border-color: #c3b5df;
}

/* Wishlist */
.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #c3b5df;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.wishlist-btn:hover,
.wishlist-btn.active {
  color: #44476f;
  background: #fff;
}

.wishlist-btn.active svg {
  fill: #c3b5df;
  stroke: #c3b5df;
}

.wishlist-btn svg {
  width: 18px;
  height: 18px;
}

/* Image */
.image-wrapper {
  aspect-ratio: 1 / 1;
  background: #ede7e7;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .image-wrapper img {
  transform: scale(1.05);
}

/* Info */
.product-info {
  padding: 1rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #000000;
  margin: 0;
  line-height: 1.3;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
}

.stars {
  color: #c3b5df;
  letter-spacing: -1px;
}

.rating-value {
  color: #6b7280;
}

.price {
  font-size: 1.05rem;
  font-weight: 700;
  color: #44476f;
  margin: 0.15rem 0 0.5rem;
}

/* Actions */
.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-add-to-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem 1rem;
  background: #44476f;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-add-to-cart:hover {
  background: #35375a;
}

.or-text {
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #c3b5df;
  letter-spacing: 0.05em;
}

.btn-buy-now {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 1rem;
  background: #ffffff;
  color: #44476f;
  border: 1.5px solid #c3b5df;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-buy-now:hover {
  border-color: #44476f;
  background: #ede7e7;
}

/* Shop All */
.shop-all-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}

.btn-shop-all {
  padding: 0.75rem 2.5rem;
  background: #ffffff;
  color: #44476f;
  border: 1.5px solid #c3b5df;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-shop-all:hover {
  border-color: #44476f;
  background: #c3b5df;
  color: #000000;
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
    gap: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .new-arrivals {
    padding: 3rem 1rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>