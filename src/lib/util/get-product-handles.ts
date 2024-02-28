import { medusaClient } from "../config"

export const getProductHandles = async (limit: number = 25): Promise<string[]> => {
  const products = await medusaClient.products
    .list({ limit })
    .then(({ products }) => products)

  const handles: string[] = []

  for (const product of products) {
    if (product.handle) {
      handles.push(product.handle)
    }
  }

  return handles
}
