import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useLogoutMutation } from '@/api'
import { LOCAL_STORAGE } from '@/config'
import { useAuthStore } from '@/store/auth'

export function useHeader() {
  const router = useRouter()
  const { user, setAuth } = useAuthStore()
  const { queryClient } = useRouteContext({ from: '__root__' })

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        setAuth(null, false)
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

  return { handleLogout, user }
}
