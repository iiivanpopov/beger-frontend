import type { QueryClient } from '@tanstack/react-query'
import type { User } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { getCurrentUser } from '@/api/requests/users'
import { LOCAL_STORAGE } from '@/config'
import { Layout } from '@/layout/Layout'
import { ToastContainer } from '@/shared/ui'
import { useAuthStore } from '@/store/auth'

function RootLayout() {
  return (
    <Layout>
      <Outlet />
      <ToastContainer />
      <TanStackRouterDevtools />
    </Layout>
  )
}

interface RouterContext {
  user: User | null
  isAuth: boolean
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context
    const { setAuth } = useAuthStore.getState()
    const token = localStorage.getItem(LOCAL_STORAGE.accessToken)

    if (!token) {
      setAuth(null, false)
      return { user: null, isAuth: false }
    }

    try {
      const user = await queryClient.fetchQuery({
        queryKey: ['user', 'self'],
        queryFn: async () => {
          const res = await getCurrentUser()
          return res
        },
        staleTime: 5 * 60 * 1000,
      })

      setAuth(user.data, true)
      return { user: user.data, isAuth: true }
    }
    catch {
      setAuth(null, false)
      return { user: null, isAuth: false }
    }
  },
  component: RootLayout,
})
