import { useRouter } from '@tanstack/react-router'
import { useLogoutMutation } from '@/api'
import { LOCAL_STORAGE } from '@/config'

export function useHeader() {
  const router = useRouter()
  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_STORAGE.accessToken)
        localStorage.removeItem(LOCAL_STORAGE.refreshToken)
        router.invalidate()
      },
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return {
    handleLogout,
  }
}
