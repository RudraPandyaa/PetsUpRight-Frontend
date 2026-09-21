<template>
  <div class="login-page">

    <!-- Left Side -->
    <div class="login-visual">
      <div class="visual-content">
        <h1>Welcome Back!</h1>

        <p>
          Sign in to continue your journey with
          <strong>PetsUpRight</strong>.
        </p>

        <div class="visual-image">
          <img src="/images/pets-upright-logo-circle.png" alt="Happy golden retriever" />
        </div>
      </div>
    </div>


    <!-- Right Side -->
    <div class="login-section">

      <div class="login-card">

        <!-- Logo / Brand -->
        <div class="brand">
          <h2>PetsUpRight</h2>
          <p>Welcome back</p>
        </div>


        <!-- Login Form -->
        <form @submit.prevent="handleLogin">

          <!-- Email -->
          <div class="form-group">
            <label for="email">Email Address</label>

            <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
          </div>


          <!-- Password -->
          <div class="form-group">

            <div class="password-label">
              <label for="password">Password</label>

              <NuxtLink to="/forgot-password">
                Forgot Password?
              </NuxtLink>
            </div>

            <input id="password" v-model="password" type="password" placeholder="Enter your password" required />

          </div>


          <!-- Remember Me -->
          <div class="remember-row">

            <label class="remember">
              <input v-model="rememberMe" type="checkbox" />

              <span>Remember me</span>
            </label>

          </div>

          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>

          <!-- Login Button -->
          <button type="submit" class="login-btn" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>

        </form>


        <!-- Divider -->
        <div class="divider">
          <span>OR</span>
        </div>


        <!-- Google Login -->
        <div
  ref="googleButton"
  class="google-button-container"
></div>


        <!-- Register -->
        <p class="register-text">
          Don't have an account?

          <NuxtLink to="/register">
            Create Account
          </NuxtLink>
        </p>

      </div>

    </div>

  </div>
</template>


<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const loading = ref(false)
const errorMessage = ref('')
const googleButton = ref<HTMLElement | null>(null)

const { login } = useAuth()

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {
    await login(
      email.value,
      password.value,
      rememberMe.value,
    )

    await navigateTo('/')
  } catch (error: any) {
    errorMessage.value =
      error?.message ||
      'Unable to login.'
  } finally {
    loading.value = false
  }
}

declare global {
  interface Window {
    google?: any
  }
}

function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve()
      return
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    )

    if (existingScript) {
      existingScript.addEventListener(
        'load',
        () => resolve(),
      )

      return
    }

    const script = document.createElement('script')

    script.src =
      'https://accounts.google.com/gsi/client'

    script.async = true
    script.defer = true

    script.onload = () => resolve()

    script.onerror = () =>
      reject(
        new Error(
          'Failed to load Google Sign-In.',
        ),
      )

    document.head.appendChild(script)
  })
}

async function initializeGoogleLogin() {
  errorMessage.value = ''

  const config = useRuntimeConfig()

  const clientId =
    config.public.googleClientId as string

  if (!clientId) {
    errorMessage.value =
      'Google login is not configured.'

    return
  }

  try {
    await loadGoogleScript()

    window.google.accounts.id.initialize({
      client_id: clientId,

      callback: (response: any) => {
        console.log(
          'Google credential:',
          response.credential,
        )

        // We will connect this to Vendure next
      },

      ux_mode: 'popup',

      auto_select: false,
    })

    if (googleButton.value) {
      window.google.accounts.id.renderButton(
        googleButton.value,
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 400,
        },
      )
    }
  } catch (error) {
    console.error(
      'Google login initialization failed:',
      error,
    )

    errorMessage.value =
      'Unable to initialize Google login.'
  }
}

onMounted(() => {
  initializeGoogleLogin()
})

</script>


<style scoped>
/* =========================================================
   LOGIN PAGE
   ========================================================= */

.login-page {
  min-height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: #ffffff;
}


/* =========================================================
   LEFT VISUAL SECTION
   ========================================================= */

.login-visual {
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

  font-family: 'Inter', sans-serif;

  font-size: 18px;
  line-height: 1.6;

  color: #5a5a6e;
}

.visual-content strong {
  color: #44476f;
  font-weight: 600;
}




.google-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* =========================================================
   VISUAL IMAGE
   ========================================================= */

