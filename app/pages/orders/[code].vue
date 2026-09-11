<template>
  <main class="order-page">
    <div class="order-container">
      <div class="order-heading">
        <div>
          <h1>Order Details</h1>

          <p class="heading-copy">
            View your order information, payment and delivery details.
          </p>
        </div>

        <NuxtLink to="/orders" class="back-button">
          ← Back to Orders
        </NuxtLink>
      </div>
      <div v-if="loading" class="state-card">
        Loading order details...
      </div>

      <div v-else-if="errorMessage" class="state-card error-state">
        <div class="state-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <h2>Order not found</h2>
        <p>{{ errorMessage }}</p>
        <NuxtLink to="/orders" class="primary-button state-button">
          View My Orders
        </NuxtLink>
      </div>

      <template v-else-if="order">
        <!-- <header class="order-heading">
          <div>
            <p class="eyebrow">MY ACCOUNT / ORDERS</p>
            <h1>Order Details</h1>
            <p class="heading-copy">
              Order <strong>#{{ order.code }}</strong>
              <template v-if="order.orderPlacedAt">
                · Placed on {{ formatDate(order.orderPlacedAt) }}
              </template>
</p>
</div>

<span class="status-badge" :class="statusClass(order.state)">
  {{ statusLabel(order.state) }}
