<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 group h-full',
      isList ? 'flex flex-row' : 'flex flex-col'
    ]"
  >
    <!-- Image → product page -->
    <NuxtLink
      :to="productLink"
      :class="[
        'relative bg-gray-50 overflow-hidden shrink-0 block',
        isList
          ? 'w-32 sm:w-40 md:w-48 aspect-square'
          : 'aspect-square w-full'
      ]"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      <!-- Wishlist -->
      <button
        type="button"
        @click.prevent.stop="toggleWishlist"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition"
        :aria-label="
          isWishlisted
            ? 'Remove from wishlist'
            : 'Add to wishlist'
        "
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            isWishlisted
              ? 'text-[#E85D75] fill-[#E85D75]'
              : 'text-gray-400'
          "
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </NuxtLink>

    <!-- Content -->
    <div
      :class="[
        'p-4 flex flex-col',
        isList
          ? 'flex-1 justify-center'
          : 'flex-1'
      ]"
    >
      <!-- Product Name -->
      <NuxtLink :to="productLink">
        <h3
          class="
            text-md
            font-medium
            text-[#1a1a2e]
            line-clamp-2
            hover:text-[#44476f]
            max-sm:min-h-[2.6rem]
          "
        >
          {{ product.name }}
        </h3>
      </NuxtLink>
      <!-- Rating -->
      <div class="flex items-center gap-2 mt-1">
        <!-- Stars -->
        <div class="flex items-center gap-0.5">
          <div
            v-for="star in 5"
            :key="star"
            class="relative w-4 h-4"
          >
            <!-- Empty Star -->
            <span
              class="absolute inset-0 text-gray-300 text-lg leading-4"
            >
              ★
            </span>

            <!-- Filled Star -->
            <span
              class="absolute inset-0 overflow-hidden text-yellow-400 text-lg leading-4"
              :style="{
                width: `${getStarFill(star)}%`
              }"
            >
              ★
            </span>
          </div>
        </div>

        <!-- Rating Number -->
        <span class="text-gray-500 text-base font-semibold">
          ({{ product.rating.toFixed(1) }})
        </span>
      </div>
      <!-- Price -->
      <p
        class="text-base font-semibold text-lg text-[#1a1a2e] mt-2"
      >
        ₹{{ Math.round(product.price) }}
      </p>

      <!-- Actions -->
      <div
        :class="[
          isList
            ? 'mt-3 flex flex-wrap items-center gap-2'
            : 'mt-auto pt-3 space-y-2'
        ]"
      >
        <!-- ADD TO CART -->
        <button
          v-if="cartQty === 0"
          type="button"
          :disabled="cartLoading || !product.variantId"
          @click.stop="addToCart"
          class="
            bg-[#1a1a2e]
            hover:bg-[#44476f]
            disabled:opacity-60
            disabled:cursor-not-allowed
            text-white
            text-sm
            font-medium
            py-2
            px-4
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            transition
          "
          :class="isList ? '' : 'w-full'"
        >
          {{ cartLoading ? 'Adding...' : 'Add to Cart' }}
        </button>

        <!-- QUANTITY CONTROLS -->
        <div
          v-else
          class="
            flex
            items-center
            justify-between
            border
            border-[#1a1a2e]
            rounded-lg
            overflow-hidden
          "
          :class="
            isList
              ? 'min-w-[120px]'
              : 'w-full'
          "
        >
          <!-- Minus -->
          <button
            type="button"
            :disabled="cartLoading"
            @click.stop="changeQty(-1)"
            class="
              w-10
              h-10
              flex
              items-center
              justify-center
              text-[#1a1a2e]
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
              font-medium
              text-lg
            "
            aria-label="Decrease quantity"
          >
            −
          </button>

          <!-- Quantity -->
          <span
            class="
              flex-1
              text-center
              text-sm
              font-semibold
              text-[#1a1a2e]
            "
          >
            {{ cartQty }}
          </span>

          <!-- Plus -->
          <button
            type="button"
            :disabled="cartLoading"
            @click.stop="changeQty(1)"
            class="
              w-10
              h-10
              flex
              items-center
              justify-center
              text-[#1a1a2e]
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
              font-medium
              text-lg
            "
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <!-- OR -->
        <template v-if="!isList">
          <div
            class="text-center text-xs text-gray-400 font-medium"
          >
            OR
          </div>
        </template>

        <!-- BUY NOW -->
        <button
          type="button"
          @click.stop="onBuyNow"
          class="
            border
            border-[#1a1a2e]
            text-[#1a1a2e]
            hover:bg-[#1a1a2e]
            hover:text-white
            text-sm
            font-medium
            py-2
            px-4
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            transition
          "
          :class="isList ? '' : 'w-full'"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Product {
  id: number | string
  variantId: string

  name: string
  image: string
  price: number
  rating: number
  originalPrice?: number
  discount?: number
  slug?: string
}

const props = defineProps<{
  product: Product
  viewMode?: 'grid' | 'list'
}>()

const emit = defineEmits<{
  'add-to-cart': [product: Product]
  'buy-now': [product: Product]
}>()

/*
|--------------------------------------------------------------------------
| VIEW MODE
|--------------------------------------------------------------------------
*/

const isList = computed(
  () => props.viewMode === 'list'
)

/*
|--------------------------------------------------------------------------
| WISHLIST
|--------------------------------------------------------------------------
*/

const wishlist = useState<Product[]>(
  'wishlist',
  () => []
)

const isWishlisted = computed(() =>
  wishlist.value.some(
    item =>
      String(item.id) ===
      String(props.product.id)
  )
)

function getStarFill(star: number) {
  const rating = Number(props.product.rating ?? 0)

  const fill = (rating - (star - 1)) * 100

  return Math.min(
    100,
    Math.max(0, fill)
  )
}

/*
|--------------------------------------------------------------------------
| VENDURE CART
|--------------------------------------------------------------------------
*/

const {
  cartLines,
  cartLoading,
  addItem,
  adjustQuantity,
  removeItem,
} = useCart()

/*
|--------------------------------------------------------------------------
| CURRENT PRODUCT ORDER LINE
|--------------------------------------------------------------------------
|
| Vendure cart me product ID ke bajay
| productVariant.id compare karenge.
|
*/

const cartLine = computed(() => {
  return cartLines.value.find(
    (line: any) =>
      String(line.productVariant?.id) ===
      String(props.product.variantId)
  )
})

/*
|--------------------------------------------------------------------------
| CART QUANTITY
|--------------------------------------------------------------------------
*/

const cartQty = computed(() => {
  return Number(
    cartLine.value?.quantity ?? 0
  )
})

/*
|--------------------------------------------------------------------------
| PRODUCT LINK
|--------------------------------------------------------------------------
*/

const productLink = computed(() => {
  const slug =
    props.product.slug ||
    props.product.id

  return `/product/${slug}`
})

/*
|--------------------------------------------------------------------------
| ADD TO CART
|--------------------------------------------------------------------------
*/

async function addToCart() {
  if (!props.product.variantId) {
    console.error(
      'Missing product variant id:',
      props.product
    )
    return
  }

  try {
    await addItem(
      String(props.product.variantId),
      1
    )

    emit(
      'add-to-cart',
      props.product
    )
  } catch (error) {
    console.error(
      'Unable to add product to cart:',
      error
    )
  }
}

/*
|--------------------------------------------------------------------------
| CHANGE QUANTITY
|--------------------------------------------------------------------------
*/

async function changeQty(delta: number) {
  const line = cartLine.value

  if (!line) {
    return
  }

  const currentQuantity =
    Number(line.quantity ?? 0)

  const nextQuantity =
    currentQuantity + delta

  try {
    /*
    |--------------------------------------------------------------------------
    | Quantity becomes 0 → Remove order line
    |--------------------------------------------------------------------------
    */

    if (nextQuantity <= 0) {
      await removeItem(
        String(line.id)
      )

      return
    }

    /*
    |--------------------------------------------------------------------------
    | Otherwise update quantity
    |--------------------------------------------------------------------------
    */

    await adjustQuantity(
      String(line.id),
      nextQuantity
    )
  } catch (error) {
    console.error(
      'Unable to change cart quantity:',
      error
    )
  }
}

/*
|--------------------------------------------------------------------------
| WISHLIST
|--------------------------------------------------------------------------
*/

function toggleWishlist() {
  const index =
    wishlist.value.findIndex(
      item =>
        String(item.id) ===
        String(props.product.id)
    )

  if (index === -1) {
    wishlist.value.push({
      ...props.product,
    })
  } else {
    wishlist.value.splice(
      index,
      1
    )
  }
}

/*
|--------------------------------------------------------------------------
| BUY NOW
|--------------------------------------------------------------------------
*/

function onBuyNow() {
  emit(
    'buy-now',
    props.product
  )
}

</script>