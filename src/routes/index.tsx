import { createFileRoute } from '@tanstack/react-router'
import { resolveDefaultRoute } from '@/shared/utils/routing'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => resolveDefaultRoute(context.user?.role),
})
