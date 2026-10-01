<template>
  <Teleport to="body">
    <Transition name="cart">

      <div
        v-if="isOpen"
        class="cart-overlay"
        @click="closeCart"
      >

        <div class="cart-backdrop"></div>

        <aside
          class="cart-drawer"
          @click.stop
        >

          <!-- Header -->
          <header class="cart-header">
            <div class="cart-title">
              BAG ({{ cartCount }} ITEMS)
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
          <!-- <div class="location-bar">
            <div class="location-left">
              <svg
                class="location-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <span>
                Enter Pincode to view delivery timelines
              </span>
            </div>

            <span class="location-arrow">›</span>
          </div> -->


          <!-- Savings -->
          <div
            v-if="cart.length > 0"
            class="savings-section"
          >
            <div class="saving-labels">

            <span
              :class="{ active: hasFreeDelivery }"
            >
              FREE DELIVERY
            </span>

            <span
              :class="{ active: totalSavings >= 200 }"
            >
              SAVE ₹200
            </span>

            <span
              :class="{ active: totalSavings >= 400 }"
            >
              SAVE ₹400
            </span>

          </div>

            <div class="saving-line">
              <div
                class="saving-progress"
                :style="{ width: `${savingProgress}%` }"
              ></div>
            </div>

            <div class="saving-values">
              <span>₹0</span>
              <span>₹999</span>
              <span>₹3000</span>
              <span>₹5000</span>
            </div>
          </div>


          <!-- Cart Content -->
          <main class="cart-content">

            <!-- EMPTY CART -->
            <div
              v-if="cart.length === 0"
              class="flex flex-col items-center justify-center h-full text-center px-6"
            >
              <div class="text-5xl mb-4">
                🛒
              </div>

              <h3 class="text-lg font-semibold text-[#30386b]">
                Your cart is empty
              </h3>

              <p class="text-sm text-gray-500 mt-2">
                Add products to your cart and they will appear here.
              </p>
            </div>


            <!-- CART ITEMS -->
            <div
              v-else
              v-for="item in cart"
              :key="item.id"
              class="product-card"
            >
              <div class="product-image-wrapper">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="product-image"
                />
              </div>

              <div class="product-info">
                <div class="product-top">
                  <div class="product-copy">
                    <h3 class="product-name">
                      {{ item.name }}
                    </h3>

                    <p
                      v-if="item.variantName"
                      class="product-variant"
                    >
                      {{ item.variantName }}
                    </p>
                  </div>

                  <button
                    type="button"
                    class="delete-btn"
                    aria-label="Remove item"
                    @click="removeItem(item.id)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                    >
                      <path d="M4 7h16" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M6 7l1 13h10l1-13" />
                      <path d="M9 7V4h6v3" />
                    </svg>
                  </button>
                </div>

                <div class="product-bottom">
                  <div class="price-row">
                    <span class="current-price">
                      ₹{{ Math.round(item.price).toLocaleString('en-IN') }}
                    </span>

                    <span
                      v-if="item.originalPrice"
                      class="old-price"
                    >
                      ₹{{ Math.round(item.originalPrice).toLocaleString('en-IN') }}
                    </span>

                    <span
                      v-if="item.discount"
                      class="discount"
                    >
                      {{ item.discount }}% off
                    </span>
                  </div>

                  <div class="quantity-control">
                    <button
                      type="button"
                      class="quantity-btn"
                      :disabled="item.quantity <= 1"
                      aria-label="Decrease quantity"
                      @click="decreaseQuantity(item.id)"
                    >
                      −
                    </button>

                    <span class="quantity">
                      {{ item.quantity }}
                    </span>

                    <button
                      type="button"
                      class="quantity-btn"
                      aria-label="Increase quantity"
                      @click="increaseQuantity(item.id)"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </main>


          <!-- Bottom Section -->
          <div
            v-if="cart.length > 0"
            class="bottom-section"
          >

            <button
            type="button"
            class="order-summary"
            :aria-expanded="isOrderSummaryOpen"
            @click="isOrderSummaryOpen = !isOrderSummaryOpen"
          >
            <span>ORDER SUMMARY</span>

            <svg
              class="summary-arrow"
              :class="{ open: isOrderSummaryOpen }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <Transition name="summary">
            <div
              v-if="isOrderSummaryOpen"
              class="order-summary-details"
            >
              <div class="summary-row">
                <span>Items subtotal</span>

                <span>
                  ₹{{ cartSubtotal.toLocaleString('en-IN') }}
                </span>
              </div>

              <div
                v-if="totalSavings > 0"
                class="summary-row discount-row"
              >
                <span>Promotion savings</span>

                <span>
                  − ₹{{ totalSavings.toLocaleString('en-IN') }}
                </span>
              </div>

              <div class="summary-row">
                <span>Delivery</span>

                <span
                  v-if="hasFreeDelivery"
                  class="free-delivery"
                >
                  FREE
                </span>

                <span v-else-if="shippingCharge > 0">
                  ₹{{ shippingCharge.toLocaleString('en-IN') }}
                </span>

                <span v-else class="muted-value">
                  Calculated at checkout
                </span>
              </div>

              <div class="summary-divider"></div>

              <div class="summary-row total-row">
                <span>Total</span>

                <span>
                  ₹{{ totalPrice.toLocaleString('en-IN') }}
                </span>
              </div>

              <div
                v-if="totalSavings > 0 || hasFreeDelivery"
                class="total-savings-box"
              >
                <span>
                  Total benefit
                </span>

                <strong>
                  <template v-if="totalSavings > 0">
                    ₹{{ totalSavings.toLocaleString('en-IN') }} saved
                  </template>

                  <template v-if="totalSavings > 0 && hasFreeDelivery">
                    +
                  </template>

                  <template v-if="hasFreeDelivery">
                    Free delivery
                  </template>
                </strong>
              </div>
            </div>
          </Transition>


            <div
              v-if="totalSavings > 0 || hasFreeDelivery"
              class="saving-message"
            >
              <template v-if="totalSavings > 0 && hasFreeDelivery">
                You're saving ₹{{ totalSavings.toLocaleString('en-IN') }}
                with free delivery
              </template>

              <template v-else-if="totalSavings > 0">
                You're saving ₹{{ totalSavings.toLocaleString('en-IN') }}
                on this order
              </template>

              <template v-else>
                You've unlocked free delivery
              </template>
            </div>


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
                <span>BUY NOW</span>

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
import { computed, onMounted } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const {
  activeOrder,
  cartLines,
  cartCount,
  cartTotal,
  getActiveOrder,
  adjustQuantity,
  removeItem: removeOrderItem,
} = useCart()


