export const GET_CMS_PAGE_BY_SLUG = `
    query GetCmsPageBySlug($slug: String!) {
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
`;