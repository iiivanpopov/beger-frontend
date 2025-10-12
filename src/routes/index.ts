import { createFileRoute, redirect } from '@tanstack/react-router'
import { IndexPage } from '@/pages/Index/IndexPage'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    const role = context.user?.role
    if (role === 'user')
      throw redirect({ to: '/repairs' })
    if (role === 'admin')
      throw redirect({ to: '/dashboard' })
  },
  component: IndexPage,
})
