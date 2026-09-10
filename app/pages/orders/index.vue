<template>
  <main class="orders-page">
    <div class="orders-container">

      <!-- Heading -->
      <div class="orders-heading">
        <div>
          <p class="eyebrow">MY ACCOUNT</p>
          <h1>My Orders</h1>
          <p class="heading-copy">
            View your purchases, check order status and track deliveries.
          </p>
        </div>

        <NuxtLink to="/profile" class="back-button">
          ← Back to Profile
        </NuxtLink>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="state-card">
        Loading your orders...
      </div>

      <template v-else>
        <!-- Search + Filters -->
        <section class="order-controls">
          <div class="search-wrapper">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              v-model.trim="searchQuery"
              type="text"
              placeholder="Search orders by product or order number"
            />
          </div>

          <div class="filter-row">
            <button
              v-for="filter in filters"
              :key="filter.value"
              type="button"
              class="filter-button"
              :class="{ active: selectedFilter === filter.value }"
              @click="selectedFilter = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </section>

        <!-- No Orders -->
        <section
          v-if="!orders.length"
          class="empty-orders"
        >
          <div class="empty-orders-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>

          <h2>No orders yet</h2>

          <p>
            When you place an order, you'll be able to view and
            track it here.
          </p>

          <NuxtLink to="/shop" class="primary-button">
            Start Shopping
          </NuxtLink>
        </section>

        <!-- No Search Results -->
        <section
          v-else-if="!filteredOrders.length"
          class="empty-orders"
        >
          <h2>No matching orders</h2>

          <p>
            Try changing your search or selected filter.
          </p>

          <button
            type="button"
            class="secondary-button"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </section>

        <!-- Orders -->
        <div v-else class="orders-list">
          <article
            v-for="order in filteredOrders"
            :key="order.id"
            class="order-card"
          >
            <!-- Order Header -->
            <div class="order-card-header">
              <div class="order-meta-group">
                <div class="order-meta">
                  <span>ORDER PLACED</span>
                  <strong>
                    {{ formatDate(order.orderPlacedAt) }}
                  </strong>
                </div>

                <div class="order-meta">
                  <span>TOTAL</span>
                  <strong>
                    {{ formatMoney(
                      order.totalWithTax,
                      order.currencyCode
                    ) }}
                  </strong>
                </div>

                <div
                  v-if="order.shippingAddress?.fullName"
                  class="order-meta ship-to-meta"
                >
                  <span>SHIP TO</span>
                  <strong>
                    {{ order.shippingAddress.fullName }}
                  </strong>
                </div>
              </div>

              <div class="order-number">
                <span>ORDER # {{ order.code }}</span>

                <NuxtLink
                  :to="`/orders/${order.code}`"
                >
                  View order details
                </NuxtLink>
              </div>
            </div>

            <!-- Content -->
            <div class="order-card-body">
              <!-- Status -->
              <div class="order-status-row">
                <div>
                  <div
                    class="status-badge"
                    :class="getStatusClass(order)"
                  >
                    {{ getStatusLabel(order) }}
                  </div>

                  <h2>
                    {{ getStatusHeading(order) }}
                  </h2>

                  <p>
                    {{ getStatusDescription(order) }}
                  </p>
                </div>

                <div class="order-main-actions">
                  <NuxtLink
                    v-if="canTrack(order)"
                    :to="`/track-order?order=${order.code}`"
                    class="primary-button track-button"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M10 17h4V5H2v12h3" />
                      <path d="M14 9h4l4 4v4h-3" />
                      <circle cx="7.5" cy="17.5" r="2.5" />
                      <circle cx="16.5" cy="17.5" r="2.5" />
                    </svg>

                    Track Order
                  </NuxtLink>

                  
                </div>
              </div>

              <!-- Products -->
              <div class="order-products">
                <div
                  v-for="line in order.lines"
                  :key="line.id"
                  class="order-product"
                >
                  <div class="product-image">
                    <img
                      v-if="line.featuredAsset?.preview"
                      :src="line.featuredAsset.preview"
                      :alt="line.productVariant.name"
                    />

                    <div v-else class="image-placeholder">
                      <svg viewBox="0 0 24 24">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                      </svg>
                    </div>
                  </div>

                  <div class="product-info">
                    <NuxtLink
                      :to="getProductLink(line)"
                      class="product-name"
                    >
                      {{ line.productVariant.name }}
                    </NuxtLink>

                    <p class="product-sku">
                      SKU: {{ line.productVariant.sku }}
                    </p>

                    <p class="product-quantity">
                      Quantity: {{ line.quantity }}
                    </p>

                    <strong class="product-price">
                      {{
                        formatMoney(
                          line.discountedLinePriceWithTax,
                          order.currencyCode
                        )
                      }}
                    </strong>
                  </div>

                  <div class="product-actions">
                    <NuxtLink
                      :to="getProductLink(line)"
                      class="small-action-button"
                    >
                      View Product
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="order-footer">
                <div class="shipping-info">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s7-5.1 7-12A7 7 0 1 0 5 9c0 6.9 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>

                  <div>
                    <span>Delivering to</span>

                    <p>
                      {{ formatAddress(order.shippingAddress) }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="getTrackingCode(order)"
                  class="tracking-number"
                >
                  <span>Tracking ID</span>
                  <strong>
                    {{ getTrackingCode(order) }}
                  </strong>
                </div>
              </div>
            </div>
          </article>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
const { client } = useVendure()

const loading = ref(true)
const orders = ref<any[]>([])

const searchQuery = ref('')
const selectedFilter = ref('all')

const filters = [
  {
    label: 'All Orders',
    value: 'all',
  },
  {
    label: 'In Progress',
    value: 'progress',
  },
  {
    label: 'Delivered',
    value: 'delivered',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
]

const CUSTOMER_ORDERS = `
  query CustomerOrders {
    activeCustomer {
      id

      orders(
        options: {
          take: 100
          sort: {
            orderPlacedAt: DESC
          }
        }
      ) {
        totalItems

        items {
          id
          code
          state
          orderPlacedAt
          currencyCode
          totalQuantity
          totalWithTax

          shippingAddress {
            fullName
            streetLine1
            streetLine2
            city
            province
            postalCode
            country
            countryCode
            phoneNumber
          }

          lines {
            id
            quantity
            discountedLinePriceWithTax

            featuredAsset {
              id
              preview
            }

            productVariant {
              id
              name
              sku

              product {
                id
                name
                slug
              }
            }
          }

          fulfillments {
            id
            state
            method
            trackingCode
          }
        }
      }
    }
  }
`

onMounted(async () => {
  await loadOrders()
})

async function loadOrders() {
  loading.value = true

  try {
    const response =
      await client.request<any>(CUSTOMER_ORDERS)

    if (!response.activeCustomer) {
      await navigateTo('/login')
      return
    }

    orders.value =
      response.activeCustomer.orders?.items || []
  } catch (error) {
    console.error(
      'Unable to load customer orders:',
      error,
    )
  } finally {
    loading.value = false
  }
}

const filteredOrders = computed(() => {
  let result = [...orders.value]

  if (selectedFilter.value !== 'all') {
    result = result.filter((order) => {
      const status = getOrderCategory(order)

      return status === selectedFilter.value
    })
  }

  const query =
    searchQuery.value.toLowerCase().trim()

  if (query) {
    result = result.filter((order) => {
      const productNames = order.lines
        ?.map((line: any) =>
          line.productVariant?.name || ''
        )
        .join(' ')
        .toLowerCase()

      return (
        order.code
          ?.toLowerCase()
          .includes(query) ||
        productNames?.includes(query)
      )
    })
  }

  return result
})

function getOrderCategory(order: any) {
  const state =
    String(order.state || '').toLowerCase()

  const fulfillmentStates =
    order.fulfillments?.map((fulfillment: any) =>
      String(fulfillment.state || '').toLowerCase()
    ) || []

  if (
    state.includes('cancel') ||
    fulfillmentStates.some(
      (state: string) =>
        state.includes('cancel')
    )
  ) {
    return 'cancelled'
  }

  if (
    fulfillmentStates.length &&
    fulfillmentStates.every(
      (state: string) =>
        state.includes('delivered')
    )
  ) {
    return 'delivered'
  }

  return 'progress'
}

function getStatusLabel(order: any) {
  const category = getOrderCategory(order)

  if (category === 'cancelled') {
    return 'Cancelled'
  }

  if (category === 'delivered') {
    return 'Delivered'
  }

  const fulfillment =
    order.fulfillments?.[0]

  if (
    fulfillment?.state
      ?.toLowerCase()
      .includes('shipped')
  ) {
    return 'Shipped'
  }

  if (
    order.state
      ?.toLowerCase()
      .includes('payment')
  ) {
    return 'Order Confirmed'
  }

  return 'Processing'
}

function getStatusHeading(order: any) {
  const status = getStatusLabel(order)

  switch (status) {
    case 'Delivered':
      return 'Your order has been delivered'

    case 'Shipped':
      return 'Your order is on the way'

    case 'Cancelled':
      return 'This order was cancelled'

    case 'Order Confirmed':
      return 'Your order has been confirmed'

    default:
      return 'We are preparing your order'
  }
}

function getStatusDescription(order: any) {
  const status = getStatusLabel(order)

  switch (status) {
    case 'Delivered':
      return 'We hope you and your companion love your purchase.'

    case 'Shipped':
      return 'Your package has left our facility and is heading your way.'

    case 'Cancelled':
      return 'No further action is required for this order.'

    case 'Order Confirmed':
      return 'Payment received. We will notify you when your order ships.'

    default:
      return 'Your items are being prepared for dispatch.'
  }
}

function getStatusClass(order: any) {
  const category = getOrderCategory(order)

  if (category === 'delivered') {
    return 'status-delivered'
  }

  if (category === 'cancelled') {
    return 'status-cancelled'
  }

  return 'status-progress'
}

function canTrack(order: any) {
  if (
    getOrderCategory(order) === 'cancelled'
  ) {
    return false
  }

  return Boolean(
    order.fulfillments?.length
  )
}

function getTrackingCode(order: any) {
  return (
    order.fulfillments?.find(
      (fulfillment: any) =>
        fulfillment.trackingCode
    )?.trackingCode || ''
  )
}

function getProductLink(line: any) {
  const slug =
    line.productVariant?.product?.slug

  return slug
    ? `/products/${slug}`
    : '/shop'
}

function formatMoney(
  value: number,
  currency = 'INR',
) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format((value || 0) / 100)
}

function formatDate(date: string | null) {
  if (!date) {
    return '—'
  }

  return new Intl.DateTimeFormat(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(new Date(date))
}

function formatAddress(address: any) {
  if (!address) {
    return 'Address unavailable'
  }

  return [
    address.streetLine1,
    address.city,
    address.province,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(', ')
}

function clearFilters() {
  searchQuery.value = ''
  selectedFilter.value = 'all'
}
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  padding: 64px 0 90px;
  background: #f8f6fb;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
}

.orders-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

/* Heading */

.orders-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0 0 9px;
  color: #8465c8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.orders-heading h1 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 400;
  line-height: 1.1;
}

.heading-copy {
  margin: 12px 0 0;
  color: #6b6b7c;
  font-size: 15px;
  line-height: 1.6;
}

.back-button {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 1px solid #d9d9e2;
  border-radius: 7px;
  background: #ffffff;
  color: #44476f;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.back-button:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

/* States */

.state-card,
.empty-orders {
  padding: 42px 30px;
  border: 1px solid #eeeaf5;
  border-radius: 16px;
  background: #ffffff;
  box-shadow:
    0 12px 32px rgba(68, 71, 111, 0.06);
  text-align: center;
}

.state-card {
  color: #6b6b7c;
}

.empty-orders-icon {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  border-radius: 16px;
  background: #f2eef9;
  color: #8465c8;
}

.empty-orders-icon svg {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-orders h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.empty-orders p {
  max-width: 460px;
  margin: 10px auto 22px;
  color: #737383;
  font-size: 14px;
  line-height: 1.6;
}

/* Controls */

.order-controls {
  margin-bottom: 24px;
  padding: 22px;
  border: 1px solid #eeeaf5;
  border-radius: 16px;
  background: #ffffff;
  box-shadow:
    0 12px 32px rgba(68, 71, 111, 0.06);
}

.search-wrapper {
  position: relative;
}

.search-wrapper svg {
  position: absolute;
  top: 50%;
  left: 15px;
  width: 19px;
  height: 19px;
  transform: translateY(-50%);
  fill: none;
  stroke: #8b8b99;
  stroke-width: 2;
  stroke-linecap: round;
}

.search-wrapper input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 16px 0 45px;
  border: 1px solid #d9d9e2;
  border-radius: 8px;
  outline: none;
  background: #ffffff;
  color: #1a1a2e;
  font: inherit;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-wrapper input:focus {
  border-color: #8465c8;
  box-shadow:
    0 0 0 3px rgba(132, 101, 200, 0.12);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 16px;
}

.filter-button {
  height: 38px;
  padding: 0 16px;
  border: 1px solid #ddd8e8;
  border-radius: 999px;
  background: #ffffff;
  color: #676779;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.filter-button:hover {
  border-color: #bfb3dc;
  background: #f9f7fc;
}

.filter-button.active {
  border-color: #44476f;
  background: #44476f;
  color: #ffffff;
}

/* Orders */

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.order-card {
  overflow: hidden;
  border: 1px solid #e6e1ed;
  border-radius: 16px;
  background: #ffffff;
  box-shadow:
    0 12px 32px rgba(68, 71, 111, 0.06);
}

.order-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 17px 22px;
  border-bottom: 1px solid #e9e5ef;
  background: #f8f6fb;
}

.order-meta-group {
  display: flex;
  gap: 32px;
}

.order-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-meta span,
.order-number span,
.tracking-number span {
  color: #8b8997;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
}

.order-meta strong {
  color: #44476f;
  font-size: 12px;
  font-weight: 700;
}

.order-number {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.order-number a {
  color: #8465c8;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.order-number a:hover {
  text-decoration: underline;
}

/* Body */

.order-card-body {
  padding: 26px;
}

.order-status-row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 26px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}

.status-progress {
  background: #f0ecfa;
  color: #7154ad;
}

.status-delivered {
  background: #ebf7ef;
  color: #397b50;
}

.status-cancelled {
  background: #fff0f0;
  color: #b54848;
}

.order-status-row h2 {
  margin: 10px 0 5px;
  color: #30324f;
  font-size: 19px;
  font-weight: 750;
}

.order-status-row p {
  margin: 0;
  color: #797987;
  font-size: 13px;
  line-height: 1.55;
}

.order-main-actions {
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 0 0 155px;
}

.primary-button,
.secondary-button,
.small-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 7px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.primary-button {
  border: 1px solid #44476f;
  background: #44476f;
  color: #ffffff;
}

.primary-button:hover {
  background: #383b61;
}

.secondary-button {
  border: 1px solid #d9d9e2;
  background: #ffffff;
  color: #44476f;
}

.secondary-button:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

.track-button {
  gap: 7px;
}

.track-button svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Products */

.order-products {
  border-top: 1px solid #ece8f1;
}

.order-product {
  display: grid;
  grid-template-columns:
    105px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid #ece8f1;
}

.product-image {
  width: 105px;
  height: 105px;
  overflow: hidden;
  border: 1px solid #eeeaf5;
  border-radius: 12px;
  background: #faf9fc;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #a195ba;
}

.image-placeholder svg {
  width: 34px;
  height: 34px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.product-name {
  color: #44476f;
  font-size: 14px;
  font-weight: 750;
  line-height: 1.4;
  text-decoration: none;
}

.product-name:hover {
  color: #8465c8;
}

.product-sku,
.product-quantity {
  margin: 6px 0 0;
  color: #858593;
  font-size: 11px;
}

.product-price {
  display: block;
  margin-top: 9px;
  color: #30324f;
  font-size: 14px;
}

.small-action-button {
  min-height: 38px;
  border: 1px solid #d7d2e1;
  background: #ffffff;
  color: #44476f;
}

.small-action-button:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

/* Footer */

.order-footer {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-top: 20px;
}

.shipping-info {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 620px;
}

.shipping-info svg {
  flex: 0 0 auto;
  width: 19px;
  height: 19px;
  margin-top: 2px;
  fill: none;
  stroke: #8465c8;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.shipping-info span {
  color: #8b8997;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.shipping-info p {
  margin: 4px 0 0;
  color: #626273;
  font-size: 12px;
  line-height: 1.5;
}

.tracking-number {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.tracking-number strong {
  color: #44476f;
  font-size: 12px;
}

/* Responsive */

@media (max-width: 820px) {
  .orders-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .order-card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .order-number {
    align-items: flex-start;
  }

  .order-status-row {
    flex-direction: column;
  }

  .order-main-actions {
    width: 100%;
    flex: none;
    flex-direction: row;
  }

  .order-main-actions a {
    flex: 1;
  }

  .order-product {
    grid-template-columns:
      90px minmax(0, 1fr);
  }

  .product-image {
    width: 90px;
    height: 90px;
  }

  .product-actions {
    grid-column: 2;
  }

  .order-footer {
    flex-direction: column;
  }

  .tracking-number {
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .orders-page {
    padding: 38px 0 60px;
  }

  .orders-container {
    width: min(
      100% - 1.25rem,
      1120px
    );
  }

  .orders-heading {
    margin-bottom: 24px;
  }

  .orders-heading h1 {
    font-size: 36px;
  }

  .order-controls {
    padding: 16px;
  }

  .filter-row {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 3px;
  }

  .filter-button {
    flex: 0 0 auto;
  }

  .order-card-header {
    padding: 16px;
  }

  .order-meta-group {
    width: 100%;
    display: grid;
    grid-template-columns:
      repeat(2, 1fr);
    gap: 16px;
  }

  .ship-to-meta {
    grid-column: 1 / -1;
  }

  .order-card-body {
    padding: 18px 16px;
  }

  .order-main-actions {
    flex-direction: column;
  }

  .order-product {
    grid-template-columns:
      76px minmax(0, 1fr);
    gap: 14px;
  }

  .product-image {
    width: 76px;
    height: 76px;
  }

  .product-actions {
    grid-column: 1 / -1;
  }

  .small-action-button {
    width: 100%;
  }
}
</style>