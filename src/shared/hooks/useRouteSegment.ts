import { useLocation } from '@tanstack/react-router'
import { getRouteSegment } from '@/shared/utils/routing'

export function useRouteSegment(nth: number = 0) {
  const pathname = useLocation({ select: state => state.pathname })

  return getRouteSegment(pathname, nth)
}
