import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown defaultSelected="Option 1">
      <Dropdown.Trigger />
      <Dropdown.Options>
        <Dropdown.Option>Option 1</Dropdown.Option>
        <Dropdown.Option>Option 2</Dropdown.Option>
        <Dropdown.Option>Option 3</Dropdown.Option>
      </Dropdown.Options>
    </Dropdown>
  ),
}

export const ManyOptions: Story = {
  render: () => (
    <Dropdown defaultSelected="Item 5">
      <Dropdown.Trigger />
      <Dropdown.Options>
        {Array.from({ length: 15 }, (_, i) => (
          <Dropdown.Option key={i}>
            {`Item${i + 1}`}
          </Dropdown.Option>
        ))}
      </Dropdown.Options>
    </Dropdown>
  ),
}

export default meta
