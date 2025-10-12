import type { ToastOptions } from '@/shared/ui'
import { create } from 'zustand'

interface ToastsStore {
  toasts: ToastOptions[]
  toast: (toast: Omit<ToastOptions, 'id'>) => void
  remove: (id: number) => void
}

export const useToastsStore = create<ToastsStore>()(set => ({
  toasts: [],
  toast: ({ title, description, level }) => {
    set(state => ({
      toasts: [
        ...state.toasts,
        {
          id: Date.now() + Math.random(),
          title,
          description,
          level,
        },
      ],
    }))
  },
  remove: id =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    })),
}))
