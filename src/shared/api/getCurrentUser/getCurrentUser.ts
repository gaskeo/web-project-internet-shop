import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

const auth = getAuth()

export function getCurrentUser() {
  return auth.currentUser
}

let fetched = false

export function useCurrentUser() {
  const queryClient = useQueryClient()
  const { data = null, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['app', 'currentUser']
  })

  useEffect(() => {
    if (!fetched) {
      auth.authStateReady().then(() => queryClient.invalidateQueries(['app', 'currentUser']))
      fetched = true
    }
  }, [])

  return {
    user: data,
    isLoading
  }
}
