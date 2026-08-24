import { useVendure } from './useVendure'

export function useProducts() {
  const { client } = useVendure()

  const SEARCH_PRODUCTS = `
    query SearchProducts($input: SearchInput!) {
      search(input: $input) {
        totalItems
        items {
          productId
          productName
          slug
          productAsset {
            id
            preview
          }
          priceWithTax {
            ... on SinglePrice {
              value
            }
            ... on PriceRange {
              min
              max
            }
          }
          currencyCode
        }
      }
    }
  `

  async function getProducts(options: {
    take?: number
    skip?: number
    term?: string
    collectionSlug?: string
    facetValueIds?: string[]
    minPrice?: number
    maxPrice?: number
  } = {}) {
    const { take = 12, skip = 0, term, collectionSlug, facetValueIds, minPrice, maxPrice } = options

    const input: any = {
      groupByProduct: true,
      take,
      skip,
    }

    if (term) input.term = term
    if (collectionSlug) input.collectionSlug = collectionSlug

    if (facetValueIds && facetValueIds.length > 0) {
      input.facetValueFilters = facetValueIds.map((id) => ({ and: id }))
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      input.priceRange = {}
      if (minPrice !== undefined) input.priceRange.min = minPrice * 100
      if (maxPrice !== undefined) input.priceRange.max = maxPrice * 100
    }

    const data = await client.request(SEARCH_PRODUCTS, { input })
    return data.search
  }

  function formatPrice(price: number, currencyCode = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  return {
    getProducts,
    formatPrice,
  }
}