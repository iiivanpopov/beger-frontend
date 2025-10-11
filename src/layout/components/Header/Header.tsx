import { Typography } from '@/shared/ui'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div />
        <Typography variant="heading" tag="h1">Beger</Typography>
      </div>
      <nav className={styles.tabs}></nav>
      <div className={styles.actions}></div>
    </header>
  )
}
