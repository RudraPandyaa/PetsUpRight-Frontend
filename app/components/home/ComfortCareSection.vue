<template>
  <section class="comfort-care container mx-auto px-4">
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

        <!-- Button INSIDE the card, bottom-right, pointing to dog -->
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

      <div class="intro-image-wrap">
        <img
          src="/images/comfort-care/husky.png"
          alt="Happy husky"
          class="intro-dog"
        />
      </div>
    </div>

    <!-- ========== ROW 2: Dog + Grooming + Food ========== -->
    <div class="row row-2">
      <!-- Animated Dog (Lottie) -->
      <div class="dog-illustration">
        <!-- Option A: Agar Lottie use kar rahe ho -->
        <!-- <DotLottieVue
          src="/animations/wagging-dog.lottie"
          autoplay
          loop
          style="width: 160px; height: 160px"
        /> -->

        <!-- Option B: Temporary GIF (agar abhi Lottie setup nahi kiya) -->
        
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
          <h3>Premium quality foood</h3>

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

    <!-- ========== ROW 3: Health + Beds + Toys ========== -->
      <div class="row row-3">
        <!-- Health Essentials (image left, text right) -->
        <div class="card card-health">
          <h3>Health Essentials</h3>

          <div class="card-content">
            <div class="card-img">
              <img src="/images/comfort-care/health.png" alt="Health essentials" />
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

        <!-- Premium Beds (text left, image right) -->
<div class="card card-beds">

  <!-- Header -->
  <div class="card-beds-header">
    <h3 class="card-beds-title">
      Premium<br />Beds
    </h3>

    <span class="card-beds-badge">
      Premium Bed
    </span>
  </div>

  <!-- Content: Text Left | Image Right -->
  <div class="card-beds-content">

    <!-- Text -->
    <div class="card-beds-text">
      <p>
        Our <strong>premium Beds</strong> are designed for
        <strong>more comfort</strong>, and is a perfect place for
        relex.
      </p>
    </div>

    <!-- Image -->
    <div class="card-beds-image">
      <img
        src="/images/comfort-care/dog-beds.png"
        alt="Dog bed"
      />
    </div>

  </div>

</div>

        <!-- Dog Toys (text left, image right) -->
        <!-- Dog Toys -->
<div class="card card-toys">

  <!-- Header -->
  <h3 class="card-toys-title">
    Dog Toys
  </h3>

  <!-- Banner -->
  <span class="card-toys-badge">
    Get a free toy
  </span>

  <!-- Content -->
  <div class="card-toys-content">

    <!-- Text -->
    <div class="card-toys-text">
      <p>
        Our toughest toys for your
        <strong>thrashing, tossing, tugging</strong>
        and more...
      </p>
    </div>

    <!-- Image -->
    <div class="card-toys-image">
      <img
        src="/images/comfort-care/toys.png"
        alt="Dog toys"
      />
    </div>

  </div>

</div>
      </div>

    <!-- ========== ROW 4: Walk + Treats + Adventure ========== -->
    <div class="row row-4">

      <!-- 1. Walk Essentials (title upar → image left + text right) -->
      <div class="card card-walk">
        <h3>Walk<br />Essentials</h3>

        <div class="card-content">
          <div class="card-img">
            <img src="/images/comfort-care/Walk-Essentials.png" alt="Walk essentials" />
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

      <!-- 2. Tasty Treats (title + badge upar → text left + image right) -->
      <div class="card card-treats">
        <h3>Tasty Treats</h3>
        <span class="badge badge-green">Free treats for pets</span>

        <div class="card-content">
          <div class="card-text">
            <p>
              Reward your furry friend with
              <strong>delicious treats</strong> and wholesome chews,
              made for every happy movement
            </p>
          </div>
          <div class="card-img">
            <img src="/images/comfort-care/Tasty-Treats.png" alt="Dog treats" />
          </div>
        </div>
      </div>

      <!-- 3. Adventure Ready (title upar → text left + image right) -->
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
            <img src="/images/comfort-care/Advanture-Ready.png" alt="Pet carrier" />
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


/* =========================================================
   RESPONSIVE - TABLET
   ========================================================= */

@media (max-width: 900px) {

  .intro-row {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .intro-image-wrap {
    order: -1;
  }

  .intro-desc {
    padding-right: 0;
    width: 100%;
  }

  .arrow-btn {
    right: 1.2rem;
    bottom: 1.2rem;
    left: auto;

    transform: none;
  }


  /* Row 2 */

  .row-2 {
    grid-template-columns: 1fr 1fr;
  }

  .dog-illustration {
    grid-column: 1 / -1;
  }


  /* Row 3 + Row 4 */

  .row-3,
  .row-4 {
    grid-template-columns: 1fr 1fr;
  }
}


/* =========================================================
   RESPONSIVE - MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .comfort-care {
    padding: 2rem 1rem 3rem;
  }


  /* All grids become single column */

  .row-2,
  .row-3,
  .row-4 {
    grid-template-columns: 1fr;
  }


  /* Intro */

  .intro-title {
    font-size: 1.6rem;
  }


  /* Dog */

  .dog-illustration {
    width: 100%;
    height: auto;
  }

  .dog-img {
    width: 100% !important;
    height: auto !important;

    max-width: 360px !important;
  }


  /* =====================================================
     PREMIUM GROOMING - MOBILE
     ===================================================== */

  .card-grooming {
    text-align: left;
  }

  .card-grooming .card-content {
    flex-direction: row;
  }

  .card-grooming .card-img {
    flex: 0 0 130px;

    width: 130px;
    height: 110px;
  }

  .card-grooming .card-text {
    max-width: none;
    width: auto;

    text-align: left;
  }


  /* =====================================================
     PREMIUM FOOD - MOBILE
     ===================================================== */

  .card-food {
    text-align: left;
  }

  .card-food .card-content {
    flex-direction: row;
  }

  .card-food .card-img {
    flex: 0 0 130px;

    width: 130px;
    height: 110px;
  }


  /* =====================================================
     HEALTH - MOBILE
     ===================================================== */

  .card-health {
    height: auto;
    min-height: 300px;
  }

  .card-health .card-img {
    width: 130px;
    height: 110px;
  }


  /* =====================================================
     BEDS - MOBILE
     ===================================================== */

  .card-beds {
    height: auto;
    min-height: 300px;
  }

  .card-beds .card-img {
    width: 130px;
    height: 110px;
  }


  /* =====================================================
     TOYS - MOBILE
     ===================================================== */

  .card-toys {
    height: auto;
    min-height: 300px;
  }

  .card-toys .card-img {
    width: 130px;
    height: 110px;
  }


  /* =====================================================
     WALK - MOBILE
     ===================================================== */

  .card-walk {
    height: auto;
    min-height: 280px;
  }

  .card-walk .card-img {
    width: 130px;
    height: 110px;
  }


  /* =====================================================
     TREATS - MOBILE
     ===================================================== */

  .card-treats {
    height: auto;
    min-height: 280px;
  }

  .card-treats .card-img {
    width: 130px;
    height: 110px;
  }


  /* =====================================================
     ADVENTURE - MOBILE
     ===================================================== */

  .card-adventure {
    height: auto;
    min-height: 280px;
  }

  .card-adventure .card-text {
    flex: 1;
    max-width: none;
  }

  .card-adventure .card-img {
    flex: 0 0 130px;

    width: 130px;
    height: 110px;
  }


  /* Mobile typography */

  .card h3 {
    font-size: 26px;
  }

  .card p {
    font-size: 17px;
    line-height: 1.5;
  }
}

</style>