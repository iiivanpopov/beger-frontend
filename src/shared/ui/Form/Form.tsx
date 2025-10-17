import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Form.module.css'

export interface FormProps extends ComponentProps<'form'> {
  children: ReactNode
  className?: string
}

export function Form({ children, className, ...props }: FormProps) {
  return <form {...props} className={clsx(styles.form, className)}>{children}</form>
}

export interface FormRowProps {
  children: ReactNode
  className?: string
}

export function FormRow({ children, className }: FormRowProps) {
  return (
    <div className={clsx(styles.row, className)}>
      {children}
    </div>
  )
}

export interface FormFieldProps {
  children: ReactNode
  className?: string
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      {children}
    </div>
  )
}

export interface FormFieldProps {
  children: ReactNode
  className?: string
  label?: ReactNode
  error?: {
    message?: string
  }
}

export function FormLabel({ children, className }: FormFieldProps) {
  return (
    <div className={clsx(styles.label, className)}>
      {children}
    </div>
  )
}

export function FormError({ children, className }: FormFieldProps) {
  if (!children)
    return null

  return (
    <div className={clsx(styles.error, className)}>
      {children}
    </div>
  )
}

Form.Row = FormRow
Form.Field = FormField
Form.Label = FormLabel
Form.Error = FormError
