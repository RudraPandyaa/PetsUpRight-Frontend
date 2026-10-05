import { toValue, type MaybeRefOrGetter } from 'vue'

export function useYouMayAlsoLike(
  productId: MaybeRefOrGetter<string>,
  facetValueIds: MaybeRefOrGetter<string[]>,
) {
  const {
    getProducts,
    getProductRatings,
  } = useProducts()

  const currentId = computed(
    () => String(toValue(productId) ?? ''),
  )

  const currentFacetIds = computed(
    () => toValue(facetValueIds) ?? [],
  )

  const { data, pending, error } = useAsyncData(
    () =>
      `you-may-also-like:${currentId.value}:${[
        ...currentFacetIds.value,
      ].sort().join(',')}`,

    async () => {
      const ids = currentFacetIds.value.map(String)

      if (!currentId.value || !ids.length) {
        return []
      }

      // Fetch candidates without requesting ratings
      const result = await getProducts({
        take: 12,
        facetValueFilters: [{ or: ids }],
        includeRatings: false,
      })

      const currentFacets = new Set(ids)

      // Rank first, then keep only four
      const selectedItems = (result.items ?? [])
        .filter(
          (item: any) =>
            String(item.productId) !== currentId.value,
        )
        .map((item: any) => ({
          item,
          sharedFacetCount: (
            item.facetValueIds ?? []
          ).filter((id: string) =>
            currentFacets.has(String(id)),
          ).length,
        }))
        .sort(
          (a: any, b: any) =>
            b.sharedFacetCount - a.sharedFacetCount,
        )
        .slice(0, 4)
        .map(({ item }: any) => item)

      // Fetch ratings only for displayed products
      const ratings = await getProductRatings(
        selectedItems.map(
          (item: any) => item.productId,
        ),
      )

      return selectedItems.map((item: any) => {
        const priceWithTax = item.priceWithTax
        const rating =
          ratings[String(item.productId)]

        return {
          id: item.productId,
          variantId: String(
            item.productVariantId ?? '',
          ),
          name: item.productName,
          slug: item.slug,
          image: item.productAsset?.preview
            ? `${item.productAsset.preview}?preset=medium`
            : '/images/shop/Rectangle-5.png',
          price:
            Number(
              priceWithTax?.value ??
                priceWithTax?.min ??
                0,
            ) / 100,
          rating: Number(
            rating?.averageRating ?? 0,
          ),
          totalReviews: Number(
            rating?.totalReviews ?? 0,
          ),
        }
      })
    },

    {
      default: () => [],
      watch: [currentId, currentFacetIds],
    },
  )

  const products = computed(
    () => data.value ?? [],
  )

  return {
    products,
    pending,
    error,
  }
}