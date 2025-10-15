import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getUserTestResults } from '@/api/requests/test-results'

export function useGetUserTestResultsQuery(
  params: Parameters<typeof getUserTestResults>[0]['params'],
  settings?: QuerySettings<typeof getUserTestResults>,
) {
  return useQuery({
    queryKey: ['test-results', 'user', params.id, params.offset, params.limit],
    queryFn: () => getUserTestResults({ params }),
    ...settings?.options,
  })
}
