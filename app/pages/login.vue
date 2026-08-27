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
          <img
            src="/images/comfort-care/wagging-dog.svg"
            alt="Happy dog"
          />
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

            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>


          <!-- Password -->
          <div class="form-group">

            <div class="password-label">
              <label for="password">Password</label>

              <NuxtLink to="/forgot-password">
                Forgot Password?
              </NuxtLink>
            </div>

            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            />

          </div>


          <!-- Remember Me -->
          <div class="remember-row">

            <label class="remember">
              <input
                v-model="rememberMe"
                type="checkbox"
              />

              <span>Remember me</span>
            </label>

          </div>


          <!-- Login Button -->
          <button
            type="submit"
            class="login-btn"
          >
            Login
          </button>

        </form>


        <!-- Divider -->
        <div class="divider">
          <span>OR</span>
        </div>


        <!-- Google Login -->
<button
  type="button"
  class="google-btn"
  @click="handleGoogleLogin"
>
  <svg
    class="google-logo"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.27c0-.78-.07-1.53-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
    />
    <path
      fill="#34A853"
      d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
    />
    <path
      fill="#FBBC05"
      d="M6.53 13.83A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.53Z"
    />
    <path
      fill="#EA4335"
      d="M12 6.14c1.43 0 2.72.49 3.74 1.46l2.8-2.8C16.84 3.22 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.53c.77-2.31 2.93-4.03 5.47-4.03Z"
    />
  </svg>

  <span>Continue with Google</span>
</button>


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


const handleLogin = () => {
  console.log({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  })

  // Add your login API here
}


const handleGoogleLogin = () => {
  console.log('Google login')
  
  // Add Google authentication here
}

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