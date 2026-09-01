<template>
  <div>
    <!-- Loading -->
    <div
      v-if="loading"
      :class="
        viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'
          : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'
      "
    >
      <div
        v-for="i in perPage"
        :key="i"
        class="bg-white rounded-xl p-4 animate-pulse border border-gray-100"
      >
        <div class="aspect-square bg-gray-200 rounded-lg mb-3"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Products -->
    <div
      v-else-if="products.length"
      :class="
        viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'
          : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'
      "
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :view-mode="viewMode"
        @add-to-cart="onAddToCart"
        @buy-now="onBuyNow"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="py-20 text-center text-gray-400"
    >
      <p class="text-lg">
        No products found
      </p>

      <p class="text-sm mt-1">
        Try adjusting your filters
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/shop/ProductCard.vue'

interface ShopFilters {
  search?: string
  petType: string[]
  category: string[]
  brand: string[]
  priceMin?: number
  priceMax?: number
  priceRange?: number[]
  ratings: number[]
}

interface ShopProduct {
  id: string
  name: string
  slug: string
  image: string
  price: number
  rating: number
  currencyCode: string
}

const props = withDefaults(
  defineProps<{
    viewMode: 'grid' | 'list'
    sortBy?: string
    currentPage?: number
    perPage?: number
    filters?: ShopFilters
  }>(),
  {
    sortBy: 'popularity',
    currentPage: 1,
    perPage: 12,
  }
)

const emit = defineEmits<{
  'update:total': [n: number]
}>()

const route = useRoute()

const {
  getProducts,
  getShopFacets,
} = useProducts()

const products = ref<ShopProduct[]>([])
const loading = ref(false)

/*
|--------------------------------------------------------------------------
| Collection slug -> Category Facet Value ID
|--------------------------------------------------------------------------
|
| Homepage may open:
|
| /shop?collection=toys
|
| But Vendure search facetValueFilters requires the actual Facet Value ID.
|
*/
const categoryIdByCode = ref<Record<string, string>>({})

async function loadCategoryFacetMap() {
  try {
    const facets = await getShopFacets()

    const categoryFacet = facets.find(
      (facet: any) => facet.code === 'category'
    )

    const map: Record<string, string> = {}

    for (const value of categoryFacet?.values ?? []) {
      map[String(value.code)] = String(value.id)
    }

    categoryIdByCode.value = map
  } catch (error) {
    console.error(
      'Failed to load category facet map:',
      error
    )

    categoryIdByCode.value = {}
  }
}

/*
|--------------------------------------------------------------------------
| Build Vendure facet filters
|--------------------------------------------------------------------------
|
| Same facet:
|
| Dog OR Cat
|
| Different facets:
|
| (Dog OR Cat)
| AND
| (Toys OR Beds)
| AND
| (Pawfect OR Fresh Kisses)
|
*/
function buildFacetValueFilters() {
  const filters: Array<{
    and?: string
    or?: string[]
  }> = []

  const f = props.filters

  /*
   * Pet Type
   */
  if (f?.petType?.length) {
    filters.push({
      or: [...f.petType],
    })
  }

  /*
   * Category
   */
  const categoryIds = new Set<string>(
    f?.category ?? []
  )

  /*
   * Category coming from:
   *
   * /shop?collection=toys
   */
  const collectionSlug =
    typeof route.query.collection === 'string'
      ? route.query.collection
      : undefined

  if (collectionSlug) {
    const categoryId =
      categoryIdByCode.value[collectionSlug]

    if (categoryId) {
      categoryIds.add(categoryId)
    }
  }

  if (categoryIds.size) {
    filters.push({
      or: [...categoryIds],
    })
  }

  /*
   * Brand
   */
  if (f?.brand?.length) {
    filters.push({
      or: [...f.brand],
    })
  }

  return filters
}

