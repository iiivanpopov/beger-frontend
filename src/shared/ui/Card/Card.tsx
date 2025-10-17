import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx(styles.card, className)}>
      {children}
    </div>
  )
}

export interface CardIndexProps {
  children: ReactNode
  className?: string
}

export function CardIndex({ children, className }: CardIndexProps) {
  return (
    <div className={clsx(styles.index, className)}>
      #
      {children}
    </div>
  )
}

export interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <div className={clsx(styles.title, className)}>
      {children}
    </div>
  )
}

export interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <div className={clsx(styles.description, className)}>
      {children}
    </div>
  )
}

export interface CardActionProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
}

export function CardAction({ children, className, ...props }: CardActionProps) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.action, className)}
    >
      {children}
    </button>
  )
}

export interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx(styles.content, className)}>
      {children}
    </div>
  )
}

export interface CardRowProps {
  children: ReactNode
  className?: string
}

export function CardRow({ children, className }: CardRowProps) {
  return (
    <div className={clsx(styles.row, className)}>
      {children}
    </div>
  )
}

Card.Title = CardTitle
Card.Content = CardContent
Card.Index = CardIndex
Card.Row = CardRow
Card.Description = CardDescription
Card.Action = CardAction
