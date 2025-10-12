import type { UserRole } from '@/api'
import { redirect } from '@tanstack/react-router'

export function requireRole(current: UserRole | undefined, allowed: UserRole[], redirectTo: string) {
  if (!current)
    throw redirect({ to: '/login' })
  if (!allowed.includes(current))
    throw redirect({ to: redirectTo })
}
