import type { Meta, StoryObj } from '@storybook/react-vite'
import { SaveIcon, Trash2Icon } from 'lucide-react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    return (
      <Card>
        <Card.Index>3</Card.Index>
        <Card.Content>
          <Card.Row>
            <Card.Title>Full Name</Card.Title>
            <Card.Description>@username</Card.Description>
          </Card.Row>
          <Card.Row>Some user content here... More and more content</Card.Row>
          <Card.Row>
            <Card.Description>id: 1739</Card.Description>
            <Card.Row>
              <Card.Action><SaveIcon /></Card.Action>
              <Card.Action><Trash2Icon /></Card.Action>
            </Card.Row>
          </Card.Row>
        </Card.Content>
      </Card>
    )
  },
}

export default meta
