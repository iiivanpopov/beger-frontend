import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useLogoutMutation } from '@/api'
import { LOCAL_STORAGE } from '@/config'
import { useRouteSegment } from '@/shared/hooks'
import { useAuthStore } from '@/store/auth'

export function useHeader() {
  const router = useRouter()
  const user = useAuthStore(state => state.user)
  const { queryClient } = useRouteContext({ from: '__root__' })
  const routeSegment = useRouteSegment()

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_STORAGE.accessToken)
        localStorage.removeItem(LOCAL_STORAGE.refreshToken)
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
