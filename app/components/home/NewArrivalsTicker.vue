<template>
  <div class="ticker-wrapper">
    <div class="ticker-track">
      <!-- Duplicate the content multiple times for seamless infinite loop -->
      <div
        v-for="n in 4"
        :key="n"
        class="ticker-content"
      >
        <span v-for="i in 8" :key="i" class="ticker-item">
          NEW ARRIVALS
          <span class="dot">•</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed – pure CSS infinite animation
</script>

<style scoped>
.ticker-wrapper {
  width: 100%;
  overflow: hidden;
  background-color: #44476f; /* Brand dark navy */
  padding: 12px 0;
  white-space: nowrap;
  position: relative;
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: scroll-left 25s linear infinite;
}

/* Pause on hover (optional) */
.ticker-wrapper:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-content {
  display: flex;
  flex-shrink: 0;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0 8px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dot {
  margin-left: 16px;
  margin-right: 8px;
  color: #c3b5df; /* Brand light purple */
  opacity: 1;
}

/* Continuous right → left movement */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-25%);
  }
}

@media (min-width: 1400px) {
  .ticker-track {
    animation-duration: 30s;
  }
}
</style>