import type { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/api/hooks/useLoginMutation'
import { useToastsStore } from '@/shared/store/toasts'

export interface LoginInputs {
  userName: string
  password: string
}

export function useLoginPage() {
  const toast = useToastsStore(state => state.toast)
  const [isOpen, setIsOpen] = useState(false)

  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues: {
      password: '',
      userName: '',
    },
  })

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: () => {
        toast({
          level: 'success',
          title: 'Success',
          description: 'Logged in successfully',
        })
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
