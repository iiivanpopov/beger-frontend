import type { Dispatch, SetStateAction } from 'react'
import type { User } from '@/api'
import type { usePagination } from '@/shared/hooks/usePagination'
import { GridIcon } from 'lucide-react'
import { Button, Modal } from '@/shared/ui'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import styles from './UsersModal.module.css'

export interface UsersModalProps {
  users?: User[]
  modal: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
  }
  pagination: ReturnType<typeof usePagination>
}

export function UsersModal({ users, modal, pagination }: UsersModalProps) {
  return (
    <Modal isOpen={modal.isOpen} setIsOpen={modal.setIsOpen}>
      <Modal.Trigger>
        <Button icon variant="ghost"><GridIcon /></Button>
      </Modal.Trigger>
      <Modal.Content className={styles.users}>
        {users?.map(user => JSON.stringify(user))}
        <Pagination {...pagination} />
      </Modal.Content>
    </Modal>
  )
}
