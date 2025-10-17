import type { QueryClient } from '@tanstack/react-query'
import type { UserRole } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { getCurrentUser } from '@/api/requests/users'
import { Layout } from '@/components/Layout'
import { NotFoundPage } from '@/pages/NotFound/NotFound'
import { authStorage } from '@/shared/utils'
import { useUserStore } from '@/store/user'

interface RouterContext {
  role: UserRole
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }): Promise<{ role: UserRole }> => {
    const { queryClient } = context
    const setUser = useUserStore.getState().setUser
    const token = authStorage.getAccessToken()

    if (!token) {
      setUser(null)
      return { role: 'guest' }
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

      setUser(user.data)
      return { role: user.data.role }
    }
    catch {
      setUser(null)
      authStorage.clearTokens()
      return { role: 'guest' }
    }
  },
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
