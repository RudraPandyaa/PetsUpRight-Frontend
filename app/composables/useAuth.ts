export function useAuth() {
  const { client } = useVendure()

  const customer = useState<any | null>(
    'auth-customer',
    () => null,
  )

  const isLoggedIn = computed(
    () => !!customer.value,
  )

  async function login(
    emailAddress: string,
    password: string,
    rememberMe = false,
  ) {
    const response = await client.request<{
      login:
        | {
            __typename: 'CurrentUser'
            id: string
            identifier: string
          }
        | {
            __typename: string
            errorCode?: string
            message?: string
          }
    }>(
      `
        mutation Login(
          $username: String!
          $password: String!
          $rememberMe: Boolean!
        ) {
          login(
            username: $username
            password: $password
            rememberMe: $rememberMe
          ) {
            __typename

            ... on CurrentUser {
              id
              identifier
            }

            ... on ErrorResult {
              errorCode
              message
            }
          }
        }
      `,
      {
        username: emailAddress,
        password,
        rememberMe,
      },
    )

    if (response.login.__typename !== 'CurrentUser') {
      throw new Error(
        response.login.message ||
          'Invalid email or password.',
      )
    }

    await loadCurrentCustomer()

    return response.login
  }

  async function register(input: {
    firstName: string
    lastName: string
    emailAddress: string
    password: string
  }) {
    const response = await client.request<{
      registerCustomerAccount: {
        __typename: string
        errorCode?: string
        message?: string
      }
    }>(
      `
        mutation RegisterCustomer(
          $input: RegisterCustomerInput!
        ) {
          registerCustomerAccount(input: $input) {
            __typename

            ... on ErrorResult {
              errorCode
              message
            }
          }
        }
      `,
      {
        input,
      },
    )

    const result =
      response.registerCustomerAccount

    if (result.__typename !== 'Success') {
      throw new Error(
        result.message ||
          'Unable to create account.',
      )
    }

    return result
  }

  async function loadCurrentCustomer() {
    try {
      const response = await client.request<{
        activeCustomer: any | null
      }>(`
        query ActiveCustomer {
          activeCustomer {
            id
            firstName
            lastName
            emailAddress
          }
        }
      `)

      customer.value =
        response.activeCustomer
    } catch {
      customer.value = null
    }
  }

  async function logout() {
    await client.request(`
      mutation Logout {
        logout {
          success
        }
      }
    `)

    customer.value = null
  }

  return {
    customer,
    isLoggedIn,
    login,
    register,
    logout,
    loadCurrentCustomer,
  }
}