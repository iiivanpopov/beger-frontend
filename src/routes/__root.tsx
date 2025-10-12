import type { User } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { getCurrentUser } from '@/api/requests/users'
import { LOCAL_STORAGE } from '@/config'
import { Layout } from '@/layout'

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

interface RouterContext {
  user: User | null
  isAuth: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const token = localStorage.getItem(LOCAL_STORAGE.accessToken)
    if (!token)
      return { user: null, isAuth: false }

    try {
      const userResponse = await getCurrentUser()

      return { user: userResponse.data, isAuth: true }
    }
    catch {
      return { user: null, isAuth: false }
    }
  },
  component: RootLayout,
})
