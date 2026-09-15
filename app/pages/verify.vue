<template>
  <main class="verify-page">
    <section class="verify-card">
      <!-- Loading -->
      <div v-if="status === 'loading'" class="state">
        <div class="loader" aria-hidden="true"></div>

        <p class="eyebrow">JUST A MOMENT</p>

        <h1>
          Verifying your<br />
          <span>email address.</span>
        </h1>

        <p class="description">
          We're confirming your email address and activating your account.
        </p>
      </div>

      <!-- Success -->
      <div v-else-if="status === 'success'" class="state">
        <div class="status-icon success-icon" aria-hidden="true">
          ✓
        </div>

        <p class="eyebrow">EMAIL VERIFIED</p>

        <h1>
          You're all<br />
          <span>set!</span>
        </h1>

        <p class="description">
          Your email address has been verified successfully.
          Your PetsUpRight account is now ready to use.
        </p>

        <NuxtLink to="/login" class="primary-button">
          Continue to login
          <span aria-hidden="true">&#8594;</span>
        </NuxtLink>
      </div>

      <!-- Error -->
      <div v-else class="state">
        <div class="status-icon error-icon" aria-hidden="true">
          !
        </div>

        <p class="eyebrow">VERIFICATION UNSUCCESSFUL</p>

        <h1>
          We couldn't<br />
          <span>verify your email.</span>
        </h1>

        <p class="description">
          {{ errorMessage }}
        </p>

        <div class="actions">
          <NuxtLink to="/login" class="primary-button">
            Go to login
            <span aria-hidden="true">&#8594;</span>
          </NuxtLink>

          <NuxtLink to="/" class="secondary-button">
            Back to home
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { GraphQLClient } from 'graphql-request'

const config = useRuntimeConfig()
const route = useRoute()

const client = new GraphQLClient(
  config.public.vendureShopApiUrl as string,
  {
    credentials: 'include',
  },
)

const status = ref<'loading' | 'success' | 'error'>('loading')

const errorMessage = ref(
  'The verification link is invalid or has expired. Please request a new verification email.',
)

const VERIFY_CUSTOMER_ACCOUNT = `
  mutation VerifyCustomerAccount($token: String!) {
    verifyCustomerAccount(token: $token) {
      ... on CurrentUser {
        id
        identifier
      }

      ... on VerificationTokenInvalidError {
        errorCode
        message
      }

      ... on VerificationTokenExpiredError {
        errorCode
        message
      }

      ... on MissingPasswordError {
        errorCode
        message
      }

      ... on PasswordValidationError {
        errorCode
        message
      }

      ... on PasswordAlreadySetError {
        errorCode
        message
      }

      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`

interface VerificationSuccess {
  id: string
  identifier: string
}

interface VerificationError {
  errorCode: string
  message: string
}

type VerificationResult =
  | VerificationSuccess
  | VerificationError

interface VerificationResponse {
  verifyCustomerAccount: VerificationResult
}

const verifyEmail = async () => {
  const token = route.query.token

  if (!token || typeof token !== 'string') {
    status.value = 'error'

    errorMessage.value =
      'This verification link is missing the verification token. Please use the link from your verification email.'

    return
  }

  try {
    const response = await client.request<VerificationResponse>(
      VERIFY_CUSTOMER_ACCOUNT,
      {
        token,
      },
    )

    const result = response.verifyCustomerAccount

    if ('id' in result) {
      status.value = 'success'
      return
    }

    status.value = 'error'

    errorMessage.value =
      result.message ||
      'The verification link is invalid or has expired.'
  } catch (error: any) {
    console.error('Customer verification failed:', error)

    status.value = 'error'

    errorMessage.value =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      'Something went wrong while verifying your email. Please try again.'
  }
}

onMounted(() => {
  verifyEmail()
})
</script>

<style scoped>
.verify-page {
  min-height: calc(100vh - 120px);
  display: grid;
  place-items: center;
  padding: 4rem 1.25rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(195, 181, 223, 0.28),
      transparent 35%
    ),
    #f8f6fb;
  color: #1a1a2e;
}

.verify-card {
  width: min(560px, 100%);
  padding: clamp(2rem, 6vw, 4rem);
  border: 1px solid #e8e3f0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(68, 71, 111, 0.07);
  text-align: center;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #8465c8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

h1 {
  margin: 0;
  font-family: 'Paytone One', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  line-height: 1.05;
  color: #44476f;
}

h1 span {
  color: #c3b5df;
}

.description {
  max-width: 430px;
  margin: 1.25rem 0 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.7;
}

.status-icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  font-size: 1.8rem;
  font-weight: 700;
}

.success-icon {
  background: #edf8f2;
  color: #18794e;
}

.error-icon {
  background: #fdf0f0;
  color: #b42318;
}

.loader {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  border: 4px solid #eeeaf5;
  border-top-color: #8465c8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 700;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;
}

.primary-button {
  gap: 1rem;
  margin-top: 2rem;
  border-radius: 999px;
  padding: 0.8rem 1rem 0.8rem 1.4rem;
  background: #1a1a2e;
  color: #fff;
}

.primary-button span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #c3b5df;
  color: #1a1a2e;
  font-size: 1.1rem;
}

.primary-button:hover {
  background: #44476f;
  transform: translateY(-1px);
}

.secondary-button {
  margin-top: 1rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid #ddd9e8;
  border-radius: 999px;
  background: #fff;
  color: #44476f;
}

.secondary-button:hover {
  border-color: #c3b5df;
  background: #f8f6fb;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 520px) {
  .verify-page {
    min-height: calc(100vh - 100px);
    padding: 2rem 1rem;
  }

  .verify-card {
    padding: 2.5rem 1.25rem;
  }

  h1 {
    font-size: 2.4rem;
  }
}
</style>