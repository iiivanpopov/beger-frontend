import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ToastOptions } from './Toast'
import { useState } from 'react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastOptions[]>([
      { id: 1, title: 'Information', description: 'This is an info toast', level: 'info' },
      { id: 2, title: 'Success', description: 'Operation successful', level: 'success' },
      { id: 3, title: 'Error', description: 'Something went wrong', level: 'error' },
    ])

    const remove = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} remove={remove} disableAutoHide />
        ))}
      </div>
    )
  },
}

export default meta
