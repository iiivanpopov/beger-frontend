import type { ComponentProps, ReactNode } from 'react'
import type { ToastLevel } from '@/store/toasts'
import clsx from 'clsx'
import { useEffect } from 'react'
import styles from './Toast.module.css'

export interface ToastContainerProps extends ComponentProps<'div'> {
  children: ReactNode
  className?: string
}

function ToastContainer({ children, className, ...props }: ToastContainerProps) {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      {children}
    </div>
  )
}

export interface ToastProps extends Omit<ComponentProps<'button'>, 'id'> {
  children: ReactNode
  level: ToastLevel
  id: number
  onDelete: () => void
  autoHide?: boolean
  delay?: number
}

function Toast({
  children,
  level,
  id,
  onDelete,
  autoHide = true,
  delay = 5000,
  className,
  ...props
}: ToastProps) {
  useEffect(() => {
    if (!autoHide)
      return

    const timeout = setTimeout(onDelete, delay)

    return () => clearTimeout(timeout)
  }, [autoHide, onDelete, id, delay])

  return (
    <button
      type="button"
      onClick={onDelete}
      className={clsx(styles.toast, styles[level], className)}
      {...props}
    >
      {children}
    </button>
  )
}

Toast.Container = ToastContainer

export { Toast }
