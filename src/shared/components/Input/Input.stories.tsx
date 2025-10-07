import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    variant: { control: 'radio', options: ['contained'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
}

type Story = StoryObj<typeof meta>

export const Contained: Story = {
  args: {
    variant: 'contained',
    placeholder: 'Enter text...',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    variant: 'contained',
    value: 'Hello World',
    disabled: false,
  },
}

export default meta
