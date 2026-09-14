<script setup lang="ts">
import { GraphQLClient } from 'graphql-request'
import { GET_CMS_PAGE_BY_SLUG } from '../../graphql/queries/cms'

const config = useRuntimeConfig()

const client = new GraphQLClient(
  config.public.vendureShopApiUrl as string,
)

const { data: termsPage } = await useAsyncData(
  'cms-terms-of-use',
  async () => {
    const response: any = await client.request(
      GET_CMS_PAGE_BY_SLUG,
      { slug: 'terms-of-use' },
      { 'cache-control': 'no-cache' },
    )

    return response.cmsPageBySlug
  },
)

const termsContent = computed(() => {
  const textSections = termsPage.value?.sections
    ?.filter((section: any) => section.type === 'text')
    ?.sort((a: any, b: any) => a.position - b.position) ?? []

  return textSections
    .map((section: any) => section.data?.publishedText)
    .filter((text: unknown): text is string =>
      typeof text === 'string' && text.trim().length > 0,
    )
})

useSeoMeta({
  title: () => termsPage.value?.title
    ? `${termsPage.value.title} | PetsUpRight`
    : 'Terms of Use | PetsUpRight',
})
</script>

<template>
  <main class="terms-page">
    <div class="terms-container">
      <h1>
        {{ termsPage?.title || 'Terms of Use' }}
      </h1>

      <div
        v-if="termsContent.length"
        class="terms-content"
      >
        <div
          v-for="(content, index) in termsContent"
          :key="index"
          class="terms-section"
        >
          {{ content }}
        </div>
      </div>

      <p
        v-else
        class="terms-empty"
      >
        Terms of Use content is currently unavailable.
      </p>
    </div>
  </main>
</template>

<style scoped>
.terms-page {
  min-height: 60vh;
  padding: 48px 20px 80px;
}

.terms-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.terms-container h1 {
  margin: 0 0 32px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.terms-section {
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 1.8;
}

.terms-empty {
  font-size: 16px;
}
</style>