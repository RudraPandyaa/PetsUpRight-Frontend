import { toValue, type MaybeRefOrGetter } from 'vue'

export function useYouMayAlsoLike(
  productId: MaybeRefOrGetter<string>,
  facetValueIds: MaybeRefOrGetter<string[]>,
) {
  const { getProducts } = useProducts()

  const currentId = computed(() => toValue(productId))
  const currentFacetIds = computed(() => toValue(facetValueIds) ?? [])

  const { data, pending, error } = useAsyncData(
    () => `you-may-also-like:${currentId.value}:${[...currentFacetIds.value].sort().join(',')}`,
    async () => {
      const ids = currentFacetIds.value
      if (!currentId.value || !ids.length) return []

      const result = await getProducts({
        take: 24,
        facetValueFilters: [{ or: ids }],
      })

      const currentFacets = new Set(ids)

      return (result.items ?? [])
        .filter((item: any) =>
          String(item.productId) !== currentId.value
        )
        .map((item: any) => ({
          item,
          sharedFacetCount: (item.facetValueIds ?? []).filter(
            (id: string) => currentFacets.has(String(id))
          ).length,
        }))
        .sort((a: any, b: any) =>
          b.sharedFacetCount - a.sharedFacetCount
        )
        .slice(0, 4)
        .map(({ item }: any) => {
          const priceWithTax = item.priceWithTax

          return {
            id: item.productId,
            variantId: String(item.productVariantId ?? ''),
            name: item.productName,
            slug: item.slug,
            image:
              item.productAsset?.preview
                ? `${item.productAsset.preview}?preset=medium`
                : '/images/shop/Rectangle-5.png',
            price: Number(
              priceWithTax?.value ?? priceWithTax?.min ?? 0
            ) / 100,
            rating: 4.9,
          }
        })
    },
    { default: () => [] },
  )

  const products = computed(() => data.value ?? [])

  return { products, pending, error }
}