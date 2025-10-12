import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@/pages/Dashboard/DashboardPage'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => requireRole(context.user?.role, ['admin'], '/login'),
  component: DashboardPage,
})