</span>
</header> -->

        <div class="order-layout">
          <div class="order-main-column">
            <section class="order-card">
              <div class="section-heading items-heading">
                <div>
                  <h2>Items in your order</h2>
                  <p>
                    {{ order.totalQuantity }}
                    {{ order.totalQuantity === 1 ? 'item' : 'items' }} in this order.
                  </p>
                </div>
              </div>

              <div class="order-items">
                <article v-for="line in order.lines" :key="line.id" class="order-item">
                  <NuxtLink v-if="line.productVariant?.product?.slug"
                    :to="`/product/${line.productVariant.product.slug}`" class="product-image-wrap">
                    <img v-if="line.featuredAsset?.preview" :src="line.featuredAsset.preview"
                      :alt="line.productVariant?.name || 'Order item'" class="product-image" />
                    <div v-else class="product-image-placeholder">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                      </svg>
                    </div>
                  </NuxtLink>

                  <div v-else class="product-image-wrap">
                    <img v-if="line.featuredAsset?.preview" :src="line.featuredAsset.preview"
                      :alt="line.productVariant?.name || 'Order item'" class="product-image" />
                    <div v-else class="product-image-placeholder">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                      </svg>
                    </div>
                  </div>

                  <div class="product-copy">
                    <NuxtLink v-if="line.productVariant?.product?.slug"
                      :to="`/product/${line.productVariant.product.slug}`" class="product-name">
                      {{ line.productVariant?.name || 'Product' }}
                    </NuxtLink>
                    <h3 v-else class="product-name static-name">
                      {{ line.productVariant?.name || 'Product' }}
                    </h3>

                    <p v-if="line.productVariant?.sku" class="product-sku">
                      SKU: {{ line.productVariant.sku }}
                    </p>

                    <div class="product-meta">
                      <span>Qty: {{ line.quantity }}</span>
                      <span>Price: {{ formatMoney(line.unitPriceWithTax) }}</span>
                    </div>
                  </div>

                  <div class="product-right-section">
                    <strong class="line-total">
                      {{ formatMoney(line.linePriceWithTax) }}
                    </strong>

                    <div v-if="canReturnOrReplace" class="product-actions">
                      <button type="button" class="return-button" @click="handleReturn(line)">
                        Return
                      </button>

                      <button type="button" class="replace-button" @click="handleReplace(line)">
                        Replace
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section class="order-card information-card">
              <div class="section-heading">
                <h2>Delivery Information</h2>
                <p>Shipping and billing information used for this order.</p>
              </div>

              <div class="information-grid">
                <div class="info-block">
                  <div class="info-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21s7-5.1 7-12A7 7 0 1 0 5 9c0 6.9 7 12 7 12Z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <h3>Shipping Address</h3>
                    <template v-if="order.shippingAddress">
                      <strong>{{ order.shippingAddress.fullName }}</strong>
                      <p v-if="order.shippingAddress.company">{{ order.shippingAddress.company }}</p>
                      <p>{{ order.shippingAddress.streetLine1 }}</p>
                      <p v-if="order.shippingAddress.streetLine2">{{ order.shippingAddress.streetLine2 }}</p>
                      <p>
                        {{ joinAddressParts(order.shippingAddress.city, order.shippingAddress.province) }}
                      </p>
                      <p>{{ joinAddressParts(order.shippingAddress.postalCode, order.shippingAddress.country) }}</p>
                      <p v-if="order.shippingAddress.phoneNumber" class="info-phone">
                        {{ order.shippingAddress.phoneNumber }}
                      </p>
                    </template>
                    <p v-else>No shipping address available.</p>
                  </div>
                </div>

                <div class="info-block">
                  <div class="info-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M7 15h3" />
                    </svg>
                  </div>
                  <div>
                    <h3>Billing Address</h3>
                    <template v-if="defaultBillingAddress">
                      <strong>
                        {{ defaultBillingAddress.fullName }}
                      </strong>

                      <p v-if="defaultBillingAddress.company">
                        {{ defaultBillingAddress.company }}
                      </p>

                      <p>
                        {{ defaultBillingAddress.streetLine1 }}
                      </p>

                      <p v-if="defaultBillingAddress.streetLine2">
                        {{ defaultBillingAddress.streetLine2 }}
                      </p>

                      <p>
                        {{
                          joinAddressParts(
                            defaultBillingAddress.city,
                            defaultBillingAddress.province
                          )
                        }}
                      </p>

                      <p>
                        {{
                          joinAddressParts(
                            defaultBillingAddress.postalCode,
                            defaultBillingAddress.country?.name
                          )
                        }}
                      </p>

                      <p v-if="defaultBillingAddress.phoneNumber" class="info-phone">
                        {{ defaultBillingAddress.phoneNumber }}
                      </p>
                    </template>

                    <p v-else>
                      No default billing address available.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside class="order-side-column">
            <section class="order-card summary-card">
              <div class="section-heading">
                <h2>Order Summary</h2>
              </div>

              <div class="summary-rows">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <strong>{{ formatMoney(order.subTotalWithTax) }}</strong>
                </div>

                <div v-if="gstTotal > 0" class="summary-row tax-row">
                  <span>Included GST (18%)</span>
                  <strong>{{ formatMoney(gstTotal) }}</strong>
                </div>

                <div class="summary-row">
                  <span>Shipping</span>
                  <strong>
                    {{ order.shippingWithTax > 0 ? formatMoney(order.shippingWithTax) : 'Free' }}
                  </strong>
                </div>

                <div v-if="discountTotal > 0" class="summary-row discount-row">
                  <span>Discount</span>
                  <strong>-{{ formatMoney(discountTotal) }}</strong>
                </div>

                <div v-if="order.couponCodes?.length" class="coupon-list">
                  <span v-for="coupon in order.couponCodes" :key="coupon" class="coupon-badge">
                    {{ coupon }}
                  </span>
                </div>
              </div>

              <div class="summary-total">
                <span>Total</span>
                <strong>{{ formatMoney(order.totalWithTax) }}</strong>
              </div>
            </section>

            <section class="order-card compact-card">
              <div class="compact-heading">
                <div class="compact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <div>
                  <h3>Payment</h3>
                  <p v-if="primaryPayment">
                    {{ paymentMethodLabel(primaryPayment.method) }}
                  </p>
                  <p v-else>No payment information</p>
                </div>
              </div>

              <div v-if="primaryPayment" class="compact-details">
                <div>
                  <span>Status</span>
                  <strong>{{ statusLabel(primaryPayment.state) }}</strong>
                </div>
                <div v-if="primaryPayment.transactionId">
                  <span>Transaction ID</span>
                  <strong class="transaction-id">{{ primaryPayment.transactionId }}</strong>
                </div>
              </div>
            </section>

            <!-- <section class="order-card compact-card">
              <div class="compact-heading">
                <div class="compact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 17h4V5H2v12h3" />
                    <path d="M14 9h4l4 4v4h-3" />
                    <circle cx="7.5" cy="17.5" r="2.5" />
                    <circle cx="16.5" cy="17.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3>Shipping Method</h3>
                  <p>{{ shippingMethodName }}</p>
                </div>
              </div>

              <div v-if="primaryFulfillment" class="compact-details">
                <div>
                  <span>Fulfillment</span>
                  <strong>{{ statusLabel(primaryFulfillment.state) }}</strong>
                </div>
                <div v-if="primaryFulfillment.trackingCode">
                  <span>Tracking ID</span>
                  <strong class="transaction-id">{{ primaryFulfillment.trackingCode }}</strong>
                </div>
              </div>
            </section> -->

            <NuxtLink :to="`/track-order?code=${encodeURIComponent(order.code)}`" class="primary-track-action">
              Track Order Status
            </NuxtLink>

            <NuxtLink to="/shop" class="secondary-action">
              Continue Shopping
            </NuxtLink>
          </aside>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { client } = useVendure()

