import { GraphQLClient } from 'graphql-request'

export function useVendure() {
  const config = useRuntimeConfig()

  const client = new GraphQLClient(config.public.vendureShopApiUrl, {
    credentials: 'include', // cookies ke liye important
    headers: {
      'Content-Type': 'application/json',
      ...(config.public.vendureChannelToken
        ? { 'vendure-token': config.public.vendureChannelToken }
        : {}),
    },
  })

  return {
    client,
  }
}