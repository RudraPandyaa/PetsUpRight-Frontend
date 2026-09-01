const STORAGE_KEY = 'pets_recently_viewed'
const MAX_ITEMS = 8

export function useRecentlyViewed() {
  function getAll(): any[] {
    if (!process.client) return []
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  function add(product: {
    id: string | number
    name: string
    slug: string
    image: string
    price: number
  }) {
    if (!process.client) return

    let list = getAll().filter((p) => p.id !== product.id)
    list.unshift(product)
    list = list.slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  return { getAll, add }
}