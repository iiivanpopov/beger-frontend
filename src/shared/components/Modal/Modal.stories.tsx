import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Typography } from '@/shared/components'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Typography variant="heading" tag="h1">
          Heading
        </Typography>
        <Typography variant="subheading" tag="h2">
          Base modal with simple content.
        </Typography>
        <Button>Continue</Button>
      </Modal.Content>
    </Modal>
  ),
}

export default meta
