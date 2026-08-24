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
          <ShopFilters @update:filters="onFiltersChange" />
        </div>

        <!-- RIGHT: Products -->
        <div class="w-full lg:flex-1 min-w-0">
          <ShopProductGrid 
            :view-mode="viewMode" 
            :filters="activeFilters"
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
const sortBy = ref('popularity')
const viewMode = ref<'grid' | 'list'>('grid')
const totalProducts = ref(0)
const currentPage = ref(1)

const activeFilters = ref({
  petType: [] as string[],
  category: [] as string[],
  brand: [] as string[],
  ratings: [] as number[],
  priceRange: [0, 10000] as number[],
})

function onFiltersChange(filters: any) {
  activeFilters.value = filters
  currentPage.value = 1 // filter change pe page 1 pe le aao
}

useHead({
  title: 'Shop Pet Products | PetsUpRight',
})
</script>