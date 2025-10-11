import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '@/layout'

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export const Route = createRootRoute({ component: RootLayout })
