import type { User } from '@/api'
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  setAuth: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  setAuth: user => set({ user }),
}))
