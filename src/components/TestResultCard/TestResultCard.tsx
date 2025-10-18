import type { TestResult } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { useCopy, useToast } from '@/shared/hooks'
import { Card, Tooltip } from '@/shared/ui'
import styles from './TestResultCard.module.css'

export interface TestResultCardProps {
  testResult: TestResult
  onDelete: (id: number) => void
  i: number
}

export function TestResultCard({ testResult, i, onDelete }: TestResultCardProps) {
  const { copy } = useCopy()
  const { showInfo } = useToast()

  const onCopy = () => {
    copy(testResult.pcbName)
    showInfo('Copied to clipboard')
  }

  return (
    <Card key={testResult.pcbName}>
      <Card.Index>{i}</Card.Index>
      <Card.Content>
        <Card.Row>
          <Tooltip>
            <Tooltip.Trigger>
              <button
                type="button"
                onClick={onCopy}
                className={styles.title}
              >
                <Card.Title>{testResult.pcbName}</Card.Title>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>{testResult.pcbName}</Tooltip.Content>
          </Tooltip>
          <Card.Description>
            {new Date(testResult.date).toLocaleDateString()}
          </Card.Description>
        </Card.Row>
        <Card.Row>
          <Card.Title>
            {testResult.passedFirstTry}
            /
            {testResult.failed}
            /
            {testResult.total}
          </Card.Title>
        </Card.Row>
        <Card.Row>
          <Card.Description>
            id:
            {testResult.id}
          </Card.Description>
          <Card.Action
            className={styles.delete}
            onClick={() => onDelete(testResult.id)}
          >
            <Trash2Icon />
          </Card.Action>
        </Card.Row>
      </Card.Content>
    </Card>
  )
}
