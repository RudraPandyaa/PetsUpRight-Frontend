import { useVendure } from './useVendure'

export function useCollections() {
  const { client } = useVendure()

  const GET_COLLECTIONS = `
    query {
      collections {
        items {
          id
          name
          slug
          parent {
            id
          }
          featuredAsset {
            preview
          }
        }
      }
    }
  `

  async function getCollections() {
    const data = await client.request(GET_COLLECTIONS)
    return data.collections.items
  }

  return {
    getCollections,
  }
}