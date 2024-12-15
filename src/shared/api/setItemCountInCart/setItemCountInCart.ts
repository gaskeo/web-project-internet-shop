import { doc, setDoc } from 'firebase/firestore/lite'
import { useMutation, useQueryClient } from 'react-query'

import { db } from '@shared/api/getApi.ts'

export async function setItemCountInCart(props: { itemId: string; count: number }) {
  const itemDoc = doc(db, 'cartItems', props.itemId)
  await setDoc(
    itemDoc,
    {
      count: props.count
    },
    { merge: true, mergeFields: ['count'] }
  )
}

export function useSetItemCountInCart(userId: string) {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(setItemCountInCart, {
    onSuccess: () => queryClient.invalidateQueries(['app', 'cart', userId])
  })

  return {
    setItemCountInCart: mutateAsync,
    isLoading
  }
}
