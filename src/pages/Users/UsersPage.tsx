import { Typography } from '@/shared/ui'
import { CreateUserForm, UsersList, UsersModal } from './components'
import { useUsersPage } from './hooks/useUsersPage'
import styles from './UsersPage.module.css'

export function UsersPage() {
  const { data, form, actions, ui } = useUsersPage()

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <Typography tag="h2" variant="subheading">New user</Typography>
        <CreateUserForm form={form} onSubmit={actions.onSubmit} />
      </section>
      <section className={styles.section}>
        <div className={styles.header}>
          <Typography tag="h2" variant="subheading">Users</Typography>
          <UsersModal
            users={data.users.data?.data.users}
            modal={ui.modal}
            onDelete={actions.onDelete}
            pagination={actions.pagination}
          />
        </div>
        <UsersList
          users={data.usersPreview.data?.data.users}
          onDelete={actions.onDelete}
        />
      </section>
    </div>
  )
}
