<template>
  <section class="customer-reviews mt-12 md:mt-16">
    <h2 class="section-title">Customer Reviews</h2>

    <div v-if="loading" class="review-message">
      Loading reviews...
    </div>

    <template v-else>
      <div class="reviews-layout">
        <!-- LEFT: Dynamic rating summary -->
        <div class="summary-card">
          <div class="score">
            {{ averageRating.toFixed(1) }}
          </div>

          <div class="stars">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{
                full: star <= Math.floor(averageRating),
                half:
                  star === Math.ceil(averageRating) &&
                  averageRating % 1 !== 0,
                empty: star > Math.ceil(averageRating),
              }"
            >
              ★
            </span>
          </div>

          <p class="based-on">
            Based on
            {{ totalReviews.toLocaleString('en-IN') }}
            {{ totalReviews === 1 ? 'review' : 'reviews' }}
          </p>

          <div class="breakdown">
            <div
              v-for="item in ratingBreakdown"
              :key="item.stars"
              class="bar-row"
            >
              <span class="bar-label">
                {{ item.stars }}
              </span>

              <div class="bar-track">
                <div
                  class="bar-fill"
                  :style="{ width: `${item.percent}%` }"
                />
              </div>

              <span class="bar-percent">
                {{ item.percent }}%
              </span>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="reviews-content">
          <!-- Review eligibility/loading -->
          <div
            v-if="eligibilityLoading"
            class="review-message"
          >
            Checking review eligibility...
          </div>

          <!-- Guest -->
          <div
            v-else-if="eligibility?.reason === 'LOGIN_REQUIRED'"
            class="write-review-card"
          >
            <h3>Purchased this product?</h3>

            <p>
              Sign in using the account that placed the
              order to write a review.
            </p>

            <button
              type="button"
              class="review-button"
              @click="goToLogin"
            >
              SIGN IN TO REVIEW
            </button>
          </div>

          <!-- Product not delivered -->
          <div
            v-else-if="
              eligibility?.reason ===
              'PRODUCT_NOT_DELIVERED'
            "
            class="write-review-card"
          >
            <h3>Want to review this product?</h3>

            <p>
              Reviews can be submitted after an order
              containing this product has been delivered.
            </p>
          </div>

          <!-- Customer account unavailable -->
          <div
            v-else-if="
              eligibility?.reason ===
              'CUSTOMER_NOT_FOUND'
            "
            class="write-review-card"
          >
            <h3>Customer account unavailable</h3>

            <p>
              Please sign out and sign in again before
              submitting a review.
            </p>
          </div>

          <!-- Existing review -->
          <div
            v-else-if="
              eligibility?.reason === 'ALREADY_REVIEWED'
            "
            class="write-review-card"
          >
            <!-- Pending -->
            <template
              v-if="
                eligibility.existingReview?.status === 'PENDING'
              "
            >
              <h3>Thanks for your review!</h3>

              <p>
                Your review has been submitted and is awaiting
                approval. The product rating will update once your
                review is approved.
              </p>
            </template>

            <!-- Approved -->
            <template
              v-else-if="
                eligibility.existingReview?.status === 'APPROVED'
              "
            >
              <h3>Your review is published</h3>

              <p>
                Your review is visible below and is included in this
                product's average rating.
              </p>
            </template>

            <!-- Rejected -->
            <template
              v-else-if="
                eligibility.existingReview?.status === 'REJECTED'
              "
            >
              <h3>Your review was not approved</h3>

              <p>
                Your review is not publicly visible. Please contact
                support if you believe this was a mistake.
              </p>
            </template>
          </div>

          <!-- Eligible review form -->
          <form
            v-else-if="eligibility?.canReview"
            class="write-review-card review-form"
            @submit.prevent="submitReview"
          >
            <h3>Write a Review</h3>

            <p>
              Share your experience with other pet parents.
            </p>

            <div class="form-group">
              <label>Your rating</label>

              <div
                class="rating-selector"
                aria-label="Select rating"
              >
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  class="rating-star"
                  :class="{
                    selected: star <= reviewForm.rating,
                  }"
                  :aria-label="`${star} star rating`"
                  @click="reviewForm.rating = star"
                >
                  ★
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="review-title">
                Review title
              </label>

              <input
                id="review-title"
                v-model.trim="reviewForm.title"
                type="text"
                maxlength="120"
                placeholder="Give your review a title"
                required
              />
            </div>

            <div class="form-group">
              <label for="review-body">
                Your review
              </label>

              <textarea
                id="review-body"
                v-model.trim="reviewForm.body"
                minlength="10"
                maxlength="5000"
                rows="5"
                placeholder="Tell us about your experience"
                required
              />
            </div>

            <p
              v-if="formError"
              class="form-error"
            >
              {{ formError }}
            </p>

            <button
              type="submit"
              class="review-button"
              :disabled="submitting"
            >
              {{
                submitting
                  ? 'SUBMITTING...'
                  : 'SUBMIT REVIEW'
              }}
            </button>
          </form>

          <!-- Approved review list -->
          <div
            v-if="reviews.length"
            class="reviews-list"
          >
            <div
              v-for="review in reviews"
              :key="review.id"
              class="review-card"
            >
              <div class="review-header">
                <div class="stars small">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="star"
                    :class="{
                      full: star <= review.rating,
                    }"
                  >
                    ★
                  </span>
                </div>

                <span class="review-date">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>

              <h3 class="review-title">
                {{ review.title }}
              </h3>

              <p class="review-body">
                {{ review.body }}
              </p>

              <hr class="review-divider" />

              <div class="reviewer">
                <div class="avatar">
                  {{ getInitials(review.customerName) }}
                </div>

                <div class="reviewer-meta">
                  <span class="reviewer-name">
                    {{ review.customerName }}
                  </span>

                  <span
                    v-if="review.verifiedPurchase"
                    class="verified-badge"
                  >
                    ✓ VERIFIED PURCHASE
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="review-message"
          >
            No approved reviews yet.
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
interface Review {
  id: string
  createdAt: string
  rating: number
  title: string
  body: string
  customerName: string
  verifiedPurchase: boolean
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

interface Eligibility {
  canReview: boolean
  reason:
    | 'LOGIN_REQUIRED'
    | 'CUSTOMER_NOT_FOUND'
    | 'PRODUCT_NOT_DELIVERED'
    | 'ALREADY_REVIEWED'
    | null
  existingReview: Review | null
}

const props = defineProps<{
  productId: string
}>()

const emit = defineEmits<{
  (
    event: 'rating-updated',
    value: {
      averageRating: number
      totalReviews: number
    },
  ): void
}>()

const { client } = useVendure()
const route = useRoute()

const PRODUCT_REVIEWS_QUERY = `
  query ProductReviews(
    $productId: ID!
    $skip: Int
    $take: Int
  ) {
    productReviews(
      productId: $productId
      skip: $skip
      take: $take
    ) {
      totalItems
      averageRating

      ratingCounts {
        rating
        count
      }

      items {
        id
        createdAt
        rating
        title
        body
        customerName
        verifiedPurchase
        status
      }
    }
  }
`

const REVIEW_ELIGIBILITY_QUERY = `
  query ProductReviewEligibility(
    $productId: ID!
  ) {
    productReviewEligibility(
      productId: $productId
    ) {
      canReview
      reason

      existingReview {
        id
        createdAt
        rating
        title
        body
        customerName
        verifiedPurchase
        status
      }
    }
  }
`

const SUBMIT_REVIEW_MUTATION = `
  mutation SubmitProductReview(
    $input: SubmitProductReviewInput!
  ) {
    submitProductReview(input: $input) {
      id
      createdAt
      rating
      title
      body
      customerName
      verifiedPurchase
      status
    }
  }
`

const reviews = ref<Review[]>([])
const averageRating = ref(0)
const totalReviews = ref(0)

const ratingCounts = ref<
  Array<{
    rating: number
    count: number
  }>
>([])

const eligibility = ref<Eligibility | null>(null)

const loading = ref(true)
const eligibilityLoading = ref(true)
const submitting = ref(false)
const formError = ref('')

const reviewForm = reactive({
  rating: 0,
  title: '',
  body: '',
})

const ratingBreakdown = computed(() => {
  return [5, 4, 3, 2, 1].map(stars => {
    const rating = ratingCounts.value.find(
      item => item.rating === stars
    )

    const count = rating?.count ?? 0

    const percent =
      totalReviews.value > 0
        ? Math.round(
            (count / totalReviews.value) * 100
          )
        : 0

    return {
      stars,
      count,
      percent,
    }
  })
})

async function loadReviews() {
  loading.value = true

  try {
    const response: any = await client.request(
      PRODUCT_REVIEWS_QUERY,
      {
        productId: props.productId,
        skip: 0,
        take: 20,
      }
    )

    const result = response.productReviews

    reviews.value = result?.items ?? []
    averageRating.value = Number(
      result?.averageRating ?? 0
    )
    totalReviews.value = Number(
      result?.totalItems ?? 0
    )
    ratingCounts.value =
      result?.ratingCounts ?? []

    emit('rating-updated', {
      averageRating: averageRating.value,
      totalReviews: totalReviews.value,
    })

  } catch (error) {
    console.error(
      'Unable to load product reviews:',
      error
    )

    reviews.value = []
    averageRating.value = 0
    totalReviews.value = 0
    ratingCounts.value = []

    emit('rating-updated', {
      averageRating: 0,
      totalReviews: 0,
    })
  } finally {
    loading.value = false
  }
}

async function loadEligibility() {
  eligibilityLoading.value = true

  try {
    const response: any = await client.request(
      REVIEW_ELIGIBILITY_QUERY,
      {
        productId: props.productId,
      }
    )

    eligibility.value =
      response.productReviewEligibility
  } catch (error) {
    console.error(
      'Unable to check review eligibility:',
      error
    )

    eligibility.value = {
      canReview: false,
      reason: 'LOGIN_REQUIRED',
      existingReview: null,
    }
  } finally {
    eligibilityLoading.value = false
  }
}

async function submitReview() {
  formError.value = ''

  if (
    !Number.isInteger(reviewForm.rating) ||
    reviewForm.rating < 1 ||
    reviewForm.rating > 5
  ) {
    formError.value =
      'Please select a rating between 1 and 5.'

    return
  }

  if (
    reviewForm.title.length < 3 ||
    reviewForm.title.length > 120
  ) {
    formError.value =
      'The title must contain between 3 and 120 characters.'

    return
  }

  if (
    reviewForm.body.length < 10 ||
    reviewForm.body.length > 5000
  ) {
    formError.value =
      'The review must contain between 10 and 5000 characters.'

    return
  }

  submitting.value = true

  try {
    await client.request(
      SUBMIT_REVIEW_MUTATION,
      {
        input: {
          productId: props.productId,
          rating: reviewForm.rating,
          title: reviewForm.title,
          body: reviewForm.body,
        },
      }
    )

    reviewForm.rating = 0
    reviewForm.title = ''
    reviewForm.body = ''

    await Promise.all([
      loadReviews(),
      loadEligibility(),
    ])
  } catch (error: any) {
    console.error(
      'Unable to submit product review:',
      error
    )

    formError.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Unable to submit your review.'
  } finally {
    submitting.value = false
  }
}

function goToLogin() {
  navigateTo({
    path: '/login',
    query: {
      redirect: route.fullPath,
    },
  })
}

function formatDate(value: string) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}


