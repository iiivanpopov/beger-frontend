import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/shared/ui'
import styles from './Pagination.module.css'

export interface PaginationProps {
  page: number
  nextDisabled: boolean
  prevDisabled: boolean
  availablePrev: number[]
  availableNext: number[]
  onNextPage: () => void
  onPrevPage: () => void
  onGotoPage: (page: number) => void
}

export function Pagination({
  page,
  nextDisabled,
  prevDisabled,
  availablePrev,
  availableNext,
  onNextPage,
  onPrevPage,
  onGotoPage,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <Button icon size="small" onClick={onPrevPage} disabled={prevDisabled}>
        <ArrowLeftIcon />
      </Button>
      {availablePrev.map(p => (
        <Button key={p} size="small" icon onClick={() => onGotoPage(p)}>
          {p}
        </Button>
      ))}
      <Button icon size="medium" onClick={() => onGotoPage(page)} disabled>
        {page}
      </Button>
      {availableNext.map(p => (
        <Button size="small" key={p} icon onClick={() => onGotoPage(p)}>
          {p}
        </Button>
      ))}
      <Button icon size="small" onClick={onNextPage} disabled={nextDisabled}>
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
