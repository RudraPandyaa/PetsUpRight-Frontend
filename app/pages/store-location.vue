<template>
  <main class="location-page">
    <!-- Hero -->
    <section class="location-hero">
      <div class="hero-content">
        <div class="hero-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
            />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        <div>
          <p class="eyebrow">VISIT US</p>
          <h1>Find PetsUpRight Near You</h1>

          <p>
            Visit our store for pet essentials, product guidance
            and personalised help for your companion.
          </p>
        </div>
      </div>
    </section>

    <section class="location-container">
      <div class="location-layout">
        <!-- Store information -->
        <article class="store-card">
          <div class="store-card-header">
            <div>
              <span class="store-status">
                <span class="status-dot"></span>
                {{ isStoreOpen ? 'Open now' : 'Currently closed' }}
              </span>

              <h2>{{ store.name }}</h2>
              <p>Pet supplies and care essentials</p>
            </div>
          </div>

          <div class="detail-list">
            <!-- Address -->
            <div class="detail-item">
              <div class="detail-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                  />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <div>
                <h3>Store address</h3>
                <address>
                  {{ store.addressLine1 }}<br />
                  {{ store.addressLine2 }}<br />
                  {{ store.city }}, {{ store.state }}
                  {{ store.postalCode }}
                </address>
              </div>
            </div>

            <!-- Phone -->
            <div class="detail-item">
              <div class="detail-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.61a2 2 0 0 1-.45 2.11L8.04 9.71a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.83.31 1.71.53 2.61.65A2 2 0 0 1 22 16.92Z"
                  />
                </svg>
              </div>

              <div>
                <h3>Call us</h3>

                <a :href="`tel:${store.phone}`">
                  {{ store.phoneDisplay }}
                </a>
              </div>
            </div>

            <!-- Email -->
            <div class="detail-item">
              <div class="detail-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>

              <div>
                <h3>Email us</h3>

                <a :href="`mailto:${store.email}`">
                  {{ store.email }}
                </a>
              </div>
            </div>
          </div>

          <div class="store-actions">
            <a
              :href="directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="primary-button"
            >
              Get directions

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>

            <a
              :href="`tel:${store.phone}`"
              class="secondary-button"
            >
              Call store
            </a>
          </div>
        </article>

        <!-- Opening hours -->
        <aside class="hours-card">
          <div class="card-heading">
            <div class="heading-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>

            <div>
              <h2>Opening hours</h2>
              <p>Plan your visit</p>
            </div>
          </div>

          <div class="hours-list">
            <div
              v-for="hours in store.openingHours"
              :key="hours.day"
              class="hours-row"
              :class="{ today: hours.dayIndex === currentDay }"
            >
              <span>
                {{ hours.day }}

                <small
                  v-if="hours.dayIndex === currentDay"
                >
                  Today
                </small>
              </span>

              <strong>{{ hours.hours }}</strong>
            </div>
          </div>

          <div class="holiday-note">
            Store timings may change on public holidays. Please
            call before visiting on a holiday.
          </div>
        </aside>
      </div>

      <!-- Map -->
      <section class="map-card">
        <div class="map-placeholder">
          <div class="map-pin">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
              />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>

          <h2>{{ store.name }}</h2>
          <p>{{ fullAddress }}</p>

          <a
            :href="directionsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      <!-- Store services -->
      <section class="services-section">
        <div class="section-heading">
          <p class="eyebrow">IN-STORE SERVICES</p>
          <h2>How we can help</h2>
        </div>

        <div class="services-grid">
          <article
            v-for="service in services"
            :key="service.title"
            class="service-card"
          >
            <div class="service-icon">
              {{ service.icon }}
            </div>

            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </article>
        </div>
      </section>

      <!-- Assistance -->
      <section class="help-banner">
        <div>
          <h2>Need help before visiting?</h2>

          <p>
            Contact our team to check product availability or
            get help choosing the right product.
          </p>
        </div>

        <a :href="`tel:${store.phone}`">
          Talk to our team
        </a>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
const currentDay = new Date().getDay()