const isOrderSummaryOpen = ref(false)

const shippingCharge = computed(() => {
  return (
    Number(
      activeOrder.value?.shippingWithTax ?? 0
    ) / 100
  )
})

const cart = computed(() => cartLines.value.map((line: any) => {
  const quantity = Number(line.quantity ?? 1)
  const lineTotal = Number(line.linePriceWithTax ?? 0) / 100

  return {
    id: line.id,
    orderLineId: line.id,
    variantId: line.productVariant?.id,
    name: line.productVariant?.product?.name || line.productVariant?.name || 'Product',
    variantName:
      line.productVariant?.name &&
      line.productVariant?.name !== line.productVariant?.product?.name
        ? line.productVariant.name
        : '',
    image: line.productVariant?.product?.featuredAsset?.preview || '/images/shop/Rectangle-5.png',
    price: lineTotal / quantity,
    quantity,
    originalPrice: undefined,
    discount: undefined,
  }
}))

onMounted(() => {
  getActiveOrder()
})


const savingsMessage = computed(() => {
  const subtotal = cartSubtotal.value

  if (subtotal < FREE_DELIVERY_THRESHOLD) {
    const remaining =
      FREE_DELIVERY_THRESHOLD - subtotal

    return `Add ₹${Math.ceil(remaining).toLocaleString(
      'en-IN'
    )} more for free delivery`
  }

  if (subtotal < SAVE_200_THRESHOLD) {
    const remaining =
      SAVE_200_THRESHOLD - subtotal

    return `Free delivery unlocked! Add ₹${Math.ceil(
      remaining
    ).toLocaleString('en-IN')} more to save ₹200`
  }

  if (subtotal < SAVE_400_THRESHOLD) {
    const remaining =
      SAVE_400_THRESHOLD - subtotal

    return `You're saving ₹${totalSavings.value.toLocaleString(
      'en-IN'
    )}. Add ₹${Math.ceil(
      remaining
    ).toLocaleString('en-IN')} more to save ₹400`
  }

  return `You're saving ₹${totalSavings.value.toLocaleString(
    'en-IN'
  )} with free delivery`
})


