import type { ReactNode } from 'react'
import { Header } from '@/shared/components'
import styles from './Layout.module.css'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  )
}
