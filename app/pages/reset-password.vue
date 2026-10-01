<template>
  <main class="reset-password-page">
    <section class="reset-card">
      <NuxtLink to="/login" class="back-link">
        ← Back to login
      </NuxtLink>

      <!-- Invalid or missing token -->
      <div v-if="!token && !passwordChanged" class="message-state">
        <div class="state-icon error-icon">!</div>

        <h1>Invalid reset link</h1>

        <p>
          This password reset link is invalid or does not contain the required
          token.
        </p>

        <NuxtLink to="/forgot-password" class="primary-link">
          Request a new reset link
        </NuxtLink>
      </div>

      <!-- Reset form -->
      <div v-else-if="!passwordChanged">
        <h1>Create a new password</h1>

        <p class="subtitle">
          Enter a new password for your PetsUpRight account.
        </p>

        <form class="reset-form" @submit.prevent="handleResetPassword">
          <!-- New password -->
          <div class="form-group">
            <label for="new-password">New Password</label>

            <div class="password-field">
              <input
                id="new-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your new password"
                minlength="8"
                autocomplete="new-password"
                required
              />

              <button
                type="button"
                class="password-toggle"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m3 3 18 18" />
                  <path
                    d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8"
                  />
                  <path
                    d="M6.2 6.2C3.5 8 2 12 2 12s3.5 6 10 6c1.6 0 3-.4 4.2-1"
                  />
                </svg>
              </button>
            </div>

            <p class="password-hint">
              Password must contain at least 8 characters.
            </p>
          </div>

          <!-- Confirm password -->
          <div class="form-group">
            <label for="confirm-password">Confirm New Password</label>

            <div class="password-field">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Enter your new password again"
                minlength="8"
                autocomplete="new-password"
                required
              />

              <button
                type="button"
                class="password-toggle"
                :aria-label="
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                "
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <svg
                  v-if="!showConfirmPassword"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m3 3 18 18" />
                  <path
                    d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8"
                  />
                  <path
                    d="M6.2 6.2C3.5 8 2 12 2 12s3.5 6 10 6c1.6 0 3-.4 4.2-1"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="submit-button"
            :disabled="loading"
          >
            {{ loading ? 'Resetting password...' : 'Reset password' }}
          </button>
        </form>
      </div>

      <!-- Success -->
      <div v-else class="message-state">
        <div class="state-icon success-icon">✓</div>

        <h1>Password updated</h1>

        <p>
          Your password has been changed successfully. You can now sign in
          using your new password.
        </p>

        <NuxtLink to="/login" class="primary-link">
          Continue to login
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type ResetPasswordResult =
  | {
      __typename: 'CurrentUser'
      id: string
      identifier: string
    }
  | {
      __typename:
        | 'PasswordResetTokenInvalidError'
        | 'PasswordResetTokenExpiredError'
        | 'PasswordValidationError'
        | 'NativeAuthStrategyError'
        | 'NotVerifiedError'
      errorCode: string
      message: string
    }

type ResetPasswordResponse = {
  data?: {
    resetPassword: ResetPasswordResult
  }
  errors?: Array<{
    message: string
  }>
}

const route = useRoute()
const config = useRuntimeConfig()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const passwordChanged = ref(false)
const errorMessage = ref('')

const token = computed(() => {
  const queryToken = route.query.token

  if (Array.isArray(queryToken)) {
    return queryToken[0] || ''
  }

  return typeof queryToken === 'string' ? queryToken : ''
})

const RESET_PASSWORD = `
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      __typename

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

  if (!token.value) {
    errorMessage.value = 'The password reset token is missing.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must contain at least 8 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'The passwords do not match.'
    return
  }

  loading.value = true

  try {
    const response = await $fetch<ResetPasswordResponse>(
      config.public.vendureShopApiUrl as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: RESET_PASSWORD,
          variables: {
            token: token.value,
            password: password.value,
          },
        },
      },
    )

    if (response.errors?.length) {
      throw new Error(response.errors[0].message)
    }

    const result = response.data?.resetPassword

    if (!result) {
      throw new Error('No response was received from the server.')
    }

    if (result.__typename !== 'CurrentUser') {
      throw new Error(getResetError(result))
    }

    passwordChanged.value = true
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error('Reset password failed:', error)

    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Unable to reset your password. Please try again.'
  } finally {
    loading.value = false
  }
}

function getResetError(result: ResetPasswordResult) {
  switch (result.__typename) {
    case 'PasswordResetTokenInvalidError':
      return 'This password reset link is invalid. Please request a new link.'

    case 'PasswordResetTokenExpiredError':
      return 'This password reset link has expired. Please request a new link.'

    case 'PasswordValidationError':
      return result.message || 'The new password does not meet the requirements.'

    case 'NotVerifiedError':
      return 'Your email address has not been verified.'

    default:
      return 'Unable to reset your password. Please request a new link.'
  }
}

useHead({
  title: 'Reset Password | PetsUpRight',
})
</script>

<style scoped>
.reset-password-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: #f8f7fb;
}

.reset-card {
  width: 100%;
  max-width: 470px;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  box-shadow: 0 12px 35px rgba(68, 71, 111, 0.08);
}

.back-link {
  display: inline-flex;
  margin-bottom: 1.5rem;
  color: #44476f;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  margin: 0 0 0.75rem;
  color: #44476f;
  font-size: 1.8rem;
  line-height: 1.25;
}

.subtitle,
.message-state p {
  margin: 0 0 1.5rem;
  color: #77767f;
  line-height: 1.6;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #44476f;
  font-size: 0.9rem;
  font-weight: 600;
}

.password-field {
  position: relative;
  width: 100%;
}

.password-field input {
  display: block;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 3rem 0 0.95rem;
  color: #25263d;
  background: #ffffff;
  border: 1px solid #d6d7df;
  border-radius: 8px;
  font: inherit;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.password-field input:focus {
  border-color: #44476f;
  box-shadow: 0 0 0 3px rgba(68, 71, 111, 0.12);
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 0.65rem;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  padding: 0;
  color: #77767f;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transform: translateY(-50%);
}

.password-toggle:hover {
  color: #44476f;
  background: #f4f2f8;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.password-hint {
  margin: 0;
  color: #77767f;
  font-size: 0.78rem;
}

.error-message {
  margin: 0;
  padding: 0.75rem;
  color: #b42318;
  background: #fef3f2;
  border: 1px solid #fecdca;
  border-radius: 8px;
  font-size: 0.875rem;
}

.submit-button,
.primary-link {
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: #44476f;
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.submit-button:hover:not(:disabled),
.primary-link:hover {
  background: #383b61;
}

.submit-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.message-state {
  text-align: center;
}

.state-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin: 0 auto 1.25rem;
  color: #ffffff;
  border-radius: 50%;
  font-size: 1.6rem;
  font-weight: 700;
}

.success-icon {
  background: #44476f;
}

.error-icon {
  background: #b42318;
}

@media (max-width: 520px) {
  .reset-card {
    padding: 1.5rem;
  }
}
</style>