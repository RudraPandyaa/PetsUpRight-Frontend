<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue';
import CategoriesSection from '~/components/home/CategoriesSection.vue';
import NewArrivalsSection from '~/components/home/NewArrivalsSection.vue';
import NewArrivalsTicker from '~/components/home/NewArrivalsTicker.vue';
import ComfortCareSection from '~/components/home/ComfortCareSection.vue';
const reviews = [
  { name: 'Priya S.', text: 'My dog absolutely loves the food. Quality is outstanding!' },
  { name: 'Rahul M.', text: 'Fast delivery and great packaging. Highly recommend.' },
  { name: 'Ananya K.', text: 'Best pet store experience. Will order again soon.' },
]
</script>

<template>
  <div>
    <HeroSection />
    <CategoriesSection />
    <NewArrivalsSection />
    <NewArrivalsTicker />
    <ComfortCareSection />

    <!-- ================= HAPPY TAILS ================= -->
    <section class="py-14 bg-[#ede7e7]/40">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-bold text-[#44476f] mb-2">HAPPY TAILS</h2>
        <p class="text-center text-sm text-[#44476f]/70 mb-8">Real moments from our pet family</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div 
            v-for="i in 4" 
            :key="i"
            class="aspect-square bg-[#c3b5df]/20 rounded-2xl overflow-hidden"
          >
            <div class="w-full h-full flex items-center justify-center text-[#44476f] text-sm">
              Pet Photo {{ i }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= POSITIVE REVIEWS ================= -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-bold text-[#44476f] mb-10">POSITIVE REVIEWS</h2>

        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="(review, index) in reviews" 
            :key="index"
            class="bg-[#ede7e7]/60 rounded-2xl p-6"
          >
            <div class="flex gap-1 mb-3">
              <span v-for="s in 5" :key="s" class="text-yellow-400">★</span>
            </div>
            <p class="text-sm text-[#44476f] mb-4 leading-relaxed">"{{ review.text }}"</p>
            <p class="text-sm font-semibold text-[#44476f]">{{ review.name }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>