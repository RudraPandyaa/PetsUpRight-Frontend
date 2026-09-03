<template>
<aside class="bg-white rounded-xl p-4 lg:p-5 shadow-sm lg:sticky lg:top-24">
    <!-- Header -->
    <div
        class="flex items-center justify-between"
        :class="filtersOpen ? 'mb-5' : 'mb-0 lg:mb-5'"
      >
      <button
          type="button"
          class="flex items-center gap-2 font-semibold text-[#1a1a2e] text-base lg:cursor-default"
          @click="filtersOpen = !filtersOpen"
        >
        Filters
        <svg
            class="w-4 h-4 text-gray-500 transition-transform lg:hidden"
          :class="{ 'rotate-180': filtersOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        @click="clearAll"
        class="text-xs text-[#44476f] hover:underline font-medium"
      >
        Clear All
      </button>
    </div>
    <div :class="filtersOpen ? 'block' : 'hidden lg:block'">
        <!-- Search Brands -->
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="brandSearch"
              type="text"
              placeholder="Search brands..."
              class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c3b5df] focus:border-transparent"
            />

            <svg
              class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Pet Type -->
        <div class="mb-5 border-b border-gray-100 pb-5">
          <button
            type="button"
            @click="toggleSection('petType')"
            class="flex items-center justify-between w-full text-left"
          >
            <span class="font-medium text-sm text-[#1a1a2e]">
              Pet Type
            </span>

            <svg
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openSections.petType }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-if="openSections.petType"
            class="mt-3 space-y-2.5"
          >
            <label
              v-for="type in petTypes"
              :key="type.value"
              class="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                v-model="selected.petType"
                type="checkbox"
                :value="type.value"
                class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
              />

              <span
                class="text-sm text-gray-700 group-hover:text-[#1a1a2e]"
              >
                {{ type.label }}
              </span>
            </label>

            <p
              v-if="!loadingFacets && petTypes.length === 0"
              class="text-xs text-gray-400"
            >
              No pet types available
            </p>
          </div>
        </div>

        <!-- Category -->
        <div class="mb-5 border-b border-gray-100 pb-5">
          <button
            @click="toggleSection('category')"
            class="flex items-center justify-between w-full text-left"
          >
            <span class="font-medium text-sm text-[#1a1a2e]">
              Category
            </span>

            <svg
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openSections.category }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-show="openSections.category"
            class="mt-3 space-y-2.5"
          >
            <label
              v-for="cat in categories"
              :key="cat.value"
              class="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                v-model="selected.category"
                type="checkbox"
                :value="cat.value"
                class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
              />

              <span
                class="text-sm text-gray-700 group-hover:text-[#1a1a2e]"
              >
                {{ cat.label }}
              </span>
            </label>
          </div>
        </div>

        <!-- Brand -->
        <div class="mb-5 border-b border-gray-100 pb-5">
          <button
            @click="toggleSection('brand')"
            class="flex items-center justify-between w-full text-left"
          >
            <span class="font-medium text-sm text-[#1a1a2e]">
              Brand
            </span>

            <svg
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openSections.brand }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-show="openSections.brand"
            class="mt-3 space-y-2.5 max-h-40 overflow-y-auto"
          >
            <label
              v-for="brand in filteredBrands"
              :key="brand.value"
              class="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                v-model="selected.brand"
                type="checkbox"
                :value="brand.value"
                class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
              />

              <span
                class="text-sm text-gray-700 group-hover:text-[#1a1a2e]"
              >
                {{ brand.label }}
              </span>
            </label>

            <p
              v-if="!loadingFacets && filteredBrands.length === 0"
              class="text-xs text-gray-400"
            >
              No brands found
            </p>
          </div>
        </div>

        <!-- Price Range -->
        <div class="mb-5 border-b border-gray-100 pb-5">
          <button
            @click="toggleSection('price')"
            class="flex items-center justify-between w-full text-left"
          >
            <span class="font-medium text-sm text-[#1a1a2e]">
              Price Range
            </span>

            <svg
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openSections.price }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-show="openSections.price"
            class="mt-4"
          >
            <div
              class="flex items-center justify-between text-xs text-gray-500 mb-2"
            >
              <span>₹{{ priceRange[0] }}</span>
              <span>₹{{ priceRange[1] }}</span>
            </div>

            <div class="space-y-3">
              <input
                v-model.number="priceRange[0]"
                type="range"
                min="0"
                max="10000"
                step="100"
                class="w-full accent-[#44476f]"
              />

              <input
                v-model.number="priceRange[1]"
                type="range"
                min="0"
                max="10000"
                step="100"
                class="w-full accent-[#44476f]"
              />
            </div>
          </div>
        </div>

        <!-- Ratings -->
        <div>
          <button
            @click="toggleSection('ratings')"
            class="flex items-center justify-between w-full text-left"
          >
            <span class="font-medium text-sm text-[#1a1a2e]">
              Ratings
            </span>

            <svg
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openSections.ratings }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-show="openSections.ratings"
            class="mt-3 space-y-2.5"
          >
            <label
              v-for="rating in ratings"
              :key="rating.value"
              class="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                v-model="selected.ratings"
                type="checkbox"
                :value="rating.value"
                class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
              />

              <span
                class="text-sm text-gray-700 group-hover:text-[#1a1a2e] flex items-center gap-1"
              >
                <span class="text-amber-400">★</span>
                {{ rating.label }}
              </span>
            </label>
          </div>
        </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface FilterOption {
  label: string
  value: string
  code: string
}

