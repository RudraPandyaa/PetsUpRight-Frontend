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
            <img src="/images/comfort-care/dog-beds.png" alt="Dog bed" />
          </div>
        </div>

        <!-- Dog Toys (text left, image right) -->
        <div class="card card-toys">
          <div class="card-text">
            <h3>Dog Toys</h3>
            <span class="badge badge-yellow">Get a free toy</span>
            <p>
              Our toughest toys for your
              <strong>thrashing, tossing, tugging</strong> and more...
            </p>
          </div>
          <div class="card-img">
            <img src="/images/comfort-care/toys.png" alt="Dog toys" />
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
/* ========== Pets Upright Brand Colors ==========
   Light Purple : #c3b5df
   Dark Navy    : #44476f
   Black        : #000000
   White        : #ffffff
   Soft Gray    : #ede7e7
================================================= */

.comfort-care {
  /* max-width: 1280px;  ← hata do */
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ========== ROW 1: Intro ========== */
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
  height:330px;
}

.intro-title {
  font-family: 'Paytone One', sans-serif;
  font-size: 2rem;          /* ~32px */
  font-weight: 400;         /* Paytone One already bold */
  letter-spacing: 0.02em;
  line-height: 1.2;
  color: #44476f;
}

.intro-desc {
  margin-top: 1.5rem;
  width: 850px;
  font-size: 20px;
}
/* 
.intro-desc,
.card-text p,
.row-2 .card-text p,
.row-3 .card-text p,
.row-4 {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;      
  font-weight: 400;
  line-height: 1.6;
  color: #5a5a6e;
}
.card-content > .card-text > p{
  font-size: 18px;  
} */

.intro-desc strong,
.card-text strong {
  font-weight: 600;
  color: #44476f;
}

