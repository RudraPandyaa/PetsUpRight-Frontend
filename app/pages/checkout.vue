<template>
  <main class="checkout-page">

    <div v-if="!isCartLoaded" class="empty-checkout">
      <p>Loading your cart...</p>
    </div>

    <div v-else-if="cart.length === 0" class="empty-checkout">
      <h2>Your cart is empty</h2>

      <p>
        Add something special for your companion before checking out.
      </p>

      <NuxtLink to="/shop" class="primary-button">
        Continue shopping
      </NuxtLink>
    </div>

    <div v-else class="checkout-layout">

      <!-- =========================================
           LEFT SIDE
      ========================================== -->
      <section class="checkout-left">

        <div class="checkout-left-inner">

          <!-- TOP -->
          <div class="checkout-topbar">
            <NuxtLink to="/" class="back-link">
              ← Back to home
            </NuxtLink>
          </div>

          <form class="checkout-form" @submit.prevent="submitOrder">

            <!-- CONTACT -->
            <section class="checkout-section">

              <div class="section-title-row">
                <h2>Contact Information</h2>

                <NuxtLink v-if="!isLoggedIn" to="/login" class="login-link">
                  Sign in
                </NuxtLink>

                <NuxtLink v-else to="/profile" class="login-link">
                  My account
                </NuxtLink>
              </div>

              <div class="single-field">
                <input v-model="form.email" type="email" placeholder="Email address" required />
              </div>

            </section>


            <!-- DELIVERY -->
            <section class="checkout-section">

              <h2>Shipping Address</h2>

              <div class="field-grid">

                <label>
                  <span>Full name</span>

                  <input v-model="form.name" type="text" placeholder="Full name" required />
                </label>

                <label>
                  <span>Phone number</span>

                  <input v-model="form.phone" type="tel" placeholder="+91 98765 43210" required />
                </label>

                <label class="wide-field">
                  <span>Address</span>

                  <input v-model="form.address" type="text" placeholder="House number and street" required />
                </label>

                <label>
                  <span>City</span>

                  <input v-model="form.city" type="text" placeholder="City" required />
                </label>

                <label>
                  <span>State</span>

                  <input v-model="form.province" type="text" placeholder="State" required />
                </label>

                <label>
                  <span>Postal code</span>

                  <input v-model="form.postalCode" type="text" placeholder="Postal code" required />
                </label>

              </div>

            </section>


            <!-- SHIPPING METHOD -->
            <!-- <section class="checkout-section">

              <h2>Shipping Method</h2>

              <div class="shipping-placeholder">
                Enter your shipping address to view available
                shipping methods.
              </div>

            </section> -->


            <!-- PAYMENT -->
            <section class="checkout-section">
              <h2>Payment Method</h2>

              <p class="section-description">
                All transactions are secure and encrypted.
              </p>

              <div class="payment-options">

                <label class="payment-option" :class="{ active: selectedPaymentMode === 'upi' }">
                  <input v-model="selectedPaymentMode" type="radio" value="upi" />

                  <div class="payment-option-content">
                    <strong>UPI</strong>
                    <span>
                      Google Pay, PhonePe, Paytm and other UPI apps
                    </span>
                  </div>
                </label>

                <label class="payment-option" :class="{ active: selectedPaymentMode === 'card' }">
                  <input v-model="selectedPaymentMode" type="radio" value="card" />

                  <div class="payment-option-content">
                    <strong>Credit / Debit Card</strong>
                    <span>
                      Visa, Mastercard, RuPay and supported cards
                    </span>
                  </div>
                </label>

                <label class="payment-option" :class="{ active: selectedPaymentMode === 'netbanking' }">
                  <input v-model="selectedPaymentMode" type="radio" value="netbanking" />

                  <div class="payment-option-content">
                    <strong>Net Banking</strong>
                    <span>
                      Pay securely through your bank
                    </span>
                  </div>
                </label>

                <label class="payment-option" :class="{ active: selectedPaymentMode === 'wallet' }">
                  <input v-model="selectedPaymentMode" type="radio" value="wallet" />

                  <div class="payment-option-content">
                    <strong>Wallets</strong>
                    <span>
                      Pay using supported digital wallets
                    </span>
                  </div>
                </label>

              </div>
            </section>


            <!-- ERROR -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>


            <!-- PAY BUTTON -->
            <button type="submit" class="pay-button" :disabled="isProcessingPayment">
              {{
                isProcessingPayment
                  ? 'Preparing payment...'
                  : 'Continue to payment'
              }}
            </button>

          </form>

        </div>

      </section>


      <!-- =========================================
           RIGHT SIDE
      ========================================== -->
      <aside class="checkout-right">

        <div class="order-summary">

          <!-- PRODUCTS -->
          <div class="order-lines">

            <div v-for="item in cart" :key="item.id" class="order-line">

              <div class="product-image-wrapper">

                <img :src="item.image" :alt="item.name" />

                <span class="quantity-badge">
                  {{ item.quantity }}
                </span>

              </div>

              <div class="line-info">

                <strong>
                  {{ item.name }}
                </strong>

                <span>
                  Qty {{ item.quantity }}
                </span>

              </div>

              <b class="line-price">
                ₹{{
                  Math.round(
                    item.price * item.quantity
                  ).toLocaleString('en-IN')
                }}
              </b>

            </div>

          </div>


          <!-- PRICE BREAKDOWN -->
          <div class="price-breakdown">

            <div class="price-row">
              <span>Subtotal </span>

              <strong>
                ₹{{
                  (
                    Number(activeOrder?.subTotal ?? 0) / 100
                  ).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </strong>
            </div>

            <div v-for="tax in (activeOrder?.taxSummary || []).filter(
              (tax: any) =>
                !tax.description?.toLowerCase().includes('shipping')
            )" :key="`${tax.description}-${tax.taxRate}`" class="price-row">
              <span>
                Includes GST ({{ tax.taxRate }}%)
              </span>

              <strong>
                ₹{{
                  (
                    Number(tax.taxTotal ?? 0) / 100
                  ).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })
                }}
              </strong>
            </div>
            <div v-for="discount in activeOrder?.discounts || []" :key="discount.adjustmentSource"
              class="price-row discount-row">
              <span>
                {{ discount.description || 'Discount' }}
              </span>

              <strong>
                -₹{{
                  Math.round(
                    Math.abs(
                      Number(discount.amountWithTax ?? 0) / 100
                    )
                  ).toLocaleString('en-IN')
                }}
              </strong>
            </div>

            <div class="price-row">
              <span>Shipping</span>

              <strong v-if="
                Number(activeOrder?.shippingWithTax ?? 0) > 0
              ">
                ₹{{
                  (
                    Number(
                      activeOrder?.shippingWithTax ?? 0
                    ) / 100
                  ).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </strong>

              <strong v-else class="shipping-free">
                FREE
              </strong>
            </div>

          </div>


          <!-- TOTAL -->
          <div class="summary-total">

            <span>Total</span>

            <div class="total-price">

              <small>INR</small>

              <strong>
                ₹{{
                  Math.round(cartTotal)
                    .toLocaleString('en-IN')
                }}
              </strong>

            </div>

          </div>


          <!-- COUPON -->
          <div class="coupon-section">

            <div v-if="!activeOrder?.couponCodes?.length" class="coupon-row">
              <input v-model="couponCode" type="text" placeholder="Discount code" :disabled="isApplyingCoupon"
                @keyup.enter="handleApplyCoupon" />

              <button type="button" :disabled="isApplyingCoupon" @click="handleApplyCoupon">
                {{ isApplyingCoupon ? 'Applying...' : 'Apply' }}
              </button>
            </div>

            <div v-else class="applied-coupons">
              <div v-for="code in activeOrder.couponCodes" :key="code" class="applied-coupon">
                <div>
                  <strong>{{ code }}</strong>
                  <span>Coupon applied</span>
                </div>

                <button type="button" :disabled="isApplyingCoupon" @click="handleRemoveCoupon(code)">
                  Remove
                </button>
              </div>
            </div>

            <p v-if="couponMessage" class="coupon-success">
              {{ couponMessage }}
            </p>

            <p v-if="couponError" class="coupon-error">
              {{ couponError }}
            </p>

          </div>

        </div>

      </aside>

    </div>

    <div v-if="showOrderConfirmation" class="confirmation-overlay">
      <div class="confirmation-modal">

        <div class="confirmation-icon">
          ✓
        </div>

        <h2>Order Confirmed!</h2>

        <p>
          Thank you for your order.
        </p>

        <div class="order-code">
          Order #{{ confirmedOrderCode }}
        </div>

        <p class="confirmation-message">
          Your payment was successful and your order
          has been placed.
        </p>

        <button type="button" class="confirmation-button" @click="closeOrderConfirmation">
          Continue Shopping
        </button>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CREATE_RAZORPAY_ORDER } from '../../graphql/mutations/razorpay'
const {
  activeOrder,
  cartLines,
  cartCount,
  cartTotal,
  getActiveOrder,
  refreshCart,
  applyCoupon,
  removeCoupon,
} = useCart()
const { client } = useVendure()

const showOrderConfirmation = ref(false)
const confirmedOrderCode = ref('')

const SET_CUSTOMER_FOR_ORDER = `
  mutation SetCustomerForOrder(
    $input: CreateCustomerInput!
  ) {
    setCustomerForOrder(input: $input) {
      __typename

      ... on Order {
        id
        code
        state
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const SET_ORDER_SHIPPING_ADDRESS = `
  mutation SetOrderShippingAddress(
    $input: CreateAddressInput!
  ) {
    setOrderShippingAddress(input: $input) {
      __typename

      ... on Order {
        id
        code
        state
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const ELIGIBLE_SHIPPING_METHODS = `
  query EligibleShippingMethods {
    eligibleShippingMethods {
      id
      code
      name
      description
      price
      priceWithTax
    }
  }
`

const SET_ORDER_SHIPPING_METHOD = `
  mutation SetOrderShippingMethod(
    $shippingMethodId: [ID!]!
  ) {
    setOrderShippingMethod(
      shippingMethodId: $shippingMethodId
    ) {
      __typename

      ... on Order {
        id
        code
        state
        shippingWithTax
        totalWithTax
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const TRANSITION_ORDER_TO_STATE = `
  mutation TransitionOrderToState(
    $state: String!
  ) {
    transitionOrderToState(state: $state) {
      __typename

      ... on Order {
        id
        code
        state
      }

      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
        fromState
        toState
      }
    }
  }
`

const ADD_PAYMENT_TO_ORDER = `
  mutation AddPaymentToOrder(
    $input: PaymentInput!
  ) {
    addPaymentToOrder(input: $input) {
      __typename

      ... on Order {
        id
        code
        state
        active
        totalWithTax
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const ACTIVE_CUSTOMER_CHECKOUT = `
  query ActiveCustomerCheckout {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber

      addresses {
        id
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress

        country {
          id
          code
          name
        }
      }
    }
  }
`

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: 'IN',
})
const errorMessage = ref('')
const isProcessingPayment = ref(false)
const isCartLoaded = ref(false)
const selectedPaymentMode = ref('upi')
const couponCode = ref('')
const couponMessage = ref('')
const couponError = ref('')
const isApplyingCoupon = ref(false)

const cart = computed(() => cartLines.value.map((line: any) => {
  const quantity = Number(line.quantity ?? 1)
  const lineTotal = Number(line.linePriceWithTax ?? 0) / 100

  return {
    id: line.id,
    name: line.productVariant?.product?.name || line.productVariant?.name || 'Product',
    image: line.productVariant?.product?.featuredAsset?.preview || '/images/shop/Rectangle-5.png',
    price: lineTotal / quantity,
    quantity,
  }
}))

async function handleApplyCoupon() {
  couponMessage.value = ''
  couponError.value = ''

  const code = couponCode.value.trim()

  if (!code) {
    couponError.value = 'Please enter a coupon code.'
    return
  }

  try {
    isApplyingCoupon.value = true

    await applyCoupon(code)

    await syncShippingMethod()

    couponMessage.value =
      'Coupon applied successfully.'
  } catch (error: any) {
    couponError.value =
      error?.message || 'Unable to apply coupon.'
  } finally {
    isApplyingCoupon.value = false
  }
}

async function handleRemoveCoupon(code: string) {
  couponMessage.value = ''
  couponError.value = ''

  try {
    isApplyingCoupon.value = true

    await removeCoupon(code)
    await syncShippingMethod()

    couponCode.value = ''
    couponMessage.value = 'Coupon removed successfully.'
  } catch (error: any) {
    couponError.value =
      error?.message || 'Unable to remove coupon.'
  } finally {
    isApplyingCoupon.value = false
  }
}

async function loadCustomerDetails() {
  try {
    const response = await client.request<{
      activeCustomer: any | null
    }>(ACTIVE_CUSTOMER_CHECKOUT)

    const customer = response.activeCustomer

    if (!customer) {
      return
    }

    form.email = customer.emailAddress || ''

    form.name = [
      customer.firstName,
      customer.lastName,
    ]
      .filter(Boolean)
      .join(' ')

    form.phone = customer.phoneNumber || ''

    const addresses = customer.addresses || []

    const shippingAddress =
      addresses.find(
        (address: any) =>
          address.defaultShippingAddress
      ) || addresses[0]

    if (!shippingAddress) {
      return
    }

    form.name =
      shippingAddress.fullName ||
      form.name

    form.phone =
      shippingAddress.phoneNumber ||
      form.phone

    form.address = [
      shippingAddress.streetLine1,
      shippingAddress.streetLine2,
    ]
      .filter(Boolean)
      .join(', ')

    form.city =
      shippingAddress.city || ''

    form.postalCode =
      shippingAddress.postalCode || ''

    form.province =
      shippingAddress.province || ''
    form.countryCode =
      shippingAddress.country?.code || 'IN'


  } catch (error) {
    console.error(
      'Unable to load customer checkout details:',
      error
    )
  }
}

function ensureOrderResult(
  result: any,
  fallbackMessage: string,
) {
  if (!result) {
    throw new Error(fallbackMessage)
  }

  if (result.__typename !== 'Order') {
    throw new Error(
      result.message ||
      result.transitionError ||
      fallbackMessage
    )
  }

  return result
}

async function prepareVendureOrder() {
  if (!isLoggedIn.value) {
    const customerResult: any =
      await client.request(
        SET_CUSTOMER_FOR_ORDER,
        {
          input: {
            firstName:
              form.name.trim().split(' ')[0] ||
              form.name.trim(),

            lastName:
              form.name
                .trim()
                .split(' ')
                .slice(1)
                .join(' '),

            emailAddress: form.email,
          },
        }
      )

    ensureOrderResult(
      customerResult.setCustomerForOrder,
      'Unable to set customer.'
    )
  }

  const addressResult: any =
    await client.request(
      SET_ORDER_SHIPPING_ADDRESS,
      {
        input: {
          fullName: form.name,
          streetLine1: form.address,
          city: form.city,
          province:
            form.province || undefined,
          postalCode: form.postalCode,
          countryCode: form.countryCode,
          phoneNumber: form.phone,
        },
      }
    )

  ensureOrderResult(
    addressResult.setOrderShippingAddress,
    'Unable to set shipping address.'
  )

  const shippingResponse: any =
    await client.request(
      ELIGIBLE_SHIPPING_METHODS
    )

  const shippingMethods =
    shippingResponse.eligibleShippingMethods || []

  if (!shippingMethods.length) {
    throw new Error(
      'No shipping method is available for this address.'
    )
  }

  const shippingMethod =
    shippingMethods.find(
      (method: any) =>
        method.code === 'free-delivery'
    ) ||
    shippingMethods.find(
      (method: any) =>
        method.code === 'standard-delivery'
    ) ||
    shippingMethods[0]

  const shippingResult: any =
    await client.request(
      SET_ORDER_SHIPPING_METHOD,
      {
        shippingMethodId: [
          shippingMethod.id,
        ],
      }
    )

  ensureOrderResult(
    shippingResult.setOrderShippingMethod,
    'Unable to set shipping method.'
  )

  const transitionResult: any =
    await client.request(
      TRANSITION_ORDER_TO_STATE,
      {
        state: 'ArrangingPayment',
      }
    )

  return ensureOrderResult(
    transitionResult.transitionOrderToState,
    'Unable to prepare order for payment.'
  )
}

async function syncShippingMethod() {
  const isAddressComplete =
    form.address &&
    form.city &&
    form.postalCode &&
    form.countryCode;

  const addressInput = isAddressComplete
    ? {
        fullName: form.name,
        streetLine1: form.address,
        city: form.city,
        province: form.province || undefined,
        postalCode: form.postalCode,
        countryCode: form.countryCode,
        phoneNumber: form.phone,
      }
    : {
        fullName: 'Guest',
        streetLine1: 'Dummy Address',
        city: 'Dummy City',
        postalCode: '000000',
        countryCode: 'IN',
        phoneNumber: '0000000000',
      };

  const addressResult: any =
    await client.request(
      SET_ORDER_SHIPPING_ADDRESS,
      {
        input: addressInput,
      }
    )

  ensureOrderResult(
    addressResult.setOrderShippingAddress,
    'Unable to set shipping address.'
  )

  const shippingResponse: any =
    await client.request(
      ELIGIBLE_SHIPPING_METHODS
    )

  const shippingMethods =
    shippingResponse.eligibleShippingMethods || []

  if (!shippingMethods.length) {
    return
  }

  const shippingMethod =
    shippingMethods.find(
      (method: any) =>
        method.code === 'free-delivery'
    ) ||
    shippingMethods.find(
      (method: any) =>
        method.code === 'standard-delivery'
    ) ||
    shippingMethods[0]

  const shippingResult: any =
    await client.request(
      SET_ORDER_SHIPPING_METHOD,
      {
        shippingMethodId: [
          shippingMethod.id,
        ],
      }
    )

  ensureOrderResult(
    shippingResult.setOrderShippingMethod,
    'Unable to set shipping method.'
  )

  await refreshCart()
}

const {
  isLoggedIn,
  loadCurrentCustomer,
} = useAuth()

onMounted(async () => {
  try {
    await Promise.all([
      getActiveOrder(),
      loadCurrentCustomer(),
    ])

    await loadCustomerDetails()
    await syncShippingMethod()
  } catch (error) {
    console.error(
      'Unable to initialize checkout:',
      error
    )
  } finally {
    isCartLoaded.value = true
  }
})

async function submitOrder() {
  errorMessage.value = ''
  isProcessingPayment.value = true

  try {
    const razorpayLoaded = await loadRazorpayScript()

    if (!razorpayLoaded) {
      throw new Error('Unable to load Razorpay Checkout.')
    }

    await prepareVendureOrder()

    const response = await client.request<{
      createRazorpayOrder: {
        id: string
        amount: number
        currency: string
        receipt: string
        status: string
      }
    }>(CREATE_RAZORPAY_ORDER)

    const razorpayOrder = response.createRazorpayOrder
    const config = useRuntimeConfig()

    if (!config.public.razorpayKeyId) {
      throw new Error('Razorpay Key ID is missing.')
    }
    const paymentSequence = [
      selectedPaymentMode.value,
      ...['upi', 'card', 'netbanking', 'wallet'].filter(
        method => method !== selectedPaymentMode.value
      ),
    ]

    const options = {
      key: config.public.razorpayKeyId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'PetsUpRight',
      description: 'Order Payment',
      order_id: razorpayOrder.id,

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      config: {
        display: {
          sequence: paymentSequence,
          preferences: {
            show_default_blocks: true,
          },
        },
      },

      handler: async (
        paymentResponse: any
      ) => {
        try {
          isProcessingPayment.value = true

          const paymentResult: any =
            await client.request(
              ADD_PAYMENT_TO_ORDER,
              {
                input: {
                  method: 'razorpay',

                  metadata: {
                    razorpay_order_id:
                      paymentResponse
                        .razorpay_order_id,

                    razorpay_payment_id:
                      paymentResponse
                        .razorpay_payment_id,

                    razorpay_signature:
                      paymentResponse
                        .razorpay_signature,
                  },
                },
              }
            )

          const order =
            ensureOrderResult(
              paymentResult.addPaymentToOrder,
              'Unable to complete payment.'
            )

          confirmedOrderCode.value = order.code

          await refreshCart()

          showOrderConfirmation.value = true
        } catch (error: any) {
          console.error(
            'Unable to finalize Vendure order:',
            error
          )

          errorMessage.value =
            error?.response?.errors?.[0]
              ?.message ||
            error?.message ||
            'Payment succeeded, but order finalization failed.'
        } finally {
          isProcessingPayment.value = false
        }
      },

      modal: {
        ondismiss: () => {
          isProcessingPayment.value = false

          console.log(
            'Razorpay checkout closed'
          )
        },
      },
    }

    const razorpay = new (window as any).Razorpay(options)

    razorpay.open()
  } catch (error: any) {
    console.error(
      'Unable to start Razorpay payment:',
      error
    )

    errorMessage.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Unable to start payment.'

    isProcessingPayment.value = false
  }
}

async function closeOrderConfirmation() {
  showOrderConfirmation.value = false

  await navigateTo('/')
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'

    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.body.appendChild(script)
  })
}
</script>

<style scoped>
/* =========================================
   PAGE
========================================= */

.checkout-page {
  min-height: 100vh;
  background: #ffffff;
  color: #1a1a2e;
}


/* =========================================
   MAIN TWO COLUMN LAYOUT
========================================= */

.checkout-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) minmax(380px, 42%);
}


