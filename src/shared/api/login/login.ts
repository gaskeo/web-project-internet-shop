import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { useMutation, useQueryClient } from 'react-query'

const auth = getAuth()

export type LoginDto = {
  email: string
  password: string
}

export async function login(props: LoginDto) {
  const user = await setPersistence(auth, browserLocalPersistence)
    .then(() => signInWithEmailAndPassword(auth, props.email, props.password))
    .then((userCredential) => {
      return userCredential.user
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Неправильные логин или пароль')
      }
      throw new Error(error.code)
    })

  return user
}

export function useLogin() {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading, error } = useMutation<User, Error, LoginDto>(login, {
    onSuccess: () => queryClient.invalidateQueries(['app', 'currentUser'])
  })

  return {
    login: mutateAsync,
    isLoading,
    error
  }
}
