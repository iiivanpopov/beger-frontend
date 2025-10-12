import type { SubmitHandler } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/api/hooks/useLoginMutation'
import { LOCAL_STORAGE } from '@/config'
import { useToastsStore } from '@/shared/store/toasts'

export interface LoginInputs {
  userName: string
  password: string
}

export function useLoginPage() {
  const toast = useToastsStore(state => state.toast)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues: {
      password: '',
      userName: '',
    },
  })

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: (data) => {
        toast({
          level: 'success',
          title: 'Success',
          description: 'Logged in successfully',
        })

        localStorage.setItem(LOCAL_STORAGE.accessToken, data.data.tokens.accessToken)
        localStorage.setItem(LOCAL_STORAGE.refreshToken, data.data.tokens.refreshToken)

        router.invalidate()

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
