<template>
  <main class="profile-page">
    <div class="profile-container">
      <div class="profile-heading">
        <div>
          <h1>Profile</h1>
          <p class="heading-copy">
            Manage your personal details and saved delivery addresses.
          </p>
        </div>

        <button type="button" class="logout-button" @click="handleLogout">
          Logout
        </button>
      </div>

      <div v-if="loading" class="state-card">
        Loading your profile...
      </div>

      <template v-else>
        <section class="profile-card">
          <div class="section-heading">
            <div>
              <h2>Personal Details</h2>
              <p>Keep your account information up to date.</p>
            </div>
          </div>

          <form class="personal-form" @submit.prevent="savePersonalDetails">
            <div class="field-grid">
              <label>
                <span>First Name</span>
                <input v-model.trim="personalForm.firstName" type="text" placeholder="First name" required />
              </label>

              <label>
                <span>Last Name</span>
                <input v-model.trim="personalForm.lastName" type="text" placeholder="Last name" required />
              </label>

              <label>
                <span>Email Address</span>
                <input v-model="personalForm.emailAddress" type="email" disabled />
                <small>
                  Your account email cannot be changed from this page.
                </small>
              </label>

              <label>
                <span>Phone Number</span>
                <input v-model.trim="personalForm.phoneNumber" type="tel" placeholder="+91 98765 43210" />
              </label>
            </div>

            <div class="form-footer">
              <p v-if="personalMessage" class="success-message">
                {{ personalMessage }}
              </p>

              <p v-if="personalError" class="error-message">
                {{ personalError }}
              </p>

              <button type="submit" class="primary-button" :disabled="savingPersonal">
                {{ savingPersonal ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </section>

        <section class="profile-card address-section">
          <div class="section-heading address-heading">
            <div>
              <h2>Addresses</h2>
              <p>
                Save up to 5 addresses for faster checkout.
                {{ addresses.length }}/5 saved
              </p>
            </div>

            <button type="button" class="primary-button add-address-button" :disabled="addresses.length >= 5"
              @click="openAddressModal">
              + Add Address
            </button>
          </div>

          <div v-if="addresses.length" class="address-grid">
            <article v-for="address in addresses" :key="address.id" class="address-card">
              <div class="address-card-top">
                <strong>{{ address.fullName }}</strong>

                <div class="badges">
                  <span v-if="address.defaultShippingAddress" class="address-badge">
                    Shipping
                  </span>

                  <span v-if="address.defaultBillingAddress" class="address-badge">
                    Billing
                  </span>
                </div>
              </div>

              <p v-if="address.company">
                {{ address.company }}
              </p>

              <p>{{ address.streetLine1 }}</p>

              <p v-if="address.streetLine2">
                {{ address.streetLine2 }}
              </p>

              <p>
                {{ address.city }}
                <template v-if="address.province">
                  , {{ address.province }}
                </template>
              </p>

              <p>
                {{ address.postalCode }}
                <template v-if="address.country?.name">
                  · {{ address.country.name }}
                </template>
              </p>

              <p v-if="address.phoneNumber" class="address-phone">
                {{ address.phoneNumber }}
              </p>

              <div class="address-actions">
                <button type="button" class="edit-address-button" @click="openEditAddressModal(address)">
                  Edit
                </button>

                <button type="button" class="delete-address-button" @click="deleteAddress(address.id)">
                  Delete
                </button>
              </div>
            </article>
          </div>

          <div v-else class="empty-addresses">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s7-5.1 7-12A7 7 0 1 0 5 9c0 6.9 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>

            <h3>No saved addresses yet</h3>
            <p>
              Add an address now and it will be available during checkout.
            </p>
          </div>

          <p v-if="addresses.length >= 5" class="limit-message">
            You have reached the maximum limit of 5 saved addresses.
          </p>
        </section>
        <!-- Account Quick Links -->
        <section class="account-links">
          <div class="account-links-grid">

            <!-- My Orders -->
            <NuxtLink to="/orders" class="account-link-card">
              <div class="account-link-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>

              <div class="account-link-content">
                <h3>My Orders</h3>
                <p>View your orders and purchase history</p>
              </div>

              <span class="account-link-arrow">→</span>
            </NuxtLink>

            <!-- Track Order -->
            <NuxtLink to="/track-order" class="account-link-card">
              <div class="account-link-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10 17h4V5H2v12h3" />
                  <path d="M14 9h4l4 4v4h-3" />
                  <circle cx="7.5" cy="17.5" r="2.5" />
                  <circle cx="16.5" cy="17.5" r="2.5" />
                </svg>
              </div>

              <div class="account-link-content">
                <h3>Track Order</h3>
                <p>Track your order and delivery status</p>
              </div>

              <span class="account-link-arrow">→</span>
            </NuxtLink>

            <!-- Wishlist -->
            <NuxtLink to="/wishlist" class="account-link-card wishlist-link-card">
              <div class="account-link-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                </svg>
              </div>

              <div class="account-link-content">
                <h3>Wishlist</h3>
                <p>View all the products you've saved for later</p>
              </div>

              <span class="account-link-arrow">→</span>
            </NuxtLink>

          </div>
        </section>
      </template>
    </div>

    <div v-if="showAddressModal" class="modal-backdrop" @click.self="closeAddressModal">
      <div class="address-modal">
        <div class="modal-header">
          <div>
            <h2>
              {{ editingAddressId ? 'Edit address' : 'Add new address' }}
            </h2>

            <p>
              {{
                editingAddressId
                  ? 'Update your saved address.'
                  : 'Add a new address to your account.'
              }}
            </p>
          </div>

          <button type="button" class="close-button" aria-label="Close" @click="closeAddressModal">
            ×
          </button>
        </div>

        <form @submit.prevent="saveAddress">
          <div class="modal-field-grid">
            <label>
              <span>Full Name</span>
              <input v-model.trim="addressForm.fullName" type="text" placeholder="John Doe" required />
            </label>

            <label>
              <span>Company</span>
              <input v-model.trim="addressForm.company" type="text" placeholder="Company (optional)" />
            </label>

            <label>
              <span>Street Address</span>
              <input v-model.trim="addressForm.streetLine1" type="text" placeholder="123 Main St" required />
            </label>

            <label>
              <span>Apartment, suite, etc.</span>
              <input v-model.trim="addressForm.streetLine2" type="text" placeholder="Apt 4B (optional)" />
            </label>

            <label>
              <span>City</span>
              <input v-model.trim="addressForm.city" type="text" placeholder="City" required />
            </label>

            <label>
              <span>State/Province</span>
              <input v-model.trim="addressForm.province" type="text" placeholder="State/Province" />
            </label>

            <label>
              <span>Postal Code</span>
              <input v-model.trim="addressForm.postalCode" type="text" placeholder="Postal Code" required />
            </label>

            <label>
              <span>Country</span>

              <select v-model="addressForm.countryCode" required>
                <option disabled value="">
                  Select a country
                </option>

                <option v-for="country in countries" :key="country.id" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
            </label>

            <label>
              <span>Phone Number</span>
              <input v-model.trim="addressForm.phoneNumber" type="tel" placeholder="Phone (optional)" />
            </label>
          </div>

          <div class="checkbox-row">
            <label class="checkbox-field">
              <input v-model="addressForm.defaultShippingAddress" type="checkbox" />

              <span>
                <strong>Default Shipping Address</strong>
                <small>Use as the default shipping address</small>
              </span>
            </label>

            <label class="checkbox-field">
              <input v-model="addressForm.defaultBillingAddress" type="checkbox" />

              <span>
                <strong>Default Billing Address</strong>
                <small>Use as the default billing address</small>
              </span>
            </label>
          </div>

          <p v-if="addressError" class="error-message modal-message">
            {{ addressError }}
          </p>

          <div class="modal-footer">
            <button type="button" class="secondary-button" @click="closeAddressModal">
              Cancel
            </button>

            <button type="submit" class="primary-button" :disabled="savingAddress">
              {{
                savingAddress
                  ? 'Saving...'
                  : editingAddressId
                    ? 'Update Address'
                    : 'Save Address'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { client } = useVendure()
const {
  loadCurrentCustomer,
  logout,
} = useAuth()

const loading = ref(true)
const savingPersonal = ref(false)
const savingAddress = ref(false)
const showAddressModal = ref(false)

const editingAddressId = ref<string | null>(null)
const deletingAddressId = ref<string | null>(null)

const personalMessage = ref('')
const personalError = ref('')
const addressError = ref('')

const addresses = ref<any[]>([])
const countries = ref<any[]>([])

const personalForm = reactive({
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
})

const addressForm = reactive({
  fullName: '',
  company: '',
  streetLine1: '',
  streetLine2: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: '',
  phoneNumber: '',
  defaultShippingAddress: false,
  defaultBillingAddress: false,
})

const ACTIVE_CUSTOMER = `
  query ActiveCustomerProfile {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      addresses {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
        country {
          id
          code
          name
        }
      }
    }
  }
`

const AVAILABLE_COUNTRIES = `
  query AvailableCountries {
    availableCountries {
      id
      code
      name
    }
  }
`

const UPDATE_CUSTOMER = `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`

const CREATE_CUSTOMER_ADDRESS = `
  mutation CreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      id
      fullName
      company
      streetLine1
      streetLine2
      city
      province
      postalCode
      phoneNumber
      defaultShippingAddress
      defaultBillingAddress
      country {
        id
        code
        name
      }
    }
  }
`

const UPDATE_CUSTOMER_ADDRESS = `
  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      id
      fullName
      company
      streetLine1
      streetLine2
      city
      province
      postalCode
      phoneNumber
      defaultShippingAddress
      defaultBillingAddress
      country {
        id
        code
        name
      }
    }
  }
`

const DELETE_CUSTOMER_ADDRESS = `
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`

onMounted(async () => {
  await initializeProfile()
})

async function initializeProfile() {
  loading.value = true

  try {
    const response = await client.request<any>(ACTIVE_CUSTOMER)

    if (!response.activeCustomer) {
      await navigateTo('/login')
      return
    }

    setCustomerData(response.activeCustomer)

    const countryResponse =
      await client.request<any>(AVAILABLE_COUNTRIES)

    countries.value =
      countryResponse.availableCountries || []

    if (
      !addressForm.countryCode &&
      countries.value.some(
        (country: any) => country.code === 'IN',
      )
    ) {
      addressForm.countryCode = 'IN'
    }
  } catch (error) {
    console.error('Unable to load profile:', error)
  } finally {
    loading.value = false
  }
}

function setCustomerData(customer: any) {
  personalForm.firstName = customer.firstName || ''
  personalForm.lastName = customer.lastName || ''
  personalForm.emailAddress = customer.emailAddress || ''
  personalForm.phoneNumber = customer.phoneNumber || ''

  addresses.value = customer.addresses || []
}

async function refreshCustomer() {
  const response = await client.request<any>(ACTIVE_CUSTOMER)

  if (response.activeCustomer) {
    setCustomerData(response.activeCustomer)
  }

  await loadCurrentCustomer()
}

async function savePersonalDetails() {
  personalMessage.value = ''
  personalError.value = ''
  savingPersonal.value = true

  try {
    await client.request(UPDATE_CUSTOMER, {
      input: {
        firstName: personalForm.firstName,
        lastName: personalForm.lastName,
        phoneNumber: personalForm.phoneNumber || undefined,
      },
    })

    await refreshCustomer()

    personalMessage.value =
      'Personal details updated successfully.'
  } catch (error: any) {
    personalError.value =
      getGraphQLError(error) ||
      'Unable to update your details.'
  } finally {
    savingPersonal.value = false
  }
}

function openAddressModal() {
  if (addresses.value.length >= 5) {
    return
  }

  editingAddressId.value = null
  addressError.value = ''
  resetAddressForm()
  showAddressModal.value = true
}

function openEditAddressModal(address: any) {
  editingAddressId.value = String(address.id)
  addressError.value = ''

  addressForm.fullName = address.fullName || ''
  addressForm.company = address.company || ''
  addressForm.streetLine1 = address.streetLine1 || ''
  addressForm.streetLine2 = address.streetLine2 || ''
  addressForm.city = address.city || ''
  addressForm.province = address.province || ''
  addressForm.postalCode = address.postalCode || ''
  addressForm.countryCode = address.country?.code || ''
  addressForm.phoneNumber = address.phoneNumber || ''
  addressForm.defaultShippingAddress =
    !!address.defaultShippingAddress
  addressForm.defaultBillingAddress =
    !!address.defaultBillingAddress

  showAddressModal.value = true
}

function closeAddressModal() {
  if (savingAddress.value) {
    return
  }

  showAddressModal.value = false
  editingAddressId.value = null
  addressError.value = ''
}

async function saveAddress() {
  addressError.value = ''

  if (
    !editingAddressId.value &&
    addresses.value.length >= 5
  ) {
    addressError.value =
      'You can save a maximum of 5 addresses.'
    return
  }

  savingAddress.value = true

  const input = {
    fullName: addressForm.fullName,
    company: addressForm.company || undefined,
    streetLine1: addressForm.streetLine1,
    streetLine2:
      addressForm.streetLine2 || undefined,
    city: addressForm.city,
    province: addressForm.province || undefined,
    postalCode: addressForm.postalCode,
    countryCode: addressForm.countryCode,
    phoneNumber:
      addressForm.phoneNumber || undefined,
    defaultShippingAddress:
      addressForm.defaultShippingAddress,
    defaultBillingAddress:
      addressForm.defaultBillingAddress,
  }

  try {
    if (editingAddressId.value) {
      await client.request(
        UPDATE_CUSTOMER_ADDRESS,
        {
          input: {
            id: editingAddressId.value,
            ...input,
          },
        },
      )
    } else {
      await client.request(
        CREATE_CUSTOMER_ADDRESS,
        { input },
      )
    }

    await refreshCustomer()

    showAddressModal.value = false
    editingAddressId.value = null
    resetAddressForm()
  } catch (error: any) {
    addressError.value =
      getGraphQLError(error) ||
      'Unable to save this address.'
  } finally {
    savingAddress.value = false
  }
}

async function deleteAddress(id: string | number) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this address?',
  )

  if (!confirmed) {
    return
  }

  deletingAddressId.value = String(id)

  try {
    await client.request(
      DELETE_CUSTOMER_ADDRESS,
      {
        id: String(id),
      },
    )

    await refreshCustomer()
  } catch (error) {
    console.error(
      'Unable to delete address:',
      error,
    )
  } finally {
    deletingAddressId.value = null
  }
}

function resetAddressForm() {
  addressForm.fullName =
    `${personalForm.firstName} ${personalForm.lastName}`.trim()

  addressForm.company = ''
  addressForm.streetLine1 = ''
  addressForm.streetLine2 = ''
  addressForm.city = ''
  addressForm.province = ''
  addressForm.postalCode = ''
  addressForm.phoneNumber =
    personalForm.phoneNumber || ''

  addressForm.defaultShippingAddress = false
  addressForm.defaultBillingAddress = false

  addressForm.countryCode =
    countries.value.some(
      (country: any) => country.code === 'IN',
    )
      ? 'IN'
      : ''
}

async function handleLogout() {
  await logout()
  await navigateTo('/login')
}

function getGraphQLError(error: any) {
  return (
    error?.response?.errors?.[0]?.message ||
    error?.message ||
    ''
  )
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 64px 0 90px;
  background: #f8f6fb;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
}

.profile-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.profile-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0 0 9px;
  color: #8465c8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.profile-heading h1 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 400;
  line-height: 1.1;
}

.heading-copy {
  margin: 12px 0 0;
  color: #6b6b7c;
  font-size: 15px;
  line-height: 1.6;
}

.profile-card,
.state-card {
  margin-bottom: 24px;
  padding: 30px;
  border: 1px solid #eeeaf5;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(68, 71, 111, 0.06);
}

.state-card {
  color: #6b6b7c;
  text-align: center;
}

.section-heading {
  margin-bottom: 24px;
}

.section-heading h2,
.modal-header h2 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

.section-heading p,
.modal-header p {
  margin: 7px 0 0;
  color: #737383;
  font-size: 13px;
  line-height: 1.5;
}

.address-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.field-grid,
.modal-field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.field-grid label,
.modal-field-grid label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-grid label span,
.modal-field-grid label span {
  color: #555568;
  font-size: 13px;
  font-weight: 600;
}

.field-grid label small {
  color: #9292a0;
  font-size: 11px;
  line-height: 1.4;
}

input,
select {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border: 1px solid #d9d9e2;
  border-radius: 7px;
  padding: 0 14px;
  outline: none;
  background: #ffffff;
  color: #1a1a2e;
  font: inherit;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
select:focus {
  border-color: #8465c8;
  box-shadow: 0 0 0 3px rgba(132, 101, 200, 0.12);
}

input:disabled {
  background: #f6f5f8;
  color: #777789;
  cursor: not-allowed;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 22px;
}

.primary-button,
.secondary-button,
.logout-button {
  min-height: 44px;
  border-radius: 7px;
  padding: 0 18px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.primary-button {
  border: 1px solid #44476f;
  background: #44476f;
  color: #ffffff;
}

.primary-button:hover:not(:disabled) {
  background: #383b61;
}

.primary-button:active:not(:disabled),
.secondary-button:active,
.logout-button:active {
  transform: translateY(1px);
}

.primary-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.secondary-button,
.logout-button {
  border: 1px solid #d9d9e2;
  background: #ffffff;
  color: #44476f;
}

.secondary-button:hover,
.logout-button:hover {
  border-color: #b9afd1;
  background: #f8f6fb;
}

.add-address-button {
  flex: 0 0 auto;
}

.address-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.address-card {
  min-height: 185px;
  padding: 20px;
  border: 1px solid #e2ddea;
  border-radius: 12px;
  background: #fbfafe;
}

.address-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.address-card-top strong {
  color: #30324f;
  font-size: 15px;
}

.address-card p {
  margin: 4px 0;
  color: #686879;
  font-size: 13px;
  line-height: 1.45;
}

.address-phone {
  margin-top: 12px !important;
  color: #44476f !important;
  font-weight: 600;
}

.address-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.edit-address-button,
.delete-address-button {
  height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.edit-address-button {
  border: 1px solid #44476f;
  background: #ffffff;
  color: #44476f;
}

.edit-address-button:hover {
  background: #f3f1f8;
}

.delete-address-button {
  border: 1px solid #e4b4b4;
  background: #fffafa;
  color: #b54848;
}

.delete-address-button:hover {
  background: #fff1f1;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;
}

.address-badge {
  padding: 4px 7px;
  border-radius: 999px;
  background: #eee9f8;
  color: #6e56a5;
  font-size: 10px;
  font-weight: 700;
}

.empty-addresses {
  padding: 44px 20px;
  border: 1px dashed #d7d0e2;
  border-radius: 12px;
  text-align: center;
}

.empty-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #f2eef9;
  color: #8465c8;
}

.empty-icon svg {
  width: 23px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.empty-addresses h3 {
  margin: 0;
  color: #44476f;
  font-size: 15px;
}

.empty-addresses p {
  margin: 7px auto 0;
  max-width: 380px;
  color: #838392;
  font-size: 13px;
  line-height: 1.5;
}

.limit-message {
  margin: 16px 0 0;
  color: #8b728f;
  font-size: 12px;
}

.success-message,
.error-message {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
}

.success-message {
  color: #34785a;
}

.error-message {
  color: #b94040;
}

.modal-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(26, 26, 46, 0.48);
  backdrop-filter: blur(3px);
}

.address-modal {
  width: min(720px, 100%);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 28px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(26, 26, 46, 0.25);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.close-button {
  flex: 0 0 auto;
  border: 0;
  padding: 0;
  background: transparent;
  color: #777789;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.close-button:hover {
  color: #44476f;
}

.checkbox-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.checkbox-field {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

.checkbox-field input {
  flex: 0 0 auto;
  width: 17px;
  height: 17px;
  margin-top: 2px;
  padding: 0;
  accent-color: #44476f;
}

.checkbox-field span {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.checkbox-field strong {
  color: #555568;
  font-size: 12px;
}

.checkbox-field small {
  color: #8b8b99;
  font-size: 11px;
  line-height: 1.45;
}

.modal-message {
  margin-top: 18px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 26px;
}
/* Account Quick Links */

.account-links {
  margin-bottom: 24px;
}

.account-links-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.account-link-card {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 105px;
  box-sizing: border-box;
  padding: 22px;
  border: 1px solid #eeeaf5;
  border-radius: 16px;
  background: #ffffff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 12px 32px rgba(68, 71, 111, 0.06);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.account-link-card:hover {
  transform: translateY(-2px);
  border-color: #d1c7e6;
  box-shadow: 0 16px 38px rgba(68, 71, 111, 0.1);
}

/* Wishlist takes complete second row */
.wishlist-link-card {
  grid-column: 1 / -1;
}

.account-link-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 13px;
  background: #f2eef9;
  color: #8465c8;
}

.account-link-icon svg {
  width: 25px;
  height: 25px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.account-link-content {
  flex: 1;
  min-width: 0;
}

.account-link-content h3 {
  margin: 0;
  color: #44476f;
  font-family: 'Paytone One', sans-serif;
  font-size: 17px;
  font-weight: 400;
}

.account-link-content p {
  margin: 5px 0 0;
  color: #838392;
  font-size: 12px;
  line-height: 1.5;
}

.account-link-arrow {
  flex: 0 0 auto;
  color: #a09aaa;
  font-size: 21px;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.account-link-card:hover .account-link-arrow {
  color: #8465c8;
  transform: translateX(4px);
}

@media (max-width: 760px) {

  .account-links-grid {
  grid-template-columns: 1fr;
}

.wishlist-link-card {
  grid-column: auto;
}

.account-link-card {
  min-height: 95px;
  padding: 18px;
}

.account-link-icon {
  width: 48px;
  height: 48px;
}

.account-link-icon svg {
  width: 23px;
  height: 23px;
}
  .profile-page {
    padding: 36px 0 60px;
  }

  .profile-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .profile-card {
    padding: 22px 18px;
  }

  .address-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .field-grid,
  .modal-field-grid,
  .address-grid,
  .checkbox-row {
    grid-template-columns: 1fr;
  }

  .add-address-button,
  .logout-button {
    width: 100%;
  }

  .form-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .form-footer .primary-button {
    width: 100%;
  }

  .modal-backdrop {
    padding: 12px;
  }

  .address-modal {
    max-height: calc(100vh - 24px);
    padding: 22px 18px;
  }
}
</style>
