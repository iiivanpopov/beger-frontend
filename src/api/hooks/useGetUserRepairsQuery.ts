import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getUserRepairs } from '@/api/requests/repairs'

export function useGetUserRepairsQuery(
  params: Parameters<typeof getUserRepairs>[0]['params'],
  settings?: QuerySettings<typeof getUserRepairs>,
) {
  return useQuery({
    queryKey: ['repairs', 'user', params.id, params.offset, params.limit],
    queryFn: () => getUserRepairs({ params }),
    ...settings?.options,
  })
}