.badge {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
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

/* Button INSIDE the card – bottom right, pointing to dog */
.arrow-btn {
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;
  width: 42px;
  height: 42px;
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

/* ========== Common Card ========== */
.card {
  background: #f8f6fb;
  border-radius: 18px;
  padding: 1.2rem 1.4rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 0.35rem;

  overflow: hidden;

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
  display: block;
  background: transparent;
}
/* Badges */
.badge {
  display: inline-block;   /* important */
  width: fit-content;      /* full width nahi lega */
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

/* ========== ROW 2 ========== */

.row-2 {
  display: grid;
  grid-template-columns: 360px 1.2fr 0.8fr;
  gap: 1.25rem;
  align-items: stretch;
}

/* Dog */
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


/* ========== ROW 2 CARDS ========== */

.row-2 .card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  padding: 1.2rem 1.4rem;
  gap: 0.5rem;

  min-height: 150px;
  box-sizing: border-box;
}

/* .row-2 .card > h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #44476f;

  margin: 0;
  line-height: 1.2;
} */


/* Image + text area */
.row-2 .card-content {
  display: flex;
  align-items: center;

  flex: 1;
  width: 100%;
  min-width: 0;
}


/* Grooming:
   IMAGE LEFT | TEXT RIGHT */
.row-2 .card-grooming .card-content {
  flex-direction: row;
}


/* Food:
   TEXT LEFT | IMAGE RIGHT */
.row-2 .card-food .card-content {
  flex-direction: row;
}


/* Text */
.row-2 .card-text {
  flex: 1;
  min-width: 0;
}

/* .row-2 .card-text p {
  font-size: 0.8rem;
  line-height: 1.55;
  color: #5a5a6e;
  margin: 0;
} */


.row-2 .card-img {
  flex: 0 0 150px;
  width: 150px;
  height: 115px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
}

.row-2 .card-img img {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;

  object-fit: contain;
  display: block;
}

/* ========== ROW 3 ========== */
.row-3 {
  display: grid;
  grid-template-columns: 1.1fr 1.15fr 1fr; /* 520 : 540 : 470 */
  gap: 1.25rem;
  align-items: stretch;
}

.row-3 .card {
  display: flex;
  background: #f8f6fb;
  border-radius: 18px;
  padding: 1.3rem 1.4rem;
  height: 360px;
}

/* ---- Health Essentials (title upar, image left + text right) ---- */
.row-3 .card-health {
  flex-direction: column;
  gap: 0.6rem;
}

/* .row-3 .card-health > h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #44476f;
  margin: 0;
  line-height: 1.25;
} */

.row-3 .card-health .card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

/* ---- Beds & Toys (text left + image right) ---- */
.row-3 .card-beds,
.row-3 .card-toys {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.row-3 .card-beds .card-text,
.row-3 .card-toys .card-text {
  flex: 1;
}

/* .row-3 .card-beds .card-text h3,
.row-3 .card-toys .card-text h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #44476f;
  margin: 0 0 0.4rem;
  line-height: 1.25;
} */

/* .row-3 .card-text p {
  font-size: 0.8rem;
  line-height: 1.55;
  color: #5a5a6e;
  margin: 0;
} */

.row-3 .card-img {
  flex-shrink: 0;
  width: 110px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row-3 .card-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ========== ROW 4 ========== */
.row-4 {
  display: grid;
  grid-template-columns: 1.25fr 1.3fr 1.45fr;
  gap: 1.25rem;
  align-items: stretch;
}

.row-4 .card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #f8f6fb;
  border-radius: 18px;
  padding: 1.3rem 1.4rem;
}

/* .row-4 .card > h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #44476f;
  margin: 0;
  line-height: 1.25;
} */

.row-4 .card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.row-4 .card-text {
  flex: 1;
  min-width: 0;
}
/* 
.row-4 .card-text p {
  font-size: 0.8rem;
  line-height: 1.55;
  color: #5a5a6e;
  margin: 0;
} */

.row-4 .card-text strong {
  color: #44476f;
  font-weight: 600;
}

.row-4 .card-img {
  flex-shrink: 0;
  width: 110px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row-4 .card-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ===== ADD THESE 3 FIXES ===== */

/* 1. Badge – sirf content jitna */
.row-4 .badge {
  display: inline-block;
  width: fit-content;
}

/* 2. Adventure text – 3-4 lines me wrap */
/* .row-4 .card-adventure .card-text {
  flex: 0 1 55%;
  max-width: 220px;
} */

/* 3. Adventure image – badi */
/* .row-4 .card-adventure .card-img {
  flex: 0 0 150px;
  width: 150px;
  height: 130px;
} */


/* ===== FORCE FONT SIZES FOR ROW 2, 3, 4 ===== */

/* Titles – Paytone One */
.row-2 .card > h3,
.row-3 .card > h3,
.row-3 .card-health > h3,
.row-3 .card-beds .card-text h3,
.row-3 .card-toys .card-text h3,
.row-4 .card > h3 {
  font-family: 'Paytone One', sans-serif !important;
  font-size: 32px;
  font-weight: 500 !important;
  color: #44476f !important;
  line-height: 1.25 !important;
}

/* Descriptions */
.row-2 .card-text p,
.row-3 .card-text p,
.row-4 .card-text p,
.row-2 .card-content .card-text p,
.row-3 .card-content .card-text p,
.row-4 .card-content .card-text p {
  font-family: 'Inter', system-ui, sans-serif !important;
  font-size: 20px;
  font-weight: 400 !important;
  line-height: 1.6 !important;
  color: #5a5a6e !important;
}

/* Strong text */
.row-2 .card-text strong,
.row-3 .card-text strong,
.row-4 .card-text strong {
  font-weight: 600 !important;
  color: #44476f !important;
}
/* Walk = image left + text right (already default in card-content) */
/* Treats & Adventure = text left + image right (same flex row) */

/* ========== Responsive ========== */
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
  }

  .arrow-btn {
    right: 1.2rem;
    bottom: 1.2rem;
    left: auto;
    transform: none;
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
  .row-2 .card {
    flex-direction: column;
    text-align: left;
  }

  .row-2 .card-content {
    flex-direction: row !important;
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