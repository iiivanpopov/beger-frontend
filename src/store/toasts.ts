import type { ReactNode } from 'react'
import { create } from 'zustand'
import { generateNumericId } from '@/shared/utils'

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
  removeToast: (id: number) => void
}

const initialState = {
  toasts: [],
}

export const useToastsStore = create<ToastsStore>()(set => ({
  ...initialState,
  createToast: ({ content, level }) => set(state => ({
    toasts: [
      ...state.toasts,
      {
        id: generateNumericId(),
        content,
        level,
      },
    ],
  })),
  removeToast: id => set(state => ({
    toasts: state.toasts.filter(t => t.id !== id),
  })),
}))
