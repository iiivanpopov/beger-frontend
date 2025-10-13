import type { LucideIcon } from 'lucide-react'
import type { UserRole } from '@/api'
import type { PathRoute } from '@/shared/types'
import { FileIcon, UsersIcon } from 'lucide-react'

export const routes: {
  to: PathRoute
  role?: UserRole
  label: string
}[] = [
  { to: '/login', role: undefined, label: 'Login' },
  { to: '/admin/users', role: 'admin', label: 'Admin' },
  { to: '/repairs', role: 'user', label: 'Repairs' },
  { to: '/test-results', role: 'user', label: 'Test Results' },
]

export const adminSubRoutes: {
  to: PathRoute
  label: string
  icon: LucideIcon
}[] = [
  { to: '/admin/users', label: 'Users', icon: UsersIcon },
  { to: '/admin/records', label: 'Records', icon: FileIcon },
]
