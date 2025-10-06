import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Content>
        This is a basic popover
      </Popover.Content>
    </Popover>
  ),
}

export default meta
