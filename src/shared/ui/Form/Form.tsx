import type { ComponentProps, ReactNode } from 'react'
import type { ControllerFieldState } from 'react-hook-form'
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
  fieldState: ControllerFieldState
}

function FormField({ children, className, fieldState }: FormFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      {children}
      {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
    </div>
  )
}

Form.Field = FormField

export { Form }
