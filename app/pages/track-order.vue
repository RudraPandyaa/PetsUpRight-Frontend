<template>
  <main class="tracking-page">
    <div class="tracking-container">
      <NuxtLink to="/profile" class="return-profile-button">
        Return to Profile
      </NuxtLink>

      <header class="page-heading">
        <h1>Track Your Order</h1>
        <p>
          Enter your order number to see the latest status of your package.
        </p>
      </header>

      <section class="track-search-card">
        <form class="track-form" @submit.prevent="trackOrder">
          <label for="order-code">Order number</label>

          <div class="track-input-row">
            <div class="input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 8 12 3 3 8l9 5 9-5Z" />
                <path d="m3 8 9 5 9-5" />
                <path d="M3 8v8l9 5 9-5V8" />
              </svg>

              <input id="order-code" v-model.trim="orderCode" type="text" autocomplete="off"
                placeholder="Enter order number" />
            </div>

            <button type="submit" class="track-button" :disabled="loading || !orderCode">
              {{ loading ? 'Tracking...' : 'Track Order' }}
            </button>
          </div>

          <p class="form-hint">
            You can find your order number in your order confirmation or My Orders.
          </p>
        </form>
      </section>

      <div v-if="errorMessage" class="state-card error-state">
        <div class="state-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <h2>We couldn’t find that order</h2>
        <p>{{ errorMessage }}</p>
      </div>

      <template v-if="order">
        <section class="order-status-card">
          <div class="status-card-heading">
            <div>
              <div class="order-meta-row">
                <span>ORDER #{{ order.code }}</span>
                <span v-if="order.orderPlacedAt">•</span>
                <span v-if="order.orderPlacedAt">
                  {{ formatDate(order.orderPlacedAt) }}
                </span>
              </div>

              <h2>{{ statusTitle }}</h2>
              <p>{{ statusDescription }}</p>
            </div>

            <span class="status-badge" :class="statusClass(order.state)">
              {{ statusLabel(order.state) }}
            </span>
          </div>

          <div class="status-progress">
            <div v-for="(step, index) in progressSteps" :key="step.key" class="progress-step" :class="{
              completed: index < activeStep,
              active: index === activeStep,
            }">
              <div class="step-indicator">
                <svg v-if="index < activeStep" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m5 12 4 4L19 6" />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>

              <div class="step-copy">
                <strong>{{ step.label }}</strong>
                <small>{{ step.copy }}</small>
              </div>
            </div>
          </div>
        </section>

        <div class="tracking-layout">
          <section class="tracking-card">
            <div class="section-heading">
              <div>
                <h2>Shipment Details</h2>
                <p>Latest delivery information for this order.</p>
              </div>
            </div>

            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 17h4V5H2v12h3" />
                    <path d="M14 9h4l4 4v4h-3" />
                    <circle cx="7.5" cy="17.5" r="2.5" />
                    <circle cx="16.5" cy="17.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <span>Shipping method</span>
                  <strong>{{ shippingMethodName }}</strong>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <div>
                  <span>Order placed</span>
                  <strong>
                    {{ order.orderPlacedAt ? formatDate(order.orderPlacedAt) : 'Not available' }}
                  </strong>
                </div>
              </div>

              <div class="detail-item detail-item-wide">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-5.1 7-12A7 7 0 1 0 5 9c0 6.9 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <span>Delivering to</span>
                  <strong>{{ deliveryLocation }}</strong>
                </div>
              </div>
            </div>
          </section>

          <aside class="tracking-card order-summary-card">
            <div class="section-heading">
              <h2>Order Summary</h2>
              <p>{{ order.totalQuantity }} {{ order.totalQuantity === 1 ? 'item' : 'items' }}</p>
            </div>

            <div class="mini-items">
              <article v-for="line in order.lines.slice(0, 3)" :key="line.id" class="mini-item">
                <div class="mini-image">
                  <img v-if="line.featuredAsset?.preview" :src="line.featuredAsset.preview"
                    :alt="line.productVariant?.name || 'Product'" />
                  <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  </svg>
                </div>

                <div class="mini-copy">
                  <strong>{{ line.productVariant?.name || 'Product' }}</strong>
                  <span>Qty: {{ line.quantity }}</span>
                </div>
              </article>

              <p v-if="order.lines.length > 3" class="more-items">
                +{{ order.lines.length - 3 }} more item{{ order.lines.length - 3 === 1 ? '' : 's' }}
              </p>
            </div>

            <div class="summary-total">
              <span>Total</span>
              <strong>{{ formatMoney(order.totalWithTax) }}</strong>
            </div>

            <NuxtLink :to="`/orders/${order.code}`" class="view-order-button">
              View Order Details
            </NuxtLink>
          </aside>
        </div>

        <section class="help-card">
          <div class="help-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.8 9a2.4 2.4 0 1 1 3.8 1.95c-.9.62-1.6 1.1-1.6 2.3" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <div>
            <h3>Need help with your delivery?</h3>
            <p>
              If your order status has not changed for a while, contact our support team
              with your order number.
            </p>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { client } = useVendure()

