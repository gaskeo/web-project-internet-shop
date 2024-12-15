import { getAuth, createUserWithEmailAndPassword, User } from 'firebase/auth'
import { useMutation, useQueryClient } from 'react-query'

const auth = getAuth()

export type RegisterDto = {
  email: string
  password: string
}

export async function register(props: RegisterDto) {
  const user = await createUserWithEmailAndPassword(auth, props.email, props.password).then(
    (userCredential) => {
      return userCredential.user
    }
  )

  return user
}

export function useRegister() {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading, error } = useMutation<User, Error, RegisterDto>(register, {
    onSuccess: () => queryClient.invalidateQueries(['app', 'currentUser'])
  })

  return {
    register: mutateAsync,
    isLoading,
    error
  }
}
