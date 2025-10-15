import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './SelectList.module.css'

export interface SelectListProps {
  children: ReactNode
  className?: string
}

function SelectList({ children, className }: SelectListProps) {
  return (
    <div className={clsx(styles.items, className)}>
      {children}
    </div>
  )
}

export interface SelectListItemProps extends ComponentProps<'button'> {
  children: ReactNode
  active?: boolean
  icon?: React.ElementType
}

function SelectListItem({
  children,
  icon: Icon,
  active,
  className,
  ...props
}: SelectListItemProps) {
  return (
    <button
      type="button"
      className={clsx(styles.item, active && styles.active, className)}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </button>
  )
}

SelectList.Item = SelectListItem

export { SelectList }
