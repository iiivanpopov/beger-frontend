import type { Dispatch, SetStateAction } from 'react'
import type { User } from '@/api'
import type { usePagination } from '@/shared/hooks/usePagination'
import { GridIcon, Trash2Icon, XIcon } from 'lucide-react'
import { Button, Modal, Table, Typography } from '@/shared/ui'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import styles from './UsersModal.module.css'

export interface UsersModalProps {
  users?: User[]
  modal: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
  }
  onDelete: (id: number) => void
  pagination: ReturnType<typeof usePagination>
}

export function UsersModal({ users, modal, pagination, onDelete }: UsersModalProps) {
  return (
    <Modal isOpen={modal.isOpen} setIsOpen={modal.setIsOpen}>
      <Modal.Trigger>
        <Button icon variant="ghost"><GridIcon /></Button>
      </Modal.Trigger>
      <Modal.Content className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Typography variant="subheading" tag="h2">Users table view</Typography>
            <Button onClick={() => modal.setIsOpen(false)} icon variant="ghost">
              <XIcon />
            </Button>
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Full Name</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
                <Table.HeaderCell>{null}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users?.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.fullName}</Table.Cell>
                  <Table.Cell>{user.userName}</Table.Cell>
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      size="small"
                      variant="ghost"
                      onClick={() => onDelete(user.id)}
                    >
                      <Trash2Icon />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <Pagination {...pagination} />
      </Modal.Content>
    </Modal>
  )
}
