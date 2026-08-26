<template>
  <section class="bg-[#f7f7f8] pb-16 md:pb-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f3eef9] flex items-center justify-center text-[#44476f]">
            <!-- Simple icons using SVG -->
            <svg v-if="feature.icon === 'truck'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>

            <svg v-else-if="feature.icon === 'shield'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>

            <svg v-else-if="feature.icon === 'return'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>

            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>

          <h3 class="text-base font-semibold text-xl text-[#1a1a2e] mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-md text-gray-500 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Fast Delivery',
    description: 'Same-day dispatch for all orders placed before 2 PM.',
    icon: 'truck',
  },
  {
    title: 'Genuine Products',
    description: 'Directly sourced from top global pet brands.',
    icon: 'shield',
  },
  {
    title: 'Easy Returns',
    description: 'Hassle-free 30-day return policy for peace of mind.',
    icon: 'return',
  },
  {
    title: 'Exclusive Rewards',
    description: 'Earn points on every purchase with our loyalty program.',
    icon: 'gift',
  },
]
</script>