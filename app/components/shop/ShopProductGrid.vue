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

const { loadCategoryTree } = useCategoryTree()

const products = ref<ShopProduct[]>([])
const loading = ref(false)
let fetchRequestId = 0
const petTypeIdByCode = ref<Record<string, string>>({})
const brandIdByCode = ref<Record<string, string>>({})

async function loadHeaderFacetMaps() {
  try {
    const facets = await getShopFacets()

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

    petTypeIdByCode.value = {}
    brandIdByCode.value = {}
  }
}

function resolveFacetIds(
  values: string[] | undefined,
  idByCode: Record<string, string>,
): string[] {
  if (!values?.length) return []

  return [
    ...new Set(
      values
        .map((value) => {
          const input = String(value).trim()
          const normalized = input.toLowerCase()

          // Convert codes such as "dog" into Vendure IDs.
          // Existing IDs remain unchanged.
          return idByCode[normalized] ?? input
        })
        .filter(Boolean),
    ),
  ]
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
  const petTypeIds = resolveFacetIds(
    f?.petType,
    petTypeIdByCode.value,
  )

  if (petTypeIds.length) {
    filters.push({
      or: petTypeIds,
    })
  }

  // Categories are collections, see resolveCollectionSlugs()

  /*
   * Brand
   */
  const brandIds = resolveFacetIds(
    f?.brand,
    brandIdByCode.value,
  )

  if (brandIds.length) {
    filters.push({
      or: brandIds,
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
| Category filter -> collections
|--------------------------------------------------------------------------
|
| Categories are collections per pet (dog-food, cat-food, ...). Selecting
| "Food" searches the Food collection of every selected pet (or of every
| pet if none is selected, or of the pet in /shop?collection=...).
|
| Returns undefined when no category is selected, and null when the
| selection cannot match anything (e.g. "Food" for a pet without Food).
*/
async function resolveCollectionSlugs(): Promise<string[] | null | undefined> {
  const routeCollection =
    typeof route.query.collection === 'string'
      ? route.query.collection
      : undefined

  const selectedCategories = props.filters?.category ?? []

  if (!selectedCategories.length) {
    return routeCollection ? [routeCollection] : undefined
  }

  const pets = await loadCategoryTree()

  // Selected pet types are facet value IDs; their codes ("dog",
  // "hamster-guinea-pig-turtle-rabbit") match the pet collection slugs
  const petCodeById: Record<string, string> = {}

  for (const [code, id] of Object.entries(petTypeIdByCode.value)) {
    petCodeById[id] = code
  }

  const selectedPets = (props.filters?.petType ?? []).map(
    value => petCodeById[String(value)] ?? String(value).toLowerCase(),
  )

  let petNodes = selectedPets.length
    ? pets.filter(pet => selectedPets.includes(pet.slug))
    : pets

  const routePet = routeCollection
    ? pets.find(pet =>
        routeCollection === pet.slug ||
        routeCollection.startsWith(`${pet.slug}-`),
      )
    : undefined

  if (routePet) {
    petNodes = petNodes.filter(pet => pet.slug === routePet.slug)
  }

  const slugs = petNodes.flatMap(pet =>
    pet.children
      .filter(category =>
        selectedCategories.includes(categoryCode(category.name)),
      )
      .map(category => category.slug),
  )

  return slugs.length ? slugs : null
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
  const requestId = ++fetchRequestId
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

          const collectionSlugs = await resolveCollectionSlugs()

          result = collectionSlugs === null
            // The selected categories do not exist for the selected pets
            ? { totalItems: 0, items: [], alreadyMapped: true }
            : await getProducts({
              take: perPage,

              skip: (page - 1) * perPage,

              term:
                routeSearch ||
                props.filters?.search?.trim() ||
                undefined,

              collectionSlug,

              collectionSlugs,

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
    if (requestId !== fetchRequestId) {
      return
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
    if (requestId === fetchRequestId) {
    loading.value = false
  }
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