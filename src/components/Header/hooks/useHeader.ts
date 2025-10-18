import { useLocation, useNavigate, useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useLogoutMutation } from '@/api'
import { authStorage } from '@/shared/utils'
import { useUserStore } from '@/store/user'

export function useHeader() {
  const navigate = useNavigate()
  const user = useUserStore(state => state.user)
  const { queryClient } = useRouteContext({ from: '__root__' })
  const pathname = useLocation({ select: state => state.pathname })
  const [isOpen, setIsOpen] = useState(false)

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        setIsOpen(false)
        authStorage.clearTokens()
        queryClient.removeQueries({ queryKey: ['user', 'self'] })
        navigate({ to: '/login', replace: true })
      },
    },
  })

  const onLogout = () => logoutMutation.mutate()

  return {
    actions: {
      onLogout,
    },
    ui: {
      menu: {
        isOpen,
        setIsOpen,
      },
    },
    data: {
      user,
      pathname,
    },
  }
}
