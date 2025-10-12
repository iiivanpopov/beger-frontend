import { createFileRoute, redirect } from '@tanstack/react-router'
import { IndexPage } from '@/pages/Index/IndexPage'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.user?.role === 'user')
      throw redirect({ to: '/repairs' })
    if (context.user?.role === 'admin')
      throw redirect({ to: '/dashboard' })
  },
  component: IndexPage,
})
