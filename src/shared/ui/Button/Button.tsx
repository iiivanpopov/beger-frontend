import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.css'

type Variant = 'contained' | 'ghost'
type Color = 'primary' | 'white'
type Size = 'large' | 'medium' | 'small'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  color?: Color
  size?: Size
  icon?: boolean
  children: ReactNode
  loading?: boolean
}

export function Button({
  children,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[color],
        styles[size],
        icon && styles.icon,
        loading && styles.loading,
        className,
      )}
    >
      <LoaderCircle className={styles.buttonSpinner} />
      <div className={styles.buttonContent}>{children}</div>
    </button>
  )
}
