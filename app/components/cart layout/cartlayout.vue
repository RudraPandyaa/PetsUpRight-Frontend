<template>
  <Teleport to="body">
    <Transition name="cart">

      <div
        v-if="isOpen"
        class="cart-overlay"
        @click="closeCart"
      >

        <!-- Dark overlay -->
        <div class="cart-backdrop"></div>

        <!-- Cart Drawer -->
        <aside
          class="cart-drawer"
          @click.stop
        >

          <!-- Header -->
          <header class="cart-header">

            <div class="cart-title">
              BAG (1 ITEMS)
            </div>

            <button
              type="button"
              class="close-btn"
              aria-label="Close cart"
              @click="closeCart"
            >
              ×
            </button>

          </header>


          <!-- Delivery Location -->
          <div class="location-bar">

            <div class="location-left">

              <svg
                class="location-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                />
              </svg>

              <span>
                Enter Pincode to view delivery timelines
              </span>

            </div>

            <span class="location-arrow">
              ›
            </span>

          </div>


          <!-- Savings -->
          <div class="savings-section">

            <div class="saving-labels">

              <span class="active">
                DELIVERY FREE
              </span>

              <span>
                SAVE ₹50
              </span>

              <span>
                SAVE ₹75
              </span>

            </div>

            <div class="saving-line">
              <div class="saving-progress"></div>
            </div>

            <div class="saving-values">
              <span>₹750</span>
              <span>₹2000</span>
              <span>₹3000</span>
              <span>₹5000</span>
            </div>

          </div>


          <!-- Cart Content -->
          <main class="cart-content">

            <div class="product-card">

              <!-- Product image -->
              <div class="product-image-wrapper">

                <img
                  src="/images/shop/Rectangle-5.png"
                  alt="ZL Rain Ready Raincoat Red"
                  class="product-image"
                />

              </div>


              <!-- Product info -->
              <div class="product-info">

                <h3 class="product-name">
                  ZL Rain Ready Raincoat Red
                </h3>

                <div class="product-size">
                  Size: XS
                </div>

                <div class="price-row">

                  <span class="current-price">
                    ₹1,169
                  </span>

                  <span class="old-price">
                    ₹1,299
                  </span>

                  <span class="discount">
                    (10% OFF)
                  </span>

                </div>


                <!-- Quantity -->
                <div class="quantity-control">

                  <button
                    type="button"
                    class="quantity-btn"
                    :disabled="quantity <= 1"
                    @click="decreaseQuantity"
                  >
                    −
                  </button>

                  <span class="quantity">
                    {{ quantity }}
                  </span>

                  <button
                    type="button"
                    class="quantity-btn"
                    @click="increaseQuantity"
                  >
                    +
                  </button>

                </div>

              </div>


              <!-- Delete -->
              <button
                type="button"
                class="delete-btn"
                aria-label="Remove item"
                @click="removeItem"
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                >
                  <path d="M4 7h16" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M6 7l1 13h10l1-13" />
                  <path d="M9 7V4h6v3" />
                </svg>

              </button>

            </div>

          </main>


          <!-- Bottom Section -->
          <div class="bottom-section">

            <!-- Order summary -->
            <button
              type="button"
              class="order-summary"
            >

              <span>
                ORDER SUMMARY
              </span>

              <svg
                class="summary-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>

            </button>


            <!-- Saving message -->
            <div class="saving-message">
              You're saving ₹205 on this order
            </div>


            <!-- Checkout -->
            <div class="checkout-bar">

              <div class="total-section">

                <div class="total-price">
                  ₹{{ totalPrice.toLocaleString('en-IN') }}
                </div>

                <div class="tax-text">
                  Inclusive of all taxes
                </div>

              </div>


              <button
                type="button"
                class="buy-btn"
                @click="buyNow"
              >

                <span>
                  BUY NOW
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>

              </button>

            </div>

          </div>

        </aside>

      </div>

    </Transition>
  </Teleport>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const quantity = ref(1)

const unitPrice = 1169

const totalPrice = computed(() => {
  return unitPrice * quantity.value
})


const closeCart = () => {
  emit('close')
}


const increaseQuantity = () => {
  quantity.value++
}


const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}


const removeItem = () => {
  console.log('Product removed')
}


const buyNow = () => {
  console.log('Buy Now clicked')
}
</script>


<style scoped>

* {
  box-sizing: border-box;
}


/* =====================================
   OVERLAY
===================================== */

.cart-overlay {
  position: fixed;
  inset: 0;

  z-index: 999999;

  display: flex;
  justify-content: flex-end;
}


.cart-backdrop {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.48);
}


/* =====================================
   CART DRAWER
===================================== */

.cart-drawer {
  position: relative;
  z-index: 2;

  width: 500px;
  height: 100vh;

  flex-shrink: 0;

  background: #ffffff;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  box-shadow:
    -6px 0 20px rgba(0, 0, 0, 0.18);
}


/* =====================================
   HEADER
===================================== */

.cart-header {
  height: 26px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;

  border-bottom: 1px solid #e4e4e4;

  background: #ffffff;
}


.cart-title {
  font-size: 14px;
  font-weight: 600;

  letter-spacing: 0.3px;

  color: #333333;
}


.close-btn {
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 0;

  background: transparent;

  font-size: 26px;
  font-weight: 300;

  line-height: 1;

  color: #252525;

  cursor: pointer;

  transform: translateY(-2px);
}


/* =====================================
   LOCATION
===================================== */

.location-bar {
  height: 28px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 15px;

  background: #eee3ff;

  color: #625a6b;

  font-size: 12px;
}


.location-left {
  display: flex;
  align-items: center;

  gap: 5px;
}


