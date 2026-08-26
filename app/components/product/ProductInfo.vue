<template>
  <div class="product-info">
    <!-- Brand -->
    <p class="brand">BARK & FEAST</p>

    <!-- Title -->
    <h1 class="title">{{ product?.name }}</h1>

    <!-- Rating -->
    <div class="rating-row">
      <span class="stars">★★★★★</span>
      <span class="rating-count">(1,250 Reviews)</span>
    </div>

    <!-- Price -->
    <div class="price-row">
      <span class="price">₹4,160</span>
      <span class="mrp">₹5,200</span>
      <span class="save">Save ₹1040</span>
    </div>

    <!-- Flavor -->
    <div class="option-block">
      <p class="option-label">Select Flavor</p>
      <div class="option-pills">
        <button
          v-for="f in flavors"
          :key="f"
          type="button"
          class="pill"
          :class="{ active: selectedFlavor === f }"
          @click="selectedFlavor = f"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- Size -->
    <div class="option-block">
      <p class="option-label">Select Size</p>
      <div class="option-pills">
        <button
          v-for="s in sizes"
          :key="s"
          type="button"
          class="pill"
          :class="{ active: selectedSize === s }"
          @click="selectedSize = s"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <!-- Qty + Actions -->
    <div class="actions-row">
      <div class="qty">
        <button type="button" class="qty-btn" @click="changeQty(-1)">−</button>
        <span class="qty-value">{{ quantity }}</span>
        <button type="button" class="qty-btn" @click="changeQty(1)">+</button>
      </div>

      <button type="button" class="btn-buy" @click="emit('buy-now')">BUY NOW</button>
      <button type="button" class="btn-cart" @click="emit('add-to-cart')">ADD TO CART</button>

      <button
        type="button"
        class="btn-wish"
        :class="{ active: wishlisted }"
        @click="wishlisted = !wishlisted"
        aria-label="Wishlist"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>

    <!-- Delivery -->
    <div class="delivery-box">
      <div class="delivery-head">
        <span class="delivery-title">Delivery Check</span>
        <span class="deliverable">Deliverable</span>
      </div>
      <p class="delivery-hint">Enter your pincode to see the estimated delivery date.</p>
      <div class="pincode-row">
        <input
          v-model="pincode"
          type="text"
          maxlength="6"
          placeholder="Enter Pincode"
          class="pincode-input"
        />
        <button type="button" class="pincode-btn">Check ›</button>
      </div>
      <p class="eta">
        <span class="trust-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 8h-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10h2a3 3 0 1 0 6 0h4a3 3 0 1 0 6 0h2v-5zM7 18.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 7 18.5M4 14V7h10v7zm13 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 17 18.5" />
          </svg>
        </span>
        Estimated delivery: 2–4 business days
      </p>
    </div>

    <!-- Trust -->
    <div class="trust-row">
      <!-- Free Delivery -->
      <div class="trust-item">
        <span class="trust-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 8h-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10h2a3 3 0 1 0 6 0h4a3 3 0 1 0 6 0h2v-5zM7 18.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 7 18.5M4 14V7h10v7zm13 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 17 18.5" />
          </svg>
        </span>
        <span>FREE DELIVERY</span>
      </div>

      <!-- 100% Genuine -->
      <div class="trust-item">
        <span class="trust-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
            <g fill="currentColor">
              <path d="M5.338 1.59a61 61 0 0 0-2.837.856a.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453a7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625a11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43A63 63 0 0 1 5.072.56" />
              <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
            </g>
          </svg>
        </span>
        <span>100% GENUINE</span>
      </div>

      <!-- Easy Returns -->
      <div class="trust-item">
        <span class="trust-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-1 8H9.5L13 7.5l-1.42-1.42L5.66 12l5.92 5.92L13 16.5L9.5 13H18z" />
          </svg>
        </span>
        <span>EASY RETURNS</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
  variant?: any
  quantity: number
}>()

const emit = defineEmits<{
  (e: 'update:variant', v: any): void
  (e: 'update:quantity', q: number): void
  (e: 'add-to-cart'): void
  (e: 'buy-now'): void
}>()