const loading = ref(true)
const order = ref<any | null>(null)
const defaultBillingAddress = ref<any | null>(null)
const errorMessage = ref('')

const ORDER_BY_CODE = `
  query OrderByCode($code: String!) {
    orderByCode(code: $code) {
      id
      code
      state
      active
      orderPlacedAt
      totalQuantity
      subTotalWithTax
      shippingWithTax
      totalWithTax
      currencyCode

      taxSummary {
  description
  taxRate
  taxTotal
}

      couponCodes
      discounts {
        adjustmentSource
        type
        description
        amount
      }
      lines {
        id
        quantity
        unitPriceWithTax
        linePriceWithTax
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
      shippingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
      }
      billingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
      }
      shippingLines {
        id
        priceWithTax
        shippingMethod {
          id
          code
          name
          description
        }
      }
      payments {
        id
        method
        amount
        state
        transactionId
      }
      fulfillments {
        id
        state
        method
        trackingCode
      }
    }
  }
`

const CUSTOMER_ADDRESSES = `
  query ActiveCustomerAddresses {
    activeCustomer {
      id
      addresses {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
          code
          name
        }
        phoneNumber
        defaultBillingAddress
        defaultShippingAddress
      }
    }
  }
`

const primaryPayment = computed(() => order.value?.payments?.[0] || null)
const canReturnOrReplace = computed(() => {
  return normalizeState(order.value?.state) === 'delivered'
})


const discountTotal = computed(() => {
  const discounts = order.value?.discounts || []
  return discounts.reduce((total: number, discount: any) => {
    const amount = Number(discount?.amount || 0)
    return total + Math.abs(amount)
  }, 0)
})

const gstTotal = computed(() => {
  const taxes = order.value?.taxSummary || []

  const gstTaxes = taxes.filter(
    (tax: any) =>
      !String(tax.description || '')
        .toLowerCase()
        .includes('shipping')
  )

  return gstTaxes.reduce(
    (total: number, tax: any) =>
      total + Number(tax.taxTotal || 0),
    0
  )
})


watch(
  () => route.params.code,
  () => loadOrder(),
  { immediate: true },
)

async function loadOrder() {
  const code = String(route.params.code || '').trim()

  if (!code) {
    errorMessage.value = 'The order code is missing.'
    loading.value = false
    return
  }

  loading.value = true
  errorMessage.value = ''
  order.value = null

  try {
    const response = await client.request<any>(ORDER_BY_CODE, { code })

    const fetchedOrder = response.orderByCode

    if (!fetchedOrder) {
      errorMessage.value =
        'We could not find this order or you no longer have access to it.'
      return
    }

    if (!fetchedOrder.orderPlacedAt) {
      errorMessage.value =
        'This order has not been placed yet.'
      return
    }

    order.value = fetchedOrder
    await loadDefaultBillingAddress()
  } catch (error: any) {
    console.error('Unable to load order:', error)
    errorMessage.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Unable to load this order right now.'
  } finally {
    loading.value = false
  }
}

async function loadDefaultBillingAddress() {
  try {
    const response =
      await client.request<any>(
        CUSTOMER_ADDRESSES
      )

    const addresses =
      response.activeCustomer?.addresses || []

    defaultBillingAddress.value =
      addresses.find(
        (address: any) =>
          address.defaultBillingAddress
      ) || null
  } catch (error) {
    console.error(
      'Unable to load billing address:',
      error
    )

    defaultBillingAddress.value = null
  }
}

