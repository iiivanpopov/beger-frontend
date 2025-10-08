import type { Meta, StoryObj } from '@storybook/react-vite'
import { Autocomplete } from './Autocomplete'

const meta: Meta<typeof Autocomplete> = {
  title: 'UI/Autocomplete',
  component: Autocomplete,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Autocomplete initial={{ label: 'Apple', value: 'apple' }}>
      <Autocomplete.Trigger />
      <Autocomplete.Items>
        <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
        <Autocomplete.Item value="banana">Banana</Autocomplete.Item>
        <Autocomplete.Item value="cherry">Cherry</Autocomplete.Item>
      </Autocomplete.Items>
    </Autocomplete>
  ),
}

export const ManyOptions: Story = {
  render: () => (
    <Autocomplete initial={{ label: 'Item5', value: '5' }}>
      <Autocomplete.Trigger />
      <Autocomplete.Items>
        {Array.from({ length: 15 }, (_, i) => (
          <Autocomplete.Item key={i} value={String(i)}>
            Item
            {i + 1}
          </Autocomplete.Item>
        ))}
      </Autocomplete.Items>
    </Autocomplete>
  ),
}

export const EmptyInitial: Story = {
  render: () => (
    <Autocomplete>
      <Autocomplete.Trigger />
      <Autocomplete.Items>
        <Autocomplete.Item value="js">JavaScript</Autocomplete.Item>
        <Autocomplete.Item value="ts">TypeScript</Autocomplete.Item>
        <Autocomplete.Item value="py">Python</Autocomplete.Item>
      </Autocomplete.Items>
    </Autocomplete>
  ),
}

export default meta
