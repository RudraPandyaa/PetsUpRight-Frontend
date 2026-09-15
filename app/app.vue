<script setup lang="ts">
const route = useRoute()

const isHeaderlessPage = computed(
  () =>
    route.path === '/login' ||
    route.path === '/register' ||
    route.path === '/checkout' ||
    route.path === '/verify'
)

const isAuthPage = computed(
  () =>
    route.path === '/login' ||
    route.path === '/register' ||
    route.path === '/checkout' ||
    route.path === '/verify'
)
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <LayoutAppHeader
      v-if="!isHeaderlessPage"
    />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <LayoutAppFooter
      v-if="!isAuthPage"
    />

  </div>
</template>