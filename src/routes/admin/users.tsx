import { createFileRoute } from '@tanstack/react-router'
import { UsersPage } from '@/pages/Users/UsersPage'

export const Route = createFileRoute('/admin/users')({
  component: UsersPage,
})
