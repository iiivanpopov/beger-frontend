import type { ReactNode } from 'react'
import { Header } from '@/layout/components'
import { ToastContainer } from '@/shared/components'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.outlet}>
        {children}
      </main>
      <ToastContainer />
    </div>
  )
}
