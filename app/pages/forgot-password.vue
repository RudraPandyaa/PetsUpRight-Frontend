<template>
  <main class="forgot-password-page">
    <div class="forgot-password-card">
      <!-- Header -->
      <div class="card-header">
        <div class="logo">PetsUpRight</div>

        <h1>Forgot Password?</h1>

        <p>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <!-- Form -->
      <form
        v-if="!emailSent"
        class="forgot-password-form"
        @submit.prevent="handleForgotPassword"
      >
        <label>
          <span>Email Address</span>

          <input
            v-model.trim="emailAddress"
            type="email"
            placeholder="Enter your email address"
            autocomplete="email"
            required
          />
        </label>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="submit-button"
          :disabled="loading"
        >
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </button>
      </form>

      <!-- Success -->
      <div v-else class="success-state">
        <div class="success-icon">
          ✓
        </div>

        <h2>Check Your Email</h2>

        <p>
          If an account exists for
          <strong>{{ emailAddress }}</strong>,
          we've sent you a password reset link.
        </p>

        <p class="success-note">
          Please check your inbox and follow the instructions to reset
          your password.
        </p>

        <NuxtLink to="/login" class="back-login-button">
          Back to Login
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div v-if="!emailSent" class="card-footer">
        <NuxtLink to="/login">
          ← Back to Login
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { client } = useVendure()

const emailAddress = ref('')
const loading = ref(false)
const emailSent = ref(false)
const errorMessage = ref('')

const REQUEST_PASSWORD_RESET = `
  mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      ... on Success {
        success
      }

      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`

async function handleForgotPassword() {
  errorMessage.value = ''

  if (!emailAddress.value) {
    errorMessage.value = 'Please enter your email address.'
    return
  }

  loading.value = true

  try {
    const response = await client.request<any>(
      REQUEST_PASSWORD_RESET,
      {
        emailAddress: emailAddress.value,
      },
    )

    const result = response.requestPasswordReset

    if (result?.success) {
      emailSent.value = true
      return
    }

    errorMessage.value =
      result?.message ||
      'Unable to process your request. Please try again.'
  } catch (error: any) {
    console.error(
      'Unable to request password reset:',
      error,
    )

    errorMessage.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Unable to process your request. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  background: #f8f6fb;
  font-family: 'Inter', sans-serif;
  color: #1a1a2e;
}

.forgot-password-card {
  width: min(460px, 100%);
  box-sizing: border-box;
  padding: 38px;
  border: 1px solid #eeeaf5;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(68, 71, 111, 0.1);
}

.card-header {
  text-align: center;
}

.logo {
  margin-bottom: 28px;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 25px;
}

.card-header h1 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 28px;
  font-weight: 400;
}

.card-header p {
  margin: 12px auto 0;
  max-width: 360px;
  color: #737383;
  font-size: 13px;
  line-height: 1.6;
}

.forgot-password-form {
  margin-top: 30px;
}

.forgot-password-form label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.forgot-password-form label span {
  color: #555568;
  font-size: 13px;
  font-weight: 600;
}

.forgot-password-form input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 14px;
  border: 1px solid #d9d9e2;
  border-radius: 7px;
  outline: none;
  background: #ffffff;
  color: #1a1a2e;
  font: inherit;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.forgot-password-form input:focus {
  border-color: #8465c8;
  box-shadow: 0 0 0 3px rgba(132, 101, 200, 0.12);
}

.forgot-password-form input::placeholder {
  color: #aaa9b5;
}

.submit-button {
  width: 100%;
  min-height: 46px;
  margin-top: 22px;
  border: 1px solid #44476f;
  border-radius: 7px;
  background: #44476f;
  color: #ffffff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.submit-button:hover:not(:disabled) {
  background: #383b61;
}

.submit-button:active:not(:disabled) {
  transform: translateY(1px);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  margin: 12px 0 0;
  color: #b94040;
  font-size: 12px;
  line-height: 1.45;
}

.card-footer {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid #eeeaf5;
  text-align: center;
}

.card-footer a {
  color: #8465c8;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.card-footer a:hover {
  text-decoration: underline;
}

/* Success */

.success-state {
  margin-top: 28px;
  text-align: center;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: #edf7f1;
  color: #34785a;
  font-size: 25px;
  font-weight: 700;
}

.success-state h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.success-state p {
  margin: 12px auto 0;
  max-width: 370px;
  color: #737383;
  font-size: 13px;
  line-height: 1.6;
}

.success-state strong {
  color: #44476f;
  font-weight: 600;
}

.success-note {
  font-size: 12px !important;
  color: #9292a0 !important;
}

.back-login-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: 24px;
  padding: 0 20px;
  border: 1px solid #44476f;
  border-radius: 7px;
  background: #44476f;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease;
}

.back-login-button:hover {
  background: #383b61;
}

@media (max-width: 520px) {
  .forgot-password-page {
    padding: 24px 16px;
  }

  .forgot-password-card {
    padding: 30px 22px;
    border-radius: 15px;
  }

  .card-header h1 {
    font-size: 25px;
  }
}
</style>