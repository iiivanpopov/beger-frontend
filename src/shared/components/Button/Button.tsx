import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

type Variant = 'contained' | 'underlined'
type Color = 'primary'
type Size = 'large' | 'medium' | 'small'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  color?: Color
  size?: Size
  icon?: boolean
  children: ReactNode
}

export function Button({
  children,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  icon = false,
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
        className,
      )}
    >
      {children}
    </button>
  )
}
