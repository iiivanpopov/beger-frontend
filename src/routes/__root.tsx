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
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context
    const setAuth = useAuthStore.getState().setAuth
    const token = localStorage.getItem(LOCAL_STORAGE.accessToken)

    if (!token) {
      setAuth(null)
      return { user: null }
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

      setAuth(user.data)
      return { user: user.data }
    }
    catch {
      setAuth(null)
      return { user: null }
    }
  },
  component: RootLayout,
})