function formatMoney(value: number | null | undefined) {
  const amount = Number(value || 0) / 100
  const currency = order.value?.currencyCode || 'INR'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function normalizeState(value: string | null | undefined) {
  return String(value || '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
}

function statusLabel(value: string | null | undefined) {
  if (!value) return 'Pending'

  const labels: Record<string, string> = {
    AddingItems: 'Processing',
    ArrangingPayment: 'Awaiting Payment',
    PaymentAuthorized: 'Payment Authorized',
    PaymentSettled: 'Confirmed',
    PartiallyShipped: 'Partially Shipped',
    Shipped: 'Shipped',
    PartiallyDelivered: 'Partially Delivered',
    Delivered: 'Delivered',
    Cancelled: 'Cancelled',
    Created: 'Created',
    Authorized: 'Authorized',
    Settled: 'Paid',
    Declined: 'Declined',
    Error: 'Failed',
    Pending: 'Pending',
  }

  if (labels[value]) return labels[value]

  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}


function statusClass(value: string | null | undefined) {
  const state = normalizeState(value)

  if (state.includes('cancel') || state.includes('declined') || state.includes('error')) {
    return 'status-danger'
  }

  if (state.includes('deliver') || state.includes('settled') || state.includes('fulfilled')) {
    return 'status-success'
  }

  if (state.includes('ship')) {
    return 'status-info'
  }

  return 'status-pending'
}

function joinAddressParts(...parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(', ')
}

function paymentMethodLabel(method: string) {
  if (!method) return 'Payment method unavailable'

  return method
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function handleReturn(line: any) {
  console.log('Return product:', line)

  navigateTo({
    path: '/returns/new',
    query: {
      order: order.value?.code,
      line: line.id,
      type: 'return',
    },
  })
}

function handleReplace(line: any) {
  console.log('Replace product:', line)

  navigateTo({
    path: '/returns/new',
    query: {
      order: order.value?.code,
      line: line.id,
      type: 'replace',
    },
  })
}
</script>

<style scoped>
.order-page {
  min-height: 100vh;
  padding: 64px 0 90px;
  background: #f8f6fb;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
}

.order-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
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

.order-heading {
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

.order-heading h1 {
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

.heading-copy strong {
  color: #44476f;
}

.status-badge {
  flex: 0 0 auto;
  padding: 8px 13px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.status-success {
  background: #e9f6ef;
  color: #34785a;
}

.status-info {
  background: #edf2fb;
  color: #4c6592;
}

.status-pending {
  background: #f4effc;
  color: #7459ac;
}

.status-danger {
  background: #fff0f0;
  color: #b54848;
}

.order-card,
.state-card {
  margin-bottom: 24px;
  padding: 30px;
  border: 1px solid #eeeaf5;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(68, 71, 111, 0.06);
}

.state-card {
  color: #6b6b7c;
  text-align: center;
}

.error-state {
  padding: 54px 24px;
}

.state-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: #f2eef9;
  color: #8465c8;
}

.state-icon svg {
  width: 26px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}

.error-state h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.error-state p {
  margin: 8px auto 20px;
  max-width: 460px;
  color: #838392;
  font-size: 13px;
  line-height: 1.55;
}

.state-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.section-heading {
  margin-bottom: 24px;
}

.section-heading h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.section-heading p {
  margin: 7px 0 0;
  color: #737383;
  font-size: 13px;
  line-height: 1.5;
}















.order-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(300px, 0.75fr);
  gap: 24px;
  align-items: start;
}

.order-main-column,
.order-side-column {
  min-width: 0;
}

.order-items {
  display: flex;
  flex-direction: column;
}

.order-item {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 18px 0;
  border-top: 1px solid #efecf4;
}

.order-item:first-child {
  padding-top: 0;
  border-top: 0;
}

.order-item:last-child {
  padding-bottom: 0;
}

.product-image-wrap {
  display: block;
  width: 92px;
  height: 92px;
  overflow: hidden;
  border: 1px solid #eeeaf5;
  border-radius: 12px;
  background: #f8f6fb;
  text-decoration: none;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image-placeholder {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: #9b8fb9;
}

.product-image-placeholder svg {
  width: 28px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.product-copy {
  min-width: 0;
}

.product-name {
  display: block;
  margin: 0;
  color: #30324f;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
}

.product-name:hover:not(.static-name) {
  color: #8465c8;
}

.static-name {
  font-family: inherit;
}

.product-sku {
  margin: 5px 0 0;
  color: #9896a3;
  font-size: 11px;
}

.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  margin-top: 12px;
  color: #737383;
  font-size: 12px;
}

.line-total {
  color: #44476f;
  font-size: 14px;
  white-space: nowrap;
}
.product-right-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.return-button,
.replace-button {
  min-height: 32px;
  padding: 0 13px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.return-button {
  border: 1px solid #44476f;
  background: #ffffff;
  color: #44476f;
}

.return-button:hover {
  background: #f4f3f9;
}

.replace-button {
  border: 1px solid #44476f;
  background: #44476f;
  color: #ffffff;
}

.replace-button:hover {
  background: #36395e;
}

.information-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.info-block {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-height: 190px;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #e2ddea;
  border-radius: 12px;
  background: #fbfafe;
}

.info-icon,
.compact-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #f2eef9;
  color: #8465c8;
}

.info-icon svg,
.compact-icon svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.info-block h3,
.compact-heading h3 {
  margin: 0 0 9px;
  color: #44476f;
  font-size: 14px;
}

.info-block strong {
  display: block;
  margin-bottom: 6px;
  color: #30324f;
  font-size: 13px;
}

.info-block p {
  margin: 3px 0;
  color: #737383;
  font-size: 12px;
  line-height: 1.5;
}

.info-phone {
  margin-top: 10px !important;
  color: #44476f !important;
  font-weight: 600;
}

.summary-card {
  position: sticky;
  top: 24px;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #6b6b7c;
  font-size: 13px;
}

.summary-row strong {
  color: #44476f;
  font-size: 13px;
}

.discount-row strong {
  color: #34785a;
}

.coupon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.coupon-badge {
  padding: 5px 8px;
  border-radius: 999px;
  background: #eee9f8;
  color: #6e56a5;
  font-size: 10px;
  font-weight: 700;
}

.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e6e1ec;
  color: #44476f;
  font-size: 15px;
  font-weight: 700;
}

.summary-total strong {
  font-family: 'Paytone One', sans-serif;
  font-size: 21px;
  font-weight: 400;
}

.compact-card {
  padding: 22px;
}

.compact-heading {
  display: flex;
  align-items: center;
  gap: 13px;
}

.compact-heading h3 {
  margin-bottom: 3px;
}

.compact-heading p {
  margin: 0;
  color: #838392;
  font-size: 11px;
  line-height: 1.45;
}

.compact-details {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 17px;
  padding-top: 15px;
  border-top: 1px solid #efecf4;
}

.compact-details>div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.compact-details span {
  color: #9292a0;
  font-size: 10px;
}

.compact-details strong {
  max-width: 62%;
  color: #555568;
  font-size: 11px;
  text-align: right;
  overflow-wrap: anywhere;
}

.transaction-id {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.primary-button,
.primary-track-action,
.secondary-action {
  min-height: 44px;
  box-sizing: border-box;
  border-radius: 7px;
  padding: 0 18px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.primary-button {
  border: 1px solid #44476f;
  background: #44476f;
  color: #ffffff;
}

.primary-button:hover {
  background: #383b61;
}

.primary-track-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid #44476f;
  background: #44476f;
  color: #ffffff;
  text-decoration: none;
}

.primary-track-action:hover {
  background: #383b61;
}

.secondary-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #d9d9e2;
  background: #ffffff;
  color: #44476f;
  text-decoration: none;
}

.secondary-action:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

.primary-button:active,
.primary-track-action:active,
.secondary-action:active {
  transform: translateY(1px);
}

@media (max-width: 920px) {
  .order-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }

  .order-side-column {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .order-side-column .summary-card,
  .order-side-column .secondary-action {
    grid-column: 1 / -1;
  }

  .order-side-column .order-card {
    margin-bottom: 0;
  }
}

@media (max-width: 760px) {
  .order-page {
    padding: 36px 0 60px;
  }

  .order-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .order-card {
    padding: 22px 18px;
  }


  .order-item {
    grid-template-columns: 74px minmax(0, 1fr);
    gap: 14px;
  }

  .product-image-wrap {
    width: 74px;
    height: 74px;
  }

  .line-total {
    grid-column: 2;
    justify-self: start;
  }

  .information-grid,
  .order-side-column {
    grid-template-columns: 1fr;
  }

  .order-side-column .summary-card,
  .order-side-column .secondary-action {
    grid-column: auto;
  }

  .order-side-column .order-card {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .order-container {
    width: min(100% - 1.25rem, 1120px);
  }

  .order-heading h1 {
    font-size: 36px;
  }

  .order-item {
    align-items: flex-start;
  }

  .product-meta {
    flex-direction: column;
    gap: 4px;
  }

  .info-block {
    flex-direction: column;
  }
}

</style>
