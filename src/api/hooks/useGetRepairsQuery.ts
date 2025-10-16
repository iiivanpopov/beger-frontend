import type { GetAllRepairsParams } from '@/api/requests/repairs'
import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getAllRepairs } from '@/api/requests/repairs'

export function useGetRepairsQuery(
  params?: GetAllRepairsParams,
  settings?: QuerySettings<typeof getAllRepairs>,
) {
  return useQuery({
    queryKey: ['repairs', 'all', params],
    queryFn: () => getAllRepairs({ params }),
    ...settings?.options,
  })
}
