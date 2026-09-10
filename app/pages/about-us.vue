<template>
  <main class="about-page">
    <section class="about-hero">
      <div
        v-if="aboutContent.heroImage"
        class="about-hero-background"
        :style="{ backgroundImage: `url(${aboutContent.heroImage})` }"
        aria-hidden="true"
      />
      <div v-if="aboutContent.heroImage" class="about-hero-overlay" aria-hidden="true" />
      <div class="about-hero-inner">
        <div class="about-copy">
          <p class="eyebrow">THE RIGHT WAY TO PET</p>
          <h1>Better care for<br /><span>happier companions.</span></h1>
          <p>
            PetsUpRight brings together thoughtful essentials for every stage of your pet's life, making everyday care feel simple, joyful, and a little more special.
          </p>
        </div>
        <div v-if="!aboutContent.heroImage" class="hero-image">
          <img src="/images/comfort-care/Dog.png" alt="Happy golden retriever" />
        </div>
      </div>
    </section>

    <section class="about-content">
      <div class="intro-block">
        <p class="eyebrow">WHY PETSUPRIGHT</p>
        <h2>Made for the moments<br />that matter.</h2>
        <p>
          From nourishing food and comfortable beds to playful toys and daily wellness essentials, we carefully choose products that help pets feel their best and help their people care with confidence.
        </p>
      </div>

      <PawsitiveReviewsSection :section="{ publishedReviews: aboutContent.reviews }" />

      <section class="about-callout">
        <div>
          <p class="eyebrow">A LITTLE MORE JOY</p>
          <h2>Because every wag,<br />purr, and cuddle counts.</h2>
        </div>
        <NuxtLink to="/shop" class="shop-link">
          Explore the collection
          <span aria-hidden="true">&#8594;</span>
        </NuxtLink>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { GraphQLClient } from 'graphql-request'
import PawsitiveReviewsSection from '~/components/home/PawsitiveReviewsSection.vue'

import { GET_CMS_PAGE_BY_SLUG } from '../../graphql/queries/cms'

const config = useRuntimeConfig()
const client = new GraphQLClient(config.public.vendureShopApiUrl as string)

const { data: aboutPage } = await useAsyncData('cms-about-us', async () => {
  const response: any = await client.request(
    GET_CMS_PAGE_BY_SLUG,
    { slug: 'about-us' },
    { 'cache-control': 'no-cache' },
  )
  return response.cmsPageBySlug
})

const aboutContent = computed(() => {
  const hero = aboutPage.value?.sections?.find((section: any) => section.type === 'hero')
  const reviews = aboutPage.value?.sections?.find((section: any) => section.type === 'pawsitive-reviews')
  const publishedImages = hero?.data?.publishedImages
  const firstPublishedImage = Array.isArray(publishedImages)
    ? publishedImages[0]
    : publishedImages

  return {
    heroImage: typeof firstPublishedImage === 'string'
      ? firstPublishedImage
      : firstPublishedImage?.source || firstPublishedImage?.preview || hero?.data?.publishedBannerImage || hero?.data?.bannerImage || '',
    reviews: Array.isArray(reviews?.data?.publishedReviews) && reviews.data.publishedReviews.length
      ? reviews.data.publishedReviews
      : [
          { name: 'Thoughtful choices', rating: 5, text: 'Useful, dependable products selected with real pet routines in mind.' },
          { name: 'Care first', rating: 5, text: 'Every recommendation starts with comfort, health, and happiness.' },
          { name: 'Every pet welcome', rating: 5, text: 'Essentials for different breeds, sizes, ages, personalities, and needs.' },
        ],
  }
})
</script>

<style scoped>
.about-page {
  background: #fff;
  color: #1a1a2e;
}

.about-hero {
  position: relative;
  overflow: hidden;
  background: #f8f6fb;
  border-bottom: 1px solid #eeeaf5;
}

.about-hero-background {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  opacity: 1;
}

.about-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(248, 246, 251, 0.72);
}

.about-hero-inner,
.about-content {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.about-hero-inner {
  position: relative;
  z-index: 1;
}

.about-hero-inner {
  min-height: 450px;
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  gap: 3rem;
  padding: 4rem 0;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #8465c8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

h1,
h2,
h3 {
  font-family: 'Paytone One', sans-serif;
  font-weight: 400;
  color: #44476f;
}

h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.05;
}

h1 span {
  color: #c3b5df;
}

.about-copy > p:last-child {
  max-width: 540px;
  margin: 1.5rem 0 0;
  color: #5a5a6e;
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-image {
  display: flex;
  align-items: end;
  justify-content: center;
  min-height: 350px;
}

.hero-image img {
  width: 100%;
  max-width: 360px;
  height: 360px;
  object-fit: contain;
}

.about-content {
  padding: 5rem 0 6rem;
}

.intro-block {
  max-width: 660px;
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
}

.intro-block > p:last-child {
  max-width: 620px;
  margin: 1.25rem 0 0;
  color: #6b7280;
  line-height: 1.8;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 3.5rem;
}

.value-card {
  padding: 1.5rem;
  border: 1px solid #e8e3f0;
  border-radius: 10px;
  background: #fff;
}

.value-number {
  color: #c3b5df;
  font-size: 0.8rem;
  font-weight: 700;
}

.value-card h3 {
  margin: 1.5rem 0 0.6rem;
  font-size: 1.35rem;
}

.review-stars {
  display: flex;
  gap: 2px;
  margin-bottom: 0.6rem;
  color: #d1d5db;
}

.review-stars .filled {
  color: #f5a623;
}

.value-card p {
  margin: 0;
  color: #6b7280;
  line-height: 1.65;
}

.about-callout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 4rem;
  padding: 2.5rem;
  border-radius: 12px;
  background: #44476f;
}

.about-callout h2 {
  color: #fff;
}

.shop-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 0.8rem 1rem 0.8rem 1.4rem;
  background: #c3b5df;
  color: #1a1a2e;
  font-weight: 700;
  text-decoration: none;
}

.shop-link span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
}

@media (max-width: 760px) {
  .about-hero-inner {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 3.5rem 0 2rem;
  }

  .hero-image {
    min-height: 250px;
  }

  .hero-image img {
    height: 260px;
  }

  .about-content {
    padding: 3.5rem 0 4rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
    margin-top: 2.5rem;
  }

  .about-callout {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 2.5rem;
    padding: 2rem;
  }
}
</style>
