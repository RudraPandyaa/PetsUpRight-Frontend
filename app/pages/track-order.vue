<template>
  <main class="coming-soon-page">
    <div class="coming-soon-card">
      <div class="icon">📦</div>

      <p class="eyebrow">
        Order Tracking
      </p>

      <h1>
        Page Coming Soon
      </h1>

      <p class="description">
        We’re working on order tracking so you can follow
        your package from dispatch to delivery.
      </p>

      <NuxtLink to="/" class="home-button">
        Back to Home
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.coming-soon-page {
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #f8f6fb;
  font-family: 'Inter', sans-serif;
}

.coming-soon-card {
  width: 100%;
  max-width: 580px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #eeeaf5;
  border-radius: 24px;
  padding: 56px 32px;
  box-shadow: 0 18px 50px rgba(68, 71, 111, 0.08);
}

.icon {
  width: 76px;
  height: 76px;
  margin: 0 auto 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f1ecfb;
  font-size: 34px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #8465c8;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: clamp(34px, 6vw, 52px);
  line-height: 1.1;
}

.description {
  max-width: 440px;
  margin: 18px auto 28px;
  color: #72748d;
  font-size: 15px;
  line-height: 1.7;
}

.home-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 24px;
  border-radius: 10px;
  background: #44476f;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  transition: 0.2s ease;
}

.home-button:hover {
  background: #8465c8;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .coming-soon-page {
    padding: 40px 16px;
  }

  .coming-soon-card {
    padding: 42px 22px;
    border-radius: 18px;
  }

  .description {
    font-size: 14px;
  }
}
</style>