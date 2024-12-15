import { doc, setDoc } from 'firebase/firestore/lite'
import { useMutation, useQueryClient } from 'react-query'

import { db } from '../getApi.ts'

export async function addToCart(props: { userId: string; productId: string; count: number }) {
  const itemDoc = doc(db, 'cartItems', `${props.userId}_${props.productId}`)
  await setDoc(itemDoc, {
    userId: props.userId,
    count: props.count ?? 1,
    product: doc(db, 'products', props.productId)
  })
}

export function useAddToCart(userId: string) {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(addToCart, {
    onSuccess: () => queryClient.invalidateQueries(['app', 'cart', userId])
  })
  return {
    addToCart: mutateAsync,
    isLoading
  }
}
