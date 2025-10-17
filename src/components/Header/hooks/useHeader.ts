import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useLogoutMutation } from '@/api'
import { useRouteSegment } from '@/shared/hooks'
import { authStorage } from '@/shared/utils'
import { useUserStore } from '@/store/user'

export function useHeader() {
  const router = useRouter()
  const user = useUserStore(state => state.user)
  const { queryClient } = useRouteContext({ from: '__root__' })
  const routeSegment = useRouteSegment()

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        authStorage.clearTokens()
        queryClient.removeQueries({ queryKey: ['user', 'self'] })
        router.navigate({ to: '/login', replace: true })
      },
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return { handleLogout, user, routeSegment }
}
