<template>
  <section class="customer-reviews mt-12 md:mt-16">
    <h2 class="section-title">Customer Reviews</h2>

    <div class="reviews-layout">
      <!-- LEFT: Summary -->
      <div class="summary-card">
        <div class="score">{{ averageRating }}</div>
        <div class="stars">
            <span
                v-for="i in 5"
                :key="i"
                class="star"
                :class="{
                full: i <= Math.floor(averageRating),
                half: i === Math.ceil(averageRating) && averageRating % 1 !== 0,
                empty: i > Math.ceil(averageRating)
                }"
            >★</span>
        </div>
        <p class="based-on">Based on {{ totalReviews.toLocaleString('en-IN') }} reviews</p>

        <div class="breakdown">
          <div
            v-for="item in ratingBreakdown"
            :key="item.stars"
            class="bar-row"
          >
            <span class="bar-label">{{ item.stars }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
            </div>
            <span class="bar-percent">{{ item.percent }}%</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Review list -->
      <div class="reviews-list">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="review-card"
        >
          <div class="review-header">
            <div class="stars small">
              <span v-for="i in 5" :key="i" class="star">★</span>
            </div>
            <span class="review-date">{{ review.date }}</span>
          </div>

          <h3 class="review-title">{{ review.title }}</h3>
          <p class="review-body">{{ review.body }}</p>
            <hr class="review-divider" />
          <div class="reviewer">
            <div class="avatar">{{ review.initials }}</div>
            <div class="reviewer-meta">
              <span class="reviewer-name">{{ review.name }}</span>
              <span v-if="review.verified" class="verified-badge">
                ✓ VERIFIED PURCHASE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const averageRating = 4.8
const totalReviews = 1250

const ratingBreakdown = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
]

const reviews = [
  {
    id: 1,
    title: 'Best decision for my Husky!',
    body: 'My dog had severe skin allergies before switching to this salmon diet. Within two weeks, her coat started looking much shinier and the scratching stopped. Highly recommend!',
    date: 'Oct 12, 2024',
    name: 'Rahul J.',
    initials: 'RJ',
    verified: true,
  },
]
</script>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #44476F;
  margin: 0 0 1.25rem;
}

.reviews-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* ===== LEFT SUMMARY ===== */
.summary-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem 1.25rem;
  text-align: center;
}

.score {
  font-size: 2.75rem;
  font-weight: 700;
  color: #44476F;
  line-height: 1.1;
}

.stars {
  color: #C3B5DF;
  font-size: 1rem;
  letter-spacing: 2px;
  margin: 0.35rem 0 0.5rem;
}

.star {
  color: #e5e7eb;
}

.star.full {
  color: #C3B5DF;
}

.stars.small {
  font-size: 0.85rem;
  letter-spacing: 1px;
  margin: 0;
}

.star.half {
  background: linear-gradient(90deg, #C3B5DF 50%, #e5e7eb 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.based-on {
  font-size: 0.8rem;
  color: #77767F;
  margin: 0 0 1.25rem;
}

.breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  text-align: left;
}

.bar-row {
  display: grid;
  grid-template-columns: 16px 1fr 32px;
  align-items: center;
  gap: 0.4rem;
}

.bar-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #44476F;
}

.bar-track {
  height: 6px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #44476F;
  border-radius: 99px;
}

.bar-percent {
  font-size: 0.75rem;
  color: #77767F;
  text-align: right;
}

/* ===== RIGHT REVIEWS ===== */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-date {
  font-size: 0.8rem;
  color: #77767F;
}

.review-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #44476F;
  margin: 0 0 0.4rem;
}

.review-body {
  font-size: 1rem;
  line-height: 1.6;
  color: #77767F;
  margin: 0 0 1rem;
}

.review-divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 1rem;
}

.reviewer {
    display: flex;
    padding: 0.45rem 0;
    align-items: center;
    gap: 0.65rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #C3B5DF;
  color: #44476F;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reviewer-meta {
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  gap: 0.25rem;
}

.reviewer-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #44476F;
  line-height: 1.2;
}

.verified-badge {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  background: #C3B5DF;
  color: #44476F;
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
  line-height: 1.2;
}

/* Responsive */
@media (max-width: 768px) {
  .reviews-layout {
    grid-template-columns: 1fr;
  }
}
</style>