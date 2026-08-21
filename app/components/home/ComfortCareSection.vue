<template>
  <section class="comfort-care">
    <!-- ========== ROW 1: Intro (WHERE COMFORT MEETS CARE) ========== -->
    <div class="intro-row">
      <div class="intro-card">
        <h2 class="intro-title">
          WHERE COMFORT<br />MEETS CARE
        </h2>
        <p class="intro-desc">
          Treat your furry companions to <strong>premium essentials</strong> thoughtfully
          designed for comfort, health, and happiness. From
          <strong>wholesome nutrition</strong> and cosy bedding to interactive toys, stylish
          accessories, and daily care products, every item in our collection is carefully
          selected to <strong>enrich your pet's life</strong>. Because every wagging tail and
          gentle purr deserves nothing less than the very best.
        </p>
      </div>

      <div class="intro-image-wrap">
        <img
          src="/images/husky.png"
          alt="Happy husky"
          class="intro-dog"
        />
        <button class="arrow-btn" aria-label="Explore">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ========== ROW 2: Dog + Grooming + Food ========== -->
    <div class="row row-2">
      <!-- Black dog illustration -->
      <div class="dog-illustration">
        <img
          src="/images/black-dog.jpg"
          alt="Black dog"
          class="dog-img"
        />
      </div>

      <!-- Premium Grooming -->
      <div class="card">
        <div class="card-text">
          <h3>Premium Grooming</h3>
          <p>
            Gentle grooming essentials designed to keep your
            beloved pet <strong>clean, healthy,</strong> and looking
            their very best every day. From nourishing shampoos
            and soft brushes to <strong>skin-friendly</strong> care.
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/categories/grooming.jpg"
            alt="Grooming tools"
          />
        </div>
      </div>

      <!-- Premium quality food -->
      <div class="card">
        <div class="card-text">
          <h3>Premium quality<br />food</h3>
          <p>
            Wholesome <strong>nutrition</strong> made with quality
            ingredients for a healthy, happy life.
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/categories/dry-food.jpg"
            alt="Dog food"
          />
        </div>
      </div>
    </div>

    <!-- ========== ROW 3: Health + Beds + Toys ========== -->
    <div class="row row-3">
      <!-- Health Essentials -->
      <div class="card">
        <div class="card-img">
          <img
            src="/images/icons/health.png"
            alt="Health essentials"
          />
        </div>
        <div class="card-text">
          <h3>Health Essentials</h3>
          <p>
            Everything your pet needs to stay healthy, active and
            happy with <strong>carefully</strong> selected wellness
            essentials.
          </p>
        </div>
      </div>

      <!-- Premium Beds -->
      <div class="card">
        <div class="card-text">
          <h3>Premium<br />Beds</h3>
          <span class="badge badge-purple">Premium Bed</span>
          <p>
            Our <strong>premium Beds</strong> are designed for
            <strong>more comfort</strong>, and is a perfect place for
            relex.
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/categories/beds.jpg"
            alt="Dog bed"
          />
        </div>
      </div>

      <!-- Dog Toys -->
      <div class="card">
        <div class="card-text">
          <h3>Dog Toys</h3>
          <span class="badge badge-yellow">Get a free toy</span>
          <p>
            Our toughest toys for your
            <strong>thrashing, tossing, tugging</strong> and more...
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/categories/toys.jpg"
            alt="Dog toys"
          />
        </div>
      </div>
    </div>

    <!-- ========== ROW 4: Walk + Treats + Adventure ========== -->
    <div class="row row-4">
      <!-- Walk Essentials -->
      <div class="card">
        <div class="card-img">
          <img
            src="/images/categories/walk.jpg"
            alt="Walk essentials"
          />
        </div>
        <div class="card-text">
          <h3>Walk<br />Essentials</h3>
          <p>
            Discover stylish collars, durable leashes, and
            everyday essentials designed for
            <strong>safe, comfortable</strong> walks.
          </p>
        </div>
      </div>

      <!-- Tasty Treats -->
      <div class="card">
        <div class="card-text">
          <h3>Tasty Treats</h3>
          <span class="badge badge-green">Free treats for pets</span>
          <p>
            Reward your furry friend with
            <strong>delicious treats</strong> and wholesome chews,
            made for every happy movement
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/categories/treats.jpg"
            alt="Dog treats"
          />
        </div>
      </div>

      <!-- Adventure Ready -->
      <div class="card">
        <div class="card-text">
          <h3>Adventure Ready</h3>
          <p>
            Travel with confidence, using
            <strong>premium carriers</strong>, travel bag and many
            more essentials
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/categories/carrier.jpg"
            alt="Pet carrier"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Static exact layout matching the design
