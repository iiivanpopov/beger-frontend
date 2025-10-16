import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

export interface InputProps extends ComponentProps<'input'> {
  invalid?: boolean
}

export function Input({ invalid, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        styles.input,
        invalid && styles.invalid,
      )}
    />
  )
}
