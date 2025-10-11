import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

export interface InputProps extends ComponentProps<'input'> {
  variant?: 'contained'
  invalid?: boolean
}

export function Input({ variant = 'contained', invalid, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        styles.input,
        styles[variant],
        invalid && styles.invalid,
      )}
    />
  )
}
