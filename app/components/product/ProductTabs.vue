<template>
  <section class="product-tabs mt-12 md:mt-16">
    <!-- Tab headers -->
    <div class="tab-headers">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content -->
    <div class="tab-content">
      <!-- Description -->
      <div v-show="activeTab === 'description'" class="tab-panel">
        <p class="desc-text">{{ description }}</p>
        <ul v-if="highlights.length" class="highlights">
          <li v-for="(item, i) in highlights" :key="i" class="highlight-item">
            <span class="check">✓</span>
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Ingredients -->
      <div v-show="activeTab === 'ingredients'" class="tab-panel">
        <p class="desc-text">{{ ingredients || 'Ingredients information coming soon.' }}</p>
      </div>

      <!-- Usage & Feeding -->
      <div v-show="activeTab === 'usage'" class="tab-panel">
        <p class="desc-text">{{ usage || 'Usage & feeding guidelines coming soon.' }}</p>
      </div>

      <!-- Specifications -->
      <div v-show="activeTab === 'specs'" class="tab-panel">
        <p class="desc-text">{{ specs || 'Specifications coming soon.' }}</p>
      </div>

      <!-- Shipping & Returns -->
      <div v-show="activeTab === 'shipping'" class="tab-panel">
        <p class="desc-text">{{ shipping || 'Free delivery on orders above ₹999. Easy 30-day returns.' }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    description?: string
    highlights?: string[]
    ingredients?: string
    usage?: string
    specs?: string
    shipping?: string
  }>(),
  {
    highlights: () => [],
  }
)

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'usage', label: 'Usage & Feeding' },
  { id: 'specs', label: 'Specifications' },
  { id: 'shipping', label: 'Shipping & Returns' },
]

const activeTab = ref('description')
</script>

<style scoped>
.tab-headers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
}

.tab-btn {
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
  flex: 1;
  text-align: center;
}

.tab-btn:hover {
  color: #44476f;
}

.tab-btn.active {
  color: #1a1a2e;
  font-weight: 600;
  border-bottom-color: #44476f;
}

.tab-content {
  padding: 1.5rem 0 0;
}

.tab-panel {
  max-width: 100%;
}

.desc-text {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 1rem;
  max-width: none;
}

.highlights {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 3rem;
  width: 100%;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #374151;
  line-height: 1.4;
}

.check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #C3B5DF;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  flex-shrink: 0;
  line-height: 1;
}

@media (max-width: 640px) {
  .highlights {
    grid-template-columns: 1fr;
  }

  .tab-btn {
    padding: 0.65rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>