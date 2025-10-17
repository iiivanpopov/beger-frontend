import type { SubmitHandler } from 'react-hook-form'
import type { CreateUserData } from '@/pages/Users/schemas/createUser.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useDeleteUserMutation, useGetUsersQuery, useRegisterMutation } from '@/api'
import { CreateUserSchema } from '@/pages/Users/schemas/createUser.schema'
import { useToast } from '@/shared/hooks'
import { createErrorHandler } from '@/shared/utils'

export function useUsersPage() {
  const getUsersQuery = useGetUsersQuery({
    limit: 5,
  })
  const { queryClient } = useRouteContext({ from: '__root__' })
  const { showError, showSuccess } = useToast()

  const form = useForm<CreateUserData>({
    defaultValues: {
      fullName: '',
      userName: '',
      password: '',
    },
    resolver: valibotResolver(CreateUserSchema),
  })

  const registerMutation = useRegisterMutation({
    options: {
      onSuccess: () => {
        showSuccess('Created user')
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        form.reset()
      },
      onError: createErrorHandler(showError),
    },
  })

  const deleteUserMutation = useDeleteUserMutation({
    options: {
      onSuccess: () => {
        showSuccess('Deleted user')
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
      },
      onError: createErrorHandler(showError),
    },
  })

  const onSubmit: SubmitHandler<CreateUserData> = (data) => {
    registerMutation.mutate({
      userName: data.userName,
      password: data.password,
      fullName: data.fullName,
    })
  }

  const onDelete = (id: number) => deleteUserMutation.mutate({ id })

  return {
    queries: {
      users: getUsersQuery,
    },
    form,
    handlers: {
      onSubmit,
      onDelete,
    },
  }
}
