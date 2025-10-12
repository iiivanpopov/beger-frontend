import { useRouter } from '@tanstack/react-router'
import { useLogoutMutation } from '@/api'
import { LOCAL_STORAGE } from '@/config'
import { useAuthStore } from '@/store/auth'

export function useHeader() {
  const router = useRouter()
  const { setAuth, isAuth, user } = useAuthStore()

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_STORAGE.accessToken)
        localStorage.removeItem(LOCAL_STORAGE.refreshToken)

        setAuth(null, false)

        router.navigate({ to: '/login', replace: true })
      },
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return {
    handleLogout,
    isAuth,
    role: user?.role,
  }
}
