import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, Settings, User } from 'lucide-react'
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
        <Sidebar.Nav>
          <Sidebar.NavItem>
            <Sidebar.NavItemIcon icon={Home} />
            <Sidebar.NavItemLabel>Home</Sidebar.NavItemLabel>
          </Sidebar.NavItem>
          <Sidebar.NavItem>
            <Sidebar.NavItemIcon icon={User} />
            <Sidebar.NavItemLabel>Profile</Sidebar.NavItemLabel>
          </Sidebar.NavItem>
          <Sidebar.NavItem>
            <Sidebar.NavItemIcon icon={Settings} />
            <Sidebar.NavItemLabel>Settings</Sidebar.NavItemLabel>
          </Sidebar.NavItem>
        </Sidebar.Nav>
      </Sidebar>
    )
  },
}

export const Opened: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        <Sidebar.Nav>
          <Sidebar.NavItem>
            <Sidebar.NavItemIcon icon={Home} />
            <Sidebar.NavItemLabel>Home</Sidebar.NavItemLabel>
          </Sidebar.NavItem>
          <Sidebar.NavItem>
            <Sidebar.NavItemIcon icon={User} />
            <Sidebar.NavItemLabel>Profile</Sidebar.NavItemLabel>
          </Sidebar.NavItem>
          <Sidebar.NavItem>
            <Sidebar.NavItemIcon icon={Settings} />
            <Sidebar.NavItemLabel>Settings</Sidebar.NavItemLabel>
          </Sidebar.NavItem>
        </Sidebar.Nav>
      </Sidebar>
    )
  },
}
