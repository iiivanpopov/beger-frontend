import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon } from 'lucide-react'
import { navigationTabs } from '@/shared/config'
import { Button, Typography } from '@/shared/ui'
import { getRouteSegment } from '@/shared/utils/routing'
import styles from './Header.module.css'
import { useHeader } from './hooks/useHeader'

export function Header() {
  const { handleLogout, user, routeSegment } = useHeader()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.icon} />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}>
        {navigationTabs[user?.role ?? 'guest'].map(({ to, label }) => {
          const isActive = routeSegment === getRouteSegment(to)
          return (
            <Link
              key={to}
              to={to}
              className={clsx(styles.tab, isActive && styles.active)}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <div className={styles.actions}>
        {user && (
          <Button color="white" icon onClick={handleLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>
    </header>
  )
}
