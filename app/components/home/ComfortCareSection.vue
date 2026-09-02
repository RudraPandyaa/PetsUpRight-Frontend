<template>
  <section class="comfort-care container mx-auto px-4">
  <!-- ========== ROW 1: Intro + Husky (desktop) ========== -->
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

    <!-- Desktop only: husky beside intro -->
    <div class="intro-image-wrap only-desktop">
      <img
        src="/images/comfort-care/husky.png"
        alt="Happy husky"
        class="intro-dog"
      />
    </div>
  </div>

  <!-- Tablet / Mobile only: both dogs together -->
  <div class="pets-row only-mobile">
    <div class="intro-image-wrap">
      <img
        src="/images/comfort-care/husky.png"
        alt="Happy husky"
        class="intro-dog"
      />
    </div>
    <div class="dog-illustration">
      <img
        src="/images/comfort-care/wagging-dog.svg"
        alt="Wagging dog"
        class="dog-img"
      />
    </div>
  </div>

  <!-- ========== ROW 2: Dog (desktop) + Grooming + Food ========== -->
  <div class="row row-2">
    <!-- Desktop only: wagging dog -->
    <div class="dog-illustration only-desktop">
      <img
        src="/images/comfort-care/wagging-dog.svg"
        alt="Wagging dog"
        class="dog-img"
      />
    </div>

    <!-- Premium Grooming -->
    <div class="card card-grooming">
      <h3>Premium Grooming</h3>
      <div class="card-content">
        <div class="card-img">
          <img
            src="/images/comfort-care/Premium-Grooming.png"
            alt="Grooming tools"
          />
        </div>
        <div class="card-text">
          <p>
            Gentle grooming essentials designed to keep your
            beloved pet <strong>clean, healthy,</strong> and looking
            their very best every day. From nourishing shampoos
            and soft brushes to <strong>skin-friendly</strong> care.
          </p>
        </div>
      </div>
    </div>

    <!-- Premium quality food -->
    <div class="card card-food">
      <h3>Premium quality food</h3>
      <div class="card-content">
        <div class="card-text">
          <p>
            Wholesome <strong>nutrition</strong> made with quality
            ingredients for a healthy, happy life.
          </p>
        </div>
        <div class="card-img">
          <img
            src="/images/comfort-care/Premium-Food.png"
            alt="Dog food"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="feature-rows">

    <!-- Health Essentials -->
    <div class="card card-health">
      <h3>Health Essentials</h3>

      <div class="card-content">
        <div class="card-img">
          <img
            src="/images/comfort-care/health.png"
            alt="Health essentials"
          />
        </div>

        <div class="card-text">
          <p>
            Everything your pet needs to stay healthy, active and
            happy with <strong>carefully</strong> selected wellness
            essentials.
          </p>
        </div>
      </div>
    </div>


    <!-- Premium Beds -->
    <div class="card card-beds">
      <div class="card-beds-header">
        <h3 class="card-beds-title">
          Premium<br />Beds
        </h3>

        <span class="card-beds-badge">
          Premium Bed
        </span>
      </div>

      <div class="card-beds-content">
        <div class="card-beds-text">
          <p>
            Our <strong>premium Beds</strong> are designed for
            <strong>more comfort</strong>, and is a perfect place for
            relex.
          </p>
        </div>

        <div class="card-beds-image">
          <img
            src="/images/comfort-care/dog-beds.png"
            alt="Dog bed"
          />
        </div>
      </div>
    </div>


    <!-- Dog Toys -->
    <div class="card card-toys">
      <h3 class="card-toys-title">
        Dog Toys
      </h3>

      <span class="card-toys-badge">
        Get a free toy
      </span>

      <div class="card-toys-content">
        <div class="card-toys-text">
          <p>
            Our toughest toys for your
            <strong>thrashing, tossing, tugging</strong>
            and more...
          </p>
        </div>

        <div class="card-toys-image">
          <img
            src="/images/comfort-care/toys.png"
            alt="Dog toys"
          />
        </div>
      </div>
    </div>


    <!-- Walk Essentials -->
    <div class="card card-walk">
      <h3>Walk<br />Essentials</h3>

      <div class="card-content">
        <div class="card-img">
          <img
            src="/images/comfort-care/Walk-Essentials.png"
            alt="Walk essentials"
          />
        </div>

        <div class="card-text">
          <p>
            Discover stylish collars, durable leashes, and
            everyday essentials designed for
            <strong>safe, comfortable</strong> walks.
          </p>
        </div>
      </div>
    </div>


    <!-- Tasty Treats -->
    <div class="card card-treats">
      <h3>Tasty Treats</h3>

      <span class="badge badge-green">
        Free treats for pets
      </span>

      <div class="card-content">
        <div class="card-text">
          <p>
            Reward your furry friend with
            <strong>delicious treats</strong> and wholesome chews,
            made for every happy movement
          </p>
        </div>

        <div class="card-img">
          <img
            src="/images/comfort-care/Tasty-Treats.png"
            alt="Dog treats"
          />
        </div>
      </div>
    </div>


    <!-- Adventure Ready -->
    <div class="card card-adventure">
      <h3>Adventure Ready</h3>

      <div class="card-content">
        <div class="card-text">
          <p>
            Travel with confidence, using
            <strong>premium carriers</strong>, travel bag and many
            more essentials
          </p>
        </div>

        <div class="card-img">
          <img
            src="/images/comfort-care/Advanture-Ready.png"
            alt="Pet carrier"
          />
        </div>
      </div>
    </div>

  </div>
  </section>
