import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/shared/ui'
import styles from './Pagination.module.css'

export interface PaginationProps {
  page: number
  nextDisabled: boolean
  prevDisabled: boolean
  onNextPage: () => void
  onPrevPage: () => void
  onGotoPage: (page: number) => void
}

export function Pagination({
  page,
  nextDisabled,
  prevDisabled,
  onNextPage,
  onPrevPage,
  onGotoPage,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <Button icon onClick={onPrevPage} disabled={prevDisabled}>
        <ArrowLeftIcon />
      </Button>
      <Button icon onClick={() => onGotoPage(page)}>
        {page}
      </Button>
      <Button icon onClick={onNextPage} disabled={nextDisabled}>
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
