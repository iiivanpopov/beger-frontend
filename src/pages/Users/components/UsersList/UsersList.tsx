import type { User } from '@/api'
import { UserCard } from '@/components/UserCard'
import { Typography } from '@/shared/ui'
import styles from './UsersList.module.css'

export interface UsersListProps {
  users?: User[]
  onDelete: (id: number) => void
}

export function UsersList({ users, onDelete }: UsersListProps) {
  if (!users?.length)
    return <Typography>No users found...</Typography>

  return (
    <div className={styles.list}>
      {users.map((user, i) => (
        <UserCard key={user.userName} user={user} i={i} onDelete={onDelete} />
      ))}
    </div>
  )
}
