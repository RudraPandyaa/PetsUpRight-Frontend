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
          productVariantId
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
          isFood
          ingredients
          usageAndFeeding
          specifications
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
          featuredAsset {
            preview
          }
          options {
            id
            code
            name
            groupId
          }
        }
        optionGroups {
          id
          name
          code
          options {
            id
            name
            code
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

  interface ProductRatingSummary {
    productId: string
    averageRating: number
    totalReviews: number
  }

  async function getProductRatings(
    productIds: Array<string | number>,
  ): Promise<Record<string, ProductRatingSummary>> {
    const uniqueIds = [
      ...new Set(
        productIds
          .map(id => String(id))
          .filter(Boolean),
      ),
    ]

    if (!uniqueIds.length) {
      return {}
    }

    const variableDefinitions = uniqueIds
      .map((_, index) => `$productId${index}: ID!`)
      .join(', ')

    const ratingQueries = uniqueIds
      .map(
        (_, index) => `
          rating${index}: productRating(
            productId: $productId${index}
          ) {
            productId
            averageRating
            totalReviews
          }
        `,
      )
      .join('\n')

    const query = `
      query GetProductRatings(${variableDefinitions}) {
        ${ratingQueries}
      }
    `

    const variables = Object.fromEntries(
      uniqueIds.map((id, index) => [
        `productId${index}`,
        id,
      ]),
    )

    try {
      const data: any = await client.request(
        query,
        variables,
      )

      return uniqueIds.reduce<
        Record<string, ProductRatingSummary>
      >((result, productId, index) => {
        const summary = data?.[`rating${index}`]

        result[productId] = {
          productId,
          averageRating: Number(
            summary?.averageRating ?? 0,
          ),
          totalReviews: Number(
            summary?.totalReviews ?? 0,
          ),
        }

        return result
      }, {})
    } catch (error) {
      console.error(
        'Unable to load product ratings:',
        error,
      )

      return {}
    }
  }

  async function getProductBySlug(slug: string) {
    const data = await client.request(GET_PRODUCT, { slug })
    return data?.product ?? null
  }

  async function getProducts(options: {
    take?: number
    skip?: number
    term?: string
    collectionSlug?: string
    sort?: {
      name?: 'ASC' | 'DESC'
      price?: 'ASC' | 'DESC'
    }

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
      sort,
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

    if (sort) {
      input.sort = sort
    }

    if (facetValueFilters?.length) {
      input.facetValueFilters = facetValueFilters
    }

    const data = await client.request(
      SEARCH_PRODUCTS,
      { input }
    )

    const result = data?.search ?? {
      totalItems: 0,
      items: [],
      facetValues: [],
    }

    const ratings = await getProductRatings(
      (result.items ?? []).map(
        (item: any) => item.productId,
      ),
    )

    return {
      ...result,

      items: (result.items ?? []).map(
        (item: any) => {
          const rating =
            ratings[String(item.productId)]

          return {
            ...item,
            rating: rating?.averageRating ?? 0,
            totalReviews: rating?.totalReviews ?? 0,
          }
        },
      ),
    }
  }

  const GET_PRODUCTS = `
    query GetProducts($options: ProductListOptions) {
      products(options: $options) {
        totalItems
        items {
          id
          createdAt
          name
          slug
          description

          customFields {
            petType
            isFood
            ingredients
            usageAndFeeding
            specifications
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
    newestFirst?: boolean
  } = {}) {
    const {
      take = 100,
      skip = 0,
      newestFirst = false,
    } = options

    const productOptions: any = {
      take,
      skip,
    }

    if (newestFirst) {
      productOptions.sort = {
        createdAt: 'DESC',
      }

    }

    const data = await client.request(GET_PRODUCTS, {
      options: productOptions,
    })

    const result = data?.products ?? {
      totalItems: 0,
      items: [],
    }

    const ratings = await getProductRatings(
      (result.items ?? []).map(
        (item: any) => item.id,
      ),
    )

    return {
      ...result,

      items: (result.items ?? []).map(
        (item: any) => {
          const rating = ratings[String(item.id)]

          return {
            ...item,
            rating: rating?.averageRating ?? 0,
            totalReviews: rating?.totalReviews ?? 0,
          }
        },
      ),
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
    getProductRatings,
    getShopFacets,
    formatPrice,
  }
}