import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.css'

type Variant = 'contained'

export interface TextareaProps extends ComponentProps<'textarea'> {
  variant?: Variant
}

export function Textarea({ className, variant = 'contained', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={clsx(styles.textarea, styles[variant], className)}
    />
  )
}
