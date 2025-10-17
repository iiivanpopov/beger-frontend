import type { ReactNode } from 'react'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'
import { Tooltip } from '@/shared/ui'
import styles from './Card.module.css'

interface CardListProps {
  children: ReactNode
  className?: string
}

function CardList({ children, className }: CardListProps) {
  return <div className={clsx(styles.list, className)}>{children}</div>
}

interface CardBaseProps {
  id: number
  date?: string | Date
  onDelete?: (id: number) => void
  children?: ReactNode
}

export function Card({ id, date, onDelete, children }: CardBaseProps) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : undefined

  return (
    <div className={styles.box}>
      <div className={styles.side}>
        {id}
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          {formattedDate && <span className={styles.date}>{formattedDate}</span>}
          <button
            onClick={() => onDelete?.(id)}
            type="button"
            className={styles.delete}
          >
            <TrashIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

interface CardPropertyProps {
  hint: string
  children: ReactNode
}

function CardProperty({ children, hint }: CardPropertyProps) {
  return (
    <Tooltip>
      <Tooltip.Trigger className={styles.tip}>{children}</Tooltip.Trigger>
      <Tooltip.Content className={styles.hint}>{hint}</Tooltip.Content>
    </Tooltip>
  )
}

Card.Property = CardProperty
Card.List = CardList
