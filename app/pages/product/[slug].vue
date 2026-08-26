<template>
  <div class="container mx-auto px-4 pt-6 md:pt-10 pb-0">
    <div v-if="loading" class="animate-pulse grid lg:grid-cols-2 gap-10">
      <div class="aspect-square bg-gray-200 rounded-xl" />
      <div class="space-y-4">
        <div class="h-6 bg-gray-200 rounded w-1/3" />
        <div class="h-10 bg-gray-200 rounded w-3/4" />
        <div class="h-8 bg-gray-200 rounded w-1/4" />
      </div>
    </div>

    <template v-else-if="product">
      <!-- Breadcrumb -->
      <ProductBreadcrumb
        :name="product.name"
        category="Dogs"
        category-link="/shop?pet=dog"
      />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mt-4 items-stretch">
      <ProductGallery
        :images="galleryImages"
        :name="product.name"
        class="h-full"
      />

      <ProductInfo
        :product="product"
        :variant="selectedVariant"
        :quantity="quantity"
        class="h-full"
        @update:variant="selectedVariant = $event"
        @update:quantity="quantity = $event"
        @add-to-cart="onAddToCart"
        @buy-now="onBuyNow"
      />
    </div>

      <!-- Next sections baad me -->
      <!-- Description tabs -->
       <ProductTabs
        :description="product.description"
        :highlights="product.highlights"
        :ingredients="product.ingredients"
        :usage="product.usage"
        :specs="product.specs"
        :shipping="product.shipping"
      />
      <ProductFrequentlyBought @add-bundle="onAddBundle" />
      <ProductReviews />
      <ProductYouMayAlsoLike
        @add-to-cart="onAddToCart"
        @buy-now="onBuyNow"
      />
      <ProductWhyShop />
      <ProductExpertBanner @talk-expert="onTalkExpert" />
    </template>

    <div v-else class="py-20 text-center text-gray-400">
      Product not found
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
// const { getProductBySlug } = useProducts() // baad me jab real API lagaoge

const product = ref({
  id: '1',
  name: 'Premium Grain-Free Salmon & Sweet Potato Dog Food',
  slug: 'premium-grain-free-salmon',
  description:
    'Our Premium Grain-Free Salmon & Sweet Potato recipe is crafted for adult dogs of all breeds. We focus on single-source protein to minimize allergy risks while maximizing nutritional value. Every bag is packed with real salmon, nutrient-rich sweet potatoes, and essential vitamins for holistic health.',
  brand: 'BARK & FEAST',
  rating: 4.8,
  reviewCount: 1250,
  highlights: [
    'Real salmon is the #1 ingredient',
    'Grain-free for sensitive stomachs',
    'Omega fatty acids for skin and coat health',
    'No artificial preservatives or fillers',
  ],
  ingredients: `Salmon, Sweet Potato, Peas, Flaxseed, Vitamins & Minerals. Our recipe uses only the finest ingredients carefully selected for optimal nutrition. Real salmon is always the first ingredient, providing high-quality protein. Sweet potatoes offer a gentle, grain-free carbohydrate source that is easy to digest.`,

  usage: `Feed 1 cup per 10kg of body weight daily. Divide the daily amount into two meals for best results. Adjust portions based on your dog's age, activity level, and metabolism. Always provide fresh water alongside meals. Transition gradually over 7–10 days when switching from another food.`,

  specs: `Available weights: 500g, 1kg, 3kg, and 10kg bags. Suitable for adult dogs of all breeds and sizes. Completely grain-free formula. Crude Protein: min 28%. Crude Fat: min 15%. Moisture: max 10%. Made in small batches to ensure freshness and quality.`,

  shipping: `Enjoy free delivery on all orders above ₹999 across India. Standard delivery takes 2–4 business days. Easy 30-day return policy — no questions asked if your pet doesn't love it. Track your order in real time from dispatch to doorstep. Secure packaging to keep food fresh.`,
  featuredAsset: { preview: '/images/shop/Rectangle-5.png' },
  assets: [
    { preview: '/images/shop/Rectangle-5.png' },
    { preview: '/images/shop/Rectangle-5.png' },
    { preview: '/images/shop/Rectangle-5.png' },
  ],
  variants: [
    {
      id: 'v1',
      priceWithTax: 416000, // ₹4160 in paise
      options: [],
    },
  ],
  optionGroups: [],
  facetValues: [],
})

const selectedVariant = ref(product.value.variants[0])
const quantity = ref(1)
const loading = ref(false) // static → loading false

const galleryImages = computed(() => {
  if (!product.value) return ['/images/shop/Rectangle-5.png']
  const list = (product.value.assets || []).map((a: any) => a.preview)
  const featured = product.value.featuredAsset?.preview
  if (featured && !list.includes(featured)) list.unshift(featured)
  return list.length ? list : ['/images/shop/Rectangle-5.png']
})

// ❌ Abhi API mat call karo
// onMounted(async () => { ... getProductBySlug ... })

function onAddToCart() {
  console.log('ADD', selectedVariant.value?.id, quantity.value)
}

function onBuyNow() {
  console.log('BUY', selectedVariant.value?.id, quantity.value)
}
function onAddBundle() {
  console.log('Add bundle to cart')
}
function onTalkExpert() {
  console.log('Talk to expert clicked')
}
</script>