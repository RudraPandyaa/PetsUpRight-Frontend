<template>
  <aside class="bg-white rounded-xl p-5 shadow-sm sticky top-24">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h3 class="font-semibold text-[#1a1a2e] text-base">Filters</h3>
      <button
        @click="clearAll"
        class="text-xs text-[#44476f] hover:underline font-medium"
      >
        Clear All
      </button>
    </div>

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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Pet Type -->
    <div class="mb-5 border-b border-gray-100 pb-5">
      <button
        @click="toggleSection('petType')"
        class="flex items-center justify-between w-full text-left"
      >
        <span class="font-medium text-sm text-[#1a1a2e]">Pet Type</span>
        <svg
          class="w-4 h-4 text-gray-500 transition-transform"
          :class="{ 'rotate-180': openSections.petType }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="openSections.petType" class="mt-3 space-y-2.5">
        <label
          v-for="type in petTypes"
          :key="type.value"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            :value="type.value"
            v-model="selected.petType"
            class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
          />
          <span class="text-sm text-gray-700 group-hover:text-[#1a1a2e]">
            {{ type.label }}
          </span>
        </label>
      </div>
    </div>

    <!-- Category -->
    <div class="mb-5 border-b border-gray-100 pb-5">
      <button
        @click="toggleSection('category')"
        class="flex items-center justify-between w-full text-left"
      >
        <span class="font-medium text-sm text-[#1a1a2e]">Category</span>
        <svg
          class="w-4 h-4 text-gray-500 transition-transform"
          :class="{ 'rotate-180': openSections.category }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="openSections.category" class="mt-3 space-y-2.5">
        <label
          v-for="cat in categories"
          :key="cat.value"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            :value="cat.value"
            v-model="selected.category"
            class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
          />
          <span class="text-sm text-gray-700 group-hover:text-[#1a1a2e]">
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
        <span class="font-medium text-sm text-[#1a1a2e]">Brand</span>
        <svg
          class="w-4 h-4 text-gray-500 transition-transform"
          :class="{ 'rotate-180': openSections.brand }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="openSections.brand" class="mt-3 space-y-2.5 max-h-40 overflow-y-auto">
        <label
          v-for="brand in filteredBrands"
          :key="brand"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            :value="brand"
            v-model="selected.brand"
            class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
          />
          <span class="text-sm text-gray-700 group-hover:text-[#1a1a2e]">
            {{ brand }}
          </span>
        </label>
      </div>
    </div>

    <!-- Price Range -->
    <div class="mb-5 border-b border-gray-100 pb-5">
      <button
        @click="toggleSection('price')"
        class="flex items-center justify-between w-full text-left"
      >
        <span class="font-medium text-sm text-[#1a1a2e]">Price Range</span>
        <svg
          class="w-4 h-4 text-gray-500 transition-transform"
          :class="{ 'rotate-180': openSections.price }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="openSections.price" class="mt-4">
        <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>₹{{ priceRange[0] }}</span>
          <span>₹{{ priceRange[1] }}</span>
        </div>

        <!-- Simple dual range (can be improved later) -->
        <div class="space-y-3">
          <input
            type="range"
            v-model.number="priceRange[0]"
            min="0"
            max="10000"
            step="100"
            class="w-full accent-[#44476f]"
          />
          <input
            type="range"
            v-model.number="priceRange[1]"
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
        <span class="font-medium text-sm text-[#1a1a2e]">Ratings</span>
        <svg
          class="w-4 h-4 text-gray-500 transition-transform"
          :class="{ 'rotate-180': openSections.ratings }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="openSections.ratings" class="mt-3 space-y-2.5">
        <label
          v-for="rating in ratings"
          :key="rating.value"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            :value="rating.value"
            v-model="selected.ratings"
            class="w-4 h-4 rounded border-gray-300 text-[#44476f] focus:ring-[#c3b5df]"
          />
          <span class="text-sm text-gray-700 group-hover:text-[#1a1a2e] flex items-center gap-1">
            <span class="text-amber-400">★</span>
            {{ rating.label }}
          </span>
        </label>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
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

const brandSearch = ref('')
const priceRange = ref([0, 10000])

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

const petTypes = [
  { label: 'Dogs', value: '42' },
  { label: 'Cats', value: '43' },
]

const categories = [
  { label: 'Food', value: '44' },
]

const brands: string[] = [] // empty for now

const ratings = [
  { label: '4★ & above', value: 4 },
  { label: '3★ & above', value: 3 },
  { label: '2★ & above', value: 2 },
]

const filteredBrands = computed(() => {
  if (!brandSearch.value) return brands
  return brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.value.toLowerCase())
  )
})

function toggleSection(key: keyof typeof openSections) {
  openSections[key] = !openSections[key]
}

function emitFilters() {
  emit('update:filters', {
    search: brandSearch.value,
    petType: [...selected.petType],
    category: [...selected.category],
    brand: [...selected.brand],
    priceMin: priceRange.value[0],
    priceMax: priceRange.value[1],
    ratings: [...selected.ratings],
  })
}

function clearAll() {
  selected.petType = []
  selected.category = []
  selected.brand = []
  selected.ratings = []
  priceRange.value = [0, 10000]
  brandSearch.value = ''
  emitFilters()
}

watch([selected, priceRange, brandSearch], emitFilters, { deep: true })

// first load
onMounted(() => emitFilters())
</script>