function getInitials(name: string) {
  return String(name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
}

async function loadReviewSection() {
  await Promise.all([
    loadReviews(),
    loadEligibility(),
  ])
}

onMounted(loadReviewSection)

watch(
  () => props.productId,
  () => {
    void loadReviewSection()
  }
)
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

.reviews-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.review-message,
.write-review-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  color: #77767f;
}

.write-review-card h3 {
  margin: 0 0 0.4rem;
  color: #44476f;
  font-size: 1.1rem;
  font-weight: 700;
}

.write-review-card p {
  margin: 0 0 1rem;
  line-height: 1.5;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  color: #44476f;
  font-size: 0.875rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: 1px solid #d9dbe3;
  border-radius: 0.6rem;
  padding: 0.75rem;
  color: #44476f;
  background: #ffffff;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #44476f;
}

.rating-selector {
  display: flex;
  gap: 0.2rem;
}

.rating-star {
  border: none;
  background: transparent;
  padding: 0;
  color: #e5e7eb;
  cursor: pointer;
  font-size: 1.8rem;
}

.rating-star.selected {
  color: #c3b5df;
}

.review-button {
  width: fit-content;
  border: 1px solid #44476f;
  border-radius: 0.5rem;
  background: #44476f;
  color: #ffffff;
  padding: 0.7rem 1rem;
  font-weight: 700;
  cursor: pointer;
}

.review-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.form-error {
  color: #dc2626 !important;
  font-size: 0.875rem;
  margin: 0 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .reviews-layout {
    grid-template-columns: 1fr;
  }
}
</style>