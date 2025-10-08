import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown initial={{
      label: 'Item 1',
      value: '1',
    }}
    >
      <Dropdown.Trigger />
      <Dropdown.Items>
        <Dropdown.Item value="1">Item 1</Dropdown.Item>
        <Dropdown.Item value="2">Item 2</Dropdown.Item>
        <Dropdown.Item value="3">Item 3</Dropdown.Item>
      </Dropdown.Items>
    </Dropdown>
  ),
}

export const ManyItems: Story = {
  render: () => (
    <Dropdown initial={{
      label: 'Item5',
      value: '5',
    }}
    >
      <Dropdown.Trigger />
      <Dropdown.Items>
        {Array.from({ length: 15 }, (_, i) => (
          <Dropdown.Item value={String(i)} key={i}>
            Item
            {i + 1}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown>
  ),
}

export default meta
