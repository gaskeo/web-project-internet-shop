import { getAuth } from 'firebase/auth'
import { useMutation, useQueryClient } from 'react-query'

const auth = getAuth()
export async function logout() {
  await auth.signOut()
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(logout, {
    onSuccess: () => queryClient.invalidateQueries(['app', 'currentUser'])
  })

  return { logout: mutateAsync, isLoading }
}
