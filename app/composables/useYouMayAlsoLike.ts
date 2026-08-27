export function useYouMayAlsoLike(slug = 'you-may-also-like') {
  const config = useRuntimeConfig()
  const apiUrl =
    config.public.vendureShopApiUrl || 'http://localhost:3000/shop-api'

  function normalizeAssetUrl(preview?: string | null) {
    if (!preview) return '/images/shop/Rectangle-5.png'

    // Windows backslash fix
    let url = preview.replace(/\\/g, '/')

    if (url.startsWith('http')) return url
    if (url.startsWith('/')) return `http://localhost:3000${url}`
    return `http://localhost:3000/assets/${url}`
  }

  const { data, pending, error } = useAsyncData(
    `ymal-${slug}`,
    async () => {
      const res: any = await $fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          query: `
            query ($slug: String!) {
              collection(slug: $slug) {
                name
                productVariants(options: { take: 4 }) {
                  items {
                    id
                    name
                    priceWithTax
                    product {
                      id
                      name
                      slug
                      featuredAsset { preview }
                    }
                  }
                }
              }
            }
          `,
          variables: { slug },
        },
      })

      return res?.data?.collection ?? null
    }
  )

  const products = computed(() => {
    const items = data.value?.productVariants?.items || []

    return items.map((v: any) => ({
      id: v.product?.id || v.id,
      name: v.product?.name || v.name,
      image: normalizeAssetUrl(v.product?.featuredAsset?.preview),
      price: (v.priceWithTax || 0) / 100,
      rating: 4.9,
      slug: v.product?.slug || '',
      wishlisted: false,
    }))
  })

  return { products, pending, error }
}