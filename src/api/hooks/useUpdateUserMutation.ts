import type { UpdateUserParams } from '@/api/requests/users'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/api/requests/users'

export function useUpdateUserMutation(
  settings?: MutationSettings<UpdateUserParams, typeof updateUser>,
) {
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: params => updateUser({ params }),
    ...settings?.options,
  })
}
