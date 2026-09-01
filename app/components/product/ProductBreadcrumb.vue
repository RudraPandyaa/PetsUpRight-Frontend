<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li>
        <NuxtLink to="/" class="crumb">Home</NuxtLink>
      </li>
      <li class="sep">›</li>
      <li>
        <NuxtLink to="/shop" class="crumb">Shop</NuxtLink>
      </li>
      <li v-if="category" class="sep">›</li>
      <li v-if="category">
        <NuxtLink :to="categoryLink || '/shop'" class="crumb">
          {{ category }}
        </NuxtLink>
      </li>
      <li class="sep">›</li>
      <li class="crumb-current">{{ name }}</li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  category?: string
  categoryLink?: string
}>()
</script>

<style scoped>
.breadcrumb {
  font-family: 'Inter', system-ui, sans-serif;
  margin-bottom: 1rem;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.18rem;
}

.crumb {
  font-weight: 500; /* Inter Medium */
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s ease;
}

.crumb:hover {
  color: #44476f;
}

.sep {
  color: #d1d5db;
  font-weight: 400;
}

.crumb-current {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}
</style>