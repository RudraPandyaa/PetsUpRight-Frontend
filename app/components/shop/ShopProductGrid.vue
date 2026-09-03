<template>
  <div>
    <!-- Loading -->
    <div
      v-if="loading"
      :class="
        viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4'
          : 'grid grid-cols-1 md:grid-cols-2 gap-4'
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
          ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4'
          : 'grid grid-cols-1 md:grid-cols-2 gap-4'
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
  variantId: string
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
  getShopProducts,
  getShopFacets,
} = useProducts()

const products = ref<ShopProduct[]>([])
const loading = ref(false)

const categoryIdByCode = ref<Record<string, string>>({})
const petTypeIdByCode = ref<Record<string, string>>({})
const brandIdByCode = ref<Record<string, string>>({})

async function loadHeaderFacetMaps() {
  try {
    const facets = await getShopFacets()

    /*
    |--------------------------------------------------------------------------
    | Category map
    |--------------------------------------------------------------------------
    |
    | food -> actual Vendure facet value ID
    | toys -> actual Vendure facet value ID
    |
    */

    const categoryFacet = facets.find(
      (facet: any) => facet.code === 'category'
    )

    const categoryMap: Record<string, string> = {}

    for (const value of categoryFacet?.values ?? []) {
      categoryMap[String(value.code).toLowerCase()] =
        String(value.id)
    }

    categoryIdByCode.value = categoryMap

    /*
    |--------------------------------------------------------------------------
    | Pet Type map
    |--------------------------------------------------------------------------
    |
    | dog -> actual Vendure facet value ID
    | cat -> actual Vendure facet value ID
    |
    */

    const petTypeFacet = facets.find(
      (facet: any) =>
        facet.code === 'pet-type' ||
        facet.code === 'petType' ||
        facet.code === 'pet_type'
    )

    const petMap: Record<string, string> = {}

    for (const value of petTypeFacet?.values ?? []) {
      petMap[String(value.code).toLowerCase()] =
        String(value.id)
    }

    petTypeIdByCode.value = petMap

    const brandFacet = facets.find(
      (facet: any) => facet.code === 'brand'
    )

    const brandMap: Record<string, string> = {}

    for (const value of brandFacet?.values ?? []) {
      brandMap[String(value.code).toLowerCase()] =
        String(value.id)
    }

    brandIdByCode.value = brandMap

  } catch (error) {
    console.error(
      'Failed to load shop facet maps:',
      error
    )

    categoryIdByCode.value = {}
    petTypeIdByCode.value = {}
    brandIdByCode.value = {}
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
  * Pet Type coming from Header:
  *
  * /shop?pet=dog
  * /shop?pet=cat
  */

  const petCode =
    typeof route.query.pet === 'string'
      ? route.query.pet.toLowerCase()
      : undefined

  if (petCode) {
    const petTypeId =
      petTypeIdByCode.value[petCode]

    if (petTypeId) {
      filters.push({
        and: petTypeId,
      })
    }
  }

  /*
   * Category
   */
  const categoryIds = new Set<string>(
    f?.category ?? []
  )

  const categoryCode =
  typeof route.query.category === 'string'
    ? route.query.category.toLowerCase()
    : undefined

  if (categoryCode) {
    const categoryId =
      categoryIdByCode.value[categoryCode]

    if (categoryId) {
      categoryIds.add(categoryId)
    }
  }

  /*
   * Category coming from:
   *
   * /shop?collection=toys
   */


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

  const brandCode =
    typeof route.query.brand === 'string'
      ? route.query.brand.toLowerCase()
      : undefined

  if (brandCode) {
    const brandId = brandIdByCode.value[brandCode]

    if (brandId) {
      filters.push({
        and: brandId,
      })
    }
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
    variantId: String(item.productVariantId),

    name: item.productName,

    slug: item.slug,

    image: item.productAsset?.preview
      ? `${String(item.productAsset.preview).replace(/\\/g, '/')}?preset=medium`
      : '/images/shop/Rectangle-5.png',

    // Vendure prices are minor units.
    price: Math.round(priceValue / 100),
    rating: 4.2,


    currencyCode: item.currencyCode ?? 'INR',
  }
}

function mapShopProduct(item: any): ShopProduct {
  const firstVariant = item.variants?.[0]

  return {
    id: String(item.id),
    name: item.name,
    variantId: String(firstVariant?.id ?? ''),
    slug: item.slug,

    image: item.featuredAsset?.preview
      ? `${String(item.featuredAsset.preview).replace(/\\/g, '/')}?preset=medium`
      : '/images/shop/Rectangle-5.png',

    price: Math.round(
      Number(firstVariant?.priceWithTax ?? 0) / 100
    ),
    rating: 4.9,


    currencyCode:
      firstVariant?.currencyCode ?? 'INR',
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

    const routeSort =
    typeof route.query.sort === 'string'
      ? route.query.sort
      : undefined

      const collectionSlug =
      typeof route.query.collection === 'string'
        ? route.query.collection
        : undefined

        const isNewest =
          routeSort === 'newest' ||
          props.sortBy === 'newest'

        let result: any

        if (isNewest) {
          const newestResult = await getShopProducts({
            take: perPage,
            skip: (page - 1) * perPage,
            newestFirst: true,
          })

          result = {
            totalItems: newestResult.totalItems,
            items: (newestResult.items ?? []).map(
              mapShopProduct
            ),
            alreadyMapped: true,
          }
        } else {
          const routeSearch =
            typeof route.query.search === 'string'
              ? route.query.search.trim()
              : ''

              let backendSort:
                | { price: 'ASC' | 'DESC' }
                | undefined

              if (props.sortBy === 'price-low') {
                backendSort = {
                  price: 'ASC',
                }
              }

              if (props.sortBy === 'price-high') {
                backendSort = {
                  price: 'DESC',
                }
              }

          result = await getProducts({
            take: perPage,

            skip: (page - 1) * perPage,

            term:
              routeSearch ||
              props.filters?.search?.trim() ||
              undefined,

            collectionSlug,

            sort: backendSort,

            facetValueFilters:
              facetValueFilters.length
                ? facetValueFilters
                : undefined,
          })
        }

      let items: ShopProduct[] =
        result.alreadyMapped
          ? result.items
          : (result.items ?? []).map(mapSearchProduct)

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
    | Rating Filter
    |--------------------------------------------------------------------------
    */

    const selectedRatings =
      props.filters?.ratings ?? []

    if (selectedRatings.length) {
      items = items.filter((product) =>
        selectedRatings.some(
          (rating) =>
            product.rating >= rating
        )
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
  await loadHeaderFacetMaps()
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
    route.query.pet,
    route.query.category,
    route.query.brand,
    route.query.sort,
    route.query.search,
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