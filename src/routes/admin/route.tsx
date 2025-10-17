import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout } from '@/components/AdminLayout'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }) => requireRole(context.role, ['admin'], '/login'),
  component: Layout,
})

function Layout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
