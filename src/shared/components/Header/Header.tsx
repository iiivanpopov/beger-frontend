import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon } from 'lucide-react'
import { routes } from '@/data/routes'
import { Button, Typography } from '@/shared/ui'
import { getRouteSegment } from '@/shared/utils/routing'
import styles from './Header.module.css'
import { useHeader } from './useHeader'

export function Header() {
  const { handleLogout, user, routeSegment } = useHeader()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}>
        {routes.map(({ to, role, label }) => (
          <Link
            key={to}
            to={to}
            className={clsx(
              styles.tab,
              routeSegment === getRouteSegment(to) && styles.active,
              user?.role !== role && styles.hidden,
            )}
          >
            {label}
          </Link>
        ))}
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
