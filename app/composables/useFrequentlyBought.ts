export function useFrequentlyBought(slug = 'frequently-bought-together') {
  const config = useRuntimeConfig()

  const { data, pending, error } = useAsyncData(`fbt-${slug}`, async () => {
    const query = `
      query ($slug: String!) {
        collection(slug: $slug) {
          name
          description
          productVariants(options: { take: 3 }) {
            items {
              id
              name
              priceWithTax
              product {
                id
                name
                featuredAsset { preview }
              }
            }
          }
        }
      }
    `

    const res = await $fetch(config.public.vendureShopApiUrl, {
      method: 'POST',
      body: {
        query,
        variables: { slug },
      },
    })

    return res.data?.collection
  })

  const items = computed(() => {
    const variants = data.value?.productVariants?.items || []
    return variants.map((v: any) => ({
      id: v.product?.id || v.id,
      name: v.product?.name || v.name,
      image: v.product?.featuredAsset?.preview || '/images/shop/Rectangle-5.png',
      price: (v.priceWithTax || 0) / 100, // paise → rupees
    }))
  })

  const currentPrice = computed(() =>
    items.value.reduce((sum: number, i: any) => sum + (i.price || 0), 0)
  )

  const bundleName = computed(() => data.value?.name || 'Essential Care Bundle')
  const bundleDesc = computed(
    () => items.value.map((i: any) => i.name).join(' + ') || ''
  )

  return { items, bundleName, bundleDesc, currentPrice, pending, error }
}