export interface ShopFiltersState {
  search: string
  petType: string[]
  category: string[]
  brand: string[]
  priceMin: number
  priceMax: number
  ratings: number[]
}

const emit = defineEmits<{
  'update:filters': [filters: ShopFiltersState]
}>()

const { getShopFacets } = useProducts()

const brandSearch = ref('')
const priceRange = ref<[number, number]>([0, 10000])

const loadingFacets = ref(false)
const filtersOpen = ref(false)
const petTypes = ref<FilterOption[]>([])
const categories = ref<FilterOption[]>([])
const brands = ref<FilterOption[]>([])

const openSections = reactive({
  petType: true,
  category: false,
  brand: false,
  price: true,
  ratings: false,
})

const selected = reactive({
  petType: [] as string[],
  category: [] as string[],
  brand: [] as string[],
  ratings: [] as number[],
})

const ratings = [
  {
    label: '4★ & above',
    value: 4,
  },
  {
    label: '3★ & above',
    value: 3,
  },
  {
    label: '2★ & above',
    value: 2,
  },
]

const filteredBrands = computed(() => {
  const search = brandSearch.value.trim().toLowerCase()

  if (!search) {
    return brands.value
  }

  return brands.value.filter((brand) =>
    brand.label.toLowerCase().includes(search)
  )
})

function toggleSection(
  key: keyof typeof openSections
) {
  openSections[key] = !openSections[key]
}

function emitFilters() {
  emit('update:filters', {
    search: '',
    petType: [...selected.petType],
    category: [...selected.category],
    brand: [...selected.brand],
    priceMin: priceRange.value[0],
    priceMax: priceRange.value[1],
    ratings: [...selected.ratings],
  })
}

function clearAll() {
  selected.petType.splice(0)
  selected.category.splice(0)
  selected.brand.splice(0)
  selected.ratings.splice(0)

  priceRange.value = [0, 10000]
  brandSearch.value = ''
}

async function loadFacets() {
  loadingFacets.value = true

  try {
    const facets = await getShopFacets()

    console.log('ALL FACETS:', facets)

    const petTypeFacet = facets.find(
      (facet: any) => facet.code === 'pet-type'
    )

    const categoryFacet = facets.find(
      (facet: any) => facet.code === 'category'
    )

    const brandFacet = facets.find(
      (facet: any) => facet.code === 'brand'
    )

    console.log('PET TYPE FACET:', petTypeFacet)
    console.log('PET TYPE VALUES:', petTypeFacet?.values)

    petTypes.value =
    petTypeFacet?.values?.map((value: any) => ({
      label: value.name,
      value: String(value.id),
      code: String(value.code).toLowerCase(),
    })) ?? []

    categories.value =
    categoryFacet?.values?.map((value: any) => ({
      label: value.name,
      value: String(value.id),
      code: String(value.code).toLowerCase(),
    })) ?? []

    brands.value =
      brandFacet?.values?.map(
        (value: any) => ({
          label: value.name,
          value: String(value.id),
          code: String(value.code).toLowerCase(),
        })
      ) ?? []

    console.log('FINAL PET TYPES:', petTypes.value)
  } catch (error) {
    console.error('Failed to load shop facets:', error)
  } finally {
    loadingFacets.value = false
  }
}

watch(
  selected,
  () => {
    emitFilters()
  },
  {
    deep: true,
  }
)

watch(
  priceRange,
  () => {
    if (
      priceRange.value[0] >
      priceRange.value[1]
    ) {
      return
    }

    emitFilters()
  },
  {
    deep: true,
  }
)

onMounted(async () => {
  await loadFacets()
})
</script>