<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue';
import CategoriesSection from '~/components/home/CategoriesSection.vue';
import NewArrivalsSection from '~/components/home/NewArrivalsSection.vue';
import NewArrivalsTicker from '~/components/home/NewArrivalsTicker.vue';
import ComfortCareSection from '~/components/home/ComfortCareSection.vue';
import HappyTailsSection from '~/components/home/HappyTailsSection.vue';
import PawsitiveReviewsSection from '~/components/home/PawsitiveReviewsSection.vue';
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
    <HappyTailsSection />
    <PawsitiveReviewsSection />
  </div>
</template>