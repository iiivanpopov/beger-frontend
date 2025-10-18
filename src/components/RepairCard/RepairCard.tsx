import type { Repair } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { useCopy, useToast } from '@/shared/hooks'
import { Card, Tooltip } from '@/shared/ui'
import styles from './RepairCard.module.css'

export interface RepairCardProps {
  repair: Repair
  onDelete: (id: number) => void
  i: number
}

export function RepairCard({ repair, i, onDelete }: RepairCardProps) {
  const { copy } = useCopy()
  const { showInfo } = useToast()

  const onCopy = () => {
    copy(repair.pcbName)
    showInfo('Copied to clipboard')
  }

  return (
    <Card key={repair.pcbName}>
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
                <Card.Title>{repair.pcbName}</Card.Title>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>{repair.pcbName}</Tooltip.Content>
          </Tooltip>
          <Card.Description>
            {new Date(repair.date).toLocaleDateString()}
          </Card.Description>
        </Card.Row>
        <Card.Row>
          <Card.Title>{repair.defect}</Card.Title>
        </Card.Row>
        <Card.Row>
          <Card.Description>
            id:
            {repair.id}
          </Card.Description>
          <Card.Action
            className={styles.delete}
            onClick={() => onDelete(repair.id)}
          >
            <Trash2Icon />
          </Card.Action>
        </Card.Row>
      </Card.Content>
    </Card>
  )
}
