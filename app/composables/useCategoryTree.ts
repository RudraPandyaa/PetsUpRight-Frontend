import { useVendure } from './useVendure'

/**
 * The client's category structure (pet → category → subcategory), read from
 * the Vendure collections that the product import creates. Used by the
 * header menus and the shop's Category filter.
 */
export interface CategoryNode {
  id: string
  name: string
  // Collection slug, e.g. "dog-food-dry-food"; used as /shop?collection=...
  slug: string
  children: CategoryNode[]
}

// Pet sections in the order of the client's sitemap, with the label shown
// in the header. Other top-level collections are not shown in the menu.
const PET_SECTIONS: Array<{ slug: string, label: string }> = [
  { slug: 'dog', label: 'Dogs' },
  { slug: 'cat', label: 'Cats' },
  { slug: 'bird', label: 'Birds' },
  { slug: 'hamster-guinea-pig-turtle-rabbit', label: 'Small Animals' },
  { slug: 'fish', label: 'Fish' },
  { slug: 'horse', label: 'Horses' },
]

// The Shop API returns at most 100 items per list query; the client's
// structure has 93 collections
const GET_CATEGORY_TREE = `
  query GetCategoryTree {
    collections(options: { take: 100, sort: { position: ASC } }) {
      items {
        id
        name
        slug
        parent {
          id
        }
      }
    }
  }
`

// Turns a category name into the part used in collection slugs, the same
// way the backend does ("Clean & Hygiene" -> "clean-and-hygiene").
export function categoryCode(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

let treeRequest: Promise<CategoryNode[]> | null = null

export function useCategoryTree() {
  const { client } = useVendure()
  const tree = useState<CategoryNode[] | null>('category-tree', () => null)

  async function loadCategoryTree(): Promise<CategoryNode[]> {
    if (tree.value) {
      return tree.value
    }

    if (!treeRequest) {
      treeRequest = client
        .request(GET_CATEGORY_TREE)
        .then((data: any) => {
          const items: any[] = data?.collections?.items ?? []
          const nodes = new Map<string, CategoryNode & { parentId?: string }>()

          for (const item of items) {
            nodes.set(String(item.id), {
              id: String(item.id),
              name: item.name,
              slug: item.slug,
              parentId: item.parent?.id ? String(item.parent.id) : undefined,
              children: [],
            })
          }

          // Items arrive sorted by position, so children keep that order
          for (const node of nodes.values()) {
            const parent = node.parentId ? nodes.get(node.parentId) : undefined
            parent?.children.push(node)
          }

          const pets = PET_SECTIONS
            .map(section => [...nodes.values()].find(node => node.slug === section.slug))
            .filter((node): node is CategoryNode & { parentId?: string } => Boolean(node))

          tree.value = pets
          return pets
        })
        .finally(() => {
          treeRequest = null
        })
    }

    return treeRequest
  }

  function petLabel(pet: CategoryNode): string {
    return PET_SECTIONS.find(section => section.slug === pet.slug)?.label ?? pet.name
  }

  /** Every category name used under any pet, in sitemap order. */
  function categoryOptions(pets: CategoryNode[]): Array<{ label: string, code: string }> {
    const options: Array<{ label: string, code: string }> = []

    for (const pet of pets) {
      for (const category of pet.children) {
        const code = categoryCode(category.name)

        if (!options.some(option => option.code === code)) {
          options.push({ label: category.name, code })
        }
      }
    }

    return options
  }

  return {
    categoryTree: tree,
    loadCategoryTree,
    petLabel,
    categoryOptions,
  }
}
