<template>
  <div class="bg-white border-b">
    <div class="container mx-auto px-4 py-5">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-2 flex items-center gap-1.5">
        <NuxtLink to="/" class="hover:text-[#44476f] transition">Home</NuxtLink>
        <span>›</span>
        <span class="text-[#1a1a2e] font-medium">Shop</span>
      </nav>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Title -->
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-[#1a1a2e]">
            Shop Pet Products
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Showing {{ totalProducts }} Products curated for your best friend.
          </p>
        </div>

        <!-- Sort + View Toggle -->
        <div class="flex items-center gap-3">
          <!-- Sort By -->
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500 whitespace-nowrap">Sort By:</span>
            <select
              :value="sortBy"
              @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
              class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c3b5df] cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <!-- Grid / List Toggle -->
          <div class="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              @click="$emit('update:viewMode', 'grid')"
              :class="viewMode === 'grid' ? 'bg-[#44476f] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="p-2 transition"
              aria-label="Grid view"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              @click="$emit('update:viewMode', 'list')"
              :class="viewMode === 'list' ? 'bg-[#44476f] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="p-2 transition"
              aria-label="List view"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalProducts: number
  sortBy: string
  viewMode: 'grid' | 'list'
}>()

defineEmits<{
  'update:sortBy': [value: string]
  'update:viewMode': [value: 'grid' | 'list']
}>()
</script>