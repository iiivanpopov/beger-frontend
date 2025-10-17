import { Controller } from 'react-hook-form'
import { UserCard } from '@/components/UserCard'
import { Button, Form, Input, Typography } from '@/shared/ui'
import { useUsersPage } from './hooks/useUsersPage'
import styles from './UsersPage.module.css'

export function UsersPage() {
  const { queries, form, handlers } = useUsersPage()
  const users = queries.users.data?.data

  return (
    <>
      <section className={styles.section}>
        <Typography tag="h2" variant="subheading">New user</Typography>
        <Form onSubmit={handlers.onSubmit}>
          <Form.Row>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Input {...field} placeholder="Full Name" />
                  <Form.Error>{fieldState.error?.message}</Form.Error>
                </Form.Field>
              )}
            />
          </Form.Row>
          <Form.Row>
            <Controller
              name="userName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Input {...field} placeholder="User Name" />
                  <Form.Error>{fieldState.error?.message}</Form.Error>
                </Form.Field>
              )}
            />
          </Form.Row>
          <Form.Row>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Input {...field} placeholder="*******" type="password" />
                  <Form.Error>{fieldState.error?.message}</Form.Error>
                </Form.Field>
              )}
            />
          </Form.Row>
          <Form.Row>
            <Button type="submit">Register</Button>
          </Form.Row>
        </Form>
      </section>
      <section className={styles.section}>
        <Typography tag="h2" variant="subheading">Users list</Typography>
        <div className={styles.list}>
          {!users?.length && <Typography>No users found...</Typography>}
          {users?.map((user, i) =>
            <UserCard key={user.userName} user={user} i={i} onDelete={handlers.onDelete} />,
          )}
        </div>
      </section>
    </>
  )
}
