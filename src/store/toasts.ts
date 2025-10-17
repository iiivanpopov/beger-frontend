import type { ReactNode } from 'react'
import { create } from 'zustand'

export type ToastLevel = 'info' | 'success' | 'error'

export interface ToastConfig {
  level: ToastLevel
  content: ReactNode
}

export interface ToastEntity extends ToastConfig {
  id: number
}

interface ToastsStore {
  toasts: ToastEntity[]
  createToast: (toast: ToastConfig) => void
  deleteToast: (id: number) => void
}

export const useToastsStore = create<ToastsStore>()(set => ({
  toasts: [],
  createToast: ({ content, level }) => set(state => ({
    toasts: [
      ...state.toasts,
      {
        id: Date.now() + Math.random(),
        content,
        level,
      },
    ],
  })),
  deleteToast: id => set(state => ({
    toasts: state.toasts.filter(t => t.id !== id),
  })),
}))