const orderCode = ref('')
const order = ref<any | null>(null)
const loading = ref(false)
const errorMessage = ref('')

const ORDER_BY_CODE = `
  query TrackOrderByCode($code: String!) {
    orderByCode(code: $code) {
      id
      code
      state
      orderPlacedAt
      totalQuantity
      totalWithTax
      currencyCode
      lines {
        id
        quantity
        featuredAsset {
          preview
        }
        productVariant {
          id
          name
        }
      }
      shippingAddress {
        city
        province
        postalCode
        country
      }
      shippingLines {
        shippingMethod {
          id
          code
          name
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
`

const progressSteps = [
  {
    key: 'placed',
    label: 'Order Placed',
    copy: 'Payment received and your order has been placed.',
  },
  {
    key: 'shipped',
    label: 'Shipped',
    copy: 'Your package is on the way.',
  },
  {
    key: 'delivered',
    label: 'Delivered',
    copy: 'Order delivered successfully.',
  },
]

const primaryFulfillment = computed(() => order.value?.fulfillments?.[0] || null)

const shippingMethodName = computed(() => {
  return (
    order.value?.shippingLines?.[0]?.shippingMethod?.name ||
    primaryFulfillment.value?.method ||
    'Standard Delivery'
  )
})

const activeStep = computed(() => {
  const orderState =
    normalizeState(order.value?.state)

  const fulfillmentState =
    normalizeState(
      primaryFulfillment.value?.state
    )

  if (
    fulfillmentState.includes('delivered') ||
    fulfillmentState.includes('completed') ||
    orderState.includes('delivered')
  ) {
    return 2
  }

  if (
    fulfillmentState.includes('shipped') ||
    fulfillmentState.includes('intransit') ||
    orderState.includes('shipped') ||
    orderState.includes('partiallyshipped')
  ) {
    return 1
  }

  return 0
})

const statusTitle = computed(() => {
  const state = normalizeState(order.value?.state)
  const fulfillmentState = normalizeState(primaryFulfillment.value?.state)

  if (state.includes('cancel')) return 'Order cancelled'
  if (fulfillmentState.includes('delivered') || state.includes('delivered')) {
    return 'Delivered successfully'
  }
  if (
    fulfillmentState.includes('shipped') ||
    fulfillmentState.includes('intransit') ||
    state.includes('shipped')
  ) {
    return 'Your order is on the way'
  }
  if (
    state.includes('paymentsettled') ||
    state.includes('fulfilled') ||
    state.includes('paymentauthorized')
  ) {
    return 'Your order has been placed'
  }

  return 'We received your order'
})

const statusDescription = computed(() => {
  const state = normalizeState(order.value?.state)
  const fulfillmentState = normalizeState(primaryFulfillment.value?.state)

  if (state.includes('cancel')) {
    return 'This order has been cancelled. Please contact support if you need assistance.'
  }

  if (fulfillmentState.includes('delivered') || state.includes('delivered')) {
    return 'Your package has reached its destination.'
  }

  if (
    fulfillmentState.includes('shipped') ||
    fulfillmentState.includes('intransit') ||
    state.includes('shipped')
  ) {
    return 'Your package has left our facility and is travelling to you.'
  }

  if (
    state.includes('paymentsettled') ||
    state.includes('fulfilled') ||
    state.includes('paymentauthorized')
  ) {
    return 'Payment received. Our team is preparing your order for dispatch.'
  }

  return 'Your order has been received. Tracking updates will appear here as it progresses.'
})

