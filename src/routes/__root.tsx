import type { QueryClient } from '@tanstack/react-query'
import type { User } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { getCurrentUser } from '@/api/requests/users'
import { Layout } from '@/components/Layout'
import { authStorage } from '@/shared/utils'
import { useAuthStore } from '@/store/auth'

interface RouterContext {
  user: User | null
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context
    const { setAuth } = useAuthStore.getState()
    const token = authStorage.getAccessToken()

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
      authStorage.clearTokens()
      return { user: null }
    }
  },
  component: RootLayout,
})

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
