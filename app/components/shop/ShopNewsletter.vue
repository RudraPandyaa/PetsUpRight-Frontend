<template>
  <section class="w-full bg-[#c3b5df]/40">
    <div class="container mx-auto px-4 py-8 md:py-10">
      <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        
        <!-- Left: Pets image -->
        <div class="shrink-0 w-full md:w-auto flex justify-center">
          <img
            src="/images/shop/image-6.png"
            alt="Happy pets"
            class="h-36 md:h-44 object-contain"
          />
        </div>

        <!-- Middle: Text -->
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Stay Pawsome!
          </h2>
          <p class="text-sm md:text-base text-[#1a1a2e]/70 max-w-md mx-auto md:mx-0">
            Join our newsletter to receive expert pet care tips, exclusive discounts, and new product early-access.
          </p>
        </div>

        <!-- Right: Form -->
        <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3 shrink-0">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="px-4 py-2.5 rounded-lg border border-white/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#44476f] min-w-[200px]"
          />
          <button
            @click="subscribe"
            class="bg-[#1a1a2e] hover:bg-[#44476f] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition whitespace-nowrap"
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