import { Controller } from 'react-hook-form'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import { useLoginPage } from './hooks/useLoginPage'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { isOpen, setIsOpen, control, onSubmit } = useLoginPage()

  return (
    <section className={styles.section}>
      <Typography variant="subheading" tag="h2">Unauthorized</Typography>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Trigger asChild>
          <Button>Login</Button>
        </Modal.Trigger>
        <Modal.Content>
          <div className={styles.modal}>
            <Typography variant="heading" tag="h1">Login</Typography>
            <Form onSubmit={onSubmit}>
              <Controller
                control={control}
                name="userName"
                render={({ field, fieldState }) => (
                  <Form.Field {...fieldState}>
                    <Input {...field} invalid={fieldState.invalid} placeholder="User Name" />
                  </Form.Field>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <Form.Field {...fieldState}>
                    <Input {...field} type="password" invalid={fieldState.invalid} placeholder="Password" />
                  </Form.Field>
                )}
              />
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </section>
  )
}
