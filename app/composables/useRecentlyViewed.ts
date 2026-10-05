const STORAGE_KEY = 'pets_recently_viewed'
const MAX_ITEMS = 8

export function useRecentlyViewed() {
  function getAll(): any[] {
    if (!process.client) return []

    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      )
    } catch {
      return []
    }
  }

  function add(product: {
    id: string | number
    variantId: string
    name: string
    slug: string
    image: string
    price: number
    rating?: number
    totalReviews?: number
  }) {
    if (!process.client) return

    let list = getAll().filter(
      p => String(p.id) !== String(product.id),
    )

    list.unshift({
      ...product,
      id: String(product.id),
      variantId: String(product.variantId),
      rating: Number(product.rating ?? 0),
      totalReviews: Number(product.totalReviews ?? 0),
    })

    list = list.slice(0, MAX_ITEMS)

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list),
    )
  }

  return {
    getAll,
    add,
  }
}