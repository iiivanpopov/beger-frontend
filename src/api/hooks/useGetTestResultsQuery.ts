import type { GetAllTestResultsParams } from '@/api/requests/test-results'
import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getAllTestResults } from '@/api/requests/test-results'

export function useGetTestResultsQuery(
  params?: GetAllTestResultsParams,
  settings?: QuerySettings<typeof getAllTestResults>,
) {
  return useQuery({
    queryKey: ['test-results', 'all', params],
    queryFn: () => getAllTestResults({ params }),
    ...settings?.options,
  })
}
