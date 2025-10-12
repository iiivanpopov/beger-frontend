import { useRouteContext } from '@tanstack/react-router'
import { DoorOpenIcon } from 'lucide-react'
import { Button, Typography } from '@/shared/ui'
import styles from './Header.module.css'
import { useHeader } from './useHeader'

export function Header() {
  const { handleLogout } = useHeader()
  const context = useRouteContext({ from: '__root__' })

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}></nav>
      <div className={styles.actions}>
        {context.isAuth && (
          <Button color="white" icon onClick={handleLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>
    </header>
  )
}
