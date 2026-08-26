<template>
  <section class="pawsitive-reviews container mx-auto px-4">
    <!-- Header -->
    <div class="section-header">
      <div class="paw-icons">🐾</div>
      <h2 class="title">PAWSITIVE REVIEWS</h2>
    </div>

    <!-- Carousel -->
    <div
      class="reviews-wrapper"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <!-- Left Button -->
      <button
        class="nav-btn prev"
        @click="goPrev"
        aria-label="Previous review"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Viewport -->
      <div class="reviews-viewport" ref="viewportRef">
        <div
          class="reviews-track"
          :style="trackStyle"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointerleave="onPointerUp"
          @pointercancel="onPointerUp"
        >
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="review-card"
          >
            <h3 class="reviewer-name">{{ review.name }}</h3>

            <div class="stars">
              <span
                v-for="i in 5"
                :key="i"
                class="star"
                :class="{ filled: i <= Math.floor(review.rating) }"
              >★</span>
            </div>

            <p class="review-text">"{{ review.text }}"</p>
          </div>
        </div>
      </div>

      <!-- Right Button -->
      <button
        class="nav-btn next"
        @click="goNext"
        aria-label="Next review"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <!-- Optional dots -->
    <div class="dots">
      <button
        v-for="i in maxIndex + 1"
        :key="i"
        class="dot"
        :class="{ active: currentIndex === i - 1 }"
        @click="goTo(i - 1)"
        :aria-label="`Go to review set ${i}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const viewportRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isDragging = ref(false)
const dragOffset = ref(0)
const startX = ref(0)
const isTransitioning = ref(false)

const reviews = ref([
  {
    name: 'Ananya Patel',
    rating: 4,
    text: 'Excellent products and great customer service. The collar fits perfectly, and the quality exceeded my expectations. Highly recommended!',
  },
  {
    name: 'Rahul Mehta',
    rating: 4,
    text: 'The pet bed is soft, comfortable, and exactly as shown. My dog started using it right away. Great shopping experience overall!',
  },
  {
    name: 'Tanvi Sharma',
    rating: 5,
    text: 'Amazing quality and super fast delivery! My Golden Retriever absolutely loves the treats, and the toys are durable too. Will definitely order again!',
  },
  {
    name: 'Priya Singh',
    rating: 5,
    text: 'Loved the grooming kit. My cat looks so fresh and the brushes are gentle on her skin. Will buy again soon!',
  },
  {
    name: 'Amit Verma',
    rating: 4,
    text: 'Good quality leashes and collars. Delivery was on time and packaging was neat. Happy with the purchase.',
  },
  {
    name: 'Sneha Kapoor',
    rating: 5,
    text: 'Best pet store experience! The treats are healthy and my dog is obsessed. Fast shipping too.',
  },
])

const visibleCount = ref(3)
const gap = 20 // px – matches CSS gap

const maxIndex = computed(() => Math.max(0, reviews.value.length - visibleCount.value))

const trackStyle = computed(() => {
  if (!viewportRef.value) {
    return { transform: 'translateX(0px)', transition: 'none' }
  }

  const viewportWidth = viewportRef.value.offsetWidth - 6 // account for the 3px padding on each side
  const cardWidth = (viewportWidth - (visibleCount.value - 1) * gap) / visibleCount.value
  const offset = currentIndex.value * (cardWidth + gap)

  return {
    transform: `translateX(${-offset + dragOffset.value}px)`,
    transition: isDragging.value || !isTransitioning.value
      ? 'none'
      : 'transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)',
  }
})

function updateVisibleCount() {
  const w = window.innerWidth
  if (w < 600) visibleCount.value = 1
  else if (w < 900) visibleCount.value = 2
  else visibleCount.value = 3

  // clamp index
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value
  }
}

function goTo(index: number) {
  isTransitioning.value = true
  currentIndex.value = Math.max(0, Math.min(index, maxIndex.value))
  // reset transition flag after animation
  setTimeout(() => {
    isTransitioning.value = false
  }, 560)
}

function goNext() {
  const next = currentIndex.value >= maxIndex.value ? 0 : currentIndex.value + 1
  goTo(next)
  restartAutoplay()
}

function goPrev() {
  const prev = currentIndex.value <= 0 ? maxIndex.value : currentIndex.value - 1
  goTo(prev)
  restartAutoplay()
}

/* ===== Drag / Swipe ===== */
function onPointerDown(e: PointerEvent) {
  if (!viewportRef.value) return
  isDragging.value = true
  startX.value = e.clientX
  dragOffset.value = 0
  pauseAutoplay()
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  dragOffset.value = e.clientX - startX.value
}

function onPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false

  const threshold = 60 // px to change slide
  if (dragOffset.value < -threshold) {
    goNext()
  } else if (dragOffset.value > threshold) {
    goPrev()
  } else {
    // snap back
    isTransitioning.value = true
    dragOffset.value = 0
    setTimeout(() => (isTransitioning.value = false), 560)
  }

  dragOffset.value = 0
  resumeAutoplay()
}

/* ===== Autoplay ===== */
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    goNext()
  }, 4200)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function pauseAutoplay() {
  stopAutoplay()
}

function resumeAutoplay() {
  startAutoplay()
}

function restartAutoplay() {
  stopAutoplay()
  startAutoplay()
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
  stopAutoplay()
})
</script>

<style scoped>
.pawsitive-reviews {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: #ffffff;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.paw-icons {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #c3b5df;
}

.title {
  font-family: 'Paytone One', sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #44476f;
  margin: 0;
  letter-spacing: 0.04em;
}

/* Wrapper */
.reviews-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reviews-viewport {
  flex: 1;
  overflow: hidden;
  /* optional soft mask on edges */
  mask-image: linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%);
  padding: 0 3px;
}

.reviews-track {
  display: flex;
  gap: 20px; /* matches JS gap */
  will-change: transform;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y; /* allow vertical scroll on mobile */
}

.reviews-track:active {
  cursor: grabbing;
}

/* Card */
.review-card {
  flex: 0 0 calc((100% - 40px) / 3);   /* 3 cards + 2 gaps */
  border: 2px solid #44476f;
  padding: 1.5rem 1.6rem;
  text-align: center;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* Force the border to stay sharp */
  background-clip: padding-box;
}

.reviewer-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.4rem;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 0.85rem;
}

.star {
  font-size: 1rem;
  color: #d1d5db;
}

.star.filled {
  color: #f5a623;
}

.review-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
  flex-grow: 1;
}

/* Nav buttons */
.nav-btn {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #fff;
  border: 1.5px solid #d1d5db;
  color: #44476f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.nav-btn:hover {
  background: #f8f6fb;
  box-shadow: 0 3px 10px rgba(68, 71, 111, 0.14);
  transform: scale(1.05);
}

.nav-btn:active {
  transform: scale(0.96);
}

/* Dots */
.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1.75rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;
}

.dot.active {
  background: #44476f;
  transform: scale(1.25);
}

/* Responsive */
@media (max-width: 900px) {
  .review-card {
    flex: 0 0 calc((100% - 20px) / 2); /* 1 gap */
  }
}

@media (max-width: 600px) {
  .review-card {
    flex: 0 0 100%;
  }

  .nav-btn {
    display: none;
  }

  .pawsitive-reviews {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>