/*
|--------------------------------------------------------------------------
| CART COUNT
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| TOTAL PRICE
|--------------------------------------------------------------------------
*/
const totalPrice = computed(() => cartTotal.value)


/*
|--------------------------------------------------------------------------
| TOTAL SAVINGS
|--------------------------------------------------------------------------
*/
const totalSavings = computed(() => {
  const discounts = activeOrder.value?.discounts ?? []

  const savingsInPaise = discounts.reduce(
    (total: number, discount: any) => {
      return total + Math.abs(
        Number(discount.amountWithTax ?? 0)
      )
    },
    0
  )

  return savingsInPaise / 100
})

const cartSubtotal = computed(() => {
  return (
    Number(
      activeOrder.value?.subTotalWithTax ?? 0
    ) / 100
  )
})

// const hasCalculatedShipping = computed(() => {
//   return (
//     activeOrder.value?.shippingLines?.length > 0
//   )
// })

// const hasFreeDelivery = computed(() => {
//   return (
//     hasCalculatedShipping.value &&
//     Number(
//       activeOrder.value?.shippingWithTax ?? 0
//     ) === 0
//   )
// })


const FREE_DELIVERY_THRESHOLD = 999
const SAVE_200_THRESHOLD = 3000
const SAVE_400_THRESHOLD = 5000

const hasFreeDelivery = computed(() => {
  return cartSubtotal.value >= FREE_DELIVERY_THRESHOLD
})

const hasSave200 = computed(() => {
  return cartSubtotal.value >= SAVE_200_THRESHOLD
})

const hasSave400 = computed(() => {
  return cartSubtotal.value >= SAVE_400_THRESHOLD
})

/*
|--------------------------------------------------------------------------
| SAVINGS PROGRESS
|--------------------------------------------------------------------------
*/
const savingProgress = computed(() => {
  const subtotal = cartSubtotal.value

  if (subtotal <= 0) {
    return 0
  }

  return Math.min(
    (subtotal / 5000) * 100,
    100
  )
})

const closeCart = () => {
  emit('close')
}


/*
|--------------------------------------------------------------------------
| INCREASE QUANTITY
|--------------------------------------------------------------------------
*/
const increaseQuantity = async (
  id: number | string
) => {
  const item = cart.value.find(
    item => String(item.id) === String(id)
  )

  if (!item) return

  try {
    await adjustQuantity(
      String(item.orderLineId),
      item.quantity + 1
    )
  } catch (error) {
    console.error(
      'Could not increase quantity:',
      error
    )
  }
}


/*
|--------------------------------------------------------------------------
| DECREASE QUANTITY
|--------------------------------------------------------------------------
*/
const decreaseQuantity = async (
  id: number | string
) => {
  const item = cart.value.find(
    item => String(item.id) === String(id)
  )

  if (!item || item.quantity <= 1) return

  try {
    await adjustQuantity(
      String(item.orderLineId),
      item.quantity - 1
    )
  } catch (error) {
    console.error(
      'Could not decrease quantity:',
      error
    )
  }
}

/*
|--------------------------------------------------------------------------
| REMOVE ITEM
|--------------------------------------------------------------------------
*/
const removeItem = async (
  id: number | string
) => {
  try {
    await removeOrderItem(String(id))
  } catch (error) {
    console.error(
      'Could not remove cart item:',
      error
    )
  }
}


