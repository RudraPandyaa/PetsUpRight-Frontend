<template>
  <section class="happy-tails">
    <!-- Header -->
    <div class="section-header">
      <div class="paw-icons">🐾</div>
      <h2 class="title">HAPPY TAILS</h2>
      <p class="subtitle">
        Catch our cutest customers trying toys, treats, beds, and more.
      </p>
    </div>

    <!-- Carousel -->
    <div class="carousel-wrapper">
      <!-- Left Button -->
      <button class="nav-btn prev" @click="scrollPrev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Track -->
      <div class="carousel-track" ref="trackRef">
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="video-card"
        >
          <div class="video-thumb">
            <img :src="video.thumb" :alt="video.title" />
            <button class="play-btn" @click="playVideo(index)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="8 5 19 12 8 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Button -->
      <button class="nav-btn next" @click="scrollNext" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <!-- Dots -->
    <div class="dots">
        <button
            v-for="(_, i) in (maxIndex + 1)"
            :key="i"
            class="dot"
            :class="{ active: currentIndex === i }"
            @click="goToPage(i)"
        />
    </div>
  </section>
</template>

<script setup lang="ts">
const trackRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const videos = ref([
  { title: 'Dog with ball', thumb: '/images/happy-tails/1.jpg' },
  { title: 'Cat with toy', thumb: '/images/happy-tails/2.jpg' },
  { title: 'Man with dog', thumb: '/images/happy-tails/3.jpg' },
  { title: 'Cat outdoor', thumb: '/images/happy-tails/4.jpg' },
  { title: 'Puppy play', thumb: '/images/happy-tails/5.jpg' },
  { title: 'Kitten fun', thumb: '/images/happy-tails/6.jpg' },
  { title: 'Dog park', thumb: '/images/happy-tails/7.jpg' },
])

const visibleCount = 4
const maxIndex = computed(() => Math.max(0, videos.value.length - visibleCount))

let autoScrollTimer: ReturnType<typeof setInterval> | null = null

function getCardWidth() {
  if (!trackRef.value) return 300
  const card = trackRef.value.querySelector('.video-card') as HTMLElement
  if (!card) return 300
  const style = window.getComputedStyle(trackRef.value)
  const gap = parseFloat(style.gap) || 16
  return card.offsetWidth + gap
}

function scrollToIndex(index: number) {
  if (!trackRef.value) return
  const width = getCardWidth()
  trackRef.value.scrollTo({
    left: index * width,
    behavior: 'smooth',
  })
  currentIndex.value = index
}

function scrollNext() {
  const next = currentIndex.value >= maxIndex.value ? 0 : currentIndex.value + 1
  scrollToIndex(next)
}

function scrollPrev() {
  const prev = currentIndex.value <= 0 ? maxIndex.value : currentIndex.value - 1
  scrollToIndex(prev)
}

function goToPage(i: number) {
  scrollToIndex(i)
}

function startAutoScroll() {
  stopAutoScroll()
  autoScrollTimer = setInterval(scrollNext, 3500)
}

function stopAutoScroll() {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer)
    autoScrollTimer = null
  }
}

onMounted(() => {
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<style scoped>
.happy-tails {
  margin: 0 auto;
  padding: 4rem 3rem;
  background: #ffffff;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.paw-icons {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color:  #c3b5df;
}

.title {
  font-family: 'Paytone One', sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #44476f;
  margin: 0 0 0.5rem;
  letter-spacing: 0.03em;
}

.subtitle {
  font-size: 20px;
  color: #6b7280;
  margin: 0;
  max-width: 560px;
  margin-inline: auto;
}

/* Carousel */
.carousel-wrapper {
  position: relative;
  width: 100%;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: smooth;
  scrollbar-width: none;
  flex: 1;
  padding: 0.25rem 0;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.video-card {
  flex: 0 0 calc((100% - 3rem) / 4);
  min-width: 240px;
  scroll-snap-align: start;
}

.video-thumb {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 0;
  overflow: hidden;
  background: #ede7e7;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #44476f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.play-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background: #fff;
}

/* Nav buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #44476f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.nav-btn.prev {
  left: -12px;
}

.nav-btn.next {
  right: -12px;
}
.nav-btn:hover {
  background: #f8f6fb;
  box-shadow: 0 2px 8px rgba(68, 71, 111, 0.15);
}

/* Dots */
.dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease;
}

.dot.active {
  background: #44476f;
}

/* Responsive */
@media (max-width: 900px) {
  .video-card {
    flex: 0 0 calc(33.333% - 0.75rem);
  }
}

@media (max-width: 600px) {
  .video-card {
    flex: 0 0 calc(50% - 0.5rem);
  }

  .nav-btn {
    display: none;
  }

  .happy-tails {
    padding: 3rem 1rem;
  }
}
</style>