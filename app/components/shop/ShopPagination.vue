<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
    <!-- Showing text -->
    <p class="text-sm text-gray-500">
      Showing
      <span class="font-medium text-[#1a1a2e]">{{ startItem }}-{{ endItem }}</span>
      of
      <span class="font-medium text-[#1a1a2e]">{{ totalItems }}</span>
      products
    </p>

    <!-- Page numbers -->
    <div class="flex items-center gap-1">
      <!-- Previous -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Previous page"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Page buttons -->
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'w-9 h-9 rounded-lg text-sm font-medium transition',
          page === currentPage
            ? 'bg-[#1a1a2e] text-white'
            : 'text-gray-600 hover:bg-gray-100'
        ]"
      >
        {{ page }}
      </button>

      <!-- Next -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Next page"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    currentPage?: number
    totalItems?: number
    perPage?: number
  }>(),
  {
    currentPage: 1,
    totalItems: 128,
    perPage: 8,
  }
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.totalItems)
})

// Show max 5 page numbers
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = start + maxVisible - 1

  if (end > totalPages.value) {
    end = totalPages.value
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return
  emit('update:currentPage', page)

  // Optional: scroll to top of products
  window.scrollTo({ top: 300, behavior: 'smooth' })
}
</script>