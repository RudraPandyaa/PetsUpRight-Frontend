<template>
  <main class="checkout-page">
    <section class="checkout-container checkout-content">
      <div v-if="cart.length === 0" class="empty-checkout">
        <h2>Your cart is empty</h2>
        <p>Add something special for your companion before checking out.</p>
        <NuxtLink to="/shop" class="primary-button">Continue shopping</NuxtLink>
      </div>

      <form v-else class="checkout-form" @submit.prevent="submitOrder">

  <!-- ONE BOX FOR BOTH CONTACT + DELIVERY -->
  <div class="form-section">

    <!-- Contact Details -->
    <div class="section-heading">
      <div>
        <h2>Contact details</h2>
        <p>Where should we send your order updates?</p>
      </div>
    </div>

    <div class="field-grid">
      <label>
        Full name
        <input
          v-model="form.name"
          type="text"
          placeholder="Your name"
          required
        />
      </label>

      <label>
        Email address
        <input
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </label>

      <label>
        Phone number
        <input
          v-model="form.phone"
          type="tel"
          placeholder="+91 98765 43210"
          required
        />
      </label>
    </div>

    <!-- Delivery Address -->
    <div class="section-heading delivery-heading">
      <div>
        <h2>Delivery address</h2>
        <p>Tell us where your pet's essentials should go.</p>
      </div>
    </div>

    <div class="field-grid">
      <label class="wide-field">
        Address
        <input
          v-model="form.address"
          type="text"
          placeholder="House number and street"
          required
        />
      </label>

      <label>
        City
        <input
          v-model="form.city"
          type="text"
          placeholder="City"
          required
        />
      </label>

      <label>
        Postal code
        <input
          v-model="form.postalCode"
          type="text"
          placeholder="Postal code"
          required
        />
      </label>
    </div>

  </div>

  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>

  <button type="submit" class="primary-button submit-button">
    Continue to payment
    <span aria-hidden="true">&#8594;</span>
  </button>

</form>

      <aside v-if="cart.length > 0" class="order-summary">
        <div class="summary-header">
          <p class="eyebrow">YOUR ORDER</p>
          <span>{{ cartCount }} items</span>
        </div>

        <div class="order-lines">
          <div v-for="item in cart" :key="item.id" class="order-line">
            <img :src="item.image" :alt="item.name" />
            <div class="line-info">
              <strong>{{ item.name }}</strong>
              <span>Qty {{ item.quantity }}</span>
            </div>
            <b>₹{{ Math.round(item.price * item.quantity).toLocaleString('en-IN') }}</b>
          </div>
        </div>

        <div class="summary-total">
          <span>Total</span>
          <strong>₹{{ Math.round(cartTotal).toLocaleString('en-IN') }}</strong>
        </div>
        <p class="tax-note">Inclusive of all taxes</p>
      </aside>
    </section>
  </main>
</template>

<script setup lang="ts">
const { cartLines, cartCount, cartTotal, getActiveOrder } = useCart()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
})
const errorMessage = ref('')

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

onMounted(() => {
  getActiveOrder()
})

function submitOrder() {
  errorMessage.value = 'Payment setup is required before an order can be placed.'
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #fff;
  color: #1a1a2e;
}

.checkout-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 0.8rem;
  color: #8465c8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

h2 {
  font-family: 'Paytone One', sans-serif;
  font-weight: 400;
  color: #44476f;
}

.checkout-content {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  gap: 3rem;
  padding: 4rem 0 6rem;
  align-items: start;
}

.checkout-form {
  display: grid;
  gap: 1.5rem;
}

.form-section,
.order-summary {
  padding: 1.75rem;
  border: 1px solid #e8e3f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(68, 71, 111, 0.05);
}

.section-heading {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}

.section-heading > span {
  color: #c3b5df;
  font-weight: 700;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
}

.section-heading p {
  margin: 0.35rem 0 0;
  color: #6b7280;
  font-size: 0.85rem;
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field-grid label {
  display: grid;
  gap: 0.45rem;
  color: #44476f;
  font-size: 0.85rem;
  font-weight: 600;
}

.wide-field {
  grid-column: 1 / -1;
}

input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd9e8;
  border-radius: 8px;
  padding: 0.85rem 1rem;
  outline: none;
  color: #1a1a2e;
  font: inherit;
  font-size: 0.9rem;
}

input:focus {
  border-color: #8465c8;
  box-shadow: 0 0 0 3px rgba(195, 181, 223, 0.35);
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: fit-content;
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1.4rem;
  background: #1a1a2e;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.primary-button:hover {
  background: #44476f;
}

.submit-button {
  margin-top: 0.5rem;
}

.order-summary {
  position: sticky;
  top: 1.5rem;
}

.summary-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.summary-header .eyebrow {
  margin: 0;
}

.summary-header > span {
  color: #6b7280;
  font-size: 0.85rem;
}

.order-lines {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
}

.order-line {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 0.75rem;
  align-items: center;
}

.order-line img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  background: #f8f6fb;
}

.line-info strong,
.line-info span {
  display: block;
}

.line-info strong {
  color: #44476f;
  font-size: 0.85rem;
}

.line-info span,
.order-line b,
.tax-note {
  color: #6b7280;
  font-size: 0.78rem;
}

.order-line b {
  color: #1a1a2e;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #eeeaf5;
  color: #44476f;
}

.summary-total strong {
  font-size: 1.2rem;
}

.tax-note {
  margin: 0.4rem 0 0;
  text-align: right;
}

.empty-checkout {
  grid-column: 1 / -1;
  padding: 4rem 1rem;
  text-align: center;
}

.empty-checkout h2 {
  margin-bottom: 0.5rem;
}

.empty-checkout p {
  margin: 0 0 1.5rem;
  color: #6b7280;
}

.error-message {
  padding: 0.85rem 1rem;
  border-radius: 8px;
  background: #fff4f2;
  color: #b42318;
  font-size: 0.85rem;
}

@media (max-width: 800px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 3rem 0 4rem;
  }

  .order-summary {
    position: static;
    grid-row: 1;
  }
}

@media (max-width: 520px) {
  .field-grid {
    grid-template-columns: 1fr;
  }

  .wide-field {
    grid-column: auto;
  }
}
</style>
