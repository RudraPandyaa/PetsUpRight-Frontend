<script setup lang="ts">
const route = useRoute()

const isLoginPage = computed(
  () => route.path === '/login'
)
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <LayoutAppHeader
      v-if="!isLoginPage"
    />

    <main
      :class="[
        'flex-1',
        !isLoginPage
            ? 'pt-[144px] md:pt-[168px] lg:pt-[116px]'
          : ''
      ]"
    >
      <NuxtPage />
    </main>

    <LayoutAppFooter
      v-if="!isLoginPage"
    />

  </div>
</template>