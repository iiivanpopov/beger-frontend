import type { LucideIcon } from 'lucide-react'
import type { UserRole } from '@/api'
import type { RouterPath } from '@/shared/types'
import { FileIcon, UsersIcon } from 'lucide-react'

export const adminNavigationTabs: {
  to: RouterPath
  label: string
  icon: LucideIcon
}[] = [
  { to: '/admin/users', label: 'Users', icon: UsersIcon },
  { to: '/admin/records', label: 'Records', icon: FileIcon },
]

export const navigationTabs: Record<UserRole, {
  to: RouterPath
  label: string
  isActive?: (pathname: string) => boolean
}[]> = {
  admin: [
    {
      to: '/admin/users',
      label: 'Admin',
      isActive: (pathname: string) => adminNavigationTabs.some(({ to }) => to === pathname),
    },
  ],
  user: [
    { to: '/repairs', label: 'Repairs' },
    { to: '/test-results', label: 'Test Results' },
  ],
  guest: [
    { to: '/login', label: 'Login' },
  ],
}