const store = {
  name: 'PetsUpRight Store',

  addressLine1: 'Cellar, Green Villa, Gurukul Road',
  addressLine2:
    'Below Maruti Gift & Toys Shop, near The H B Kapadia New High School',

  area: 'Memnagar',
  city: 'Ahmedabad',
  state: 'Gujarat',
  postalCode: '380052',

  phone: '+919327547375',
  phoneDisplay: '09327 547375',

  // Replace this if you have a different support email.
  email: 'support@petsupright.com',

  openingHours: [
    {
      day: 'Monday',
      dayIndex: 1,
      hours: '10:00 AM – 8:00 PM',
    },
    {
      day: 'Tuesday',
      dayIndex: 2,
      hours: '10:00 AM – 8:00 PM',
    },
    {
      day: 'Wednesday',
      dayIndex: 3,
      hours: '10:00 AM – 8:00 PM',
    },
    {
      day: 'Thursday',
      dayIndex: 4,
      hours: '10:00 AM – 8:00 PM',
    },
    {
      day: 'Friday',
      dayIndex: 5,
      hours: '10:00 AM – 8:00 PM',
    },
    {
      day: 'Saturday',
      dayIndex: 6,
      hours: '10:00 AM – 8:00 PM',
    },
    {
      day: 'Sunday',
      dayIndex: 0,
      hours: '11:00 AM – 6:00 PM',
    },
  ],
}

const services = [
  {
    icon: '🛍️',
    title: 'Pet essentials',
    description:
      'Shop food, grooming products, toys, accessories and everyday pet-care essentials.',
  },
  {
    icon: '💬',
    title: 'Product guidance',
    description:
      'Get help selecting products based on your pet’s age, size and individual needs.',
  },
  {
    icon: '📦',
    title: 'Product availability',
    description:
      'Call our team before visiting to confirm whether a particular product is available.',
  },
]

const fullAddress = computed(() => {
  return [
    store.addressLine1,
    store.addressLine2,
    store.area,
    store.city,
    store.state,
    store.postalCode,
  ]
    .filter(Boolean)
    .join(', ')
})

