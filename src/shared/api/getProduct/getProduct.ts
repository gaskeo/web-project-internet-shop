import { doc, getDoc } from 'firebase/firestore/lite'
import { useQuery } from 'react-query'

import { db } from '../getApi.ts'
import { Product, ProductData } from '../getProducts'

export async function getProduct(productId: string): Promise<Product | null> {
  const productDoc = doc(db, 'products', productId)
  const productSnapshot = await getDoc(productDoc)
  return productSnapshot.id
    ? { ...(productSnapshot.data() as ProductData), id: productSnapshot.id }
    : null
}

export function useProduct(productId: string) {
  const { data: product = null, isLoading } = useQuery({
    queryKey: ['app', 'product', productId],
    queryFn: () => getProduct(productId)
  })

  return { product, isLoading }
}
