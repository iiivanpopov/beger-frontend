import type { SubmitHandler } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'
import { useLoginMutation } from '@/api'
import { LOCAL_STORAGE } from '@/config'
import { useToastsStore } from '@/store/toasts'

export const loginSchema = v.object({
  userName: v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(3, 'Too short (>2)')),
  password: v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(6, 'Too short (>5)')),
})

type LoginFormData = v.InferOutput<typeof loginSchema>

export function useLoginPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToastsStore(state => state.toast)

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      password: '',
      userName: '',
    },
    resolver: valibotResolver(loginSchema),
  })

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: (data) => {
        localStorage.setItem(LOCAL_STORAGE.accessToken, data.data.tokens.accessToken)
        localStorage.setItem(LOCAL_STORAGE.refreshToken, data.data.tokens.refreshToken)
        router.navigate({ to: data.data.user.role === 'admin' ? '/admin/users' : '/repairs', replace: true })
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

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
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
