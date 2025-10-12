import type { RedirectOptions } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { AppRouter } from '@/main'
import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'
import styles from './Tab.module.css'

export interface TabProps {
  children: ReactNode
  path: RedirectOptions<AppRouter>['to']
}

export function Tab({ children, path }: TabProps) {
  const pathname = useLocation({
    select: location => location.pathname,
  })

  return (
    <Link
      to={path}
      type="button"
      className={clsx(
        styles.tab,
        pathname === path && styles.active,
      )}
    >
      {children}
    </Link>
  )
}
