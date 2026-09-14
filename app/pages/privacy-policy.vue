<script setup lang="ts">
import { GraphQLClient } from 'graphql-request'
import { GET_CMS_PAGE_BY_SLUG } from '../../graphql/queries/cms'

const config = useRuntimeConfig()

const client = new GraphQLClient(
  config.public.vendureShopApiUrl as string,
)

const { data: privacyPage } = await useAsyncData(
  'cms-privacy-policy',
  async () => {
    const response: any = await client.request(
      GET_CMS_PAGE_BY_SLUG,
      { slug: 'privacy-policy' },
      { 'cache-control': 'no-cache' },
    )

    return response.cmsPageBySlug
  },
)

const privacyContent = computed(() => {
  const textSections = privacyPage.value?.sections
    ?.filter((section: any) => section.type === 'text')
    ?.sort((a: any, b: any) => a.position - b.position) ?? []

  return textSections
    .map((section: any) => section.data?.publishedText)
    .filter((text: unknown): text is string =>
      typeof text === 'string' && text.trim().length > 0,
    )
})

useSeoMeta({
  title: () => privacyPage.value?.title
    ? `${privacyPage.value.title} | PetsUpRight`
    : 'Privacy Policy | PetsUpRight',
})
</script>

<template>
  <main class="privacy-policy-page">
    <div class="privacy-policy-container">
      <h1>
        {{ privacyPage?.title || 'Privacy Policy' }}
      </h1>

      <div
        v-if="privacyContent.length"
        class="privacy-policy-content"
      >
        <div
          v-for="(content, index) in privacyContent"
          :key="index"
          class="privacy-policy-section"
        >
          {{ content }}
        </div>
      </div>

      <p
        v-else
        class="privacy-policy-empty"
      >
        Privacy Policy content is currently unavailable.
      </p>
    </div>
  </main>
</template>

<style scoped>
.privacy-policy-page {
  min-height: 60vh;
  padding: 48px 20px 80px;
}

.privacy-policy-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.privacy-policy-container h1 {
  margin: 0 0 32px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
}

.privacy-policy-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.privacy-policy-section {
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 1.8;
}

.privacy-policy-empty {
  font-size: 16px;
}
</style>