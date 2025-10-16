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
        <Sidebar.Nav>
          {adminNavigationTabs.map(({ to, label, icon }) => {
            const isActive = routeSegment === getRouteSegment(to, 1)
            return (
              <Link to={to} key={to}>
                <Sidebar.NavItem className={clsx(isActive && styles.active)}>
                  <Sidebar.NavItemIcon icon={icon} />
                  <Sidebar.NavItemLabel>{label}</Sidebar.NavItemLabel>
                </Sidebar.NavItem>
              </Link>
            )
          })}
        </Sidebar.Nav>
      </Sidebar>
      {children}
    </div>
  )
}
