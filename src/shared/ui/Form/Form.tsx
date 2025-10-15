import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Form.module.css'

export interface FormProps extends ComponentProps<'form'> {
  children: ReactNode
  className?: string
}

function Form({ children, className, ...props }: FormProps) {
  return <form {...props} className={clsx(styles.form, className)}>{children}</form>
}

export interface FormFieldProps {
  children: ReactNode
  className?: string
  // fieldState: ControllerFieldState
  label?: ReactNode
  error?: {
    message?: string
  }
}

function FormField({ children, className, label, error }: FormFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      {label && <span className={styles.label}>{label}</span>}
      {children}
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}

Form.Field = FormField

export { Form }
