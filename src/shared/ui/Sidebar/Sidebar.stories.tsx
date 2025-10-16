import type { Meta, StoryObj } from '@storybook/react-vite'
import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
}
export default meta

type Story = StoryObj<typeof meta>

export const Closed: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        <Sidebar.Item>
          <HomeIcon />
          <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
        </Sidebar.Item>
        <Sidebar.Item>
          <UserIcon />
          <Sidebar.ItemLabel>Profile</Sidebar.ItemLabel>
        </Sidebar.Item>
        <Sidebar.Item>
          <SettingsIcon />
          <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
        </Sidebar.Item>
      </Sidebar>
    )
  },
}

export const Opened: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        <Sidebar.Item>
          <HomeIcon />
          <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
        </Sidebar.Item>
        <Sidebar.Item>
          <UserIcon />
          <Sidebar.ItemLabel>Profile</Sidebar.ItemLabel>
        </Sidebar.Item>
        <Sidebar.Item>
          <SettingsIcon />
          <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
        </Sidebar.Item>
      </Sidebar>
    )
  },
}