const directionsUrl = computed(() => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullAddress.value,
  )}`
})

const todayHours = computed(() => {
  return store.openingHours.find(
    item => item.dayIndex === currentDay,
  )
})

const isStoreOpen = computed(() => {
  if (!todayHours.value) {
    return false
  }

  // This label is approximate until actual opening-hour
  // parsing is implemented.
  const hour = new Date().getHours()

  if (currentDay === 0) {
    return hour >= 11 && hour < 18
  }

  return hour >= 10 && hour < 20
})

useHead({
  title: 'Store Location | PetsUpRight',
  meta: [
    {
      name: 'description',
      content:
        'Find the PetsUpRight store address, opening hours and contact information.',
    },
  ],
})
</script>

<style scoped>
.location-page {
  min-height: 100vh;
  color: #44476f;
  background: #faf9fc;
}

.location-hero {
  padding: 4rem 1rem;
  color: #ffffff;
  background:
    linear-gradient(
      120deg,
      rgba(68, 71, 111, 0.96),
      rgba(91, 82, 137, 0.9)
    );
}

.hero-content {
  width: 100%;
  max-width: 1180px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0 auto;
}

.hero-icon {
  width: 72px;
  height: 72px;
  display: grid;
  flex-shrink: 0;
  place-items: center;
  color: #44476f;
  background: #c3b5df;
  border-radius: 50%;
}

.hero-icon svg {
  width: 36px;
  height: 36px;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: #c3b5df;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.location-hero h1 {
  margin: 0 0 0.65rem;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.1;
}

.location-hero p:last-child {
  max-width: 650px;
  margin: 0;
  color: #e5e2ef;
  line-height: 1.6;
}

.location-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem;
}

.location-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.8fr);
  gap: 1.5rem;
}

.store-card,
.hours-card,
.map-card {
  background: #ffffff;
  border: 1px solid #e6e4ec;
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(68, 71, 111, 0.06);
}

.store-card {
  padding: 1.75rem;
}

.store-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.7rem;
  color: #238c3c;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #28a745;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(40, 167, 69, 0.12);
}

.store-card h2,
.hours-card h2 {
  margin: 0 0 0.3rem;
  font-size: 1.5rem;
}

.store-card-header p,
.card-heading p {
  margin: 0;
  color: #77767f;
}

.detail-list {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.75rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.detail-icon,
.heading-icon {
  width: 42px;
  height: 42px;
  display: grid;
  flex-shrink: 0;
  place-items: center;
  color: #44476f;
  background: #f0ebf7;
  border-radius: 10px;
}

.detail-icon svg,
.heading-icon svg {
  width: 21px;
  height: 21px;
}

.detail-item h3 {
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
}

.detail-item address,
.detail-item a {
  color: #77767f;
  font-size: 0.9rem;
  font-style: normal;
  line-height: 1.6;
}

.detail-item a:hover {
  color: #44476f;
}

.store-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.primary-button,
.secondary-button {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.7rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.primary-button {
  color: #ffffff;
  background: #44476f;
}

.primary-button svg {
  width: 18px;
  height: 18px;
}

.secondary-button {
  color: #44476f;
  border: 1px solid #44476f;
}

.hours-card {
  padding: 1.5rem;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.hours-list {
  margin-top: 1.25rem;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.72rem 0;
  color: #77767f;
  border-bottom: 1px solid #eeeeF2;
  font-size: 0.85rem;
}

.hours-row.today {
  color: #44476f;
  font-weight: 600;
}

.hours-row small {
  margin-left: 0.35rem;
  color: #238c3c;
  font-weight: 700;
}

.hours-row strong {
  color: #44476f;
  font-weight: 600;
}

.holiday-note {
  margin-top: 1rem;
  padding: 0.85rem;
  color: #77767f;
  background: #f7f5fa;
  border-radius: 8px;
  font-size: 0.76rem;
  line-height: 1.5;
}

.map-card {
  margin-top: 1.5rem;
  overflow: hidden;
}

.map-placeholder {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background:
    radial-gradient(
      circle at 20% 20%,
      #f0ebf7,
      transparent 35%
    ),
    linear-gradient(135deg, #fbfaff, #f1edf7);
}

.map-pin {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: #44476f;
  border-radius: 50%;
}

.map-pin svg {
  width: 29px;
  height: 29px;
}

.map-placeholder h2 {
  margin: 1rem 0 0.4rem;
}

.map-placeholder p {
  max-width: 520px;
  margin: 0;
  color: #77767f;
}

.map-placeholder a {
  margin-top: 1.1rem;
  color: #44476f;
  font-weight: 700;
}

.services-section {
  padding-top: 3.5rem;
}

.section-heading h2 {
  margin: 0;
  font-size: 1.8rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.service-card {
  padding: 1.4rem;
  background: #ffffff;
  border: 1px solid #e6e4ec;
  border-radius: 14px;
}

.service-icon {
  font-size: 1.6rem;
}

.service-card h3 {
  margin: 0.8rem 0 0.4rem;
}

.service-card p {
  margin: 0;
  color: #77767f;
  font-size: 0.88rem;
  line-height: 1.6;
}

.help-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
  color: #ffffff;
  background: #44476f;
  border-radius: 18px;
}

.help-banner h2 {
  margin: 0 0 0.5rem;
}

.help-banner p {
  margin: 0;
  color: #ded9e9;
}

.help-banner a {
  flex-shrink: 0;
  padding: 0.8rem 1.2rem;
  color: #44476f;
  background: #c3b5df;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 850px) {
  .location-layout,
  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .location-hero {
    padding: 2.5rem 1rem;
  }

  .hero-content {
    align-items: flex-start;
  }

  .hero-icon {
    width: 52px;
    height: 52px;
  }

  .hero-icon svg {
    width: 26px;
    height: 26px;
  }

  .store-actions,
  .help-banner {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-button,
  .secondary-button,
  .help-banner a {
    width: 100%;
    text-align: center;
  }
}
</style>