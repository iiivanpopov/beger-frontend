import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from 'lucide-react'
import { Button } from './Button'

const meta = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'ghost'] },
    color: { control: 'radio', options: ['primary', 'white'] },
    size: { control: 'radio', options: ['large', 'medium', 'small'] },
    icon: { control: 'boolean' },
    loading: { control: 'boolean' },
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

export const ghost: Story = {
  args: {
    variant: 'ghost',
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
