import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useState } from 'react'
import { adminNavigationTabs } from '@/shared/config'
import { useRouteSegment } from '@/shared/hooks'
import { Sidebar } from '@/shared/ui'
import { getRouteSegment } from '@/shared/utils/routing'
import styles from './AdminLayout.module.css'

export interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const routeSegment = useRouteSegment(1)

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        {adminNavigationTabs.map(({ to, label, icon: Icon }) => {
          const isActive = routeSegment === getRouteSegment(to, 1)
          return (
            <Link to={to} key={to}>
              <Sidebar.Item className={clsx(isActive && styles.active)}>
                <Icon />
                <Sidebar.ItemLabel>{label}</Sidebar.ItemLabel>
              </Sidebar.Item>
            </Link>
          )
        })}
      </Sidebar>
      {children}
    </div>
  )
}
