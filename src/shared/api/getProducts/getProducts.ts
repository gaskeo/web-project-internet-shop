import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore/lite'
import { useQuery } from 'react-query'

import { db } from '../getApi.ts'

export type Product = ProductData & {
  id: string
}

export type ProductData = {
  title: string
  image: string
  description: string
  price: number
  sale?: number
}

export const productConverter = {
  toFirestore(product: Product): DocumentData {
    return { name: product.title }
  },

  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>): Product {
    const data = snapshot.data()! as ProductData
    return { id: snapshot.id, ...data }
  }
}

export async function getProducts(): Promise<Product[]> {
  const productsCol = collection(db, 'products').withConverter(productConverter)
  const productsSnapshot = await getDocs(productsCol)
  return productsSnapshot.docs.map((d) => d.data())
}

export function useProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['app', 'products'],
    queryFn: getProducts
  })

  return { products, isLoading }
}
