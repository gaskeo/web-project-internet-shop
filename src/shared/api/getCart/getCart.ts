import { DocumentData, QueryDocumentSnapshot, DocumentReference } from 'firebase/firestore'
import { collection, getDocs, getDoc, query, where } from 'firebase/firestore/lite'
import { useQuery } from 'react-query'

import { Product } from '@shared/api'
import { db } from '@shared/api/getApi.ts'

export type CartItem = {
  id: string
  product: Product
  count: number
}

export type CartItemData = {
  product: DocumentReference<Product>
  count: number
}

export const cartItemConverter = {
  toFirestore(product: CartItemData & { id: string }): DocumentData {
    return { ...product }
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>
  ): CartItemData & { id: string } {
    const data = snapshot.data()! as CartItemData
    return { id: snapshot.id, ...data }
  }
}

export async function getCart(userId: string): Promise<CartItem[]> {
  const cartItemsCol = query(
    collection(db, 'cartItems'),
    where('userId', '==', userId)
  ).withConverter(cartItemConverter)
  const cartItemsSnapshot = await getDocs(cartItemsCol)
  const items = cartItemsSnapshot.docs.map((d) => d.data())
  const finalItems: CartItem[] = []
  for (const item of items) {
    const product = await getDoc(item.product)
    const productData = product.data() as Product
    if (!productData) continue
    finalItems.push({ ...item, product: { ...productData, id: product.id } })
  }
  return finalItems
}

export function useCart(userId: string | null) {
  const { data: cart = [], isLoading } = useQuery({
    queryKey: ['app', 'cart', userId],
    queryFn: () => getCart(userId ?? ''),
    enabled: Boolean(userId)
  })

  return { cart, isLoading }
}