</template>

<script setup lang="ts">
// Static exact layout matching the design
</script>

<style scoped>

/* =========================================================
   PETS UPRIGHT BRAND COLORS
   ========================================================= */

.comfort-care {
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 4rem;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}


/* =========================================================
   ROW 1 - INTRO
   ========================================================= */

.intro-row {
  display: grid;
  grid-template-columns: 1.75fr 0.85fr;
  gap: 1.5rem;
  align-items: end;
  width: 100%;
}

.intro-card {
  position: relative;

  background: #f8f6fb;
  border-radius: 20px;

  padding: 2.2rem 2.8rem 2.2rem 2.4rem;
  height: 330px;
}

.intro-title {
  font-family: 'Paytone One', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.2;

  color: #44476f;
}

.intro-desc {
  margin-top: 1.5rem;
  width: 850px;

  font-family: 'Inter', system-ui, sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;

  color: #5a5a6e;
}

.intro-desc strong {
  font-weight: 600;
  color: #44476f;
}

.intro-image-wrap {
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

.only-mobile {
  display: none !important;
}

.only-desktop {
  display: flex;
}

.pets-row {
  display: none;
}

/* =========================================================
   EXPLORE BUTTON
   ========================================================= */

.arrow-btn {
  position: absolute;

  right: 1.2rem;
  bottom: 1.2rem;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: none;

  background: #44476f;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  box-shadow: 0 4px 14px rgba(68, 71, 111, 0.35);

  transition:
    background 0.2s ease,
    transform 0.2s ease;

  z-index: 2;
}

.arrow-btn svg {
  transform: rotate(-45deg);
  transition: transform 0.2s ease;
}

.arrow-btn:hover {
  background: #35375a;
  transform: scale(1.08);
}


/* =========================================================
   COMMON CARD BASE
   Only structural properties live here.
   Individual card styling is below.
   ========================================================= */

.card {
  background: #f8f6fb;
  border-radius: 18px;

  overflow: hidden;

  box-sizing: border-box;

  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(68, 71, 111, 0.12);
  transform: translateY(-3px);
}


/* =========================================================
   COMMON TYPOGRAPHY
   ========================================================= */

.card h3 {
  font-family: 'Paytone One', sans-serif;

  font-size: 32px;
  font-weight: 500;

  color: #44476f;

  line-height: 1.25;
  margin: 0;
}

.card p {
  font-family: 'Inter', system-ui, sans-serif;

  font-size: 20px;
  font-weight: 400;

  line-height: 1.6;

  color: #5a5a6e;

  margin: 0;
}

.card strong {
  font-weight: 600;
  color: #44476f;
}


/* =========================================================
   ROW 2 - GRID ONLY
   No card-specific styling here.
   ========================================================= */

.row-2 {
  display: grid;

  grid-template-columns: 360px 1.2fr 0.8fr;

  gap: 1.25rem;

  align-items: stretch;
}


/* =========================================================
   ROW 2 - DOG
   ========================================================= */

.dog-illustration {
  width: 360px;
  height: 360px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.dog-img {
  width: 360px !important;
  height: 360px !important;

  max-width: none !important;

  object-fit: contain;
}


/* =========================================================
   CARD 01 - PREMIUM GROOMING
   ========================================================= */

.card-grooming {
  display: flex;
  flex-direction: column;

  align-items: stretch;
  justify-content: flex-start;

  padding: 1.2rem 1.4rem;

  gap: 0.5rem;

  min-height: 150px;
}

.card-grooming h3 {
  font-size: 32px;
}

.card-grooming .card-content {
  display: flex;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  flex: 1;

  width: 100%;
  min-width: 0;

  gap: 1.5rem;
}

.card-grooming .card-img {
  flex: 0 0 200px;

  width: 200px;
  height: 160px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
}

.card-grooming .card-img img {
  width: 150%;
  height: 150%;

  max-width: none;
  max-height: none;

  object-fit: contain;

  display: block;
}

.card-grooming .card-text {
  flex: 0 1 auto;

  width: 100%;
  max-width: 340px;

  min-width: 0;

  text-align: end;
}

.card-grooming .card-text p {
  font-size: 20px;
  line-height: 1.6;
}


/* =========================================================
   CARD 02 - PREMIUM QUALITY FOOD
   ========================================================= */

.card-food {
  display: flex;
  flex-direction: column;

  align-items: stretch;
  justify-content: flex-start;

  padding: 1.2rem 1.4rem;

  gap: 0.5rem;

  min-height: 150px;
}

.card-food h3 {
  font-size: 32px;
}

.card-food .card-content {
  display: flex;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  flex: 1;

  width: 100%;
  min-width: 0;

  gap: 1rem;
}

.card-food .card-text {
  flex: 1;

  min-width: 0;

  text-align: start;
}

.card-food .card-text p {
  font-size: 20px;
  line-height: 1.6;
}

.card-food .card-img {
  flex: 0 0 150px;

  width: 150px;
  height: 115px;
  margin-right:20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
}

.card-food .card-img img {
  width: 150%;
  height: 150%;

  max-width: none;
  max-height: none;

  object-fit: contain;

  display: block;
}


/* =========================================================
   ROW 3 - GRID ONLY
   ========================================================= */

.row-3 {
  display: grid;

  grid-template-columns: 1.1fr 1.15fr 1fr;
  height: 300px;
  gap: 1.25rem;

  align-items: stretch;
}


/* =========================================================
   CARD 03 - HEALTH ESSENTIALS
   ========================================================= */

.card-health {
  display: flex;
  flex-direction: column;

  align-items: stretch;

  background: #f8f6fb;

  border-radius: 18px;

  padding: 1.3rem 1.4rem;

  height: 300px;

  gap: 0.6rem;
}

.card-health h3 {
  font-size: 32px;
}

.card-health .card-content {
  display: flex;

  flex-direction: row;

  align-items: center;

  gap: 1rem;

  flex: 1;

  width: 100%;
}

.card-health .card-img {
  flex-shrink: 0;

  width: 110px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-health .card-img img {
  max-width: 150%;
  max-height: 150%;

  object-fit: contain;

  display: block;
}

.card-health .card-text {
  flex: 1;
  text-align: end;
  min-width: 0;
}

.card-health .card-text p {
  font-size: 20px;
  line-height: 1.6;
}


/* =========================================================
   PREMIUM BEDS CARD
   ========================================================= */

.card-beds {
  display: flex;
  flex-direction: column;

  align-items: stretch;
  justify-content: flex-start;

  background: #f8f6fb;
  border-radius: 18px;

  padding: 1.2rem 1.4rem;

  gap: 0.5rem;

  min-height: 150px;
  height: 300px;

  box-sizing: border-box;
}


/* =========================
   PREMIUM BEDS HEADER
   ========================= */

.card-beds-header {
  display: block;

  align-items: flex-start;
  justify-content: space-between;

  width: 100%;

  gap: 1rem;
}

.card-beds-title {
  font-family: 'Paytone One', sans-serif;

  font-size: 32px;
  font-weight: 500;

  line-height: 1.25;

  color: #44476f;

  margin: 0;
}


/* =========================
   PREMIUM BEDS PURPLE BADGE
   Header Right
   ========================= */

.card-beds-badge {
  display: inline-block;

  flex-shrink: 0;

  background: #8465C8;
  color: #FFFFFF;

  font-family: 'Inter', system-ui, sans-serif;

  font-size: 0.68rem;
  font-weight: 600;

  padding: 0.18rem 0.6rem;

  border-radius: 9999px;

  margin-top: 0.15rem;
}


/* =========================
   PREMIUM BEDS CONTENT
   TEXT LEFT | IMAGE RIGHT
   ========================= */

.card-beds-content {
  display: flex;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  flex: 1;

  width: 100%;
  min-width: 0;
  gap: 1rem;
}


/* =========================
   PREMIUM BEDS TEXT
   ========================= */

.card-beds-text {
  flex: 1;

  min-width: 0;
  text-align: start;
}

.card-beds-text p {
  font-family: 'Inter', system-ui, sans-serif;

  font-size: 20px;
  font-weight: 400;

  line-height: 1.6;

  color: #5a5a6e;

  margin-bottom: 50px;
}

.card-beds-text strong {
  font-weight: 600;
  color: #44476f;
}


/* =========================
   PREMIUM BEDS IMAGE
   ========================= */

.card-beds-image {
  flex: 0 0 150px;

  width: 150px;
  height: 115px;

  display: flex;

  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  background: transparent;
}

.card-beds-image img {
  width: 150%;
  height: 150%;

  max-width: none;
  max-height: none;

  object-fit: contain;

  display: block;
}


/* =========================================================
   CARD 05 - DOG TOYS
   HEADER
   BANNER
   CONTENT
   TEXT LEFT | IMAGE RIGHT
   ========================================================= */

.card-toys {
  display: flex;
  flex-direction: column;

  align-items: stretch;
  justify-content: flex-start;

  background: #f8f6fb;
  border-radius: 18px;

  padding: 1.2rem 1.4rem;

  gap: 0.5rem;

  min-height: 150px;

  box-sizing: border-box;
}


/* =========================
   DOG TOYS HEADER
   ========================= */

.card-toys-title {
  font-family: 'Paytone One', sans-serif;

  font-size: 32px;
  font-weight: 500;

  line-height: 1.25;

  color: #44476f;

  margin: 0;
}


/* =========================
   DOG TOYS BANNER
   Under Header
   ========================= */

.card-toys-badge {
  display: inline-block;

  width: fit-content;

  background: #DDCD1C;
  color: #FFFFFF;

  font-family: 'Inter', system-ui, sans-serif;

  font-size: 0.68rem;
  font-weight: 600;

  padding: 0.18rem 0.6rem;

  border-radius: 9999px;

  margin: 0;
}


/* =========================
   DOG TOYS CONTENT
   TEXT LEFT | IMAGE RIGHT
   ========================= */

.card-toys-content {
  display: flex;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  flex: 1;

  width: 100%;
  min-width: 0;

  gap: 1rem;
}


/* =========================
   DOG TOYS TEXT
   LEFT
   ========================= */

.card-toys-text {
  flex: 1;

  min-width: 0;

  text-align: start;
}

.card-toys-text p {
  font-family: 'Inter', system-ui, sans-serif;

  font-size: 20px;
  font-weight: 400;

  line-height: 1.6;

  color: #5a5a6e;

  margin: 0;
}

.card-toys-text strong {
  font-weight: 600;
  color: #44476f;
}


/* =========================
   DOG TOYS IMAGE
   RIGHT
   ========================= */

.card-toys-image {
  flex: 0 0 150px;

  width: 150px;
  height: 115px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: transparent;
}

.card-toys-image img {
  width: 150%;
  height: 150%;

  max-width: none;
  max-height: none;

  object-fit: contain;

  display: block;
}


/* =========================================================
   ROW 4 - GRID ONLY
   ========================================================= */

.row-4 {
  display: grid;

  grid-template-columns: 1.25fr 1.3fr 1.45fr;

  gap: 1.25rem;

  height: 300px;
  align-items: stretch;
}


/* =========================================================
   CARD 06 - WALK ESSENTIALS
   ========================================================= */

.card-walk {
  display: flex;
  flex-direction: column;

  align-items: stretch;

  background: #f8f6fb;

  border-radius: 18px;

  padding: 1.3rem 1.4rem;

  gap: 0.5rem;
}

.card-walk h3 {
  font-size: 32px;
}

.card-walk .card-content {
  display: flex;

  flex-direction: row;

  align-items: center;

  gap: 1rem;

  flex: 1;

  width: 100%;
}

.card-walk .card-text {
  flex: 1;
  text-align: end;
  min-width: 0;
}

.card-walk .card-text p {
  font-size: 20px;
  line-height: 1.6;
}

.card-walk .card-img {
  flex-shrink: 0;

  width: 110px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-walk .card-img img {
  max-width: 200%;
  max-height: 200%;

  object-fit: contain;

  display: block;
}


/* =========================================================
   CARD 07 - TASTY TREATS
   ========================================================= */

.card-treats {
  display: flex;
  flex-direction: column;

  align-items: stretch;

  background: #f8f6fb;

  border-radius: 18px;

  padding: 1.3rem 1.4rem;

  gap: 0.5rem;
}

.card-treats h3 {
  font-size: 32px;
}

.card-treats .card-content {
  display: flex;

  flex-direction: row;

  align-items: center;

  gap: 1rem;

  flex: 1;

  width: 100%;
}

.card-treats .card-text {
  flex: 1;

  min-width: 0;
}

.card-treats .card-text p {
  font-size: 20px;
  line-height: 1.6;
}

.card-treats .card-img {
  flex-shrink: 0;

  width: 110px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-treats .card-img img {
  max-width: 200%;
  max-height: 200%;

  object-fit: contain;

  display: block;
}


/* =========================================================
   CARD 08 - ADVENTURE READY
   ========================================================= */

.card-adventure {
  display: flex;
  flex-direction: column;

  align-items: stretch;

  background: #f8f6fb;

  border-radius: 18px;

  padding: 1.3rem 1.4rem;

  gap: 0.5rem;
}

.card-adventure h3 {
  font-size: 32px;
}

.card-adventure .card-content {
  display: flex;

  flex-direction: row;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  flex: 1;

  width: 100%;
}

.card-adventure .card-text {
  flex: 0 1 55%;

  max-width: 220px;

  min-width: 0;
}

.card-adventure .card-text p {
  font-size: 20px;
  line-height: 1.6;
  width: 250px;
}

.card-adventure .card-img {
  flex: 0 0 150px;

  width: 150px;
  height: 130px;
  margin-right:20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-adventure .card-img img {
  width: 150%;
  height: 150%;

  max-width: none;
  max-height: none;

  object-fit: contain;

  display: block;
}


/* =========================================================
   BADGES
   Individual badge styling
   ========================================================= */

.badge {
  display: inline-block;

  width: fit-content;

  font-family: 'Inter', system-ui, sans-serif;

  font-size: 0.68rem;
  font-weight: 600;

  padding: 0.18rem 0.6rem;

  border-radius: 9999px;

  margin-bottom: 0.4rem;
}

.badge-purple {
  background: #8465C8;
  color: #FFFFFF;
}

.badge-yellow {
  background: #DDCD1C;
  color: #FFFFFF;
}

.badge-green {
  background: #d1fae5;
  color: #065f46;
}


.feature-rows {
  display: grid;
  grid-template-columns: 1.1fr 1.15fr 1fr;
  gap: 1.25rem;
}
/* =========================================================
   SMALL DESKTOP / LAPTOP
   1024px - 1279px
   ========================================================= */
@media (min-width: 1024px) and (max-width: 1279px) {

  /* ---------- ROW 1 ---------- */
  .intro-row {
    grid-template-columns: minmax(0, 1.4fr) 300px;
    gap: 1rem;
  }

  .intro-card {
    height: auto;
    min-height: 290px;
    padding: 1.7rem 2rem;
  }

  .intro-title {
    font-size: 1.8rem;
  }

  .intro-desc {
    width: 100%;
    max-width: 720px;
    font-size: 17px;
    line-height: 1.5;
  }

  .intro-image-wrap {
    width: 320px;
  }

  .intro-dog {
    width: 300px;
    max-width: 300px;
  }

  /* ---------- ROW 2 ---------- */
  .row-2 {
    grid-template-columns: 280px minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem;
  }

  .dog-illustration {
    width: 280px;
    height: 280px;
  }

  .dog-img {
    width: 280px !important;
    height: 280px !important;
  }

  .card-grooming,
  .card-food {
    height: auto;
    min-height: 310px;
    padding: 1rem;
  }

  .card-grooming .card-content,
  .card-food .card-content {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.75rem;
  }

  .card-grooming .card-img,
  .card-food .card-img {
    order: 1;
    flex: none;
    width: 100%;
    height: 110px;
    margin: 0;
  }

  .card-grooming h3,
  .card-food h3 {
    font-size: 25px;
  }

  .card-grooming .card-text,
  .card-food .card-text {
    order: 2;
    width: 100%;
    max-width: none;
    text-align: left;
  }

  .card-grooming .card-text p,
  .card-food .card-text p {
    font-size: 15px;
    line-height: 1.45;
  }

  .card-grooming .card-img {
    flex: 0 0 125px;
    width: 125px;
    height: 120px;
  }

  .card-food .card-img {
    flex: 0 0 110px;
    width: 110px;
    height: 100px;
    margin-right: 0;
  }

  .card-grooming .card-img img,
  .card-food .card-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* ---------- ROW 3 + ROW 4 ---------- */
  .row-3,
  .row-4 {
    /* grid-template-columns: repeat(3, minmax(0, 1fr)); */
    height: auto;
    /* gap: 1rem; */
  }

  .card-health,
  .card-beds,
  .card-toys,
  .card-walk,
  .card-treats,
  .card-adventure {
    height: auto;
    min-height: 320px;
    padding: 1rem;
  }

  .card h3,
  .card-beds-title,
  .card-toys-title {
    font-size: 24px;
  }

  .card p,
  .card-beds-text p,
  .card-toys-text p {
    font-size: 15px;
    line-height: 1.45;
  }

  .card-health .card-content,
  .card-walk .card-content,
  .card-treats .card-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  /* Images should not cover text */
  .card-health .card-img,
  .card-walk .card-img,
  .card-treats .card-img {
    order: 1;
    width: 100%;
    height: 105px;
  }

  .card-beds-image,
  .card-toys-image,
  .card-adventure .card-img {
    flex: 0 0 105px;
    width: 105px;
    height: 100px;
    margin-right: 0;
    margin-bottom: 0;
  }

  .card-health .card-text,
  .card-walk .card-text,
  .card-treats .card-text {
    order: 2;
    width: 100%;
    text-align: left;
  }

  .card-health .card-img img,
  .card-walk .card-img img,
  .card-treats .card-img img,
  .card-beds-image img,
  .card-toys-image img,
  .card-adventure .card-img img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .card-beds-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .card-beds-image {
    order: 1;
    width: 100%;
    height: 105px;
    flex: none;
    margin: 0;
  }

  .card-beds-text {
    order: 2;
    width: 100%;
  }

  .card-beds-text p {
    margin: 0;
  }

    .card-beds-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }


  .card-toys-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .card-toys-image {
    order: 1;
    width: 100%;
    height: 105px;
    flex: none;
  }

  .card-toys-text {
    order: 2;
    width: 100%;
  }

  .card-toys-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .card-adventure .card-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .card-adventure .card-img {
    order: 1;
    width: 100%;
    height: 105px;
    flex: none;
    margin: 0;
  }

  .card-adventure .card-text {
    order: 2;
    width: 100%;
    max-width: none;
  }


  .card-adventure .card-text {
    flex: 1;
    max-width: none;
  }

  .card-adventure .card-text p {
    width: 100%;
  }

  .card-adventure .card-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

/* =========================================================
   TABLET
   768px - 1023px
   ========================================================= */
@media (min-width: 768px) and (max-width: 1023px) {
  .only-desktop {
      display: none !important;
  }

  .pets-row.only-mobile {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-items: end;
    justify-items: center;
    margin: 1.25rem 0 1.5rem;
  }
  
  /* =========================
     ROW 1 - INTRO
     ========================= */

  .intro-row {
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1rem;
  }

  .intro-card {
    grid-column: 1 / -1;
  }

  .intro-title {
    font-size: 1.8rem;
  }

  .intro-desc {
    width: 100%;
    max-width: 680px;
    font-size: 17px;
    line-height: 1.55;
  }

  /* =========================
     HUSKY + WAGGING DOG
     ========================= */

  .pets-row {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-items: end;
    justify-items: center;
    margin: 1.25rem 0 1.5rem;
  }

  .pets-row .intro-image-wrap,
  .pets-row .dog-illustration {
    width: 100%;
    height: auto;
    min-height: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: visible;
    padding: 0;
  }

  .pets-row .intro-dog {
    width: 100%;
    height: auto;
    max-width: 220px;
    max-height: 220px;
    object-fit: contain;
  }

  .pets-row .dog-img {
    width: 100% !important;
    height: auto !important;
    max-width: 220px !important;
    max-height: 220px !important;
    object-fit: contain;
  }

  /* =========================
     ROW 2 – Grooming + Food
     ========================= */

  .row-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .card-grooming,
  .card-food {
    grid-row: auto;
  }

  /* .dog-illustration {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
  } */

  /* .dog-img {
    width: 240px  !important;
    height: 240px !important;
    object-fit: contain;
  } */

  /* .card-grooming,
  .card-food {
    grid-row: 2;
  } */


  /* =========================
     ALL TABLET CARDS
     Title -> Image -> Description
     ========================= */

  .card-grooming .card-content,
  .card-food .card-content,
  .card-health .card-content,
  .card-walk .card-content,
  .card-treats .card-content,
  .card-adventure .card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .feature-rows {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  /* =========================
     NORMAL CARD IMAGES
     ========================= */

  .card-grooming .card-img,
  .card-food .card-img,
  .card-health .card-img,
  .card-walk .card-img,
  .card-treats .card-img,
  .card-adventure .card-img {
    order: 1;

    width: 100%;
    height: 150px;

    flex: none;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-grooming .card-img img,
  .card-food .card-img img,
  .card-health .card-img img,
  .card-walk .card-img img,
  .card-treats .card-img img,
  .card-adventure .card-img img {
    width: 100%;
    height: 100%;

    max-width: 220px;
    max-height: 150px;

    object-fit: contain;
  }


  /* =========================
     NORMAL CARD DESCRIPTION
     ========================= */

  .card-grooming .card-text,
  .card-food .card-text,
  .card-health .card-text,
  .card-walk .card-text,
  .card-treats .card-text,
  .card-adventure .card-text {
    order: 2;

    width: 100%;
    max-width: none;

    text-align: left;
  }

  .card-grooming .card-text p,
  .card-food .card-text p,
  .card-health .card-text p,
  .card-walk .card-text p,
  .card-treats .card-text p,
  .card-adventure .card-text p {
    width: 100%;
    margin: 0;

    font-size: 16px;
    line-height: 1.5;
  }


  /* =========================
     ROW 3
     Health + Beds
     Toys automatically next pair
     ========================= */

  .row-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    height: auto;
  }

  .card-health,
  .card-beds,
  .card-toys {
    width: 100%;
    height: auto;
    min-height: 390px;
    padding: 1.25rem;
  }


  /* =========================
     ROW 4
     Walk + Treats + Adventure
     ========================= */

  .row-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    height: auto;
  }

  .card-walk,
  .card-treats,
  .card-adventure {
    width: 100%;
    height: auto;
    min-height: 390px;
    padding: 1.25rem;
  }


  /* =========================
     BEDS
     Title -> Image -> Description
     ========================= */

  .card-beds-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .card-beds-image {
    order: 1;

    width: 100%;
    height: 150px;

    flex: none;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-beds-image img {
    width: 100%;
    height: 100%;

    max-width: 220px;
    max-height: 150px;

    object-fit: contain;
  }

  .card-beds-text {
    order: 2;

    width: 100%;
    max-width: none;
    text-align: left;
  }

  .card-beds-text p {
    width: 100%;
    margin: 0;

    font-size: 16px;
    line-height: 1.5;
  }


  /* =========================
     DOG TOYS
     Title -> Image -> Description
     ========================= */

  .card-toys-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .card-toys-image {
    order: 1;

    width: 100%;
    height: 150px;

    flex: none;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-toys-image img {
    width: 100%;
    height: 100%;

    max-width: 220px;
    max-height: 150px;

    object-fit: contain;
  }

  .card-toys-text {
    order: 2;

    width: 100%;
    max-width: none;
    text-align: left;
  }

  .card-toys-text p {
    width: 100%;
    margin: 0;

    font-size: 16px;
    line-height: 1.5;
  }


  /* =========================
     TITLES
     ========================= */

  .card h3,
  .card-grooming h3,
  .card-food h3,
  .card-beds-title,
  .card-toys-title {
    font-size: 25px;
    line-height: 1.2;
  }


  /* =========================
     IMPORTANT:
     No clipping / overlap
     ========================= */

  .card,
  .card-grooming,
  .card-food,
  .card-health,
  .card-beds,
  .card-toys,
  .card-walk,
  .card-treats,
  .card-adventure {
    overflow: hidden;
  }
}

/* =========================================================
   MOBILE / SMALL TABLET
   BELOW 768px
   ========================================================= */
@media (max-width: 767px) {

  .comfort-care {
    width: 100%;
    max-width: 100%;
    padding: 2rem 1rem 3rem;
    gap: 1rem;
  }

  /* ---------- INTRO ---------- */
  .intro-row {
    grid-template-columns: 1fr;
    width: 100%;
    text-align: left;
  }

  .intro-card {
    width: 100%;
    height: auto;
    min-height: 0;
    padding: 1.4rem;
  }

  .intro-title {
    font-size: 1.6rem;
    line-height: 1.2;
    text-align: left;
  }

  .intro-desc {
    width: 100%;
    max-width: none;
    margin-top: 1rem;
    font-size: 15px;
    line-height: 1.5;
    text-align: left;
  }

  .arrow-btn {
    right: 1rem;
    bottom: 1rem;
  }

  /* ---------- PETS ROW ---------- */
  .pets-row {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    margin: 1rem 0 1.5rem;
  }

  .pets-row .intro-image-wrap,
  .pets-row .dog-illustration {
    width: 100%;
    height: 190px;
    padding: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
  }

  .pets-row .intro-dog {
    width: 100%;
    height: 180px;
    max-width: 180px;
    object-fit: contain;
  }

  .pets-row .dog-img {
    width: 100% !important;
    height: 180px !important;
    max-width: 170px !important;
    object-fit: contain;
  }

  /* ---------- ROW 2 ---------- */
  .row-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card-grooming,
  .card-food {
    width: 100%;
    height: auto;
    min-height: 0;
    padding: 1rem;
  }

  /* ---------- ALL FEATURE CARDS ---------- */
  .feature-rows {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card-health,
  .card-beds,
  .card-toys,
  .card-walk,
  .card-treats,
  .card-adventure {
    width: 100%;
    height: auto;
    min-height: 0;
    padding: 1rem;
  }

  /* ---------- TITLE -> IMAGE -> DESCRIPTION ---------- */
  .card-grooming .card-content,
  .card-food .card-content,
  .card-health .card-content,
  .card-walk .card-content,
  .card-treats .card-content,
  .card-adventure .card-content,
  .card-beds-content,
  .card-toys-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  /* Images */
  .card-grooming .card-img,
  .card-food .card-img,
  .card-health .card-img,
  .card-walk .card-img,
  .card-treats .card-img,
  .card-adventure .card-img,
  .card-beds-image,
  .card-toys-image {
    order: 1;
    width: 100%;
    height: 140px;
    flex: none;
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-grooming .card-img img,
  .card-food .card-img img,
  .card-health .card-img img,
  .card-walk .card-img img,
  .card-treats .card-img img,
  .card-adventure .card-img img,
  .card-beds-image img,
  .card-toys-image img {
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 140px;
    object-fit: contain;
  }

  /* Descriptions */
  .card-grooming .card-text,
  .card-food .card-text,
  .card-health .card-text,
  .card-walk .card-text,
  .card-treats .card-text,
  .card-adventure .card-text,
  .card-beds-text,
  .card-toys-text {
    order: 2;
    width: 100%;
    max-width: none;
    text-align: left;
  }

  .card-grooming .card-text p,
  .card-food .card-text p,
  .card-health .card-text p,
  .card-walk .card-text p,
  .card-treats .card-text p,
  .card-adventure .card-text p,
  .card-beds-text p,
  .card-toys-text p {
    width: 100%;
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
  }

  .card-adventure .card-text p {
    width: 100%;
  }

  /* Titles */
  .card h3,
  .card-grooming h3,
  .card-food h3,
  .card-beds-title,
  .card-toys-title {
    font-size: 22px;
    line-height: 1.2;
  }

  /* Avoid overlap */
  .card,
  .card-grooming,
  .card-food,
  .card-health,
  .card-beds,
  .card-toys,
  .card-walk,
  .card-treats,
  .card-adventure {
    overflow: hidden;
  }
}

</style>