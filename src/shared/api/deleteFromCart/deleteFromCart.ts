import { doc, deleteDoc } from 'firebase/firestore/lite'
import { useMutation, useQueryClient } from 'react-query'

import { db } from '../getApi.ts'

export async function deleteFromCart(cartItemId: string) {
  const itemDoc = doc(db, 'cartItems', cartItemId)
  await deleteDoc(itemDoc)
}

export function useDeleteFromCart(userId: string) {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(deleteFromCart, {
    onSuccess: () => queryClient.invalidateQueries(['app', 'cart', userId])
  })
  return {
    deleteFromCart: mutateAsync,
    isLoading
  }
}
