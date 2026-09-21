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

    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Chat on WhatsApp">
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  color: #FFF;
  border-radius: 50px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.whatsapp-float:hover {
  transform: scale(1.1);
}
</style>