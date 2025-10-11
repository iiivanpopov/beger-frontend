import { Controller } from 'react-hook-form'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import { useLoginPage } from './hooks/useLoginPage'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { isOpen, setIsOpen, control, handleSubmit, onSubmit } = useLoginPage()

  return (
    <section className={styles.section}>
      <Typography variant="subheading" tag="h2">Unauthorized</Typography>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Trigger asChild>
          <Button>Login</Button>
        </Modal.Trigger>
        <Modal.Content className={styles.modal}>
          <Typography variant="heading" tag="h1">Login</Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="userName"
              rules={{
                required: '* Required',
                minLength: { value: 3, message: 'Too short (>2)' },
              }}
              render={({ field, fieldState }) => (
                <Form.Field fieldState={fieldState}>
                  <Input {...field} invalid={fieldState.invalid} placeholder="User Name" />
                </Form.Field>
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: '* Required',
                minLength: { value: 6, message: 'Too short (>5)' },
              }}
              render={({ field, fieldState }) => (
                <Form.Field fieldState={fieldState}>
                  <Input {...field} type="password" invalid={fieldState.invalid} placeholder="Password" />
                </Form.Field>
              )}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </section>
  )
}
