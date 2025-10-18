import type { CreateUserData } from '@/pages/Users/schemas/createUser.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDeleteUserMutation, useGetUsersQuery, useRegisterMutation } from '@/api'
import { CreateUserSchema } from '@/pages/Users/schemas/createUser.schema'
import { useMutationErrorHandler, usePagination } from '@/shared/hooks'

export function useUsersPage() {
  const [isOpen, setIsOpen] = useState(false)
  const search = useSearch({ strict: false })

  const form = useForm<CreateUserData>({
    defaultValues: { fullName: '', userName: '', password: '' },
    resolver: valibotResolver(CreateUserSchema),
  })

  const { queryClient } = useRouteContext({ from: '__root__' })
  const mutationHandler = useMutationErrorHandler()

  const usersPreviewQuery = useGetUsersQuery({ page: 1, limit: 5 })
  const usersQuery = useGetUsersQuery({ page: search.page, limit: 10 })
  const pagination = usePagination({ pages: usersQuery.data?.data.meta.pages })

  const registerMutation = useRegisterMutation({
    options: {
      onSuccess: () =>
        mutationHandler.onSuccess('Created user', () => {
          queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
          form.reset()
        }),
      onError: mutationHandler.onError,
    },
  })

  const deleteUserMutation = useDeleteUserMutation({
    options: {
      onSuccess: () =>
        mutationHandler.onSuccess('Deleted user', () => {
          queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        }),
      onError: mutationHandler.onError,
    },
  })

  const onSubmit = form.handleSubmit(data => registerMutation.mutate(data))
  const onDelete = (id: number) => deleteUserMutation.mutate({ id })

  return {
    data: {
      users: usersQuery,
      usersPreview: usersPreviewQuery,
    },
    form,
    actions: {
      submit: onSubmit,
      delete: onDelete,
      pagination,
    },
    ui: {
      modal: {
        isOpen,
        setIsOpen,
      },
    },
  }
}