/*
|--------------------------------------------------------------------------
| Convert Vendure SearchResult -> ProductCard format
|--------------------------------------------------------------------------
*/
function mapSearchProduct(item: any): ShopProduct {
  const price = item.priceWithTax

  let priceValue = 0

  if (price?.__typename === 'SinglePrice') {
    priceValue = Number(price.value ?? 0)
  } else if (price?.__typename === 'PriceRange') {
    priceValue = Number(price.min ?? 0)
  }

  return {
    id: String(item.productId),

    name: item.productName,

    slug: item.slug,

    image: item.productAsset?.preview
      ? `${String(item.productAsset.preview).replace(/\\/g, '/')}?preset=medium`
      : '/images/shop/Rectangle-5.png',

    // Vendure prices are minor units.
    price: Math.round(priceValue / 100),

    // Temporary until actual review/rating system exists.
    rating: 4.9,

    currencyCode: item.currencyCode ?? 'INR',
  }
}

/*
|--------------------------------------------------------------------------
| Fetch Products
|--------------------------------------------------------------------------
*/
async function fetchProducts() {
  loading.value = true

  try {
    const page = props.currentPage
    const perPage = props.perPage

    const facetValueFilters =
      buildFacetValueFilters()

    const result = await getProducts({
      /*
       * Real backend pagination.
       *
       * Page 1 -> take 12 / skip 0
       * Page 2 -> take 12 / skip 12
       */
      take: perPage,

      skip: (page - 1) * perPage,

      term:
        props.filters?.search?.trim() ||
        undefined,

      facetValueFilters:
        facetValueFilters.length
          ? facetValueFilters
          : undefined,
    })

    let items: ShopProduct[] =
      (result.items ?? []).map(mapSearchProduct)

    /*
    |--------------------------------------------------------------------------
    | Price
    |--------------------------------------------------------------------------
    |
    | TEMPORARILY client-side.
    |
    | Later we can move this into Vendure search itself.
    |
    */
    const minPrice = Number(
      props.filters?.priceMin ?? 0
    )

    const maxPrice = Number(
      props.filters?.priceMax ?? 10000
    )

    if (
      minPrice > 0 ||
      maxPrice < 10000
    ) {
      items = items.filter(
        (product) =>
          product.price >= minPrice &&
          product.price <= maxPrice
      )
    }

    /*
    |--------------------------------------------------------------------------
    | Rating
    |--------------------------------------------------------------------------
    |
    | Temporary because every product currently has placeholder 4.9.
    |
    */
    if (props.filters?.ratings?.length) {
      const minimumRating = Math.min(
        ...props.filters.ratings
      )

      items = items.filter(
        (product) =>
          product.rating >= minimumRating
      )
    }

    /*
    |--------------------------------------------------------------------------
    | Sort
    |--------------------------------------------------------------------------
    */
    if (props.sortBy === 'price-low') {
      items.sort(
        (a, b) => a.price - b.price
      )
    }

    if (props.sortBy === 'price-high') {
      items.sort(
        (a, b) => b.price - a.price
      )
    }

    if (props.sortBy === 'rating') {
      items.sort(
        (a, b) => b.rating - a.rating
      )
    }

    products.value = items

    /*
     * IMPORTANT:
     *
     * Use Vendure totalItems.
     *
     * Do NOT use items.length because items only contains
     * the current page (maximum 12 products).
     */
    emit(
      'update:total',
      Number(result.totalItems ?? 0)
    )
  } catch (error) {
    console.error(
      'Failed to load shop products:',
      error
    )

    products.value = []

    emit('update:total', 0)
  } finally {
    loading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Initial setup
|--------------------------------------------------------------------------
*/
onMounted(async () => {
  /*
   * Needed only to support:
   *
   * /shop?collection=toys
   *
   * ShopFilters itself already uses real facet IDs.
   */
  await loadCategoryFacetMap()

  await fetchProducts()
})

/*
|--------------------------------------------------------------------------
| Watch filters / pagination / sorting
|--------------------------------------------------------------------------
|
| immediate:true is intentionally NOT used.
|
| Initial fetch is handled by onMounted().
|
*/
watch(
  () => [
    props.filters,
    props.sortBy,
    props.currentPage,
    props.perPage,
    route.query.collection,
  ],
  () => {
    fetchProducts()
  },
  {
    deep: true,
  }
)

/*
|--------------------------------------------------------------------------
| Product Actions
|--------------------------------------------------------------------------
*/
function onAddToCart(product: ShopProduct) {
  console.log(
    'Add to cart:',
    product.name
  )
}

function onBuyNow(product: ShopProduct) {
  navigateTo(
    `/product/${product.slug}`
  )
}
</script>