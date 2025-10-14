import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ToastLevel } from '@/store/toasts'
import { useState } from 'react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
}

type Story = StoryObj<typeof meta>

interface ToastEntity {
  id: number
  level: ToastLevel
  message: string
}

export const Basic: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastEntity[]>([
      { id: 1, level: 'info', message: 'Info message' },
    ])

    const handleDelete = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
      <Toast.Container>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            level={toast.level}
            onDelete={() => handleDelete(toast.id)}
          >
            {toast.message}
          </Toast>
        ))}
      </Toast.Container>
    )
  },
}

export const MultipleToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastEntity[]>([
      { id: 1, level: 'info', message: 'Information saved' },
      { id: 2, level: 'success', message: 'Operation successful' },
      { id: 3, level: 'error', message: 'Something went wrong' },
    ])

    const handleDelete = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
      <Toast.Container>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            level={toast.level}
            onDelete={() => handleDelete(toast.id)}
          >
            {toast.message}
          </Toast>
        ))}
      </Toast.Container>
    )
  },
}

export const ManualClose: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true)

    return (
      <Toast.Container>
        {isVisible && (
          <Toast
            id={1}
            level="error"
            autoHide={false}
            onDelete={() => setIsVisible(false)}
          >
            Click to dismiss manually
          </Toast>
        )}
      </Toast.Container>
    )
  },
}

export default meta
