import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Form } from './Form'

const meta = {
  component: Form,
  title: 'UI/Form',
} satisfies Meta<typeof Form>

type Story = StoryObj<typeof Form>

export const Basic: Story = {
  render: () => {
    return (
      <Form>
        <Form.Row>
          <Form.Field>
            <Form.Label>Name</Form.Label>
            <Input placeholder="Enter your name" />
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Input placeholder="Enter your email" type="email" />
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Button>Submit</Button>
        </Form.Row>
      </Form>
    )
  },
}

export const WithError: Story = {
  render: () => {
    return (
      <Form>
        <Form.Row>
          <Form.Field>
            <Form.Label>Name</Form.Label>
            <Input placeholder="Enter your name" />
            <Form.Error>This field is required</Form.Error>
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Input placeholder="Enter your email" type="email" />
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Button>Submit</Button>
        </Form.Row>
      </Form>
    )
  },
}

export const MultipleFields: Story = {
  render: () => {
    return (
      <Form>
        <Form.Row>
          <Form.Field>
            <Form.Label>First Name</Form.Label>
            <Input placeholder="Enter first name" />
          </Form.Field>
          <Form.Field>
            <Form.Label>Last Name</Form.Label>
            <Input placeholder="Enter last name" />
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Input placeholder="Enter your email" type="email" />
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Form.Label>Phone</Form.Label>
            <Input placeholder="Enter your phone" type="tel" />
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Button>Submit</Button>
        </Form.Row>
      </Form>
    )
  },
}

export default meta
