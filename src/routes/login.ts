import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '@/pages/Login/LoginPage'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.user?.role === 'user')
      throw redirect({ to: '/repairs' })
    if (context.user?.role === 'admin')
      throw redirect({ to: '/dashboard' })
  },
  component: LoginPage,
})
