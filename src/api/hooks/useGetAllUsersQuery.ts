import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/api/requests/users'

export function useGetAllUsersQuery(
  params?: Parameters<typeof getAllUsers>[0]['params'],
  settings?: QuerySettings<typeof getAllUsers>,
) {
  return useQuery({
    queryKey: ['users', 'all', params],
    queryFn: () => getAllUsers({ params }),
    ...settings?.options,
  })
}
