import clsx from 'clsx'
import { useEffect } from 'react'
import { Typography } from '@/shared/ui'
import styles from './Toast.module.css'

export interface ToastOptions {
  id: number
  title: string
  description: string
  level: 'info' | 'success' | 'error'
}

export interface ToastProps {
  toast: ToastOptions
  remove: (id: number) => void
  disableAutoHide?: boolean
}

export function Toast({
  toast,
  remove,
  disableAutoHide,
}: ToastProps) {
  useEffect(() => {
    if (disableAutoHide)
      return

    const timeout = setTimeout(() => {
      remove(toast.id)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [disableAutoHide, remove, toast.id])

  return (
    <button
      type="button"
      onClick={() => remove(toast.id)}
      key={toast.id}
      className={styles.toast}
    >
      <div className={clsx(styles.level, styles[toast.level])} />
      <div className={styles.content}>
        {toast.title && <Typography className={styles.title}>{toast.title}</Typography>}
        <Typography>{toast.description}</Typography>
      </div>
    </button>
  )
}
