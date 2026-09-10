<script setup lang="ts">
const route = useRoute()

const isAuthPage = computed(
  () => route.path === '/login' || route.path === '/register' || route.path === '/checkout'
)

const isHeaderlessPage = computed(
  () => isAuthPage.value
)
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <LayoutAppHeader
      v-if="!isHeaderlessPage"
    />

    <main
      :class="[
        'flex-1',
        !isHeaderlessPage
      ]"
    >
      <NuxtPage />
    </main>

    <LayoutAppFooter
      v-if="!isAuthPage"
    />

  </div>
</template>