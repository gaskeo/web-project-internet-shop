import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite'
import { useQuery } from 'react-query'

import { db } from '../getApi.ts'
import { Product, productConverter } from '../getProducts'

export async function getSales(): Promise<Product[]> {
  const productsCol = query(collection(db, 'products'), orderBy('sale')).withConverter(
    productConverter
  )
  const productsSnapshot = await getDocs(productsCol)
  return productsSnapshot.docs.map((d) => d.data())
}

export function useSales() {
  const { data: sales = [], isLoading } = useQuery({
    queryKey: ['app', 'sales'],
    queryFn: getSales
  })

  return { sales, isLoading }
}
