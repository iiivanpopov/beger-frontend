import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

type Variant = 'contained'

export interface InputProps extends ComponentProps<'input'> {
  variant?: Variant
}

export function Input({ variant = 'contained', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        styles.input,
        styles[variant],
      )}
    />
  )
}
