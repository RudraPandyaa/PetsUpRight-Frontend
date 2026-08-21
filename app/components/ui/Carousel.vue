<script setup lang="ts">
import { computed } from 'vue'
import { useCarousel } from '~/composables/useCarousel'

const props = withDefaults(
  defineProps<{
    itemCount: number
    autoplayInterval?: number
    visibleCount?: number
  }>(),
  {
    autoplayInterval: 3500,
    visibleCount: 5,
  }
)

const {
  currentIndex,
  isDragging,
  dragOffset,
  goTo,
  onDragStart,
  onDragMove,
  onDragEnd,
} = useCarousel({
  itemCount: props.itemCount,
  autoplayInterval: props.autoplayInterval,
})

const slideWidth = computed(() => 100 / props.visibleCount)

const trackStyle = computed(() => {
  const base = -(currentIndex.value * slideWidth.value)
  const dragPercent = isDragging.value
    ? (dragOffset.value / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100
    : 0

  return {
    transform: `translateX(${base + dragPercent}%)`,
    transition: isDragging.value ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
  }
})
</script>

<template>
  <div class="relative overflow-hidden select-none cursor-grab active:cursor-grabbing">
    <div
      class="flex"
      :style="trackStyle"
      @mousedown.prevent="(e) => onDragStart(e.clientX)"
      @mousemove="(e) => onDragMove(e.clientX)"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
      @touchstart.passive="(e) => onDragStart(e.touches[0].clientX)"
      @touchmove.passive="(e) => onDragMove(e.touches[0].clientX)"
      @touchend="onDragEnd"
    >
      <!-- Har slide ko fixed width do -->
      <div
        v-for="(_, index) in itemCount"
        :key="index"
        class="shrink-0"
        :style="{ width: `${slideWidth}%` }"
      >
        <slot :name="`slide-${index}`" />

    </div>

    <!-- Dots -->
    <div class="flex justify-center gap-2 mt-8">
      <button
        v-for="i in itemCount"
        :key="i"
        type="button"
        class="h-2 rounded-full transition-all duration-300"
        :class="
          currentIndex === i - 1
            ? 'bg-[#44476f] w-6'
            : 'bg-[#d4c8e8] w-2 hover:bg-[#c3b5df]'
        "
        @click="goTo(i - 1)"
        :aria-label="`Go to slide ${i}`"
      />
      </div>
    </div>
  </div>
</template>