import { useVendure } from './useVendure'

export function useProducts() {
  const { client } = useVendure()

  const SEARCH_PRODUCTS = `
    query SearchProducts($input: SearchInput!) {
      search(input: $input) {
        totalItems

        facetValues {
          count
          facetValue {
            id
            name
            code
            facet {
              id
              name
              code
            }
          }
        }

        items {
          productId
          productName
          slug

          productAsset {
            id
            preview
          }

          priceWithTax {
            __typename

            ... on SinglePrice {
              value
            }

            ... on PriceRange {
              min
              max
            }
          }

          currencyCode
          facetValueIds
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
        customFields {
          petType
        }
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

    facetValueFilters?: Array<{
      and?: string
      or?: string[]
    }>
  } = {}) {
    const {
      take = 12,
      skip = 0,
      term,
      collectionSlug,
      facetValueFilters,
    } = options

    const input: any = {
      groupByProduct: true,
      take,
      skip,
    }

    if (term) {
      input.term = term
    }

    if (collectionSlug) {
      input.collectionSlug = collectionSlug
    }

    if (facetValueFilters?.length) {
      input.facetValueFilters = facetValueFilters
    }

    const data = await client.request(
      SEARCH_PRODUCTS,
      { input }
    )

    return data?.search ?? {
      totalItems: 0,
      items: [],
      facetValues: [],
    }
  }

  const GET_PRODUCTS = `
    query GetProducts($options: ProductListOptions) {
      products(options: $options) {
        totalItems
        items {
          id
          name
          slug
          description

          customFields {
            petType
          }

          featuredAsset {
            id
            preview
          }

          facetValues {
            id
            name
            code
            facet {
              id
              name
              code
            }
          }

          variants {
            id
            name
            sku
            priceWithTax
            stockLevel
            currencyCode
          }
        }
      }
    }
  `

  async function getShopProducts(options: {
    take?: number
    skip?: number
  } = {}) {
    const {
      take = 100,
      skip = 0,
    } = options

    const data = await client.request(GET_PRODUCTS, {
      options: {
        take,
        skip,
      },
    })

    return data?.products ?? {
      totalItems: 0,
      items: [],
    }
  }

  function formatPrice(price: number, currencyCode = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  const GET_SHOP_FACETS = `
    query GetShopFacets {
      facets(options: { take: 100 }) {
        items {
          id
          name
          code

          values {
            id
            name
            code
          }
        }
      }
    }
  `
  async function getShopFacets() {
    const data = await client.request(GET_SHOP_FACETS)

    return data?.facets?.items ?? []
  }

  return {
    getProducts,
    getShopProducts,
    getProductBySlug,
    getShopFacets,
    formatPrice,
  }
}