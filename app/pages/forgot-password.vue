<template>
  <main class="forgot-password-page">
    <section class="forgot-card">
      <NuxtLink to="/login" class="back-link">
        ← Back to login
      </NuxtLink>

      <div v-if="!submitted">
        <h1>Forgot your password?</h1>

        <p class="subtitle">
          Enter the email address associated with your account. We’ll send you
          instructions to reset your password.
        </p>

        <form class="forgot-form" @submit.prevent="requestReset">
          <div class="form-group">
            <label for="reset-email">Email Address</label>

            <input
              id="reset-email"
              v-model.trim="email"
              type="email"
              autocomplete="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="submit-button"
            :disabled="loading"
          >
            {{ loading ? 'Sending...' : 'Send reset link' }}
          </button>
        </form>
      </div>

      <div v-else class="success-state">
        <div class="success-icon">✓</div>

        <h1>Check your email</h1>

        <p>
          If an account exists for
          <strong>{{ email }}</strong>,
          we have sent password-reset instructions.
        </p>

        <p class="spam-message">
          Please check your spam or junk folder if you cannot find the email.
        </p>

        <button
          type="button"
          class="submit-button"
          @click="resetForm"
        >
          Try another email
        </button>

        <NuxtLink to="/login" class="login-link">
          Return to login
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type PasswordResetResult =
  | {
      __typename: 'Success'
      success: boolean
    }
  | {
      __typename: 'NativeAuthStrategyError'
      errorCode: string
      message: string
    }

type PasswordResetResponse = {
  data?: {
    requestPasswordReset: PasswordResetResult | null
  }
  errors?: Array<{
    message: string
  }>
}

const config = useRuntimeConfig()

const email = ref('')
const loading = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const REQUEST_PASSWORD_RESET = `
  mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      __typename

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

async function requestReset() {
  if (!email.value || loading.value) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<PasswordResetResponse>(
      config.public.vendureShopApiUrl as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: REQUEST_PASSWORD_RESET,
          variables: {
            emailAddress: email.value,
          },
        },
      },
    )

    if (response.errors?.length) {
      throw new Error(response.errors[0].message)
    }

    const result = response.data?.requestPasswordReset

    if (result?.__typename === 'NativeAuthStrategyError') {
      throw new Error(result.message)
    }

    if (!result || result.__typename !== 'Success') {
      throw new Error('Unable to request a password reset')
    }

    submitted.value = true
  } catch (error) {
    console.error('Password reset request failed:', error)

    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Unable to send the reset email. Please try again.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  submitted.value = false
  email.value = ''
  errorMessage.value = ''
}

useHead({
  title: 'Forgot Password | PetsUpRight',
})
</script>

<style scoped>
.forgot-password-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: #f8f7fb;
}

.forgot-card {
  width: 100%;
  max-width: 460px;
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
.success-state p {
  margin: 0 0 1.5rem;
  color: #77767f;
  line-height: 1.6;
}

.forgot-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.form-group input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 0.95rem;
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

.form-group input:focus {
  border-color: #44476f;
  box-shadow: 0 0 0 3px rgba(68, 71, 111, 0.12);
}

.submit-button {
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: #44476f;
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.submit-button:hover:not(:disabled) {
  background: #383b61;
}

.submit-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.error-message {
  margin: 0;
  padding: 0.75rem;
  color: #b42318;
  background: #fef3f2;
  border-radius: 8px;
  font-size: 0.875rem;
}

.success-state {
  text-align: center;
}

.success-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin: 0 auto 1.25rem;
  color: #ffffff;
  background: #44476f;
  border-radius: 50%;
  font-size: 1.6rem;
  font-weight: 700;
}

.spam-message {
  font-size: 0.875rem;
}

.login-link {
  display: inline-block;
  margin-top: 1.25rem;
  color: #44476f;
  font-weight: 600;
}

@media (max-width: 520px) {
  .forgot-card {
    padding: 1.5rem;
  }
}
</style>