</script>

<style scoped>
/* ========== Pets Upright Brand Colors ==========
   Light Purple : #c3b5df
   Dark Navy    : #44476f
   Black        : #000000
   White        : #ffffff
   Soft Gray    : #ede7e7
================================================= */

.comfort-care {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ========== ROW 1: Intro ========== */
.intro-row {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.intro-card {
  background: #f8f6fb;
  border-radius: 20px;
  padding: 2.2rem 2.4rem;
}

.intro-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: #44476f;
  line-height: 1.2;
  margin: 0 0 1.1rem;
  letter-spacing: -0.02em;
}

.intro-desc {
  font-size: 0.92rem;
  line-height: 1.7;
  color: #5a5a6e;
  margin: 0;
}

.intro-desc strong {
  color: #44476f;
  font-weight: 600;
}

.intro-image-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-dog {
  width: 100%;
  max-width: 360px;
  height: auto;
  object-fit: contain;
}

.arrow-btn {
  position: absolute;
  left: -10px;
  bottom: 30%;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #44476f;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(68, 71, 111, 0.35);
  transition: background 0.2s ease, transform 0.2s ease;
}

.arrow-btn:hover {
  background: #35375a;
  transform: scale(1.08);
}

/* ========== Common Card ========== */
.card {
  background: #f8f6fb;
  border-radius: 18px;
  padding: 1.3rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(68, 71, 111, 0.12);
  transform: translateY(-3px);
}

.card-text {
  flex: 1;
  min-width: 0;
}

.card-text h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #44476f;
  margin: 0 0 0.4rem;
  line-height: 1.25;
}

.card-text p {
  font-size: 0.8rem;
  line-height: 1.55;
  color: #5a5a6e;
  margin: 0;
}

.card-text strong {
  color: #44476f;
  font-weight: 600;
}

.card-img {
  flex-shrink: 0;
  width: 105px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Badges */
.badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.18rem 0.6rem;
  border-radius: 9999px;
  margin-bottom: 0.4rem;
}

.badge-purple {
  background: #e8e0f5;
  color: #5b4a8a;
}

.badge-yellow {
  background: #fef3c7;
  color: #92400e;
}

.badge-green {
  background: #d1fae5;
  color: #065f46;
}

/* ========== ROW 2 ========== */
.row-2 {
  display: grid;
  grid-template-columns: 150px 1fr 1fr;
  gap: 1.25rem;
  align-items: stretch;
}

.dog-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dog-img {
  width: 130px;
  height: auto;
  object-fit: contain;
}

/* ========== ROW 3 & 4 ========== */
.row-3,
.row-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
}

/* ========== Responsive ========== */
@media (max-width: 900px) {
  .intro-row {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .intro-image-wrap {
    order: -1;
  }

  .arrow-btn {
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
  }

  .row-2 {
    grid-template-columns: 1fr 1fr;
  }

  .dog-illustration {
    grid-column: 1 / -1;
  }

  .row-3,
  .row-4 {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .row-2,
  .row-3,
  .row-4 {
    grid-template-columns: 1fr;
  }

  .card {
    flex-direction: column;
    text-align: center;
  }

  .card-img {
    width: 130px;
    height: 110px;
  }

  .intro-title {
    font-size: 1.6rem;
  }

  .comfort-care {
    padding: 2rem 1rem 3rem;
  }
}
</style>