/* =========================================
   LEFT SIDE
========================================= */

.checkout-left {
  min-width: 0;
  background: #ffffff;
}

.checkout-left-inner {
  width: min(650px, calc(100% - 48px));
  margin-left: auto;
  padding:
    36px 55px 70px 24px;
}


.coupon-section {
  padding-top: 4px;
}

.applied-coupons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.applied-coupon {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 12px;

  border: 1px solid #e4e4e4;
  border-radius: 6px;
}

.applied-coupon>div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.applied-coupon span {
  font-size: 12px;
  color: #777;
}

.applied-coupon button {
  border: none;
  background: transparent;
  color: #44476f;
  font-weight: 600;
  cursor: pointer;
}

.coupon-success {
  margin: 8px 0 0;
  font-size: 12px;
  color: #2f855a;
}

.coupon-error {
  margin: 8px 0 0;
  font-size: 12px;
  color: #c53030;
}

.discount-row strong {
  color: #2f855a;
}

/* =========================================
   TOP BAR
========================================= */

.checkout-topbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
}


.back-link:hover,
.login-link:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
  color: #44476f;
}

.back-link:focus-visible,
.login-link:focus-visible {
  outline: 2px solid #44476f;
  outline-offset: 2px;
}


/* =========================================
   FORM
========================================= */

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.checkout-section {
  width: 100%;
}

