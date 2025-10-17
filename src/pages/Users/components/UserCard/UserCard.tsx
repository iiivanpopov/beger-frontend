import type { User } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { Badge, Card } from '@/shared/ui'
import styles from './UserCard.module.css'

export interface UserCardProps {
  user: User
  onDelete: (id: number) => void
  i: number
}

export function UserCard({ user, i, onDelete }: UserCardProps) {
  return (
    <Card key={user.userName}>
      <Card.Index>{i}</Card.Index>
      <Card.Content>
        <Card.Row>
          <Card.Title>{user.fullName}</Card.Title>
          <Card.Description>
            @
            {user.userName}
          </Card.Description>
        </Card.Row>
        <Card.Row>
          <Badge color="black" size="small">{user.role}</Badge>
        </Card.Row>
        <Card.Row>
          <Card.Description>
            id:
            {user.id}
          </Card.Description>
          <Card.Row>
            <Card.Action
              className={styles.delete}
              onClick={() => onDelete(user.id)}
            >
              <Trash2Icon />
            </Card.Action>
          </Card.Row>
        </Card.Row>
      </Card.Content>
    </Card>
  )
}
