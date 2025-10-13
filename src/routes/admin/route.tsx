import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout } from '@/shared/components'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }) => requireRole(context.user?.role, ['admin'], '/login'),
  component: Layout,
})

function Layout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
