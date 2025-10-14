import type { User } from '@/api'
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  setAuth: (user: User | null) => void
}

const initialState = {
  user: null,
}

export const useAuthStore = create<AuthStore>()(set => ({
  ...initialState,
  setAuth: user => set({ user }),
}))