.checkout-section h2 {
  margin: 0 0 14px;

  font-family:
    Arial,
    sans-serif;

  font-size: 17px;
  font-weight: 650;
  color: #1a1a2e;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.section-title-row h2 {
  margin-bottom: 14px;
}

.back-link,
.login-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  margin-bottom: 20px;
  border: 1px solid #d9d9e2;
  border-radius: 7px;
  background: #ffffff;
  color: #44476f;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.section-description {
  margin:
    -8px 0 12px;

  color: #737373;
  font-size: 12px;
}


/* =========================================
   INPUTS
========================================= */

.single-field {
  width: 100%;
}

.field-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 10px;
}

.field-grid label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-grid label span {
  color: #555;
  font-size: 12px;
}

.wide-field {
  grid-column: 1 / -1;
}

input {
  width: 100%;
  height: 48px;

  box-sizing: border-box;

  border:
    1px solid #d9d9d9;

  border-radius: 6px;

  padding:
    0 14px;

  background: #ffffff;

  color: #1a1a2e;

  font: inherit;
  font-size: 14px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input::placeholder {
  color: #8c8c8c;
}

input:focus {
  border-color: #8465c8;

  box-shadow:
    0 0 0 2px rgba(132, 101, 200, 0.12);
}


/* =========================================
   SHIPPING
========================================= */

.shipping-placeholder {
  padding: 18px;

  border-radius: 6px;

  background: #f5f5f5;

  color: #737373;

  font-size: 13px;
}


/* =========================================
   PAYMENT
========================================= */

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-method-option {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px;

  border: 1px solid #d9d9d9;
  border-radius: 7px;

  cursor: pointer;
}

.payment-method-option:has(input:checked) {
  border-color: #44476f;
  background: #f5f2fb;
}

.payment-method-option input {
  width: 16px;
  height: 16px;
}

.payment-method-option strong {
  display: block;
  color: #1a1a2e;
  font-size: 14px;
}

.payment-method-option p {
  margin: 3px 0 0;
  color: #737373;
  font-size: 12px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  padding: 15px 16px;

  border: 1px solid #d9d9d9;
  border-radius: 7px;

  background: #ffffff;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.payment-option.active {
  border-color: #44476f;
  background: #f5f2fb;
}

.payment-option input {
  width: 16px;
  height: 16px;
  margin-top: 3px;

  accent-color: #44476f;

  cursor: pointer;
}

.payment-option-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.payment-option-content strong {
  font-size: 14px;
  color: #1a1a2e;
}

.payment-option-content span {
  font-size: 12px;
  line-height: 1.4;
  color: #737373;
}

/* =========================================
   ERROR
========================================= */

.error-message {
  padding:
    12px 14px;

  border-radius: 6px;

  background: #fff4f2;

  color: #b42318;

  font-size: 13px;
}


/* =========================================
   PAY BUTTON
========================================= */

.pay-button {
  width: 100%;
  height: 52px;

  border: none;
  border-radius: 6px;

  background: #1a1a2e;

  color: #ffffff;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.pay-button:hover {
  background: #44476f;
}

.pay-button:active {
  transform: scale(0.99);
}


/* =========================================
   RIGHT SIDE
========================================= */

.checkout-right {
  position: relative;

  min-width: 0;

  border-left:
    1px solid #e5e5e5;

  background: #f7f7f7;
}

.order-summary {
  position: sticky;
  top: 0;

  width: min(520px, calc(100% - 48px));

  padding:
    45px 24px;

  box-sizing: border-box;
}


/* =========================================
   PRODUCTS
========================================= */

.order-lines {
  display: flex;
  flex-direction: column;
  gap: 18px;

  padding-bottom: 24px;

  border-bottom:
    1px solid #dedede;
}

.order-line {
  display: grid;

  grid-template-columns:
    64px minmax(0, 1fr) auto;

  align-items: center;

  gap: 14px;
}

.product-image-wrapper {
  position: relative;

  width: 64px;
  height: 64px;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;

  border:
    1px solid #dedede;

  border-radius: 8px;

  object-fit: cover;

  background: #ffffff;
}

.quantity-badge {
  position: absolute;

  top: -8px;
  right: -8px;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 20px;
  height: 20px;

  padding: 0 5px;

  border-radius: 999px;

  background: #737373;

  color: #ffffff;

  font-size: 11px;
  font-weight: 600;
}

.line-info {
  min-width: 0;
}

.line-info strong {
  display: block;

  overflow: hidden;

  color: #333333;

  font-size: 13px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-info span {
  display: block;

  margin-top: 4px;

  color: #737373;

  font-size: 11px;
}

.line-price {
  color: #333333;

  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;
}


/* =========================================
   PRICE BREAKDOWN
========================================= */

.price-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding:
    22px 0;

  border-bottom:
    1px solid #dedede;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  color: #555555;

  font-size: 13px;
}

.price-row strong {
  color: #333333;
}

.shipping-text {
  color: #737373;
  font-size: 11px;
}


/* =========================================
   TOTAL
========================================= */

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding:
    22px 0;
}

