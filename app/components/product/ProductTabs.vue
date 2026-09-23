<template>
  <section v-if="tabs.length" class="product-tabs mt-12 md:mt-16">
    <div class="tab-headers">
      <button v-for="tab in tabs" :key="tab.id" type="button" class="tab-btn" :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id">
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <!-- Description -->
      <div v-if="hasDescription" v-show="activeTab === 'description'" class="tab-panel">
        <p class="desc-text">
          {{ description }}
        </p>
      </div>

      <!-- Ingredients -->
      <div v-if="showIngredients" v-show="activeTab === 'ingredients'" class="tab-panel">
        <ul class="ingredient-list">
          <li v-for="(ingredient, index) in ingredients" :key="`${ingredient}-${index}`" class="ingredient-item">
            <span class="check">✓</span>
            <span>{{ ingredient }}</span>
          </li>
        </ul>
      </div>

      <!-- Usage & Feeding -->
      <div v-if="showUsage" v-show="activeTab === 'usage'" class="tab-panel">
        <p class="desc-text">
          {{ usage }}
        </p>
      </div>

      <!-- Specifications -->
      <div v-if="hasSpecifications" v-show="activeTab === 'specs'" class="tab-panel">
        <p class="desc-text">
          {{ specs }}
        </p>
      </div>

      <!-- Shipping & Returns -->
      <div v-show="activeTab === 'shipping'" class="tab-panel">
        <p class="desc-text">
          Free delivery on orders above ₹999. Products can be returned within
          30 days according to our return and refund policy.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TabId =
  | 'description'
  | 'ingredients'
  | 'usage'
  | 'specs'
  | 'shipping'

const props = withDefaults(
  defineProps<{
    description?: string
    isFood?: boolean
    ingredients?: string[]
    usage?: string
    specs?: string
  }>(),
  {
    description: '',
    isFood: false,
    ingredients: () => [],
    usage: '',
    specs: '',
  }
)

const hasDescription = computed(() => {
  return props.description.trim().length > 0
})

const showIngredients = computed(() => {
  return props.isFood && props.ingredients.length > 0
})

const showUsage = computed(() => {
  return props.isFood && props.usage.trim().length > 0
})

const hasSpecifications = computed(() => {
  return props.specs.trim().length > 0
})

const tabs = computed<Array<{ id: TabId; label: string }>>(() => {
  const visibleTabs: Array<{ id: TabId; label: string }> = []

  if (hasDescription.value) {
    visibleTabs.push({
      id: 'description',
      label: 'Description',
    })
  }

  if (showIngredients.value) {
    visibleTabs.push({
      id: 'ingredients',
      label: 'Ingredients',
    })
  }

  if (showUsage.value) {
    visibleTabs.push({
      id: 'usage',
      label: 'Usage & Feeding',
    })
  }

  if (hasSpecifications.value) {
    visibleTabs.push({
      id: 'specs',
      label: 'Specifications',
    })
  }

  visibleTabs.push({
    id: 'shipping',
    label: 'Shipping & Returns',
  })

  return visibleTabs
})

const activeTab = ref<TabId>('description')

watch(
  tabs,
  visibleTabs => {
    const activeTabStillExists = visibleTabs.some(
      tab => tab.id === activeTab.value
    )

    if (!activeTabStillExists && visibleTabs.length) {
      activeTab.value = visibleTabs[0].id
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.tab-headers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  flex: 1;
  min-width: 140px;
  margin-bottom: -1px;
  padding: 0.75rem 0.5rem;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
}

.tab-btn:hover {
  color: #44476f;
}

.tab-btn.active {
  border-bottom-color: #44476f;
  color: #1a1a2e;
  font-weight: 600;
}

.tab-content {
  padding-top: 1.5rem;
}

.tab-panel {
  width: 100%;
}

.desc-text {
  max-width: none;
  margin: 0 0 1rem;
  color: #4b5563;
  font-size: 1.2rem;
  line-height: 1.7;
  white-space: pre-line;
}

.ingredient-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 3rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ingredient-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #374151;
  font-size: 1.1rem;
  line-height: 1.4;
}

.check {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #c3b5df;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 640px) {
  .ingredient-list {
    grid-template-columns: 1fr;
  }

  .tab-btn {
    min-width: 50%;
    padding: 0.65rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>