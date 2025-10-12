import { DoorOpenIcon } from 'lucide-react'
import { Button, Typography } from '@/shared/ui'
import { Tab } from '../Tab/Tab'
import styles from './Header.module.css'
import { useHeader } from './hooks/useHeader'

export function Header() {
  const { handleLogout, isAuth, role } = useHeader()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}>
        {isAuth && (
          <>
            {role === 'admin' && <Tab path="/dashboard">Dashboard</Tab>}
            {role === 'user' && <Tab path="/repairs">Repairs</Tab>}
            {role === 'user' && <Tab path="/test-results">Test Results</Tab>}
          </>
        )}
      </nav>
      <div className={styles.actions}>
        {isAuth && (
          <Button color="white" icon onClick={handleLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>
    </header>
  )
}
