import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/api/requests/auth'

export function useLogoutMutation(
  settings?: MutationSettings<void, typeof logout>,
) {
  return useMutation({
    mutationKey: ['user', 'self'],
    mutationFn: () => logout(),
    ...settings?.options,
  })
}
