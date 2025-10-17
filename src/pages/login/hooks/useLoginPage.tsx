import type { LoginData } from '@/pages/Login/schemas/login.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/api'
import { LoginSchema } from '@/pages/Login/schemas/login.schema'
import { useToast } from '@/shared/hooks'
import { authStorage, createErrorHandler } from '@/shared/utils'

export function useLoginPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { showError } = useToast()

  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      password: '',
      userName: '',
    },
    resolver: valibotResolver(LoginSchema),
  })

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: (data) => {
        setIsOpen(false)
        authStorage.setTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken)
        router.navigate({ to: data.data.user.role === 'admin' ? '/admin/users' : '/repairs', replace: true })
      },
      onError: createErrorHandler(showError),
    },
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate({
      userName: data.userName,
      password: data.password,
    })
  })

  return {
    isOpen,
    setIsOpen,
    control,
    onSubmit,
  }
}
