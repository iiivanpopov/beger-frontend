import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Typography.module.css'

type Tag = 'h1' | 'h2' | 'div'
type Variant = 'heading' | 'subheading' | 'body' | 'caption'

export type TypographyProps<T extends Tag = 'div'> = {
  tag?: T
  variant: Variant
  children: ReactNode
} & Omit<ComponentProps<T>, 'children'>

export function Typography<T extends Tag = 'div'>({
  tag,
  children,
  className,
  variant,
  ...props
}: TypographyProps<T>) {
  const Component = tag || 'div'
  return (
    <Component
      {...props}
      className={clsx(styles.typography, styles[variant], className)}
    >
      {children}
    </Component>
  )
}