/*
|--------------------------------------------------------------------------
| BUY NOW
|--------------------------------------------------------------------------
*/
const buyNow = () => {
  if (cart.value.length === 0) return

  closeCart()
  navigateTo('/checkout')
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
  height: 3px;

  background: #288f3a;

  transition: width 0.3s ease;
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
  padding: 12px 16px 18px;
}

.product-card {
  position: relative;
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 14px;

  width: 100%;
  min-height: 116px;
  margin-bottom: 12px;
  padding: 12px;

  border: 1px solid #e3e3e8;
  border-radius: 10px;

  background: #ffffff;
  box-shadow: 0 1px 4px rgba(34, 34, 48, 0.04);
}

/* .product-card:hover {
  border-color: #d5d2df;
} */

.product-image-wrapper {
  width: 88px;
  height: 88px;
  align-self: center;
  overflow: hidden;

  border-radius: 8px;
  background: #f7f6f8;
}

.product-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}

.product-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.product-copy {
  min-width: 0;
}

.product-name {
  margin: 1px 0 0;

  color: #30386b;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 650;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-variant {
  margin: 5px 0 0;

  color: #85858f;
  font-size: 11px;
  line-height: 1.35;
}

.product-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.price-row {
  min-width: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 5px;
}

.current-price {
  color: #20202a;
  font-size: 15px;
  line-height: 1;
  font-weight: 700;
}

.old-price {
  color: #96969f;
  font-size: 11px;
  text-decoration: line-through;
}

.discount {
  color: #d85b50;
  font-size: 10px;
  font-weight: 600;
}

.quantity-control {
  flex: 0 0 auto;

  display: grid;
  grid-template-columns: 28px 30px 28px;
  align-items: center;

  height: 30px;

  overflow: hidden;
  border: 1px solid #ded9ea;
  border-radius: 7px;
  background: #ffffff;
}

.quantity-btn {
  display: grid;
  place-items: center;

  width: 28px;
  height: 100%;

  padding: 0;
  border: 0;
  background: transparent;

  color: #44476f;
  font-size: 16px;
  line-height: 1;

  cursor: pointer;
}

.quantity-btn:hover:not(:disabled) {
  background: #f4f1f8;
}

.quantity-btn:disabled {
  color: #b8b8c0;
  cursor: not-allowed;
}

.quantity {
  display: grid;
  place-items: center;

  height: 100%;
  border-right: 1px solid #eeeaf3;
  border-left: 1px solid #eeeaf3;

  color: #30324f;
  font-size: 11px;
  font-weight: 600;
}

.delete-btn {
  flex: 0 0 auto;

  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;

  padding: 0;
  border: 0;
  border-radius: 6px;

  background: transparent;
  color: #8b8b94;

  cursor: pointer;
}

.delete-btn:hover {
  background: #f7f4f7;
  color: #b44747;
}

.delete-btn svg {
  width: 17px;
  height: 17px;
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
  transition: transform 0.2s ease;
}

.summary-arrow.open {
  transform: rotate(180deg);
}

.order-summary-details {
  padding: 12px 17px 14px;
  background: #ffffff;
  border-top: 1px solid #eeeeee;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 9px;
  color: #5f6070;
  font-size: 13px;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.discount-row {
  color: #238c3c;
}

.free-delivery {
  color: #238c3c;
  font-weight: 700;
}

.muted-value {
  color: #999999;
  font-size: 12px;
}

.summary-divider {
  height: 1px;
  margin: 11px 0;
  background: #e5e7eb;
}

.total-row {
  margin-bottom: 11px;
  color: #34364d;
  font-size: 15px;
  font-weight: 700;
}

.total-savings-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 11px;
  color: #237c36;
  background: #edf8ef;
  border-radius: 7px;
  font-size: 12px;
}

.total-savings-box strong {
  text-align: right;
}

.summary-enter-active,
.summary-leave-active {
  overflow: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.summary-enter-from,
.summary-leave-to {
  opacity: 0;
  transform: translateY(-5px);
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