const pincode = ref('')
const wishlisted = ref(false)
const selectedFlavor = ref('Salmon')
const selectedSize = ref('3kg')

const flavors = ['Salmon', 'Chicken', 'Lamb']
const sizes = ['500g', '1kg', '3kg', '10kg']

function changeQty(delta: number) {
  emit('update:quantity', Math.max(1, props.quantity + delta))
}
</script>

<style scoped>
.product-info {
  font-family: 'Inter', system-ui, sans-serif;
  color: #44476f;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
}

.brand {
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #44476f;
  margin: 0;
}

.title {
  font-size: 2.30rem;
  font-weight: 700;
  color: #44476f;
  line-height: 1.25;
  margin: 0;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 1.60rem;
}

.stars {
  color: #C3B5DF;
  letter-spacing: -1px;
}

.rating-count {
  color: #9ca3af;
  font-weight: 500;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.85rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.price {
  font-size: 2.10rem;
  font-weight: 700;
  color: #44476f;
}

.mrp {
  font-size: 1.20rem;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: line-through;
}

.save {
  font-size: 1.15rem;
  font-weight: 600;
  color: #e11d48;
}

.option-block {
  margin-top: 0.20rem;
}

.option-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #44476f;
  margin: 0 0 0.75rem;
}

.option-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.3rem 0 0 0.2rem;
}

.pill {
  padding: 0.7rem 1.7rem;
  border-radius: 9999px;
  border: 2.5px solid #e5e7eb;
  background: #fff;
  font-size: 1.10rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill.active {
  border-color: #44476f;
  background: #44476f;
  color: #fff;
}

.actions-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem; /* qty → buy → cart → wish same gap */
  margin: 1rem 0 1.2rem 0;
}

.qty {
  display: flex;
  align-items: center;
  border: 2.5px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #f9fafb;
  margin-right: 0; /* gap se handle hoga */
}

.qty-btn {
  width: 38px;
  height: 50px;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #374151;
}

.qty-value {
  min-width: 32px;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.btn-buy,
.btn-cart {
  min-width: 160px; 
  height: 50px;     
  padding: 0 1.5rem;
  background: #fff;
  color: #44476f;
  border: 2px solid #44476f;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-buy:hover,
.btn-cart:hover {
  background: #f8f6fb;
}

.btn-wish {
  width: 50px;
  height: 50px;
  padding: 0;
  background: #fff;
  color: #44476f;
  border: 2px solid #44476f;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.btn-wish.active {
  color: #c3b5df;
  border-color: #c3b5df;
}

.btn-wish.active svg {
  fill: #c3b5df;
}
.delivery-box {
  background: #EDE7E7;
  border-radius: 10px;
  padding: 1.4rem 1rem 2rem 1.4rem;
}

.delivery-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}

.delivery-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #44476f;
}

.deliverable {
  font-size: 1rem;
  font-weight: 600;
  color: #16a34a;
}

.delivery-hint {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 0.55rem;
}

.pincode-row {
  display: flex;
  gap: 0.5rem;
}

.pincode-input {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 1.15rem;
  font-family: 'Inter', system-ui, sans-serif;
  outline: none;
  background: #fff;
}

.pincode-input:focus {
  border-color: #c3b5df;
}

.pincode-btn {
  padding: 0.5rem 0.9rem;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  white-space: nowrap;
}

.eta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.3rem;
  color: #4b5563;
  margin: 0.6rem 0 0;
}

.trust-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding-top: 1rem;
}

.trust-item {
  display: flex;
  flex-direction: column; /* icon upar, text neeche */
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #44476f;
  text-align: center;
  padding: 0 0.75rem 0 0.2rem;
  position: relative;
}

/* vertical line – 1st & 2nd item ke baad */
.trust-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: #e5e7eb;
}

.trust-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #44476f;
  line-height: 1;
  font-size: 2rem;
}

.trust-icon svg {
  display: block;
  width: 28px;   /* yahan size badhao */
  height: 28px;
}
@media (max-width: 640px) {
  .title {
    font-size: 1.25rem;
  }

  .btn-buy,
  .btn-cart {
    flex: 1;
  }
}
</style>