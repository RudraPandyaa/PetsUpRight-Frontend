<template>
  <section class="expert-banner">
    <!-- Pets image -->
    <div class="pets-image-wrap">
      <img
        src="/images/pets-row.png"
        alt="Happy pets"
        class="pets-image"
      />
    </div>

    <!-- Full-width purple section -->
    <div class="banner-content">
      <div class="banner-inner">
        <div class="banner-text">
          <h2 class="banner-title">Not sure if this is right for your pet?</h2>
          <p class="banner-desc">
            Consult with our in-house veterinary nutritionists for a personalized meal
            plan tailored to your pet’s health requirements.
          </p>
          <button class="banner-btn" @click="$emit('talk-expert')">
            Talk to an Expert
          </button>
        </div>

        <div class="banner-logo">
          <img
            src="/images/pets-upright-logo-circle.png"
            alt="Pets Upright"
            class="logo-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  'talk-expert': []
}>()
</script>

<style scoped>
.expert-banner {
  position: relative;
  margin: 0;
  margin-bottom: 0;
}

/* Pets image */
.pets-image-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin-bottom: -50px;
}

.pets-image {
  width: 100%;
  max-width: 920px;
  height: auto;
  object-fit: contain;
  display: block;
}

/* Full-width purple (like footer) */
.banner-content {
  position: relative;
  z-index: 1;
  background: #44476f;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 5rem 1.5rem 2.75rem;
}

.banner-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.banner-text {
  max-width: 520px;
}

.banner-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.75rem;
  line-height: 1.3;
}

.banner-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.banner-btn {
  background: #ffffff;
  color: #44476f;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.65rem 1.35rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.banner-btn:hover {
  background: #c3b5df;
  transform: translateY(-1px);
}

.banner-logo {
  flex-shrink: 0;
}

.logo-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .pets-image-wrap {
    margin-bottom: -28px;
  }

  .banner-content {
    padding: 3.5rem 1.25rem 2rem;
  }

  .banner-inner {
    flex-direction: column;
    text-align: center;
  }

  .banner-text {
    max-width: 100%;
  }

  .logo-img {
    width: 110px;
    height: 110px;
  }
}
</style>