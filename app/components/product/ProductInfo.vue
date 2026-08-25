<template>
  <div class="product-info">
    <!-- Brand -->
    <p v-if="brand" class="brand">{{ brand }}</p>

    <!-- Title -->
    <h1 class="title">{{ product.name }}</h1>

    <!-- Rating -->
    <div class="rating-row">
      <span class="stars">★★★★★</span>
      <span class="rating-count">(1,250 Reviews)</span>
    </div>

    <!-- Price -->
    <div class="price-row">
      <span class="price">{{ formatPrice(currentPrice) }}</span>
      <span v-if="mrp > currentPrice" class="mrp">{{ formatPrice(mrp) }}</span>
      <span v-if="saveAmount > 0" class="save">Save {{ formatPrice(saveAmount) }}</span>
    </div>

    <!-- Flavor (option group) -->
    <div v-if="flavorGroup" class="option-block">
      <p class="option-label">Select Flavor</p>
      <div class="option-pills">
        <button
          v-for="opt in flavorGroup.options"
          :key="opt.id"
          type="button"
          class="pill"
          :class="{ active: selectedOptions[flavorGroup.id] === opt.id }"
          @click="selectOption(flavorGroup.id, opt.id)"
        >
          {{ opt.name }}
        </button>
      </div>
    </div>

    <!-- Size (option group) -->
    <div v-if="sizeGroup" class="option-block">
      <p class="option-label">Select Size</p>
      <div class="option-pills">
        <button
          v-for="opt in sizeGroup.options"
          :key="opt.id"
          type="button"
          class="pill"
          :class="{ active: selectedOptions[sizeGroup.id] === opt.id }"
          @click="selectOption(sizeGroup.id, opt.id)"
        >
          {{ opt.name }}
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

      <button type="button" class="btn-buy" @click="emit('buy-now')">
        BUY NOW
      </button>

      <button type="button" class="btn-cart" @click="emit('add-to-cart')">
        ADD TO CART
      </button>

      <button
        type="button"
        class="btn-wish"
        :class="{ active: wishlisted }"
        @click="wishlisted = !wishlisted"
        aria-label="Wishlist"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>

    <!-- Delivery check -->
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
        <button type="button" class="pincode-btn" @click="checkPincode">
          Check ›
        </button>
      </div>
      <p class="eta">
        <span class="eta-icon">🚚</span>
        Estimated delivery: 2–4 business days
      </p>
    </div>

    <!-- Trust row -->
    <div class="trust-row">
      <div class="trust-item">
        <span class="trust-icon">📦</span>
        <span>FREE DELIVERY</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">✓</span>
        <span>100% GENUINE</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">↩</span>
        <span>EASY RETURNS</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
  variant: any
  quantity: number
}>()

const emit = defineEmits<{
  (e: 'update:variant', v: any): void
  (e: 'update:quantity', q: number): void
  (e: 'add-to-cart'): void
  (e: 'buy-now'): void
}>()

const { formatPrice } = useProducts()

const pincode = ref('')
const wishlisted = ref(false)
const selectedOptions = reactive<Record<string, string>>({})

// Brand from facet
const brand = computed(() => {
  const f = props.product?.facetValues?.find(
    (fv: any) => fv.facet?.code === 'brand' || fv.facet?.name?.toLowerCase() === 'brand'
  )
  return f?.name || ''
})

// Option groups
const flavorGroup = computed(() =>
  props.product?.optionGroups?.find(
    (g: any) =>
      g.code?.toLowerCase().includes('flavor') ||
      g.name?.toLowerCase().includes('flavor')
  )
)

const sizeGroup = computed(() =>
  props.product?.optionGroups?.find(
    (g: any) =>
      g.code?.toLowerCase().includes('size') ||
      g.name?.toLowerCase().includes('size')
  )
)

// Init selected options from current variant
watch(
  () => props.variant,
  (v) => {
    if (!v?.options) return
    v.options.forEach((opt: any) => {
      if (opt.groupId) selectedOptions[opt.groupId] = opt.id
    })
  },
  { immediate: true }
)

// Price (Vendure = paise)
const currentPrice = computed(() => props.variant?.priceWithTax ?? 0)
const mrp = computed(() => {
  // agar custom field ho to use karo; warna same
  return props.variant?.priceWithTax ?? 0
})
const saveAmount = computed(() => Math.max(0, mrp.value - currentPrice.value))

function selectOption(groupId: string, optionId: string) {
  selectedOptions[groupId] = optionId
  // matching variant dhundo
  const match = props.product?.variants?.find((v: any) =>
    v.options?.every(
      (o: any) => selectedOptions[o.groupId] === o.id
    )
  )
  if (match) emit('update:variant', match)
}

function changeQty(delta: number) {
  const next = Math.max(1, props.quantity + delta)
  emit('update:quantity', next)
}

function checkPincode() {
  console.log('Check pincode', pincode.value)
}
</script>

<style scoped>
.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
  margin: 0;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
  margin: 0;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.stars {
  color: #f5a623;
  letter-spacing: -1px;
}

.rating-count {
  color: #6b7280;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
}

.mrp {
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.save {
  font-size: 0.85rem;
  font-weight: 600;
  color: #16a34a;
}

.option-block {
  margin-top: 0.25rem;
}

.option-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
}

.option-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  font-size: 0.85rem;
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
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.qty {
  display: flex;
  align-items: center;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  width: 36px;
  height: 40px;
  border: none;
  background: #f9fafb;
  font-size: 1.1rem;
  cursor: pointer;
  color: #374151;
}

.qty-value {
  min-width: 36px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-buy {
  padding: 0.65rem 1.4rem;
  background: #44476f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.btn-buy:hover {
  background: #35375a;
}

.btn-cart {
  padding: 0.65rem 1.4rem;
  background: #fff;
  color: #44476f;
  border: 1.5px solid #44476f;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.btn-cart:hover {
  background: #f8f6fb;
}

.btn-wish {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-wish.active {
  color: #e11d48;
  border-color: #fecdd3;
}

.btn-wish.active svg {
  fill: #e11d48;
}

.delivery-box {
  background: #f8f6fb;
  border-radius: 10px;
  padding: 1rem 1.1rem;
  margin-top: 0.5rem;
}

.delivery-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.delivery-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1a1a2e;
}

.deliverable {
  font-size: 0.8rem;
  font-weight: 600;
  color: #16a34a;
}

.delivery-hint {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 0.6rem;
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
  font-size: 0.85rem;
  outline: none;
}

.pincode-input:focus {
  border-color: #c3b5df;
}

.pincode-btn {
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #44476f;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #44476f;
  cursor: pointer;
  white-space: nowrap;
}

.eta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #4b5563;
  margin: 0.65rem 0 0;
}

.trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 0.25rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #6b7280;
}

@media (max-width: 640px) {
  .title {
    font-size: 1.25rem;
  }

  .actions-row {
    gap: 0.5rem;
  }

  .btn-buy,
  .btn-cart {
    flex: 1;
    padding: 0.65rem 0.75rem;
  }
}
</style>