<template>
  <main class="wishlist-page min-h-screen bg-white text-[#1a1a2e]">

    <!-- =========================
         WISHLIST CONTENT
    ========================== -->
    <div class="container mx-auto px-4 pb-14 pt-10">

      <!-- Heading -->
      <section>
        <h1
          class="text-[24px] font-bold leading-tight text-[#292b50] md:text-[27px]"
        >
          Your wishlist
        </h1>

        <p class="mt-1 text-[11px] text-[#898998]">
          Products you've saved for later
        </p>
      </section>


      <!-- Wishlist Products -->
<section class="wishlist-products">

  <div class="products-grid">

    <div
      v-for="product in wishlistProducts"
      :key="product.id"
      class="product-card"
    >

      <!-- Wishlist heart -->
      <button
  type="button"
  class="wishlist-btn active"
  aria-label="Remove from wishlist"
  @click="removeFromWishlist(product.id)"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#ef4f72"
    stroke="#ef4f72"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
    />
  </svg>
</button>


      <!-- Product Image -->
      <div class="image-wrapper">
        <img
          :src="product.image"
          :alt="product.name"
          loading="lazy"
        />
      </div>


      <!-- Product Info -->
      <div class="product-info">

        <h3 class="product-name">
          {{ product.name }}
        </h3>


        <!-- Rating -->
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="rating-value">
            (4.9)
          </span>
        </div>


        <!-- Price -->
        <p class="price">
          {{ formatPriceDisplay(product.price) }}
        </p>


        <!-- Actions -->
        <div class="actions">

          <!-- Add To Cart -->
          <button
            class="btn-add-to-cart"
            @click="addToCart(product)"
          >
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
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              />
            </svg>

            Add to Cart
          </button>


          <!-- OR -->
          <span class="or-text">
            OR
          </span>


          <!-- Buy Now -->
          <button
            class="btn-buy-now"
            @click="buyNow(product)"
          >
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
              <path
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
              />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            Buy Now
          </button>

        </div>

      </div>

    </div>

  </div>

</section>


      <!-- =========================
     YOU MAY ALSO LIKE
========================== -->
<section class="mt-12">

  <h2 class="text-[16px] font-bold text-[#292b50]">
    You May Also Like
  </h2>

  <div class="products-grid mt-5">

    <div
      v-for="product in recommendedProducts"
      :key="product.id"
      class="product-card"
    >

      <!-- Wishlist Heart -->
      <button
        type="button"
        class="wishlist-btn"
        aria-label="Add to wishlist"
        @click="addToWishlist(product)"
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
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
          />
        </svg>
      </button>


      <!-- Product Image -->
      <div class="image-wrapper">
        <img
          :src="product.image"
          :alt="product.name"
          loading="lazy"
        />
      </div>


      <!-- Product Info -->
      <div class="product-info">

        <!-- Product Name -->
        <h3 class="product-name">
          {{ product.name }}
        </h3>


        <!-- Rating -->
        <div class="rating">
          <span class="stars">
            ★★★★★
          </span>

          <span class="rating-value">
            ({{ product.reviews }})
          </span>
        </div>


        <!-- Price -->
        <p class="price">
          {{ formatPriceDisplay(product.price) }}
        </p>


        <!-- Buttons -->
        <div class="actions">

          <!-- Add To Cart -->
          <button
            type="button"
            class="btn-add-to-cart"
            @click="addToCart(product)"
          >
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

              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              />
            </svg>

            Add to Cart
          </button>


          <!-- OR -->
          <span class="or-text">
            OR
          </span>


          <!-- Buy Now -->
          <button
            type="button"
            class="btn-buy-now"
            @click="buyNow(product)"
          >
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
              <path
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
              />

              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
              />

              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            Buy Now
          </button>

        </div>

      </div>

    </div>

  </div>

</section>

    </div>

  </main>
</template>


<script setup lang="ts">

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  discount: number
  reviews: number
  image: string
}

function formatPriceDisplay(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price)
}


/*
|--------------------------------------------------------------------------
| Product Images
|--------------------------------------------------------------------------
| Use your actual product image paths here.
*/
const productImages = [
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png',
  '/images/shop/Rectangle-5.png'
]


/*
|--------------------------------------------------------------------------
| Wishlist Products
|--------------------------------------------------------------------------
*/
const wishlistProducts = ref<Product[]>([
  {
    id: 1,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[0]
  },
  {
    id: 2,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[1]
  },
  {
    id: 3,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[2]
  },
  {
    id: 4,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[3]
  },
  {
    id: 5,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[4]
  },
  {
    id: 6,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[5]
  },
  {
    id: 7,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[6]
  },
  {
    id: 8,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[7]
  }
])


/*
|--------------------------------------------------------------------------
| Recommended Products
|--------------------------------------------------------------------------
*/
const recommendedProducts = ref<Product[]>([
  {
    id: 101,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[0]
  },
  {
    id: 102,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[1]
  },
  {
    id: 103,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[2]
  },
  {
    id: 104,
    name: 'Grain-Free Kibble',
    price: 450,
    originalPrice: 500,
    discount: 10,
    reviews: 48,
    image: productImages[3]
  }
])


/*
|--------------------------------------------------------------------------
| Wishlist Actions
|--------------------------------------------------------------------------
*/

function removeFromWishlist(id: number) {
  wishlistProducts.value = wishlistProducts.value.filter(
    product => product.id !== id
  )
}


function addToWishlist(product: Product) {
  console.log('Added to wishlist:', product)
}


function addToCart(product: Product) {
  console.log('Added to cart:', product)
}


function buyNow(product: Product) {
  console.log('Buy now:', product)
}


useHead({
  title: 'Wishlist | PetsUpRight'
})

</script>

<style>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

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
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

/* =========================================
   WISHLIST PRODUCT GRID
========================================= */

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}


/* =========================================
   PRODUCT CARD
   Same as New Arrivals
========================================= */

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


/* =========================================
   WISHLIST BUTTON
========================================= */

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

  transition: all 0.2s ease;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.wishlist-btn:hover {
  transform: scale(1.08);
}

.wishlist-btn svg {
  width: 18px;
  height: 18px;
}

.wishlist-btn.active svg {
  fill: #ef4f72;
  stroke: #ef4f72;
}


/* =========================================
   PRODUCT IMAGE
========================================= */

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


/* =========================================
   PRODUCT INFO
========================================= */

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


/* =========================================
   RATING
========================================= */

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


/* =========================================
   PRICE
========================================= */

.price {
  font-size: 1.05rem;
  font-weight: 700;

  color: #44476f;

  margin: 0.15rem 0 0.5rem;
}


/* =========================================
   ACTIONS
========================================= */

.actions {
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  margin-top: auto;
}


/* Add To Cart */

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


/* OR */

.or-text {
  text-align: center;

  font-size: 0.7rem;
  font-weight: 600;

  color: #c3b5df;

  letter-spacing: 0.05em;
}


/* Buy Now */

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


/* =========================================
   RESPONSIVE
========================================= */

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
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>