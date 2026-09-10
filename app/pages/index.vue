<script setup lang="ts">
import { GraphQLClient } from 'graphql-request';

import HeroSection from '~/components/home/HeroSection.vue';
import CategoriesSection from '~/components/home/CategoriesSection.vue';
import NewArrivalsSection from '~/components/home/NewArrivalsSection.vue';
import NewArrivalsTicker from '~/components/home/NewArrivalsTicker.vue';
import ComfortCareSection from '~/components/home/ComfortCareSection.vue';
import HappyTailsSection from '~/components/home/HappyTailsSection.vue';
import PawsitiveReviewsSection from '~/components/home/PawsitiveReviewsSection.vue';

import { GET_CMS_PAGE_BY_SLUG } from '../../graphql/queries/cms';

const reviews = [
  { name: 'Priya S.', text: 'My dog absolutely loves the food. Quality is outstanding!' },
  { name: 'Rahul M.', text: 'Fast delivery and great packaging. Highly recommend.' },
  { name: 'Ananya K.', text: 'Best pet store experience. Will order again soon.' },
]

const config = useRuntimeConfig();

const client = new GraphQLClient(
  config.public.vendureShopApiUrl as string,
);

const { data: cmsPage, error: cmsError } = await useAsyncData(
  'cms-home',
  async () => {
    const response: any = await client.request(
      GET_CMS_PAGE_BY_SLUG,
      {
        slug: 'home',
      },
    );

    return response.cmsPageBySlug;
  },
);

const heroSection = computed(() =>
  cmsPage.value?.sections?.find(
    (section: any) => section.type === 'hero',
  ),
);
const happyTailsSection = computed(() =>
  cmsPage.value?.sections?.find(
    (section: any) => section.type === 'happy-tails',
  ),
);
const pawsitiveReviewsSection = computed(() =>
  cmsPage.value?.sections?.find(
    (section: any) => section.type === 'pawsitive-reviews',
  ),
);
console.log('CMS PAGE:', cmsPage.value);
console.log('CMS ERROR:', cmsError.value);
</script>

<template>
  <div>
    <HeroSection
      :banner-images="heroSection?.data?.publishedImages?.length
        ? heroSection.data.publishedImages
        : heroSection?.data?.publishedBannerImage
          ? [heroSection.data.publishedBannerImage]
          : undefined"
    />
    <CategoriesSection />
    <NewArrivalsSection />
    <NewArrivalsTicker />
    <ComfortCareSection />
    <HappyTailsSection :section="happyTailsSection?.data" />
    <PawsitiveReviewsSection :section="pawsitiveReviewsSection?.data" />
  </div>
</template>