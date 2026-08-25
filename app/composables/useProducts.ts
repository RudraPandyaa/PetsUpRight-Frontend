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
  const GET_PRODUCT = `
    query GetProduct($slug: String!) {
      product(slug: $slug) {
        id
        name
        slug
        description
        featuredAsset {
          preview
        }
        assets {
          preview
        }
        variants {
          id
          name
          sku
          priceWithTax
          stockLevel
          options {
            code
            name
          }
        }
        facetValues {
          id
          name
          code
          facet {
            name
            code
          }
        }
      }
    }
  `

  async function getProductBySlug(slug: string) {
    const data = await client.request(GET_PRODUCT, { slug })
    return data?.product ?? null
  }

  async function getProducts(options: {
    take?: number
    skip?: number
    term?: string
    collectionSlug?: string
    facetValueIds?: string[]
    minPrice?: number
    maxPrice?: number
  } = {}) {
    const {
      take = 12,
      skip = 0,
      term,
      collectionSlug,
      facetValueIds,
      minPrice,
      maxPrice,
    } = options

    const input: any = {
      groupByProduct: true,
      take,
      skip,
    }

    if (term) input.term = term
    if (collectionSlug) input.collectionSlug = collectionSlug

    if (facetValueIds?.length) {
      input.facetValueFilters = facetValueIds.map((id) => ({ and: id }))
    }

    // default 0–10000 mat bhejo
    if (
      minPrice != null &&
      maxPrice != null &&
      !(minPrice === 0 && maxPrice >= 10000)
    ) {
      input.priceRangeWithTax = {
        min: minPrice * 100,
        max: maxPrice * 100,
      }
    }

    const data = await client.request(SEARCH_PRODUCTS, { input })
    return data?.search ?? { totalItems: 0, items: [] }
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
    getProductBySlug,
    formatPrice,
  }
}