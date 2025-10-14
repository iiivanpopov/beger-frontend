import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckIcon, UserIcon } from 'lucide-react'
import { SelectList } from './SelectList'

const meta: Meta<typeof SelectList> = {
  title: 'UI/SelectList',
  component: SelectList,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <SelectList>
      <SelectList.Item>Option 1</SelectList.Item>
      <SelectList.Item>Option 2</SelectList.Item>
      <SelectList.Item>Option 3</SelectList.Item>
    </SelectList>
  ),
}

export const WithActiveItem: Story = {
  render: () => (
    <SelectList>
      <SelectList.Item>Option 1</SelectList.Item>
      <SelectList.Item active>Active Option</SelectList.Item>
      <SelectList.Item>Option 3</SelectList.Item>
    </SelectList>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <SelectList>
      <SelectList.Item icon={UserIcon}>User</SelectList.Item>
      <SelectList.Item icon={CheckIcon} active>
        Checked
      </SelectList.Item>
    </SelectList>
  ),
}

export default meta
