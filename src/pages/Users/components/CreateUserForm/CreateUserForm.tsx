import type { UseFormReturn } from 'react-hook-form'
import type { CreateUserData } from '@/pages/Users/schemas/createUser.schema'
import { Controller } from 'react-hook-form'
import { Button, Form, Input } from '@/shared/ui'

export interface CreateUserFormProps {
  form: UseFormReturn<CreateUserData>
  onSubmit: () => void
}

export function CreateUserForm({ form, onSubmit }: CreateUserFormProps) {
  return (
    <Form onSubmit={onSubmit}>
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
  )
}
