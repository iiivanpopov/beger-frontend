import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon } from 'lucide-react'
import { navigationTabs } from '@/shared/config'
import { Button, Menu, Typography } from '@/shared/ui'
import { getRouteSegment } from '@/shared/utils'
import styles from './Header.module.css'
import { useHeader } from './hooks/useHeader'

export function Header() {
  const { actions, data, ui } = useHeader()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.icon} />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}>
        {navigationTabs[data.user?.role ?? 'guest'].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={clsx(
              styles.tab,
              getRouteSegment(data.pathname) === getRouteSegment(to) && styles.active,
            )}
          >
            {label}
          </Link>
        ),
        )}
      </nav>
      <div className={styles.actions}>
        {data.user && (
          <Button icon color="white" onClick={actions.onLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>
      <Menu isOpen={ui.menu.isOpen} setIsOpen={ui.menu.setIsOpen}>
        <Menu.Trigger className={styles.burger} />
        <Menu.Content className={styles.menu}>
          <Menu.Routes>
            {navigationTabs[data.user?.role ?? 'guest'].map(({ to, label }) => (
              <Link key={to}to={to}>
                <Menu.Route
                  onClick={() => ui.menu.setIsOpen(false)}
                  active={getRouteSegment(data.pathname) === getRouteSegment(to)}
                >
                  {label}
                </Menu.Route>
              </Link>
            ))}
          </Menu.Routes>
          <Menu.Actions>
            {data.user && (
              <Menu.Action onClick={actions.onLogout}>
                <DoorOpenIcon />
              </Menu.Action>
            )}
          </Menu.Actions>
        </Menu.Content>
      </Menu>
    </header>
  )
}
