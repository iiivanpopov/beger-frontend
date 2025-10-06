import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from 'lucide-react'
import { Button } from './Button'

const meta = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'underlined'] },
    color: { control: 'radio', options: ['primary'] },
    size: { control: 'radio', options: ['large', 'medium', 'small'] },
    icon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    children: 'Button',
  },
}

export const Underlined: Story = {
  args: {
    variant: 'underlined',
    color: 'primary',
    size: 'medium',
    children: 'Button',
  },
}

export const Icon: Story = {
  args: {
    'variant': 'contained',
    'color': 'primary',
    'size': 'medium',
    'children': <SearchIcon />,
    'icon': true,
    'aria-label': 'Search',
  },
}

export default meta
