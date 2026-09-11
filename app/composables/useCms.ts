import { useVendure } from './useVendure'

export function useCms() {
  const { client } = useVendure()

  const GET_CMS_PAGE = `
    query CmsPageBySlug($slug: String!) {
      cmsPageBySlug(slug: $slug) {
        id
        title
        slug
        isPublished

        sections {
          id
          type
          position
          data
        }
      }
    }
  `

  async function getCmsPageBySlug(slug: string) {
    const data = await client.request(
      GET_CMS_PAGE,
      { slug }
    )

    return data?.cmsPageBySlug ?? null
  }

  return {
    getCmsPageBySlug,
  }
}