.summary-total>span {
  color: #333333;

  font-size: 16px;
  font-weight: 600;
}

.total-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.total-price small {
  color: #737373;
  font-size: 11px;
}

.total-price strong {
  color: #1a1a2e;

  font-size: 24px;
  font-weight: 700;
}

/* =========================================
   CONFIRMATION MODAL
========================================= */
.confirmation-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.45);
}

.confirmation-modal {
  width: min(430px, 100%);
  padding: 38px 30px;

  text-align: center;

  background: #ffffff;
  border-radius: 18px;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.18);
}

.confirmation-icon {
  width: 64px;
  height: 64px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #44476f;
  color: #ffffff;

  font-size: 32px;
  font-weight: 700;
}

.confirmation-modal h2 {
  margin: 0 0 10px;

  font-size: 26px;
  color: #1a1a2e;
}

.confirmation-modal p {
  margin: 0;

  color: #6b7280;
  font-size: 14px;
}

.order-code {
  margin: 18px 0;
  padding: 12px 16px;

  background: #f8f6fb;
  border-radius: 8px;

  color: #44476f;
  font-weight: 700;
}

.confirmation-message {
  margin-bottom: 24px !important;
}

.confirmation-button {
  width: 100%;
  height: 48px;

  border: 0;
  border-radius: 8px;

  background: #44476f;
  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
}

