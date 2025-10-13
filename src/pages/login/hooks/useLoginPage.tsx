import type { SubmitHandler } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/api/hooks/useLoginMutation'
import { LOCAL_STORAGE } from '@/config'
import { useAuthStore } from '@/store/auth'
import { useToastsStore } from '@/store/toasts'

export interface LoginInputs {
  userName: string
  password: string
}

export function useLoginPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToastsStore(state => state.toast)
  const setAuth = useAuthStore(state => state.setAuth)

  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues: {
      password: '',
      userName: '',
    },
  })

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: (data) => {
        localStorage.setItem(LOCAL_STORAGE.accessToken, data.data.tokens.accessToken)
        localStorage.setItem(LOCAL_STORAGE.refreshToken, data.data.tokens.refreshToken)

        setAuth(data.data.user)

        router.navigate({ to: data.data.user.role === 'admin' ? '/dashboard' : '/repairs' })

        setIsOpen(false)
      },
      onError: async (error) => {
        const response = await error.response.json()
        toast({
          level: 'error',
          title: 'Error',
          description: response.message,
        })
      },
    },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginMutation.mutate({
      userName: data.userName,
      password: data.password,
    })
  }

  return {
    isOpen,
    setIsOpen,
    control,
    handleSubmit,
    onSubmit,
  }
}