const deliveryLocation = computed(() => {
  const address = order.value?.shippingAddress
  if (!address) return 'Address unavailable'

  return [address.city, address.province, address.postalCode]
    .filter(Boolean)
    .join(', ') || address.country || 'Address unavailable'
})

watch(
  () => route.query.code,
  (value) => {
    const code = typeof value === 'string' ? value.trim() : ''

    if (!code) return

    orderCode.value = code
    loadOrder(code)
  },
  { immediate: true },
)

async function trackOrder() {
  const code = orderCode.value.trim()

  if (!code) return

  await router.replace({
    path: '/track-order',
    query: { code },
  })

  if (String(route.query.code || '') === code && !loading.value) {
    await loadOrder(code)
  }
}

async function loadOrder(code: string) {
  loading.value = true
  errorMessage.value = ''
  order.value = null

  try {
    const response = await client.request<any>(ORDER_BY_CODE, { code })

    const fetchedOrder = response.orderByCode

    if (!fetchedOrder) {
      errorMessage.value =
        'Please check the order number and make sure you are signed in with the account used for this order.'
      return
    }

    if (!fetchedOrder.orderPlacedAt) {
      errorMessage.value =
        'This order has not been placed yet.'
      return
    }

    order.value = fetchedOrder

    order.value = response.orderByCode
  } catch (error: any) {
    console.error('Unable to track order:', error)

    errorMessage.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Unable to load tracking information right now.'
  } finally {
    loading.value = false
  }
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
    PaymentAuthorized: 'Order Placed',
    PaymentSettled: 'Order Placed',
    PartiallyShipped: 'Partially Shipped',
    Shipped: 'Shipped',
    PartiallyDelivered: 'Partially Delivered',
    Delivered: 'Delivered',
    Cancelled: 'Cancelled',
  }

  if (labels[value]) return labels[value]

  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function statusClass(value: string | null | undefined) {
  const state = normalizeState(value)

  if (state.includes('cancel')) return 'status-danger'
  if (state.includes('deliver')) return 'status-success'
  if (state.includes('ship')) return 'status-info'

  return 'status-pending'
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
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
</script>

<style scoped>
.tracking-page {
  min-height: 100vh;
  padding: 64px 0 90px;
  background: #f8f6fb;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
}

.tracking-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.return-profile-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  margin-bottom: 24px;
  border: 1px solid #d9d9e2;
  border-radius: 7px;
  background: #fff;
  color: #44476f;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.return-profile-button:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

.page-heading {
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 9px;
  color: #8465c8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.page-heading h1 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 400;
  line-height: 1.1;
}

.page-heading>p:last-child {
  max-width: 620px;
  margin: 12px 0 0;
  color: #6b6b7c;
  font-size: 15px;
  line-height: 1.6;
}

.track-search-card,
.order-status-card,
.tracking-card,
.help-card,
.state-card {
  border: 1px solid #eeeaf5;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(68, 71, 111, 0.06);
}

.track-search-card {
  padding: 26px 30px;
  margin-bottom: 24px;
}

.track-form label {
  display: block;
  margin-bottom: 9px;
  color: #44476f;
  font-size: 12px;
  font-weight: 700;
}

.track-input-row {
  display: flex;
  gap: 12px;
}

.input-wrap {
  position: relative;
  flex: 1;
}

.input-wrap svg {
  position: absolute;
  top: 50%;
  left: 15px;
  width: 19px;
  transform: translateY(-50%);
  fill: none;
  stroke: #8f8d9d;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.input-wrap input {
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  padding: 0 16px 0 45px;
  border: 1px solid #ddd9e5;
  border-radius: 9px;
  outline: none;
  background: #fff;
  color: #30324f;
  font: inherit;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-wrap input:focus {
  border-color: #8465c8;
  box-shadow: 0 0 0 3px rgba(132, 101, 200, 0.1);
}

.track-button {
  min-width: 150px;
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid #44476f;
  border-radius: 8px;
  background: #44476f;
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.track-button:hover:not(:disabled) {
  background: #383b61;
}

.track-button:active:not(:disabled) {
  transform: translateY(1px);
}

.track-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.form-hint {
  margin: 9px 0 0;
  color: #9694a1;
  font-size: 11px;
}

.state-card {
  padding: 48px 24px;
  text-align: center;
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
  max-width: 520px;
  margin: 8px auto 0;
  color: #838392;
  font-size: 13px;
  line-height: 1.6;
}

.order-status-card {
  padding: 30px;
  margin-bottom: 24px;
}

.status-card-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 30px;
}

.order-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 8px;
  color: #8b8998;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.status-card-heading h2,
.section-heading h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.status-card-heading p,
.section-heading p {
  margin: 7px 0 0;
  color: #737383;
  font-size: 13px;
  line-height: 1.5;
}

.status-badge {
  flex: 0 0 auto;
  padding: 8px 13px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
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

.status-progress {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.status-progress::before {
  content: '';
  position: absolute;
  top: 18px;
  left: 9%;
  right: 9%;
  height: 2px;
  background: #ebe7f1;
}

.progress-step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-indicator {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 10px;
  border: 2px solid #e1dce9;
  border-radius: 50%;
  background: #fff;
  color: #9a98a6;
  font-size: 12px;
  font-weight: 800;
}

.progress-step.completed .step-indicator,
.progress-step.active .step-indicator {
  border-color: #8465c8;
  background: #8465c8;
  color: #fff;
}

.progress-step.completed .step-indicator svg {
  width: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.step-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-copy strong {
  color: #555568;
  font-size: 12px;
}

.progress-step.active .step-copy strong,
.progress-step.completed .step-copy strong {
  color: #44476f;
}

.step-copy small {
  color: #9896a3;
  font-size: 10px;
  line-height: 1.4;
}

.tracking-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.7fr);
  gap: 24px;
  align-items: start;
}

.tracking-card {
  padding: 30px;
}

.section-heading {
  margin-bottom: 22px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.detail-item-wide {
  grid-column: 1 / -1;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 92px;
  box-sizing: border-box;
  padding: 17px;
  border: 1px solid #e8e4ee;
  border-radius: 12px;
  background: #fbfafe;
}

.detail-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #f2eef9;
  color: #8465c8;
}

.detail-icon svg,
.help-icon svg,
.mini-image svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detail-item span {
  display: block;
  margin-bottom: 5px;
  color: #9292a0;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.detail-item strong {
  display: block;
  color: #44476f;
  font-size: 12px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.tracking-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.order-summary-card {
  position: sticky;
  top: 24px;
}

.mini-items {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.mini-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-image {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  overflow: hidden;
  border: 1px solid #eeeaf5;
  border-radius: 10px;
  background: #f8f6fb;
  color: #9b8fb9;
}

.mini-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-copy strong {
  overflow: hidden;
  color: #30324f;
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-copy span,
.more-items {
  color: #9292a0;
  font-size: 10px;
}

.more-items {
  margin: 2px 0 0;
}

.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid #e6e1ec;
  color: #44476f;
  font-size: 13px;
  font-weight: 700;
}

.summary-total strong {
  font-family: 'Paytone One', sans-serif;
  font-size: 19px;
  font-weight: 400;
}

.view-order-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: 18px;
  border: 1px solid #d9d9e2;
  border-radius: 7px;
  background: #fff;
  color: #44476f;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.view-order-button:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

.help-card {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
  padding: 21px 24px;
}

.help-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #f2eef9;
  color: #8465c8;
}

.help-card h3 {
  margin: 0 0 4px;
  color: #44476f;
  font-size: 13px;
}

.help-card p {
  margin: 0;
  color: #7c7b89;
  font-size: 11px;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .tracking-layout {
    grid-template-columns: 1fr;
  }

  .order-summary-card {
    position: static;
  }
}

@media (max-width: 720px) {
  .tracking-page {
    padding: 36px 0 60px;
  }

  .track-search-card,
  .order-status-card,
  .tracking-card {
    padding: 22px 18px;
  }

  .track-input-row,
  .status-card-heading {
    flex-direction: column;
  }

  .track-button {
    width: 100%;
  }

  .status-progress {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .status-progress::before {
    top: 18px;
    bottom: 18px;
    left: 17px;
    right: auto;
    width: 2px;
    height: auto;
  }

  .progress-step {
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 20px;
    text-align: left;
  }

  .progress-step:last-child {
    padding-bottom: 0;
  }

  .step-indicator {
    flex: 0 0 auto;
    margin-bottom: 0;
  }

  .step-copy {
    padding-top: 3px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .tracking-container {
    width: min(100% - 1.25rem, 1120px);
  }

  .page-heading h1 {
    font-size: 36px;
  }

  .help-card {
    align-items: flex-start;
  }
}
</style>