/* =========================================
   COUPON
========================================= */

.coupon-row {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr) auto;

  gap: 10px;

  padding-top: 4px;
}

.coupon-row button {
  min-width: 80px;

  border: none;
  border-radius: 6px;

  padding:
    0 18px;

  background: #8c8c8c;

  color: #ffffff;

  font-weight: 600;

  cursor: pointer;
}

.coupon-row button:hover {
  background: #737373;
}


/* =========================================
   EMPTY CART
========================================= */

.empty-checkout {
  display: flex;
  min-height: 100vh;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 30px;

  text-align: center;
}

.empty-checkout h2 {
  margin-bottom: 8px;

  color: #44476f;
}

.empty-checkout p {
  margin:
    0 0 22px;

  color: #737373;
}

.primary-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding:
    13px 22px;

  border-radius: 6px;

  background: #1a1a2e;

  color: #ffffff;

  text-decoration: none;
}


/* =========================================
   TABLET / MOBILE
========================================= */

@media (max-width: 900px) {

  .checkout-layout {
    display: flex;
    flex-direction: column;
  }

  .checkout-right {
    order: -1;

    border-left: none;

    border-bottom:
      1px solid #e5e5e5;
  }

  .order-summary {
    position: static;

    width: min(650px,
        calc(100% - 40px));

    margin: 0 auto;

    padding:
      30px 0;
  }

  .checkout-left-inner {
    width: min(650px,
        calc(100% - 40px));

    margin: 0 auto;

    padding:
      30px 0 60px;
  }

}


@media (max-width: 560px) {

  .field-grid {
    grid-template-columns: 1fr;
  }

  .wide-field {
    grid-column: auto;
  }

  .checkout-left-inner,
  .order-summary {
    width:
      calc(100% - 28px);
  }

  .checkout-topbar {
    margin-bottom: 24px;
  }

  .order-line {
    grid-template-columns:
      54px minmax(0, 1fr) auto;

    gap: 10px;
  }

  .product-image-wrapper {
    width: 54px;
    height: 54px;
  }

}
</style>