.visual-image {
  margin-top: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-image img {
  width: 100%;
  max-width: 360px;

  height: 360px;

  object-fit: contain;
}


/* =========================================================
   LOGIN SECTION
   ========================================================= */

.login-section {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;
}


/* =========================================================
   LOGIN CARD
   ========================================================= */

.login-card {
  width: 100%;
  max-width: 440px;
}


/* =========================================================
   BRAND
   ========================================================= */

.brand {
  margin-bottom: 2rem;
}

.brand h2 {
  font-family: 'Paytone One', sans-serif;

  font-size: 32px;
  line-height: 1.2;

  color: #44476f;

  margin: 0;
}

.brand p {
  margin-top: 0.5rem;

  font-family: 'Inter', sans-serif;

  font-size: 16px;

  color: #77778a;
}


/* =========================================================
   FORM
   ========================================================= */

.form-group {
  margin-bottom: 1.3rem;
}

.form-group label {
  display: block;

  margin-bottom: 0.5rem;

  font-family: 'Inter', sans-serif;

  font-size: 15px;
  font-weight: 600;

  color: #44476f;
}


/* =========================================================
   PASSWORD LABEL
   ========================================================= */

.password-label {
  display: flex;

  align-items: center;
  justify-content: space-between;
}

.password-label a {
  font-family: 'Inter', sans-serif;

  font-size: 13px;

  color: #6f5aa8;

  text-decoration: none;
}

.password-label a:hover {
  text-decoration: underline;
}


/* =========================================================
   INPUTS
   ========================================================= */

.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;

  height: 52px;

  padding: 0 1rem;

  border: 1px solid #ddd9e8;

  border-radius: 10px;

  outline: none;

  background: #ffffff;

  font-family: 'Inter', sans-serif;

  font-size: 15px;

  color: #44476f;

  box-sizing: border-box;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input::placeholder {
  color: #aaa8b8;
}

.form-group input:focus {
  border-color: #8465c8;

  box-shadow:
    0 0 0 3px rgba(195, 181, 223, 0.35);
}


/* =========================================================
   REMEMBER ME
   ========================================================= */

.remember-row {
  margin-bottom: 1.4rem;
}

.remember {
  display: flex;

  align-items: center;

  gap: 0.5rem;

  cursor: pointer;

  font-family: 'Inter', sans-serif;

  font-size: 14px;

  color: #5a5a6e;
}

.remember input {
  width: 16px;
  height: 16px;

  accent-color: #8465c8;

  cursor: pointer;
}


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

.login-btn {
  width: 100%;

  height: 52px;

  border: none;

  border-radius: 10px;

  background: #44476f;

  color: #ffffff;

  font-family: 'Inter', sans-serif;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.login-btn:hover {
  background: #35375a;

  transform: translateY(-1px);
}


/* =========================================================
   DIVIDER
   ========================================================= */

.divider {
  display: flex;

  align-items: center;

  gap: 1rem;

  margin: 1.8rem 0;

  color: #aaa8b8;

  font-family: 'Inter', sans-serif;

  font-size: 12px;
}

.divider::before,
.divider::after {
  content: '';

  flex: 1;

  height: 1px;

  background: #e5e2ec;
}

.divider span {
  flex-shrink: 0;
}


/* =========================================================
   GOOGLE BUTTON
   ========================================================= */

.google-btn {
  width: 100%;

  height: 52px;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 0.7rem;

  border: 1px solid #ddd9e8;

  border-radius: 10px;

  background: #ffffff;

  color: #44476f;

  font-family: 'Inter', sans-serif;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.google-btn:hover {
  background: #f8f6fb;

  border-color: #c3b5df;
}

.google-logo {
  width: 24px;
  height: 24px;

  flex-shrink: 0;

  display: block;
}


/* =========================================================
   REGISTER
   ========================================================= */

.register-text {
  margin-top: 1.8rem;

  text-align: center;

  font-family: 'Inter', sans-serif;

  font-size: 14px;

  color: #77778a;
}

.register-text a {
  color: #6f5aa8;

  font-weight: 600;

  text-decoration: none;
}

.register-text a:hover {
  text-decoration: underline;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {

  .login-page {
    grid-template-columns: 1fr;
  }

  .login-visual {
    display: none;
  }

  .login-section {
    min-height: 100vh;
  }

}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .login-section {
    padding: 1.5rem;
  }

  .login-card {
    max-width: 100%;
  }

  .brand h2 {
    font-size: 28px;
  }

}
</style>