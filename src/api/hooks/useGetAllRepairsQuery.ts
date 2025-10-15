import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getAllRepairs } from '@/api/requests/repairs'

export function useGetAllRepairsQuery(
  params?: Parameters<typeof getAllRepairs>[0]['params'],
  settings?: QuerySettings<typeof getAllRepairs>,
) {
  return useQuery({
    queryKey: ['repairs', 'all', params],
    queryFn: () => getAllRepairs({ params }),
    ...settings?.options,
  })
}
