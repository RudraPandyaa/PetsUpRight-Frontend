<template>
  <div class="bg-[#f7f7f8] min-h-screen">
    <ShopHeader
      :total-products="totalProducts"
      v-model:sort-by="sortBy"
      v-model:view-mode="viewMode"
    />

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        <!-- LEFT: Filters -->
        <div class="w-full lg:w-64 xl:w-72 shrink-0">
          <ShopFilters     :initial-filters="activeFilters" @update:filters="onFiltersChange" />
        </div>

        <!-- RIGHT: Products -->
        <div class="w-full lg:flex-1 min-w-0">
          <ShopProductGrid  
            :view-mode="viewMode"  
            :filters="activeFilters"
            :current-page="currentPage"
            :sort-by="sortBy"
            :per-page="12"
            @update:total="totalProducts = $event"
          />

          <ShopPagination
            v-model:current-page="currentPage"
            :total-items="totalProducts"
            :per-page="12"
          />
        </div>

      </div>
    </div>

    <ShopRecentlyViewed />
    <ShopTrustFeatures />
    <ShopNewsletter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const sortBy = ref('popularity')
const viewMode = ref<'grid' | 'list'>('grid')
const totalProducts = ref(0)
const currentPage = ref(1)

type ShopFilterState = {
  search: string
  petType: string[]
  category: string[]
  brand: string[]
  priceMin: number
  priceMax: number
  ratings: number[]
}

function getPetTypeFromUrl(): string[] {
  const value = route.query['pet-type']

  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map(item => item.trim().toLowerCase())
      .filter(Boolean)
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim().toLowerCase()]
  }

  return []
}

const activeFilters = ref<ShopFilterState>({
  search: '',
  petType: getPetTypeFromUrl(),
  category: [],
  brand: [],
  priceMin: 0,
  priceMax: 10000,
  ratings: [],
})

function onFiltersChange(filters: ShopFilterState) {
  activeFilters.value = {
    ...filters,
    petType: [...filters.petType],
    category: [...filters.category],
    brand: [...filters.brand],
    ratings: [...filters.ratings],
  }

  currentPage.value = 1
}

watch(
  () => route.query['pet-type'],
  () => {
    activeFilters.value = {
      ...activeFilters.value,
      petType: getPetTypeFromUrl(),
    }

    currentPage.value = 1
  },
)

useHead({
  title: 'Shop Pet Products | PetsUpRight',
})
</script>