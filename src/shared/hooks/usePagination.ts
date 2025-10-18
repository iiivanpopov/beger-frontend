import { useNavigate, useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

export function usePagination({ pages }: {
  pages?: number
}) {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })

  const nextDisabled = useMemo(() => search.page >= (pages ?? 1), [search.page, pages])
  const prevDisabled = useMemo(() => search.page <= 1, [search.page])

  const onNextPage = () => {
    if (nextDisabled)
      return
    navigate({ search: (prev: any) => ({ page: prev.page + 1 }) } as any)
  }
  const onPrevPage = () => {
    if (prevDisabled)
      return
    navigate({ search: (prev: any) => ({ page: prev.page - 1 }) } as any)
  }
  const onGotoPage = (page: number) => navigate({ search: () => ({ page }) } as any)

  return {
    page: search.page,
    pages,
    nextDisabled,
    prevDisabled,
    onNextPage,
    onPrevPage,
    onGotoPage,
  }
}
