<template>
  <main class="reset-password-page">
    <div class="reset-password-card">

      <!-- Header -->
      <div class="card-header">
        <div class="logo">PetsUpRight</div>

        <h1>Reset Password</h1>

        <p v-if="!resetSuccessful">
          Enter your new password below to reset your account password.
        </p>
      </div>

      <!-- Invalid / Missing Token -->
      <div v-if="!token" class="message-state">
        <div class="state-icon error-icon">
          !
        </div>

        <h2>Invalid Reset Link</h2>

        <p>
          This password reset link is missing or invalid.
          Please request a new password reset link.
        </p>

        <NuxtLink to="/forgot-password" class="primary-button">
          Request New Link
        </NuxtLink>
      </div>

      <!-- Reset Form -->
      <form
        v-else-if="!resetSuccessful"
        class="reset-password-form"
        @submit.prevent="handleResetPassword"
      >
        <label>
          <span>New Password</span>

          <input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="Enter new password"
            autocomplete="new-password"
            required
          />
        </label>

        <label>
          <span>Confirm New Password</span>

          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="Confirm new password"
            autocomplete="new-password"
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
          {{ loading ? 'Updating...' : 'Update Password' }}
        </button>
      </form>

      <!-- Success -->
      <div v-else class="message-state">
        <div class="state-icon success-icon">
          ✓
        </div>

        <h2>Password Updated</h2>

        <p>
          Your password has been updated successfully.
          You can now log in using your new password.
        </p>

        <NuxtLink to="/login" class="primary-button">
          Go to Login
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div
        v-if="!resetSuccessful && token"
        class="card-footer"
      >
        <NuxtLink to="/login">
          ← Back to Login
        </NuxtLink>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
const { client } = useVendure()
const route = useRoute()

const token = computed(() => {
  const value = route.query.token

  return typeof value === 'string' ? value : ''
})

const loading = ref(false)
const resetSuccessful = ref(false)
const errorMessage = ref('')

const passwordForm = reactive({
  newPassword: '',
  confirmPassword: '',
})

const RESET_PASSWORD = `
  mutation ResetPassword(
    $token: String!
    $password: String!
  ) {
    resetPassword(
      token: $token
      password: $password
    ) {
      ... on CurrentUser {
        id
        identifier
      }

      ... on PasswordResetTokenInvalidError {
        errorCode
        message
      }

      ... on PasswordResetTokenExpiredError {
        errorCode
        message
      }

      ... on PasswordValidationError {
        errorCode
        message
        validationErrorMessage
      }

      ... on NativeAuthStrategyError {
        errorCode
        message
      }

      ... on NotVerifiedError {
        errorCode
        message
      }
    }
  }
`

async function handleResetPassword() {
  errorMessage.value = ''

  if (!passwordForm.newPassword) {
    errorMessage.value = 'Please enter a new password.'
    return
  }

  if (!passwordForm.confirmPassword) {
    errorMessage.value = 'Please confirm your new password.'
    return
  }

  if (
    passwordForm.newPassword !==
    passwordForm.confirmPassword
  ) {
    errorMessage.value =
      'New password and confirmation password do not match.'
    return
  }

  if (!token.value) {
    errorMessage.value =
      'This password reset link is invalid or missing.'
    return
  }

  loading.value = true

  try {
    const response = await client.request<any>(
      RESET_PASSWORD,
      {
        token: token.value,
        password: passwordForm.newPassword,
      },
    )

    const result = response.resetPassword

    if (result?.id) {
      resetSuccessful.value = true

      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''

      return
    }

    errorMessage.value =
      result?.validationErrorMessage ||
      result?.message ||
      'Unable to reset your password. Please try again.'
  } catch (error: any) {
    console.error(
      'Unable to reset password:',
      error,
    )

    errorMessage.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Unable to reset your password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reset-password-page {
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

.reset-password-card {
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
  max-width: 370px;
  color: #737383;
  font-size: 13px;
  line-height: 1.6;
}

/* Form */

.reset-password-form {
  margin-top: 30px;
}

.reset-password-form label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.reset-password-form label + label {
  margin-top: 22px;
}

.reset-password-form label span {
  color: #555568;
  font-size: 13px;
  font-weight: 600;
}

.reset-password-form input {
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

.reset-password-form input:focus {
  border-color: #8465c8;
  box-shadow: 0 0 0 3px rgba(132, 101, 200, 0.12);
}

.reset-password-form input::placeholder {
  color: #aaa9b5;
}

.submit-button {
  width: 100%;
  min-height: 46px;
  margin-top: 24px;
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
  margin: 14px 0 0;
  color: #b94040;
  font-size: 12px;
  line-height: 1.45;
}

/* State */

.message-state {
  margin-top: 30px;
  text-align: center;
}

.state-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  margin: 0 auto 18px;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 700;
}

.success-icon {
  background: #edf7f1;
  color: #34785a;
}

.error-icon {
  background: #fff1f1;
  color: #b94040;
}

.message-state h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.message-state p {
  margin: 12px auto 0;
  max-width: 370px;
  color: #737383;
  font-size: 13px;
  line-height: 1.6;
}

.primary-button {
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

.primary-button:hover {
  background: #383b61;
}

/* Footer */

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

@media (max-width: 520px) {
  .reset-password-page {
    padding: 24px 16px;
  }

  .reset-password-card {
    padding: 30px 22px;
    border-radius: 15px;
  }

  .card-header h1 {
    font-size: 25px;
  }
}
</style>