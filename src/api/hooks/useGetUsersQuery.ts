import type { GetAllUsersParams } from '@/api/requests/users'
import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/api/requests/users'

export function useGetUsersQuery(
  params?: GetAllUsersParams,
  settings?: QuerySettings<typeof getAllUsers>,
) {
  return useQuery({
    queryKey: ['users', 'all', params],
    queryFn: () => getAllUsers({ params }),
    ...settings?.options,
  })
}
