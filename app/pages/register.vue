<template>
  <div class="register-page">
    <div class="register-visual">
      <div class="visual-content">
        <h1>Join PetsUpRight!</h1>
        <p>Create an account for a happier, healthier pet journey.</p>
        <div class="visual-image">
          <img src="/images/comfort-care/Dog.png" alt="Happy golden retriever" />
        </div>
      </div>
    </div>

    <div class="register-section">
      <div class="register-card">
        <div class="brand">
          <h2>PetsUpRight</h2>
          <p>Create your account</p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="name-row">
            <div class="form-group">
              <label for="first-name">First name</label>
              <input id="first-name" v-model="firstName" type="text" required />
            </div>
            <div class="form-group">
              <label for="last-name">Last name</label>
              <input id="last-name" v-model="lastName" type="text" required />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input id="email" v-model="email" type="email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" minlength="8" required />
          </div>

          <div class="form-group">
            <label for="confirm-password">Confirm password</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" minlength="8" required />
          </div>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

          <button type="submit" class="register-btn" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="login-text">
          Already have an account?
          <NuxtLink to="/login">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { register } = useAuth()

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    password.value !==
    confirmPassword.value
  ) {
    errorMessage.value =
      'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    await register({
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      password: password.value,
    })

    successMessage.value =
      'Account created successfully.'

    setTimeout(() => {
      navigateTo('/login')
    }, 1200)
  } catch (error: any) {
    errorMessage.value =
      error?.message ||
      'Unable to create account.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
}

.register-visual {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: #f8f6fb;
}

.visual-content {
  width: 100%;
  max-width: 520px;
  text-align: center;
}

.visual-content h1 {
  font-family: 'Paytone One', sans-serif;
  font-size: 48px;
  line-height: 1.2;
  color: #44476f;
  margin: 0;
}

.visual-content p {
  max-width: 420px;
  margin: 1rem auto 0;
  font-size: 18px;
  line-height: 1.6;
  color: #5a5a6e;
}

.visual-image {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.visual-image img {
  width: 100%;
  max-width: 360px;
  height: 360px;
  object-fit: contain;
}

.register-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.register-card {
  width: 100%;
  max-width: 460px;
}

.brand {
  text-align: center;
  margin-bottom: 2rem;
}

.brand h2 {
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 32px;
  margin: 0;
}

.brand p,
.login-text {
  color: #6b7280;
  margin-top: 0.5rem;
}

.name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0.45rem;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d9d6e2;
  border-radius: 6px;
  padding: 0.85rem 1rem;
  font-size: 15px;
}

.register-btn {
  width: 100%;
  border: 0;
  border-radius: 6px;
  padding: 0.9rem 1rem;
  color: #fff;
  background: #1a1a2e;
  font-weight: 600;
  cursor: pointer;
}

.register-btn:disabled {
  opacity: 0.65;
  cursor: wait;
}

.error-message,
.success-message {
  margin: 0 0 1rem;
  font-size: 14px;
}

.error-message { color: #b42318; }
.success-message { color: #18794e; }

.login-text {
  text-align: center;
  margin-top: 1.5rem;
}

.login-text a {
  color: #44476f;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 800px) {
  .register-page { grid-template-columns: 1fr; }
  .register-visual { min-height: auto; padding: 2rem; }
  .visual-content h1 { font-size: 36px; }
  .visual-image { margin-top: 1rem; }
  .visual-image img { height: 220px; }
  .register-section { padding: 2rem 1.25rem; }
}

@media (max-width: 480px) {
  .name-row { grid-template-columns: 1fr; gap: 0; }
}
</style>
