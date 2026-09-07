import { GraphQLClient } from 'graphql-request'

export function useVendure() {
  const config = useRuntimeConfig()

  const client = new GraphQLClient(
    config.public.vendureShopApiUrl,
    {
      credentials: 'omit',

      fetch: async (input, init) => {
        const token = import.meta.client
          ? localStorage.getItem('vendure-auth-token')
          : null

        const headers = new Headers(init?.headers)

        headers.set(
          'Content-Type',
          'application/json'
        )

        if (config.public.vendureChannelToken) {
          headers.set(
            'vendure-token',
            config.public.vendureChannelToken
          )
        }

        if (token) {
          headers.set(
            'Authorization',
            `Bearer ${token}`
          )
        }

        const response = await fetch(input, {
          ...init,
          credentials: 'include',
          headers,
        })

        const newToken =
          response.headers.get(
            'vendure-auth-token'
          )

        if (
          newToken &&
          import.meta.client
        ) {
          localStorage.setItem(
            'vendure-auth-token',
            newToken
          )
        }

        return response
      },
    }
  )

  return {
    client,
  }
}