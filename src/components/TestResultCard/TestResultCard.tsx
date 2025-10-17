import type { TestResult } from '@/api'
import { TrashIcon } from 'lucide-react'
import { Tooltip } from '@/shared/ui'
import styles from './TestResultCard.module.css'

export interface TestResultCardProps {
  testResult: TestResult
  i: number
  onDelete: (id: number) => void
}

export function TestResultCard({ testResult, i, onDelete }: TestResultCardProps) {
  return (
    <div className={styles.box}>
      <div className={styles.side}>
        <span>
          #
          {i}
        </span>
        <button
          onClick={() => onDelete(testResult.id)}
          type="button"
          className={styles.btn}
        >
          <TrashIcon />
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <span>{testResult.id}</span>
          <span className={styles.date}>
            {new Date(testResult.date).toLocaleDateString()}
          </span>
        </div>
        <span>{testResult.pcbName}</span>
        <Tooltip>
          <Tooltip.Trigger className={styles.tip}>
            {testResult.passedFirstTry}
            /
            {testResult.total - (testResult.passedFirstTry + testResult.failed)}
            /
            {testResult.failed}
            /
            {testResult.total}
          </Tooltip.Trigger>
          <Tooltip.Content className={styles.hint}>
            first try/passed/failed/total
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  )
}