.location-icon {
  width: 11px;
  height: 11px;
}


.location-arrow {
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  line-height: 16px;

  color: #71677e;

  transform: translateY(-4px);
}


/* =====================================
   SAVINGS
===================================== */

.savings-section {
  height: 42px;

  flex-shrink: 0;

  padding: 5px 17px 0;

  background: #ffffff;

  margin-top: 4px;
}


.saving-labels {
  display: grid;

  grid-template-columns:
    1fr
    1fr
    1fr;

  font-size: 14px;

  color: #999999;
}


.saving-labels span:nth-child(2) {
  text-align: center;
}


.saving-labels span:nth-child(3) {
  text-align: right;
}


.saving-labels .active {
  color: #238c3c;

  font-weight: 600;
}


.saving-line {
  position: relative;

  width: 100%;
  height: 3px;

  margin-top: 4px;

  background: #eeeeee;
}


.saving-progress {
  width: 22%;
  height: 3px;

  background: #288f3a;
}


.saving-values {
  display: flex;

  justify-content: space-between;

  margin-top: 4px;

  font-size: 12px;

  color: #666666;
}


/* =====================================
   CART CONTENT
===================================== */

.cart-content {
  flex: 1;

  min-height: 0;

  overflow-y: auto;

  padding: 11px 17px;
}


.product-card {
  position: relative;

  width: 100%;
  min-height: 95px;

  display: flex;

  padding: 6px;

  border: 1px solid #dcdcdc;

  border-radius: 8px;

  background: #ffffff;

  margin-top: 8px;
}


.product-image-wrapper {
  /* flex: 0 0 79px; */

  width: 100px;
  height: 100px;

  overflow: hidden;

  border-radius: 6px;

  background: #f3f3f3;

  margin-top: 8px;
  margin-left:8px;
}


.product-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
}


.product-info {
  position: relative;

  flex: 1;

  min-width: 0;

  padding: 3px 22px 0 12px;
}


.product-name {
  margin: 4px;

  font-size: 16px;

  line-height: 13px;

  font-weight: 600;

  color: #30386b;
}


.product-size {
  margin: 4px;

  font-size: 12px;

  color: #777777;
}


.price-row {
  display: flex;

  align-items: baseline;

  gap: 6px;

  margin: 4px;

  white-space: nowrap;
}


.current-price {
  font-size: 18px;

  font-weight: 600;

  color: #202020;
}


.old-price {
  font-size: 18px;

  color: #999999;

  text-decoration: line-through;
}


.discount {
  font-size: 14px;

  color: #ec5a4c;
}


/* =====================================
   QUANTITY
===================================== */

.quantity-control {
  width: 110px;
  height: 30px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: 10px;
  margin-left: 4px;

  padding: 0 8px;

  border: 1px solid #e6d7fa;

  border-radius: 23px;

  background: #fbf8ff;
}


.quantity-btn {
  border: 0;

  padding: 0;

  background: transparent;

  color: #39305a;

  font-size: 13px;

  cursor: pointer;
}


.quantity-btn:disabled {
  opacity: 0.35;

  cursor: default;
}


.quantity {
  font-size: 9px;

  color: #514b58;
}


/* =====================================
   DELETE
===================================== */

.delete-btn {
  position: absolute;

  right: 10px;
  bottom: 10px;

  width: 28px;
  height: 28px;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 0;

  border: 0;

  background: transparent;

  color: #666666;

  cursor: pointer;
}


.delete-btn svg {
  width: 24px;
  height: 24px;
}


/* =====================================
   BOTTOM
===================================== */

.bottom-section {
  flex-shrink: 0;

  background: #ffffff;
}


/* =====================================
   ORDER SUMMARY
===================================== */

.order-summary {
  width: 100%;
  height: 29px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 17px;

  border: 0;
  border-top: 1px solid #dddddd;

  background: #ffffff;

  color: #34364d;

  font-size: 14px;

  font-weight: 600;

  letter-spacing: 0.4px;

  cursor: pointer;
}


.summary-arrow {
  width: 13px;
  height: 13px;
}


/* =====================================
   SAVING MESSAGE
===================================== */

.saving-message {
  height: 24px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #288b35;

  color: #ffffff;

  font-size: 12px;
}


/* =====================================
   CHECKOUT
===================================== */

.checkout-bar {
  height: 76px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 7px 16px 8px;

  background: #ffffff;

  border-top: 1px solid #eeeeee;
}


.total-section {
  display: flex;

  flex-direction: column;
}


.total-price {
  font-size: 22px;

  line-height: 19px;

  font-weight: 700;

  color: #303030;
}


.tax-text {
  margin-top: 2px;

  font-size: 10px;

  color: #999999;
}


.buy-btn {
  width: 120px;
  height: 44px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 0;

  gap: 2px;
    
  border-radius: 8px;

  background: #30325d;

  color: #ffffff;

  font-size: 12px;

  font-weight: 400;

  letter-spacing: 0.8px;

  cursor: pointer;
}


.buy-btn svg {
  width: 18px;
  height: 18px;
}


/* =====================================
   ANIMATION
===================================== */

.cart-enter-active,
.cart-leave-active {
  transition: opacity 0.25s ease;
}


.cart-enter-active .cart-drawer,
.cart-leave-active .cart-drawer {
  transition: transform 0.3s ease;
}


.cart-enter-from,
.cart-leave-to {
  opacity: 0;
}


.cart-enter-from .cart-drawer,
.cart-leave-to .cart-drawer {
  transform: translateX(100%);
}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 500px) {

  .cart-drawer {
    width: 100%;
  }

}
</style>