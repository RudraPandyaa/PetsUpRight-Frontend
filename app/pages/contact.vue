<template>
  <main class="contact-page">
    <section class="contact-hero">
      <img
        v-if="contactContent.heroImage"
        :src="contactContent.heroImage"
        alt=""
        class="contact-hero-image"
      />
      <div v-if="contactContent.heroImage" class="contact-hero-overlay" />
      <div class="contact-hero-inner">
        <div>
          <p class="eyebrow">WE ARE HERE TO HELP</p>
          <h1>Let's talk about<br /><span>your pet.</span></h1>
          <p class="hero-copy">
            Have a question about an order, a product, or finding the right essentials for your companion? Our team would love to hear from you.
          </p>
        </div>
        <div class="hero-paw">
          <img
            :src="contactContent.logoImage || '/images/pets-upright-logo-circle.png'"
            alt="PetsUpRight"
          />
        </div>
      </div>
    </section>

    <section class="contact-content">
      <div class="contact-details">
        <p class="eyebrow">CONTACT DETAILS</p>
        <h2>Good care starts<br />with a conversation.</h2>
        <p class="details-copy">
          Send us a message and we will get back to you as soon as possible.
        </p>

        <div class="detail-list">
          <a :href="`mailto:${contactContent.email}`" class="detail-item">
            <span class="detail-icon">@</span>
            <span>
              <strong>Email us</strong>
              <small>{{ contactContent.email }}</small>
            </span>
          </a>
          <a :href="`tel:${contactContent.phone}`" class="detail-item">
            <span class="detail-icon">+</span>
            <span>
              <strong>Call us</strong>
              <small>{{ contactContent.phone }}</small>
            </span>
          </a>
          <div class="detail-item">
            <span class="detail-icon">i</span>
            <span>
              <strong>Support hours</strong>
              <small>Mon - Sat, 10:00 AM - 6:00 PM</small>
            </span>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-heading">
          <h2>Send us a message</h2>
          <p>We usually reply within one business day.</p>
        </div>

        <div class="field-row">
          <label>
            Your name
            <input v-model="form.name" type="text" placeholder="Your name" required />
          </label>
          <label>
            Email address
            <input v-model="form.email" type="email" placeholder="you@example.com" required />
          </label>
        </div>

        <label>
          Subject
          <select v-model="form.subject" required>
            <option disabled value="">Choose a topic</option>
            <option>Order support</option>
            <option>Product question</option>
            <option>Returns and exchanges</option>
            <option>General enquiry</option>
          </select>
        </label>

        <label>
          Message
          <textarea v-model="form.message" rows="6" placeholder="How can we help?" required />
        </label>

        <p v-if="sent" class="success-message" role="status">
          Thanks for reaching out. We have received your message.
        </p>

        <button type="submit" class="submit-button">
          Send message
          <span aria-hidden="true">&#8594;</span>
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { GraphQLClient } from 'graphql-request'

import { GET_CMS_PAGE_BY_SLUG } from '../../graphql/queries/cms'

definePageMeta({
  alias: ['/contact-us'],
})

const config = useRuntimeConfig()
const client = new GraphQLClient(config.public.vendureShopApiUrl as string)

const { data: cmsPage } = await useAsyncData('cms-contact', async () => {
  for (const slug of ['contact-us', 'contactus', 'contact']) {
      const response: any = await client.request(
        GET_CMS_PAGE_BY_SLUG,
        { slug },
        { 'cache-control': 'no-cache' },
      )
    if (response.cmsPageBySlug) {
      return response.cmsPageBySlug
    }
  }

  return null
})

const contactSection = computed(() =>
  cmsPage.value?.sections?.find((section: any) => section.type === 'contact'),
)

const contactContent = computed(() => ({
  heroImage: contactSection.value?.data?.publishedHeroImage || '',
  logoImage: contactSection.value?.data?.publishedLogoImage || '',
  email: contactSection.value?.data?.publishedEmail || contactSection.value?.data?.email || 'hello@petsupright.com',
  phone: contactSection.value?.data?.publishedPhone || contactSection.value?.data?.phone || '+91 98765 43210',
}))

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const sent = ref(false)

function submitForm() {
  sent.value = true
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<style scoped>
.contact-page {
  background: #fff;
  color: #1a1a2e;
}

.contact-hero {
  position: relative;
  overflow: hidden;
  background: #f8f6fb;
  background-position: center;
  background-size: cover;
  border-bottom: 1px solid #eeeaf5;
}

.contact-hero-image,
.contact-hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.contact-hero-image {
  object-fit: cover;
}

.contact-hero-overlay {
  background: rgba(248, 246, 251, 0.78);
}

.contact-hero-inner,
.contact-content {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.contact-hero-inner {
  position: relative;
  z-index: 1;
}

.contact-hero-inner {
  min-height: 330px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 4.5rem 0;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #8465c8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

h1,
h2 {
  font-family: 'Paytone One', sans-serif;
  font-weight: 400;
  color: #44476f;
}

h1 {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 1.05;
}

h1 span {
  color: #c3b5df;
}

.hero-copy {
  max-width: 530px;
  margin: 1.5rem 0 0;
  color: #5a5a6e;
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-paw {
  display: grid;
  place-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: #fff;
  color: #c3b5df;
  font-size: 4.5rem;
  transform: rotate(-24deg);
  box-shadow: 0 16px 35px rgba(68, 71, 111, 0.1);
}

.hero-paw img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.contact-content {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(3rem, 8vw, 8rem);
  padding: 5rem 0 6rem;
}

.contact-details h2,
.form-heading h2 {
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;
}

.details-copy,
.form-heading p {
  color: #6b7280;
  line-height: 1.7;
}

.details-copy {
  max-width: 350px;
  margin: 1rem 0 2rem;
}

.detail-list {
  display: grid;
  gap: 1.25rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: inherit;
  text-decoration: none;
}

.detail-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  border-radius: 50%;
  background: #f3eef9;
  color: #6f5aa8;
  font-size: 1.2rem;
  font-weight: 700;
}

.detail-item strong,
.detail-item small {
  display: block;
}

.detail-item strong {
  color: #44476f;
  font-size: 0.9rem;
}

.detail-item small {
  margin-top: 0.2rem;
  color: #6b7280;
  font-size: 0.85rem;
}

.contact-form {
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid #e8e3f0;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(68, 71, 111, 0.07);
}

.form-heading {
  margin-bottom: 1.75rem;
}

.form-heading p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
}

.contact-form label {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  color: #44476f;
  font-size: 0.88rem;
  font-weight: 600;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

input,
select,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd9e8;
  border-radius: 8px;
  padding: 0.85rem 1rem;
  background: #fff;
  color: #1a1a2e;
  font: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

textarea {
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #8465c8;
  box-shadow: 0 0 0 3px rgba(195, 181, 223, 0.35);
}

.success-message {
  margin: 0 0 1rem;
  color: #18794e;
  font-size: 0.9rem;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  border: 0;
  border-radius: 999px;
  padding: 0.8rem 1rem 0.8rem 1.4rem;
  background: #1a1a2e;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.submit-button span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #c3b5df;
  color: #1a1a2e;
  font-size: 1.1rem;
}

.submit-button:hover {
  background: #44476f;
  transform: translateY(-1px);
}

@media (max-width: 760px) {
  .contact-hero-inner {
    min-height: auto;
    padding: 3.5rem 0;
  }

  .hero-paw {
    display: none;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3.5rem 0 4rem;
  }
}

@media (max-width: 520px) {
  .field-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
