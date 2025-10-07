import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

type Variant = 'contained'

type InputProps = {
  variant?: Variant
} & ComponentProps<'input'>

export function Input({ variant = 'contained', disabled, ...props }: InputProps) {
  return (
    <input
      {...props}
      disabled={disabled}
      className={clsx(
        styles.input,
        styles[variant],
      )}
    />
  )
}
