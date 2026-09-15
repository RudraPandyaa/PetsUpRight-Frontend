<script setup lang="ts">
const route = useRoute()

const isHeaderlessPage = computed(
  () =>
    route.path === '/login' ||
    route.path === '/register' ||
    route.path === '/checkout' ||
    route.path === '/verify' ||
    route.path === '/forgot-password' ||
    route.path === '/reset-password'
)

const isAuthPage = computed(
  () =>
    route.path === '/login' ||
    route.path === '/register' ||
    route.path === '/checkout' ||
    route.path === '/verify'  ||
    route.path === '/forgot-password' ||
    route.path === '/reset-password'
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