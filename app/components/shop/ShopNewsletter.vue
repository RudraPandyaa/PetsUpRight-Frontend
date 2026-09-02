<template>
  <section class="w-full bg-[#c3b5df]/40 overflow-hidden">
    <div class="container mx-auto px-4 py-8 md:py-10">
      <div class="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">

        <!-- Image -->
        <div class="shrink-0 w-full lg:w-auto flex justify-center order-1">
          <img
            src="/images/shop/image-6.png"
            alt="Happy pets"
            class="h-28 sm:h-32 md:h-40 lg:h-44 object-contain lg:translate-y-11"
          />
        </div>

        <!-- Text -->
        <div class="flex-1 text-center lg:text-left order-2 px-1">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Stay Pawsome!
          </h2>
          <p class="text-sm md:text-base text-[#1a1a2e]/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Join our newsletter to receive expert pet care tips, exclusive discounts, and new product early-access.
          </p>
        </div>

        <!-- Form -->
        <div class="w-full lg:w-auto flex flex-col sm:flex-row gap-3 shrink-0 order-3 max-w-xl mx-auto lg:mx-0">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="w-full sm:flex-1 lg:w-auto px-4 py-2.5 rounded-lg border border-white/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#44476f] sm:min-w-[200px]"
          />
          <button
            type="button"
            @click="subscribe"
            class="w-full sm:w-auto bg-[#1a1a2e] hover:bg-[#44476f] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')

function subscribe() {
  if (!email.value) return
  console.log('Subscribe:', email.value)
  // later: API call
  email.value = ''
}
</script>