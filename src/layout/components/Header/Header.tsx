import { DoorOpenIcon } from 'lucide-react'
import { Button, Typography } from '@/shared/ui'
import { Tab } from '../Tab/Tab'
import styles from './Header.module.css'
import { useHeader } from './hooks/useHeader'

export function Header() {
  const { handleLogout, user } = useHeader()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}>
        {user?.role === 'admin' && <Tab path="/dashboard">Dashboard</Tab>}
        {user?.role === 'user' && <Tab path="/repairs">Repairs</Tab>}
        {user?.role === 'user' && <Tab path="/test-results">Test Results</Tab>}
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
