import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from '@/shared/ui'
import { Form } from './Form'

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<{ name: string }>({
      defaultValues: { name: '' },
    })

    // eslint-disable-next-line no-alert
    const onSubmit = (data: any) => alert(JSON.stringify(data, null, 2))

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState }) => (
            <Form.Field fieldState={fieldState}>
              <Input placeholder="Enter your name" {...field} />
            </Form.Field>
          )}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  },
}

export default meta
